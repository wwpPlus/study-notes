# Redis

[官网](https://redis.io/) [中文网](http://www.redis.cn)

## Redis数据结构

### Redis安装

```sh
# 下载地址：http://redis.io/download
# 安装步骤：
# 安装gcc
yum install gcc

# 把下载好的redis-5.0.3.tar.gz放在/usr/local文件夹下，并解压
wget http://download.redis.io/releases/redis-5.0.3.tar.gz
tar -zxvf redis-5.0.3.tar.gz
cd redis-5.0.3

# 进入到解压好的redis-5.0.3目录下，进行编译与安装
make

# 修改配置
daemonize yes  #后台启动
protected-mode no  #关闭保护模式，开启的话，只有本机才可以访问redis
# 需要注释掉bind
#bind 127.0.0.1（bind绑定的是自己机器网卡的ip，如果有多块网卡可以配多个ip，代表允许客户端通过机器的哪些网卡ip去访问，内网一般可以不配置bind，注释掉即可）

# 启动服务
src/redis-server redis.conf

# 验证启动是否成功 
ps -ef | grep redis 

# 进入redis客户端 
src/redis-cli 

# 退出客户端
quit

# 退出redis服务： 
（1）pkill redis-server 
（2）kill 进程号                       
（3）src/redis-cli shutdown 
```

### Redis数据结构

![image-20240110183711114](./imgs/Redis/image-20240110183711114.png)

#### **Redis主体数据结构**

![RedisDB主体数据结构](./imgs/Redis/RedisDB主体数据结构.png)

#### 字符串 String

![image-20240117115945329](./imgs/Redis/image-20240117115945329.png)

**常用操作**

```sh
SET key value  //存入字符串键值对
MSET key value [key value ...]  //批量存储字符串键值对
SETNX key value  //存入一个不存在的字符串键值对
GET key  //获取一个字符串键值
MGET key [key ...]   //批量获取字符串键值
DEL key [key ...]  //删除一个键
EXPIRE key seconds  //设置一个键的过期时间(秒)

# 原子加减
INCR key  //将key中储存的数字值加1
DECR key  //将key中储存的数字值减1
INCRBY key increment  //将key所储存的值加上increment
DECRBY key decrement  //将key所储存的值减去decrement
```

**应用场景**

```sh
# 单值缓存
SET  key  value 	
GET  key 	

# 对象缓存
1) SET  user:1  value(json格式数据)
2) MSET  user:1:name  zhuge   user:1:balance  1888
    MGET  user:1:name   user:1:balance 
# 分布式锁
SETNX  product:10001  true 		//返回1代表获取锁成功
SETNX  product:10001  true 		//返回0代表获取锁失败
# 执行业务操作
DEL  product:10001			//执行完业务释放锁
SET product:10001 true  ex  10  nx	//防止程序意外终止导致死锁

# 计数器
INCR article:readcount:{文章id}  	
GET article:readcount:{文章id} 

# Web集群session共享：spring session + redis实现session共享

# 分布式系统全局序列号	
INCRBY  orderId  1000		//redis批量生成序列号提升性能
```

#### 哈希 Hash

- 优点

1. 同类数据归类整合储存，方便数据管理

2. 相比string操作消耗内存与cpu更小

3. 相比string储存更节省空间

- 缺点

1. 过期功能不能使用在field上，只能用在key上

2. Redis集群架构下不适合大规模使用

**常用操作**

```sh
HSET  key  field  value 			//存储一个哈希表key的键值
HSETNX  key  field  value 		//存储一个不存在的哈希表key的键值
HMSET  key  field  value [field value ...] 	//在一个哈希表key中存储多个键值对
HGET  key  field 				//获取哈希表key对应的field键值
HMGET  key  field  [field ...] 		//批量获取哈希表key中多个field键值
HDEL  key  field  [field ...] 		//删除哈希表key中的field键值
HLEN  key				//返回哈希表key中field的数量
HGETALL  key				//返回哈希表key中所有的键值

HINCRBY  key  field  increment 		//为哈希表key中field键的值加上增量increment

# 对象缓存
HMSET  user  {userId}:name  zhuge  {userId}:balance  1888
HMSET  user  1:name  zhuge  1:balance  1888
HMGET  user  1:name  1:balance  
```

**应用场景**

- 电商购物车

1. 以用户id为key

2. 商品id为field

3. 商品数量为value

- 购物车操作

1. 添加商品：hset cart:1001 10088 1

2. 增加数量：hincrby cart:1001 10088 1

3. 商品总数：hlen cart:1001

4. 删除商品：hdel cart:1001 10088

5. 获取购物车所有商品：hgetall cart:1001

#### 列表 List

**常用操作**

```sh
LPUSH  key  value [value ...] 		//将一个或多个值value插入到key列表的表头(最左边)
RPUSH  key  value [value ...]	 	//将一个或多个值value插入到key列表的表尾(最右边)
LPOP  key			//移除并返回key列表的头元素
RPOP  key			//移除并返回key列表的尾元素
LRANGE  key  start  stop		//返回列表key中指定区间内的元素，区间以偏移量start和stop指定

BLPOP  key  [key ...]  timeout	//从key列表表头弹出一个元素，若列表中没有元素，阻塞等待timeout秒,如果timeout=0,一直阻塞等待
BRPOP  key  [key ...]  timeout 	//从key列表表尾弹出一个元素，若列表中没有元素，阻塞等待timeout秒,如果timeout=0,一直阻塞等待
```

**应用场景**

- 常用数据结构

```sh
Stack(栈) = LPUSH + LPOP
Queue(队列）= LPUSH + RPOP
Blocking MQ(阻塞队列）= LPUSH + BRPOP
```

- 微博消息和微信公号消息

诸葛老师关注了MacTalk，备胎说车等大V

1. MacTalk发微博，消息ID为10018：`LPUSH msg:{诸葛老师-ID} 10018`

2. 备胎说车发微博，消息ID为10086：`LPUSH msg:{诸葛老师-ID} 10086`

3. 查看最新微博消息：`LRANGE msg:{诸葛老师-ID} 0 4`

#### 集合 Set

**常用操作**

```sh
SADD  key  member  [member ...]			//往集合key中存入元素，元素存在则忽略，若key不存在则新建
SREM  key  member  [member ...]			//从集合key中删除元素
SMEMBERS  key					//获取集合key中所有元素
SCARD  key					//获取集合key的元素个数
SISMEMBER  key  member			//判断member元素是否存在于集合key中
SRANDMEMBER  key  [count]			//从集合key中选出count个元素，元素不从key中删除
SPOP  key  [count]				//从集合key中选出count个元素，元素从key中删除

# Set运算操作
SINTER  key  [key ...] 				//交集运算
SINTERSTORE  destination  key  [key ..]		//将交集结果存入新集合destination中
SUNION  key  [key ..] 				//并集运算
SUNIONSTORE  destination  key  [key ...]		//将并集结果存入新集合destination中
SDIFF  key  [key ...] 				//差集运算
SDIFFSTORE  destination  key  [key ...]		//将差集结果存入新集合destination中
```

**应用场景**

- 微信抽奖小程序

1. 点击参与抽奖加入集合：`SADD key {userlD}`

2. 查看参与抽奖所有用户：`SMEMBERS key  `

3. 抽取count名中奖者：`SRANDMEMBER key [count] / SPOP key [count]`

- 微信微博点赞，收藏，标签

1) 点赞：`SADD like:{消息ID} {用户ID}`

2) 取消点赞：`SREM like:{消息ID} {用户ID}`

3) 检查用户是否点过赞：`SISMEMBER like:{消息ID} {用户ID}`

4) 获取点赞的用户列表：`SMEMBERS like:{消息ID}`

5) 获取点赞用户数：`SCARD like:{消息ID}`

- 集合操作实现微博微信关注模型

1) 诸葛老师关注的人:`zhugeSet-> {guojia, xushu}`

2) 杨过老师关注的人:` yangguoSet--> {zhuge, baiqi, guojia, xushu}`

3) 郭嘉老师关注的人: `guojiaSet-> {zhuge, yangguo, baiqi, xushu, xunyu)`

4) 我和杨过老师共同关注: `SINTER zhugeSet yangguoSet--> {guojia, xushu}`

5) 我关注的人也关注他(杨过老师): ``SISMEMBER guojiaSet yangguo `、`SISMEMBER xushuSet yangguo`

6) 我可能认识的人: `SDIFF yangguoSet zhugeSet->(zhuge, baiqi}`

- 集合操作实现电商商品筛选

![image-20240110185423121](./imgs/Redis/image-20240110185423121.png)

```sh
SADD  brand:huawei  P40
SADD  brand:xiaomi  mi-10
SADD  brand:iPhone iphone12
SADD os:android  P40  mi-10
SADD cpu:brand:intel  P40  mi-10
SADD ram:8G  P40  mi-10  iphone12

SINTER  os:android  cpu:brand:intel ram:8G # 结果{P40，mi-10}
```

- 集合操作

![image-20240110185216286](./imgs/Redis/image-20240110185216286.png)

```sh
SINTER set1 set2 set3 # { c }
SUNION set1 set2 set3 # { a,b,c,d,e }
SDIFF set1 set2 set3 # { a }
```

#### 有序集合 Zset

**跳表**

![image-20240117120135632](./imgs/Redis/image-20240117120135632.png)

**常用操作**

```sh
ZADD key score member [[score member]…]	//往有序集合key中加入带分值元素
ZREM key member [member …]							//从有序集合key中删除元素
ZSCORE key member 			//返回有序集合key中元素member的分值
ZINCRBY key increment member						//为有序集合key中元素member的分值加上increment 
ZCARD key								//返回有序集合key中元素个数
ZRANGE key start stop [WITHSCORES]			//正序获取有序集合key从start下标到stop下标的元素
ZREVRANGE key start stop [WITHSCORES]		//倒序获取有序集合key从start下标到stop下标的元素
```

**应用场景**

- Zset集合操作

![image-20240110185534051](./imgs/Redis/image-20240110185534051.png)

```sh
ZUNIONSTORE destkey numkeys key [key ...] 	//并集计算
ZINTERSTORE destkey numkeys key [key …] 		//交集计算
```

- Zset集合操作实现排行榜

1. 点击新闻：`ZINCRBY hotNews:20190819 1 守护香港`

2. 展示当日排行前十：`ZREVRANGE hotNews:20190819 0 9 WITHSCORES `

3. 七日搜索榜单计算：`ZUNIONSTORE hotNews:20190813-20190819 7 hotNews:20190813 hotNews:20190814...hotNews:20190819`

4. 展示七日排行前十：`ZREVRANGE hotNews:20190813-20190819 0 9 WITHSCORES`

### **Redis的单线程和高性能**

**Redis是单线程吗？**

Redis 的单线程主要是指 Redis 的网络 IO 和键值对读写是由一个线程来完成的，这也是 Redis 对外提供键值存储服务的主要流程。但 Redis 的其他功能，比如持久化、异步删除、集群数据同步等，其实是由额外的线程执行的。

**Redis 单线程为什么还能这么快？**

因为它所有的数据都在**内存**中，所有的运算都是内存级别的运算，而且单线程避免了多线程的切换性能损耗问题。正因为 Redis 是单线程，所以要小心使用 Redis 指令，对于那些耗时的指令(比如keys)，一定要谨慎使用，一不小心就可能会导致 Redis 卡顿。 

**Redis 单线程如何处理那么多的并发客户端连接？**

Redis的**IO多路复用**：redis利用epoll来实现IO多路复用，将连接信息和事件放到队列中，依次放到文件事件分派器，事件分派器将事件分发给事件处理器。

![img](./imgs/Redis/69701.png)

```sh
# 查看redis支持的最大连接数，在redis.conf文件中可修改，# maxclients 10000
127.0.0.1:6379> CONFIG GET maxclients
    ##1) "maxclients"
    ##2) "10000"
```

#### **keys：全量遍历键**

用来列出所有满足特定正则字符串规则的key，当redis数据量比较大时，性能比较差，要避免使用

![img](./imgs/Redis/80857.png)

#### **scan：渐进式遍历键**

```sh
# cursor整数值(hash桶的索引值)，第二个是 key 的正则模式，第三个是一次遍历的key的数量(参考值，底层遍历的数量不一定)
SCAN cursor [MATCH pattern] [COUNT count]
```

第一次遍历时，cursor 值为 0，然后将返回结果中第一个整数值作为下一次遍历的 cursor。一直遍历到返回的 cursor 值为 0 时结束。

![img](./imgs/Redis/80858.png)

> scan并非完美无瑕， 如果在scan的过程中如果有键的变化（增加、 删除、 修改） ，那么遍历效果可能会碰到如下问题： 新增的键可能没有遍历到， 遍历出了重复的键等情况， 也就是说scan并不能保证完整的遍历出来所有的键， 这些是我们在开发时需要考虑的。

#### **Info：redis服务运行信息** 

分为 9 大块，每个块都有非常多的参数，这 9 个块分别是:

![0](./imgs/Redis/80478.png)

```sh
# Server 服务器运行的环境参数 Clients 客户端相关信息 Memory 服务器运行内存统计数据 Persistence 持久化信息 Stats 通用统计数据 Replication 主从复制相关信息 CPU CPU 使用情况 Cluster 集群信息 KeySpace 键值对统计数量信息
connected_clients:2                  # 正在连接的客户端数量

instantaneous_ops_per_sec:789        # 每秒执行多少次指令

used_memory:929864                   # Redis分配的内存总量(byte)，包含redis进程内部的开销和数据占用的内存
used_memory_human:908.07K            # Redis分配的内存总量(Kb，human会展示出单位)
used_memory_rss_human:2.28M          # 向操作系统申请的内存大小(Mb)（这个值一般是大于used_memory的，因为Redis的内存分配策略会产生内存碎片）
used_memory_peak:929864              # redis的内存消耗峰值(byte)
used_memory_peak_human:908.07K       # redis的内存消耗峰值(KB)

