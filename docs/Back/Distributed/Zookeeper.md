---
title: Zookeeper
date: 2024-03-05 10:06:47
permalink: /pages/6a436f/
---
# Zookeeper

## CAP&Base理论

**CAP 理论**

CAP 理论指出对于一个分布式计算系统来说，不可能同时满足以下三点：

- **C（Consistency）一致性**：在分布式环境中，一致性是指数据在多个副本之间是否能够保持一致的特性，等同于所有节点访问同一份最新的数据副本。在一致性的需求下，当一个系统在数据一致的状态下执行更新操作后，应该保证系统的数据仍然处于一致的状态。
- **A（Availability）可用性：**每次请求都能获取到正确的响应，但是不保证获取的数据为最新数据。
- **P（Partition tolerance）分区容错性：**分布式系统在遇到任何网络分区故障的时候，仍然需要能够保证对外提供满足一致性和可用性的服务，除非是整个网络环境都发生了故障。

> 一个分布式系统最多只能同时满足一致性（`Consistency`）、可用性（`Availability`）和分区容错性（`Partition tolerance`）这三项中的两项。
>
> 在这三个基本需求中，最多只能同时满足其中的两项，P 是必须的，因此只能在 CP 和 AP 中选择，`Zookeeper` 保证的是 **CP**，对比 `Spring Cloud` 系统中的注册中心 `eureka` 实现的是 **AP**。

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/Zookeeper/44808.png)

**BASE 理论**

BASE 是 `Basically Available(基本可用)、Soft-state(软状态) 和 Eventually Consistent(最终一致性)` 的缩写。

- **基本可用：**在分布式系统出现故障，允许损失部分可用性（服务降级、页面降级）。
- **软状态：**允许分布式系统出现中间状态。而且中间状态不影响系统的可用性。这里的中间状态是指不同的 `data replication`（数据备份节点）之间的数据更新可以出现延时的最终一致性。
- **最终一致性：**`data replications` 经过一段时间达到一致性。

BASE 理论是对 CAP 中的一致性和可用性进行一个权衡的结果，理论的核心思想就是：**无法做到强一致，但每个应用都可以根据自身的业务特点，采用适当的方式来使系统达到最终一致性。**

- 强一致性：又称线性一致性(`linearizability`)

  1. 任意时刻，所有节点中的数据是一样的；

  2. 一个集群需要对外部提供强一致性，所以只要集群内部某一台服务器的数据发生了改变，那么就需要等待集群内其他服务器的数据同步完成后，才能正常的对外提供服务；

  3. 保证了强一致性，势必会损耗可用性。

- 弱一致性：

  1. 系统中的某个数据被更新后，后续对该数据的读取操作可能得到更新后的值，也可能是更改前的值；

  2. 即使过了不一致时间窗口，后续的读取也不一定能保证一致。

- 最终一致性：

  1. 弱一致性的特殊形式，不保证在任意时刻任意节点上的同一份数据都是相同的，但是随着时间的迁移，不同节点上的同一份数据总是在向趋同的方向变化；

  2. 存储系统保证在没有新的更新的条件下，最终所有的访问都是最后更新的值。

- 顺序一致性：

  1. 任何一次读都能读到某个数据的最近一次写的数据；

  2. 对其他节点之前的修改是可见(已同步)且确定的，并且新的写入建立在已经达成同步的基础上。

> `Zookeeper`**写入是强一致性，读取是顺序一致性。**

## Zookeeper介绍

`Zookeeper` 是一个**开源的分布式协调框架**，是`Apache Hadoop` 的一个子项目，**主要用来解决分布式集群中应用系统的一致性问题**。Zookeeper 的设计目标是将那些复杂且容易出错的分布式一致性服务封装起来，构成一个高效可靠的原语集，并以一系列简单易用的接口提供给用户使用。

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/Zookeeper/44781.png)

Zookeeper本质上是一个分布式的小文件存储系统（Zookeeper=文件系统+监听机制）。提供基于类似于文件系统的目录树方式的数据存储，并且可以对树中的节点进行有效管理，从而用来维护和监控存储的数据的状态变化。通过监控这些数据状态的变化，从而可以达到**基于数据的集群管理、统一命名服务、分布式配置管理、分布式消息队列、分布式锁、分布式协调**等功能。

Zookeeper从设计模式角度来理解：**是一个基于观察者模式设计的分布式服务管理框架**，它负责存储和管理大家都关心的数据，然后接受观察者的注册，一旦这些数据的状态发生变化，Zookeeper 就将负责通知已经在Zookeeper上注册的那些观察者做出相应的反应。

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/Zookeeper/44785.png)

## Zookeeper使用

### Zookeeper安装

[下载地址](https://Zookeeper.apache.org/releases.html)

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/Zookeeper/44888.png)

1. **修改配置文件**

解压安装包后进入`conf`目录，复制`zoo_sample.cfg`，修改为`zoo.cfg`

```sh
cp zoo_sample.cfg  zoo.cfg
```

修改 `zoo.cfg` 配置文件，将 `dataDir=/tmp/Zookeeper` 修改为指定的`data`目录

`zoo.cfg`中参数含义：

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/Zookeeper/44894.png)

2. **启动Zookeeper server**

```sh
# 可以通过 bin/zkServer.sh  来查看都支持哪些参数
# 默认加载配置路径conf/zoo.cfg
bin/zkServer.sh start conf/zoo.cfg
# 查看Zookeeper状态
bin/zkServer.sh status
```

3. **启动Zookeeper client连接Zookeeper server**

```sh
bin/zkCli.sh
# 连接远程的Zookeeper server
bin/zkCli.sh -server ip:port
```

### 客户端命令行操作

输入命令 `help` 查看`Zookeeper`支持的所有命令：

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/Zookeeper/45179.png)

[常见cli命令](https://Zookeeper.apache.org/doc/r3.8.0/ZookeeperCLI.html)

| 命令基本语法                                     | 功能描述                                                     |
| ------------------------------------------------ | ------------------------------------------------------------ |
| help                                             | 显示所有操作命令                                             |
| ls [-s] [-w] [-R] path                           | 使用 ls 命令来查看当前 ZNode 的子节点 [可监听]  -w: 监听子节点变化 -s: 节点状态信息（时间戳、版本号、数据大小等）-R: 表示递归的获取 |
| create [-s] [-e] [-c] [-t ttl] path [data] [acl] | 创建节点-s : 创建有序节点。-e : 创建临时节点。-c : 创建一个容器节点。t ttl] : 创建一个TTL节点， -t 时间（单位毫秒）。data：节点的数据，可选，如果不使用时，节点数据就为null。acl：访问控制 |
| get [-s] [-w] path                               | 获取节点数据信息 -s: 节点状态信息（时间戳、版本号、数据大小等） -w: 监听节点变化 |
| set [-s] [-v version] path data                  | 设置节点数据-s:表示节点为顺序节点-v: 指定版本号              |
| getAcl [-s] path                                 | 获取节点的访问控制信息-s: 节点状态信息（时间戳、版本号、数据大小等） |
| setAcl [-s] [-v version] [-R] path acl           | 设置节点的访问控制列表-s:节点状态信息（时间戳、版本号、数据大小等）-v:指定版本号-R:递归的设置 |
| stat [-w] path                                   | 查看节点状态信息                                             |
| delete [-v version] path                         | 删除某一节点，只能删除无子节点的节点。-v： 表示节点版本号    |
| deleteall path                                   | 递归的删除某一节点及其子节点                                 |
| setquota -n\|-b val path                         | 对节点增加限制n:表示子节点的最大个数b:数据值的最大长度，-1表示无限制 |
| addwatch [-m mode] path                          | 在被触发之后，仍然保留，可以继续监听ZNode上的变更；-m：(`PERSISTENT`，持久化订阅，针对当前节点的修改、删除事件，以及当前节点的子节点的删除、新增事件。 `PERSISTENT_RECURSIVE`，持久化递归订阅，在PERSISTENT的基础上，增加了子节点修改的事件触发，以及子节点的子节点的数据变化都会触发相关事件（满足递归订阅特性）） |

### ACL权限控制

Zookeeper 的 ACL（Access Control List，访问控制表）权限在生产环境是特别重要的，ACL 权限可以针对节点设置相关读写等权限，保障数据安全性。

#### ACL 构成

Zookeeper 的 ACL通过 `[scheme:id:permissions]` 来构成权限列表。

- **scheme**：授权的模式，代表采用的某种权限机制，包括 `world、auth、digest、ip、super` 几种。
- **id**：授权对象，代表允许访问的用户。如果我们选择采用 IP 方式，使用的授权对象可以是一个 IP 地址或 IP 地址段；而如果使用 Digest 或 Super 方式，则对应于一个用户名。如果是 World 模式，是授权系统中所有的用户。
- **permissions**：授权的权限，权限组合字符串，由 `cdrwa` 组成，其中每个字母代表支持不同权限， **创建权限 create(c)、删除权限 delete(d)、读权限 read(r)、写权限 write(w)、管理权限admin(a)。**

| 模式   | 描述                                                         |
| ------ | ------------------------------------------------------------ |
| world  | 授权对象只有一个anyone，代表登录到服务器的所有客户端都能对该节点执行某种权限 |
| ip     | 对连接的客户端使用IP地址认证方式进行认证                     |
| auth   | 使用以添加认证的用户进行认证                                 |
| digest | 使用 用户:密码方式验证                                       |

授权命令：

| 授权命令 | 用法                 | 描述                         |
| -------- | -------------------- | ---------------------------- |
| getAcl   | getAcl path          | 读取节点的ACL                |
| setAcl   | setAcl path acl      | 设置节点的ACL                |
| create   | create path data acl | 创建节点时设置acl            |
| addAuth  | addAuth scheme auth  | 添加认证用户，类似于登录操作 |

**测试**

取消节点的读权限后，读取`/name`节点没有权限

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/Zookeeper/45219.png)

