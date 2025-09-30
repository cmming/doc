# Docker Compose 使用指南

## 简介

Docker Compose 是一个用于定义和运行多容器 Docker 应用程序的工具。通过 Compose，您可以使用 YAML 文件来配置应用程序需要的所有服务。然后，使用一个命令，就可以从 YAML 文件配置中创建并启动所有服务。

### 主要特点

- **简化多容器应用管理**：一次定义，多次运行
- **服务编排**：定义服务之间的依赖关系
- **环境隔离**：为不同环境使用不同的配置文件
- **数据卷管理**：持久化数据存储
- **网络管理**：服务间网络通信

## 安装

### Linux/macOS
```sh
# 下载 Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

# 添加执行权限
sudo chmod +x /usr/local/bin/docker-compose

# 验证安装
docker-compose --version
```

### Windows
Docker Desktop for Windows 已包含 Docker Compose

## 基本概念

### docker-compose.yml 文件结构

```yaml
version: '3.8'
services:
  web:
    build: .
    ports:
      - "8000:8000"
    volumes:
      - .:/code
    depends_on:
      - db
  db:
    image: postgres:13
    environment:
      POSTGRES_PASSWORD: password
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:

networks:
  default:
    driver: bridge
```

## 常用命令

### 基础命令

```sh
# 启动所有服务
docker-compose up

# 后台启动
docker-compose up -d

# 启动指定服务
docker-compose up web

# 停止所有服务
docker-compose stop

# 停止指定服务
docker-compose stop web

# 停止并删除容器、网络、卷
docker-compose down

# 停止并删除所有内容（包括卷）
docker-compose down -v
```

### 构建和重启

```sh
# 重新构建镜像
docker-compose build

# 重新构建指定服务
docker-compose build web

# 强制重新构建（不使用缓存）
docker-compose build --no-cache

# 重新构建并启动
docker-compose up --build

# 重新构建指定服务并重启
docker-compose up -d web --build
```

### 日志和监控

```sh
# 查看所有服务日志
docker-compose logs

# 查看指定服务日志
docker-compose logs web

# 实时查看日志
docker-compose logs -f

# 查看最近N行日志
docker-compose logs --tail=50

# 查看运行的容器
docker-compose ps

# 查看详细状态
docker-compose ps -a
```

### 服务管理

```sh
# 重启服务
docker-compose restart

# 重启指定服务
docker-compose restart web

# 暂停服务
docker-compose pause

# 恢复暂停的服务
docker-compose unpause

# 扩展服务实例
docker-compose up --scale web=3
```

### 信息查看

```sh
# 查看配置
docker-compose config

# 验证配置文件
docker-compose config --quiet

# 查看镜像
docker-compose images

# 查看版本
docker-compose version

# 查看帮助
docker-compose --help
```

## 配置文件详解

### 服务配置

```yaml
services:
  web:
    # 使用 Dockerfile 构建
    build:
      context: .
      dockerfile: Dockerfile
      args:
        - ENV=production
    
    # 或使用现有镜像
    image: nginx:alpine
    
    # 端口映射
    ports:
      - "80:80"
      - "443:443"
    
    # 环境变量
    environment:
      - NODE_ENV=production
      - API_URL=http://api:3000
    
    # 或使用环境文件
    env_file:
      - .env
    
    # 数据卷
    volumes:
      - ./src:/app/src
      - node_modules:/app/node_modules
    
    # 网络
    networks:
      - frontend
      - backend
    
    # 依赖关系
    depends_on:
      - db
      - redis
    
    # 重启策略
    restart: unless-stopped
    
    # 容器名称
    container_name: my_web_app
    
    # 命令覆盖
    command: ["npm", "start"]
    
    # 工作目录
    working_dir: /app
    
    # 健康检查
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:80"]
      interval: 30s
      timeout: 10s
      retries: 3
```

### 网络配置

```yaml
networks:
  frontend:
    driver: bridge
  backend:
    driver: bridge
    internal: true
  custom:
    driver: bridge
    ipam:
      config:
        - subnet: 172.20.0.0/16
```

### 数据卷配置

```yaml
volumes:
  # 命名卷
  postgres_data:
    driver: local
  
  # 外部卷
  external_data:
    external: true
```

## 最佳实践

### 1. 文件组织

```sh
project/
├── docker-compose.yml          # 基础配置
├── docker-compose.override.yml # 开发环境覆盖
├── docker-compose.prod.yml     # 生产环境配置
├── .env                        # 环境变量
└── services/
    ├── web/
    │   └── Dockerfile
    └── api/
        └── Dockerfile
```

### 2. 环境变量管理

```yaml
# docker-compose.yml
services:
  web:
    image: nginx:${NGINX_VERSION:-alpine}
    environment:
      - API_URL=${API_URL}
    ports:
      - "${WEB_PORT:-80}:80"
```

```sh
# .env 文件
NGINX_VERSION=1.21-alpine
API_URL=http://localhost:3000
WEB_PORT=8080
```

### 3. 多环境配置

```sh
# 开发环境
docker-compose up

# 生产环境
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d

# 测试环境
docker-compose -f docker-compose.yml -f docker-compose.test.yml up
```

### 4. 数据持久化

```yaml
services:
  db:
    image: postgres:13
    volumes:
      # 数据持久化
      - postgres_data:/var/lib/postgresql/data
      # 初始化脚本
      - ./init.sql:/docker-entrypoint-initdb.d/init.sql:ro

volumes:
  postgres_data:
    driver: local
```

## 实用示例

### Web 应用 + 数据库

```yaml
version: '3.8'
services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgres://user:password@db:5432/myapp
    depends_on:
      - db
    volumes:
      - .:/app
      - /app/node_modules

  db:
    image: postgres:13
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
      POSTGRES_DB: myapp
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

volumes:
  postgres_data:
```

### 微服务架构

```yaml
version: '3.8'
services:
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
    depends_on:
      - api
      - web

  web:
    build: ./frontend
    expose:
      - "3000"

  api:
    build: ./backend
    expose:
      - "8000"
    environment:
      - DATABASE_URL=postgres://user:password@db:5432/api
    depends_on:
      - db
      - redis

  db:
    image: postgres:13
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
      POSTGRES_DB: api
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:alpine
    volumes:
      - redis_data:/data

volumes:
  postgres_data:
  redis_data:
```

## 故障排除

### 常见问题

1. **端口冲突**
   ```sh
   # 查看端口占用
   docker-compose ps
   netstat -tulpn | grep :8080
   ```

2. **容器无法启动**
   ```sh
   # 查看详细日志
   docker-compose logs service_name
   
   # 检查配置
   docker-compose config
   ```

3. **网络连接问题**
   ```sh
   # 查看网络
   docker network ls
   docker network inspect project_default
   ```

4. **数据卷问题**
   ```sh
   # 查看卷
   docker volume ls
   docker volume inspect project_postgres_data
   ```

### 调试技巧

```sh
# 进入运行中的容器
docker-compose exec web bash

# 运行一次性命令
docker-compose run web npm install

# 查看服务配置
docker-compose config web

# 验证文件语法
docker-compose config --quiet
```

## 参考资源

- [Docker Compose 官方文档](https://docs.docker.com/compose/)
- [Compose 文件格式参考](https://docs.docker.com/compose/compose-file/)
- [Docker Compose GitHub](https://github.com/docker/compose)