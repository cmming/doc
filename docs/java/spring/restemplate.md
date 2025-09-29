## 使用场景

> 不同服务之间的调用




## 全局设置

> 通过全局设置，可以统一设置请求头，请求参数，响应处理等，避免每次调用都需要设置。也就是将请求的配置从代码中抽离出来，方便管理。

### 1、配置连接超时时间、读取超时时间

```java

@Bean
public ClientHttpRequestFactory simpleClientHttpRequestFactory() {
    SimpleClientHttpRequestFactory factory = new SimpleClientHttpRequestFactory();
    factory.setReadTimeout(5000);//单位为ms
    factory.setConnectTimeout(5000);//单位为ms
    return factory;
}
```

### 2、BufferingClientHttpRequestFactory 

> 避免读取一次后，数据就被清空，导致多次读取报错。使其具有缓存功能

```java

@Bean
public ClientHttpRequestFactory bufferingClientHttpRequestFactory(ClientHttpRequestFactory factory) {
    return new BufferingClientHttpRequestFactory(factory);
}
```

### 3、为所有请求设置请求前缀

> 避免每次请求都需要写请求前缀 ，使用 DefaultUriBuilderFactory 设置请求前缀

```java
restTemplate.setUriTemplateHandler(new DefaultUriBuilderFactory(url));
```

### 4、设置拦截器

> 可以在拦截器中，进行请求日志打印、请求头统一设置、响应异常数据统一整理数据

```java
package com.example.springdemo.interceptor;

import cn.hutool.json.JSON;
import cn.hutool.json.JSONObject;
import cn.hutool.json.JSONUtil;
import com.example.springdemo.enums.ResultEnum;
import com.example.springdemo.exception.DemoException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpRequest;
import org.springframework.http.MediaType;
import org.springframework.http.client.ClientHttpRequestExecution;
import org.springframework.http.client.ClientHttpRequestInterceptor;
import org.springframework.http.client.ClientHttpResponse;
import org.springframework.util.StopWatch;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.SocketTimeoutException;
import java.nio.charset.StandardCharsets;

/**
 * py请求的拦截器 .
 * 1、统一处理异常情况 .
 * 2、统一设置请求头 .
 * @author ChenMing <br>
 * @version JDK 1.8
 * @since 2023/4/25 16:35 <br>
 */
@Slf4j
public class RestTemplateInterceptor implements ClientHttpRequestInterceptor {
    /**
     * 算法接口调用成功的状态码 .
     */
    private final Integer SUCCESS_CODE = 1;

    @Override
    public ClientHttpResponse intercept(HttpRequest request, byte[] body, ClientHttpRequestExecution execution) {
        try {
            // 统一设置请求头
            request.getHeaders().setContentType(MediaType.APPLICATION_JSON);
            logRequest(request, body);
            final StopWatch stopWatch = new StopWatch();
            stopWatch.start();
            ClientHttpResponse response = execution.execute(request, body);
            String contentType = request.getHeaders().getFirst(HttpHeaders.CONTENT_TYPE);
            String resultStr = responseHandle(response);
            logResponse(response);
            stopWatch.stop();
            log.info("远程调用请求url为:{},响应结果:{},耗时:{}ms", request.getURI(), resultStr, stopWatch.getTotalTimeMillis());
            return response;
        } catch (IOException e) {
            log.error("远程调用请求异常:{}", e);
            throw new DemoException(ResultEnum.SERVER_COMMUNICATION_ERR0R);
        }
    }

    /**
     * 打印请求日志 .
     *
     * @param request 请求体
     * @param body    body
     * @throws IOException 异常
     */
    private void logRequest(HttpRequest request, byte[] body) throws IOException {
        log.info("===========================request begin================================================");
        log.info("URI         : " + request.getURI());
        log.info("Method      : " + request.getMethod());
        log.info("Headers     : " + request.getHeaders());

        // Log query parameters for GET requests
        if (HttpMethod.GET.equals(request.getMethod())) {
            log.info("Query Params: " + getQueryParameters(request));
        } else {
            log.info("Request body: " + new String(body, StandardCharsets.UTF_8));
        }

        log.info("==========================request end================================================");
    }

    private String getQueryParameters(HttpRequest request) {
        return UriComponentsBuilder.fromUri(request.getURI()).build().getQueryParams().toString();
    }

    /**
     * 打印响应日志 .
     *
     * @param response 响应
     * @throws IOException 异常
     */
    private void logResponse(ClientHttpResponse response) throws IOException {
        log.info("============================response begin==========================================");
        log.info("Status code  : " + response.getStatusCode());
        log.info("Status text  : " + response.getStatusText());
        log.info("Headers      : " + response.getHeaders());
        log.info("Response body: " + StreamUtils.copyToString(response.getBody(), StandardCharsets.UTF_8));
        log.info("=======================response end=================================================");
    }



    /**
     * 响应处理，非正常的结果统一抛出异常 .
     *
     * @param response 响应
     * @return 响应结果
     */
    private String responseHandle(ClientHttpResponse response) {
        try {
            StringBuilder inputStringBuilder = new StringBuilder();
            BufferedReader bufferedReader = new BufferedReader(
                    new InputStreamReader(response.getBody(), StandardCharsets.UTF_8));
            String line = bufferedReader.readLine();
            while (line!=null){
                inputStringBuilder.append(line).append("\n");
                line = bufferedReader.readLine();
            }
            // 认为接口的返回只一定是一个json，且有code字段，如果code不为1，则抛出异常。根据实际业务情况修改
            JSONObject result = JSONUtil.parseObj(inputStringBuilder.toString());
            Integer code = result.getInt("code");
            if (code != null && !code.equals(SUCCESS_CODE)) {
                throw new DemoException(ResultEnum.SERVER_COMMUNICATION_ERR0R);
            }
            return inputStringBuilder.toString();
        } catch (SocketTimeoutException e) {
            log.error("远程调用响应异常:{}", e);
            throw new DemoException(ResultEnum.SERVER_COMMUNICATION_TIMEOUT);
        } catch (IOException e) {
            log.error("远程调用响应异常:{}", e);
            throw new DemoException(ResultEnum.SERVER_COMMUNICATION_ERR0R);
        }
    }
}

```