取消节点删除子节点的权限

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/Zookeeper/45225.png)

#### 授权模式

**auth授权模式**

```sh
# 创建用户
addauth digest fox:123456
# 设置权限
setAcl /name auth:fox:123456:cdrwa

# 加密
echo -n fox:123456 | openssl dgst -binary -sha1 | openssl base64
setAcl /name auth:fox:ZsWwgmtnTnx1usRF1voHFJAYGQU=:cdrwa
```

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/Zookeeper/45449.png)

退出客户端，重新连接之后获取`/name`会没权限，需要添加授权用户。

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/Zookeeper/45241.png)

**digest授权模式**

```sh
# 设置权限
setAcl /tuling/fox digest:fox:ZsWwgmtnTnx1usRF1voHFJAYGQU=:cdrwa
```

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/Zookeeper/45475.png)

**IP授权模式**

```sh
setAcl /node-ip ip:192.168.109.128:cdwra
create /node-ip  data  ip:192.168.109.128:cdwra
# 多个指定IP可以通过逗号分隔
setAcl /node-ip  ip:IP1:rw,ip:IP2:a
```

**Super 超级管理员模式**

这是一种特殊的`Digest`模式， 在Super模式下超级管理员用户可以对Zookeeper上的节点进行任何的操作。

需要在启动脚本上通过添加**JVM参数**开启：

```sh
# DigestAuthenticationProvider中定义
-DZookeeper.DigestAuthenticationProvider.superDigest=admin:<base64encoded(SHA1(123456))
```

### Zookeeper数据结构

`Zookeeper` 数据模型的结构与 `Unix` 文件系统很类似，整体上可以看作是一棵树，每个节点称做一个 `ZNode`。

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/Zookeeper/45253.png)

`Zookeeper`的数据模型是**层次模型**，层次模型常见于文件系统。层次模型和`key-value`模型是两种主流的数据模型。`Zookeeper`使用文件系统模型主要基于以下两点考虑：

1. 文件系统的树形结构便于表达数据之间的层次关系

2. 文件系统的树形结构便于为不同的应用分配独立的命名空间(`namespace`)

`Zookeeper`的层次模型称作`Data Tree`，`Data Tree`的每个节点叫作`ZNode`。不同于文件系统，每个节点都可以保存数据，每一个 `ZNode`默认能够存储 1MB 的数据，每个 `ZNode` 都可以通过其路径唯一标识，每个节点都有一个版本(version)，版本从0开始计数。

```java
public class DataTree {
    private final ConcurrentHashMap<String, DataNode> nodes =
        new ConcurrentHashMap<String, DataNode>();
        
        
    private final watchManager datawatches = new watchManager();
    private final watchManager childwatches = new watchManager();
    
}

public class DataNode implements Record {
    byte data[];
    Long acl;
    public StatPersisted stat;
    private Set<String> children = null;
 }     
```

#### 节点分类

| 节点类型                              | 特点                                                         |
| ------------------------------------- | ------------------------------------------------------------ |
| 持久节点(`PERSISTENT`)                | 在Zookeeper集群宕机或者Client宕机时不会丢失                  |
| 持久顺序节点(`PERSISTENT_SEQUENTIAL`) | 具备持久性，且节点名字具备顺序性                             |
| 临时节点(`EPHEMERAL`)                 | Client宕机或者在指定的timeout时间内未给Zookeeper集群发消息，节点消失 |
| 临时顺序节点(`EPHEMERAL_SEQUENTIAL`)  | 具备临时性，且节点名字具备顺序性                             |
| `TTL`节点                             | 带过期时间，不能用于临时节点，默认禁用，需要在`zoo.cfg`中添加`extendedTypesEnabled=true`开启 |
| `Container`节点                       | 当容器中没有任何子节点，该容器节点会被Zookeeper定期删除，适用于Leader或锁的场景中。 |

Zookeeper主要用到的是持久、持久顺序、临时、临时顺序4种节点。

Container容器节点：当容器中没有任何子节点，该容器节点会被zk定期删除（定时任务默认60s 检查一次)。 和持久节点的区别是 ZK 服务端启动后，会有一个单独的线程去扫描，所有的容器节点，当发现容器节点的子节点数量为 0 时，会自动删除该节点。可以用于 leader 或者锁的场景中。

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/Zookeeper/45327.png)

```sh
# 创建持久节点
create /servers  xxx
# 创建临时节点
create -e /servers/host  xxx
# 创建临时有序节点
create -e -s /servers/host  xxx
# 创建容器节点
create -c /container xxx
# 创建ttl节点
create -t 10 /ttl
```

#### 节点状态信息

| 属性           | 描述                                                         |
| -------------- | ------------------------------------------------------------ |
| cZxid          | ZNode创建时的事务ID                                          |
| ctime          | 节点创建时的时间戳                                           |
| mZxid          | ZNode最后一次被修改的事务ID，每次对ZNode的修改都会更新mZxid  |
| pZxid          | 子节点列表最后一次修改的事务ID，添加子节点或删除子节点就会影响子节点列表，但是修改子节点的数据内容则不影响该ID |
| mtime          | 节点最后一次更新发生时的时间戳                               |
| cversion       | 子节点的版本号，当子节点变化时会增加                         |
| dataVersion    | 数据版本号，每次对节点进行set操作都会增加，可有效避免了数据更新时出现的先后顺序问题 |
| ephemeralOwner | 如果节点是临时节点，表示与该节点绑定的session id；如果是持久节点，则为0 |
| dataLength     | 数据的长度                                                   |
| numChildren    | 直接子节点的数量                                             |

> - 对于zk来说，每次的变化都会产生一个唯一的事务`id，zxid（Zookeeper Transaction Id）`，通过zxid，可以确定更新操作的先后顺序。例如，如果zxid1小于zxid2，说明zxid1操作先于zxid2发生，zxid对于整个zk都是唯一的，即使操作的是不同的ZNode。
>
> - 在client和server通信之前，首先需要建立连接，该连接称为session。连接建立后，如果发生连接超时、授权失败，或者显式关闭连接，连接便处于closed状态，此时session结束。

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/Zookeeper/45321.png)

#### 监听通知（watcher）机制

