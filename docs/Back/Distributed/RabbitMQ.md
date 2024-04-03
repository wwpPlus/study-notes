---
title: RabbitMQ
date: 2024-03-31 20:22:09
permalink: /pages/6c832f/
---
# RabbitMQ

## 消息队列

### 概念

`MQ(message queue)`，从字面意思上看，本质是个队列，`FIFO` 先入先出，只不过队列中存放的内容是 `message` 而已，还是一种跨进程的通信机制，用于上下游传递消息。在互联网架构中，MQ 是一种非常常见的上下游**“逻辑解耦+物理解耦”**的消息通信服务。使用了 MQ 之后，消息发送上游只需要依赖 MQ，不用依赖其他服务。

### MQ优势

- 流量消峰

如果订单系统最多能处理一万次订单，这个处理能力应付正常时段的下单时绰绰有余，正常时段我们下单一秒后就能返回结果。但是在高峰期，如果有两万次下单操作系统是处理不了的，只能限制订单超过一万后不允许用户下单。使用消息队列做缓冲，我们可以取消这个限制，把一秒内下的订单分散成一段时间来处理，这时有些用户可能在下单十几秒后才能收到下单成功的操作，但是比不能下单的体验要好。

- 应用解耦

以电商应用为例，应用中有订单系统、库存系统、物流系统、支付系统。用户创建订单后，如果耦合调用库存系统、物流系统、支付系统，任何一个子系统出了故障，都会造成下单操作异常。当转变成基于消息队列的方式后，系统间调用的问题会减少很多，比如物流系统因为发生故障，需要几分钟来修复。在 这几分钟的时间里，物流系统要处理的内存被缓存在消息队列中，用户的下单操作可以正常完成。当物流系统恢复后，继续处理订单信息即可，中单用户感受不到物流系统的故障，提升系统的可用性。

![image-20240330143342627](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/RabbitMQ/image-20240330143342627.png)

- 异步处理

有些服务间调用是异步的，例如 A 调用 B，B 需要花费很长时间执行，但是 A 需要知道 B 什么时候可以执行完，以前一般有两种方式，A 过一段时间去调用 B 的查询 api 查询。或者 A 提供一个 `callback api`， B 执行完之后调用 api 通知 A 服务。这两种方式都不是很优雅，使用消息总线，可以很方便解决这个问题， A 调用 B 服务后，只需要**监听** B 处理完成的消息，当 B 处理完成后，会发送一条消息给 MQ，MQ 会将此消息转发给 A 服务。这样 A 服务既不用循环调用 B 的查询 api，也不用提供 `callback api`。同样 B 服务也不 用做这些操作。A 服务还能及时的得到异步处理成功的消息。

![image-20240330143540426](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/RabbitMQ/1711887999808.jpg)

### MQ分类

- ActiveMQ

优点：单机吞吐量万级，时效性 ms 级，可用性高，基于主从架构实现高可用性，消息可靠性较低的概率丢失数据

缺点：官方社区现在对 `ActiveMQ 5.x` 维护越来越少，高吞吐量场景较少使用。

- Kafka

大数据领域内的消息传输，则绕不开 `Kafka`，这款**为大数据而生**的消息中间件，以其**百万级 TPS** 的吞吐量名声大噪，在数据采集、传输、存储的过程中发挥着举足轻重的作用。

优点：性能卓越，单机写入 TPS 约在百万条/秒，最大的优点，就是**吞吐量高**。时效性 ms 级可用性非常高，`kafka` 是分布式的，一个数据多个副本，少数机器宕机，不会丢失数据，不会导致不可用，消费者采用 `Pull` 方式获取消息，消息有序，通过控制能够保证所有消息被消费且仅被消费一次；有优秀的第三方 `Kafka Web` 管理界面 `Kafka-Manager`；在日志领域比较成熟，被多家公司和多个开源项目使用；

功能支持： 功能较为简单，主要支持简单的 MQ 功能，在大数据领域的实时计算以及**日志采集**被大规模使用；

缺点：`Kafka` 单机超过 64 个队列/分区，`Load` 会发生明显的飙高现象，队列越多，`load` 越高，发送消息响应时间变长，使用短轮询方式，实时性取决于轮询间隔时间，消费失败不支持重试；支持消息顺序， 但是一台代理宕机后，就会产生消息乱序；

- RocketMQ

`RocketMQ` 出自阿里巴巴的开源产品，用 Java 语言实现，在设计时参考了 Kafka，并做出了自己的一 些改进。被阿里巴巴广泛应用在订单，交易，充值，流计算，消息推送，日志流式处理，`binglog` 分发等场景。

优点：**单机吞吐量十万级**，可用性非常高，分布式架构，**消息可以做到 0 丢失**，MQ 功能较为完善，还是分布式的，扩展性好，**支持 10 亿级别的消息堆积**，不会因为堆积导致性能下降，源码是 java 我们可以自己阅读源码，定制自己公司的 MQ

缺点：**支持的客户端语言不多**，目前是 java 及 c++，其中 c++不成熟；社区活跃度一般，没有在 MQ 核心中去实现 JMS 等接口，有些系统要迁移需要修改大量代码

- RabbitMQ

2007 年发布，是一个在 `AMQP`(高级消息队列协议)基础上完成的，可复用的企业消息系统，是当前最主流的消息中间件之一。 

优点：由于 `erlang` 语言的**高并发特性**，性能较好；**吞吐量到万级**，MQ 功能比较完备，健壮、稳定、易 用、跨平台、**支持多种语言**，支持 AJAX 文档齐全；

缺点：商业版需要收费，学习成本较高

![img](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/RabbitMQ/90D2FA430B2C4BC2AB9E14AE619D4200.png)

## RabbitMQ

`RabbitMQ` 是一个消息中间件：它接受并转发消息。

### 四大核心概念

- 生产者：产生数据发送消息的程序是生产者；

- 交换机：交换机是 `RabbitMQ` 非常重要的一个部件，一方面它接收来自生产者的消息，另一方面它将消息推送到队列中。交换机必须确切知道如何处理它接收到的消息，是将这些消息推送到特定队列还是推送到多个队列，亦或者是把消息丢弃，这个得有交换机类型决定

- 队列：队列是 `RabbitMQ` 内部使用的一种数据结构，尽管消息流经 `RabbitMQ` 和应用程序，但它们只能存储在队列中。队列仅受主机的内存和磁盘限制的约束，本质上是一个大的消息缓冲区。许多生产者可 以将消息发送到一个队列，许多消费者可以尝试从一个队列接收数据。这就是我们使用队列的方式

- 消费者：消费与接收具有相似的含义。消费者大多时候是一个等待接收消息的程序。请注意生产者，消费者和消息中间件很多时候并不在同一机器上。同一个应用程序既可以是生产者又是可以是消费者。

### RabbitMQ组件

![image-20240330145309912](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/RabbitMQ/image-20240330145309912.png)

| 名称         | 描述                                                         |
| ------------ | :----------------------------------------------------------- |
| Broker       | 一个接收和分发消息的应用程序，其中 RabbitMQ 服务器充当消息代理。 |
| Virtual host | 为了多租户和安全目的而设计的概念，将 AMQP 的基本组件划分为虚拟组，类似于网络中的命名空间概念。 |
| Connection   | 发布者/消费者和代理之间的 TCP 连接。                         |
| Channel      | 在每次访问 RabbitMQ 都建立一个新的 TCP 连接可能效率低下，特别是在高消息负载下。通道是在连接内部建立的逻辑连接。 |
| Exchange     | 消息到达代理的第一站。根据分发规则和路由键的匹配，将消息分发到队列中。 |
| Queue        | 消息的最终目的地，在此处排队等待消费者取走。                 |
| Binding      | 交换机和队列之间的虚拟连接。绑定可以包含路由键，绑定信息存储在交换机的查询表中，用作消息分发的依据。 |

### 使用案例

**引入依赖**

```xml
<dependencies>
    <!--rabbitmq 依赖客户端-->
    <dependency>
        <groupId>com.rabbitmq</groupId>
        <artifactId>amqp-client</artifactId>
        <version>5.8.0</version>
    </dependency>
    <!--操作文件流的一个依赖-->
    <dependency>
        <groupId>commons-io</groupId>
        <artifactId>commons-io</artifactId>
        <version>2.6</version>
    </dependency>
</dependencies>
```

**消息生产者**

```java
public class Producer {
    private final static String QUEUE_NAME = "hello";
    public static void main(String[] args) throws Exception {
        //创建一个连接工厂
        ConnectionFactory factory = new ConnectionFactory();
        factory.setHost("182.92.234.71");
        factory.setUsername("admin");
        factory.setPassword("123");
        //channel 实现了自动 close 接口 自动关闭 不需要显示关闭
        try(Connection connection = factory.newConnection();Channel channel =
                connection.createChannel()) {
            /**
             * 生成一个队列
             * 1.队列名称
             * 2.队列里面的消息是否持久化 默认消息存储在内存中
             * 3.该队列是否只供一个消费者进行消费 是否进行共享 true 可以多个消费者消费
             * 4.是否自动删除 最后一个消费者端开连接以后 该队列是否自动删除 true 自动删除
             * 5.其他参数
             */
            channel.queueDeclare(QUEUE_NAME,false,false,false,null);
            String message="hello world";
            /**
             * 发送一个消息
             * 1.发送到那个交换机
             * 2.路由的 key 是哪个
             * 3.其他的参数信息
             * 4.发送消息的消息体
             */
            channel.basicPublish("",QUEUE_NAME,null,message.getBytes());
            System.out.println("消息发送完毕");
        }
    }
}
```

**消息消费者**

