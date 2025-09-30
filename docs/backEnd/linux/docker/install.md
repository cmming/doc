## 准备工作

### 修改电脑的hostname

```bash

# 查看当前hostname
hostname
# 修改hostname
hostnamectl set-hostname <new hostname>

```

### 关闭防火墙
> 会导致负载均衡无法使用

```bash
# 查看防火墙状态
systemctl status firewalld
# 关闭防火墙
systemctl stop firewalld
# 禁止开机启动
systemctl disable firewalld

```

### 修改内核参数
    
```bash
vi /etc/sysctl.conf
# 启用ip转发
net.ipv4.ip_forward = 1
# 启用iptables链路跟踪机制
net.bridge.bridge-nf-call-iptables=1
```


### docker网络代理

```bash
sudo mkdir -p /etc/systemd/system/docker.service.d
sudo tee /etc/systemd/system/docker.service.d/http-proxy.conf <<EOF
[Service]
Environment="HTTP_PROXY=http://192.168.0.159:7890"
Environment="HTTPS_PROXY=http://192.168.0.159:7890"
Environment="NO_PROXY=localhost,127.0.0.1,::1,.local,.lan,10.0.0.0/8,172.16.0.0/12,192.168.0.0/16"
EOF
sudo systemctl daemon-reload
sudo systemctl restart docker
```

### 系统网络代理

```bash
# 或者 /etc/environment
vi /etc/profile
# 添加如下内容
export http_proxy=http://192.168.0.159:7890
export https_proxy=http://192.168.0.159:7890
export no_proxy=localhost,127.0.0.1,::1,.local,.lan,10.0.0.0/8,172.16.0.0/12,192.168.0.0/16
# 使配置生效
source /etc/profile
```