maxmemory:0                         # 配置中设置的最大可使用内存值(byte),默认0,不限制，一般配置为机器物理内存的百分之七八十，需要留一部分给操作系统
maxmemory_human:0B                  # 配置中设置的最大可使用内存值
maxmemory_policy:noeviction         # 当达到maxmemory时的淘汰策略
```

## **Redis持久化**

### **RDB快照（snapshot）**

在默认情况下， Redis 将内存数据库快照保存在名字为 `dump.rdb` 的二进制文件中。

可以对 Redis 进行设置， 让它在“ N 秒内数据集至少有 M 个改动”这一条件被满足时， 自动保存一次数据集。

```sh
# 60 秒内有至少有 1000 个键被改动， 自动保存一次数据集
save 60 1000 # 关闭RDB只需要将所有的save保存策略注释掉即可
```

还可以手动执行命令生成RDB快照，进入redis客户端执行命令**save**或**bgsave**可以生成 `dump.rdb` 文件，每次命令执行都会将所有redis内存快照到一个新的rdb文件里，并覆盖原有rdb快照文件。

**bgsave写时复制机制**

Redis 借助操作系统提供的写时复制技术（Copy-On-Write, COW），在生成快照的同时，依然可以正常处理写命令。简单来说，**bgsave 子进程是由主线程 fork 生成的**，可以共享主线程的所有内存数据。bgsave 子进程运行后，开始读取主线程的内存数据，并把它们写入 RDB 文件。此时，如果主线程对这些数据也都是读操作，那么，主线程和 bgsave 子进程相互不影响。但是，如果主线程要修改一块数据，那么，这块数据就会被复制一份，生成该数据的副本。然后，bgsave 子进程会把这个副本数据写入 RDB 文件，而在这个过程中，主线程仍然可以直接修改原来的数据。

**save与bgsave对比：**

| **命令**              | **save**         | **bgsave**                                     |
| --------------------- | ---------------- | ---------------------------------------------- |
| IO类型                | 同步             | 异步                                           |
| 是否阻塞redis其它命令 | 是               | 否(在生成子进程执行调用fork函数时会有短暂阻塞) |
| 复杂度                | O(n)             | O(n)                                           |
| 优点                  | 不会消耗额外内存 | 不阻塞客户端命令                               |
| 缺点                  | 阻塞客户端命令   | 需要fork子进程，消耗内存                       |

> **配置自动生成rdb文件后台使用的是bgsave方式。**

### **AOF（append-only file）**

快照功能并不是非常耐久（durable）： 如果 Redis 因为某些原因而造成故障停机， 那么服务器将丢失最近写入、且仍未保存到快照中的那些数据。从 1.1 版本开始， Redis 增加了一种完全耐久的持久化方式： AOF 持久化，将**修改的**每一条指令记录进文件appendonly.aof中(先写入os cache，每隔一段时间fsync到磁盘)

比如执行命令**“set zhuge 666”**，aof文件里会记录如下数据

```sh
*3
$3
set
$5
zhuge
$3
666
```

这是一种**resp协议**格式数据，星号后面的数字代表命令有多少个参数，$号后面的数字代表这个参数有几个字符

> 如果执行带过期时间的set命令，aof文件里记录的是并不是执行的原始命令，而是记录key过期的**时间戳**

比如执行**`set tuling 888 ex 1000`**，对应aof文件里记录如下

```sh
*3
$3
set
$6
tuling
$3
888
*3
$9
PEXPIREAT
$6
tuling
$13
1604249786301
```

可以通过修改配置文件来打开 AOF 功能：

```sh
# 打开 AOF 功能
appendonly yes
# 可以配置 Redis 多久才将数据 fsync 到磁盘一次。
appendfsync always		# 每次有新命令追加到 AOF 文件时就执行一次 fsync ，非常慢，也非常安全。
appendfsync everysec	# 每秒 fsync 一次，足够快，并且在故障时只会丢失 1 秒钟的数据。推荐（并且也是默认）的措施为每秒 fsync 一次， 这种 fsync 策略可以兼顾速度和安全性。
appendfsync no				# 从不 fsync ，将数据交给操作系统来处理。更快，也更不安全的选择。
```

> 从现在开始， 每当 Redis 执行一个改变数据集的命令时（比如 [SET](http://redisdoc.com/string/set.html#set)）， 这个命令就会被追加到 AOF 文件的末尾。这样的话， 当 Redis 重新启动时， 程序就可以通过重新执行 AOF 文件中的命令来达到重建数据集的目的。

**AOF重写**

AOF文件里可能有太多没用指令，所以AOF会定期根据**内存的最新数据**生成aof文件

例如，执行了如下几条命令：

```sh
127.0.0.1:6379> incr readcount
(integer) 1
127.0.0.1:6379> incr readcount
(integer) 2
127.0.0.1:6379> incr readcount
(integer) 3
127.0.0.1:6379> incr readcount
(integer) 4
127.0.0.1:6379> incr readcount
(integer) 5
```

重写后AOF文件里变成

```sh
*3
$3
SET
$2
readcount
$1
5
```

如下两个配置可以控制AOF自动重写频率

```sh
# auto-aof-rewrite-min-size 64mb   //aof文件至少要达到64M才会自动重写，文件太小恢复速度本来就很快，重写的意义不大
# auto-aof-rewrite-percentage 100  //aof文件自上一次重写后文件大小增长了100%则再次触发重写
```

当然AOF还可以手动重写，进入redis客户端执行命令**bgrewriteaof**重写AOF

> **AOF重写redis会fork出一个子进程去做(与bgsave命令类似)，不会对redis正常命令处理有太多影响**

###  混合持久化

**RDB 和 AOF对比**

| **命令**   | **RDB**    | **AOF**      |
| ---------- | ---------- | ------------ |
| 启动优先级 | 低         | 高           |
| 体积       | 小         | 大           |
| 恢复速度   | 快         | 慢           |
| 数据安全性 | 容易丢数据 | 根据策略决定 |

生产环境可以都启用，redis启动时如果既有rdb文件又有aof文件则优先选择aof文件恢复数据，因为aof一般来说数据更全一点。

**Redis 4.0 混合持久化**

重启 Redis 时，我们很少使用 RDB来恢复内存状态，因为会丢失大量数据。我们通常使用 AOF 日志重放，但是重放 AOF 日志性能相对 RDB来说要慢很多，这样在 Redis 实例很大的情况下，启动需要花费很长的时间。 Redis 4.0 为了解决这个问题，带来了一个新的持久化选项——混合持久化。

开启混合持久化(**必须先开启aof**)：

```sh
aof-use-rdb-preamble yes
```

> 如果开启了混合持久化，**AOF在重写时**，不再是单纯将内存数据转换为**RESP命令**写入AOF文件，而是将重写**这一刻之前**的内存做RDB快照处理，并且将RDB快照内容和**增量的**AOF修改内存数据的命令存在一起，都写入新的AOF文件，新的文件一开始不叫appendonly.aof，等到重写完新的AOF文件才会进行改名，覆盖原有的AOF文件，完成新旧两个AOF文件的替换。

在 Redis 重启的时候，可以先加载 RDB 的内容，然后再重放增量 AOF 日志就可以完全替代之前的 AOF 全量文件重放，因此重启效率大幅得到提升。

**混合持久化AOF文件结构**

![img](./imgs/Redis/102679.png)

 **Redis数据备份策略**

1. 写 `crontab` 定时调度脚本，每小时都copy一份rdb或aof的备份到一个目录中去，仅仅保留最近48小时的备份
2. 每天都保留一份当日的数据备份到一个目录中去，可以保留最近1个月的备份
3. 每次copy备份的时候，都把太旧的备份给删了
4. 每天晚上将当前机器上的备份复制一份到其他机器上，以防机器损坏

## Redis发布订阅

- Redis 发布订阅(pub/sub)是一种消息通信模式：发送者(pub)发送消息，订阅者(sub)接收消息。
- Redis 客户端可以订阅任意数量的频道。

订阅/发布消息图：

![13](./imgs/Redis/13.png)



### 命令

这些命令被广泛用于构建即时通信应用，比如网络聊天室(chatroom)和实时广播、实时提醒等。

| 命令 | 描述 |
| --- | --- |
| `PSUBSCRIBE pattern [pattern ...]` | 订阅一个或多个符合给定模式的频道。 |
| `PUBSUB subcommand [argument [argument ...]]` | 查看订阅与发布系统状态。 |
| `PUBLISH channel message` | 将信息发送到指定的频道。 |
| `PUNSUBSCRIBE [pattern [pattern ...]]` | 退订所有给定模式的频道。 |
| `SUBSCRIBE channel [channel ...]` | 订阅给定的一个或多个频道的信息。 |
| `UNSUBSCRIBE [channel [channel ...]]` | 退订给定的频道。 |

### 测试

以下实例演示了发布订阅是如何工作的。在我们实例中我们创建了订阅频道名为 redisChat :

```shell
redis 127.0.0.1:6379> SUBSCRIBE redisChat

Reading messages... (press Ctrl-C to quit)
1 ) "subscribe"
2 ) "redisChat"
3 ) (integer) 1
```

现在，我们先重新开启个 redis 客户端，然后在同一个频道 redisChat 发布两次消息，订阅者就能接收到消息。

```shell
redis 127.0.0.1:6379> PUBLISH redisChat "Hello,Redis"
(integer) 1
redis 127.0.0.1:6379> PUBLISH redisChat "Hello，666"
(integer) 1

# 订阅者的客户端会显示如下消息
1 ) "message"
2 ) "redisChat"
3 ) "Hello,Redis"
1 ) "message"
2 ) "redisChat"
3 ) "Hello，666"
```

### 原理

- Redis 是使用 C 实现的，通过分析 Redis 源码里的 pubsub.c 文件，了解发布和订阅机制的底层实现，籍此加深对 Redis 的理解。
- Redis 通过 PUBLISH 、SUBSCRIBE 和 PSUBSCRIBE 等命令实现发布和订阅功能。通过 SUBSCRIBE 命令订阅某频道后，redis-server 里维护了一个字典，字典的键就是一个个 channel，而字典的值则是一个链表，链表中保存了所有订阅这个 channel 的客户端。SUBSCRIBE 命令的关键，就是将客户端添加到给定 channel 的订阅链表中。
- 通过 PUBLISH 命令向订阅者发送消息，redis-server 会使用给定的频道作为键，在它所维护的 channel 字典中查找记录了订阅这个频道的所有客户端的链表，遍历这个链表，将消息发布给所有订阅者。
- Pub/Sub 从字面上理解就是发布（Publish）与订阅（Subscribe），在 Redis 中，你可以设定对某一个 key 值进行消息发布及消息订阅，当一个 key 值上进行了消息发布后，所有订阅它的客户端都会收到相应的消息。这一功能最明显的用法就是用作实时消息系统，比如普通的即时聊天，群聊等功能。

### 使用场景

1. Pub/Sub 构建实时消息系统
2. Redis 的 Pub/Sub 系统可以构建实时的消息系统
3. 比如很多用 Pub/Sub 构建的实时聊天系统的例子。

## **Redis主从架构**

![img](./imgs/Redis/80584.png)

### **Redis主从架构搭建**

```sh
1、复制一份redis.conf文件

2、将相关配置修改为如下值：
port 6380
pidfile /var/run/redis_6380.pid  # 把pid进程号写入pidfile配置的文件
logfile "6380.log"
dir /usr/local/redis-5.0.3/data/6380  # 指定数据存放目录
# 需要注释掉bind
# bind 127.0.0.1（bind绑定的是自己机器网卡的ip，如果有多块网卡可以配多个ip，代表允许客户端通过机器的哪些网卡ip去访问，内网一般可以不配置bind，注释掉即可）

3、配置主从复制
replicaof 192.168.0.60 6379   # 从本机6379的redis实例复制数据，Redis 5.0之前使用slaveof
replica-read-only yes  # 配置从节点只读

4、启动从节点
redis-server redis.conf   # redis.conf文件务必用你复制并修改了之后的redis.conf文件

5、连接从节点
redis-cli -p 6380

6、测试在6379实例上写数据，6380实例是否能及时同步新修改数据

7、可以自己再配置一个6381的从节点
```

### **主从工作原理**

如果为master配置了一个slave，不管这个slave是否是第一次连接上Master，它都会发送一个**PSYNC**命令给master请求复制数据。

master收到**PSYNC**命令后，会在后台进行数据持久化通过bgsave生成最新的rdb快照文件，持久化期间，master会继续接收客户端的请求，它会把这些可能修改数据集的请求缓存在内存中。当持久化进行完毕以后，master会把这份rdb文件数据集发送给slave，slave会把接收到的数据进行持久化生成rdb，然后再加载到内存中。然后，master再将之前缓存在内存中的命令发送给slave。

当master与slave之间的连接由于某些原因而断开时，slave能够自动重连master，如果master收到了多个slave并发连接请求，它只会进行一次持久化，而不是一个连接一次，然后再把这一份持久化的数据发送给多个并发连接的slave。

#### **主从复制(全量复制)**

![img](./imgs/Redis/102424-170541680994917.png)

#### **主从复制(断点续传)**

当master和slave断开重连后，一般都会对整份数据进行复制。但从redis2.8版本开始，redis改用可以支持部分数据复制的命令PSYNC去master同步数据，slave与master能够在网络连接断开重连后只进行部分数据复制(**断点续传**)。

master会在其内存中创建一个复制数据用的缓存队列，缓存最近一段时间的数据，master和它所有的slave都维护了复制的数据下标offset和master的进程id，因此，当网络连接断开后，slave会请求master继续进行未完成的复制，从所记录的数据下标开始。如果master进程id变化了，或者从节点数据下标offset太旧，已经不在master的缓存队列里了，那么将会进行一次全量数据的复制。

**主从复制(部分复制，断点续传)流程图：**

![img](./imgs/Redis/102426.png)

如果有很多从节点，为了缓解**主从复制风暴**(多个从节点同时复制主节点导致主节点压力过大)，可以做如下架构，让部分从节点与从节点(与主节点同步)同步数据

![img](./imgs/Redis/102435.png)

**Jedis连接代码示例**

1、引入相关依赖：

```xml
<dependency>
    <groupId>redis.clients</groupId>
    <artifactId>jedis</artifactId>
    <version>2.9.0</version>