```java
public class Consumer {
    private final static String QUEUE_NAME = "hello";
    public static void main(String[] args) throws Exception {
        ConnectionFactory factory = new ConnectionFactory();
        factory.setHost("182.92.234.71");
        factory.setUsername("admin");
        factory.setPassword("123");
        Connection connection = factory.newConnection();
        Channel channel = connection.createChannel();
        System.out.println("等待接收消息....");
        //推送的消息如何进行消费的接口回调
        DeliverCallback deliverCallback=(consumerTag,delivery)->{
            String message= new String(delivery.getBody());
            System.out.println(message);
        };
        //取消消费的一个回调接口 如在消费的时候队列被删除掉了
        CancelCallback cancelCallback=(consumerTag)->{
            System.out.println("消息消费被中断");
        };
        /**
         * 消费者消费消息
         * 1.消费哪个队列
         * 2.消费成功之后是否要自动应答 true 代表自动应答 false 手动应答
         * 3.消费者未成功消费的回调
         */
        channel.basicConsume(QUEUE_NAME,true,deliverCallback,cancelCallback);
    }
}
```

## Work Queues

工作队列(又称任务队列)的主要思想是避免立即执行资源密集型任务，而不得不等待它完成。 相反我们安排任务在之后执行。我们把任务封装为消息并将其发送到队列。在后台运行的工作进程将弹出任务并最终执行作业。当有多个工作线程时，这些工作线程将一起处理这些任务。

### 轮询分发消息

```java
public class RabbitMqUtils {
    //得到一个连接的 channel
    public static Channel getChannel() throws Exception{
        //创建一个连接工厂
        ConnectionFactory factory = new ConnectionFactory();
        factory.setHost("182.92.234.71");
        factory.setUsername("admin");
        factory.setPassword("123");
        Connection connection = factory.newConnection();
        Channel channel = connection.createChannel();
        return channel;
    }
}
```

**启动两个工作线程**

```java
public class Worker01 {
    private static final String QUEUE_NAME="hello";
    public static void main(String[] args) throws Exception {
        Channel channel = RabbitMqUtils.getChannel();
        DeliverCallback deliverCallback=(consumerTag,delivery)->{
            String receivedMessage = new String(delivery.getBody());
            System.out.println("接收到消息:"+receivedMessage);
        };
        CancelCallback cancelCallback=(consumerTag)->{
            System.out.println(consumerTag+"消费者取消消费接口回调逻辑");
        };
        System.out.println("C2 消费者启动等待消费......");
        channel.basicConsume(QUEUE_NAME,true,deliverCallback,cancelCallback);
    }
}
// C1 消费者启动等待消费......
// C2 消费者启动等待消费......
```

![image-20240330150427376](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/RabbitMQ/image-20240330150427376.png)

**启动发送线程**

```java
public class Task01 {
    private static final String QUEUE_NAME="hello";
    public static void main(String[] args) throws Exception {
        try(Channel channel=RabbitMqUtils.getChannel();) {
            channel.queueDeclare(QUEUE_NAME,false,false,false,null);
            //从控制台当中接受信息
            Scanner scanner = new Scanner(System.in);
            while (scanner.hasNext()){
                String message = scanner.next();
                channel.basicPublish("",QUEUE_NAME,null,message.getBytes());
                System.out.println("发送消息完成:"+message);
            }
        }
    }
}
```

**结果**

通过程序执行发现生产者总共发送 4 个消息，消费者 1 和消费者 2 分别分得两个消息，并且 是按照有序的一个接收一次消息

![image-20240330150651051](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/RabbitMQ/image-20240330150651051.png)

### 消息应答

#### 概念

消费者完成一个任务可能需要一段时间，如果其中一个消费者处理一个长的任务并仅只完成了部分突然它挂掉了，会发生什么情况。`RabbitMQ` 一旦向消费者传递了一条消息，便立即将该消息标记为删除。在这种情况下，突然有个消费者挂掉了，我们将丢失正在处理的消息。以及后续发送给该消费者的消息，因为它无法接收到。 

为了保证消息在发送过程中不丢失，`rabbitmq` 引入消息应答机制，消息应答就是：**消费者在接收到消息并且处理该消息之后，告诉 `rabbitmq` 它已经处理了，`rabbitmq` 可以把该消息删除了。** 

#### 自动应答

消息发送后立即被认为已经传送成功，这种模式需要在**高吞吐量和数据传输安全性方面做权衡**，因为这种模式如果消息在接收到之前，消费者那边出现连接或者 `channel` 关闭，那么消息就丢失了，当然另一方面这种模式消费者那边可以传递过载的消息，**没有对传递的消息数量进行限制**， 当然这样有可能使得消费者这边由于接收太多还来不及处理的消息，导致这些消息的积压，最终使得内存耗尽，这些消费者线程被操作系统杀死，**所以这种模式仅适用在消费者可以高效并以某种速率能够处理这些消息的情况下使用。**

![image-20240330151201756](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/RabbitMQ/image-20240330151201756.png)

#### 消息自动重新入队

如果消费者由于某些原因失去连接(其通道已关闭，连接已关闭或 TCP 连接丢失)，导致消息**未发送 ACK 确认**，`RabbitMQ` 将了解到消息未完全处理，并将对其重新排队。如果此时其他消费者可以处理，它将很快将其重新分发给另一个消费者。这样，即使某个消费者偶尔死亡，也可以确 保不会丢失任何消息。

![image-20240330151304835](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/RabbitMQ/image-20240330151304835.png)

#### 手动应答示例

默认消息采用的是自动应答，所以我们要想实现消息消费过程中不丢失，需要把自动应答改为手动应答，消费者在上面代码的基础上增加下面画红色部分代码。

```java
public static void main(String[] args) throws Exception {
        Channel channel = RabbitMqUtils.getChannel();
        DeliverCallback deliverCallback=(consumerTag,delivery)->{
            String receivedMessage = new String(delivery.getBody());
            Thread.sleep(10000L);
          	System.out.println("接收到消息:"+receivedMessage);
          	// 消息标记tag，false表示只应答接收到的那个传递的消息，true为应答所有消息包括传递过来的消息
          	channel.basicAck(delivery.getEnvelope().getDeliveryTag(), false);
        };
        boolean autoAck = false;
  			channel.basicConsume(QUEUE_NAME,autoAck,deliverCallback,consumerTag -> { });
    }
}
```

**消息生产者**

```java
public class Task02 {
    private static final String TASK_QUEUE_NAME = "ack_queue";
    public static void main(String[] argv) throws Exception {
        try (Channel channel = RabbitMqUtils.getChannel()) {
            channel.queueDeclare(TASK_QUEUE_NAME, false, false, false, null);
            Scanner sc = new Scanner(System.in);
            System.out.println("请输入信息");
            while (sc.hasNext()) {
                String message = sc.nextLine();
                channel.basicPublish("", TASK_QUEUE_NAME, null, message.getBytes("UTF-8"));
                System.out.println("生产者发出消息" + message);
            }
        }
    }
}
```

**消费者1**

```java
public class Work03 {
    private static final String ACK_QUEUE_NAME="ack_queue";
    public static void main(String[] args) throws Exception {
        Channel channel = RabbitMqUtils.getChannel();
        System.out.println("C1 等待接收消息处理时间较短");
        //消息消费的时候如何处理消息
        DeliverCallback deliverCallback=(consumerTag,delivery)->{
            String message= new String(delivery.getBody());
            Thread.sleep(1000L);
            System.out.println("接收到消息:"+message);
            /**
             * 1.消息标记 tag
             * 2.是否批量应答未应答消息
             */
            channel.basicAck(delivery.getEnvelope().getDeliveryTag(),false);
        };
        //采用手动应答
        boolean autoAck=false;
        channel.basicConsume(ACK_QUEUE_NAME,autoAck,deliverCallback,(consumerTag)->{
            System.out.println(consumerTag+"消费者取消消费接口回调逻辑");
        });
    }
}
```

**消费者2**

```java
public class Work04 {
    private static final String ACK_QUEUE_NAME="ack_queue";
    public static void main(String[] args) throws Exception {
        Channel channel = RabbitMqUtils.getChannel();
        System.out.println("C2 等待接收消息处理时间较长");
        //消息消费的时候如何处理消息
        DeliverCallback deliverCallback=(consumerTag,delivery)->{
            String message= new String(delivery.getBody());
          	Thread.sleep(30000L);
            System.out.println("接收到消息:"+message);
            /**
             * 1.消息标记 tag
             * 2.是否批量应答未应答消息
             */
            channel.basicAck(delivery.getEnvelope().getDeliveryTag(),false);
        };
        //采用手动应答
        boolean autoAck=false;
        channel.basicConsume(ACK_QUEUE_NAME,autoAck,deliverCallback,(consumerTag)->{
            System.out.println(consumerTag+"消费者取消消费接口回调逻辑");
        });
    }
}
```

**示例结果**

正常情况下消息发送方发送两个消息 C1 和 C2 分别接收到消息并进行处理

![image-20240330152504197](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/RabbitMQ/image-20240330152504197.png)

在发送者发送消息 dd，发出消息之后的把 C2 消费者停掉，按理说该 C2 来处理该消息，但是由于它处理时间较长，在还未处理完，也就是说 C2 还没有执行 ack 代码的时候，C2 被停掉了，此时会看到消息被 C1 接收到了，说明消息 dd 被重新入队，然后分配给能处理消息的 C1 处理了

![image-20240330152630164](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/RabbitMQ/image-20240330152630164.png)

![image-20240330152640740](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/RabbitMQ/image-20240330152640740.png)

### RabbitMQ持久化

刚刚我们已经看到了如何处理任务不丢失的情况，但是如何保障当 `RabbitMQ` 服务停掉以后消息生产者发送过来的消息不丢失。默认情况下 `RabbitMQ` 退出或由于某种原因崩溃时，它忽视队列和消息，除非告知它不要这样做。确保消息不会丢失需要做两件事：**需要将队列和消息都标记为持久化。**

之前我们创建的队列都是非持久化的，`rabbitmq` 如果重启的话，该队列就会被删除掉，如果要队列实现持久化需要在声明队列的时候把 `durable` 参数设置为持久化

> 但是需要注意的就是如果之前声明的队列不是持久化的，需要把原先队列先删除，或者重新创建一个持久化的队列，不然就会出现错误

![image-20240330153042180](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/RabbitMQ/image-20240330153042180.png)

**消息实现持久化**