### 5. 异常统一处理

> 处理状态码为4xx、5xx的异常，避免每次调用都需要处理异常

```java
@Slf4j
public class MyResponseErrorHandler extends DefaultResponseErrorHandler {

    @Override
    public boolean hasError(ClientHttpResponse response) throws IOException {
        return super.hasError(response);
    }

    @Override
    public void handleError(ClientHttpResponse response) throws IOException {
        HttpStatus statusCode = HttpStatus.resolve(response.getRawStatusCode());
        if (statusCode == null) {
            throw new UnknownHttpStatusCodeException(response.getRawStatusCode(), response.getStatusText(),
                    response.getHeaders(), getResponseBody(response), getCharset(response));
        }
        switch (statusCode.series()) {
            case CLIENT_ERROR:
                throw new HttpClientErrorException(statusCode, response.getStatusText(), response.getHeaders(),
                        getResponseBody(response), getCharset(response));
            case SERVER_ERROR:
                throw new HttpServerErrorException(statusCode, response.getStatusText(), response.getHeaders(),
                        getResponseBody(response), getCharset(response));
            default:
                throw new RestClientException("Unknown status code [" + statusCode + "]");
        }
    }

    private byte[] getResponseBody(ClientHttpResponse response) {
        try {
            return FileCopyUtils.copyToByteArray(response.getBody());
        } catch (IOException ex) {
            // ignore
        }
        return new byte[0];
    }

    private Charset getCharset(ClientHttpResponse response) {
        HttpHeaders headers = response.getHeaders();
        MediaType contentType = headers.getContentType();
        return contentType != null ? contentType.getCharset() : null;
    }
}
```


### 6. 配置RestTemplate


```java

@Value("${remote.url:http://localhost:5000}")
private String url;

/**
 * 忽略https证书
 * 
 */
public BufferingClientHttpRequestFactory generateHttpRequestFactory() throws NoSuchAlgorithmException, KeyManagementException, KeyStoreException {
    SSLContext sslContext = SSLContextBuilder
            .create()
            .loadTrustMaterial(null, (x509Certificates, s) -> true)
            .build();

    SSLConnectionSocketFactory csf = new SSLConnectionSocketFactory(sslContext, new NoopHostnameVerifier());

    CloseableHttpClient httpClient = HttpClients.custom()
            .setSSLSocketFactory(csf)
            .build();

    HttpComponentsClientHttpRequestFactory requestFactory = new HttpComponentsClientHttpRequestFactory();
    requestFactory.setHttpClient(httpClient);

    // 设置默认超时时间
    requestFactory.setConnectTimeout(nwAuditConfig.getReadTimeout());
    requestFactory.setReadTimeout(nwAuditConfig.getConnectTimeout());

    return new BufferingClientHttpRequestFactory(requestFactory);
}

@Bean(value = "remoteClient", name = "remoteClient")
public RestTemplate restTemplate() {
    // 避免读取一次后，数据就被清空，导致多次读取报错；设置默认超时时间
    // BufferingClientHttpRequestFactory simpleBufferingClientHttpRequest =
    //         new BufferingClientHttpRequestFactory(simpleClientHttpRequestFactory());
    // final RestTemplate restTemplate = new RestTemplate(simpleBufferingClientHttpRequest);
    RestTemplate restTemplate = new RestTemplate(generateHttpRequestFactory());
    //  设置请求前缀
    restTemplate.setUriTemplateHandler(new DefaultUriBuilderFactory(url));
    // 设置拦截器
    restTemplate.getInterceptors().add(new RemoteClientInterceptor());
    // 设置异常处理
    restTemplate.setErrorHandler(new MyResponseErrorHandler());
    return restTemplate;
}

```




### 7、使用

```java

@Autowired
private RestTemplate restTemplate;

public void test() {
    String url = "http://localhost:8080/test";
    String result = restTemplate.getForObject(url, String.class);
    System.out.println(result);
}
```




## 常见问题

### 1、统一设置请求头失效

> 当使用exchange方法时，在自定义拦截器中设置的请求头不生效





docker run -d --name=gitea -p 33000:3000 -p 322:22 \
  -v /srv/gitea:/data \
  --restart always \
  gitea/gitea:latest