- 一个watch事件是一个一次性的触发器，当被设置了watch的数据发生了改变的时候，则服务器将这个改变发送给设置了watch的客户端，以便通知它们。
- Zookeeper采用了 watcher机制实现数据的发布订阅功能，多个订阅者可同时监听某一特定主题对象，当该主题对象的自身状态发生变化时例如节点内容改变、节点下的子节点列表改变等，会实时、主动通知所有订阅者。
- watcher机制事件上与观察者模式类似，也可看作是一种观察者模式在分布式场景下的实现方式。

watcher的过程：

1. 客户端向服务端注册watcher
2. 服务端事件发生触发watcher
3. 客户端回调watcher得到触发事件情况

> Zookeeper中的watch机制，必须客户端先去服务端注册监听，这样事件发送才会触发监听，通知给客户端。

支持的事件类型：

- None: 连接建立事件
- NodeCreated： 节点创建
- NodeDeleted： 节点删除
- NodeDataChanged：节点数据变化
- NodeChildrenChanged：子节点列表变化
- DatawatchRemoved：节点监听被移除
- ChildwatchRemoved：子节点监听被移除

| 特性           | 说明                                                         |
| -------------- | ------------------------------------------------------------ |
| 一次性触发     | watcher是一次性的，一旦被触发就会移除，再次使用时需要重新注册 |
| 客户端顺序回调 | watcher回调是顺序串行执行的，只有回调后客户端才能看到最新的数据状态。一个watcher回调逻辑不应该太多，以免影响别的watcher执行 |
| 轻量级         | watchEvent是最小的通信单位，结构上只包含通知状态、事件类型和节点路径，并不会告诉数据节点变化前后的具体内容 |
| 时效性         | watcher只有在当前session彻底失效时才会无效，若在session有效期内快速重连成功，则watcher依然存在，仍可接收到通知； |

```sh
# 监听节点数据的变化
get -w path 
stat -w path
# 监听子节点增减的变化 
ls -w path 
```

**使用场景——协同服务**

设计一个`master-worker`的组成员管理系统，要求系统中只能有一个master，master能实时获取系统中worker的情况。

保证组里面只有一个master的设计思路

```sh
# master1
create -e /master "m1:2223"  

# master2
create -e /master "m2:2223"   # /master已经存在，创建失败
# Node already exists: /master

# 监听/master节点
stat -w /master
# 当master2收到/master节点删除通知后可以再次发起创建节点操作
create -e /master "m2:2223" 
```

`master-slave`选举也可以用这种方式

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/Zookeeper/45382.png)

master监控worker状态的设计思路

```sh
# master服务
create /workers
# 让master服务监控/workers下的子节点
ls -w /workers

# worker1
create -e /workers/w1 "w1:2224" # 创建子节点，master服务会收到子节点变化通知

# master服务
ls -w /workers
# worker2
create -e /workers/w2 "w2:2224"  # 创建子节点，master服务会收到子节点变化通知

# master服务
ls -w /workers
# worker2
quit  # worker2退出，master服务会收到子节点变化通知
```

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/Zookeeper/45407.png)

**使用场景——条件更新**

设想用`2 /c`实现一个counter，使用set命令来实现自增1操作。条件更新场景∶

1. 客户端1把`/c`更新到版本1，实现`/c`的自增1。

2. 客户端2把`/c`更新到版本2，实现`/c`的自增1。

3. 客户端1不知道`/c`已经被客户端2更新过了，还用过时的版本1是去更新`/c`，更新失败。如果客户端1使用的是无条件更新，`/c`就会更新为2，没有实现自增1。

使用条件更新可以避免出现客户端基于过期的数据进行数据更新的操作。

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/Zookeeper/45535.png)

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/Zookeeper/45439.png)

#### **Zookeeper 节点特性总结**

1. **同一级节点 key 名称是唯一的**：已存在`/lock`节点，再次创建会提示已经存在

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/Zookeeper/45268.png)

2. **创建节点时，必须要带上全路径**
3. **session 关闭，临时节点清除**

4. **自动创建顺序节点**

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/Zookeeper/45266.png)

5. **watch 机制，监听节点变化**

> 事件监听机制类似于观察者模式，watch 流程是客户端向服务端某个节点路径上注册一个 watcher，同时客户端也会存储特定的 watcher，当节点数据或子节点发生变化时，服务端通知客户端，客户端进行回调处理。

6. **delete 命令只能一层一层删除。**

> 新版本可以通过 deleteall 命令递归删除。

#### 应用场景

**Zookeeper适用于存储和协同相关的关键数据，不适合用于大数据量存储。**

有了上述众多节点特性，使得 Zookeeper 能开发不出不同的经典应用场景，比如：

- 注册中心
- 数据发布/订阅（常用于实现配置中心）
- 负载均衡
- 命名服务
- 分布式协调/通知
- 集群管理
- Master选举
- 分布式锁
- 分布式队列

**统一命名服务**

在分布式环境下，经常需要对应用/服务进行统一命名，便于识别。

例如：IP不容易记住，而域名容易记住。

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/Zookeeper/45267.png)

利用 Zookeeper 顺序节点的特性，制作分布式的序列号生成器，或者叫 id 生成器。（分布式环境下使用作为数据库 id，另外一种是 UUID（缺点：没有规律）），Zookeeper 可以生成有顺序的容易理解的同时支持分布式环境的编号。

```sh
/
└── /order
    ├── /order-date1-000000000000001
    ├── /order-date2-000000000000002
    ├── /order-date3-000000000000003
    ├── /order-date4-000000000000004
    └── /order-date5-000000000000005
```

**数据发布/订阅**

数据发布/订阅的一个常见的场景是配置中心，发布者把数据发布到 Zookeeper 的一个或一系列的节点上，供订阅者进行数据订阅，达到动态获取数据的目的。

配置信息一般有几个特点：

1. 数据量小的KV
2. 数据内容在运行时会发生动态变化
3. 集群机器共享，配置一致

Zookeeper 采用的是推拉结合的方式。

1. 推：服务端会推给注册了监控节点的客户端 watcher 事件通知
2. 拉:：客户端获得通知后，然后主动到服务端拉取最新的数据

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/Zookeeper/45269.png)

**统一集群管理**

分布式环境中，实时掌握每个节点的状态是必要的，可根据节点实时状态做出一些调整。

Zookeeper可以实现实时监控节点状态变化：

- 可将节点信息写入Zookeeper上的一个ZNode。
- 监听这个ZNode可获取它的实时状态变化。

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/Zookeeper/45264.png)

**负载均衡**

在Zookeeper中记录每台服务器的访问数，让访问数最少的服务器去处理最新的客户端请求

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/Zookeeper/45265.png)

## Zookeeper集群

### 集群角色

- Leader： 领导者。

事务请求（写操作）的唯一调度者和处理者，保证集群事务处理的顺序性；集群内部各个服务器的调度者。对于`create、setData、delete`等有写操作的请求，则要统一转发给leader处理，leader需要决定编号、执行操作，这个过程称为事务。

- Follower: 跟随者

处理客户端非事务（读操作）请求（可以直接响应），转发事务请求给Leader；参与集群Leader选举投票。

- Observer: 观察者

对于非事务请求可以独立处理（读操作），对于事务性请求会转发给leader处理。Observer节点接收来自leader的inform信息，更新自己的本地存储，不参与提交和选举投票。通常在不影响集群事务处理能力的前提下提升集群的非事务处理能力。

Observer应用场景：

- 提升集群的读性能。因为Observer和不参与提交和选举的投票过程，所以可以通过往集群里面添加observer节点来提高整个集群的读性能。
- 跨数据中心部署。 比如需要部署一个北京和香港两地都可以使用的Zookeeper集群服务，并且要求北京和香港客户的读请求延迟都很低。解决方案就是把香港的节点都设置为observer。

### 集群架构

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/Zookeeper/44906.png)

leader节点可以处理读写请求，follower只可以处理读请求。follower在接到写请求时会把写请求转发给leader来处理。

Zookeeper数据一致性保证：