要想让消息实现持久化需要在消息生产者修改代码，`MessageProperties.PERSISTENT_TEXT_PLAIN` 添加这个属性。

```java
channel.basicPublish("", TASK_QUEUE_NAME, MessageProperties.PERSISTENT_TEXT_PLAIN, message.getBytes("UTF-8"));
```

将消息标记为持久化并不能完全保证不会丢失消息。尽管它告诉 `RabbitMQ` 将消息保存到磁盘，但是这里依然存在当消息刚准备存储在磁盘的时候但是还没有存储完，消息还在缓存的一个间隔点。此时并没有真正写入磁盘。持久性保证并不强，但是对于我们的简单任务队列而言，这已经绰绰有余了。如果需要更强有力的持久化策略。

#### 不公平分发

在最开始的时候我们学习到 `RabbitMQ` 分发消息采用的**轮训分发**，但是在某种场景下这种策略并不是很好，比方说有两个消费者在处理任务，其中有个消费者 1 处理任务的速度非常快，而另外一个消费者 2 处理速度却很慢，这个时候我们还是采用轮训分发的化就会到这处理速度快的这个消费者很大一部分时间 处于空闲状态，而处理慢的那个消费者一直在干活，这种分配方式在这种情况下其实就不太好，但是 RabbitMQ 并不知道这种情况它依然很公平的进行分发。 为了避免这种情况，我们可以设置参数 `channel.basicQos(1)`。

**预取值**

本身消息的发送就是异步发送的，所以在任何时候，`channel` 上肯定不止只有一个消息另外来自消费者的手动确认本质上也是异步的。**因此这里就存在一个未确认的消息缓冲区，因此希望开发人员能限制此缓冲区的大小**，以避免缓冲区里面无限制的未确认消息问题。这个时候就可以通过使用 `basic.qos` 方法设置“预取计数”值来完成的。**该值定义通道上允许的未确认消息的最大数量。**一旦数量达到配置的数量， RabbitMQ 将停止在通道上传递更多消息，除非至少有一个未处理的消息被确认，

例如，假设在通道上有 未确认的消息 5、6、7，8，并且通道的预取计数设置为 4，此时 RabbitMQ 将不会在该通道上再传递任何消息，除非至少有一个未应答的消息被 ack。比方说 tag=6 这个消息刚刚被确认 ACK，RabbitMQ 将会感知这个情况到并再发送一条消息。消息应答和 QoS 预取值对用户吞吐量有重大影响。

通常，增加预取将提高向消费者传递消息的速度。**虽然自动应答传输消息速率是最佳的，但是，在这种情况下已传递但尚未处理的消息的数量也会增加，从而增加了消费者的 RAM 消耗**(随机存取存储器)应该小心使用具有无限预处理 的自动确认模式或手动确认模式，消费者消费了大量的消息如果没有确认的话，会导致消费者连接节点的内存消耗变大，所以找到合适的预取值是一个反复试验的过程，不同的负载该值取值也不同 100 到 300 范 围内的值通常可提供最佳的吞吐量，并且不会给消费者带来太大的风险。预取值为 1 是最保守的。当然这 将使吞吐量变得很低，特别是消费者连接延迟很严重的情况下，特别是在消费者连接等待时间较长的环境中。对于大多数应用来说，稍微高一点的值将是最佳的。

![image-20240331180105945](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/RabbitMQ/image-20240331180105945.png)



## 发布确认

### 发布确认原理

生产者将信道设置成 `confirm` 模式，一旦信道进入 `confirm` 模式，**所有在该信道上面发布的消息都将会被指派一个唯一的 ID(从 1 开始)，**一旦消息被投递到所有匹配的队列之后，broker 就会发送一个确认给生产者(包含消息的唯一 ID)，这就使得生产者知道消息已经正确到达目的队列了。

**如果消息和队列是可持久化的，那么确认消息会在将消息写入磁盘之后发出**，broker 回传给生产者的确认消息中 `delivery-tag` 域包含了确认消息的序列号，此外 broker 也可以设置 basic.ack 的 `multiple` 域，表示到这个序列号之前的所有消息都已经得到了处理。

confirm 模式最大的好处在于他是异步的，一旦发布一条消息，生产者应用程序就可以在等信道返回确认的同时继续发送下一条消息，当消息最终得到确认之后，生产者应用便可以通过回调方法来处理该确认消息，如果 RabbitMQ 因为自身内部错误导致消息丢失，就会发送一条 `nack` 消息，生产者应用程序同样可以在回调方法中处理该 `nack` 消息。

### 发布确认策略

发布确认默认是没有开启的，如果要开启需要调用方法 `confirmSelect`，每当你要想使用发布 确认，都需要在 channel 上调用该方法

**单个确认发布**

这是一种简单的确认方式，它是一种**同步确认发布**的方式，也就是发布一个消息之后只有它被确认发布，后续的消息才能继续发布，`waitForConfirmsOrDie(long)`这个方法只有在消息被确认的时候才返回，如果在指定时间范围内这个消息没有被确认那么它将抛出异常。 这种确认方式有一个最大的缺点就是：**发布速度特别的慢**，因为如果没有确认发布的消息就会阻塞所有后续消息的发布，这种方式最多提供每秒不超过数百条发布消息的吞吐量。当然对于某些应用程序来说这可能已经足够了。

```java
public static void publishMessageIndividually() throws Exception {
    try (Channel channel = RabbitMqUtils.getChannel()) {
        String queueName = UUID.randomUUID().toString();
        channel.queueDeclare(queueName, false, false, false, null);
        //开启发布确认
        channel.confirmSelect();
        long begin = System.currentTimeMillis();
        for (int i = 0; i < MESSAGE_COUNT; i++) {
            String message = i + "";
            channel.basicPublish("", queueName, null, message.getBytes());
            //服务端返回 false 或超时时间内未返回，生产者可以消息重发
            boolean flag = channel.waitForConfirms();
            if(flag){
                System.out.println("消息发送成功");
            }
        }
        long end = System.currentTimeMillis();
        System.out.println("发布" + MESSAGE_COUNT + "个单独确认消息,耗时" + (end - begin) +
                "ms");
    }
}
```

**批量确认发布**

上面那种方式非常慢，与单个等待确认消息相比，先发布一批消息然后一起确认可以极大地 提高吞吐量，当然这种方式的缺点就是：当发生故障导致发布出现问题时，不知道是哪个消息出现问题了，我们必须将整个批处理保存在内存中，以记录重要的信息而后重新发布消息。当然这种方案仍然是同步的，也一样阻塞消息的发布。

```java
public static void publishMessageBatch() throws Exception {
    try (Channel channel = RabbitMqUtils.getChannel()) {
        String queueName = UUID.randomUUID().toString();
        channel.queueDeclare(queueName, false, false, false, null);
        //开启发布确认
        channel.confirmSelect();
        //批量确认消息大小
        int batchSize = 100;
        //未确认消息个数
        int outstandingMessageCount = 0;
        long begin = System.currentTimeMillis();
        for (int i = 0; i < MESSAGE_COUNT; i++) {
            String message = i + "";
            channel.basicPublish("", queueName, null, message.getBytes());
            outstandingMessageCount++;
            if (outstandingMessageCount == batchSize) {
                channel.waitForConfirms();
                outstandingMessageCount = 0;
            }
        }
        //为了确保还有剩余没有确认消息 再次确认
        if (outstandingMessageCount > 0) {
            channel.waitForConfirms();
        }
        long end = System.currentTimeMillis();
        System.out.println("发布" + MESSAGE_COUNT + "个批量确认消息,耗时" + (end - begin) +
                "ms");
    }
}
```

**异步确认发布**

异步确认虽然编程逻辑比上两个要复杂，但是性价比最高，无论是可靠性还是效率都没得说， 他是利用**回调函数**来达到消息可靠性传递的，这个中间件也是通过函数回调来保证是否投递成功。

![image-20240331180758925](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/RabbitMQ/image-20240331180758925.png)

```java
public static void publishMessageAsync() throws Exception {
    try (Channel channel = RabbitMqUtils.getChannel()) {
        String queueName = UUID.randomUUID().toString();
        channel.queueDeclare(queueName, false, false, false, null);
        //开启发布确认
        channel.confirmSelect();
        /**
         * 线程安全有序的一个哈希表，适用于高并发的情况
         * 1.轻松的将序号与消息进行关联
         * 2.轻松批量删除条目 只要给到序列号
         * 3.支持并发访问
         */
        ConcurrentSkipListMap<Long, String> outstandingConfirms = new
                ConcurrentSkipListMap<>();
        /**
         * 确认收到消息的一个回调
         * 1.消息序列号
         * 2.true 可以确认小于等于当前序列号的消息
         * false 确认当前序列号消息
         */
        ConfirmCallback ackCallback = (sequenceNumber, multiple) -> {
            if (multiple) {
                //返回的是小于等于当前序列号的未确认消息 是一个 map
                ConcurrentNavigableMap<Long, String> confirmed =
                        outstandingConfirms.headMap(sequenceNumber, true);
                //清除该部分未确认消息
                confirmed.clear();
            }else{
                //只清除当前序列号的消息
                outstandingConfirms.remove(sequenceNumber);
            }
        };
        ConfirmCallback nackCallback = (sequenceNumber, multiple) -> {
            String message = outstandingConfirms.get(sequenceNumber);
            System.out.println("发布的消息"+message+"未被确认，序列号"+sequenceNumber);
        };
        /**
         * 添加一个异步确认的监听器
         * 1.确认收到消息的回调
         * 2.未收到消息的回调
         */
        channel.addConfirmListener(ackCallback, null);
        long begin = System.currentTimeMillis();
        for (int i = 0; i < MESSAGE_COUNT; i++) {
            String message = "消息" + i;
            /**
             * channel.getNextPublishSeqNo()获取下一个消息的序列号
             * 通过序列号与消息体进行一个关联
             * 全部都是未确认的消息体
             */
            outstandingConfirms.put(channel.getNextPublishSeqNo(), message);
            channel.basicPublish("", queueName, null, message.getBytes());
        }
        long end = System.currentTimeMillis();
        System.out.println("发布" + MESSAGE_COUNT + "个异步确认消息,耗时" + (end - begin) +
                "ms");
    }
}
```

