---
title: lottery
date: 2024-03-05 10:07:52
permalink: /pages/a33dfc/
---
# Lottery
## Lottery梳理

为根据不同人群标签的人群规律，选择不同的抽奖活动，每个活动的参与为一个抽奖单。可以有效的控制参与用户数和异常流程的补偿。领取抽奖单后执行使用了模板、工厂、策略的抽奖玩法设计。在这里设计了分段锁，避免独占锁的竞争，从而挺高效率。最后抽奖完成异步发送 MQ 消息方式进行驱动后续的发奖流程。

### 简历

- **项目名称**：营销活动平台 - Lottery 微服务抽奖系统
- **系统架构**：以 DDD 领域驱动设计开发，微服务拆分的分布式系统架构
- **核心技术**：SpringBoot、MyBatis、Dubbo、MQ、MySQL、Redis、XDB-Router、ES、ZK
- **项目描述**：抽奖系统是营销平台的重要微服务之一，可以满足 C 端人群的需求，例如拉新、促活、留存等。该系统运用抽象、分治和 DDD 知识，拆解服务边界，凝练领域服务功能。围绕抽奖服务建设领域服务，包括规则引擎、抽奖策略、活动玩法、奖品发放等。这可以满足业务产品快速迭代上线的需求，同时减少研发成本，提高交付效率。
- 核心职责
  - 【高级】构建以 DDD 分层结构的处理方式，搭建整个抽奖系统架构。运用设计原则和工厂、代理、模板、组合、策略等设计模式的综合使用，搭建易于维护和迭代的系统工程。
  - 【高级】鉴于系统内有较多的规则策略过滤，包括准入、人群、风控、A/BTest等需求，为适应系统规模可快速开发和使用的方式，搭建了去中心化的量化人群规则引擎组件。通过业务需求对逻辑的扩展和内置引擎执行器的使用，完成自由组合的人群过滤服务。这降低了共性功能重复开发所带来的成本问题，并提高了研发效率。
  - 【高级】根据实际秒杀峰值场景 `TPS 5000 ~ 8000` 的需求，开发了统一路由组件。该组件不仅可以满足差异化不同字段的分库分表组合，还支持 Redis 库存分片和秒杀滑动库存分块。而且，开发了统一路由 XDB-Router 的 SpringBoot Starter 技术组件。该套组件已经经历了多次大促活动场景的考验，支持横向扩展，可以满足业务规模的快速增长。
  - 【简单】运用模板、策略、工厂三个设计模式，定义抽奖过程标准和实现对应的多类型抽奖的服务模块。
  - 【简单】因活动秒杀的并发场景，将秒杀从最开始的数据库行级锁优化为Redis Key 加锁，又从 Redis Key 的独占锁，优化为滑块锁。优化后整体秒杀有了非常可观的性能提升。
  - 【简单】解耦抽奖流程，把抽奖和发奖用MQ消息串联起来，避免一个流程太长，导致用户一直等待。

### 基本流程

![抽奖系统](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/lottery/抽奖系统.png)

### 参与活动

组合模式搭建用于量化人群的规则引擎

![image-20231120151121588](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/lottery/image-20231120151121588.png)

### 抽奖策略

策略模式配置抽奖策略

![image-20231120151338186](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/lottery/image-20231120151338186.png)

### 抽奖流程

模版模式处理抽奖流程

![image-20231120151402768](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/lottery/image-20231120151402768.png)

### 活动状态

状态模式处理活动状态变更

![image-20231120151559158](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/lottery/image-20231120151559158.png)

### 发放奖品

工厂模式发放各类别奖品

![image-20231120151702995](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/lottery/image-20231120151702995.png)

### Id生成

策略模式处理 id 生成

- 雪花算法、阿帕奇工具包 RandomStringUtils、日期拼接
- 三种方式生成ID，分别对应订单号、策略ID、活动号

![image-20231120151837274](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/lottery/image-20231120151837274.png)

### 对象转换

使用 MapStruct 做对象转换操作处理

![image-20231120152512949](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/lottery/image-20231120152512949.png)

## Lottery部署

### 安装 `docker`

```sh
# centos
yum update # 更新 yum 包
yum install -y yum-utils device-mapper-persistent-data lvm2
yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
yum install docker-ce
docker -v # 查看版本

systemctl start docker
systemctl enable docker # 开机自启
```

`docker` 常用命令

```sh
docker --help				#Docker帮助
docker --version			#查看Docker版本
docker search <image>		#搜索镜像文件，如：docker search mysql
docker pull <image>		#拉取镜像文件， 如：docker pull mysql
docker images				#查看已经拉取下来的所以镜像文件
docker rmi <image>		#删除指定镜像文件
docker run --name <name> -p 80:8080 -d <image>		#发布指定镜像文件
docker ps					#查看正在运行的所有镜像
docker ps -a				#查看所有发布的镜像
docker rm <image>			#删除执行已发布的镜像
```