- 全局可线性化(`Linearizable`)写入：先到达leader的写请求会被先处理，leader决定写请求的执行顺序。
- 客户端`FIFO`顺序：来自给定客户端的请求按照发送顺序执行。

### 三节点Zookeeper集群搭建

环境准备：三台虚拟机

```sh
192.168.65.156 192.168.65.190 192.168.65.200
```

条件有限也可以在一台虚拟机上搭建Zookeeper伪集群

1. **修改`zoo.cfg`配置，添加`server`节点配置**

```sh
# 修改数据存储目录
dataDir=/data/Zookeeper

#三台虚拟机 zoo.cfg 文件末尾添加配置
server.1=192.168.65.156:2888:3888
server.2=192.168.65.190:2888:3888
server.3=192.168.65.200:2888:3888
```

> server.A=B:C:D
>
> A 是一个数字，表示这个是第几号服务器； 集群模式下配置一个文件 myid，这个文件在 dataDir 目录下，这个文件里面有一个数据 就是 A 的值，Zookeeper 启动时读取此文件，拿到里面的数据与 zoo.cfg 里面的配置信息比较从而判断到底是哪个server。 
>
> B 是这个服务器的地址； 
>
> C 是这个服务器Follower与集群中的Leader服务器交换信息的端口； 
>
> D 是万一集群中的Leader服务器挂了，需要一个端口来重新进行选举，选出一个新的Leader，而这个端口就是用来执行选举时服务器相互通信的端口。

2. **创建 `myid` 文件，配置服务器编号**

在`dataDir`对应目录下创建 `myid` 文件，内容为对应ip的Zookeeper服务器编号

```sh
cd /data/Zookeeper
# 在文件中添加与 server 对应的编号（注意：上下不要有空行，左右不要有空格）
vim myid
```

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/Zookeeper/44927.png)

3. **启动`Zookeeper server`集群**

启动前需要关闭防火墙(生产环境需要打开对应端口)

```sh
# 分别启动三个节点的Zookeeper server
bin/zkServer.sh start
# 查看集群状态
bin/zkServer.sh status
```

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/Zookeeper/44962.png)

### Zookeeper四字命令

**Zookeeper四字命令**：获取 Zookeeper 服务的当前状态及相关信息

**Zookeeper 支持某些特定的四字命令与其交互，用户获取 Zookeeper 服务的当前状态及相关信息**，用户在客户端可以通过 telenet 或者 nc（netcat） 向 Zookeeper 提交相应的命令。

```sh
# 安装 nc 命令
centos yum install nc              
```

四字命令格式：

```sh
echo [command] | nc [ip] [port]
```

Zookeeper 常用四字命令主要如下：

| 四字命令 | 功能描述                                                     |
| -------- | ------------------------------------------------------------ |
| conf     | 3.3.0版本引入的。打印出服务相关配置的详细信息。              |
| cons     | 3.3.0版本引入的。列出所有连接到这台服务器的客户端全部连接/会话详细信息。包括"接受/发送"的包数量、会话id、操作延迟、最后的操作执行等等信息。 |
| crst     | 3.3.0版本引入的。重置所有连接的连接和会话统计信息。          |
| dump     | 列出那些比较重要的会话和临时节点。这个命令只能在leader节点上有用。 |
| envi     | 打印出服务环境的详细信息。                                   |
| reqs     | 列出未经处理的请求                                           |
| ruok     | 测试服务是否处于正确状态。如果确实如此，那么服务返回"imok"，否则不做任何相应。 |
| stat     | 输出关于性能和连接的客户端的列表。                           |
| srst     | 重置服务器的统计。                                           |
| srvr     | 3.3.0版本引入的。列出连接服务器的详细信息                    |
| wchs     | 3.3.0版本引入的。列出服务器watch的详细信息。                 |
| wchc     | 3.3.0版本引入的。通过session列出服务器watch的详细信息，它的输出是一个与watch相关的会话的列表。 |
| wchp     | 3.3.0版本引入的。通过路径列出服务器watch的详细信息。它输出一个与session相关的路径。 |
| mntr     | 3.4.0版本引入的。输出可用于检测集群健康状态的变量列表        |

查看 zk 的状态信息

```sh
# 开启四字命令
# 方法1： 在zoo.cfg 文件里加入配置项让这些指令放行
4lw.commands.whitelist=*         

# 方法2：在zk的启动脚本zkServer.sh中新增放行指令，添加ＶＭ环境变量
-DZookeeper.4lw.commands.whitelist=* ZOOMAIN="-DZookeeper.4lw.commands.whitelist=* ${ZOOMAIN}"

# stat 命令用于查看 zk 的状态信息
echo stat | nc 192.168.65.156 2181
```

### Zookeeper Leader 选举原理

Zookeeper 的 leader 选举存在两个阶段：**一个是服务器启动时 leader 选举，另一个是运行过程中 leader 服务器宕机**。

在分析选举原理前，先介绍几个重要的参数：

- 服务器 ID(`myid`)：编号越大在选举算法中权重越大
- 事务 ID(`zxid`)：值越大说明数据越新，权重越大
- 逻辑时钟(`epoch-logicalclock`)：同一轮投票过程中的逻辑时钟值是相同的，每投完一次值会增加

选举状态：

- `LOOKING`：竞选状态
- `FOLLOWING`：随从状态，同步 leader 状态，参与投票
- `OBSERVING`：观察状态，同步 leader 状态，不参与投票
- `LEADING`：领导者状态

**服务器启动时的 leader 选举**

每个节点启动的时候都 `LOOKING` 观望状态，接下来就开始进行选举主流程。这里选取三台机器组成的集群为例。第一台服务器 server1启动时，无法进行 leader 选举，当第二台服务器 server2 启动时，两台机器可以相互通信，进入 leader 选举过程。

1. 每台 server 发出一个投票，由于是初始情况，server1 和 server2 都将自己作为 leader 服务器进行投票，每次投票包含所推举的服务器`myid、zxid、epoch`，使用（myid，zxid）表示，此时 server1 投票为（1,0），server2 投票为（2,0），然后将各自投票发送给集群中其他机器。

2. 接收来自各个服务器的投票。集群中的每个服务器收到投票后，首先判断该投票的有效性，如检查是否是本轮投票（`epoch`）、是否来自 `LOOKING` 状态的服务器。

3. 分别处理投票。针对每一次投票，服务器都需要将其他服务器的投票和自己的投票进行对比，对比规则如下：

   1. 优先比较 epoch

   2. 检查 zxid，zxid 比较大的服务器优先作为 leader

   3. 如果 zxid 相同，那么就比较 myid，myid 较大的服务器作为 leader 服务器

4. 统计投票。每次投票后，服务器统计投票信息，判断是都有过半机器接收到相同的投票信息。server1、server2 都统计出集群中有两台机器接受了（2,0）的投票信息，此时已经选出了 server2 为 leader 节点。

5. 改变服务器状态。一旦确定了 leader，每个服务器响应更新自己的状态，如果是 follower，那么就变更为 `FOLLOWING`，如果是 Leader，变更为 `LEADING`。此时 server3继续启动，直接加入变更自己为 `FOLLOWING`。

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/Zookeeper/45570.png)

**运行过程中的 leader 选举**

当集群中 leader 服务器出现宕机或者不可用情况时，整个集群无法对外提供服务，进入新一轮的 leader 选举。

1. 变更状态。leader 挂后，其他**非 Oberver服务器**将自身服务器状态变更为 `LOOKING`。

2. 每个 server 发出一个投票。在运行期间，每个服务器上 zxid 可能不同。

3. 处理投票。规则同启动过程。

4. 统计投票。与启动过程相同。
5. 改变服务器状态。与启动过程相同。

### Zookeeper 数据同步流程

在 Zookeeper 中，主要依赖 **`ZAB` 协议**来实现分布式数据一致性。**ZAB 协议**分为两部分：

- 消息广播
- 崩溃恢复

**消息广播**