处理异步未确认消息最好的解决方案是把未确认的消息放到一个基于内存的能被发布线程访问的队列， 比如说用 `ConcurrentLinkedQueue` 这个队列在 `confirm callbacks` 与发布线程之间进行消息的传递。

**测试结果**

```java
public static void main(String[] args) throws Exception {
    //这个消息数量设置为 1000 好些 不然花费时间太长
    publishMessagesIndividually();
    publishMessagesInBatch();
    handlePublishConfirmsAsynchronously();
}
//运行结果
//发布 1,000 个单独确认消息耗时 50,278 ms
//发布 1,000 个批量确认消息耗时 635 ms
//发布 1,000 个异步确认消息耗时 92 ms
```

以上 3 种发布确认速度对比 

- 单独发布消息：同步等待确认，简单，但吞吐量非常有限。

- 批量发布消息：批量同步等待确认，简单，合理的吞吐量，一旦出现问题但很难推断出是那条消息出现了问题。
- 异步处理： 最佳性能和资源使用，在出现错误的情况下可以很好地控制，但是实现起来稍微复杂

## 交换机

RabbitMQ 消息传递模型的核心思想是：**生产者生产的消息从不会直接发送到队列**。实际上，通常生产者甚至都不知道这些消息传递传递到了哪些队列中。 

生产者只能将消息发送到交换机(`exchange`)，交换机工作的内容非常简单，一方面它接收来自生产者的消息，另一方面将它们推入队列。交换机必须确切知道如何处理收到的消息。是应该把这些消息放到特定队列还是说把他们到许多队列中还是说应该丢弃它们。这就的由交换机的类型来决定。

![image-20240331181318218](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/RabbitMQ/image-20240331181318218.png)

交换机类型：

1. 直接(`direct`)
2. 主题(`topic`)
3. 标题(`headers`)
4. 扇出(`fanout`)

### Fanout

Fanout是将接收到的所有**消息广播**到它知道的所有队列中。

**示例：使用Fanout广播到两个队列中**

![image-20240331181639109](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/RabbitMQ/image-20240331181639109.png)

`EmitLog` 发送消息给两个消费者接收

```java
public class EmitLog {
    private static final String EXCHANGE_NAME = "logs";
    public static void main(String[] argv) throws Exception {
        try (Channel channel = RabbitUtils.getChannel()) {
            /**
             * 声明一个 exchange
             * 1.exchange 的名称
             * 2.exchange 的类型
             */
            channel.exchangeDeclare(EXCHANGE_NAME, "fanout");
            Scanner sc = new Scanner(System.in);
            System.out.println("请输入信息");
            while (sc.hasNext()) {
                String message = sc.nextLine();
                channel.basicPublish(EXCHANGE_NAME, "", null, message.getBytes("UTF-8"));
                System.out.println("生产者发出消息" + message);
            }
        }
    }
}
```

`ReceiveLogs01` 将接收到的消息打印在控制台

```java
public class ReceiveLogs01 {
    private static final String EXCHANGE_NAME = "logs";
    public static void main(String[] argv) throws Exception {
        Channel channel = RabbitUtils.getChannel();
        channel.exchangeDeclare(EXCHANGE_NAME, "fanout");
        /**
         * 生成一个临时的队列 队列的名称是随机的
         * 当消费者断开和该队列的连接时 队列自动删除
         */
        String queueName = channel.queueDeclare().getQueue();
        //把该临时队列绑定我们的 exchange 其中 routingkey(也称之为 binding key)为空字符串
        channel.queueBind(queueName, EXCHANGE_NAME, "");
        System.out.println("等待接收消息,把接收到的消息打印在屏幕.....");
        DeliverCallback deliverCallback = (consumerTag, delivery) -> {
            String message = new String(delivery.getBody(), "UTF-8");
            System.out.println("控制台打印接收到的消息"+message);
        };
        channel.basicConsume(queueName, true, deliverCallback, consumerTag -> { });
    }
}
```

`ReceiveLogs02` 将接收到的消息存储在磁盘

```java
public class ReceiveLogs02 {
    private static final String EXCHANGE_NAME = "logs";

    public static void main(String[] argv) throws Exception {
        Channel channel = RabbitUtils.getChannel();
        channel.exchangeDeclare(EXCHANGE_NAME, "fanout");
        /**
         * 生成一个临时的队列 队列的名称是随机的
         * 当消费者断开和该队列的连接时 队列自动删除
         */
        String queueName = channel.queueDeclare().getQueue();
        //把该临时队列绑定我们的 exchange 其中 routingkey(也称之为 binding key)为空字符串
        channel.queueBind(queueName, EXCHANGE_NAME, "");
        System.out.println("等待接收消息,把接收到的消息写到文件.....");
        DeliverCallback deliverCallback = (consumerTag, delivery) -> {
            String message = new String(delivery.getBody(), "UTF-8");
            File file = new File("C:\\work\\rabbitmq_info.txt");
            FileUtils.writeStringToFile(file, message, "UTF-8");
            System.out.println("数据写入文件成功");
        };
        channel.basicConsume(queueName, true, deliverCallback, consumerTag -> {
        });
    }
}
```

### `Direct exchange`

**绑定**是交换机和队列之间的桥梁关系。也可以这么理解： 队列只对它绑定的交换机的消息感兴趣。

绑定用参数：`routingKey` 来表示也可称该参数为 `binding key`， 创建绑定我们用代码：`channel.queueBind(queueName, EXCHANGE_NAME, "routingKey");`；绑定之后的意义由其交换类型决定。

**示例**

上一节中的我们的日志系统将所有消息广播给所有消费者，对此我们想做一些改变，例如我们希望**将日志消息写入磁盘的程序仅接收严重错误(errros)，而不存储哪些警告(warning)或信息(info)日志消息避免浪费磁盘空间。**

Fanout 这种交换类型并不能给我们带来很大的灵活性-它只能进行**无意识的广播**，在这里我们将使用 direct 这种类型来进行替换，这种类型的工作方式是，消息只去到它绑定的 `routingKey` 队列中去。

![image-20240331182306533](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/RabbitMQ/image-20240331182306533.png)

```java
public class EmitLogDirect {
    private static final String EXCHANGE_NAME = "direct_logs";
    public static void main(String[] argv) throws Exception {
        try (Channel channel = RabbitUtils.getChannel()) {
            channel.exchangeDeclare(EXCHANGE_NAME, BuiltinExchangeType.DIRECT);
            //创建多个 bindingKey
            Map<String, String> bindingKeyMap = new HashMap<>();
            bindingKeyMap.put("info","普通 info 信息");
            bindingKeyMap.put("warning","警告 warning 信息");
            bindingKeyMap.put("error","错误 error 信息");
            //debug 没有消费这接收这个消息 所有就丢失了
            bindingKeyMap.put("debug","调试 debug 信息");
            for (Map.Entry<String, String> bindingKeyEntry: bindingKeyMap.entrySet()){
                String bindingKey = bindingKeyEntry.getKey();
                String message = bindingKeyEntry.getValue();
                channel.basicPublish(EXCHANGE_NAME,bindingKey, null,
                        message.getBytes("UTF-8"));
                System.out.println("生产者发出消息:" + message);
            }
        }
    }
}

public class ReceiveLogsDirect01 {
    private static final String EXCHANGE_NAME = "direct_logs";
    public static void main(String[] argv) throws Exception {
        Channel channel = RabbitUtils.getChannel();
        channel.exchangeDeclare(EXCHANGE_NAME, BuiltinExchangeType.DIRECT);
        String queueName = "disk";
        channel.queueDeclare(queueName, false, false, false, null);
        channel.queueBind(queueName, EXCHANGE_NAME, "error");
        System.out.println("等待接收消息.....");
        DeliverCallback deliverCallback = (consumerTag, delivery) -> {
            String message = new String(delivery.getBody(), "UTF-8");
            message="接收绑定键:"+delivery.getEnvelope().getRoutingKey()+",消息:"+message;
            File file = new File("C:\\work\\rabbitmq_info.txt");
            FileUtils.writeStringToFile(file,message,"UTF-8");
            System.out.println("错误日志已经接收");
        };
        channel.basicConsume(queueName, true, deliverCallback, consumerTag -> {
        });
    }
}

public class ReceiveLogsDirect02 {
    private static final String EXCHANGE_NAME = "direct_logs";
    public static void main(String[] argv) throws Exception {
        Channel channel = RabbitUtils.getChannel();
        channel.exchangeDeclare(EXCHANGE_NAME, BuiltinExchangeType.DIRECT);
        String queueName = "console";
        channel.queueDeclare(queueName, false, false, false, null);
        channel.queueBind(queueName, EXCHANGE_NAME, "info");
        channel.queueBind(queueName, EXCHANGE_NAME, "warning");
        System.out.println("等待接收消息.....");
        DeliverCallback deliverCallback = (consumerTag, delivery) -> {
            String message = new String(delivery.getBody(), "UTF-8");
            System.out.println(" 接收绑定键 :"+delivery.getEnvelope().getRoutingKey()+", 消
                    息:"+message);
        };
        channel.basicConsume(queueName, true, deliverCallback, consumerTag -> {
        });
    }
}
```

### Topics

在上一个小节中，我们改进了日志记录系统。我们没有使用只能进行随意广播的 fanout 交换机，而是使用了 direct 交换机，从而有能实现有选择性地接收日志。

尽管使用 direct 交换机改进了我们的系统，但是它仍然存在局限性：比如想接收的日志类型有 `info.base` 和 `info.advantage`，某个队列只想 `info.base` 的消息，那这个时候 direct 就办不到了。这个时候就只能使用 topic 类型

发送到类型是 topic 交换机的消息的 `routing_key` 不能随意写，必须满足一定的要求，它必须是一个单词列表，以点号分隔开。这些单词可以是任意单词，比如说："stock.usd.nyse", "nyse.vmw", "quick.orange.rabbit"，这个单词列表最多不能超过 255 个字节。