</dependency>
```

2、访问代码：

```java
public class JedisSingleTest {
    public static void main(String[] args) throws IOException {

        JedisPoolConfig jedisPoolConfig = new JedisPoolConfig();
        jedisPoolConfig.setMaxTotal(20);
        jedisPoolConfig.setMaxIdle(10);
        jedisPoolConfig.setMinIdle(5);

        // timeout，这里既是连接超时又是读写超时，从Jedis 2.8开始有区分connectionTimeout和soTimeout的构造函数
        JedisPool jedisPool = new JedisPool(jedisPoolConfig, "192.168.0.60", 6379, 3000, null);

        Jedis jedis = null;
        try {
            //从redis连接池里拿出一个连接执行命令
            jedis = jedisPool.getResource();

            System.out.println(jedis.set("single", "zhuge"));
            System.out.println(jedis.get("single"));

            //管道示例
            //管道的命令执行方式：cat redis.txt | redis-cli -h 127.0.0.1 -a password - p 6379 --pipe
            /*Pipeline pl = jedis.pipelined();
            for (int i = 0; i < 10; i++) {
                pl.incr("pipelineKey");
                pl.set("zhuge" + i, "zhuge");
            }
            List<Object> results = pl.syncAndReturnAll();
            System.out.println(results);*/

            //lua脚本模拟一个商品减库存的原子操作
            //lua脚本命令执行方式：redis-cli --eval /tmp/test.lua , 10
            /*jedis.set("product_count_10016", "15");  //初始化商品10016的库存
            String script = " local count = redis.call('get', KEYS[1]) " +
                            " local a = tonumber(count) " +
                            " local b = tonumber(ARGV[1]) " +
                            " if a >= b then " +
                            "   redis.call('set', KEYS[1], a-b) " +
                            "   return 1 " +
                            " end " +
                            " return 0 ";
            Object obj = jedis.eval(script, Arrays.asList("product_count_10016"), Arrays.asList("10"));
            System.out.println(obj);*/

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            //注意这里不是关闭连接，在JedisPool模式下，Jedis会被归还给资源池。
            if (jedis != null)
                jedis.close();
        }
    }
}
```

### **管道（Pipeline）**

客户端可以一次性发送多个请求而不用等待服务器的响应，待所有命令都发送完后再一次性读取服务的响应，这样可以极大的降低多条命令执行的网络传输开销，**管道**执行多条命令的网络开销实际上只相当于一次命令执行的网络开销。需要注意到是用pipeline方式打包命令发送，redis必须在**处理完所有命令前先缓存所有命令的处理结果**。打包的命令越多，缓存消耗内存也越多。所以并不是打包的命令越多越好。

> pipeline中发送的每个command都会被server立即执行，如果执行失败，将会在此后的响应中得到信息；也就是pipeline并不是表达“所有command都一起成功”的语义，管道中前面命令失败，后面命令不会有影响，继续执行。

**jedis连接示例**

```java
Pipeline pl = jedis.pipelined();
for (int i = 0; i < 10; i++) {
    pl.incr("pipelineKey");
    pl.set("zhuge" + i, "zhuge");
    //模拟管道报错
    // pl.setbit("zhuge", -1, true);
}
List<Object> results = pl.syncAndReturnAll();
System.out.println(results);
```

### **Redis Lua脚本**

Redis在2.6推出了脚本功能，允许开发者使用Lua语言编写脚本传到Redis中执行。使用脚本的好处如下:

1、**减少网络开销**：本来5次网络请求的操作，可以用一个请求完成，原先5次请求的逻辑放在redis服务器上完成。使用脚本，减少了网络往返时延。**这点跟管道类似**。

2、**原子操作**：Redis会将整个脚本作为一个整体执行，中间不会被其他命令插入。**管道不是原子的，不过redis的批量操作命令(类似mset)是原子的。**

3、**替代redis的事务功能**：redis自带的事务功能很鸡肋，而redis的lua脚本几乎实现了常规的事务功能，官方推荐如果要使用redis的事务功能可以用redis lua替代。

从Redis2.6.0版本开始，通过内置的Lua解释器，可以使用EVAL命令对Lua脚本进行求值。EVAL命令的格式如下：

```sh
EVAL script numkeys key [key ...] arg [arg ...]
```

script参数是一段Lua脚本程序，它会被运行在Redis服务器上下文中，这段脚本**不必(也不应该)定义为一个Lua函数**。

numkeys参数用于指定键名参数的个数。

键名参数 key [key ...] 从EVAL的第三个参数开始算起，表示在脚本中所用到的那些Redis键(key)，这些键名参数可以在 Lua中通过全局变量KEYS数组，用1为基址的形式访问( KEYS[1] ， KEYS[2] ，以此类推)。

在命令的最后，那些不是键名参数的附加参数 arg [arg ...] ，可以在Lua中通过全局变量**ARGV**数组访问，访问的形式和KEYS变量类似( ARGV[1] 、 ARGV[2] ，诸如此类)。

例如

```sh
127.0.0.1:6379> eval "return {KEYS[1],KEYS[2],ARGV[1],ARGV[2]}" 2 key1 key2 first second
1) "key1"
2) "key2"
3) "first"
4) "second"
```

其中` "return {KEYS[1],KEYS[2],ARGV[1],ARGV[2]}"` 是被求值的Lua脚本，数字2指定了键名参数的数量， key1和key2是键名参数，分别使用 KEYS[1] 和 KEYS[2] 访问，而最后的 first 和 second 则是附加参数，可以通过 ARGV[1] 和 ARGV[2] 访问它们。

在 Lua 脚本中，可以使用**redis.call()**函数来执行Redis命令

**jedis调用示例**

```java
jedis.set("product_stock_10016", "15");  //初始化商品10016的库存
String script = " local count = redis.call('get', KEYS[1]) " +
                " local a = tonumber(count) " +
                " local b = tonumber(ARGV[1]) " +
                " if a >= b then " +
                "   redis.call('set', KEYS[1], a-b) " +
                "   return 1 " +
                " end " +
                " return 0 ";
Object obj = jedis.eval(script, Arrays.asList("product_stock_10016"), Arrays.asList("10"));
System.out.println(obj);
```

> 注意，不要在Lua脚本中出现死循环和耗时的运算，否则redis会阻塞，将不接受其他的命令， 所以使用时要注意不能出现死循环、耗时的运算。redis是单进程、单线程执行脚本。管道不会阻塞redis。

## **Redis哨兵高可用架构**

![img](./imgs/Redis/80634.png)

> sentinel哨兵是特殊的redis服务，不提供读写服务，主要用来监控redis实例节点。

哨兵架构下client端第一次从哨兵找出redis的主节点，后续就直接访问redis的主节点，不会每次都通过sentinel代理访问redis的主节点，当redis的主节点发生变化，哨兵会第一时间感知到，并且将新的redis主节点通知给client端(这里面redis的client端一般都实现了订阅功能，订阅sentinel发布的节点变动消息)

**Redis哨兵架构搭建**

```sh
1、复制一份sentinel.conf文件
cp sentinel.conf sentinel-26379.conf

2、将相关配置修改为如下值：
port 26379
daemonize yes
pidfile "/var/run/redis-sentinel-26379.pid"
logfile "26379.log"
dir "/usr/local/redis-5.0.3/data"
# sentinel monitor <master-redis-name> <master-redis-ip> <master-redis-port> <quorum>
# quorum是一个数字，指明当有多少个sentinel认为一个master失效时(值一般为：sentinel总数/2 + 1)，master才算真正失效
sentinel monitor mymaster 192.168.0.60 6379 2   # mymaster这个名字随便取，客户端访问时会用到

3、启动sentinel哨兵实例
src/redis-sentinel sentinel-26379.conf

4、查看sentinel的info信息
src/redis-cli -p 26379
127.0.0.1:26379>info
可以看到Sentinel的info里已经识别出了redis的主从

5、可以自己再配置两个sentinel，端口26380和26381，注意上述配置文件里的对应数字都要修改
```

6、sentinel集群都启动完毕后，会将哨兵集群的元数据信息写入所有sentinel的配置文件里去(追加在文件的最下面)，我们查看下如下配置文件`sentinel-26379.conf`，如下所示：

```sh
sentinel known-replica mymaster 192.168.0.60 6380 #代表redis主节点的从节点信息
sentinel known-replica mymaster 192.168.0.60 6381 #代表redis主节点的从节点信息
sentinel known-sentinel mymaster 192.168.0.60 26380 52d0a5d70c1f90475b4fc03b6ce7c3c56935760f  #代表感知到的其它哨兵节点
sentinel known-sentinel mymaster 192.168.0.60 26381 e9f530d3882f8043f76ebb8e1686438ba8bd5ca6  #代表感知到的其它哨兵节点
```

7、当redis主节点如果挂了，哨兵集群会重新选举出新的redis主节点，同时会修改所有sentinel节点配置文件的集群元数据信息，比如6379的redis如果挂了，假设选举出的新主节点是6380，则sentinel文件里的集群元数据信息会变成如下所示：

```sh
sentinel known-replica mymaster 192.168.0.60 6379 #代表主节点的从节点信息
sentinel known-replica mymaster 192.168.0.60 6381 #代表主节点的从节点信息
sentinel known-sentinel mymaster 192.168.0.60 26380 52d0a5d70c1f90475b4fc03b6ce7c3c56935760f  #代表感知到的其它哨兵节点
sentinel known-sentinel mymaster 192.168.0.60 26381 e9f530d3882f8043f76ebb8e1686438ba8bd5ca6  #代表感知到的其它哨兵节点
```

8、同时还会修改sentinel文件里之前配置的mymaster对应的6379端口，改为6380

```sh
sentinel monitor mymaster 192.168.0.60 6380 2
```

9、当6379的redis实例再次启动时，哨兵集群根据集群元数据信息就可以将6379端口的redis节点作为从节点加入集群

**jedis连接示例**

```java
public class JedisSentinelTest {
    public static void main(String[] args) throws IOException {

        JedisPoolConfig config = new JedisPoolConfig();
        config.setMaxTotal(20);
        config.setMaxIdle(10);
        config.setMinIdle(5);

        String masterName = "mymaster";
        Set<String> sentinels = new HashSet<String>();
        sentinels.add(new HostAndPort("192.168.0.60",26379).toString());
        sentinels.add(new HostAndPort("192.168.0.60",26380).toString());
        sentinels.add(new HostAndPort("192.168.0.60",26381).toString());
        //JedisSentinelPool其实本质跟JedisPool类似，都是与redis主节点建立的连接池
        //JedisSentinelPool并不是说与sentinel建立的连接池，而是通过sentinel发现redis主节点并与其建立连接
        JedisSentinelPool jedisSentinelPool = new JedisSentinelPool(masterName, sentinels, config, 3000, null);
        Jedis jedis = null;
        try {
            jedis = jedisSentinelPool.getResource();
            System.out.println(jedis.set("sentinel", "zhuge"));
            System.out.println(jedis.get("sentinel"));
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            //注意这里不是关闭连接，在JedisPool模式下，Jedis会被归还给资源池。
            if (jedis != null)
                jedis.close();
        }
    }
}
```

哨兵的Spring Boot整合Redis连接代码见示例项目：`redis-sentinel-cluster`

1、引入相关依赖：

```sh
<dependency>
   <groupId>org.springframework.boot</groupId>
   <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>

<dependency>
   <groupId>org.apache.commons</groupId>
   <artifactId>commons-pool2</artifactId>
</dependency>
```

2、springboot项目核心配置：

```yaml
server:
  port: 8080

spring:
  redis:
    database: 0
    timeout: 3000
    sentinel:    #哨兵模式
      master: mymaster #主服务器所在集群名称
     nodes: 192.168.0.60:26379,192.168.0.60:26380,192.168.0.60:26381
   lettuce:
      pool:
        max-idle: 50
        min-idle: 10
        max-active: 100
        max-wait: 1000
```

3、访问代码：

```java
@RestController
public class IndexController {

    private static final Logger logger = LoggerFactory.getLogger(IndexController.class);

    @Autowired
    private StringRedisTemplate stringRedisTemplate;