Zookeeper 使用单一的主进程 Leader 来接收和处理客户端所有事务请求，并采用 **ZAB 协议的原子广播协议**，将事务请求以 `Proposal` 提议广播到所有 Follower 节点，当集群中有过半的Follower 服务器进行正确的 `ACK 反馈`，那么Leader就会再次向所有的 Follower 服务器发送commit 消息，将此次提案进行提交。这个过程可以简称为 **2pc 事务提交**，整个流程可以参考下图：

> 注意 Observer 节点只负责同步 Leader 数据，不参与 2PC 数据同步过程。

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/Zookeeper/45559.png)

**崩溃恢复**

在正常情况消息下广播能运行良好，但是一旦 Leader 服务器出现崩溃，或者由于网络原理导致 Leader 服务器失去了与过半 Follower 的通信，那么就会进入**崩溃恢复模式**，需要选举出一个新的 Leader 服务器。在这个过程中可能会出现两种**数据不一致性**的隐患，需要 **ZAB 协议**的特性进行避免。

- Leader 服务器将消息 commit 发出后，立即崩溃
- Leader 服务器刚提出 proposal 后，立即崩溃

**ZAB 协议**的恢复模式使用了以下策略：

- 选举 zxid 最大的节点作为新的 leader
- 新 leader 将事务日志中尚未提交的消息进行处理

## Zookeeper整合Java实战

### Zookeeper官方API

Zookeeper官方的客户端API提供了基本的操作。例如：**创建会话、创建节点、读取节点、 更新数据、删除节点和检查节点是否存在等**。不过，对于实际开发来说，Zookeeper官方 API有一些不足之处，**一般不推荐使用**。具体如下：

1. Zookeeper的Watcher监测是一次性的，每次触发之后都需要重新进行注册。
2. 会话超时之后没有实现重连机制。
3. 异常处理烦琐，Zookeeper提供了很多异常，对于开发人员来说可能根本不知 道应该如何处理这些抛出的异常。
4. 仅提供了简单的`byte[]`数组类型的接口，没有提供`Java POJO`级别的序列化数据 处理接口。 创建节点时如果抛出异常，需要自行检查节点是否存在。
5. 无法实现级联删除。

**Zookeeper主要方法**

| 方法名                              | 描述                                                         |
| ----------------------------------- | ------------------------------------------------------------ |
| create(path, data, acl, createMode) | 创建一个给定路径的 znode，并在 znode 保存 data[] 的数据，createMode 指定 znode 的类型。 |
| delete(path, version)               | 如果给定 path 上的 znode 的版本和给定的 version 匹配，删除 znode。 |
| exists(path, watch)                 | 判断给定 path 上的 znode 是否存在，并在 znode 设置一个 watch。 |
| getData(path, watch)                | 返回给定 path 上的 znode 数据，并在 znode 设置一个 watch。   |
| setData(path, data, version)        | 如果给定 path 上的 znode 的版本和给定的 version 匹配，设置 znode 数据。 |
| getChildren(path, watch)            | 返回给定 path 上的 znode 的孩子 znode 名字，并在 znode 设置一个 watch。 |
| sync(path)                          | 把客户端 session 连接节点和 leader 节点进行同步。            |

方法特点：

- 所有获取 znode 数据的 API 都可以设置一个 watch 用来监控 znode 的变化。 
- 所有更新 znode 数据的 API 都有两个版本：无条件更新版本和条件更新版本。如果 version 为 -1，更新为无条件更新。否则只有给定的 version 和 znode 当前的 version 一样，才会进行更新，这样的更新是条件更新。
- 所有的方法都有同步和异步两个版本。同步版本的方法发送请求给 Zookeeper 并等待服务器的响应。异步版本把请求放入客户端的请求队列，然后马上返回。异步版本通过 callback 来接受来自服务端的响应。

1. **引入`Zookeeper client`依赖**

```xml
<!-- Zookeeper client -->
<dependency>
    <groupId>org.apache.Zookeeper</groupId>
    <artifactId>Zookeeper</artifactId>
    <version>3.8.0</version>
</dependency>
```

2. **节点操作**

```java
public class ZkClientDemo {

    private static final  String  CONNECT_STR="localhost:2181";
    private final static  String CLUSTER_CONNECT_STR="192.168.65.156:2181,192.168.65.190:2181,192.168.65.200:2181";

    public static void main(String[] args) throws Exception {

        final CountDownLatch countDownLatch=new CountDownLatch(1);
        Zookeeper Zookeeper = new Zookeeper(CLUSTER_CONNECT_STR,
                4000, new Watcher() {
            @Override
            public void process(WatchedEvent event) {
                if(Event.KeeperState.SyncConnected==event.getState() 
                        && event.getType()== Event.EventType.None){
                    //如果收到了服务端的响应事件，连接成功
                    countDownLatch.countDown();
                    System.out.println("连接建立");
                }
            }
        });
        System.out.printf("连接中");
        countDownLatch.await();
        //CONNECTED
        System.out.println(Zookeeper.getState());

        //创建持久节点
        Zookeeper.create("/user","fox".getBytes(),
                ZooDefs.Ids.OPEN_ACL_UNSAFE, CreateMode.PERSISTENT);

    }
  
  	// 同步创建节点
    @Test
    public void createTest() throws KeeperException, InterruptedException {
        String path = Zookeeper.create(ZK_NODE, "data".getBytes(), ZooDefs.Ids.OPEN_ACL_UNSAFE, CreateMode.PERSISTENT);
        log.info("created path: {}",path);
    } 
     
    // 异步创建节点  
    @Test
    public void createAsycTest() throws InterruptedException {
         Zookeeper.create(ZK_NODE, "data".getBytes(), ZooDefs.Ids.OPEN_ACL_UNSAFE,
                 CreateMode.PERSISTENT,
                 (rc, path, ctx, name) -> log.info("rc  {},path {},ctx {},name {}",rc,path,ctx,name),"context");
        TimeUnit.SECONDS.sleep(Integer.MAX_VALUE);
    }
      
    // 修改节点数据
    @Test
    public void setTest() throws KeeperException, InterruptedException {

        Stat stat = new Stat();
        byte[] data = Zookeeper.getData(ZK_NODE, false, stat);
        log.info("修改前: {}",new String(data));
        Zookeeper.setData(ZK_NODE, "changed!".getBytes(), stat.getVersion());
         byte[] dataAfter = Zookeeper.getData(ZK_NODE, false, stat);
        log.info("修改后: {}",new String(dataAfter));
    }
}
```

### Curator开源客户端使用

Curator是Netflix公司开源的一套Zookeeper客户端框架，和ZkClient一样它解决了非常底层的细节开发工作，包括**连接、重连、反复注册Watcher的问题以及NodeExistsException异常等**。

Curator还为Zookeeper客户端框架提供了一些比较普遍的、开箱即用的、分布式开发用的解决方案，例如Recipe、共享锁服务、Master选举机制和分布式计算器等，帮助开发者避免了“重复造轮子”的无效开发工作。

1. **引入依赖**

- `curator-framework`是对Zookeeper的底层API的一些封装。

- `curator-client`提供了一些客户端的操作，例如重试策略等。

- `curator-recipes`封装了一些高级特性，如：Cache事件监听、选举、分布式锁、分布式计数器、分布式Barrier等。

```xml
<!-- Zookeeper client -->
<dependency>
    <groupId>org.apache.Zookeeper</groupId>
    <artifactId>Zookeeper</artifactId>
    <version>3.8.0</version>
</dependency>

<!--curator-->
<dependency>
    <groupId>org.apache.curator</groupId>
    <artifactId>curator-recipes</artifactId>
    <version>5.1.0</version>
    <exclusions>
        <exclusion>
            <groupId>org.apache.Zookeeper</groupId>
            <artifactId>Zookeeper</artifactId>
        </exclusion>
    </exclusions>
</dependency>
```

2. **创建一个客户端实例**

在使用`curator-framework`包操作Zookeeper前，首先要创建一个客户端实例。这是一个`CuratorFramework`类型的对象，有两种方法：

- 使用工厂类`CuratorFrameworkFactory`的静态`newClient()`方法。

