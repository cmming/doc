# 异步

> 介绍各种异步


## pdf异步

> 浏览器在线预览pdf文件时候，避免一次完全加载资源，使用分片的方式

### 1. 服务端

```java
@GetMapping("/pdf")
public void pdf(HttpServletResponse response) {
    response.setContentType("application/pdf");
    response.setHeader("Content-Disposition", "inline; filename=example.pdf");
    try (OutputStream out = response.getOutputStream()) {
        // 读取文件
        byte[] bytes = Files.readAllBytes(Paths.get("example.pdf"));
        // 分片输出
        for (int i = 0; i < bytes.length; i += 1024) {
            out.write(bytes, i, Math.min(1024, bytes.length - i));
            out.flush();
            Thread.sleep(100);
        }
    } catch (Exception e) {
        e.printStackTrace();
    }
}
```

### 2. 前端

```html
<embed src="/pdf" width="100%" height="100%" type="application/pdf">
```

### 3. 效果



