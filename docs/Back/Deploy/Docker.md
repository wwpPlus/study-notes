---
title: Docker
date: 2023-11-16 17:26:39
permalink: /pages/28c483/
---
# Docker

## Docker 的架构图

![01](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/Docker/01.png)

## Docker 安装

### 安装步骤

[官网安装参考手册](https://docs.docker.com/engine/install/centos/)

> 环境说明：我们使用的是 `CentOS 7 (64-bit)`目前，`CentOS` 仅发行版本中的内核支持 Docker。Docker 运行在 `CentOS 7` 上，要求系统为 64 位、系统内核版本为 `3.10` 以上。

```shell
# 查看自己的内核
uname -r
# 查看版本信息
cat /etc/os-release

# yum安装gcc相关环境（需要确保 虚拟机可以上外网 ）
yum -y install gcc
yum -y install gcc-c++

# 卸载旧版本
yum remove docker \
                docker-client \
                docker-client-latest \
                docker-common \
                docker-latest \
                docker-latest-logrotate \
                docker-logrotate \
                docker-engine

# 安装需要的软件包
yum install -y yum-utils

# 设置镜像仓库使用国内的
yum-config-manager --add-repo http://mirrors.aliyun.com/docker- ce/linux/centos/docker-ce.repo

# 更新yum软件包索引
yum makecache fast

# 安装 Docker CE
yum install docker-ce docker-ce-cli containerd.io

# 启动 Docker
systemctl start docker

# 测试命令
docker version
docker run hello-world
docker images

# 卸载 docker
systemctl stop docker
yum -y remove docker-ce docker-ce-cli containerd.io
rm -rf /var/lib/docker
```

### 阿里云镜像加速

1. 注册一个属于自己的阿里云账户(可复用淘宝账号)
2. 进入管理控制台设置密码，开通
3. 查看镜像加速器

![02](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/Docker/02.jpg)

4. 配置镜像加速

```shell
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json <<-'EOF'
{
    "registry-mirrors": ["https://j21nbvsk.mirror.aliyuncs.com"]
}
EOF
sudo systemctl daemon-reload
sudo systemctl restart docker
```

### 测试

```shell
# 启动hello-world
docker run hello-world
```

**run 干了什么？**

![03](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/Docker/03.jpg)

## Docker 常用命令

### 帮助命令

```shell
## 帮助命令
docker version ## 显示 Docker 版本信息
docker info  ## 显示 Docker 系统信息，包括镜像和容器数
docker --help ## 帮助
```

### 镜像命令

**docker images**

```shell
## 列出本地主机上的镜像
docker images
## 可选项
-a： 列出本地所有镜像
-q： 只显示镜像id
--digests： 显示镜像的摘要信息
```

**docker search**

```shell
## 搜索镜像
docker search mysql
## 可选项
--filter=stars=50 ： 列出收藏数不小于指定值的镜像。
```

**docker pull**

```shell
## 下载镜像
docker pull mysql
## 指定版本下载
docker pull mysql:5.7
```

**docker rmi**

```shell
docker rmi -f 镜像id ## 删除单个
docker rmi -f 镜像名:tag 镜像名:tag ## 删除多个
docker rmi -f $(docker images -qa) ## 删除全部
```

### 容器命令

**说明：有镜像才能创建容器，这里使用 centos 的镜像来测试，就是虚拟一个 centos ！**

```shell
docker pull centos
```

**新建容器并启动**

```shell
docker run [OPTIONS] IMAGE [COMMAND][ARG...]

## 常用参数说明
--name="Name" ## 给容器指定一个名字
-d ## 后台方式运行容器，并返回容器的id！
-i ## 以交互模式运行容器，通过和 -t 一起使用
-t ## 给容器重新分配一个终端，通常和 -i 一起使用
-P ## 随机端口映射（大写）
-p ## 指定端口映射（小结），一般可以有四种写法
    ip:hostPort:containerPort
    ip::containerPort
    hostPort:containerPort (常用)
    containerPort

## 测试
docker images
## 使用centos进行用交互模式启动容器，在容器内执行/bin/bash命令！
docker run -it centos /bin/bash
exit ## 使用 exit 退出容器
```

**列出所有运行的容器**

```shell
## 命令
docker ps [OPTIONS]
## 常用参数说明
-a ## 列出当前所有正在运行的容器 + 历史运行过的容器
-l ## 显示最近创建的容器
-n=? ## 显示最近n个创建的容器
-q ## 静默模式，只显示容器编号。
```

**退出容器**

```shell
exit ## 容器停止退出
ctrl+P+Q ## 容器不停止退出
```

**启动停止容器**

```shell
docker start (容器id or 容器名) ## 启动容器
docker restart (容器id or 容器名) ## 重启容器
docker stop (容器id or 容器名) ## 停止容器
docker kill (容器id or 容器名) ## 强制停止容器
```

**删除容器**

```shell
docker rm 容器id ## 删除指定容器
docker rm -f $(docker ps -a -q) ## 删除所有容器
docker ps -a -q|xargs docker rm ## 删除所有容器
```

### 常用其他命令

**后台启动容器**

```shell
## 命令
docker run -d 容器名

## 例子
docker run -d centos ## 启动centos，使用后台方式启动

## 问题： 使用docker ps 查看，发现容器已经退出了！
## 解释：Docker容器后台运行，就必须有一个前台进程，容器运行的命令如果不是那些一直挂起的命 令，就会自动退出。
## 比如，你运行了nginx服务，但是docker前台没有运行应用，这种情况下，容器启动后，会立即自 杀，因为他觉得没有程序了，所以最好的情况是，将你的应用使用前台进程的方式运行启动。
```

**查看日志**

```shell
## 命令
docker logs -f -t --tail 容器id

## 例子：我们启动 centos，并编写一段脚本来测试玩玩！最后查看日志
docker run -d centos /bin/sh -c "while true;do echo kuangshen;sleep 1;done"
docker ps
CONTAINER ID      IMAGE
c8530dbbe3b4      centos

## -t 显示时间戳
## -f 打印最新的日志
## --tail 数字 显示多少条！
docker logs -tf --tail 10 [CONTAINERID]
```

**查看容器中运行的进程信息，支持 ps 命令参数。**

```shell
## 命令
docker top 容器id
```

**查看容器/镜像的元数据**

```shell
## 命令
docker inspect 容器id
```

**进入正在运行的容器**

```shell
## 命令1
docker exec -it 容器id bashShell

## 测试1
docker ps
docker exec -it c8530dbbe3b4 /bin/bash
ps -ef

## 命令2
docker attach 容器id

## 测试2
docker exec -it c8530dbbe3b4 /bin/bash
ps -ef

## 区别
## exec 是在容器中打开新的终端，并且可以启动新的进程
## attach 直接进入容器启动命令的终端，不会启动新的进程
```

**从容器内拷贝文件到主机上**

```shell
## 命令
docker cp 容器id:容器内路径 目的主机路径

## 测试
## 容器内执行，创建一个文件测试
cd /home
touch f1
ls
exit

## linux复制查看，是否复制成功
docker cp c8530dbbe3b4:/home/f1 /home
cd /home
ls
```

### 常用命令

![1](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/Docker/1.png)

| 命令    | 描述                                                                                  |
| ------- | ------------------------------------------------------------------------------------- |
| attach  | 连接指定运行镜像                                                                      |
| build   | 通过 Dockerfile 定制镜像                                                              |
| commit  | 提交当前容器为新的镜像                                                                |
| cp      | 从容器中拷贝指定文件或者目录到宿主机中                                                |
| create  | 创建一个新的容器，同 run，但不启动容器                                                |
| diff    | 查看 docker 容器变化                                                                  |
| events  | 从 docker 服务获取容器实时事件                                                        |
| exec    | 在已存在的容器上运行命令                                                              |
| export  | 导出容器的内容流作为一个 tar 归档文件[对应 import]                                    |
| history | 展示一个镜像形成历史                                                                  |
| images  | 列出系统当前镜像                                                                      |
| import  | 从 tar 包中的内容创建一个新的文件系统映像[对应 export]                                |
| info    | 显示系统相关信息                                                                      |
| inspect | 查看容器详细信息                                                                      |
| kill    | kill 指定 docker 容器                                                                 |
| load    | 从一个 tar 包中加载一个镜像[对应 save]                                                |
| login   | 注册或者登陆一个 docker 源服务器                                                      |
| logout  | 从当前 Docker registry 退出                                                           |
| logs    | 输出当前容器日志信息                                                                  |
| port    | 查看映射端口对应的容器内部源端口                                                      |
| pause   | 暂停容器                                                                              |
| ps      | 列出容器列表                                                                          |
| pull    | 从 docker 镜像源服务器拉取指定镜像或者库镜像                                          |
| push    | 推送指定镜像或者库镜像至 docker 源服务器                                              |
| restart | 重启运行的容器                                                                        |
| rm      | 移除一个或者多个容器                                                                  |
| rmi     | 移除一个或多个镜像[无容器使用该镜像才可删除，否则需删除相关容器才可继续或-f 强制删除] |
| run     | 创建一个新的容器并运行一个命令                                                        |
| save    | 保存一个镜像为一个 tar 包[对应 load]                                                  |
| search  | 在 docker hub 中搜索镜像                                                              |
| start   | 启动容器                                                                              |
| stop    | 停止容器                                                                              |
| tag     | 给源中镜像打标签                                                                      |
| top     | 查看容器中运行的进程信息                                                              |
| unpause | 取消暂停容器                                                                          |
| version | 查看 docker 版本号                                                                    |
| wait    | 截取容器停止时的退出状态值                                                            |

## 安装示例

### 安装 Nginx

```bash
# 1、搜索镜像
docker search nginx
# 2、拉取镜像
docker pull nginx
# 3、启动容器
docker images
docker run -d --name mynginx -p 3500:80 nginx
docker ps
# 4、测试访问
curl localhost:3500
# 5、进入容器
docker exec -it mynginx /bin/bash
whereis nginx ## 寻找nginx
# nginx: /usr/sbin/nginx /usr/lib/nginx /etc/nginx /usr/share/nginx
cd /usr/share/nginx ## nginx 的路径
ls
# html
cd html ## 首页的位置
ls
# 50x.html index.html
cat index.html
```

### 安装 tomcat

```shell
## 官方文档解释
## -it ：交互模式
## --rm：容器启动成功并退出以后容器就自动移除，一般在测试情况下使用！
docker run -it --rm tomcat:9.0

## 1、下载tomcat镜像
docker pull tomcat

## 2、启动
docker run -d -p 8080:8080 --name tomcat9 tomcat

## 3、进入tomcat
docker exec -it tomcat9 /bin/bash
## 可以使用容器卷将容器内文件和 Linux 进行映射挂载
```

### 安装 mysql

```shell
## 1、搜索镜像
docker search mysql

## 2、拉取镜像
docker pull mysql:5.7

## 3、启动容器 -e 环境变量！
## 注意： mysql的数据应该不丢失！先体验下 -v 挂载卷！ 参考官方文档
docker run -d -p 3310:3306 -v /home/mysql/conf:/etc/mysql/conf.d -v /home/mysql/data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=123456 --name mysql01 mysql:5.7

## 4、使用本地的sqlyog连接测试一下 3310

## 5、查看本地的 /home/mysql 目录
pwd
#/home/mysql/data
ls
## 可以看到我们刚刚建立的mysql数据库在本地存储着

## 6、删除mysql容器
docker rm -f mysql01 ## 删除容器，然后发现远程连接失败！
ls
## 可以看到我们刚刚建立的mysql数据库在本地存储着
```

### 部署 es + kibana

```shell
## 我们启动es这种容器需要考虑几个问题
# 1、端口暴露问题 9200、9300
# 2、数据卷的挂载问题 data、plugins、conf
# 3、吃内存 - "ES_JAVA_OPTS=-Xms512m -Xmx512m"

## 扩展命令
docker stats 容器id ## 查看容器的cpu内存和网络状态

## 1、启动es测试
docker run -d --name elasticsearch -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" elasticsearch:7.6.2

## 2、启动之后很卡，使用 docker stats 容器id 查看下cpu状态 ，发现占用的很大
CONTAINER ID NAME          CPU % MEM USAGE / LIMIT   MEM %
249ae46da625 elasticsearch 0.00% 1.036GiB / 1.716GiB 60.37%

## 3、测试访问
curl localhost:9200

## 4、增加上内存限制启动
docker run -d --name elasticsearch -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" -e ES_JAVA_OPTS="-Xms64m -Xmx512m" elasticsearch:7.6.2

## 5、启动之后，使用 docker stats 查看下cpu状态
CONTAINER ID NAME          CPU % MEM USAGE / LIMIT MEM %
d2860684e7e4 elasticsearch 0.24% 358.3MiB / 1.716GiB 20.40%

## 6、测试访问，效果一样，ok！
curl localhost:9200
## 思考：如果我们要使用 kibana , 如果配置连接上我们的es呢？网络该如何配置呢？见网络部分
```

![2](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/Docker/2.png)

### 部署 Redis 集群

![25](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/Docker/25.png)

```shell
## 创建网卡
docker network create redis --subnet 172.38.0.0/16

## 通过脚本创建六个redis配置
for port in $(seq 1 6); \
do \
mkdir -p /mydata/redis/node-${port}/conf
touch /mydata/redis/node-${port}/conf/redis.conf
cat << EOF >/mydata/redis/node-${port}/conf/redis.conf
port 6379
bind 0 .0.0.0
cluster-enabled yes
cluster-config-file nodes.conf
cluster-node-timeout 5000
cluster-announce-ip 172 .38.0.1${port}
cluster-announce-port 6379
cluster-announce-bus-port 16379
appendonly yes
EOF
done

docker run -p 637 ${port}:6379 -p 1637 ${port}:16379 --name redis-${port} \
-v /mydata/redis/node-${port}/data:/data \
-v /mydata/redis/node-${port}/conf/redis.conf:/etc/redis/redis.conf \
-d --net redis --ip 172 .38.0.1${port} redis:5.0.9-alpine3.11 redis-server/etc/redis/redis.conf; \

## 启动 6 个容器
docker run -p 6371 :6379 -p 16371 :16379 --name redis-1 \
-v /mydata/redis/node-1/data:/data \
-v /mydata/redis/node-1/conf/redis.conf:/etc/redis/redis.conf \
-d --net redis --ip 172 .38.0.11 redis:5.0.9-alpine3.11 redis-server/etc/redis/redis.conf

docker run -p 6376 :6379 -p 16376 :16379 --name redis-6 \
-v /mydata/redis/node-6/data:/data \
-v /mydata/redis/node-6/conf/redis.conf:/etc/redis/redis.conf \
-d --net redis --ip 172 .38.0.16 redis:5.0.9-alpine3.11 redis-server/etc/redis/redis.conf

## 进入一个redis，注意这里是 sh命令
docker exec -it redis-1 /bin/sh

## 创建集群
redis-cli --cluster create 172.38.0.11:6379 172.38.0.12:6379 172.38.0.13:6379 172.38.0.14:6379 172.38.0.15:6379 172.38.0.16:6379 --cluster-replicas 1

## 连接集群
redis-cli -c

## 查看集群信息
cluster info

## 查看节点
cluster nodes

## set a b
## 停止存值的容器
## 然后再次get a，发现依旧可以获取值
## 查看节点，发现高可用完全没问题
```

## Docker 镜像

### 概述

> 镜像是一种轻量级、可执行的独立软件包，用来打包软件运行环境和基于运行环境开发的软件，它包含
> 运行某个软件所需的所有内容，包括代码、运行时、库、环境变量和配置文件。

### 特点

> Docker 镜像都是只读的，当容器启动时，一个新的可写层被加载到镜像的顶部！<br>
> 这一层就是我们通常说的容器层，容器之下的都叫镜像层！

### 镜像 Commit

```shell
docker commit 提交容器副本使之成为一个新的镜像！
## 语法
docker commit -m="提交的描述信息" -a="作者" 容器id 要创建的目标镜像名:[标签名]
```

## DockerFile

> 微服务打包成镜像流程：开发应用=>DockerFile=>打包为镜像=>上传到仓库（私有仓库，公有仓库）=> 下载镜像 => 启动<br>

![21](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/Docker/21.png)

### DockerFile 概念

dockerfile 是用来构建 Docker 镜像的构建文件，是由一系列命令和参数构成的脚本。<br>
构建步骤：<br>

- 1、编写 DockerFile 文件
- 2、docker build 构建镜像
- 3、docker run

[查看 centos DockerFile 文件](https://hub.docker.com/_/centos)

### DockerFile 构建过程

#### 基础知识

1. 每条保留字指令都必须为大写字母且后面要跟随至少一个参数
2. 指令按照从上到下，顺序执行
3. `##` 表示注释
4. 每条指令都会创建一个新的镜像层，并对镜像进行提交

#### 流程

1. docker 从基础镜像运行一个容器
2. 执行一条指令并对容器做出修改
3. 执行类似 docker commit 的操作提交一个新的镜像层
4. Docker 再基于刚提交的镜像运行一个新容器
5. 执行 dockerfile 中的下一条指令直到所有指令都执行完成！

### DockerFile 指令

| 指令       | 描述                                                                                      |
| ---------- | ----------------------------------------------------------------------------------------- |
| FROM       | 基础镜像，当前新镜像是基于哪个镜像的                                                      |
| MAINTAINER | 镜像维护者的姓名混合邮箱地址                                                              |
| RUN        | 容器构建时需要运行的命令                                                                  |
| EXPOSE     | 当前容器对外保留出的端口                                                                  |
| WORKDIR    | 指定在创建容器后，终端默认登录的进来工作目录，一个落脚点                                  |
| ENV        | 用来在构建镜像过程中设置环境变量                                                          |
| ADD        | 将宿主机目录下的文件拷贝进镜像且 ADD 命令会自动处理 URL 和解压 tar 压缩包                 |
| COPY       | 类似 ADD，拷贝文件和目录到镜像中！                                                        |
| VOLUME     | 容器数据卷，用于数据保存和持久化工作                                                      |
| CMD        | 指定一个容器启动时要运行的命令，dockerFile 中可以有多个 CMD 指令，但只有最后一个生效！    |
| ENTRYPOINT | 指定一个容器启动时要运行的命令！和 CMD 一样                                               |
| ONBUILD    | 当构建一个被继承的 DockerFile 时运行命令，父镜像在被子镜像继承后，父镜像的 ONBUILD 被触发 |

### 实战测试

`Docker Hub` 中 99% 的镜像都是通过在 base 镜像（Scratch）中安装和配置需要的软件构建出来的

#### 自定义镜像

**自定义一个 centos，编写 DockerFile，使我们自己的镜像具备如下：登陆后的默认路径、vim 编辑器、查看网络配置 ifconfig 支持**

**1、编写 DockerFile**

```sh
mkdir dockerfile-test
vim mydockerfile-centos ## 编辑文件
cat mydockerfile-centos
## FROM centos
## MAINTAINER kuangshen<24736743@qq.com>

## ENV MYPATH /usr/local
## WORKDIR $MYPATH

## RUN yum -y install vim
## RUN yum -y install net-tools

## EXPOSE 80

## CMD echo $MYPATH
## CMD echo "----------end--------"
## CMD /bin/bash
```

**2、构建**

```shell
docker build -f dockerfile地址 - t 新镜像名字:TAG.
```

> 会看到 docker build 命令最后有一个. 表示当前目录

```shell
docker build -f mydockerfile-centos -t mycentos:0.1
```

**3、运行**

```shell
docker run -it 新镜像名字:TAG
## 测试 vim ifconfig 命令
```

**4、列出镜像地的变更历史**

```shell
docker history 镜像名
```

#### CMD 命令

```shell
## 1、构建dockerfile
vim dockerfile-cmd-test
cat dockerfile-cmd-test
## FROM centos
## CMD [ "ls", "-a" ]

## 2、build 镜像
docker build -f dockerfile-cmd-test -t cmdtest.

## 3、执行 可以看到文件目录
docker run 554bc6952657

## 4、如果我们希望用 -l 列表展示信息，我们就需要加上 -l参数
docker run cmdtest -l

## 报错，executable file not found。
## 跟在镜像名后面的是 command，运行时会替换 CMD 的默认值。
## 必须重新完整的输入这个命令。
docker run cmdtest ls -al
```

#### ENTRYPOINT 命令

```shell
## 1、2、3 同 CMD
## 4、测试-l参数，发现可以直接使用，这里就是一种追加。
docker run entrypointtest -l
## 可以看到文件列表
```

> CMD 和 ENTRYPOINT 的区别
>
> 两个命令都是指定一个容器启动时要运行的命令<br>
> CMD：Dockerfile 中可以有多个 CMD 指令，但只有最后一个生效，CMD 会被 docker run 之后的参数替换！<br>
> ENTRYPOINT：docker run 之后的参数会被当做参数传递给 ENTRYPOINT，之后形成新的命令组合！<br>

#### 自定义镜像 tomcat

1. `mkdir -p kuangshen/build/tomcat`
2. 在上述目录下 `touch read.txt`
3. 将 `JDK` 和 `tomcat` 安装的压缩包拷贝进上一步目录
4. 在 `/kuangshen/build/tomcat` 目录下新建一个 `Dockerfile` 文件

```shell
## vim Dockerfile

FROM centos
MAINTAINER kuangshen<24736743@qq.com>
#把宿主机当前上下文的read.txt拷贝到容器/usr/local/路径下
COPY read.txt /usr/local/cincontainer.txt
#把java与tomcat添加到容器中
ADD jdk-8u11-linux-x64.tar.gz /usr/local/
ADD apache-tomcat-9.0.22.tar.gz /usr/local/
#安装vim编辑器
RUN yum -y install vim
#设置工作访问时候的WORKDIR路径，登录落脚点
ENV MYPATH /usr/local
WORKDIR $MYPATH
#配置java与tomcat环境变量
ENV JAVA_HOME /usr/local/jdk1.8.0_11
ENV CLASSPATH $JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar
ENV CATALINA_HOME /usr/local/apache-tomcat-9.0.22
ENV CATALINA_BASE /usr/local/apache-tomcat-9.0.22
ENV PATH $PATH:$JAVA_HOME/bin:$CATALINA_HOME/lib:$CATALINA_HOME/bin
#容器运行时监听的端口
EXPOSE 8080
#启动时运行tomcat
## ENTRYPOINT ["/usr/local/apache-tomcat-9.0.22/bin/startup.sh" ]
## CMD ["/usr/local/apache-tomcat-9.0.22/bin/catalina.sh","run"]
CMD /usr/local/apache-tomcat-9.0.22/bin/startup.sh && tail -F
/usr/local/apache-tomcat-9.0.22/bin/logs/catalina.out
```

**当前文件状态**

![14](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/Docker/14.png)

**1. 构建镜像**

```shell
docker build -t diytomcat.

## 查看确定构建完毕！
docker images
```

**2. 运行启动 run**

```shell
docker run -d -p 9090 :8080 --name mydiytomcat -v /home/kuangshen/build/tomcat/test:/usr/local/apache-tomcat-9.0.22/webapps/test -v /home/kuangshen/build/tomcat/tomcat9logs/:/usr/local/apache-tomcat-9.0.22/logs --privileged=true diytomcat
```

![13](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/Docker/13.png)

> 备注：Docker 挂载主机目录 Docker 访问出现 cannot open directory .: Permission denied<br>
> 解决办法：在挂载目录后多加一个--privileged=true 参数即可

**3. 验证测试访问！**

```shell
curl localhost:9090
```

**4. 查看日志**

```shell
cd tomcat9logs/
cat catalina.out
```

### 发布镜像

#### DockerHub

**[注册 dockerhub](https://hub.docker.com/signup) ，需要有一个账号**

```shell
## 1、查看登录命令
docker login --help
## 2、登录
docker login -u kuangshen
## 3、将镜像发布出去
docker push kuangshen/diytomcat:1.0

## 拒绝：请求的资源访问被拒绝
denied: requested access to the resource is denied

## 问题：本地镜像名无帐号信息，解决加 tag即可
docker tag 251ca4419332 kuangshen/diytomcat:1.0

## 再次 push， ok
docker push kuangshen/diytomcat:1.0
```

#### 阿里云镜像服务

1. 登录阿里云
2. 找到容器镜像服务
3. 创建命名空间
4. 创建镜像仓库
5. 点击进入这个镜像仓库，可以看到所有的信息
6. 测试推送发布

```shell
## 1、登录阿里云
docker login --username=18225148644 registry.cn-beijing.aliyuncs.com
## 2、设置 tag
docker tag 251ca4419332 registry.cn-beijing.aliyuncs.com/bilibili-kuangshen/kuangshen-test:v1.0
## 3、推送命令
docker push registry.cn-beijing.aliyuncs.com/bilibili-kuangshen/kuangshen-test:v1.0
```

7. 在阿里云镜像仓库查看效果！

## Docker Compose

[Docker Compose 官方文档](https://docs.docker.com/compose/)

Compose 是用于定义和运行多容器 Docker 应用程序的工具。

Compose 使用的三个步骤：

1. 使用 Dockerfile 定义应用程序的环境。
2. 使用 docker-compose.yml 定义构成应用程序的服务，这样它们可以在隔离环境中一起运行。
3. 最后，执行 docker-compose up 命令来启动并运行整个应用程序。

### Compose 安装

Linux 上我们可以从 Github 上下载它的二进制包来使用，[最新发行的版本地址](https://github.com/docker/compose/releases)

```shell
# 1、下载 Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/v2.2.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
# 要安装其他版本的 Compose，请替换 v2.2.2。
# 高速安装 Docker Compose
sudo curl -L https://get.daocloud.io/docker/compose/releases/download/v2.4.1/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose

# 2、可执行权限应用于二进制文件
sudo chmod +x /usr/local/bin/docker-compose

# 3、创建软链
sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose

# 4、测试是否安装成功
docker-compose version
```

### Docker Compose 常用命令

| 命令                                                         | 描述                                              |
| ------------------------------------------------------------ | ------------------------------------------------- |
| `docker-compose build`                                       | 使用默认的 `docker-compose.yml` 文件构建镜像      |
| `docker-compose build --no-cache`                            | 不使用缓存的方式构建镜像                          |
| `docker-compose build -f docker-compose1.yml`                | 使用指定的 `docker-compose1.yml` 文件模板构建镜像 |
| `docker-compose images`                                      | 列出由 Compose 文件构建的镜像                     |
| `docker-compose up -d`                                       | 启动所有编排容器服务                              |
| `docker-compose ps`                                          | 查看正在运行中的容器                              |
| `docker-compose ps -a`                                       | 查看所有编排容器，包括已停止的容器                |
| `docker-compose exec nginx bash`                             | 进入指定容器执行命令                              |
| `docker-compose exec web python manage.py migrate --noinput` | 在指定容器内执行 Django 数据库迁移命令            |
| `docker-compose logs -f web`                                 | 查看 web 容器的实时日志                           |
| `docker-compose down`                                        | 停止所有由 `up` 命令启动的容器                    |
| `docker-compose down -v`                                     | 停止所有由 `up` 命令启动的容器，并移除数据卷      |
| `docker-compose restart web`                                 | 重新启动停止的 web 服务容器                       |
| `docker-compose pause web`                                   | 暂停 web 容器                                     |
| `docker-compose unpause web`                                 | 恢复 web 容器                                     |
| `docker-compose rm web`                                      | 删除 web 容器（在删除前必须先停止容器）           |
| `docker-compose top`                                         | 查看各个服务容器内正在运行的进程                  |

### docker-compose.yml

使用 Docker Compose 配置的多个容器服务的示例。其中包括了 MySQL 和 Redis 服务。每个服务都有相应的配置，包括容器名称、镜像、构建信息、环境变量、挂载目录、端口映射等。通过 Docker Compose 可以方便地管理和启动这些容器服务。

```yml
version: "2.1"
services:
  lottery-mysql:
    container_name: lottery-mysql
    image: mysql:5.7
    build:
      context: ./mysql   # MySQL服务的构建上下文路径
      dockerfile: Dockerfile   # MySQL服务的Dockerfile路径
    ports:
      - "3306:3306"   # 映射MySQL服务的默认端口号
    volumes:
      - ./mysql/conf:/etc/mysql/conf.d   # 挂载MySQL服务的配置文件目录
      - ./mysql/logs:/logs   # 挂载MySQL服务的日志目录
      - ./mysql/data:/var/lib/mysql   # 挂载MySQL服务的数据目录
    command: [
      'mysqld',
      '--innodb-buffer-pool-size=80M',
      '--character-set-server=utf8mb4',
      '--collation-server=utf8mb4_bin',
      '--default-time-zone=+8:00',
      '--lower-case-table-names=1'
    ]   # 定义MySQL服务的启动命令及参数
    environment:
      MYSQL_ROOT_PASSWORD: '自己的数据库密码 '   # 设置MySQL服务的root用户密码，请替换为你自己的密码

  lottery-redis:
    container_name: lottery-redis
    image: redis
    build:
      context: ./redis   # Redis服务的构建上下文路径
      dockerfile: Dockerfile   # Redis服务的Dockerfile路径
    ports:
      - "6379:6379"   # 映射Redis服务的默认端口号
    volumes:
      - ./redis/conf/redis.conf:/home/lottery/redis/redis.conf   # 挂载Redis服务的配置文件
      - ./redis/data:/data   # 挂载Redis服务的数据目录
    command: redis-server /home/lottery/redis/redis.conf   # 定义Redis服务的启动命令及参数
```

## 容器数据卷

### 概述

> 为了防止在删除容器的时候造成数据丢失，Docker 提供了数据卷（Volume）这个功能，数据卷是目录或文件，存在于一个或多个容器中，由 Docker 挂载到容器里。
> 卷的设计目的就是数据的持久化，完全独立于容器的生存周期，因此 Docker 不会在容器删除时删除其挂载的数据卷。

### 特点

1. 数据卷可在容器之间共享或重用数据
2. 卷中的更改可以直接生效
3. 数据卷中的更改不会包含在镜像的更新中
4. 数据卷的生命周期一直持续到没有容器使用它为止

### 使用数据卷

#### 1. 容器中使用命令来添加

```shell
## 命令
docker run -it -v 宿主机绝对路径目录:容器内目录 镜像名
## 测试
docker run -it -v /home/ceshi:/home centos /bin/bash

## 匿名挂载 -v 容器内路径
docker run -d -P --name nginx01 -v /etc/nginx nginx

## 匿名挂载的缺点，就是不好维护，通常使用命令 docker volume维护
docker volume ls

## 具名挂载 -v 卷名:/容器内路径
docker run -d -P --name nginx02 -v nginxconfig:/etc/nginx nginx

## 查看挂载的路径
docker volume inspect nginxconfig
[
    { "CreatedAt": "2020-05-13T17:23:00+08:00",
    "Driver": "local",
    "Labels": null,
    "Mountpoint": "/var/lib/docker/volumes/nginxconfig/_data",
    "Name": "nginxconfig",
    "Options": null,
    "Scope": "local"
    }
]
## 所有的docker容器内的卷，没有指定目录的情况下都是在/var/1ib/docker/volumes/xxxx/_data

## 怎么判断挂载的是卷名而不是本机目录名？ 不是/开始就是卷名，是/开始就是目录名
## 指定容器对我们挂载出来的内容的读写权限
docker run -d -P --name nginx02 -v nginxconfig:/etc/nginx:ro nginx
docker run -d -P --name nginx02 -v nginxconfig:/etc/nginx:rw nginx
```

#### 2. Docker File 添加数据卷

> DockerFile 是用来构建 Docker 镜像的构建文件，是由一些列命令和参数构成的脚本。

**测试**：

```shell
## 1、我们在宿主机 /home 目录下新建一个 docker-test-volume文件夹
mkdir docker-test-volume
## 2、编写DockerFile文件
cd docker-test-volume
vim dockerfile1
cat dockerfile1

## volume test
FROM centos
VOLUME ["/dataVolumeContainer1","/dataVolumeContainer2"]
CMD echo "-------end------"
CMD /bin/bash

## 3、build后生成镜像，获得一个新镜像 kuangshen/centos

docker build -f /home/docker-test-volume/dockerfile1 -t kuangshen/centos. #注意最后有个.

## 4、启动容器
[root@kuangshen docker-test-volume]## docker run -it 0e97e1891a3d /bin/bash #启动容器
[root@f5824970eefc /]## ls -l
total 56
lrwxrwxrwx 1 root root 7 May 11  2019 bin -> usr/bin
drwxr-xr-x 2 root root 4096 May 11 11 :55 dataVolumeContainer1 ## 数据卷目录
drwxr-xr-x 2 root root 4096 May 11 11 :55 dataVolumeContainer2 ## 数据卷目录
drwxr-xr-x 5 root root 360 May 11 11 :55 dev
drwxr-xr-x 1 root root 4096 May 11 11 :55 etc
drwxr-xr-x 2 root root 4096 May 11  2019 home
...

## 问题:通过上述步骤，容器内的卷目录地址就已经知道了，但是对应的主机目录地址在哪里呢？

## 5、我们在数据卷中新建一个文件
[root@f5824970eefc dataVolumeContainer1]## pwd
/dataVolumeContainer1
[root@f5824970eefc dataVolumeContainer1]## touch container.txt
[root@f5824970eefc dataVolumeContainer1]## ls -l
total 0
-rw-r--r-- 1 root root 0 May 11 11 :58 container.txt

## 6、查看下这个容器的信息
docker inspect 0e97e1891a3d

## 查看输出的Volumes
"Volumes": {
"/dataVolumeContainer1": {},
"/dataVolumeContainer2": {}
},

## 7、这个卷在主机对应的默认位置
```

![9](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/Docker/9.png)

> 注意：如果访问出现了 cannot open directory: Permission denied
> 解决办法：在挂载目录后多加一个 --privileged=true 参数即可

### 数据卷容器

> 命名的容器挂载数据卷，其他容器通过挂载这个（父容器）实现数据共享，挂载数据卷的容器，称之为数据卷容器。<br>
> 我们使用上一步的镜像：kuangshen/centos 为模板，运行容器 docker01，docker02，docker03，他们都会具有容器卷

```shell
"/dataVolumeContainer1"
"/dataVolumeContainer2"
```

我们来测试下，容器间传递共享

**1、先启动一个父容器 docker01，然后在 dataVolumeContainer2 新增文件**

![10](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/Docker/10.png)

![11](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/Docker/11.png)

> 退出不停止：ctrl+P+Q

**2、创建 docker02，docker03 让他们继承 docker01 --volumes-from**

```shell
[root@kuangshen docker-test-volume]## docker run -it --name docker02 --volumes-from docker01 kuangshen/centos
[root@ea4c82779077 /]## cd /dataVolumeContainer2
[root@ea4c82779077 dataVolumeContainer2]## ls
docker01.txt
[root@95164598b306 dataVolumeContainer2]## touch docker02.txt
[root@95164598b306 dataVolumeContainer2]## ls
docker01.txt docker02.txt

[root@kuangshen docker-test-volume]## docker run -it --name docker03 --volumes-from docker01 kuangshen/centos
[root@ea4c82779077 /]## cd /dataVolumeContainer2
[root@ea4c82779077 dataVolumeContainer2]## ls
docker01.txt docker02.txt
[root@95164598b306 dataVolumeContainer2]## touch docker03.txt
[root@95164598b306 dataVolumeContainer2]## ls
docker01.txt docker02.txt docker03.txt
```

**3、回到 docker01 发现可以看到 02 和 03 添加的共享文件**

```shell
[root@kuangshen docker-test-volume]## docker attach docker01
[root@799b6ea5db7c dataVolumeContainer2]## ls -l
total 0
-rw-r--r-- 1 root root 0 May 11 13 :20 docker01.txt
-rw-r--r-- 1 root root 0 May 11 13 :22 docker02.txt
-rw-r--r-- 1 root root 0 May 11 13 :24 docker03.txt
```

**4、删除 docker01，docker02 修改后 docker03 还能不能访问**

```shell
[root@kuangshen docker-test-volume]## docker rm -f docker01
docker01
[root@kuangshen docker-test-volume]## docker attach docker02
[root@ea4c82779077 dataVolumeContainer2]## ls -l
total 0
-rw-r--r-- 1 root root 0 May 11 13 :20 docker01.txt
-rw-r--r-- 1 root root 0 May 11 13 :22 docker02.txt
-rw-r--r-- 1 root root 0 May 11 13 :24 docker03.txt
[root@ea4c82779077 dataVolumeContainer2]## touch docker02-update.txt
[root@ea4c82779077 dataVolumeContainer2]## ls -a
. .. docker01.txt docker02.txt docker02-update.txt docker03.txt
## Ctrl+P+Q 退出容器
[root@kuangshen docker-test-volume]## docker attach docker03
[root@95164598b306 dataVolumeContainer2]## ls -l
total 0
-rw-r--r-- 1 root root 0 May 11 13 :20 docker01.txt
-rw-r--r-- 1 root root 0 May 11 13 :22 docker02.txt
-rw-r--r-- 1 root root 0 May 11 13 :29 docker02-update.txt
-rw-r--r-- 1 root root 0 May 11 13 :24 docker03.txt
```

**5、删除 docker02 ，docker03 还能不能访问**

```bash
[root@kuangshen docker-test-volume]## docker ps
CONTAINER ID IMAGE
95164598b306 kuangshen/centos
ea4c82779077 kuangshen/centos
[root@kuangshen docker-test-volume]## docker rm -f docker02
docker02
[root@kuangshen docker-test-volume]## docker attach docker03
[root@95164598b306 dataVolumeContainer2]## ls -l
total 0
-rw-r--r-- 1 root root 0 May 11 13 :20 docker01.txt
-rw-r--r-- 1 root root 0 May 11 13 :22 docker02.txt
-rw-r--r-- 1 root root 0 May 11 13 :29 docker02-update.txt
-rw-r--r-- 1 root root 0 May 11 13 :24 docker03.txt
[root@95164598b306 dataVolumeContainer2]## touch docker03-update.txt
```

**6、新建 docker04 继承 docker03，然后再删除 docker03，看下是否可以访问！**

![12](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/Docker/12.png)

```shell
[root@2119f4f23a92 /]## cd dataVolumeContainer2
[root@2119f4f23a92 dataVolumeContainer2]## ls -l
total 0
-rw-r--r-- 1 root root 0 May 11 13 :20 docker01.txt
-rw-r--r-- 1 root root 0 May 11 13 :22 docker02.txt
-rw-r--r-- 1 root root 0 May 11 13 :29 docker02-update.txt
-rw-r--r-- 1 root root 0 May 11 13 :32 docker03-update.txt
-rw-r--r-- 1 root root 0 May 11 13 :24 docker03.txt

## 查看当前运行的容器
[root@kuangshen docker-test-volume]## docker ps
CONTAINER ID IMAGE NAMES
2119f4f23a92 kuangshen/centos docker04
95164598b306 kuangshen/centos docker03

## 继续删除docker03
[root@kuangshen docker-test-volume]## docker rm -f docker03
docker03
[root@kuangshen docker-test-volume]## docker attach docker04
[root@2119f4f23a92 dataVolumeContainer2]## ls -l
total 0
-rw-r--r-- 1 root root 0 May 11 13 :20 docker01.txt
-rw-r--r-- 1 root root 0 May 11 13 :22 docker02.txt
-rw-r--r-- 1 root root 0 May 11 13 :29 docker02-update.txt
-rw-r--r-- 1 root root 0 May 11 13 :32 docker03-update.txt
-rw-r--r-- 1 root root 0 May 11 13 :24 docker03.txt
```

**7、总结**

> 容器之间配置信息的传递，数据卷的生命周期一直持续到没有容器使用它为止。<br>
> 存储在本机的文件则会一直保留！

## Docker 网络讲解

### Docker0 原理

1. 每一个安装了 Docker 的 linux 主机都有一个 docker0 的虚拟网卡。这是个桥接网卡，使用了 veth-pair 技术！
2. 每启动一个容器，linux 主机就会多了一个虚拟网卡。

> 启动两个 tomcat 容器观察：
> tomcat01 --- linux 主机 vethc8584ea@if122 ---- 容器内 eth0@if123
> tomcat02 --- linux 主机 veth021eeea@if124 ---- 容器内 eth0@if125
> 结论**：容器和容器之间可以通过 ip 互相访问的。**

**网络模型图**

![22](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/Docker/22.png)

> 结论：tomcat1 和 tomcat2 共用一个路由器。就是 docker0。任何一个容器启动默认都是 docker0 网络。<br>
> docker 默认会给容器分配一个可用 ip。<br>

### --Link（不推荐）

如何通过容器名进行访问，实现高可用性

```shell
## 使用 --link
docker run -d -P --name tomcat03 --link tomcat02 tomcat

## 这个时候，就可以使用tomcat03 ping通tomcat02 了，反之不可行
docker exec -it tomcat03 ping tomcat02
```

**查看 tomcat03 中的 host 配置文件**

```shell
docker exec -it tomcat03 cat /etc/hosts
172 .18.0.3 tomcat02 b80da266a3ad  ## 发现tomcat2直接被写在这里
```

> 原理：--link 的时候，直接把需要 link 的主机的域名和 ip 直接配置到了 hosts 文件中。

### 自定义网络

#### 基本命令

| 命令                        | 描述                 |
| --------------------------- | -------------------- |
| `docker network connect`    | 连接容器到网络       |
| `docker network create`     | 创建一个新的网络     |
| `docker network disconnect` | 断开容器与网络的连接 |
| `docker network inspect`    | 查看网络的详细信息   |
| `docker network ls`         | 列出当前存在的网络   |
| `docker network prune`      | 清理无用的网络       |
| `docker network rm`         | 删除一个或多个网络   |

#### 网络模式

![23](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/Docker/23.png)

#### 自定义网卡

在容器创建时使用自定义网络

```shell
## 自定义创建的默认default "bridge"
## 自定义创建一个网络网络
docker network create --driver bridge --subnet 192.168.0.0/16 --gateway 192.168.0.1 mynet

## 查看详情
docker network inspect mynet

## 启动容器测试，使用 mynet！
docker run -d -P --name tomcat-net-01 --net mynet tomcat
docker run -d -P --name tomcat-net-02 --net mynet tomcat

## 再来查看下
docker network inspect mynet

## 都可以ping通
docker exec -it tomcat-net-01 ping 192.168.0.3
docker exec -it tomcat-net-01 ping tomcat-net-02
```

### 网络连通

![24](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/Docker/24.png)

> docker0 和自定义网络是不连通的，使用自定义网络的好处就是网络隔离。<br>
> 如上图，如何让 tomcat-net-01 访问 tomcat1？<br>
> 使用 docker network connect [OPTIONS] NETWORK CONTAINER 连接两个网络。

```shell
## 启动默认的容器，在docker0网络下
docker run -d -P --name tomcat01 tomcat
docker run -d -P --name tomcat02 tomcat

## 连接一个容器到一个网络，打通mynet-docker0
## 命令 docker network connect [OPTIONS] NETWORK CONTAINER
docker network connect mynet tomcat01
docker network inspect mynet

## tomcat01 可以ping通了
docker exec -it tomcat01 ping tomcat-net-01
## tomcat02 依旧ping不通，大家应该就理解了
docker exec -it tomcat02 ping tomcat-net-01
```

## IDEA 整合 Docker

1. 打 jar 包
2. 打包镜像

**在项目下编写 Dockerfile 文件，将打包好的 jar 包拷贝到 Dockerfile 同级目录**

```shell
FROM java:8

## 服务器只有dockerfile和jar在同级目录
COPY *.jar /app.jar

CMD ["--server.port=8080"]

## 指定容器内要暴露的端口
EXPOSE 8080

ENTRYPOINT ["java","-jar","/app.jar"]
```

**将 Dockerfile 和 项目的 jar 包上传到 linux 服务器上，构建运行**

```shell
## 构建镜像
docker build -t idea-ks.
## 查看镜像
docker images
## 运行
docker run -d -P --name idea-ks idea-ks
docker ps
## 测试访问
curl localhost:32779
curl localhost:32779/hello
```

## 可视化

### Portainer（先用这个）

```
docker run -d -p 8088:9000 \ --restart=always -v /var/run/docker.sock:/var/run/docker.sock -- privileged=true portainer/portainer
```

### Rancher（CI/CD 再用这个）

```shell
#安装rancher-server
docker run --name rancher-server -p 8000:8080 -v /etc/localtime:/etc/localtime:ro -d rancher/server
#安装agent
docker run --rm --privileged -v /var/run/docker.sock:/var/run/docker.sock -v /var/lib/rancher:/var/lib/rancher rancher/agent:v1.2.11
http://39.101.191.131:8000/v1/scripts/D3DBD43F263109BB881F:1577750400000:7M0y BzCw4XSxJklD7TpysYIpI
```

1. 介绍：

> Portainer 是 Docker 的图形化管理工具，提供状态显示面板、应用模板快速部署、容器镜像网络数据卷
> 的基本操作（包括上传下载镜像，创建容器等操作）、事件日志显示、容器控制台操作、Swarm 集群和
> 服务等集中管理和操作、登录用户管理和控制等功能。功能十分全面，基本能满足中小型单位对容器管
> 理的全部需求。
> 如果仅有一个 docker 宿主机，则可使用单机版运行，Portainer 单机版运行十分简单，只需要一条语句即
> 可启动容器，来管理该机器上的 docker 镜像、容器等数据。

```shell
docker run -d -p 8088:9000 \ --restart=always -v /var/run/docker.sock:/var/run/docker.sock -- privileged=true portainer/portainer
```

2. 访问方式：http://IP:8088

3. 首次登陆需要注册用户，给 admin 用户设置密码：

![3](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/Docker/3.png)

1. 单机版这里选择 local 即可，选择完毕，点击 Connect 即可连接到本地 docker：

![4](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/Docker/4.png)

5. 登录成功！

![5](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/Docker/5.png)