```java
// 重试策略 
RetryPolicy retryPolicy = new ExponentialBackoffRetry(1000, 3)
//创建客户端实例
CuratorFramework client = CuratorFrameworkFactory.newClient(ZookeeperConnectionString, retryPolicy);
//启动客户端
client.start();
```

- 使用工厂类`CuratorFrameworkFactory`的静态`builder`构造者方法。

```java
RetryPolicy retryPolicy = new ExponentialBackoffRetry(1000, 3);
CuratorFramework client = CuratorFrameworkFactory.builder()
                .connectString("192.168.128.129:2181")
                .sessionTimeoutMs(5000)  // 会话超时时间
                .connectionTimeoutMs(5000) // 连接超时时间
                .retryPolicy(retryPolicy)
                .namespace("base") // 包含隔离名称
                .build();
client.start();
```

- `connectionString`：服务器地址列表，在指定服务器地址列表的时候可以是一个地址，也可以是多个地址。如果是多个地址，那么每个服务器地址列表用逗号分隔, 如  `host1:port1,host2:port2,host3；port3` 。 

- `retryPolicy`：重试策略，当客户端异常退出或者与服务端失去连接的时候，可以通过设置客户端重新连接 Zookeeper 服务端。而 Curator 提供了 一次重试、多次重试等不同种类的实现方式。在 Curator 内部，可以通过判断服务器返回的 keeperException 的状态代码来判断是否进行重试处理，如果返回的是 OK 表示一切操作都没有问题，而 SYSTEMERROR 表示系统或服务端错误。

| 策略名称                | 描述                                 |
| ----------------------- | ------------------------------------ |
| ExponentialBackoffRetry | 重试一组次数，重试之间的睡眠时间增加 |
| RetryNTimes             | 重试最大次数                         |
| RetryOneTime            | 只重试一次                           |
| RetryUntilElapsed       | 在给定的时间结束之前重试             |

- 超时时间：Curator 客户端创建过程中，有两个超时时间的设置。
  1. 一个是 `sessionTimeoutMs` 会话超时时间，用来设置该条会话在 Zookeeper 服务端的失效时间。作用在服务端。
  2. 另一个是 `connectionTimeoutMs` 客户端创建会话的超时时间，用来限制客户端发起一个会话连接到接收 Zookeeper 服务端应答的时间。`connectionTimeoutMs` 作用在客户端。

**节点操作**

描述一个节点要包括节点的类型，即临时节点还是持久节点、节点的数据信息、节点是否是有序节点等属性和性质。在 Curator 中，可以使用 create 函数创建数据节点，并通过 withMode 函数指定节点类型（持久化节点，临时节点，顺序节点，临时顺序节点，持久化顺序节点等），默认是持久化节点，之后调用 forPath 函数来指定节点的路径和数据信息。

```java
@Test
public void testCreate() throws Exception {
    String path = curatorFramework.create().forPath("/curator-node");
    curatorFramework.create().withMode(CreateMode.PERSISTENT).forPath("/curator-node","some-data".getBytes())
    log.info("curator create node :{}  successfully.",path);
}

// 一次性创建带层级结构的节点
@Test
public void testCreateWithParent() throws Exception {
    String pathWithParent="/node-parent/sub-node-1";
    String path = curatorFramework.create().creatingParentsIfNeeded().forPath(pathWithParent);
    log.info("curator create node :{}  successfully.",path);
}

// 获取数据
@Test
public void testGetData() throws Exception {
    byte[] bytes = curatorFramework.getData().forPath("/curator-node");
    log.info("get data from  node :{}  successfully.",new String(bytes));
}

// 更新节点
// 通过客户端实例的 setData() 方法更新 Zookeeper 服务上的数据节点，在setData 方法的后边，通过 forPath 函数来指定更新的数据节点路径以及要更新的数据。
@Test
public void testSetData() throws Exception {
    curatorFramework.setData().forPath("/curator-node","changed!".getBytes());
    byte[] bytes = curatorFramework.getData().forPath("/curator-node");
    log.info("get data from  node /curator-node :{}  successfully.",new String(bytes));
}

// 删除节点
/**
guaranteed：该函数的功能如字面意思一样，主要起到一个保障删除成功的作用，其底层工作方式是：只要该客户端的会话有效，就会在后台持续发起删除请求，直到该数据节点在 Zookeeper 服务端被删除。
deletingChildrenIfNeeded：指定了该函数后，系统在删除该数据节点的时候会以递归的方式直接删除其子节点，以及子节点的子节点。
**/
@Test
public void testDelete() throws Exception {
    String pathWithParent="/node-parent";
    curatorFramework.delete().guaranteed().deletingChildrenIfNeeded().forPath(pathWithParent);
}
```

**异步接口**

Curator 引入了`BackgroundCallback` 接口，用来处理服务器端返回来的信息，这个处理过程是在异步线程中调用，默认在 **EventThread** 中调用，也可以自定义线程池。

主要参数为 client 客户端， 和服务端事件 event 

```java
public interface BackgroundCallback
{
    /**
     * Called when the async background operation completes
     *
     * @param client the client
     * @param event operation result details
     * @throws Exception errors
     */
    public void processResult(CuratorFramework client, CuratorEvent event) throws Exception;
}
```

示例

```java
// 异步线程调用
@Test
public void test() throws Exception {
    curatorFramework.getData().inBackground((item1, item2) -> {
        log.info(" background: {}", item2);
    }).forPath(ZK_NODE);

    TimeUnit.SECONDS.sleep(Integer.MAX_VALUE);
}

// 自定义线程池
@Test
public void test() throws Exception {
    ExecutorService executorService = Executors.newSingleThreadExecutor();
    
    curatorFramework.getData().inBackground((item1, item2) -> {
        log.info(" background: {}", item2);
    },executorService).forPath(ZK_NODE);

    TimeUnit.SECONDS.sleep(Integer.MAX_VALUE);
}
```

**Curator 监听器**

针对 `background` 通知和错误通知。使用此监听器之后，调用`inBackground` 方法会异步获得监听

```java
/**
 * Receives notifications about errors and background events
 */
public interface CuratorListener
{
    /**
     * Called when a background task has completed or a watch has triggered
     *
     * @param client client
     * @param event the event
     * @throws Exception any errors
     */
    public void eventReceived(CuratorFramework client, CuratorEvent event) throws Exception;
}
```

Curator 引入了 Cache 来实现对 Zookeeper 服务端事件监听，Cache 事件监听可以理解为**一个本地缓存视图与远程 Zookeeper 视图的对比过程**。Cache 提供了反复注册的功能。Cache 分为两类注册类型：节点监听和子节点监听。

```java
@Slf4j
public class CacheTest extends AbstractCuratorTest{

    public static final String NODE_CACHE="/node-cache";
  	public static final String PATH="/path-cache";
    public static final String TREE_CACHE="/tree-path";
		
  	// 监听当前节点
    @Test
    public void testNodeCacheTest() throws Exception {

        createIfNeed(NODE_CACHE);
        NodeCache nodeCache = new NodeCache(curatorFramework, NODE_CACHE);
        nodeCache.getListenable().addListener(new NodeCacheListener() {
            @Override
            public void nodeChanged() throws Exception {
                log.info("{} path nodeChanged: ",NODE_CACHE);
 								byte[] bytes = curatorFramework.getData().forPath(NODE_CACHE);
        				log.info("data: {}",new String(bytes));
            }
        });
        nodeCache.start();
    }
    
		// 监听当前节点的子节点，但是不会对二级子节点进行监听
  	@Test
    public void testPathCache() throws Exception {

        createIfNeed(PATH);
        PathChildrenCache pathChildrenCache = new PathChildrenCache(curatorFramework, PATH, true);
        pathChildrenCache.getListenable().addListener(new PathChildrenCacheListener() {
            @Override
            public void childEvent(CuratorFramework client, PathChildrenCacheEvent event) throws Exception {
                log.info("event:  {}",event);
            }
        });

        // 如果设置为true则在首次启动时就会缓存节点内容到Cache中
        pathChildrenCache.start(true);
    }
  
		// 监听当前节点下所有节点
  	@Test
    public void testTreeCache() throws Exception {
        createIfNeed(TREE_CACHE);
        TreeCache treeCache = new TreeCache(curatorFramework, TREE_CACHE);
        treeCache.getListenable().addListener(new TreeCacheListener() {
            @Override
            public void childEvent(CuratorFramework client, TreeCacheEvent event) throws Exception {
                log.info(" tree cache: {}",event);
            }
        });
        treeCache.start();
    }
}
```