匹配规则

- `*` 可以代替一个单词
- `#` 可以替代零个或多个单词

![image-20240331182724771](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/RabbitMQ/image-20240331182724771.png)

```java
public class EmitLogTopic {
    private static final String EXCHANGE_NAME = "topic_logs";
    public static void main(String[] argv) throws Exception {
        try (Channel channel = RabbitUtils.getChannel()) {
            channel.exchangeDeclare(EXCHANGE_NAME, "topic");
            /**
             * Q1-->绑定的是
             * 中间带 orange 带 3 个单词的字符串(*.orange.*)
             * Q2-->绑定的是
             * 最后一个单词是 rabbit 的 3 个单词(*.*.rabbit)
             * 第一个单词是 lazy 的多个单词(lazy.#)
             *
             */
            Map<String, String> bindingKeyMap = new HashMap<>();
            bindingKeyMap.put("quick.orange.rabbit","被队列 Q1Q2 接收到");
            bindingKeyMap.put("lazy.orange.elephant","被队列 Q1Q2 接收到");
            bindingKeyMap.put("quick.orange.fox","被队列 Q1 接收到");
            bindingKeyMap.put("lazy.brown.fox","被队列 Q2 接收到");
            bindingKeyMap.put("lazy.pink.rabbit","虽然满足两个绑定但只被队列 Q2 接收一次");
            bindingKeyMap.put("quick.brown.fox","不匹配任何绑定不会被任何队列接收到会被丢弃");
            bindingKeyMap.put("quick.orange.male.rabbit","是四个单词不匹配任何绑定会被丢弃");
            bindingKeyMap.put("lazy.orange.male.rabbit","是四个单词但匹配 Q2");
            for (Map.Entry<String, String> bindingKeyEntry: bindingKeyMap.entrySet()){
                String bindingKey = bindingKeyEntry.getKey();
                String message = bindingKeyEntry.getValue();
                channel.basicPublish(EXCHANGE_NAME,bindingKey, null,
                        message.getBytes("UTF-8"));
                System.out.println("生产者发出消息" + message);
            }
        }
    }
}

public class ReceiveLogsTopic01 {
    private static final String EXCHANGE_NAME = "topic_logs";
    public static void main(String[] argv) throws Exception {
        Channel channel = RabbitUtils.getChannel();
        channel.exchangeDeclare(EXCHANGE_NAME, "topic");
        //声明 Q1 队列与绑定关系
        String queueName="Q1";
        channel.queueDeclare(queueName, false, false, false, null);
        channel.queueBind(queueName, EXCHANGE_NAME, "*.orange.*");
        System.out.println("等待接收消息.....");
        DeliverCallback deliverCallback = (consumerTag, delivery) -> {
            String message = new String(delivery.getBody(), "UTF-8");
            System.out.println(" 接收队列 :"+queueName+" 绑 定
                    键:"+delivery.getEnvelope().getRoutingKey()+",消息:"+message);
        };
        channel.basicConsume(queueName, true, deliverCallback, consumerTag -> {
        });
    }
}

public class ReceiveLogsTopic02 {
    private static final String EXCHANGE_NAME = "topic_logs";
    public static void main(String[] argv) throws Exception {
        Channel channel = RabbitUtils.getChannel();
        channel.exchangeDeclare(EXCHANGE_NAME, "topic");
        //声明 Q2 队列与绑定关系
        String queueName="Q2";
        channel.queueDeclare(queueName, false, false, false, null);
        channel.queueBind(queueName, EXCHANGE_NAME, "*.*.rabbit");
        channel.queueBind(queueName, EXCHANGE_NAME, "lazy.#");
        System.out.println("等待接收消息.....");
        DeliverCallback deliverCallback = (consumerTag, delivery) -> {
            String message = new String(delivery.getBody(), "UTF-8");
            System.out.println(" 接收队列 :"+queueName+" 绑 定
                    键:"+delivery.getEnvelope().getRoutingKey()+",消息:"+message);
        };
        channel.basicConsume(queueName, true, deliverCallback, consumerTag -> {
        });
    }
}
```

## 队列

### Classic 经典队列

这是RabbitMQ最为经典的队列类型。在单机环境中，拥有比较高的消息可靠性。

![image](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/RabbitMQ/56DE9E00653447DBAF78687F8BD25A3F.png)

经典队列可以选择是否持久化(**Durability**)以及是否自动删除(**Auto delete**)两个属性。

### Quorum 仲裁队列

仲裁队列，是RabbitMQ从3.8.0版本，引入的一个新的队列类型。仲裁队列相比Classic经典队列，在分布式环境下对消息的可靠性保障更高。

![image](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/RabbitMQ/D5C38F9FAC6A4D21BAE50FE38C1786D7.png)

Quorum是基于Raft一致性协议实现的一种新型的分布式消息队列，他实现了持久化，多备份的FIFO队列，主要就是针对RabbitMQ的镜像模式设计的。简单理解就是quorum队列中的消息需要有集群中多半节点同意确认后，才会写入到队列中。这种队列类似于RocketMQ当中的DLedger集群。这种方式可以保证消息在集群内部不会丢失。同时，Quorum是以牺牲很多高级队列特性为代价，来进一步保证消息在分布式环境下的高可靠。

Quorum队列与普通队列的区别：

![image](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/RabbitMQ/BCD97037405A4DFC90E6B0977E95E9E8.png)

Quorum队列大部分功能都是在Classic队列基础上做减法，比如`Non-durable queues`表示是非持久化的内存队列。`Exclusivity`表示独占队列，即表示队列只能由声明该队列的`Connection`连接来进行使用，包括队列创建、删除、收发消息等，并且独占队列会在声明该队列的Connection断开后自动删除。

**Quorum队列更适合于 队列长期存在，并且对容错、数据安全方面的要求比低延迟、不持久等高级队列更能要求更严格的场景。**例如 电商系统的订单，引入MQ后，处理速度可以慢一点，但是订单不能丢失。

也对应以下一些不适合使用的场景：

1. 一些临时使用的队列：比如transient临时队列，exclusive独占队列，或者经常会修改和删除的队列。

2. 对消息低延迟要求高：一致性算法会影响消息的延迟。
3. 对数据安全性要求不高：Quorum队列需要消费者手动通知或者生产者手动确认。
4. 队列消息积压严重：如果队列中的消息很大，或者积压的消息很多，就不要使用Quorum队列。Quorum队列当前会将所有消息始终保存在内存中，直到达到内存使用极限。

如果要声明一个Quorum队列，则只需要在后面的arguments中传入一个参数，**x-queue-type**，参数值设定为**quorum**。

```java
Map<String,Object> params = new HashMap<>();
params.put("x-queue-type","quorum");
//声明Quorum队列的方式就是添加一个x-queue-type参数，指定为quorum。默认是classic
channel.queueDeclare(QUEUE_NAME, true, false, false, params);
```

Quorum队列的消息是必须持久化的，所以durable参数必须设定为true，如果声明为false，就会报错。同样，exclusive参数必须设置为false。这些声明，在Producer和Consumer中是要保持一致的。

### Stream 队列

Stream队列是RabbitMQ自3.9.0版本开始引入的一种新的数据队列类型，也是目前官方最为推荐的队列类型。这种队列类型的消息是持久化到磁盘并且具备分布式备份的，更适合于消费者多，读消息非常频繁的场景。

![image](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/RabbitMQ/821A925807514CEF854DB38FBF3C4AAF.png)

```java
Map<String,Object> params = new HashMap<>();
params.put("x-queue-type","stream");
params.put("x-max-length-bytes", 20_000_000_000L); // maximum stream size: 20 GB
params.put("x-stream-max-segment-size-bytes", 100_000_000); // size of segment files: 100 MB
channel.queueDeclare(QUEUE_NAME, true, false, false, params);

// 用原生API创建Stream类型的Consumer时，还必须添加一个参数x-stream-offset，表示从队列的哪个位置开始消费。
Map<String,Object> consumeParam = new HashMap<>();
consumeParam.put("x-stream-offset","last");
channel.basicConsume(QUEUE_NAME, false,consumeParam, myconsumer);
```

Stream队列的核心是以`append-only`只添加的日志来记录消息，整体来说，就是消息将以`append-only`的方式持久化到日志文件中，然后通过调整每个消费者的消费进度`offset`，来实现消息的多次分发。这种队列提供了RabbitMQ已有的其他队列类型不太好实现的四个特点：

1. large fan-outs 大规模分发

当想要向多个订阅者发送相同的消息时，以往的队列类型必须为每个消费者绑定一个专用的队列。如果消费者的数量很大，这就会导致性能低下。而Stream队列允许任意数量的消费者使用同一个队列的消息，从而消除绑定多个队列的需求。

2. Replay/Time-travelling 消息回溯

RabbitMQ已有的这些队列类型，在消费者处理完消息后，消息都会从队列中删除，因此，无法重新读取已经消费过的消息。而Stream队列允许用户在日志的任何一个连接点开始重新读取数据。

3. Throughput Performance 高吞吐性能

Strem队列的设计以性能为主要目标，对消息传递吞吐量的提升非常明显。

4. Large logs 大日志

RabbitMQ一直以来有一个让人诟病的地方，就是当队列中积累的消息过多时，性能下降会非常明显。但是Stream队列的设计目标就是以最小的内存开销高效地存储大量的数据。

整体上来说，RabbitMQ的Stream队列，其实有很多地方借鉴了其他MQ产品的优点，在保证消息可靠性的基础上，着力提高队列的消息吞吐量以及消息转发性能。因此，Stream也是在视图解决一个RabbitMQ一直以来，让人诟病的缺点，就是当队列中积累的消息过多时，性能下降会非常明显的问题。

### 死信队列

死信，顾名思义就是无法被消费的消息，一般来说，`producer` 将消息投递到 `broker` 或者直接到 `queue` 里了，`consumer` 从 `queue` 取出消息进行消费，但某些时候由于特定的原因导致 **`queue` 中的某些消息无法被消费**，这样的消息如果没有后续的处理，就变成了死信，有死信自然就有了死信队列。 