    /**
     * 测试节点挂了哨兵重新选举新的master节点，客户端是否能动态感知到
     * 新的master选举出来后，哨兵会把消息发布出去，客户端实际上是实现了一个消息监听机制，
     * 当哨兵把新master的消息发布出去，客户端会立马感知到新master的信息，从而动态切换访问的masterip
     *
     * @throws InterruptedException
     */
    @RequestMapping("/test_sentinel")
    public void testSentinel() throws InterruptedException {
        int i = 1;
        while (true){
            try {
                stringRedisTemplate.opsForValue().set("zhuge"+i, i+"");
                System.out.println("设置key："+ "zhuge" + i);
                i++;
                Thread.sleep(1000);
            }catch (Exception e){
                logger.error("错误：", e);
            }
        }
    }
}
```

**StringRedisTemplate与RedisTemplate详解**

spring 封装了 RedisTemplate 对象来进行对redis的各种操作，它支持所有的 redis 原生的 api。在RedisTemplate中提供了几个常用的接口方法的使用，分别是:

```java
// StringRedisTemplate继承自RedisTemplate，也一样拥有上面这些操作。
redisTemplate.opsForValue();//操作字符串
redisTemplate.opsForHash();//操作hash
redisTemplate.opsForList();//操作list
redisTemplate.opsForSet();//操作set
redisTemplate.opsForZSet();//操作有序set
```

## **RedisTemplate方法列表**

| **String类型结构**                                         |                                                             |
| ---------------------------------------------------------- | ----------------------------------------------------------- |
| Redis                                                      | RedisTemplate rt                                            |
| set key value                                              | rt.opsForValue().set("key","value")                         |
| get key                                                    | rt.opsForValue().get("key")                                 |
| del key                                                    | rt.delete("key")                                            |
| strlen key                                                 | rt.opsForValue().size("key")                                |
| getset key value                                           | rt.opsForValue().getAndSet("key","value")                   |
| getrange key start end                                     | rt.opsForValue().get("key",start,end)                       |
| append key value                                           | rt.opsForValue().append("key","value"                       |
|                                                            |                                                             |
| **Hash结构**                                               |                                                             |
| hmset key field1 value1 field2 value2...                   | rt.opsForHash().putAll("key",map) //map是一个集合对象       |
| hset key field value                                       | rt.opsForHash().put("key","field","value")                  |
| hexists key field                                          | rt.opsForHash().hasKey("key","field")                       |
| hgetall key                                                | rt.opsForHash().entries("key") //返回Map对象                |
| hvals key                                                  | rt.opsForHash().values("key") //返回List对象                |
| hkeys key                                                  | rt.opsForHash().keys("key") //返回List对象                  |
| hmget key field1 field2...                                 | rt.opsForHash().multiGet("key",keyList)                     |
| hsetnx key field value                                     | rt.opsForHash().putIfAbsent("key","field","value"           |
| hdel key field1 field2                                     | rt.opsForHash().delete("key","field1","field2")             |
| hget key field                                             | rt.opsForHash().get("key","field")                          |
|                                                            |                                                             |
| **List结构**                                               |                                                             |
| lpush list node1 node2 node3...                            | rt.opsForList().leftPush("list","node")                     |
| rt.opsForList().leftPushAll("list",list) //list是集合对象  |                                                             |
| rpush list node1 node2 node3...                            | rt.opsForList().rightPush("list","node")                    |
| rt.opsForList().rightPushAll("list",list) //list是集合对象 |                                                             |
| lindex key index                                           | rt.opsForList().index("list", index)                        |
| llen key                                                   | rt.opsForList().size("key")                                 |
| lpop key                                                   | rt.opsForList().leftPop("key")                              |
| rpop key                                                   | rt.opsForList().rightPop("key")                             |
| lpushx list node                                           | rt.opsForList().leftPushIfPresent("list","node")            |
| rpushx list node                                           | rt.opsForList().rightPushIfPresent("list","node")           |
| lrange list start end                                      | rt.opsForList().range("list",start,end)                     |
| lrem list count value                                      | rt.opsForList().remove("list",count,"value")                |
| lset key index value                                       | rt.opsForList().set("list",index,"value")                   |
|                                                            |                                                             |
| **Set结构**                                                |                                                             |
| sadd key member1 member2...                                | rt.boundSetOps("key").add("member1","member2",...)          |
| rt.opsForSet().add("key", set) //set是一个集合对象         |                                                             |
| scard key                                                  | rt.opsForSet().size("key")                                  |
| sidff key1 key2                                            | rt.opsForSet().difference("key1","key2") //返回一个集合对象 |
| sinter key1 key2                                           | rt.opsForSet().intersect("key1","key2")//同上               |
| sunion key1 key2                                           | rt.opsForSet().union("key1","key2")//同上                   |
| sdiffstore des key1 key2                                   | rt.opsForSet().differenceAndStore("key1","key2","des")      |
| sinter des key1 key2                                       | rt.opsForSet().intersectAndStore("key1","key2","des")       |
| sunionstore des key1 key2                                  | rt.opsForSet().unionAndStore("key1","key2","des")           |
| sismember key member                                       | rt.opsForSet().isMember("key","member")                     |
| smembers key                                               | rt.opsForSet().members("key")                               |
| spop key                                                   | rt.opsForSet().pop("key")                                   |
| srandmember key count                                      | rt.opsForSet().randomMember("key",count)                    |
| srem key member1 member2...                                | rt.opsForSet().remove("key","member1","member2",...)        |

## Redis高可用集群

### **Redis集群方案比较**

- **哨兵模式**

![0](./imgs/Redis/101609.png)

在redis3.0以前的版本要实现集群一般是借助哨兵sentinel工具来监控master节点的状态，如果master节点异常，则会做主从切换，将某一台slave作为master，哨兵的配置略微复杂，并且性能和高可用性等各方面表现一般，特别是在主从切换的瞬间存在访问瞬断的情况，而且哨兵模式只有一个主节点对外提供服务，没法支持很高的并发，且单个主节点内存也不宜设置得过大，否则会导致持久化文件过大，影响数据恢复或主从同步的效率

- **高可用集群模式**   

![0](./imgs/Redis/101610.png)

redis集群是一个由多个主从节点群组成的分布式服务器群，它具有复制、高可用和分片特性。redis集群不需要sentinel哨兵也能完成节点移除和故障转移的功能。需要将每个节点设置成集群模式，这种集群模式没有中心节点，可水平扩展。

> 据官方文档称可以线性扩展到上万个节点(**官方推荐不超过1000个节点**)。redis集群的性能和高可用性均优于之前版本的哨兵模式，且集群配置非常简单。

### **Redis高可用集群搭建**

- **redis集群搭建** 

redis集群需要至少三个master节点，这里搭建三个master节点，并且给每个master再搭建一个slave节点，总共6个redis节点，这里用三台机器部署6个redis实例，每台机器一主一从，搭建集群的步骤如下：

```sh
第一步：在第一台机器的/usr/local下创建文件夹redis-cluster，然后在其下面分别创建2个文件夾如下
（1）mkdir -p /usr/local/redis-cluster
（2）mkdir 8001 8004

第一步：把之前的redis.conf配置文件copy到8001下，修改如下内容：
（1）daemonize yes
（2）port 8001（分别对每个机器的端口号进行设置）
（3）pidfile /var/run/redis_8001.pid  # 把pid进程号写入pidfile配置的文件
（4）dir /usr/local/redis-cluster/8001/（指定数据文件存放位置，必须要指定不同的目录位置，不然会丢失数据）
（5）cluster-enabled yes（启动集群模式）
（6）cluster-config-file nodes-8001.conf（集群节点信息文件，这里800x最好和port对应上）
（7）cluster-node-timeout 10000
 (8)# bind 127.0.0.1（bind绑定的是自己机器网卡的ip，如果有多块网卡可以配多个ip，代表允许客户端通过机器的哪些网卡ip去访问，内网一般可以不配置bind，注释掉即可）
 (9)protected-mode  no   （关闭保护模式）
 (10)appendonly yes
如果要设置密码需要增加如下配置：
 (11)requirepass zhuge     (设置redis访问密码)
 (12)masterauth zhuge      (设置集群节点间访问密码，跟上面一致)

第三步：把修改后的配置文件，copy到8004，修改第2、3、4、6项里的端口号，可以用批量替换：
:%s/源字符串/目的字符串/g 

第四步：另外两台机器也需要做上面几步操作，第二台机器用8002和8005，第三台机器用8003和8006

第五步：分别启动6个redis实例，然后检查是否启动成功
（1）/usr/local/redis-5.0.3/src/redis-server /usr/local/redis-cluster/800*/redis.conf
（2）ps -ef | grep redis 查看是否启动成功
    
第六步：用redis-cli创建整个redis集群(redis5以前的版本集群是依靠ruby脚本redis-trib.rb实现)
# 下面命令里的1代表为每个创建的主服务器节点创建一个从服务器节点
# 执行这条命令需要确认三台机器之间的redis实例要能相互访问，可以先简单把所有机器防火墙关掉，如果不关闭防火墙则需要打开redis服务端口和集群节点gossip通信端口16379(默认是在redis端口号上加1W)
# 关闭防火墙
# systemctl stop firewalld # 临时关闭防火墙
# systemctl disable firewalld # 禁止开机启动
# 注意：下面这条创建集群的命令大家不要直接复制，里面的空格编码可能有问题导致创建集群不成功
（1）/usr/local/redis-5.0.3/src/redis-cli -a zhuge --cluster create --cluster-replicas 1 192.168.0.61:8001 192.168.0.62:8002 192.168.0.63:8003 192.168.0.61:8004 192.168.0.62:8005 192.168.0.63:8006 