## Zookeeper分布式命名服务实战

命名服务是为系统中的资源提供标识能力。**Zookeeper的命名服务主要是利用Zookeeper节点的树形分层结构和子节点的顺序维护能力，来为分布式系统中的资源命名。**

分布式命名服务典型应用场景：

- 分布式API目录
- 分布式节点命名
- 分布式ID生成器

### 分布式API目录

为分布式系统中各种API接口服务的名称、链接地址，提供类似JNDI（Java命名和目录接口）中的文件系统的功能。借助于**Zookeeper的树形分层结构**就能提供分布式的API调用功能。

Dubbo分布式框架就是应用了Zookeeper的分布式的JNDI功能。在Dubbo中，使用Zookeeper维护的**全局服务接口API的地址列表**。大致的思路为：

-  服务提供者（`Service Provider`）在启动的时候，向Zookeeper上的指定节点`/dubbo/${serviceName}/providers`写入自己的API地址，这个操作就相当于服务的公开。
-  服务消费者（`Consumer`）启动的时候，订阅节点`/dubbo/{serviceName}/providers`下的服务提供者的URL地址，获得所有服务提供者的API。

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/Zookeeper/45745.png)

### 分布式节点命名

一个分布式系统通常会由很多的节点组成，节点的数量不是固定的，而是不断动态变化的。比如：

1. 当业务不断膨胀和流量洪峰到来时，大量的节点可能会动态加入到集群中。而一旦流量洪峰过去了，就需要下线大量的节点。
2. 由于机器或者网络的原因，一些节点会主动离开集群。

如何为大量的动态节点命名呢？一种简单的办法是可以通过配置文件，手动为每一个节点命名。但是，如果节点数据量太大，或者说变动频繁，手动命名则是不现实的，这就需要用到**分布式节点的命名服务。**

可用于生成集群节点的编号的方案：

1. 使用数据库的自增ID特性，用数据表存储机器的MAC地址或者IP来维护。

2. 使用Zookeeper持久顺序节点的顺序特性来维护节点的`NodeId`编号。

在第2种方案中，集群节点命名服务的基本流程是：

1. 启动节点服务，连接Zookeeper，检查命名服务根节点是否存在，如果不存在，就创建系统的根节点。

2. 在根节点下创建一个临时顺序ZNode节点，取回ZNode的编号把它作为分布式系统中节点的`NODEID`。

3. 如果临时节点太多，可以根据需要删除临时顺序ZNode节点。

### 分布式ID生成器

在分布式系统中，分布式ID生成器的使用场景非常之多：

- 大量的数据记录，需要分布式ID。
- 大量的系统消息，需要分布式ID。
- 大量的请求日志，如restful的操作记录，需要唯一标识，以便进行后续的用户行为分析和调用链路分析。
- 分布式节点的命名服务，往往也需要分布式ID。

传统的数据库自增主键已经不能满足需求。在分布式系统环境中，迫切需要一种全新的唯一ID系统，这种系统需要满足以下需求：

- **全局唯一：**不能出现重复ID。

- **高可用：**ID生成系统是基础系统，被许多关键系统调用，一旦宕机，就会造成严重影响。

分布式的ID生成器方案大致如下：

1. Java的`UUID`。
2. 分布式缓存Redis生成ID：利用Redis的原子操作`INCR`和`INCRBY`，生成全局唯一的ID。
3. Twitter的`SnowFlake`算法。
4. Zookeeper生成ID：利用Zookeeper的**顺序节点**，生成全局唯一的ID。
5. MongoDb的ObjectId：MongoDB是一个分布式的非结构化NoSQL数据库，每插入一条记录会自动生成全局唯一的一个`_id`字段值，它是一个12字节的字符串，可以作为分布式系统中全局唯一的ID。

#### 基于Zookeeper实现分布式ID生成器

在Zookeeper节点中，其中有以下两种类型具备自动编号的能力

- `PERSISTENT_SEQUENTIAL`持久化顺序节点。
- `EPHEMERAL_SEQUENTIAL`临时顺序节点。

Zookeeper的每一个节点都会为它的第一级子节点维护一份顺序编号，会记录每个子节点创建的先后顺序，这个顺序编号是分布式同步的，也是全局唯一的。可以通过创建Zookeeper的临时顺序节点的方法，生成全局唯一的ID

```java
@Slf4j
public class IDMaker extends CuratorBaseOperations {

    private String createSeqNode(String pathPefix) throws Exception {
        CuratorFramework curatorFramework = getCuratorFramework();
        //创建一个临时顺序节点
        String destPath = curatorFramework.create()
                .creatingParentsIfNeeded()
                .withMode(CreateMode.EPHEMERAL_SEQUENTIAL)
                .forPath(pathPefix);
        return destPath;
    }

    public String  makeId(String path) throws Exception {
        String str = createSeqNode(path);
        if(null != str){
            //获取末尾的序号
            int index = str.lastIndexOf(path);
            if(index>=0){
                index+=path.length();
                return index<=str.length() ? str.substring(index):"";
            }
        }
        return str;
    }
}
```

测试

```java
@Test
public void testMarkId() throws Exception {
    IDMaker idMaker = new IDMaker();
    idMaker.init();
    String pathPrefix = "/idmarker/id-";

    for(int i=0;i<5;i++){
        new Thread(()->{
            for (int j=0;j<10;j++){
                String id = null;
                try {
                    id = idMaker.makeId(pathPrefix);
                    log.info("{}线程第{}个创建的id为{}",Thread.currentThread().getName(),
                            j,id);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        },"thread"+i).start();
    }
    Thread.sleep(Integer.MAX_VALUE);

}
```

结果

![img](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/Zookeeper/45808.png)

#### 基于Zookeeper实现SnowFlakeID算法

SnowFlake算法是一种著名的分布式服务器用户ID生成算法。SnowFlake算法所生成的ID是一个64bit的长整型数字。这个64bit被划分成四个部分，其中后面三个部分分别表示时间戳、工作机器ID、序列号。

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/Zookeeper/45839.png)

SnowFlakeID的四个部分，具体介绍如下：

| 内容       | 占用位数 | 描述                                                      |
| ---------- | -------- | --------------------------------------------------------- |
| 第一位     | 1 bit    | 始终为0，没有实际作用。                                   |
| 时间戳     | 41 bit   | 精确到毫秒，总共可以容纳约69年的时间。                    |
| 工作机器id | 10 bit   | 最多可以容纳1024个节点。                                  |
| 序列号     | 12 bit   | 在同一毫秒同一节点上从0开始不断累加，最多可以累加到4095。 |

在工作节点达到1024顶配的场景下，SnowFlake算法在同一毫秒最多可以生成的ID数量为： 1024 * 4096 =4194304，在绝大多数并发场景下都是够用的。

SnowFlake算法的优点：

- 生成ID时不依赖于数据库，完全在内存生成，高性能和高可用性。
- 容量大，每秒可生成几百万个ID。
- ID呈趋势递增，后续插入数据库的索引树时，性能较高。

SnowFlake算法的缺点：

- 依赖于系统时钟的一致性，如果某台机器的系统时钟回拨了，有可能造成ID冲突，或者ID乱序。
- 在启动之前，如果这台机器的系统时间回拨过，那么有可能出现ID重复的危险。

**基于zookeeper实现雪花算法：**