应用场景：为了保证订单业务的消息数据不丢失，需要使用到 `RabbitMQ` 的死信队列机制

- 当消息消费发生异常时，将消息投入死信队列中；
- 用户在商城下单成功并点击去支付后在指定时间未支付时自动失效

死信队列的来源

- 消息 TTL 过期
- 队列达到最大长度(队列满了，无法再添加数据到 mq 中)
- 消息被拒绝(`basic.reject` 或 `basic.nack`)并且 `requeue=false`

![image-20240331183209989](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/RabbitMQ/image-20240331183209989.png)

### 延迟队列

延时队列：队列内部是有序的，最重要的特性就体现在它的延时属性上，延时队列中的元素是希望在指定时间到了以后或之前取出和处理，简单来说，延时队列就是**用来存放需要在指定时间被处理的元素的队列**。

使用场景：

1. 订单在十分钟之内未支付则自动取消；
2. 新创建的店铺，如果在十天内都没有上传过商品，则自动发送消息提醒；
3. 用户注册成功后，如果三天内没有登陆则进行短信提醒；
4. 用户发起退款，如果三天内没有得到处理则通知相关运营人员；
5. 预定会议后，需要在预定的时间点前十分钟通知各个与会人员参加会议

这些场景都有一个特点，需要在某个事件发生之后或者之前的指定时间点完成某一项任务。

比如：发生订单生成事件，在十分钟之后检查该订单支付状态，然后将未支付的订单进行关闭；看起来似乎使用定时任务，一直轮询数据，每秒查一次，取出需要被处理的数据。

如果数据量比较少，确实可以这样做，比如：对于**“如果账单一周内未支付则进行自动结算”**这样的需求， 如果对于时间不是严格限制，而是宽松意义上的一周，那么每天晚上跑个定时任务检查一下所有未支付的账单，确实也是一个可行的方案。

但对于数据量比较大，并且时效性较强的场景，如：**“订单十分钟内未支付则关闭“**，短期内未支付的订单数据可能会有很多，活动期间甚至会达到百万甚至千万级别，对这么庞大的数据量仍旧使用轮询的方式显然是不可取的，很可能在一秒内无法完成所有订单的检查，同时会给数据库带来很大压力，无法满足业务要求而且性能低下。

![image-20240331183931296](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/RabbitMQ/image-20240331183931296.png)

### TTL

`TTL` 是 RabbitMQ 中一个消息或者队列的属性，表明一条消息或者该队列中的所有**消息的最大存活时间**

如果一条消息设置了 `TTL` 属性或者进入了设置 `TTL` 属性的队列，那么这条消息如果在 `TTL` 设置的时间内没有被消费，则会成为**"死信"**。如果同时配置了队列的 TTL 和消息的 TTL，那么较小的那个值将会被使用，有两种方式设置 TTL。

- 针对每条消息设置 TTL：`setExpiration(ttlTime)`
- 创建队列时设置队列的 `x-message-ttl` 属性

**两者的区别**

- 如果设置了队列的 TTL 属性，那么一旦消息过期，就会被队列丢弃(如果配置了死信队列被丢到死信队列中)；

- 针对每条消息设置 TTL，消息即使过期，也不一定会被马上丢弃，因为**消息是否过期是在即将投递到消费者之前判定的**，如果当前队列有严重的消息积压情况，则已过期的消息也许还能存活较长时间；

- 如果不设置 TTL，表示消息永远不会过期，如果将 TTL 设置为 0，则表示除非此时可以直接投递该消息到消费者，否则该消息将会被丢弃。

### 整合`SpringBoot`项目

#### 队列TTL

创建两个队列 QA 和 QB，两者队列 TTL 分别设置为 10S 和 40S，然后在创建一个交换机 X 和死信交 换机 Y，它们的类型都是 direct，创建一个死信队列 QD，它们的绑定关系如下：

![image-20240331184459281](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/RabbitMQ/image-20240331184459281.png)

添加依赖

```xml
<dependencies>
        <!--RabbitMQ 依赖-->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-amqp</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
        <dependency>
            <groupId>com.alibaba</groupId>
            <artifactId>fastjson</artifactId>
            <version>1.2.47</version>
        </dependency>
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
        </dependency>
        <!--RabbitMQ 测试依赖-->
        <dependency>
            <groupId>org.springframework.amqp</groupId>
            <artifactId>spring-rabbit-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>
```

配置文件

```properties
spring.rabbitmq.host=182.92.234.71
spring.rabbitmq.port=5672
spring.rabbitmq.username=admin
spring.rabbitmq.password=123
```

配置类

```java
@Configuration
public class TtlQueueConfig {
    public static final String X_EXCHANGE = "X";
    public static final String QUEUE_A = "QA";
    public static final String QUEUE_B = "QB";
    public static final String Y_DEAD_LETTER_EXCHANGE = "Y";
    public static final String DEAD_LETTER_QUEUE = "QD";

    // 声明 xExchange
    @Bean("xExchange")
    public DirectExchange xExchange() {
        return new DirectExchange(X_EXCHANGE);
    }

    // 声明 xExchange
    @Bean("yExchange")
    public DirectExchange yExchange() {
        return new DirectExchange(Y_DEAD_LETTER_EXCHANGE);
    }

    //声明队列 A ttl 为 10s 并绑定到对应的死信交换机
    @Bean("queueA")
    public Queue queueA() {
        Map<String, Object> args = new HashMap<>(3);
        //声明当前队列绑定的死信交换机
        args.put("x-dead-letter-exchange", Y_DEAD_LETTER_EXCHANGE);
        //声明当前队列的死信路由 key
        args.put("x-dead-letter-routing-key", "YD");
        //声明队列的 TTL
        args.put("x-message-ttl", 10000);
        return QueueBuilder.durable(QUEUE_A).withArguments(args).build();
    }

    // 声明队列 A 绑定 X 交换机
    @Bean
    public Binding queueaBindingX(@Qualifier("queueA") Queue queueA,
                                  @Qualifier("xExchange") DirectExchange xExchange) {
        return BindingBuilder.bind(queueA).to(xExchange).with("XA");
    }

    //声明队列 B ttl 为 40s 并绑定到对应的死信交换机
    @Bean("queueB")
    public Queue queueB() {
        Map<String, Object> args = new HashMap<>(3);
        //声明当前队列绑定的死信交换机
        args.put("x-dead-letter-exchange", Y_DEAD_LETTER_EXCHANGE);
        //声明当前队列的死信路由 key
        args.put("x-dead-letter-routing-key", "YD");
        //声明队列的 TTL
        args.put("x-message-ttl", 40000);
        return QueueBuilder.durable(QUEUE_B).withArguments(args).build();
    }

    //声明队列 B 绑定 X 交换机
    @Bean
    public Binding queuebBindingX(@Qualifier("queueB") Queue queue1B,
                                  @Qualifier("xExchange") DirectExchange xExchange) {
        return BindingBuilder.bind(queue1B).to(xExchange).with("XB");
    }

    //声明死信队列 QD
    @Bean("queueD")
    public Queue queueD() {
        return new Queue(DEAD_LETTER_QUEUE);
    }

    //声明死信队列 QD 绑定关系
    @Bean
    public Binding deadLetterBindingQAD(@Qualifier("queueD") Queue queueD,
                                        @Qualifier("yExchange") DirectExchange yExchange) {
        return BindingBuilder.bind(queueD).to(yExchange).with("YD");
    }
}
```

生产者

生产者的所有属性都已经在`application.properties`配置文件中进行配置。项目启动时，就会在Spring容器中初始化一个`RabbitmqTemplate`对象，然后所有的发送消息操作都通过这个对象来进行。

```java
@Slf4j
@RequestMapping("ttl")
@RestController
public class SendMsgController {
    @Autowired
    private RabbitTemplate rabbitTemplate;

    @GetMapping("sendMsg/{message}")
    public void sendMsg(@PathVariable String message) {
        log.info("当前时间：{},发送一条信息给两个 TTL 队列:{}", new Date(), message);
        rabbitTemplate.convertAndSend("X", "XA", "消息来自 ttl 为 10S 的队列: " + message);
        rabbitTemplate.convertAndSend("X", "XB", "消息来自 ttl 为 40S 的队列: " + message);
    }
}
```

消费者

消费者都是通过`@RabbitListener`注解来声明。在`@RabbitMQListener`注解中包含了非常多对Queue进行定制的属性，大部分的属性都是有默认值的。例如`ackMode`默认是null，就表示自动应答。在日常开发过程中，通常都会简化业务模型，让消费者只要绑定队列消费即可。

```java
@Slf4j
@Component
public class DeadLetterQueueConsumer {
    @RabbitListener(queues = "QD")
    public void receiveD(Message message, Channel channel) throws IOException {
        String msg = new String(message.getBody());
        log.info("当前时间：{},收到死信队列信息{}", new Date().toString(), msg);
    }
}
```

发起一个请求 `http://localhost:8080/ttl/sendMsg/嘻嘻嘻`

![image-20240331185402869](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/RabbitMQ/image-20240331185402869.png)

1. 第一条消息在 10S 后变成了死信消息，然后被消费者消费掉
2. 第二条消息在 40S 之后变成了死信消息， 然后被消费掉，这样一个延时队列就打造完成了。

不过，如果这样使用的话，岂不是**每增加一个新的时间需求，就要新增一个队列**，这里只有 10S 和 40S 两个时间选项，如果需要一个小时后处理，那么就需要增加 TTL 为一个小时的队列，如果是预定会议室然后提前通知这样的场景，岂不是要增加无数个队列才能满足需求？

#### 延时队列优化

新增了一个队列 QC，绑定关系如下，该队列不设置 TTL 时间

![image-20240331185532598](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/RabbitMQ/image-20240331185532598.png)

配置类

