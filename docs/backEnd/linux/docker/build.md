# Docker 镜像构建最佳实践指南

本文档介绍了 Docker 镜像构建的最佳实践，重点关注多平台构建和镜像优化技术。

## 目录
- [多平台构建](#多平台构建)
- [Dockerfile 优化示例](#dockerfile-优化示例)
- [构建和发布](#构建和发布)
- [运行和测试](#运行和测试)
- [故障排除](#故障排除)

## 多平台构建

### 1. 启用 Docker Buildx

Docker Buildx 是 Docker 的扩展构建功能，支持多平台镜像构建。

#### 1.1 准备工作

```bash
# 启用多架构支持（需要特权模式）
docker run --privileged --rm tonistiigi/binfmt --install all
```

#### 1.2 创建构建器实例

```bash
# 创建并使用新的构建器实例（支持代理配置）
docker buildx create \
  --name devbuilder \
  --driver docker-container \
  --driver-opt env.http_proxy=http://192.168.0.159:7890 \
  --driver-opt env.https_proxy=http://192.168.0.159:7890 \
  --use
```

#### 1.3 验证构建器

```bash
# 启动构建器并检查配置
docker buildx inspect --bootstrap

# 验证支持的平台
docker buildx ls
```

## Dockerfile 优化示例

以下 Dockerfile 展示了多平台构建的最佳实践，包括镜像大小优化、多阶段构建参数使用等。

### 2.1 基础镜像和构建参数

```dockerfile
FROM almalinux:8

# 多平台构建参数（必须在每个阶段内声明）
ARG TARGETPLATFORM
ARG TARGETARCH
ARG BUILDPLATFORM

# 显示构建信息（便于调试）
RUN set -ex; \
    echo "Building on: ${BUILDPLATFORM:-unknown}"; \
    echo "Target platform: ${TARGETPLATFORM:-unknown}/${TARGETARCH:-unknown}"; \
    echo "Architecture: $(uname -m)"
```

### 2.2 包管理器优化

```dockerfile
# DNF 配置优化：提升下载速度，减少镜像大小
RUN set -eux; \
    echo -e "fastestmirror=True\nmax_parallel_downloads=10\ntsflags=nodocs\ninstall_weak_deps=False" >> /etc/dnf/dnf.conf; \
    dnf -y install dnf-plugins-core epel-release; \
    # 启用 PowerTools 仓库（某些包依赖）
    dnf config-manager --set-enabled powertools || true; \
    dnf -y update;
```

### 2.3 依赖安装和清理

```dockerfile
# 分层安装：基础工具
RUN dnf -y install --setopt=tsflags=nodocs \
        curl wget tar ca-certificates fontconfig; \
    # Java 运行环境
    dnf -y install --setopt=tsflags=nodocs \
        java-1.8.0-openjdk java-1.8.0-openjdk-devel; \
    # LibreOffice 办公套件（无头模式）
    dnf -y install --setopt=tsflags=nodocs \
        libreoffice-headless libreoffice-writer; \
    # 语言包
    dnf -y install --setopt=tsflags=nodocs \
        glibc-langpack-zh glibc-langpack-en;

# 字体安装（支持中日韩文字显示）
RUN dnf -y install --setopt=tsflags=nodocs \
        dejavu-fonts-common dejavu-sans-fonts dejavu-serif-fonts dejavu-sans-mono-fonts \
        google-noto-sans-cjk-ttc-fonts google-noto-serif-cjk-ttc-fonts \
        wqy-microhei-fonts || true; \
    # 可选字体（可能在某些仓库中不可用）
    dnf -y install --setopt=tsflags=nodocs wqy-zenhei-fonts || \
        echo "wqy-zenhei-fonts not found, skipping"; \
    # 刷新字体缓存
    fc-cache -fv; \
    # 验证安装
    java -version; \
    libreoffice --version || true; \
    # 清理缓存
    dnf clean all; \
    rm -rf /var/cache/dnf/* /tmp/* /var/tmp/*
```

### 2.4 环境变量配置

```dockerfile
# 语言环境和 Java 路径
ENV LANG=zh_CN.UTF-8 \
    LC_ALL=zh_CN.UTF-8 \
    LANGUAGE=zh_CN:zh \
    LC_CTYPE=zh_CN.UTF-8 \
    JAVA_HOME=/usr/lib/jvm/java-1.8.0-openjdk

ENV PATH="$JAVA_HOME/bin:${PATH}"
```

## 构建和发布

### 3.1 构建多平台镜像并推送

```bash
# 同时构建 AMD64 和 ARM64 架构，并推送到 Docker Hub
docker buildx build \
    --file Dockerfile.cm \
    --platform linux/amd64,linux/arm64 \
    --tag chmi0427/myapp:latest \
    --push .
```

### 3.2 构建单平台镜像（离线部署）

当需要在特定环境中离线部署时，可以构建单平台镜像并导出为 tar 文件。

#### ARM64 架构镜像

```bash
docker buildx build \
    --platform linux/arm64 \
    --file Dockerfile \
    --tag linux8-jdk8-libreoffice:arm64 \
    --output type=docker,dest=./linux8-jdk8-libreoffice-arm64.tar \
    .
```

#### AMD64 架构镜像

```bash
docker buildx build \
    --platform linux/amd64 \
    --file Dockerfile \
    --tag linux8-jdk8-libreoffice:amd64 \
    --output type=docker,dest=./linux8-jdk8-libreoffice-amd64.tar \
    .
```

### 3.3 导入离线镜像

```bash
# 导入 ARM64 镜像
docker load -i linux8-jdk8-libreoffice-arm64.tar

# 导入 AMD64 镜像
docker load -i linux8-jdk8-libreoffice-amd64.tar
```


## 运行和测试

### 4.1 功能测试

以下命令演示如何运行镜像并测试 LibreOffice 文档转换功能。

#### 测试 ARM64 镜像

```bash
docker run -it --rm \
    --platform linux/arm64 \
    -v $(pwd)/:/workspace \
    linux8-jdk8-libreoffice:arm64 \
    bash -c "
        # 转换 Word 文档为 PDF
        libreoffice --headless --convert-to pdf --outdir /workspace /workspace/test.docx
        
        echo '=== 转换完成 ==='
        echo '平台架构: '$(uname -m)
        echo 'Java 版本: '
        java -version 2>&1 | head -1
        echo 'LibreOffice 版本: '
        libreoffice --version 2>/dev/null || echo 'LibreOffice 检测失败'
        echo '输出文件: '
        ls -la /workspace/*.pdf 2>/dev/null || echo '未找到 PDF 文件'
    "
```

#### 测试 AMD64 镜像

```bash
docker run -it --rm \
    --platform linux/amd64 \
    -v $(pwd)/:/workspace \
    linux8-jdk8-libreoffice:amd64 \
    bash -c "
        # 转换 Word 文档为 PDF
        libreoffice --headless --convert-to pdf --outdir /workspace /workspace/test.docx
        
        echo '=== 转换完成 ==='
        echo '平台架构: '$(uname -m)
        echo 'Java 版本: '
        java -version 2>&1 | head -1
        echo 'LibreOffice 版本: '
        libreoffice --version 2>/dev/null || echo 'LibreOffice 检测失败'
        echo '输出文件: '
        ls -la /workspace/*.pdf 2>/dev/null || echo '未找到 PDF 文件'
    "
```

### 4.2 交互式调试

```bash
# 进入容器进行交互式调试
docker run -it --rm \
    -v $(pwd)/:/workspace \
    linux8-jdk8-libreoffice:arm64 \
    bash

# 在容器内手动测试各项功能
# 检查字体安装
fc-list | grep -i noto
# 检查 Java 环境
echo $JAVA_HOME
which java
# 测试 LibreOffice
libreoffice --help
```

## 故障排除

### 5.1 常见问题

| 问题 | 原因 | 解决方案 |
|------|------|----------|
| 构建失败：平台不支持 | Docker Buildx 未正确配置 | 重新运行 `tonistiigi/binfmt` 和 `buildx create` |
| 字体显示异常 | 中文字体未安装 | 检查 `google-noto-sans-cjk-ttc-fonts` 是否安装成功 |
| LibreOffice 转换失败 | 无头模式配置问题 | 确保使用 `--headless` 参数 |
| 网络连接超时 | 代理配置问题 | 检查构建器的代理设置 |

### 5.2 调试命令

```bash
# 检查构建器状态
docker buildx ls

# 查看详细构建日志
docker buildx build --progress=plain ...

# 检查镜像信息
docker buildx imagetools inspect chmi0427/myapp:latest

# 查看镜像层信息
docker history linux8-jdk8-libreoffice:arm64
```

### 5.3 性能优化建议

1. **缓存优化**：将不经常变化的依赖安装放在前面的层
2. **镜像大小**：使用 `.dockerignore` 排除不必要的文件
3. **并行构建**：利用 Buildx 的并行构建能力
4. **多阶段构建**：对于复杂应用，考虑使用多阶段构建减少最终镜像大小

---

## 相关资源

- [Docker Buildx 官方文档](https://docs.docker.com/buildx/)
- [多架构镜像构建指南](https://docs.docker.com/desktop/multi-arch/)
- [AlmaLinux 包管理器优化](https://wiki.almalinux.org/documentation/)