```java
public class SnowflakeIdGenerator {

    /**
     * 单例
     */
    public static SnowflakeIdGenerator instance = new SnowflakeIdGenerator();

  	/**
     * 初始化单例
     *
     * @param workerId 节点Id,最大8091
     * @return the 单例
     */
    public synchronized void init(long workerId) {
        if (workerId > MAX_WORKER_ID) {
            // zk分配的workerId过大
            throw new IllegalArgumentException("woker Id wrong: " + workerId);
        }
        instance.workerId = workerId;
    }

    private SnowflakeIdGenerator() {

    }
  
    /**
     * 开始使用该算法的时间为: 2017-01-01 00:00:00
     */
    private static final long START_TIME = 1483200000000L;

    /**
     * worker id 的bit数，最多支持8192个节点
     */
    private static final int WORKER_ID_BITS = 13;

    /**
     * 序列号，支持单节点最高每毫秒的最大ID数1024
     */
    private final static int SEQUENCE_BITS = 10;

    /**
     * 最大的 worker id ，8091
     * -1 的补码（二进制全1）右移13位, 然后取反
     */
    private final static long MAX_WORKER_ID = ~(-1L << WORKER_ID_BITS);

    /**
     * 最大的序列号，1023
     * -1 的补码（二进制全1）右移10位, 然后取反
     */
    private final static long MAX_SEQUENCE = ~(-1L << SEQUENCE_BITS);

    /**
     * worker 节点编号的移位
     */
    private final static long WORKER_ID_SHIFT = SEQUENCE_BITS;

    /**
     * 时间戳的移位
     */
    private final static long TIMESTAMP_LEFT_SHIFT = WORKER_ID_BITS + SEQUENCE_BITS;

    /**
     * 该项目的worker 节点 id
     */
    private long workerId;

    /**
     * 上次生成ID的时间戳
     */
    private long lastTimestamp = -1L;

    /**
     * 当前毫秒生成的序列
     */
    private long sequence = 0L;

    /**
     * Next id long.
     *
     * @return the nextId
     */
    public Long nextId() {
        return generateId();
    }

    /**
     * 生成唯一id的具体实现
     */
    private synchronized long generateId() {
        long current = System.currentTimeMillis();

        if (current < lastTimestamp) {
            // 如果当前时间小于上一次ID生成的时间戳，说明系统时钟回退过，出现问题返回-1
            return -1;
        }

        if (current == lastTimestamp) {
            // 如果当前生成id的时间还是上次的时间，那么对sequence序列号进行+1
            sequence = (sequence + 1) & MAX_SEQUENCE;

            if (sequence == MAX_SEQUENCE) {
                // 当前毫秒生成的序列数已经大于最大值，那么阻塞到下一个毫秒再获取新的时间戳
                current = this.nextMs(lastTimestamp);
            }
        } else {
            // 当前的时间戳已经是下一个毫秒
            sequence = 0L;
        }

        // 更新上次生成id的时间戳
        lastTimestamp = current;

        // 进行移位操作生成int64的唯一ID

        //时间戳右移动23位
        long time = (current - START_TIME) << TIMESTAMP_LEFT_SHIFT;

        //workerId 右移动10位
        long workerId = this.workerId << WORKER_ID_SHIFT;

        return time | workerId | sequence;
    }

    /**
     * 阻塞到下一个毫秒
     */
    private long nextMs(long timeStamp) {
        long current = System.currentTimeMillis();
        while (current <= timeStamp) {
            current = System.currentTimeMillis();
        }
        return current;
    }
}
```

## Zookeeper分布式锁实战

**分布式锁**

- 在单体的应用开发场景中涉及并发同步的时候，往往采用`Synchronized`（同步）或者其他同一个JVM内Lock机制来解决多线程间的同步问题。

- 在分布式集群工作的开发场景中，就需要一种更加高级的锁机制来处理跨机器的进程之间的数据同步问题，这种跨机器的锁就是分布式锁。

目前分布式锁，比较成熟、主流的方案：

1. 基于数据库的分布式锁。db操作性能较差，并且有锁表的风险，一般不考虑。

2. 基于Redis的分布式锁。适用于并发量很大、性能要求很高而可靠性问题可以通过其他方案去弥补的场景。

3. 基于Zookeeper的分布式锁。适用于高可靠（高可用），而并发量不是太高的场景。

### 基于数据库设计思路

可以利用数据库的**唯一索引**来实现，唯一索引天然具有排他性

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/Zookeeper/46070.png)

基于数据库实现分布式锁存在的问题：

1. 如果数据库服异常停止，就无法正常删除数据释放锁导致其他线程获取锁失败
2. 释放锁时无法主动通知其他线程获取锁，只能让其他线程一直尝试获取锁

### 基于Zookeeper设计思路一

使用**临时 znode** 来表示获取锁的请求，创建 znode成功的用户拿到锁。

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/Zookeeper/46025.png)

上述设计存在的问题：如果所有的锁请求者都 watch 锁持有者，当代表锁持有者的 znode 被删除以后，**所有的锁请求者都会通知到**，但是只有一个锁请求者能拿到锁。这就是**羊群效应**。

### 基于Zookeeper设计思路二

使用**临时顺序 znode** 来表示获取锁的请求，创建最小后缀数字 znode 的用户成功拿到锁。（公平锁的实现）

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/Zookeeper/46033.png)

> 在实际的开发中，如果需要使用到分布式锁，建议直接使用Curator客户端中的各种官方实现的分布式锁，例如其中的`InterProcessMutex`可重入锁。

### Curator 可重入分布式锁

工作流程

![image-20240124170726667](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/Zookeeper/image-20240124170726667.png)

**Zookeeper分布式锁的优缺点**

优点：Zookeeper分布式锁（如`InterProcessMutex`），具备高可用、可重入、阻塞锁特性，可解决失效死锁问题，使用起来也较为简单。

缺点：因为需要频繁的创建和删除节点，性能上不如Redis。

> 在高性能、高并发的应用场景下，不建议使用Zookeeper的分布式锁。而由于Zookeeper的高可用性，因此在并发量不是太高的应用场景中，还是推荐使用Zookeeper的分布式锁。

## Zookeeper注册中心实战

用于**服务注册**和**服务发现**，基于 Zookeeper 本身的特性可以实现注册中心

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/Zookeeper/46101.png)

1. 在父pom文件中指定Spring Cloud版本

```xml
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>2.3.2.RELEASE</version>
    <relativePath/> <!-- lookup parent from repository -->
</parent>
<properties>
    <java.version>1.8</java.version>
    <spring-cloud.version>Hoxton.SR8</spring-cloud.version>
</properties>
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-dependencies</artifactId>
            <version>${spring-cloud.version}</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
    </dependencies>
</dependencyManagement>
```

> 注意springboot和springcloud的版本兼容问题

2. 微服务pom文件中引入`Spring Cloud Zookeeper`注册中心依赖

```xml
<!-- Zookeeper服务注册与发现 -->
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-Zookeeper-discovery</artifactId>
    <exclusions>
        <exclusion>
            <groupId>org.apache.Zookeeper</groupId>
            <artifactId>Zookeeper</artifactId>
        </exclusion>
    </exclusions>
</dependency>

<!-- Zookeeper client -->
<dependency>
    <groupId>org.apache.Zookeeper</groupId>
    <artifactId>Zookeeper</artifactId>
    <version>3.8.0</version>
</dependency>
```

> Zookeeper客户端依赖和Zookeeper sever的版本兼容问题
>
> Spring Cloud整合Zookeeper注册中心核心源码入口： `ZookeeperDiscoveryClientConfiguration`

3. 微服务配置文件`application.yml`中配置Zookeeper注册中心地址

```yaml
spring:
  cloud:
    Zookeeper:    
      connect-string: localhost:2181
      discovery:
        instance-host: 127.0.0.1
```

注册到Zookeeper的服务实例元数据信息如下：

![0](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/Zookeeper/46142.png)

> 如果address有问题，会出现找不到服务的情况，可以通过`instance-host`配置指定

第四步：整合feign进行服务调用

```java
@RequestMapping(value = "/findOrderByUserId/{id}")
public R  findOrderByUserId(@PathVariable("id") Integer id) {
    log.info("根据userId:"+id+"查询订单信息");
    //feign调用   
    R result = orderFeignService.findOrderByUserId(id);
    return result;
}
```

测试：http://localhost:8040/user/findOrderByUserId/1