```java
@Component
public class MsgTtlQueueConfig {
    public static final String Y_DEAD_LETTER_EXCHANGE = "Y";
    public static final String QUEUE_C = "QC";
    //声明队列 C 死信交换机
    @Bean("queueC")
    public Queue queueB(){
        Map<String, Object> args = new HashMap<>(3);
        //声明当前队列绑定的死信交换机
        args.put("x-dead-letter-exchange", Y_DEAD_LETTER_EXCHANGE);
        //声明当前队列的死信路由 key
        args.put("x-dead-letter-routing-key", "YD");
        //没有声明 TTL 属性
        return QueueBuilder.durable(QUEUE_C).withArguments(args).build();
    }
    //声明队列 B 绑定 X 交换机
    @Bean
    public Binding queuecBindingX(@Qualifier("queueC") Queue queueC,
                                  @Qualifier("xExchange") DirectExchange xExchange){
        return BindingBuilder.bind(queueC).to(xExchange).with("XC");
    }
}
```

消费者

```java
@GetMapping("sendExpirationMsg/{message}/{ttlTime}")
public void sendMsg(@PathVariable String message,@PathVariable String ttlTime) {
    rabbitTemplate.convertAndSend("X", "XC", message, correlationData ->{
        correlationData.getMessageProperties().setExpiration(ttlTime);
        return correlationData;
    });
    log.info("当前时间：{},发送一条时长{}毫秒 TTL 信息给队列 C:{}", new Date(),ttlTime, message);
}
```

发起请求`http://localhost:8080/ttl/sendExpirationMsg/你好 1/20000 http://localhost:8080/ttl/sendExpirationMsg/你好 2/2000`

![image-20240331185734615](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/RabbitMQ/image-20240331185734615.png)

看起来似乎没什么问题，但是在最开始的时候，就介绍过如果使用在消息属性上设置 TTL 的方式，消息可能并不会按时“死亡“，因为 **RabbitMQ 只会检查第一个消息是否过期**，如果过期则丢到死信队列， **如果第一个消息的延时时长很长，而第二个消息的延时时长很短，第二个消息并不会优先得到执行。**

#### 插件实现延迟队列