第七步：验证集群：
（1）连接任意一个客户端即可：./redis-cli -c -h -p (-a访问服务端密码，-c表示集群模式，指定ip地址和端口号）
    如：/usr/local/redis-5.0.3/src/redis-cli -a zhuge -c -h 192.168.0.61 -p 800*
（2）进行验证： cluster info（查看集群信息）、cluster nodes（查看节点列表）
（3）进行数据操作验证
（4）关闭集群则需要逐个进行关闭，使用命令：
/usr/local/redis-5.0.3/src/redis-cli -a zhuge -c -h 192.168.0.60 -p 800* shutdown
```

**jedis操作redis集群**

1、借助redis的java客户端jedis可以操作以上集群，引用jedis版本的maven坐标如下：

```sh
<dependency>
    <groupId>redis.clients</groupId>
    <artifactId>jedis</artifactId>
    <version>2.9.0</version>
</dependency>
```

2、Java编写访问redis集群的代码非常简单，如下所示：

```java
public class JedisClusterTest {
    public static void main(String[] args) throws IOException {

        JedisPoolConfig config = new JedisPoolConfig();
        config.setMaxTotal(20);
        config.setMaxIdle(10);
        config.setMinIdle(5);

        Set<HostAndPort> jedisClusterNode = new HashSet<HostAndPort>();
        jedisClusterNode.add(new HostAndPort("192.168.0.61", 8001));
        jedisClusterNode.add(new HostAndPort("192.168.0.62", 8002));
        jedisClusterNode.add(new HostAndPort("192.168.0.63", 8003));
        jedisClusterNode.add(new HostAndPort("192.168.0.61", 8004));
        jedisClusterNode.add(new HostAndPort("192.168.0.62", 8005));
        jedisClusterNode.add(new HostAndPort("192.168.0.63", 8006));

        JedisCluster jedisCluster = null;
        try {
            //connectionTimeout：指的是连接一个url的连接等待时间
            //soTimeout：指的是连接上一个url，获取response的返回等待时间
            jedisCluster = new JedisCluster(jedisClusterNode, 6000, 5000, 10, "zhuge", config);
            System.out.println(jedisCluster.set("cluster", "zhuge"));
            System.out.println(jedisCluster.get("cluster"));
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (jedisCluster != null)
                jedisCluster.close();
        }
    }
}

// 运行效果如下：
// OK
// zhuge
```

集群的Spring Boot整合Redis连接代码见示例项目：`redis-sentinel-cluster`

1、引入相关依赖：

```sh
<dependency>
   <groupId>org.springframework.boot</groupId>
   <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>

<dependency>
   <groupId>org.apache.commons</groupId>
   <artifactId>commons-pool2</artifactId>
</dependency>
```

2、springboot项目核心配置：

```yaml
server:
  port: 8080

spring:
  redis:
    database: 0
    timeout: 3000
    password: zhuge
    cluster:
      nodes: 192.168.0.61:8001,192.168.0.62:8002,192.168.0.63:8003,192.168.0.61:8004,192.168.0.62:8005,192.168.0.63:8006
   lettuce:
      pool:
        max-idle: 50
        min-idle: 10
        max-active: 100
        max-wait: 1000
```

2、访问代码：

```java
@RestController
public class IndexController {

    private static final Logger logger = LoggerFactory.getLogger(IndexController.class);

    @Autowired
    private StringRedisTemplate stringRedisTemplate;

    @RequestMapping("/test_cluster")
    public void testCluster() throws InterruptedException {
       stringRedisTemplate.opsForValue().set("zhuge", "666");
       System.out.println(stringRedisTemplate.opsForValue().get("zhuge"));
    }
}
```

### **Redis集群原理分析**

Redis Cluster 将所有数据划分为 16384 个 slots(槽位)，每个节点负责其中一部分槽位。槽位的信息存储于每个节点中。

当 Redis Cluster 的客户端来连接集群时，它也会得到一份集群的槽位配置信息并将其缓存在客户端本地。这样当客户端要查找某个 key 时，可以直接定位到目标节点。同时因为槽位的信息可能会存在客户端与服务器不一致的情况，还需要纠正机制来实现槽位信息的校验调整。

#### 槽位分配

**槽位定位算法**

Cluster 默认会对 key 值使用 `crc16` 算法进行 hash 得到一个整数值，然后用这个整数值对 16384 进行取模来得到具体槽位。

```sh
HASH_SLOT = CRC16(key) mod 16384
```

**跳转重定位**

当客户端向一个错误的节点发出了指令，该节点会发现指令的 key 所在的槽位并不归自己管理，这时它会向客户端发送一个特殊的跳转指令携带目标操作的节点地址，告诉客户端去连这个节点去获取数据。客户端收到指令后除了跳转到正确的节点上去操作，还会同步更新纠正本地的槽位映射表缓存，后续所有 key 将使用新的槽位映射表。

![0](./imgs/Redis/101608.png)

#### **节点间通信机制**

redis cluster节点间采取gossip协议进行通信：维护集群的元数据(集群节点信息，主从角色，节点数量，各节点共享的数据等)有两种方式：集中式和gossip 

**集中式：** 优点在于元数据的更新和读取，时效性非常好，一旦元数据出现变更立即就会更新到集中式的存储中，其他节点读取的时候立即就可以立即感知到；不足在于所有的元数据的更新压力全部集中在一个地方，可能导致元数据的存储压力。 很多中间件都会借助zookeeper集中式存储元数据。

**gossip：** 

![0](./imgs/Redis/101611.png)

gossip协议包含多种消息，包括ping，pong，meet，fail等等。 

**meet：**某个节点发送meet给新加入的节点，让新节点加入集群中，然后新节点就会开始与其他节点进行通信；

**ping：**每个节点都会频繁给其他节点发送ping，其中包含自己的状态还有自己维护的集群元数据，互相通过ping交换元数据(类似自己感知到的集群节点增加和移除，hash slot信息等)； 

**pong：**对ping和meet消息的返回，包含自己的状态和其他信息，也可以用于信息广播和更新； 

**fail：**某个节点判断另一个节点fail之后，就发送fail给其他节点，通知其他节点，指定的节点宕机了。

gossip协议的优点在于元数据的更新比较分散，不是集中在一个地方，更新请求会陆陆续续，打到所有节点上去更新，有一定的延时，降低了压力；缺点在于元数据更新有延时可能导致集群的一些操作会有一些滞后。

**gossip通信的10000端口** 

每个节点都有一个专门用于节点间gossip通信的端口，就是自己提供服务的端口号+10000，比如7001，那么用于节点间通信的就是17001端口。 每个节点每隔一段时间都会往另外几个节点发送ping消息，同时其他几点接收到ping消息之后返回pong消息。

### **Redis集群选举原理**

**网络抖动**

真实世界的机房网络往往并不是风平浪静的，它们经常会发生各种各样的小问题。比如网络抖动就是非常常见的一种现象，突然之间部分连接变得不可访问，然后很快又恢复正常。

为解决这种问题，Redis Cluster 提供了一种选项`cluster-node-timeout`，表示当某个节点持续 timeout 的时间失联时，才可以认定该节点出现故障，需要进行主从切换。如果没有这个选项，网络抖动会导致主从频繁切换 (数据的重新复制)。

**选举原理**

当slave发现自己的master变为`FAIL`状态时，便尝试进行Failover，以期成为新的master。由于挂掉的master可能会有多个slave，从而存在多个slave竞争成为master节点的过程， 其过程如下：

1. slave发现自己的master变为FAIL

2. 将自己记录的集群currentEpoch加1，并广播FAILOVER_AUTH_REQUEST 信息

3. 其他节点收到该信息，只有master响应，判断请求者的合法性，并发送FAILOVER_AUTH_ACK，对每一个epoch只发送一次ack

4. 尝试failover的slave收集master返回的FAILOVER_AUTH_ACK

5. slave收到超过半数master的ack后变成新Master(这里解释了集群为什么至少需要三个主节点，如果只有两个，当其中一个挂了，只剩一个主节点是不能选举成功的)

6. slave广播pong消息通知其他集群节点。

从节点并不是在主节点一进入 `FAIL` 状态就马上尝试发起选举，而是有一定延迟，一定的延迟确保我们等待`FAIL`状态在集群中传播，slave如果立即尝试选举，其它masters或许尚未意识到FAIL状态，可能会拒绝投票

- 延迟计算公式：`DELAY = 500ms + random(0 ~ 500ms) + SLAVE_RANK * 1000ms`

- SLAVE_RANK表示此slave已经从master复制数据的总量的rank。Rank越小代表已复制的数据越新。这种方式下，持有最新数据的slave将会首先发起选举（理论上）。

**集群脑裂数据丢失问题**

redis集群没有过半机制会有脑裂问题，网络分区导致脑裂后多个主节点对外提供写服务，一旦网络分区恢复，会将其中一个主节点变为从节点，这时会有大量数据丢失。

规避方法可以在redis配置里加上参数(这种方法不可能百分百避免数据丢失，参考集群leader选举机制)：

```sh
min-slaves-to-write 1  // 写数据成功最少同步的slave数量，这个数量可以模仿大于半数机制配置，比如集群总共三个节点可以配置1，加上leader就是2，超过了半数，该参数在redis最新版本里名字已经换成了min-replicas-to-write
```

> 这个配置在一定程度上会影响集群的可用性，比如slave要是少于1个，这个集群就算leader正常也不能提供服务了，需要具体场景权衡选择。

**集群是否完整才能对外提供服务**

当redis.conf的配置 `cluster-require-full-coverage` 为no时，表示当负责一个插槽的主库下线且没有相应的从库进行故障恢复时，集群仍然可用，如果为yes则集群不可用。

**Redis集群为什么至少需要三个master节点，并且推荐节点数为奇数？**

因为新master的选举需要大于半数的集群master节点同意才能选举成功，如果只有两个master节点，当其中一个挂了，是达不到选举新master的条件的。

奇数个master节点可以在满足选举该条件的基础上节省一个节点，比如三个master节点和四个master节点的集群相比，大家如果都挂了一个master节点都能选举新master节点，如果都挂了两个master节点都没法选举新master节点了，所以奇数的master节点更多的是**从节省机器资源角度出发**说的。

**Redis集群对批量操作命令的支持**

对于类似mset，mget这样的多个key的原生批量操作命令，redis集群只支持所有key落在同一slot的情况，如果有多个key一定要用mset命令在redis集群上操作，则可以在key的前面加上{XX}，这样参数数据分片hash计算的只会是大括号里的值，这样能确保不同的key能落到同一slot里去，示例如下：

```sh
mset {user1}:1:name zhuge {user1}:1:age 18
```

假设name和age计算的hash slot值不一样，但是这条命令在集群下执行，redis只会用大括号里的 user1 做hash slot计算，所以算出来的slot值肯定相同，最后都能落在同一slot。

**哨兵leader选举流程**

当一个master服务器被某sentinel视为下线状态后，该sentinel会与其他sentinel协商选出sentinel的leader进行故障转移工作。每个发现master服务器进入下线的sentinel都可以要求其他sentinel选自己为sentinel的leader，选举是先到先得。同时每个sentinel每次选举都会自增配置纪元(选举周期)，每个纪元中只会选择一个sentinel的leader。如果所有**超过一半**的sentinel选举某sentinel作为leader。之后该sentinel进行故障转移操作，从存活的slave中选举出新的master，这个选举过程跟集群的master选举很类似。

哨兵集群只有一个哨兵节点，redis的主从也能正常运行以及选举master，如果master挂了，那唯一的那个哨兵节点就是哨兵leader了，可以正常选举新master。

不过为了高可用一般都推荐至少部署三个哨兵节点。为什么推荐奇数个哨兵节点原理跟集群奇数个master节点类似。

### 高可用集群水平扩展

Redis3.0以后的版本虽然有了集群功能，提供了比之前版本的哨兵模式更高的性能与可用性，但是集群的水平扩展却比较麻烦，今天就来带大家看看redis高可用集群如何做水平扩展，原始集群(见下图)由6个节点组成，6个节点分布在三台机器上，采用三主三从的模式

![0](./imgs/Redis/55284.png)

**1、启动集群**

```sh
# 启动整个集群
/usr/local/redis-5.0.3/src/redis-server /usr/local/redis-cluster/8001/redis.conf
/usr/local/redis-5.0.3/src/redis-server /usr/local/redis-cluster/8002/redis.conf
/usr/local/redis-5.0.3/src/redis-server /usr/local/redis-cluster/8003/redis.conf
/usr/local/redis-5.0.3/src/redis-server /usr/local/redis-cluster/8004/redis.conf
/usr/local/redis-5.0.3/src/redis-server /usr/local/redis-cluster/8005/redis.conf
/usr/local/redis-5.0.3/src/redis-server /usr/local/redis-cluster/8006/redis.conf

# 客户端连接8001端口的redis实例
/usr/local/redis-5.0.3/src/redis-cli -a zhuge -c -h 192.168.0.61 -p 8001

# 查看集群状态
192.168.0.61:8001> cluster nodes
```

![0](./imgs/Redis/55272.png)

从上图可以看出，整个集群运行正常，三个master节点和三个slave节点，8001端口的实例节点存储0-5460这些hash槽，8002端口的实例节点存储5461-10922这些hash槽，8003端口的实例节点存储10923-16383这些hash槽，这三个master节点存储的所有hash槽组成redis集群的存储槽位，slave点是每个主节点的备份从节点，不显示存储槽位  

**2、集群操作**

我们在原始集群基础上再增加一主(8007)一从(8008)，增加节点后的集群参见下图，新增节点用虚线框表示

![0](./imgs/Redis/55313.png)

- **增加redis实例**

在`/usr/local/redis-cluster`下创建8007和8008文件夹，并拷贝8001文件夹下的redis.conf文件到8007和8008这两个文件夹下

```sh
mkdir 8007 8008
cd 8001
cp redis.conf /usr/local/redis-cluster/8007/
cp redis.conf /usr/local/redis-cluster/8008/

# 修改8007文件夹下的redis.conf配置文件
vim /usr/local/redis-cluster/8007/redis.conf
# 修改如下内容：
port:8007
dir /usr/local/redis-cluster/8007/
cluster-config-file nodes-8007.conf

# 修改8008文件夹下的redis.conf配置文件
vim /usr/local/redis-cluster/8008/redis.conf
修改内容如下：
port:8008
dir /usr/local/redis-cluster/8008/
cluster-config-file nodes-8008.conf

# 启动8007和8008俩个服务并查看服务状态
/usr/local/redis-5.0.3/src/redis-server /usr/local/redis-cluster/8007/redis.conf
/usr/local/redis-5.0.3/src/redis-server /usr/local/redis-cluster/8008/redis.conf
ps -el | grep redis
```

- **查看redis集群的命令帮助**

  ```sh
  cd /usr/local/redis-5.0.3
  src/redis-cli --cluster help
  # create：创建一个集群环境host1:port1 ... hostN:portN
  # call：可以执行redis命令
  # add-node：将一个节点添加到集群里，第一个参数为新节点的ip:port，第二个参数为集群中任意一个已经存在的节点的ip:port 
  # del-node：移除一个节点
  # reshard：重新分片
  # check：检查集群状态 
  ```

![0](./imgs/Redis/70145.png)

- **配置8007为集群主节点**

使用add-node命令新增一个主节点8007(master)，前面的ip:port为新增节点，后面的ip:port为已知存在节点，看到日志最后有`"[OK] New node added correctly"`提示代表新节点加入成功

```sh
/usr/local/redis-5.0.3/src/redis-cli -a zhuge --cluster add-node 192.168.0.61:8007 192.168.0.61:8001
# 查看集群状态
/usr/local/redis-5.0.3/src/redis-cli -a zhuge -c -h 192.168.0.61 -p 8001
192.168.0.61:8001> cluster nodes
```

![0](./imgs/Redis/81628.png)

> 当添加节点成功以后，新增的节点不会有任何数据，因为它还没有分配任何的slot(hash槽)，我们需要为新节点手工分配hash槽

使用redis-cli命令为8007分配hash槽，找到集群中的任意一个主节点，对其进行重新分片工作。

 ```sh
 /usr/local/redis-5.0.3/src/redis-cli -a zhuge --cluster reshard 192.168.0.61:8001
 
 # 输出如下：
 ... ...
 How many slots do you want to move (from 1 to 16384)? 600
 (ps:需要多少个槽移动到新的节点上，自己设置，比如600个hash槽)
 What is the receiving node ID? 2728a594a0498e98e4b83a537e19f9a0a3790f38
 (ps:把这600个hash槽移动到哪个节点上去，需要指定节点id)
 Please enter all the source node IDs.
   Type 'all' to use all the nodes as source nodes for the hash slots.
   Type 'done' once you entered all the source nodes IDs.
 Source node 1:all
 (ps:输入all为从所有主节点(8001,8002,8003)中分别抽取相应的槽数指定到新节点中，抽取的总槽数为600个)
  ... ...
 Do you want to proceed with the proposed reshard plan (yes/no)? yes
 (ps:输入yes确认开始执行分片任务)
 ... ...
 # 查看下最新的集群状态
 /usr/local/redis-5.0.3/src/redis-cli -a zhuge -c -h 192.168.0.61 -p 8001
 192.168.0.61:8001> cluster nodes
 ```

![0](./imgs/Redis/55436.png)

如上图所示，现在我们的8007已经有hash槽了，也就是说可以在8007上进行读写数据啦！到此为止我们的8007已经加入到集群中，并且是主节点(Master) 

- **配置8008为8007的从节点**

添加从节点8008到集群中去并查看集群状态

![0](./imgs/Redis/55446.png)

如图所示，还是一个master节点，没有被分配任何的hash槽。

我们需要执行replicate命令来指定当前节点(从节点)的主节点id为哪个,首先需要连接新加的8008节点的客户端，然后使用集群命令进行操作，把当前的8008(slave)节点指定到一个主节点下(这里使用之前创建的8007主节点)

```sh
/usr/local/redis-5.0.3/src/redis-cli -a zhuge -c -h 192.168.0.61 -p 8008
192.168.0.61:8008> cluster replicate 2728a594a0498e98e4b83a537e19f9a0a3790f38  # 后面这串id为8007的节点id
# 查看集群状态，8008节点已成功添加为8007节点的从节点
```

![0](./imgs/Redis/81647.png)

-  **删除8008从节点**

用del-node删除从节点8008，指定删除节点ip和端口，以及节点id(红色为8008节点id)

```sh
/usr/local/redis-5.0.3/src/redis-cli -a zhuge --cluster del-node 192.168.0.61:8008 a1cfe35722d151cf70585cee21275565393c0956
```

再次查看集群状态，如下图所示，8008这个slave节点已经移除，并且该节点的redis服务也已被停止

![0](./imgs/Redis/81657.png)

- **删除8007主节点**

最后，我们尝试删除之前加入的主节点8007，这个步骤相对比较麻烦一些，因为主节点的里面是有分配了hash槽的，所以我们这里必须先把8007里的hash槽放入到其他的可用主节点中去，然后再进行移除节点操作，不然会出现数据丢失问题(目前只能把master的数据迁移到一个节点上，暂时做不了平均分配功能)，执行命令如下：

```sh
/usr/local/redis-5.0.3/src/redis-cli -a zhuge --cluster reshard 192.168.0.61:8007
# 输出如下：
... ...
How many slots do you want to move (from 1 to 16384)? 600
What is the receiving node ID? dfca1388f124dec92f394a7cc85cf98cfa02f86f
(ps:这里是需要把数据移动到哪？8001的主节点id)
Please enter all the source node IDs.
  Type 'all' to use all the nodes as source nodes for the hash slots.
  Type 'done' once you entered all the source nodes IDs.
Source node 1:2728a594a0498e98e4b83a537e19f9a0a3790f38
(ps:这里是需要数据源，也就是我们的8007节点id)
Source node 2:done
(ps:这里直接输入done 开始生成迁移计划)
 ... ...
Do you want to proceed with the proposed reshard plan (yes/no)? Yes
(ps:这里输入yes开始迁移)
```

至此，我们已经成功的把8007主节点的数据迁移到8001上去了，我们可以看一下现在的集群状态如下图，你会发现8007下面已经没有任何hash槽了，证明迁移成功！

![0](./imgs/Redis/81668.png)

最后我们直接使用del-node命令删除8007主节点即可

```sh
/usr/local/redis-5.0.3/src/redis-cli -a zhuge --cluster del-node 192.168.0.61:8007 2728a594a0498e98e4b83a537e19f9a0a3790f38
```

查看集群状态，一切还原为最初始状态啦！大功告成！

![0](./imgs/Redis/81676.png)

## 缓存设计与性能优化

### **多级缓存架构**

![0](./imgs/Redis/80946.png)

### **缓存问题**

#### **缓存穿透**

缓存穿透是指查询一个根本不存在的数据， 缓存层和存储层都不会命中， 通常出于容错的考虑， 如果从存储层查不到数据则不写入缓存层。

缓存穿透将导致不存在的数据每次请求都要到存储层去查询， 失去了缓存保护后端存储的意义。

造成缓存穿透的基本原因有两个：

1. 自身业务代码或者数据出现问题。

2. 一些恶意攻击、 爬虫等造成大量空命中。 

缓存穿透问题解决方案：

**1. 缓存空对象**

```java
String get(String key) {
    // 从缓存中获取数据
    String cacheValue = cache.get(key);
    // 缓存为空
    if (StringUtils.isBlank(cacheValue)) {
        // 从存储中获取
        String storageValue = storage.get(key);
        cache.set(key, storageValue);
        // 如果存储数据为空， 需要设置一个过期时间(300秒)
        if (storageValue == null) {
            cache.expire(key, 60 * 5);
        }
        return storageValue;
    } else {
        // 缓存非空
        return cacheValue;
    }
}
```

**2. 布隆过滤器**

对于恶意攻击，向服务器请求大量不存在的数据造成的缓存穿透，还可以用布隆过滤器先做一次过滤，对于不存在的数据布隆过滤器一般都能够过滤掉，不让请求再往后端发送。当布隆过滤器说**某个值存在时，这个值可能不存在；当它说不存在时，那就肯定不存在。**

![0](./imgs/Redis/81509.png)

布隆过滤器就是**一个大型的位数组和几个不一样的无偏 hash 函数**。所谓无偏就是能够把元素的 hash 值算得比较均匀。

向布隆过滤器中添加 key 时，会使用多个 hash 函数对 key 进行 hash 算得一个整数索引值然后对位数组长度进行取模运算得到一个位置，每个 hash 函数都会算得一个不同的位置。再把位数组的这几个位置都置为 1 就完成了 add 操作。

向布隆过滤器询问 key 是否存在时，跟 add 一样，也会把 hash 的几个位置都算出来，看看位数组中这几个位置是否都为 1，只要有一个位为 0，那么说明布隆过滤器中这个key 不存在。如果都是 1，这并不能说明这个 key 就一定存在，只是极有可能存在，因为这些位被置为 1 可能是因为其它的 key 存在所致。如果这个位数组长度比较大，存在概率就会很大，如果这个位数组长度比较小，存在概率就会降低。

这种方法适用于数据命中不高、 数据相对固定、 实时性低（通常是数据集较大） 的应用场景， 代码维护较为复杂， 但是**缓存空间占用很少**。

1、可以用redisson实现布隆过滤器，引入依赖：

```xml
<dependency>
   <groupId>org.redisson</groupId>
   <artifactId>redisson</artifactId>
   <version>3.6.5</version>
</dependency>
```

2、示例伪代码：

```java
package com.redisson;

import org.redisson.Redisson;
import org.redisson.api.RBloomFilter;
import org.redisson.api.RedissonClient;
import org.redisson.config.Config;

public class RedissonBloomFilter {

    public static void main(String[] args) {
        Config config = new Config();
        config.useSingleServer().setAddress("redis://localhost:6379");
        //构造Redisson
        RedissonClient redisson = Redisson.create(config);

        RBloomFilter<String> bloomFilter = redisson.getBloomFilter("nameList");
        //初始化布隆过滤器：预计元素为100000000L,误差率为3%,根据这两个参数会计算出底层的bit数组大小
        bloomFilter.tryInit(100000000L,0.03);
        //将zhuge插入到布隆过滤器中
        bloomFilter.add("zhuge");

        //判断下面号码是否在布隆过滤器中
        System.out.println(bloomFilter.contains("guojia"));//false
        System.out.println(bloomFilter.contains("baiqi"));//false
        System.out.println(bloomFilter.contains("zhuge"));//true
    }
}
```

使用布隆过滤器需要把所有数据提前放入布隆过滤器，并且在增加数据时也要往布隆过滤器里放，布隆过滤器缓存过滤伪代码：

```java
//初始化布隆过滤器
RBloomFilter<String> bloomFilter = redisson.getBloomFilter("nameList");
//初始化布隆过滤器：预计元素为100000000L,误差率为3%
bloomFilter.tryInit(100000000L,0.03);
        
//把所有数据存入布隆过滤器
void init(){
    for (String key: keys) {
        bloomFilter.put(key);
    }
}

String get(String key) {
    // 从布隆过滤器这一级缓存判断下key是否存在
    Boolean exist = bloomFilter.contains(key);
    if(!exist){
        return "";
    }
    // 从缓存中获取数据
    String cacheValue = cache.get(key);
    // 缓存为空
    if (StringUtils.isBlank(cacheValue)) {
        // 从存储中获取
        String storageValue = storage.get(key);
        cache.set(key, storageValue);
        // 如果存储数据为空， 需要设置一个过期时间(300秒)
        if (storageValue == null) {
            cache.expire(key, 60 * 5);
        }
        return storageValue;
    } else {
        // 缓存非空
        return cacheValue;
    }
}
```

> 布隆过滤器不能删除数据，如果要删除得重新初始化数据。

#### **缓存失效(击穿)**

由于大批量缓存在同一时间失效可能导致大量请求同时穿透缓存直达数据库，可能会造成数据库瞬间压力过大甚至挂掉，对于这种情况我们在批量增加缓存时最好将这一批数据的缓存过期时间设置为一个时间段内的不同时间。

示例伪代码：

```java
String get(String key) {
    // 从缓存中获取数据
    String cacheValue = cache.get(key);
    // 缓存为空
    if (StringUtils.isBlank(cacheValue)) {
        // 从存储中获取
        String storageValue = storage.get(key);
        cache.set(key, storageValue);
        //设置一个过期时间(300到600之间的一个随机数)
        int expireTime = new Random().nextInt(300)  + 300;
        if (storageValue == null) {
            cache.expire(key, expireTime);
        }
        return storageValue;
    } else {
        // 缓存非空
        return cacheValue;
    }
}
```

#### **缓存雪崩**

缓存雪崩指的是缓存层支撑不住或宕掉后， 流量会像奔逃的野牛一样， 打向后端存储层。

由于缓存层承载着大量请求， 有效地保护了存储层， 但是如果缓存层由于某些原因不能提供服务(比如超大并发过来，缓存层支撑不住，或者由于缓存设计不好，类似大量请求访问bigkey，导致缓存能支撑的并发急剧下降)， 于是大量请求都会打到存储层， 存储层的调用量会暴增， 造成存储层也会级联宕机的情况。 

预防和解决缓存雪崩问题， 可以从以下三个方面进行着手。

1. 保证缓存层服务高可用性，比如使用Redis Sentinel或Redis Cluster。

2. 依赖隔离组件为后端限流熔断并降级。比如使用Sentinel或Hystrix限流降级组件。

比如服务降级，我们可以针对不同的数据采取不同的处理方式。当业务应用访问的是非核心数据（例如电商商品属性，用户信息等）时，暂时停止从缓存中查询这些数据，而是直接返回预定义的默认降级信息、空值或是错误提示信息；当业务应用访问的是核心数据（例如电商商品库存）时，仍然允许查询缓存，如果缓存缺失，也可以继续通过数据库读取。

3. 提前演练。 在项目上线前， 演练缓存层宕掉后， 应用以及后端的负载情况以及可能出现的问题， 在此基础上做一些预案设定。

#### **热点缓存key重建优化**

开发人员使用**缓存+过期时间**的策略既可以加速数据读写， 又保证数据的定期更新， 这种模式基本能够满足绝大部分需求。 但是有两个问题如果同时出现， 可能就会对应用造成致命的危害：

- 当前key是一个热点key（例如一个热门的娱乐新闻），并发量非常大。
- 重建缓存不能在短时间完成， 可能是一个复杂计算， 例如复杂的SQL、 多次IO、 多个依赖等。

在缓存失效的瞬间， 有大量线程来重建缓存， 造成后端负载加大， 甚至可能会让应用崩溃。

要解决这个问题主要就是要避免大量线程同时重建缓存。

我们可以利用互斥锁来解决，此方法只允许一个线程重建缓存， 其他线程等待重建缓存的线程执行完， 重新从缓存获取数据即可。

示例伪代码：

```java
String get(String key) {
    // 从Redis中获取数据
    String value = redis.get(key);
    // 如果value为空， 则开始重构缓存
    if (value == null) {
        // 只允许一个线程重建缓存， 使用nx， 并设置过期时间ex
        String mutexKey = "mutext:key:" + key;
        if (redis.set(mutexKey, "1", "ex 180", "nx")) {
             // 从数据源获取数据
            value = db.get(key);
            // 回写Redis， 并设置过期时间
            redis.setex(key, timeout, value);
            // 删除key_mutex
            redis.delete(mutexKey);
        }// 其他线程休息50毫秒后重试
        else {
            Thread.sleep(50);
            get(key);
        }
    }
    return value;
}
```

#### **缓存与数据库双写不一致**

在大并发下，同时操作数据库与缓存会存在数据不一致性问题

1、**双写不一致情况**

![0](./imgs/Redis/103029.png)

2、**读写并发不一致**

![0](./imgs/Redis/103137.png)

**解决方案：**

1. 对于并发几率很小的数据(如个人维度的订单数据、用户数据等)，这种几乎不用考虑这个问题，很少会发生缓存不一致，可以给缓存数据加上过期时间，每隔一段时间触发读的主动更新即可。

2. 就算并发很高，如果业务上能容忍短时间的缓存数据不一致(如商品名称，商品分类菜单等)，缓存加上过期时间依然可以解决大部分业务对于缓存的要求。

3. 如果不能容忍缓存数据不一致，可以通过加**分布式读写锁**保证并发读写或写写的时候按顺序排好队，**读读的时候相当于无锁**。

4. 也可以用阿里开源的canal通过监听数据库的binlog日志及时的去修改缓存，但是引入了新的中间件，增加了系统的复杂度。

![0](./imgs/Redis/103108.png)

**总结：**

以上我们针对的都是**读多写少**的情况加入缓存提高性能，如果**写多读多**的情况又不能容忍缓存数据不一致，那就没必要加缓存了，可以直接操作数据库。当然，如果数据库抗不住压力，还可以把缓存作为数据读写的主存储，异步将数据同步到数据库，数据库只是作为数据的备份。

放入缓存的数据应该是对实时性、一致性要求不是很高的数据。切记不要为了用缓存，同时又要保证绝对的一致性做大量的过度设计和控制，增加系统复杂性！

### Redisson分布式锁

[Redissonz中文文档](https://github.com/redisson/redisson/wiki/%E7%9B%AE%E5%BD%95)

![image-20240110181402212](./imgs/Redis/image-20240110181402212.png)

**扣减库存案例**

```java
@RequestMapping("/deduct_stock")
public String deductStock() {
    String lockKey = "lock:product_101";
    //Boolean result = stringRedisTemplate.opsForValue().setIfAbsent(lockKey, "zhuge");
    //stringRedisTemplate.expire(lockKey, 10, TimeUnit.SECONDS);
    /*String clientId = UUID.randomUUID().toString();
    Boolean result = stringRedisTemplate.opsForValue().setIfAbsent(lockKey, clientId, 30, TimeUnit.SECONDS); //jedis.setnx(k,v)
    if (!result) {
        return "error_code";
    }*/
    //获取锁对象
    RLock redissonLock = redisson.getLock(lockKey);
    //加分布式锁
    redissonLock.lock();  //  .setIfAbsent(lockKey, clientId, 30, TimeUnit.SECONDS);
    try {
        int stock = Integer.parseInt(stringRedisTemplate.opsForValue().get("stock")); // jedis.get("stock")
        if (stock > 0) {
            int realStock = stock - 1;
            stringRedisTemplate.opsForValue().set("stock", realStock + ""); // jedis.set(key,value)
            System.out.println("扣减成功，剩余库存:" + realStock);
        } else {
            System.out.println("扣减失败，库存不足");
        }
    } finally {
        /*if (clientId.equals(stringRedisTemplate.opsForValue().get(lockKey))) {
            stringRedisTemplate.delete(lockKey);
        }*/
        //解锁
        redissonLock.unlock();
    }


    return "end";
}
```

## Redis 事务

事务表示一组动作，要么全部执行， 要么全部不执行。例如在社交网站上用户 A 关注了用户 B，那么需要在用户 A 的 关注表中加入用户 B，并且在用户 B 的粉丝表中添加用户 A，这两个行为要么全部执行，要么全部不执行，否则会出现数据不一致的情况。

Redis 提供了简单的事务功能，将一组需要一起执行的命令放到 `multi` 和 `exec` 两个命令之间。`multi`命令代表事务开始，`exec`命令代表事务结 束，如果要停止事务的执行，可以使用 `discard` 命令代替 `exec` 命令即可。 它们之间的命令是原子顺序执行的，例如下面操作实现了上述用户关注问题。

![image-20240117113410242](./imgs/Redis/image-20240117113410242.png)

可以看到 `sadd` 命令此时的返回结果是 QUEUED，代表命令并没有真正执行， 而是暂时保存在 Redis 中的一个缓存队列（所以 discard 也只是丢弃这个缓存队列中的未执行命令，并不会回滚已经操作过的数据，这一点要和关系型数据库的 Rollback 操作区分开）。如果此时另一个客户端执行 `sismember u:a:follow ub `返回结果应该为 0

![image-20240117113629327](./imgs/Redis/image-20240117113629327.png)

只有当 exec 执行后，用户 A 关注用户 B 的行为才算完成，如下所示 exec 返回的两个结果对应 sadd 命令。

![image-20240117113643314](./imgs/Redis/image-20240117113643314.png)

另一个客户端：

![image-20240117113703526](./imgs/Redis/image-20240117113703526.png)

如果事务中的命令出现错误,Redis 的处理机制也不尽相同。 

1. 命令错误，例如下面操作错将 set 写成了 sett，属于语法错误，会造成整个事务无法执行，key 和 counter 的值未发生变化

![image-20240117113748066](./imgs/Redis/image-20240117113748066.png)

2. 运行时错误，例如用户B在添加粉丝列表时，误把sadd命令(针对集合)写成了zadd命令(针对有序集合)，这种就是运行时错误

![image-20240117113755363](./imgs/Redis/image-20240117113755363.png)

可以看到 Redis 并不支持回滚功能，`sadd u:c:follow ub` 命令已经执行成功,开发人员需要自己修复这类问题。

**Pipeline 和事务的区别**

- pipeline 是客户端的行为，对于服务器来说是透明的，可以认为服务器无法区分客户端发送来的查询命令是以普通命令的形式还是以 pipeline 的形式发送到服务器的；

- 事务则是实现在服务器端的行为，用户执行 `MULTI` 命令时，服务器会将对应这个用户的客户端对象设置为一个特殊的状态，在这个状态下后续用户执行的查询命令不会被真的执行，而是被服务器缓存起来，直到用户执行 EXEC 命令 为止，服务器会将这个用户对应的客户端对象中缓存的命令按照提交的顺序依次执行。 
- 应用 pipeline 可以提服务器的吞吐能力，并提高 Redis 处理查询请求的能力。 但是这里存在一个问题，当通过 pipeline 提交的查询命令数据较少，可以被内核缓冲区所容纳时，Redis 可以保证这些命令执行的原子性。然而一旦数据量过大，超过了内核缓冲区的接收大小，那么命令的执行将会被打断，原子性也就无法得到保证。因此 pipeline 只是一种提升服务器吞吐能力的机制，如果想要命令以事务的方式原子性的被执行，还是需要事务机制，或者使用更高级的脚本功能以及模块功能。
- 可以将事务和 pipeline 结合起来使用，减少事务的命令在网络上的传输时间，将多次网络 IO 缩减为一次网络 IO。

## Redis6 的线程模型

### Reactor 模式

“反应”即“倒置”，“控制逆转”，具体事件处理程序不调用反应器，而向反应器注册一个事件处理器，表示自己对某些事件感兴趣，有时间来了，具体事件处理程序通过事件处理器对某个指定的事件发生做出反应。

Redis 基于 Reactor 模式开发了自己的网络事件处理器 - 文件事件处理器 （file event handler，后文简称为 FEH），而该处理器又是单线程的，所以 redis 设计为单线程模型。

#### 单线程 Reactor 模式流程

服务器端的 Reactor 是一个线程对象，该线程会启动事件循环，并使用 Acceptor 事件处理器关注 ACCEPT 事件，这样 Reactor 会监听客户端向服务器端 发起的连接请求事件(ACCEPT 事件)。

客户端向服务器端发起一个连接请求，Reactor 监听到了该 ACCEPT 事件的发 生并将该 ACCEPT 事件派发给相应的 Acceptor 处理器来进行处理。建立连接后关注的 READ 事件，这样一来 Reactor 就会监听该连接的 READ 事件了。

当 Reactor 监听到有读 READ 事件发生时，将相关的事件派发给对应的处理器进行处理。比如，读处理器会通过读取数据，此时 read()操作可以直接读取到数据，而不会堵塞与等待可读的数据到来。

在目前的单线程 Reactor 模式中，不仅 I/O 操作在该 Reactor 线程上，连非 I/O 的业务操作也在该线程上进行处理了，这可能会大大延迟 I/O 请求的响应。 所以我们应该将非 I/O 的业务逻辑操作从 Reactor 线程上卸载，以此来加速 Reactor 线程对 I/O 请求的响应。

![image-20240117111108104](./imgs/Redis/image-20240117111108104.png)

#### 单线程 Reactor，工作者线程池

与单线程 Reactor 模式不同的是，添加了一个工作者线程池，并将非 I/O 操作从 Reactor 线程中移出转交给工作者线程池来执行。这样能够提高 Reactor 线程的 I/O 响应，不至于因为一些耗时的业务逻辑而延迟对后面 I/O 请求的处理。 但是对于一些小容量应用场景，可以使用单线程模型，对于高负载、大并发或大数据量的应用场景却不合适，主要原因如下： 

1.  一个 NIO 线程同时处理成百上千的链路，性能上无法支撑，即便 NIO 线程的 CPU 负荷达到 100%，也无法满足海量消息的读取和发送；
2.  当 NIO 线程负载过重之后，处理速度将变慢，这会导致大量客户端连接超时，超时之后往往会进行重发，这更加重了 NIO 线程的负载，最终会导致大量消息积压和处理超时，成为系统的性能瓶颈；

![image-20240117111228331](./imgs/Redis/image-20240117111228331.png)

#### 多 Reactor 线程模式

Reactor 线程池中的每一 Reactor线程都会有自己的 Selector、线程和分发的事件循环逻辑。 

mainReactor 可以只有一个，但 subReactor一般会有多个。mainReactor 线程主要负责接收客户端的连接请求，然后将接收到的 SocketChannel 传递给 subReactor，由 subReactor 来完成和客户端的通信。

多 Reactor 线程模式将**接受客户端的连接请求**和**与该客户端的通信**分在了两个 Reactor 线程来完成。mainReactor 完成接收客户端连接请求的操作，它不负责与客户端的通信，而是将建立好的连接转交给 subReactor 线程来完成与客户端的通信，这样一来就不会因为 read()数据量太大而导致后面的客户端连接请求得不到即时处理的情况。并且多 Reactor 线程模式在海量的客户端并发请求的情况下，还可以通过实现 subReactor 线程池来将海量的连接分发给多个 subReactor 线程，在多核的操作系统中这能大大提升应用的负载和吞吐量。

![image-20240117111405811](./imgs/Redis/image-20240117111405811.png)



### 多线程

1. **Redis6.0 之前的版本真的是单线程吗？**

Redis 在处理客户端的请求时，包括获取 (socket 读)、解析、执行、内容返 回 (socket 写) 等都由一个顺序串行的主线程处理，这就是所谓的“单线程”。 但如果严格来讲从 Redis4.0 之后并不是单线程，除了主线程外，它也有后台线程 在处理一些较为缓慢的操作，例如清理脏数据、无用连接的释放、大 key 的删 除等等。 

2. **Redis6.0 之前为什么一直不使用多线程？**

官方曾做过类似问题的回复：使用 Redis 时，几乎不存在 CPU 成为瓶颈的情况， Redis 主要受限于内存和网络。例如在一个普通的 Linux 系统上，Redis 通过使用 pipelining 每秒可以处理 100 万个请求，所以如果应用程序主要使用 O(N)或 O(log(N))的命令，它几乎不会占用太多 CPU。 

使用了单线程后，可维护性高。多线程模型虽然在某些方面表现优异，但是 它却引入了程序执行顺序的不确定性，带来了并发读写的一系列问题，增加了系统复杂度、同时可能存在线程切换、甚至加锁解锁、死锁造成的性能损耗。Redis 通过 AE 事件模型以及 IO 多路复用等技术，处理性能非常高，因此没有必要使用多线程。单线程机制使得 Redis 内部实现的复杂度大大降低，Hash的惰性 Rehash、Lpush 等等 “线程不安全” 的命令都可以无锁进行。 

3. **Redis6.0 为什么要引入多线程呢？**

Redis 将所有数据放在内存中，内存的响应时长大约为 100 ns，对于小数据包，Redis 服务器可以处理 80000 到 100000 QPS，这也是 Redis 处理的极限了， 对于 80%的公司来说，单线程的 Redis 已经足够使用了。

但随着越来越复杂的业务场景，有些公司动不动就上亿的交易量，因此需要更大的 QPS。常见的解决方案是在分布式架构中对数据进行分区并采用多个服务器，但该方案有非常大的缺点：

- 要管理的 Redis 服务器太多，维护代价大；
- 某些适用于单个 Redis 服务器的命令不适用于数据分区；
- 数据分区无法解决热点读/写问题；
- 数据偏斜，重新分配和放大/缩小变得更加复杂等等。 

从 Redis 自身角度来说，因为读写网络的 read/write 系统调用占用了Redis 执行期间大部分 CPU 时间，瓶颈主要在于网络的 IO 消耗，优化主要有两个方向：

- 提高网络 IO 性能，典型的实现比如使用 DPDK 来替代内核网络栈的方式 ；
- 使用多线程充分利用多核，典型的实现比如 Memcached。 

协议栈优化的这种方式跟 Redis 关系不大，支持多线程是一种最有效最便捷的操作方式。所以总结起来，redis 支持多线程主要就是两个原因： 

- 可以充分利用服务器 CPU 资源，目前主线程只能利用一个核；
- 多线程任务可以分摊 Redis 同步 IO 读写负荷 

4. **Redis6.0 默认是否开启了多线程？**

Redis6.0 的多线程默认是**禁用**的，只使用主线程。如需开启需要修改 redis.conf 配置文件：`io-threads-do-reads yes`

![image-20240117112525369](./imgs/Redis/image-20240117112525369.png)

开启多线程后，还需要设置线程数，否则是不生效的。 关于线程数的设置，官方有一个建议：4 核的机器建议设置为 2 或 3 个线程， 8 核的建议设置为 6 个线程，线程数一定要小于机器核数。线程数不要超过8个。

5. **Redis6.0 采用多线程后，性能的提升效果如何？**

Redis 6 引入的多线程 IO 特性对性能提升至少是一倍以上。如果开启多线程，至少要 4 核的机器，且 Redis 实例已经占用相当大的 CPU 耗时的时候才建议采用，否则使用多线程没有意义。

6. **Redis6.0 多线程的实现机制？**

流程简述如下：

1、主线程负责接收建立连接请求，获取 socket 放入全局等待读处理队列

2、主线程处理完读事件之后，通过 RR(Round Robin) 将这些连接分配给这些 IO 线程

3、主线程阻塞等待 IO 线程读取 socket 完毕

4、主线程通过单线程的方式执行请求命令，请求数据读取并解析完成，但并不执行回写 socket

5、主线程阻塞等待 IO 线程将数据回写 socket 完毕

6、解除绑定，清空等待队列

该设计有如下特点： 

- IO 线程要么同时在读 socket，要么同时在写，不会同时读或写

- IO 线程只负责读写 socket 解析命令，不负责命令处理

7. **开启多线程后，是否会存在线程并发安全问题？**

从上面的实现机制可以看出，Redis 的多线程部分只是用来处理网络数据的读写和协议解析，执行命令仍然是单线程顺序执行。所以我们不需要去考虑控制 key、lua、事务，LPUSH/LPOP 等等的并发及线程安全问题。

## Redis7 共享复制缓存区

### Redis 复制缓存区相关问题分析

**多从库时主库内存占用过多**

![image-20240117114522122](./imgs/Redis/image-20240117114522122.png)

对于 Redis 主库，当用户的写请求到达时，主库会将变更命令分别写入所有**从库复制缓冲区（OutputBuffer)**，以及**复制积压区 (ReplicationBacklog)**。全量同步时依然会执行该逻辑，所以在全量同步阶段经常会触发 `client-output-buffer-limit`，主库断开与从库的连接，导致主从同步失败， 甚至出现循环持续失败的情况。 

该实现一个明显的问题是内存占用过多，所有从库的连接在主库上是独立的，也就是说每个从库 OutputBuffer 占用的内存空间也是独立的，那么主从复制消耗的内存就是所有从库缓冲区内存大小之和。如果我们设定从库的 `client-output-buffer-limit` 为 1GB，如果有三个从库，则在主库上可能会消耗 3GB  的内存用于主从复制。另外，真实环境中从库的数量不是确定的，这也导致 Redis  实例的内存消耗不可控。

**OutputBuffer 拷贝和释放的堵塞问题**

Redis 为了提升多从库全量复制的效率和减少 fork 产生 RDB 的次数，会尽可能的让多个从库共用一个 RDB，当已经有一个从库触发 RDB BGSAVE 时，后续需要全量同步的从库会共享这次 BGSAVE 的 RDB，为了从库复制数据的完整性，会将之前从库的 OutputBuffer 拷贝到请求全量同步从库的 OutputBuffer 中。

其中拷贝OutputBuffer 可能存在堵塞问题，因为 OutputBuffer 链表上的数据可达数百 MB 甚至数 GB 之多，对其拷贝可能使用百毫秒甚至秒级的时间，对 Redis 性能影响却很大。 同样地，当 OutputBuffer 大小触发 limit 限制时，Redis 就会关闭该从库链接，而在释放 OutputBuffer 时，也需要释放数百 MB 甚至数 GB 的数据，其耗时对 Redis 而言也很长。

**ReplicationBacklog 的限制**

拷贝的数据量最大的是 ReplicationBacklog 的 大小，为了避免拷贝数据过多的问题，通常不会让该值过大，一般百兆左右。但在大容量实例中，为了避免由于主从网络中断导致的全量同步，又希望该值大一 些，这就存在矛盾了。

### Redis7 共享复制缓存区的设计

每个从库在主库上单独拥有自己的 OutputBuffer，但其存储的内容却是一样的，一个最直观的想法就是主库在命令传播时，将这些命令放在一个全局的复制数据缓冲区中，多个从库共享这份数据，不同的从库对引用复制数据缓冲区中不同的内容，这就是『共享复制缓存区』方案的核心思想。实际上，复制积压缓冲区（ReplicationBacklog）中的内容与从库 OutputBuffer 中的数据也是一样的，所以该方案中，ReplicationBacklog 和从库一样共享一份复制缓冲区的数据，也避 免了 ReplicationBacklog 的内存开销。

![image-20240117115219600](./imgs/Redis/image-20240117115219600.png)

## **开发规范与性能优化**

### **一、键值设计**

**1. key名设计**

- (1)【建议】: 可读性和可管理性，以业务名(或数据库名)为前缀(防止key冲突)，用冒号分隔，比如业务名:表名:id

```sh
trade:order:1
```

- (2)【建议】：简洁性，保证语义的前提下，控制key的长度，当key较多时，内存占用也不容忽视，例如：

```sh
user:{uid}:friends:messages:{mid} 简化为 u:{uid}:fr:m:{mid}
```

- (3)【强制】：不要包含特殊字符，反例：包含空格、换行、单双引号以及其他转义字符

**2. value设计**

- (1)【强制】：拒绝bigkey(防止网卡流量、慢查询)

在Redis中，一个字符串最大512MB，一个二级数据结构（例如hash、list、set、zset）可以存储大约40亿个(2^32-1)个元素，但实际中如果下面两种情况，就会认为它是bigkey。

1. **字符串类型：**它的big体现在单个value值很大，一般认为超过10KB就是bigkey。
2. **非字符串类型：**哈希、列表、集合、有序集合，它们的big体现在元素个数太多。

一般来说，string类型控制在10KB以内，hash、list、set、zset元素个数不要超过5000。

反例：一个包含200万个元素的list。

非字符串的bigkey，不要使用del删除，使用hscan、sscan、zscan方式渐进式删除，同时要注意防止bigkey过期时间自动删除问题(例如一个200万的zset设置1小时过期，会触发del操作，造成阻塞）

**bigkey的危害：**

1. 导致redis阻塞

2. 网络拥塞：bigkey也就意味着每次获取要产生的网络流量较大，假[[设一个bigkey为1MB，客户端每秒访问量为1000，那么每秒产生1000MB的流量，对于普通的千兆网卡(按照字节算是128MB/s)的服务器来说简直是灭顶之灾，而且一般服务器会采用单机多实例的方式来部署，也就是说一个bigkey可能会对其他实例也造成影响，其后果不堪设想。

3. 过期删除：有个bigkey，它安分守己（只执行简单的命令，例如hget、lpop、zscore等），但它设置了过期时间，当它过期后，会被删除，如果没有使用Redis 4.0的过期异步删除(**lazyfree-lazy-expire yes**)，就会存在阻塞Redis的可能性。

**bigkey的产生**

一般来说，bigkey的产生都是由于程序设计不当，或者对于数据规模预料不清楚造成的，来看几个例子：

- 社交类：粉丝列表，如果某些明星或者大v不精心设计下，必是bigkey。

- 统计类：例如按天存储某项功能或者网站的用户集合，除非没几个人用，否则必是bigkey。

- 缓存类：将数据从数据库load出来序列化放到Redis里，这个方式非常常用，但有两个地方需要注意，第一，是不是有必要把所有字段都缓存；第二，有没有相关关联的数据，有的同学为了图方便把相关数据都存一个key下，产生bigkey。

**如何优化bigkey**

1. 拆

```sh
big list： list1、list2、...listN
big hash：可以将数据分段存储，比如一个大的key，假设存了1百万的用户数据，可以拆分成200个key，每个key下面存放5000个用户数据
```

2. 如果bigkey不可避免，也要思考一下要不要每次把所有元素都取出来(例如有时候仅仅需要hmget，而不是hgetall)，删除也是一样，尽量使用优雅的方式来处理。

- (2)【推荐】：选择适合的数据类型。

例如：实体类型(要合理控制和使用数据结构，但也要注意节省内存和性能之间的平衡)

```sh
# 反例
set user:1:name tom
set user:1:age 19
set user:1:favor football
# 正例
hmset user:1 name tom age 19 favor football
```

- (3)【推荐】：控制key的生命周期，redis不是垃圾桶。建议使用expire设置过期时间(条件允许可以打散过期时间，防止集中过期)。

### **二、命令使用**

1. 【推荐】 O(N)命令关注N的数量

例如hgetall、lrange、smembers、zrange、sinter等并非不能使用，但是需要明确N的值。有遍历的需求可以使用hscan、sscan、zscan代替。

2.【推荐】：禁用命令

禁止线上使用keys、flushall、flushdb等，通过redis的rename机制禁掉命令，或者使用scan的方式渐进式处理。

3.【推荐】合理使用select

redis的多数据库较弱，使用数字进行区分，很多客户端支持较差，同时多业务用多数据库实际还是单线程处理，会有干扰。

4.【推荐】使用批量操作提高效率

```sh
原生命令：例如mget、mset。
非原生命令：可以使用pipeline提高效率。
```

但要注意控制一次批量操作的元素个数(例如500以内，实际也和元素字节数有关)。

注意两者不同：

```sh
1. 原生命令是原子操作，pipeline是非原子操作。
2. pipeline可以打包不同的命令，原生命令做不到
3. pipeline需要客户端和服务端同时支持。
```

5.【建议】Redis事务功能较弱，不建议过多使用，可以用lua替代

### **三、客户端使用**

1.【推荐】：避免多个应用使用一个Redis实例，不相干的业务拆分，公共数据做服务化。

2.【推荐】：使用带有连接池的数据库，可以有效控制连接，同时提高效率，标准使用方式：

```java
JedisPoolConfig jedisPoolConfig = new JedisPoolConfig();
jedisPoolConfig.setMaxTotal(5);
jedisPoolConfig.setMaxIdle(2);
jedisPoolConfig.setTestOnBorrow(true);

JedisPool jedisPool = new JedisPool(jedisPoolConfig, "192.168.0.60", 6379, 3000, null);

Jedis jedis = null;
try {
    jedis = jedisPool.getResource();
    //具体的命令
    jedis.executeCommand()
} catch (Exception e) {
    logger.error("op key {} error: " + e.getMessage(), key, e);
} finally {
    //注意这里不是关闭连接，在JedisPool模式下，Jedis会被归还给资源池。
    if (jedis != null) 
        jedis.close();
}
```

连接池参数含义

| 序号 | 参数名             | 含义                                                         | 默认值           | 使用建议                                          |
| ---- | ------------------ | ------------------------------------------------------------ | ---------------- | ------------------------------------------------- |
| 1    | maxTotal           | 资源池中最大连接数                                           | 8                | 设置建议见下面                                    |
| 2    | maxIdle            | 资源池允许最大空闲的连接数                                   | 8                | 设置建议见下面                                    |
| 3    | minIdle            | 资源池确保最少空闲的连接数                                   | 0                | 设置建议见下面                                    |
| 4    | blockWhenExhausted | 当资源池用尽后，调用者是否要等待。只有当为true时，下面的maxWaitMillis才会生效 | true             | 建议使用默认值                                    |
| 5    | maxWaitMillis      | 当资源池连接用尽后，调用者的最大等待时间(单位为毫秒)         | -1：表示永不超时 | 不建议使用默认值                                  |
| 6    | testOnBorrow       | 向资源池借用连接时是否做连接有效性检测(ping)，无效连接会被移除 | false            | 业务量很大时候建议设置为false(多一次ping的开销)。 |
| 7    | testOnReturn       | 向资源池归还连接时是否做连接有效性检测(ping)，无效连接会被移除 | false            | 业务量很大时候建议设置为false(多一次ping的开销)。 |
| 8    | jmxEnabled         | 是否开启jmx监控，可用于监控                                  | true             | 建议开启，但应用本身也要开启                      |

**优化建议：**

1）**maxTotal**：最大连接数，早期的版本叫maxActive

实际上这个是一个很难回答的问题，考虑的因素比较多：

- 业务希望Redis并发量
- 客户端执行命令时间
- Redis资源：例如 nodes(例如应用个数) * maxTotal 是不能超过redis的最大连接数maxclients。
- 资源开销：例如虽然希望控制**空闲连接**(连接池此刻可马上使用的连接)，但是不希望因为连接池的频繁释放创建连接造成不必靠开销。

**以一个例子说明**，假设:

- 一次命令时间（borrow|return resource + Jedis执行命令(含网络) ）的平均耗时约为1ms，一个连接的QPS大约是1000
- 业务期望的QPS是50000

那么理论上需要的资源池大小是50000 / 1000 = 50个。但事实上这是个理论值，还要考虑到要比理论值预留一些资源，通常来讲maxTotal可以比理论值大一些。

但这个值不是越大越好，一方面连接太多占用客户端和服务端资源，另一方面对于Redis这种高QPS的服务器，一个大命令的阻塞即使设置再大资源池仍然会无济于事。

2）**maxIdle和minIdle**

maxIdle实际上才是业务需要的最大连接数，maxTotal是为了**给出余量**，所以maxIdle不要设置过小，否则会有new Jedis(新连接)开销。

**连接池的最佳性能是maxTotal = maxIdle**，这样就避免连接池伸缩带来的性能干扰。但是如果并发量不大或者maxTotal设置过高，会导致不必要的连接资源浪费。一般推荐maxIdle可以设置为按上面的业务期望QPS计算出来的理论连接数，maxTotal可以再放大一倍。

minIdle（最小空闲连接数），与其说是最小空闲连接数，不如说是"**至少需要保持的空闲连接数**"，在使用连接的过程中，如果连接数超过了minIdle，那么继续建立连接，如果超过了maxIdle，当超过的连接执行完业务后会慢慢被移出连接池释放掉。

如果系统启动完马上就会有很多的请求过来，那么可以给redis连接池做**预热**，比如快速的创建一些redis连接，执行简单命令，类似ping()，快速的将连接池里的空闲连接提升到minIdle的数量。

**连接池预热**示例代码：

```java
List<Jedis> minIdleJedisList = new ArrayList<Jedis>(jedisPoolConfig.getMinIdle());

for (int i = 0; i < jedisPoolConfig.getMinIdle(); i++) {
    Jedis jedis = null;
    try {
        jedis = pool.getResource();
        minIdleJedisList.add(jedis);
        jedis.ping();
    } catch (Exception e) {
        logger.error(e.getMessage(), e);
    } finally {
        //注意，这里不能马上close将连接还回连接池，否则最后连接池里只会建立1个连接。。
        //jedis.close();
    }
}
//统一将预热的连接还回连接池
for (int i = 0; i < jedisPoolConfig.getMinIdle(); i++) {
    Jedis jedis = null;
    try {
        jedis = minIdleJedisList.get(i);
        //将连接归还回连接池
        jedis.close();
    } catch (Exception e) {
        logger.error(e.getMessage(), e);
    } finally {
    }
}
```

总之，要根据实际系统的QPS和调用redis客户端的规模整体评估每个节点所使用的连接池大小。

3.【建议】：高并发下建议客户端添加熔断功能(例如sentinel、hystrix)

4.【推荐】：设置合理的密码，如有必要可以使用SSL加密访问

5.【建议】

**Redis对于过期键有三种清除策略：**

1. 被动删除：当读/写一个已经过期的key时，会触发惰性删除策略，直接删除掉这个过期key
2. 主动删除：由于惰性删除策略无法保证冷数据被及时删掉，所以Redis会定期(默认每100ms)主动淘汰一批**已过期**的key，这里的一批只是部分过期key，所以可能会出现部分key已经过期但还没有被清理掉的情况，导致内存并没有被释放
3. 当前已用内存超过maxmemory限定时，触发**主动清理策略**

**主动清理策略**在Redis 4.0 之前一共实现了 6 种内存淘汰策略，在 4.0 之后，又增加了 2 种策略，总共8种：

**a) 针对设置了过期时间的key做处理：**

1. volatile-ttl：在筛选时，会针对设置了过期时间的键值对，根据过期时间的先后进行删除，越早过期的越先被删除。
2. volatile-random：就像它的名称一样，在设置了过期时间的键值对中，进行随机删除。
3. volatile-lru：会使用 LRU 算法筛选设置了过期时间的键值对删除。
4. volatile-lfu：会使用 LFU 算法筛选设置了过期时间的键值对删除。

**b) 针对所有的key做处理：**

1. allkeys-random：从所有键值对中随机选择并删除数据。
2. allkeys-lru：使用 LRU 算法在所有数据中进行筛选删除。
3. allkeys-lfu：使用 LFU 算法在所有数据中进行筛选删除。

**c) 不处理：**

1. noeviction：不会剔除任何数据，拒绝所有写入操作并返回客户端错误信息"(error) OOM command not allowed when used memory"，此时Redis只响应读操作。

**LRU 算法**（Least Recently Used，最近最少使用）

淘汰很久没被访问过的数据，以**最近一次访问时间**作为参考。

**LFU 算法**（Least Frequently Used，最不经常使用）

淘汰最近一段时间被访问次数最少的数据，以**次数**作为参考。

当存在热点数据时，LRU的效率很好，但偶发性的、周期性的批量操作会导致LRU命中率急剧下降，缓存污染情况比较严重。这时使用LFU可能更好点。

根据自身业务类型，配置好maxmemory-policy(默认是noeviction)，推荐使用volatile-lru。如果不设置最大内存，当 Redis 内存超出物理内存限制时，内存的数据会开始和磁盘产生频繁的交换 (swap)，会让 Redis 的性能急剧下降。

当Redis运行在主从模式时，只有主结点才会执行过期删除策略，然后把删除操作”del key”同步到从结点删除数据。

### **四、系统内核参数优化**

**vm.swapiness**

swap对于操作系统来说比较重要，当物理内存不足时，可以将一部分内存页进行swap到硬盘上，以解燃眉之急。但世界上没有免费午餐，swap空间由硬盘提供，对于需要高并发、高吞吐的应用来说，磁盘IO通常会成为系统瓶颈。在Linux中，并不是要等到所有物理内存都使用完才会使用到swap，系统参数swppiness会决定操作系统使用swap的倾向程度。swappiness的取值范围是0~100，swappiness的值越大，说明操作系统可能使用swap的概率越高，swappiness值越低，表示操作系统更加倾向于使用物理内存。swappiness的取值越大，说明操作系统可能使用swap的概率越高，越低则越倾向于使用物理内存。

如果linux内核版本<3.5，那么swapiness设置为0，这样系统宁愿swap也不会oom killer（杀掉进程）

如果linux内核版本>=3.5，那么swapiness设置为1，这样系统宁愿swap也不会oom killer

一般需要保证redis不会被kill掉：

```sh
cat /proc/version  #查看linux内核版本
echo 1 > /proc/sys/vm/swappiness
echo vm.swapiness=1 >> /etc/sysctl.conf
```

PS：OOM killer 机制是指Linux操作系统发现可用内存不足时，强制杀死一些用户进程（非内核进程），来保证系统有足够的可用内存进行分配。

**vm.overcommit_memory(默认0)**

0：表示内核将检查是否有足够的可用物理内存(实际不一定用满)供应用进程使用；如果有足够的可用物理内存，内存申请允许；否则，内存申请失败，并把错误返回给应用进程　

1：表示内核允许分配所有的物理内存，而不管当前的内存状态如何

如果是0的话，可能导致类似fork等操作执行失败，申请不到足够的内存空间

Redis建议把这个值设置为1，就是为了让fork操作能够在低内存下也执行成功。

```sh
cat /proc/sys/vm/overcommit_memory
echo "vm.overcommit_memory=1" >> /etc/sysctl.conf
sysctl vm.overcommit_memory=1
```

**合理设置文件句柄数**

操作系统进程试图打开一个文件(或者叫句柄)，但是现在进程打开的句柄数已经达到了上限，继续打开会报错：“Too many open files”

```sh
ulimit -a  #查看系统文件句柄数，看open files那项
ulimit -n 65535  #设置系统文件句柄数
```

**慢查询日志：slowlog**

```sh
Redis慢日志命令说明:
config get slow* #查询有关慢日志的配置信息
config set slowlog-log-slower-than 20000  #设置慢日志使时间阈值,单位微秒，此处为20毫秒，即超过20毫秒的操作都会记录下来，生产环境建议设置1000，也就是1ms，这样理论上redis并发至少达到1000，如果要求单机并发达到1万以上，这个值可以设置为100
config set slowlog-max-len 1024  #设置慢日志记录保存数量，如果保存数量已满，会删除最早的记录，最新的记录追加进来。记录慢查询日志时Redis会对长命令做截断操作，并不会占用大量内存，建议设置稍大些，防止丢失日志
config rewrite #将服务器当前所使用的配置保存到redis.conf
slowlog len #获取慢查询日志列表的当前长度
slowlog get 5 #获取最新的5条慢查询日志。慢查询日志由四个属性组成：标识ID，发生时间戳，命令耗时，执行命令和参数
slowlog reset #重置慢查询日志
```