**安装 `Portainer` 可视化工具**：通过 [IP:9000]() 访问

```sh
docker run -d --restart=always --name portainer -p 9000:9000 -v \
/home/lzq/wwp/java/tools/data/docker/docker.sock:/var/run/docker.sock -v \
/home/lzq/wwp/java/tools/data/portainer/data:/data -v \
/home/lzq/wwp/java/tools/data/portainer/public:/public portainer/portainer
```

### 安装 `mysql`

```sh
docker pull mysql:8.0.27

docker run -id --name mysql -p 3306:3306 \
-v /home/lzq/wwp/java/tools/data/mysql/logs:/logs \
-v /home/lzq/wwp/java/tools/data/mysql/data:/var/lib/mysql \
-v /home/lzq/wwp/java/tools/data/mysql/conf:/etc/mysql/conf.d \
-e MYSQL_ROOT_PASSWORD=123456 mysql:8.0.27
```

**设置容器开启自动启动**

```sh
docker update --restart=always 容器ID
```

### 安装 `redis`

**修改`conf` 配置**

- 将`daemonize yes` 设置为 no，否则与 docker -d 冲突
- 关闭保护模式，将 `protected-mode yes` 设置为 no
- 注释掉 `bind 127.0.0.1`，以允许其他 ip 连接
- 开启密码认证（可选）`requirepass {yourpassword}`

```sh
docker run -p 6379:6379 --name redis -v /home/lzq/wwp/java/tools/data/redis/redis.conf:/etc/redis/redis.conf  -v /home/lzq/wwp/java/tools/data/redis/data:/data -d redis:6.2.6 redis-server /etc/redis/redis.conf --appendonly yes
```

### 安装 `zookeeper`

```sh
docker pull wurstmeister/zookeeper

docker run -e TZ="Asia/Shanghai" -d -p 2181:2181 -v /home/lzq/wwp/java/tools/data/zookeeper:/data --name zookeeper --privileged=true zookeeper -t wurstmeister/zookeeper
```

### 安装 `kafka`

```sh
docker pull wurstmeister/kafka

docker run -d --name kafka \
-p 9092:9092 \
-e KAFKA_BROKER_ID=0 \
-e KAFKA_ZOOKEEPER_CONNECT=192.168.167.144:2181 \
-e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://192.168.167.144:9092 \
-e KAFKA_LISTENERS=PLAINTEXT://0.0.0.0:9092 wurstmeister/kafka\
```

**添加 `topic`**

```sh
# 进入容器
docker exec -it kafka bash
# 测试
kafka-topics.sh --create --zookeeper 192.168.167.144:2181 --replication-factor 1 --partitions 1 --topic lottery_activity_partake

kafka-topics.sh --create --zookeeper 192.168.167.144:2181 --replication-factor 1 --partitions 1 --topic lottery_invoice
# 创建发奖发票
kafka-topics.sh --create --zookeeper 192.168.167.144:2181 --replication-factor 1 --partitions 1 --topic lottery_invoice

# 使用 Redis 代替数据库活动库存，使用mq消息保证数据一致性，异步扣减活动库存
kafka-topics.sh --create --zookeeper 192.168.167.144:2181 --replication-factor 1 --partitions 1 --topic lottery_activity_partake
```

### 安装 `xxl-job`

```sh
docker pull xuxueli/xxl-job-admin:2.3.0

docker run -e PARAMS=" --server.port=7397 --spring.datasource.url=jdbc:mysql://192.168.167.144:3306/xxl_job?useUnicode=true&characterEncoding=UTF-8&serverTimezone=GMT%2B8 --spring.datasource.username=root --spring.datasource.password=123456 --xxl.job.accessToken=xdsl3ewi3al1oehxmo68pqxer" -p 7397:7397 -v /home/lzq/wwp/java/tools/data/xxl-job/logs:/data/applogs --name xxl-job-admin --restart=always -d xuxueli/xxl-job-admin:2.3.0
```

[调度台 `http://192.168.167.144:7397/xxl-job-admin`](http://192.168.167.144:7397/xxl-job-admin/jobinfo)

### 安装 `nacos`

```sh
docker pull nacos/nacos-server

docker run -d -p 8848:8848 --env MODE=standalone  --name nacos  nacos/nacos-server
```

打开链接：[http://服务器IP:8848/nacos/)](http://服务器IP:8848/nacos/) - `账号：nacos 密码：nacos`

## 补充

### 安装 `RabbitMQ`

```sh
docker run -d --name myRabbitMQ -e RABBITMQ_DEFAULT_USER=admin -e RABBITMQ_DEFAULT_PASS=123456 -p 15672:15672 -p 5672:5672 rabbitmq:3.8.14-management
```
然后打开浏览器访问服务器公网`ip:15672`，输入创建的账号密码登录，登录成功代表docker安装并启动成功

### 关闭防火墙

```sh
systemctl stop firewalld.service
systemctl disable firewalld.service
```