[插件下载](https://www.rabbitmq.com/community-plugins.html)，下载 `rabbitmq_delayed_message_exchange` 插件，然后解压放置到 RabbitMQ 的插件目录。 进入 RabbitMQ 的安装目录下的 plugins 目录，执行下面命令让该插件生效，然后重启 RabbitMQ 

```sh
/usr/lib/rabbitmq/lib/rabbitmq_server-3.8.8/plugins rabbitmq-plugins enable rabbitmq_delayed_message_exchange
```

![image-20240331190340940](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/RabbitMQ/image-20240331190340940.png)

新增了一个队列 `delayed.queue`,一个自定义交换机 `delayed.exchange`，绑定关系如下:

![image-20240331190402437](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/RabbitMQ/image-20240331190402437.png)

**配置类**

在我们自定义的交换机中，这是一种新的交换类型，该类型消息支持延迟投递机制消息传递后并不会立即投递到目标队列中，而是存储在 `mnesia`(一个分布式数据系统)表中，当达到投递时间时，才投递到目标队列中。

```java
@Configuration
public class DelayedQueueConfig {
    public static final String DELAYED_QUEUE_NAME = "delayed.queue";
    public static final String DELAYED_EXCHANGE_NAME = "delayed.exchange";
    public static final String DELAYED_ROUTING_KEY = "delayed.routingkey";
    @Bean
    public Queue delayedQueue() {
        return new Queue(DELAYED_QUEUE_NAME);
    }
    //自定义交换机 我们在这里定义的是一个延迟交换机
    @Bean
    public CustomExchange delayedExchange() {
        Map<String, Object> args = new HashMap<>();
        //自定义交换机的类型
        args.put("x-delayed-type", "direct");
        return new CustomExchange(DELAYED_EXCHANGE_NAME, "x-delayed-message", true, false,
                args);
    }
    @Bean
    public Binding bindingDelayedQueue(@Qualifier("delayedQueue") Queue queue,
                                       @Qualifier("delayedExchange") CustomExchange
                                               delayedExchange) {
        return
                BindingBuilder.bind(queue).to(delayedExchange).with(DELAYED_ROUTING_KEY).noargs();
    }
}
```

消息生产者

```java
public static final String DELAYED_EXCHANGE_NAME = "delayed.exchange";
public static final String DELAYED_ROUTING_KEY = "delayed.routingkey";
@GetMapping("sendDelayMsg/{message}/{delayTime}")
public void sendMsg(@PathVariable String message,@PathVariable Integer delayTime) {
    rabbitTemplate.convertAndSend(DELAYED_EXCHANGE_NAME, DELAYED_ROUTING_KEY, message,
            correlationData ->{
                correlationData.getMessageProperties().setDelay(delayTime);
                return correlationData;
            });
    log.info(" 当 前 时 间 ： {}, 发送一条延迟 {} 毫秒的信息给队列 delayed.queue:{}", new
            Date(),delayTime, message);
}
```

消费者

```java
public static final String DELAYED_QUEUE_NAME = "delayed.queue";
@RabbitListener(queues = DELAYED_QUEUE_NAME)
public void receiveDelayedQueue(Message message){
    String msg = new String(message.getBody());
    log.info("当前时间：{},收到延时队列的消息：{}", new Date().toString(), msg);
}
```

发起请求： `http://localhost:8080/ttl/sendDelayMsg/come on baby1/20000 http://localhost:8080/ttl/sendDelayMsg/come on baby2/2000`

![image-20240331190701259](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/RabbitMQ/image-20240331190701259.png)

发现第二个消息被先消费掉了，符合预期

### 优先级队列

在我们系统中有一个订单催付的场景，我们的客户在天猫下的订单，淘宝会及时将订单推送给我们，如果在用户设定的时间内未付款那么就会给用户推送一条短信提醒，很简单的一个功能

但是，`tmall` 商家对我们来说，肯定是要分大客户和小客户，比如像苹果，小米这样大商家，他们的订单必须得到优先处理，而曾经我们的后端系统是使用 `redis` 来存放的定时轮询，而 redis 只能用 List 做一个简简单单的消息队列，并不能实现一个优先级的场景， 所以订单量大了后采用 RabbitMQ 进行改造和优化，如果发现是大客户的订单给一个相对比较高的优先级， 否则就是默认优先级。

设置优先级：

1. 控制台页面添加`x-max-priority`
2. 队列中设置`params.put("x-max-priority", 10);`
3. 消息中设置`AMQP.BasicProperties properties = new AMQP.BasicProperties().builder().priority(5).build();`

> 要让队列实现优先级需要做的事情有如下事情：队列需要设置为优先级队列，消息需要设置消息的优先级，消费者需要等待消息已经发送到队列中才去消费，因为这样才有机会对消息进行排序

### 惰性队列

**惰性队列会尽可能的将消息存入磁盘中，而在消费者消费到相应的消息时才会被加载到内存中**，它的一个重要的设计目标是**能够支持更长的队列**，即支持更多的消息存储。当消费者由于各种各样的原因(比如消费者下线、宕机亦或者是由于维护而关闭等)而致使长时间内不能消费消息造成堆积时，惰性队列就很有必要了。

默认情况下，当生产者将消息发送到 RabbitMQ 的时候，队列中的消息会尽可能的存储在内存之中， 这样可以更加快速的将消息发送给消费者。即使是持久化的消息，在被写入磁盘的同时也会在内存中驻留 一份备份。当 RabbitMQ 需要释放内存的时候，会将内存中的消息换页至磁盘中，这个操作会耗费较长的时间，也会阻塞队列的操作，进而无法接收新的消息。

队列具备两种模式：`default` 和 `lazy`。默认的为 default 模式，在 3.6.0 之前的版本无需做任何变更。

lazy 模式即为惰性队列的模式，可以通过调用 `channel.queueDeclare` 方法的时候在参数中设置，也可以通过 `Policy` 的方式设置，如果一个队列同时使用这两种方式设置的话，那么 Policy 的方式具备更高的优先级。

如果要通过声明的方式改变已有队列的模式的话，那么只能先删除队列，然后再重新声明一个新的。 

在队列声明的时候可以通过`“x-queue-mode”`参数来设置队列的模式，取值为“`default`”和“`lazy`”。下面示 例中演示了一个惰性队列的声明细节：

```java
Map<String, Object> args = new HashMap<String, Object>();
args.put("x-queue-mode", "lazy");
channel.queueDeclare("myqueue", false, false, false, args);
```

**内存开销对比**

![image-20240331193117743](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/RabbitMQ/image-20240331193117743.png)

在发送 1 百万条消息，每条消息大概占 1KB 的情况下，普通队列占用内存是 1.2GB，而惰性队列仅仅占用 1.5MB

### 总结

延时队列在需要延时处理的场景下非常有用，使用 RabbitMQ 来实现延时队列可以很好的利用 RabbitMQ 的特性，

如：消息可靠发送、消息可靠投递、死信队列来保障消息至少被消费一次以及未被正确处理的消息不会被丢弃。另外，通过 RabbitMQ 集群的特性，可以很好的解决单点故障问题，不会因为单个节点挂掉导致延时队列不可用或者消息丢失。 

延时队列还有很多其它选择，比如利用 Java 的 `DelayQueue`，利用 Redis 的 `zset`，利用 `Quartz` 或者利用 `kafka` 的时间轮，这些方式各有特点，看需要适用的场景

## RabbitMQ总结

### 如何保证消息不丢失

#### 容易丢失消息的环节

![image.png](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/RabbitMQ/WEBRESOURCE826481ef2e4ca511e97b8a95fcc2e61a.png)

 其中，1，2，4三个场景都是跨网络的，而跨网络就肯定会有丢消息的可能。

然后关于3这个环节，通常MQ存盘时都会先写入操作系统的缓存`page cache`中，然后再由操作系统异步的将消息写入硬盘。这个中间有个时间差，就可能会造成消息丢失。如果服务挂了，缓存中还没有来得及写入硬盘的消息就会丢失。这也是任何用户态的应用程序无法避免的。

 对于任何MQ产品，都应该从这四个方面来考虑数据的安全性。那我们看看用RabbitMQ时要如何解决这个问题。

#### 消息零丢失方案

- 生产者保证消息正确发送到RibbitMQ

 对于单个数据，可以使用生产者确认机制。通过多次确认的方式，保证生产者的消息能够正确的发送到RabbitMQ中。

RabbitMQ的生产者确认机制分为同步确认和异步确认。同步确认主要是通过在生产者端使用`Channel.waitForConfirmsOrDie()`指定一个等待确认的完成时间。异步确认机制则是通过`channel.addConfirmListener(ConfirmCallback var1, ConfirmCallback var2)`在生产者端注入两个回调确认函数。第一个函数是在生产者消息发送成功时调用，第二个函数则是生产者消息发送失败时调用。两个函数需要通过`sequenceNumber`自行完成消息的前后对应。`sequenceNumber`的生成方式需要通过channel的序列获取。`int sequenceNumber = channel.getNextPublishSeqNo();`

当前版本的RabbitMQ，可以在Producer中添加一个`ReturnListener`，监听那些成功发到`Exchange`，但是却没有路由到Queue的消息。如果不想将这些消息返回给Producer，就可以在Exchange中，也可以声明一个`alternate-exchange`参数，将这些无法正常路由的消息转发到指定的备份Exchange上。

如果发送批量消息，在RabbitMQ中，另外还有一种手动事务的方式，可以保证消息正确发送。手动事务机制主要有几个关键的方法：

1. channel.txSelect() 开启事务；
2. channel.txCommit() 提交事务；
3. channel.txRollback() 回滚事务；

用这几个方法来进行事务管理。但是这种方式需要手动控制事务逻辑，并且手动事务会对channel产生阻塞，造成吞吐量下降

- RabbitMQ消息存盘不丢消息

这个在RabbitMQ中比较好处理，对于Classic经典队列，直接将队列声明成为持久化队列即可。而新增的Quorum队列和Stream队列，都是明显的持久化队列，能更好的保证服务端消息不会丢失。

- RabbitMQ 主从消息同步时不丢消息

 这涉及到RabbitMQ的集群架构。首先他的普通集群模式，消息是分散存储的，不会主动进行消息同步了，是有可能丢失消息的。而镜像模式集群，数据会主动在集群各个节点当中同步，这时丢失消息的概率不会太高。

另外，启用`Federation`联邦机制，给包含重要消息的队列建立一个远端备份，也是一个不错的选择。

- RabbitMQ消费者不丢失消息

RabbitMQ在消费消息时可以指定是自动应答，还是手动应答。如果是自动应答模式，消费者会在完成业务处理后自动进行应答，而如果消费者的业务逻辑抛出异常，RabbitMQ会将消息进行重试，这样是不会丢失消息的，但是有可能会造成消息一直重复消费。

将RabbitMQ的应答模式设定为手动应答可以提高消息消费的可靠性。

```java
channel.basicConsume(queueName, false, new DefaultConsumer(channel) {
    @Override
    public void handleDelivery(String consumerTag, Envelope envelope,
                               BasicProperties properties, byte[] body)
      throws IOException {
      long deliveryTag = envelope.getDeliveryTag();
      channel.basicAck(deliveryTag, false);
    }
  });
channel.basicConsume(queueName, true, myconsumer);
```

另外这个应答模式在SpringBoot集成案例中，也可以在配置文件中通过属性`spring.rabbitmq.listener.simple.acknowledge-mode` 进行指定。

可以设定为AUTO 自动应答； MANUAL 手动应答；NONE 不应答；

其中这个NONE不应答，就是不启动应答机制，RabbitMQ只管往消费者推送消息后，就不再重复推送消息了，相当于RocketMQ的`sendoneway`， 这样效率更高，但是显然会有丢消息的可能。

 最后，任何用户态的应用程序都无法保证绝对的数据安全，所以，备份与恢复的方案也需要考虑到。

### 消息幂等

1. RabbitMQ的自动重试功能：

当消费者消费消息处理业务逻辑时，如果抛出异常，或者不向RabbitMQ返回响应，默认情况下，RabbitMQ会无限次数的重复进行消息消费。

处理幂等问题，**首先要设定RabbitMQ的重试次数**。在SpringBoot集成RabbitMQ时，可以在配置文件中指定`spring.rabbitmq.listener.simple.retry`开头的一系列属性，来制定重试策略。

 **然后，需要在业务上处理幂等问题**。处理幂等问题的关键是要给每个消息一个唯一的标识。

在SpringBoot框架集成RabbitMQ后，可以给每个消息指定一个全局唯一的`MessageID`，在消费者端针对`MessageID`做幂等性判断。关键代码：

```java
//发送者指定ID字段
Message message2 = MessageBuilder.withBody(message.getBytes()).setMessageId(UUID.randomUUID().toString()).build();
  rabbitTemplate.send(message2);
//消费者获取MessageID，自己做幂等性判断
@RabbitListener(queues = "fanout_email_queue")
public void process(Message message) throws Exception {
    // 获取消息Id
    String messageId = message.getMessageProperties().getMessageId();
    ...
}
```

> 要注意下这里用的message要是org.springframework.amqp.core.Message

在原生API当中，也是支持`MessageId`的。当然，在实际工作中，最好还是能够添加一个具有业务意义的数据作为唯一键会更好，这样能更好的防止重复消费问题对业务的影响。比如，针对订单消息，那就用订单ID来做唯一键。在RabbitMQ中，消息的头部就是一个很好的携带数据的地方。

```java
// ==== 发送消息时，携带sequenceNumber和orderNo
AMQP.BasicProperties.Builder builder = new AMQP.BasicProperties.Builder();
builder.deliveryMode(MessageProperties.PERSISTENT_TEXT_PLAIN.getDeliveryMode());
builder.priority(MessageProperties.PERSISTENT_TEXT_PLAIN.getPriority());
//携带消息ID
builder.messageId(""+channel.getNextPublishSeqNo());
Map<String, Object> headers = new HashMap<>();
//携带订单号
headers.put("order", "123");
builder.headers(headers);
channel.basicPublish("", QUEUE_NAME, builder.build(), message.getBytes("UTF-8"));

// ==== 接收消息时，拿到sequenceNumber
Consumer myconsumer = new DefaultConsumer(channel) {
   @Override
   public void handleDelivery(String consumerTag, Envelope envelope,
     BasicProperties properties, byte[] body)
     throws IOException {
                //获取消息ID
                System.out.println("messageId:"+properties.getMessageId());
    //获取订单ID
     properties.getHeaders().forEach((key,value)-> System.out.println("key: "+key +"; value: "+value));
     // (process the message components here ...)
     //消息处理完后，进行答复。答复过的消息，服务器就不会再次转发。
     //没有答复过的消息，服务器会一直不停转发。
     channel.basicAck(deliveryTag, false);
   }
  };
channel.basicConsume(QUEUE_NAME, false, myconsumer);
```

### 保证消息的顺序

某些场景下，需要保证消息的消费顺序，例如一个下单过程，需要先完成扣款，然后扣减库存，然后通知快递发货，这个顺序不能乱。如果每个步骤都通过消息进行异步通知的话，这一组消息就必须保证他们的消费顺序是一致的。

在RabbitMQ当中，针对消息顺序的设计其实是比较弱的。唯一比较好的策略就是：**单队列+单消息推送**。即一组有序消息，只发到一个队列中，利用队列的FIFO特性保证消息在队列内顺序不会乱。但是，显然，这是以极度消耗性能作为代价的，在实际适应过程中，应该尽量避免这种场景。

然后在消费者进行消费时，保证只有一个消费者，同时指定**prefetch**属性为1，即每次RabbitMQ都只往客户端推送一个消息。像这样：

```properties
spring.rabbitmq.listener.simple.prefetch=1
```

而在多队列情况下，如何保证消息的顺序性，目前使用RabbitMQ的话，还没有比较好的解决方案。在使用时，应该尽量避免这种情况。

### 消息堆积问题

RabbitMQ一直以来都有一个缺点，就是对于**消息堆积问题**的处理不好。当RabbitMQ中有大量消息堆积时，整体性能会严重下降。而目前新推出的`Quorum`队列以及`Stream`队列，目的就在于解决这个核心问题。但是这两种队列的稳定性和周边生态都还不够完善，目前大部分企业还是围绕`Classic`经典队列构建应用。因此，在使用RabbitMQ时，还是要非常注意消息堆积的问题。尽量让消息的消费速度和生产速度保持一致。

而如果确实出现了消息堆积比较严重的场景，就需要从数据流转的各个环节综合考虑，设计适合的解决方案。

首先在消息生产者端：对于生产者端，最明显的方式自然是降低消息生产的速度。但是，生产者端产生消息的速度通常是跟业务息息相关的，一般情况下不太好直接优化。但是可以选择尽量多采用批量消息的方式，降低IO频率。

然后在RabbitMQ服务端：从前面的分享中也能看出，RabbitMQ本身其实也在着力于提高服务端的消息堆积能力。对于消息堆积严重的队列，可以**预先添加懒加载机制**，或者创建Sharding分片队列，这些措施都有助于优化服务端的消息堆积能力。另外，尝试使用Stream队列，也能很好的提高服务端的消息堆积能力。

接下来在消息消费者端：要提升消费速度最直接的方式，就是增加消费者数量了。尤其当消费端的服务出现问题，已经有大量消息堆积时。这时，可以尽量多的申请机器，部署消费端应用，争取在最短的时间内消费掉积压的消息。但是这种方式需要注意对其他组件的性能压力。

对于单个消费者端，可以通过配置提升消费者端的吞吐量。例如

```properties
# 单次推送消息数量
spring.rabbitmq.listener.simple.prefetch=1
# 消费者的消费线程数量
spring.rabbitmq.listener.simple.concurrency=5
```

灵活配置这几个参数，能够在一定程度上调整每个消费者实例的吞吐量，减少消息堆积数量。

当确实遇到紧急状况，来不及调整消费者端时，可以紧急上线一个消费者组，专门用来将消息快速转录。保存到数据库或者Redis，然后再慢慢进行处理。


