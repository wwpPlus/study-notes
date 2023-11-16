<template><h1 id="redis" tabindex="-1"><a class="header-anchor" href="#redis" aria-hidden="true">#</a> Redis</h1>
<p><a href="https://redis.io/" target="_blank" rel="noopener noreferrer">官网<ExternalLinkIcon/></a></p>
<p><a href="http://www.redis.cn" target="_blank" rel="noopener noreferrer">中文网<ExternalLinkIcon/></a></p>
<h2 id="cap-base" tabindex="-1"><a class="header-anchor" href="#cap-base" aria-hidden="true">#</a> CAP + BASE</h2>
<blockquote>
<p>传统的 ACID 分别是什么？</p>
</blockquote>
<h3 id="acid" tabindex="-1"><a class="header-anchor" href="#acid" aria-hidden="true">#</a> ACID</h3>
<ul>
<li>A (Atomicity) 原子性</li>
</ul>
<blockquote>
<p>原子性很容易理解，也就是说事务里的所有操作要么全部做完，要么都不做，事务成功的条件是事务
里的所有操作都成功，只要有一个操作失败，整个事务就失败，需要回滚。
比如银行转账，从 A 账户转 100 元至 B 账户，分为两个步骤：
1）从 A 账户取 100 元；
2）存入 100 元至 B 账户。
这两步要么一起完成，要么一起不完成，如果只完成第一步，第二步失败，钱会莫名其妙少了 100 元。</p>
</blockquote>
<ul>
<li>C (Consistency) 一致性</li>
</ul>
<blockquote>
<p>事务前后数据的完整性必须保持一致。</p>
</blockquote>
<ul>
<li>I (Isolation) 隔离性</li>
</ul>
<blockquote>
<p>所谓的独立性是指并发的事务之间不会互相影响，如果一个事务要访问的数据正在被另外一个事务修 改，只要另外一个事务未提交，它所访问的数据就不受未提交事务的影
响。比如现有有个交易是从 A 账户转 100 元至 B 账户，在这个交易还未完成的情况下，如果此时 B 查询自己的账户，是看不到新增加 的 100 元的</p>
</blockquote>
<ul>
<li>D (Durability) 持久性</li>
</ul>
<blockquote>
<p>持久性是指一旦事务提交后，它所做的修改将会永久的保存在数据库上，即使出现宕机也不会丢失。</p>
</blockquote>
<h3 id="cap-理论" tabindex="-1"><a class="header-anchor" href="#cap-理论" aria-hidden="true">#</a> CAP 理论</h3>
<ul>
<li>C : Consistency（强一致性）</li>
<li>A : Availability（可用性）</li>
<li>P : Partition tolerance（分区容错性）</li>
</ul>
<p><strong>CAP 理论就是说在分布式存储系统中，最多只能实现上面的两点 。</strong></p>
<blockquote>
<p>而由于当前的网络硬件肯定会出现延迟丢包等问题，所以 分区容错性是我们必须需要实现 的。 所以我们只能在一致性和可用性之间进行权衡，没有 NoSQL 系统能同时保证这三点。 注意：分布式架构的时候必须做出取舍。 一致性和可用性之间取一个平衡。多余大多数 web 应用，其实并不需要强一致性。 因此牺牲 C 换取 P，这是目前分布式数据库产品的方向</p>
</blockquote>
<p><strong>一致性与可用性的决择</strong></p>
<blockquote>
<p>对于 web2.0 网站来说，关系数据库的很多主要特性却往往无用武之地</p>
</blockquote>
<p><strong>数据库事务一致性需求</strong></p>
<blockquote>
<p>很多 web 实时系统并不要求严格的数据库事务，对读一致性的要求很低， 有些场合对写一致性要求并不 高。允许实现最终一致性。</p>
</blockquote>
<p><strong>数据库的写实时性和读实时性需求</strong></p>
<blockquote>
<p>对关系数据库来说，插入一条数据之后立刻查询，是肯定可以读出来这条数据的，但是对于很多 web 应 用来说，并不要求这么高的实时性，比方说发一条消息之 后，过几秒乃至十几秒之后，我的订阅者才看 到这条动态是完全可以接受的。</p>
</blockquote>
<p><strong>对复杂的 SQL 查询，特别是多表关联查询的需求</strong></p>
<blockquote>
<p>任何大数据量的 web 系统，都非常忌讳多个大表的关联查询，以及复杂的数据分析类型的报表查询，特 别是 SNS 类型的网站，从需求以及产品设计角度，就避免了这种情况的产生。往往更多的只是单表的主 键查询，以及单表的简单条件分页查询，SQL 的功能被极大的弱化了。</p>
</blockquote>
<p><strong>CAP 理论的核心</strong> 是：一个分布式系统不可能同时很好的满足一致性，可用性和分区容错性这三个需求， 最多只能同时较好的满足两个。因此，根据 CAP 原理将 NoSQL 数据库分成了满足 CA 原则、满足 CP 原则和满足 AP 原则三
大类：</p>
<ul>
<li>CA - 单点集群，满足一致性，可用性的系统，通常在可扩展性上不太强大。</li>
<li>CP - 满足一致性，分区容忍必的系统，通常性能不是特别高。</li>
<li>AP - 满足可用性，分区容忍性的系统，通常可能对一致性要求低一些。</li>
</ul>
<p><img src="@source/Back/imgs/Redis/1.png" alt="1"></p>
<h3 id="base-理论" tabindex="-1"><a class="header-anchor" href="#base-理论" aria-hidden="true">#</a> BASE 理论</h3>
<blockquote>
<p>BASE 理论是由 eBay 架构师提出的。BASE 是对 CAP 中一致性和可用性权衡的结果，其来源于对大规模互 联网分布式系统实践的总结，是基于 CAP 定律逐步演化而来。其核心思想是即使无法做到强一致性，但 每个应用都可以根据自身业务特点，采用适当的方式来使系统达到最终一致性。</p>
</blockquote>
<p><strong>BASE 就是为了解决关系数据库强一致性引起的问题而引起的可用性降低而提出的解决方案。</strong></p>
<ul>
<li>
<p>基本可用(Basically Available)：基本可用是指分布式系统在出现故障的时候，允许损失部分可用性，即保证核心可用。电商大促时，为了应对访问量激增，部分用户可能会被引导到降级页面，服务层也可能只提供降级服务。这就是损失部分可用性的体现。</p>
</li>
<li>
<p>软状态(Soft State)：软状态是指允许系统存在中间状态，而该中间状态不会影响系统整体可用性。分布式存储中一般一份数据至少会有三个副本，允许不同节点间副本同步的延时就是软状态的体现。MySQL Replication 的异步复制也是一种体现。</p>
</li>
<li>
<p>最终一致性(Eventual Consistency)： 最终一致性是指系统中的所有数据副本经过一定时间后，最终能够达到一致的状态。弱一致性和强一致性相反，最终一致性是弱一致性的一种特殊情况。</p>
</li>
</ul>
<blockquote>
<p>它的思想是通过让系统放松对某一时刻数据一致性的要求来换取系统整体伸缩性和性能上改观。为什么这么说呢，缘由就在于大型系统往往由于地域分布和极高性能的要求，不可能采用分布式事务来完成这些指标，要想获得这些指标，我们必须采用另外一种方式来完成，这里 BASE 就是解决这个问题的办法！</p>
</blockquote>
<ol>
<li>分布式：不同的多台服务器上面部署不同的服务模块（工程），他们之间通过 Rpc 通信和调用，对外提供服务和组内协作。</li>
<li>集群：不同的多台服务器上面部署相同的服务模块，通过分布式调度软件进行统一的调度，对外提供服务和访问。</li>
</ol>
<h2 id="redis-基础" tabindex="-1"><a class="header-anchor" href="#redis-基础" aria-hidden="true">#</a> Redis 基础</h2>
<h3 id="linux-安装" tabindex="-1"><a class="header-anchor" href="#linux-安装" aria-hidden="true">#</a> Linux 安装</h3>
<p><a href="http://download.redis.io/releases/redis-5.0.7.tar.gz" target="_blank" rel="noopener noreferrer">下载地址<ExternalLinkIcon/></a></p>
<ol>
<li>下载获得 redis-5.0.7.tar.gz 后将它放到我们 Linux 的目录下 /opt</li>
<li>/opt 目录下，解压命令 ： tar -zxvf redis-5.0.7.tar.gz</li>
<li>解压完成后出现文件夹：redis-5.0.</li>
<li>进入目录： cd redis-5.0.</li>
<li>在 redis-5.0.7 目录下执行 make 命令</li>
</ol>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 运行make命令时可能会出现的错误解析：</span>
<span class="token comment"># 1. 安装gcc (gcc是linux下的一个编译程序，是c程序的编译工具)</span>
yum <span class="token function">install</span> gcc-c++
<span class="token comment"># 版本测试:</span>
gcc-v
<span class="token comment"># 2. 二次make</span>
<span class="token comment"># 3. Jemalloc/jemalloc.h: 没有那个文件或目录</span>
<span class="token function">make</span> distclean
<span class="token function">make</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><ol start="6">
<li>如果 make 完成后继续执行 make install</li>
<li>查看默认安装目录：usr/local/bin/usr 这是一个非常重要的目录，类似于 windows 下的 Program Files，存放用户的程序</li>
<li>拷贝配置文件（备用）</li>
</ol>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token builtin class-name">cd</span> /usr/local/bin
<span class="token function">ls</span> <span class="token parameter variable">-l</span>
<span class="token comment"># 在redis的解压目录下备份redis.conf</span>
<span class="token function">mkdir</span> myredis
<span class="token function">cp</span> redis.conf myredis  <span class="token comment"># 拷一个备份，养成良好的习惯，我们就修改这个文件</span>
<span class="token comment"># 修改配置保证可以后台应用</span>
<span class="token function">vim</span> redis.conf
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p><img src="@source/Back/imgs/Redis/2.png" alt="2"></p>
<ul>
<li>A、redis.conf 配置文件中 daemonize 守护线程，默认是 NO。</li>
<li>B、daemonize 是用来指定 redis 是否要用守护线程的方式启动。</li>
</ul>
<p><strong>daemonize 设置 yes 或者 no 区别</strong></p>
<ul>
<li>daemonize:yes</li>
</ul>
<p>redis 采用的是单进程多线程的模式。当 redis.conf 中选项 daemonize 设置成 yes 时，代表开启守护进程模式。在该模式下，redis 会在后台运行，并将进程 pid 号写入至 redis.conf 选项 pidfile 设置的文件中，此时 redis 将一直运行，除非手动 kill 该进程。</p>
<ul>
<li>daemonize:no</li>
</ul>
<p>当 daemonize 选项设置成 no 时，当前界面将进入 redis 的命令行界面，exit 强制退出或者关闭连接工具(putty,xshell 等)都会导致 redis 进程退出。</p>
<p><strong>启动测试</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 【shell】启动redis服务</span>
<span class="token builtin class-name">cd</span> /usr/local/bin
redis-server /opt/redis-5.0.7/redis.conf

<span class="token comment"># redis客户端连接===> 观察地址的变化，如果连接ok,是直接连上的，redis默认端口号 6379</span>
redis-cli <span class="token parameter variable">-p</span> <span class="token number">6379</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> <span class="token function">ping</span>
PONG
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> <span class="token builtin class-name">set</span> k1 helloworld
OK
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> get k
<span class="token string">"helloworld"</span>

<span class="token comment"># 【shell】ps显示系统当前进程信息</span>
<span class="token function">ps</span> <span class="token parameter variable">-ef</span> <span class="token operator">|</span> <span class="token function">grep</span> redis
root <span class="token number">16005</span>  <span class="token number">1</span>  <span class="token number">0</span> 04 :45? 00 :00:00 redis-server
<span class="token number">127.0</span>.0.1:
root <span class="token number">16031</span>  <span class="token number">15692</span>  <span class="token number">0</span> 04 :47 pts/0 00 :00:00 redis-cli <span class="token parameter variable">-p</span> <span class="token number">6379</span>
root <span class="token number">16107</span>  <span class="token number">16076</span>  <span class="token number">0</span> 04 :51 pts/2 00 :00:00 <span class="token function">grep</span> <span class="token parameter variable">--color</span><span class="token operator">=</span>auto redis

<span class="token comment"># 【redis】关闭连接</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> <span class="token function">shutdown</span>
not connected<span class="token operator">></span> <span class="token builtin class-name">exit</span>

<span class="token comment"># 【shell】ps显示系统当前进程信息</span>
<span class="token function">ps</span> <span class="token parameter variable">-ef</span> <span class="token operator">|</span> <span class="token function">grep</span> redis
root <span class="token number">16140</span>  <span class="token number">16076</span>  <span class="token number">0</span> 04 :53 pts/2 00 :00:00 <span class="token function">grep</span> <span class="token parameter variable">--color</span><span class="token operator">=</span>auto redis
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br></div></div><h3 id="五大数据类型" tabindex="-1"><a class="header-anchor" href="#五大数据类型" aria-hidden="true">#</a> 五大数据类型</h3>
<h4 id="字符串-string" tabindex="-1"><a class="header-anchor" href="#字符串-string" aria-hidden="true">#</a> 字符串 String</h4>
<blockquote>
<ol>
<li>String 是 redis 最基本的类型，你可以理解成 Memcached 一模一样的类型，一个 key 对应一个 value。<br></li>
<li>String 类型是二进制安全的，意思是 redis 的 string 可以包含任何数据，比如 jpg 图片或者序列化的对象。<br></li>
<li>String 类型是 redis 最基本的数据类型，一个 redis 中字符串 value 最多可以是 512M。<br></li>
</ol>
<p>String 数据结构是简单的 key-value 类型，value 其实不仅可以是 String，也可以是数字。</p>
<p>**常规 key-value 缓存应用：**常规计数：微博数，粉丝数等。</p>
</blockquote>
<p><strong>常用命令说明：</strong></p>
<p><code>单值单Value</code></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment">#### # ===================================================</span>
<span class="token comment"># set、get、del、append、strlen</span>
<span class="token comment"># ===================================================</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> <span class="token builtin class-name">set</span> key1 value1 <span class="token comment"># 设置值</span>
OK
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> get key1  <span class="token comment"># 获得key</span>
<span class="token string">"value1"</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> del key1  <span class="token comment"># 删除key</span>
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">1</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> keys *  <span class="token comment"># 查看全部的key</span>
<span class="token punctuation">(</span>empty list or <span class="token builtin class-name">set</span><span class="token punctuation">)</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> exists key1 <span class="token comment"># 确保 key1 不存在</span>
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">0</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> append key1 <span class="token string">"hello"</span> <span class="token comment"># 对不存在的 key 进行 APPEND ，等同于 SET</span>
key1 <span class="token string">"hello"</span>
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">5</span> <span class="token comment"># 字符长度</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> APPEND key1 <span class="token string">"-2333"</span> <span class="token comment"># 对已存在的字符串进行 APPEND</span>
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">10</span> <span class="token comment"># 长度从 5 个字符增加到 10 个字符</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> get key1
<span class="token string">"hello-2333"</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> STRLEN key1 <span class="token comment"># # 获取字符串的长度</span>
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">10</span>

<span class="token comment"># ===================================================</span>
<span class="token comment"># incr、decr 一定要是数字才能进行加减，+1 和 -1。</span>
<span class="token comment"># incrby、decrby 命令将 key 中储存的数字加上指定的增量值。</span>
<span class="token comment"># ===================================================</span>

<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> <span class="token builtin class-name">set</span> views <span class="token number">0</span> <span class="token comment"># 设置浏览量为 0</span>
OK
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> incr views  <span class="token comment"># 浏览 + 1</span>
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">1</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> incr views  <span class="token comment"># 浏览 + 1</span>
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">2</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> decr views  <span class="token comment"># 浏览 - 1</span>
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">1</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> incrby views <span class="token number">10</span> <span class="token comment"># +10</span>
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">11</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> decrby views <span class="token number">10</span> <span class="token comment"># -10</span>
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">1</span>

<span class="token comment"># ===================================================</span>
<span class="token comment"># range [范围]</span>
<span class="token comment"># getrange 获取指定区间范围内的值，类似between...and的关系，从零到负一表示全部</span>
<span class="token comment"># ===================================================</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> <span class="token builtin class-name">set</span> key2 abcd123456  <span class="token comment"># 设置key2的值</span>
OK
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> getrange key2 <span class="token number">0</span> <span class="token parameter variable">-1</span> <span class="token comment"># 获得全部的值</span>
<span class="token string">"abcd123456"</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> getrange key2 <span class="token number">0</span> <span class="token number">2</span> <span class="token comment"># 截取部分字符串</span>
<span class="token string">"abc"</span>

<span class="token comment"># ===================================================</span>
<span class="token comment"># setrange 设置指定区间范围内的值，格式是setrange key值 具体值</span>
<span class="token comment"># ===================================================</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> get key2
<span class="token string">"abcd123456"</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> SETRANGE key2 <span class="token number">1</span> xx <span class="token comment"># 替换值</span>
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">10</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> get key2
<span class="token string">"axxd123456"</span>

<span class="token comment"># ===================================================</span>
<span class="token comment"># setex（set with expire）键秒值</span>
<span class="token comment"># setnx（set if not exist）</span>
<span class="token comment"># ===================================================</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> setex key3 <span class="token number">60</span> expire  <span class="token comment"># 设置过期时间</span>
OK

<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> ttl key3  <span class="token comment"># 查看剩余的时间</span>
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">55</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> setnx mykey <span class="token string">"redis"</span> <span class="token comment"># 如果不存在就设置，成功返回 1</span>
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">1</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> setnx mykey <span class="token string">"mongodb"</span> <span class="token comment"># 如果存在就设置，失败返回 0</span>
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">0</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> get mykey
<span class="token string">"redis"</span>

<span class="token comment"># ===================================================</span>
<span class="token comment"># mset Mset 命令用于同时设置一个或多个 key-value 对。</span>
<span class="token comment"># mget Mget 命令返回所有(一个或多个)给定 key 的值。</span>
<span class="token comment"># 如果给定的 key 里面，有某个 key 不存在，那么这个 key 返回特殊值 nil 。</span>
<span class="token comment"># msetnx 当所有 key 都成功设置，返回 1 。</span>
<span class="token comment"># 如果所有给定 key 都设置失败(至少有一个 key 已经存在)，那么返回 0 。原子操</span>
作
<span class="token comment"># ===================================================</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> mset k10 v10 k11 v11 k12 v12
OK
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> keys *
<span class="token number">1</span> <span class="token punctuation">)</span> <span class="token string">"k12"</span>
<span class="token number">2</span> <span class="token punctuation">)</span> <span class="token string">"k11"</span>
<span class="token number">3</span> <span class="token punctuation">)</span> <span class="token string">"k10"</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> mget k10 k11 k12 k13
<span class="token number">1</span> <span class="token punctuation">)</span> <span class="token string">"v10"</span>
<span class="token number">2</span> <span class="token punctuation">)</span> <span class="token string">"v11"</span>
<span class="token number">3</span> <span class="token punctuation">)</span> <span class="token string">"v12"</span>
<span class="token number">4</span> <span class="token punctuation">)</span> <span class="token punctuation">(</span>nil<span class="token punctuation">)</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> msetnx k10 v10 k15 v15 <span class="token comment"># 原子性操作！</span>
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">0</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> get key15
<span class="token punctuation">(</span>nil<span class="token punctuation">)</span>

<span class="token comment"># 传统对象缓存</span>
<span class="token builtin class-name">set</span> user:1 value<span class="token punctuation">(</span>json数据<span class="token punctuation">)</span>

<span class="token comment"># 可以用来缓存对象</span>
mset user:1:name zhangsan user:1:age <span class="token number">2</span>
mget user:1:name user:1:age

<span class="token comment"># ===================================================</span>
<span class="token comment"># getset（先get再set）</span>
<span class="token comment"># ===================================================</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> getset db mongodb <span class="token comment"># 没有旧值，返回 nil</span>
<span class="token punctuation">(</span>nil<span class="token punctuation">)</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> get db
<span class="token string">"mongodb"</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> getset db redis <span class="token comment"># 返回旧值 mongodb</span>
<span class="token string">"mongodb"</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> get db
<span class="token string">"redis"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br><span class="line-number">93</span><br><span class="line-number">94</span><br><span class="line-number">95</span><br><span class="line-number">96</span><br><span class="line-number">97</span><br><span class="line-number">98</span><br><span class="line-number">99</span><br><span class="line-number">100</span><br><span class="line-number">101</span><br><span class="line-number">102</span><br><span class="line-number">103</span><br><span class="line-number">104</span><br><span class="line-number">105</span><br><span class="line-number">106</span><br><span class="line-number">107</span><br><span class="line-number">108</span><br><span class="line-number">109</span><br><span class="line-number">110</span><br><span class="line-number">111</span><br><span class="line-number">112</span><br><span class="line-number">113</span><br><span class="line-number">114</span><br><span class="line-number">115</span><br><span class="line-number">116</span><br><span class="line-number">117</span><br><span class="line-number">118</span><br><span class="line-number">119</span><br><span class="line-number">120</span><br></div></div><h4 id="列表-list" tabindex="-1"><a class="header-anchor" href="#列表-list" aria-hidden="true">#</a> 列表 List</h4>
<blockquote>
<p>Redis 列表是简单的字符串列表，按照插入顺序排序，你可以添加一个元素到列表的头部（左边）或者尾部（右边）。<br>
它的底层实际是个链表!
list 就是链表，略有数据结构知识的人都应该能理解其结构。使用 Lists 结构，我们可以轻松地实现最新消息排行等功能。List 的另一个应用就是消息队列，可以利用 List 的 PUSH 操作，将任务存在 List 中，然后工 作线程再用 POP 操作将任务取出进行执行。Redis 还提供了操作 List 中某一段的 api，你可以直接查询，删 除 List 中某一段的元素。
Redis 的 list 是每个子元素都是 String 类型的双向链表，可以通过 push 和 pop 操作从列表的头部或者尾部添加或者删除元素，这样 List 即可以作为栈，也可以作为队列。</p>
</blockquote>
<p><code>单值多Value</code></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment">#### # ===================================================</span>
<span class="token comment"># Lpush：将一个或多个值插入到列表头部。（左）</span>
<span class="token comment"># rpush：将一个或多个值插入到列表尾部。（右）</span>
<span class="token comment"># lrange：返回列表中指定区间内的元素，区间以偏移量 START 和 END 指定。</span>
<span class="token comment"># 其中 0 表示列表的第一个元素， 1 表示列表的第二个元素，以此类推。</span>
<span class="token comment"># 你也可以使用负数下标，以 -1 表示列表的最后一个元素， -2 表示列表的倒数第二个元素，以此</span>
类推。
<span class="token comment"># ===================================================</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> LPUSH list <span class="token string">"one"</span>
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">1</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> LPUSH list <span class="token string">"two"</span>
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">2</span>

<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> RPUSH list <span class="token string">"right"</span>
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">3</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> Lrange list <span class="token number">0</span> <span class="token parameter variable">-1</span>
<span class="token number">1</span> <span class="token punctuation">)</span> <span class="token string">"two"</span>
<span class="token number">2</span> <span class="token punctuation">)</span> <span class="token string">"one"</span>
<span class="token number">3</span> <span class="token punctuation">)</span> <span class="token string">"right"</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> Lrange list <span class="token number">0</span> <span class="token number">1</span>
<span class="token number">1</span> <span class="token punctuation">)</span> <span class="token string">"two"</span>
<span class="token number">2</span> <span class="token punctuation">)</span> <span class="token string">"one"</span>

<span class="token comment"># ===================================================</span>
<span class="token comment"># lpop 命令用于移除并返回列表的第一个元素。当列表 key 不存在时，返回 nil 。</span>
<span class="token comment"># rpop 移除列表的最后一个元素，返回值为移除的元素。</span>
<span class="token comment"># ===================================================</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> Lpop list
<span class="token string">"two"</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> Rpop list
<span class="token string">"right"</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> Lrange list <span class="token number">0</span> <span class="token parameter variable">-1</span>
<span class="token number">1</span> <span class="token punctuation">)</span> <span class="token string">"one"</span>

<span class="token comment"># ===================================================</span>
<span class="token comment"># Lindex，按照索引下标获得元素（-1代表最后一个， 0 代表是第一个）</span>
<span class="token comment"># ===================================================</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> Lindex list <span class="token number">1</span>
<span class="token punctuation">(</span>nil<span class="token punctuation">)</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> Lindex list <span class="token number">0</span>
<span class="token string">"one"</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> Lindex list <span class="token parameter variable">-1</span>
<span class="token string">"one"</span>

<span class="token comment"># ===================================================</span>
<span class="token comment"># llen 用于返回列表的长度。</span>
<span class="token comment"># ===================================================</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> flushdb
OK
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> Lpush list <span class="token string">"one"</span>
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">1</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> Lpush list <span class="token string">"two"</span>
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">2</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> Lpush list <span class="token string">"three"</span>
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">3</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> Llen list <span class="token comment"># 返回列表的长度</span>
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">3</span>

<span class="token comment"># ===================================================</span>
<span class="token comment"># lrem key 根据参数 COUNT 的值，移除列表中与参数 VALUE 相等的元素。</span>
<span class="token comment"># ===================================================</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> lrem list <span class="token number">1</span> <span class="token string">"two"</span>
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">1</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> Lrange list <span class="token number">0</span> <span class="token parameter variable">-1</span>
<span class="token number">1</span> <span class="token punctuation">)</span> <span class="token string">"three"</span>
<span class="token number">2</span> <span class="token punctuation">)</span> <span class="token string">"one"</span>

<span class="token comment"># ===================================================</span>
<span class="token comment"># Ltrim key 对一个列表进行修剪(trim)，就是说，让列表只保留指定区间内的元素，不在指定区</span>
间之内的元素都将被删除。
<span class="token comment"># ===================================================</span>

<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> RPUSH mylist <span class="token string">"hello"</span>
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">1</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> RPUSH mylist <span class="token string">"hello"</span>
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">2</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> RPUSH mylist <span class="token string">"hello2"</span>
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">3</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> RPUSH mylist <span class="token string">"hello3"</span>
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">4</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> ltrim mylist <span class="token number">1</span> <span class="token number">2</span>
OK
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> lrange mylist <span class="token number">0</span> <span class="token parameter variable">-1</span>
<span class="token number">1</span> <span class="token punctuation">)</span> <span class="token string">"hello"</span>
<span class="token number">2</span> <span class="token punctuation">)</span> <span class="token string">"hello2"</span>

<span class="token comment"># ===================================================</span>
<span class="token comment"># rpoplpush 移除列表的最后一个元素，并将该元素添加到另一个列表并返回。</span>
<span class="token comment"># ===================================================</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> rpush mylist <span class="token string">"hello"</span>
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">1</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> rpush mylist <span class="token string">"foo"</span>
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">2</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> rpush mylist <span class="token string">"bar"</span>
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">3</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> rpoplpush mylist myotherlist
<span class="token string">"bar"</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> lrange mylist <span class="token number">0</span> <span class="token parameter variable">-1</span>
<span class="token number">1</span> <span class="token punctuation">)</span> <span class="token string">"hello"</span>
<span class="token number">2</span> <span class="token punctuation">)</span> <span class="token string">"foo"</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> lrange myotherlist <span class="token number">0</span> <span class="token parameter variable">-1</span>
<span class="token number">1</span> <span class="token punctuation">)</span> <span class="token string">"bar"</span>

<span class="token comment"># ===================================================</span>
<span class="token comment"># lset key index value 将列表 key 下标为 index 的元素的值设置为 value 。</span>
<span class="token comment"># ===================================================</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> exists list  <span class="token comment"># 对空列表(key 不存在)进行 LSET</span>
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">0</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> lset list <span class="token number">0</span> item <span class="token comment"># 报错</span>
<span class="token punctuation">(</span>error<span class="token punctuation">)</span> ERR no such key

<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> lpush list <span class="token string">"value1"</span> <span class="token comment"># 对非空列表进行 LSET</span>
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">1</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> lrange list <span class="token number">0</span> <span class="token number">0</span>
<span class="token number">1</span> <span class="token punctuation">)</span> <span class="token string">"value1"</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> lset list <span class="token number">0</span> <span class="token string">"new"</span> <span class="token comment"># 更新值</span>
OK
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> lrange list <span class="token number">0</span> <span class="token number">0</span>
<span class="token number">1</span> <span class="token punctuation">)</span> <span class="token string">"new"</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> lset list <span class="token number">1</span> <span class="token string">"new"</span> <span class="token comment"># index 超出范围报错</span>
<span class="token punctuation">(</span>error<span class="token punctuation">)</span> ERR index out of range

<span class="token comment"># ===================================================</span>
<span class="token comment"># linsert key before/after pivot value 用于在列表的元素前或者后插入元素。</span>
<span class="token comment"># 将值 value 插入到列表 key 当中，位于值 pivot 之前或之后。</span>
<span class="token comment"># ===================================================</span>
redis<span class="token operator">></span> RPUSH mylist <span class="token string">"Hello"</span>
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">1</span>
redis<span class="token operator">></span> RPUSH mylist <span class="token string">"World"</span>
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">2</span>

redis<span class="token operator">></span> LINSERT mylist BEFORE <span class="token string">"World"</span> <span class="token string">"There"</span>
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">3</span>
redis<span class="token operator">></span> LRANGE mylist <span class="token number">0</span> <span class="token parameter variable">-1</span>
<span class="token number">1</span> <span class="token punctuation">)</span> <span class="token string">"Hello"</span>
<span class="token number">2</span> <span class="token punctuation">)</span> <span class="token string">"There"</span>
<span class="token number">3</span> <span class="token punctuation">)</span> <span class="token string">"World"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br><span class="line-number">93</span><br><span class="line-number">94</span><br><span class="line-number">95</span><br><span class="line-number">96</span><br><span class="line-number">97</span><br><span class="line-number">98</span><br><span class="line-number">99</span><br><span class="line-number">100</span><br><span class="line-number">101</span><br><span class="line-number">102</span><br><span class="line-number">103</span><br><span class="line-number">104</span><br><span class="line-number">105</span><br><span class="line-number">106</span><br><span class="line-number">107</span><br><span class="line-number">108</span><br><span class="line-number">109</span><br><span class="line-number">110</span><br><span class="line-number">111</span><br><span class="line-number">112</span><br><span class="line-number">113</span><br><span class="line-number">114</span><br><span class="line-number">115</span><br><span class="line-number">116</span><br><span class="line-number">117</span><br><span class="line-number">118</span><br><span class="line-number">119</span><br><span class="line-number">120</span><br><span class="line-number">121</span><br><span class="line-number">122</span><br><span class="line-number">123</span><br><span class="line-number">124</span><br><span class="line-number">125</span><br><span class="line-number">126</span><br><span class="line-number">127</span><br><span class="line-number">128</span><br><span class="line-number">129</span><br><span class="line-number">130</span><br><span class="line-number">131</span><br><span class="line-number">132</span><br><span class="line-number">133</span><br><span class="line-number">134</span><br><span class="line-number">135</span><br><span class="line-number">136</span><br><span class="line-number">137</span><br></div></div><p><strong>性能总结</strong></p>
<ul>
<li>它是一个字符串链表，left，right 都可以插入添加</li>
<li>如果键不存在，创建新的链表</li>
<li>如果键已存在，新增内容</li>
<li>如果值全移除，对应的键也就消失了</li>
<li>链表的操作无论是头和尾效率都极高，但假如是对中间元素进行操作，效率就很惨淡了。</li>
</ul>
<h4 id="集合-set" tabindex="-1"><a class="header-anchor" href="#集合-set" aria-hidden="true">#</a> 集合 Set</h4>
<blockquote>
<p>Redis 的 Set 是 String 类型的无序集合，它是通过 HashTable 实现的!
在微博应用中，可以将一个用户所有的关注人存在一个集合中，将其所有粉丝存在一个集合。Redis 还为集合提供了求交集、并集、差集等操作，可以非常方便的实现如共同关注、共同喜好、二度好友等功能，对上面的所有集合操作，你还可以使用不同的命令选择将结果返回给客户端还是存集到一个新的集合中。</p>
</blockquote>
<p><code>单值多value</code></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment">#### # ===================================================</span>
<span class="token comment"># sadd 将一个或多个成员元素加入到集合中，不能重复</span>
<span class="token comment"># smembers 返回集合中的所有的成员。</span>
<span class="token comment"># sismember 命令判断成员元素是否是集合的成员。</span>
<span class="token comment"># ===================================================</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> sadd myset <span class="token string">"hello"</span>
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">1</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> sadd myset <span class="token string">"kuangshen"</span>
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">1</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> sadd myset <span class="token string">"kuangshen"</span>
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">0</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> SMEMBERS myset
<span class="token number">1</span> <span class="token punctuation">)</span> <span class="token string">"kuangshen"</span>
<span class="token number">2</span> <span class="token punctuation">)</span> <span class="token string">"hello"</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> SISMEMBER myset <span class="token string">"hello"</span>
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">1</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> SISMEMBER myset <span class="token string">"world"</span>
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">0</span>

<span class="token comment"># ===================================================</span>
<span class="token comment"># scard，获取集合里面的元素个数</span>
<span class="token comment"># ===================================================</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> scard myset
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">2</span>

<span class="token comment"># ===================================================</span>
<span class="token comment"># srem key value 用于移除集合中的一个或多个成员元素</span>
<span class="token comment"># ===================================================</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> srem myset <span class="token string">"kuangshen"</span>
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">1</span>

<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> SMEMBERS myset
<span class="token number">1</span> <span class="token punctuation">)</span> <span class="token string">"hello"</span>

<span class="token comment"># ===================================================</span>
<span class="token comment"># srandmember key 命令用于返回集合中的一个随机元素。</span>
<span class="token comment"># ===================================================</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> SMEMBERS myset
<span class="token number">1</span> <span class="token punctuation">)</span> <span class="token string">"kuangshen"</span>
<span class="token number">2</span> <span class="token punctuation">)</span> <span class="token string">"world"</span>
<span class="token number">3</span> <span class="token punctuation">)</span> <span class="token string">"hello"</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> SRANDMEMBER myset
<span class="token string">"hello"</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> SRANDMEMBER myset <span class="token number">2</span>
<span class="token number">1</span> <span class="token punctuation">)</span> <span class="token string">"world"</span>
<span class="token number">2</span> <span class="token punctuation">)</span> <span class="token string">"kuangshen"</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> SRANDMEMBER myset <span class="token number">2</span>
<span class="token number">1</span> <span class="token punctuation">)</span> <span class="token string">"kuangshen"</span>
<span class="token number">2</span> <span class="token punctuation">)</span> <span class="token string">"hello"</span>

<span class="token comment"># ===================================================</span>
<span class="token comment"># spop key 用于移除集合中的指定 key 的一个或多个随机元素</span>
<span class="token comment"># ===================================================</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> SMEMBERS myset
<span class="token number">1</span> <span class="token punctuation">)</span> <span class="token string">"kuangshen"</span>
<span class="token number">2</span> <span class="token punctuation">)</span> <span class="token string">"world"</span>
<span class="token number">3</span> <span class="token punctuation">)</span> <span class="token string">"hello"</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> spop myset
<span class="token string">"world"</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> spop myset
<span class="token string">"kuangshen"</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> spop myset
<span class="token string">"hello"</span>

<span class="token comment"># ===================================================</span>
<span class="token comment"># smove SOURCE DESTINATION MEMBER</span>
<span class="token comment"># 将指定成员 member 元素从 source 集合移动到 destination 集合。</span>
<span class="token comment"># ===================================================</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> sadd myset <span class="token string">"hello"</span>
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">1</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> sadd myset <span class="token string">"world"</span>
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">1</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> sadd myset <span class="token string">"kuangshen"</span>
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">1</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> sadd myset2 <span class="token string">"set2"</span>
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">1</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> smove myset myset2 <span class="token string">"kuangshen"</span>
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">1</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> SMEMBERS myset
<span class="token number">1</span> <span class="token punctuation">)</span> <span class="token string">"world"</span>
<span class="token number">2</span> <span class="token punctuation">)</span> <span class="token string">"hello"</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> SMEMBERS myset2
<span class="token number">1</span> <span class="token punctuation">)</span> <span class="token string">"kuangshen"</span>
<span class="token number">2</span> <span class="token punctuation">)</span> <span class="token string">"set2"</span>

<span class="token comment"># ===================================================</span>
- 数字集合类
  - 差集： <span class="token function">sdiff</span>
  - 交集： sinter
  - 并集： sunion
<span class="token comment"># ===================================================</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> sadd key1 <span class="token string">"a"</span>
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">1</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> sadd key1 <span class="token string">"b"</span>
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">1</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> sadd key1 <span class="token string">"c"</span>
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">1</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> sadd key2 <span class="token string">"c"</span>
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">1</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> sadd key2 <span class="token string">"d"</span>
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">1</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> sadd key2 <span class="token string">"e"</span>
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">1</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> SDIFF key1 key2 <span class="token comment"># 差集</span>
<span class="token number">1</span> <span class="token punctuation">)</span> <span class="token string">"a"</span>
<span class="token number">2</span> <span class="token punctuation">)</span> <span class="token string">"b"</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> SINTER key1 key2 <span class="token comment"># 交集</span>
<span class="token number">1</span> <span class="token punctuation">)</span> <span class="token string">"c"</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> SUNION key1 key2 <span class="token comment"># 并集</span>
<span class="token number">1</span> <span class="token punctuation">)</span> <span class="token string">"a"</span>
<span class="token number">2</span> <span class="token punctuation">)</span> <span class="token string">"b"</span>
<span class="token number">3</span> <span class="token punctuation">)</span> <span class="token string">"c"</span>
<span class="token number">4</span> <span class="token punctuation">)</span> <span class="token string">"e"</span>
<span class="token number">5</span> <span class="token punctuation">)</span> <span class="token string">"d"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br><span class="line-number">93</span><br><span class="line-number">94</span><br><span class="line-number">95</span><br><span class="line-number">96</span><br><span class="line-number">97</span><br><span class="line-number">98</span><br><span class="line-number">99</span><br><span class="line-number">100</span><br><span class="line-number">101</span><br><span class="line-number">102</span><br><span class="line-number">103</span><br><span class="line-number">104</span><br><span class="line-number">105</span><br><span class="line-number">106</span><br><span class="line-number">107</span><br><span class="line-number">108</span><br><span class="line-number">109</span><br><span class="line-number">110</span><br><span class="line-number">111</span><br><span class="line-number">112</span><br><span class="line-number">113</span><br><span class="line-number">114</span><br></div></div><h4 id="哈希-hash" tabindex="-1"><a class="header-anchor" href="#哈希-hash" aria-hidden="true">#</a> 哈希 Hash</h4>
<blockquote>
<p>Redis hash 是一个键值对集合。<br>
Redis hash 是一个 String 类型的 field 和 value 的映射表，hash 特别适合用于存储对象。<br>
类似 Java 里面的 <code>Map&lt;String,Object&gt;</code><br>
Redis hash 是一个 string 类型的 field 和 value 的映射表，hash 特别适合用于存储对象。存储部分变更的数据，如用户信息等。</p>
</blockquote>
<p><code>kv模式不变，但V是一个键值对</code></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment">#### # ===================================================</span>

<span class="token comment"># hset、hget 命令用于为哈希表中的字段赋值 。</span>
<span class="token comment"># hmset、hmget 同时将多个field-value对设置到哈希表中。会覆盖哈希表中已存在的字段。</span>
<span class="token comment"># hgetall 用于返回哈希表中，所有的字段和值。</span>
<span class="token comment"># hdel 用于删除哈希表 key 中的一个或多个指定字段</span>
<span class="token comment"># ===================================================</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> hset myhash field1 <span class="token string">"kuangshen"</span>
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">1</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> hget myhash field1
<span class="token string">"kuangshen"</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> HMSET myhash field1 <span class="token string">"Hello"</span> field2 <span class="token string">"World"</span>
OK
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> HGET myhash field1
<span class="token string">"Hello"</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> HGET myhash field2
<span class="token string">"World"</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> hgetall myhash
<span class="token number">1</span> <span class="token punctuation">)</span> <span class="token string">"field1"</span>
<span class="token number">2</span> <span class="token punctuation">)</span> <span class="token string">"Hello"</span>
<span class="token number">3</span> <span class="token punctuation">)</span> <span class="token string">"field2"</span>
<span class="token number">4</span> <span class="token punctuation">)</span> <span class="token string">"World"</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> HDEL myhash field1
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">1</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> hgetall myhash
<span class="token number">1</span> <span class="token punctuation">)</span> <span class="token string">"field2"</span>
<span class="token number">2</span> <span class="token punctuation">)</span> <span class="token string">"World"</span>

<span class="token comment"># ===================================================</span>
<span class="token comment"># hlen 获取哈希表中字段的数量。</span>
<span class="token comment"># ===================================================</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> hlen myhash
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">1</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> HMSET myhash field1 <span class="token string">"Hello"</span> field2 <span class="token string">"World"</span>
OK
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> hlen myhash
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">2</span>

<span class="token comment"># ===================================================</span>
<span class="token comment"># hexists 查看哈希表的指定字段是否存在。</span>
<span class="token comment"># ===================================================</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> hexists myhash field1
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">1</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> hexists myhash field3
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">0</span>

<span class="token comment"># ===================================================</span>
<span class="token comment"># hkeys 获取哈希表中的所有域（field）。</span>
<span class="token comment"># hvals 返回哈希表所有域(field)的值。</span>
<span class="token comment"># ===================================================</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> HKEYS myhash
<span class="token number">1</span> <span class="token punctuation">)</span> <span class="token string">"field2"</span>
<span class="token number">2</span> <span class="token punctuation">)</span> <span class="token string">"field1"</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> HVALS myhash
<span class="token number">1</span> <span class="token punctuation">)</span> <span class="token string">"World"</span>
<span class="token number">2</span> <span class="token punctuation">)</span> <span class="token string">"Hello"</span>

<span class="token comment"># ===================================================</span>
<span class="token comment"># hincrby 为哈希表中的字段值加上指定增量值。</span>
<span class="token comment"># ===================================================</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> hset myhash field <span class="token number">5</span>
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">1</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> HINCRBY myhash field <span class="token number">1</span>
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">6</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> HINCRBY myhash field <span class="token parameter variable">-1</span>
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">5</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> HINCRBY myhash field <span class="token parameter variable">-10</span>
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token parameter variable">-5</span>

<span class="token comment"># ===================================================</span>
<span class="token comment"># hsetnx 为哈希表中不存在的的字段赋值 。</span>
<span class="token comment"># ===================================================</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> HSETNX myhash field1 <span class="token string">"hello"</span>
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">1</span> <span class="token comment"># 设置成功，返回 1 。</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> HSETNX myhash field1 <span class="token string">"world"</span>
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">0</span> <span class="token comment"># 如果给定字段已经存在，返回 0 。</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> HGET myhash field1
<span class="token string">"hello"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br></div></div><h4 id="有序集合-zset" tabindex="-1"><a class="header-anchor" href="#有序集合-zset" aria-hidden="true">#</a> 有序集合 Zset</h4>
<blockquote>
<p>Redis zset 和 set 一样，也是 String 类型元素的集合，且不允许重复的成员。<br>
不同的是每个元素都会关联一个 double 类型的分数。<br><br>
Redis 正是通过分数来为集合中的成员进行从小到大的排序，zset 的成员是唯一的，但是分数（Score）<br>
却可以重复。<br>
和 set 相比，sorted set 增加了一个权重参数 score，使得集合中的元素能够按 score 进行有序排列，比如一个存储全班同学成绩的 sorted set，其集合 value 可以是同学的学号，而 score 就可以是其考试得分，这样在数据插入集合的时候，就已经进行了天然的排序。可以用 sorted set 来做带权重的队列，比如普通消息的 score 为 1 ，重要消息的 score 为 2 ，然后工作线程可以选择按 score 的倒序来获取工作任务。让重要的任务优先执行。
排行榜应用，取 TOP N 操作 ！</p>
</blockquote>
<p><code>在set基础上，加一个score值。之前set是k1 v1 v2 v3，现在zset是 k1 score1 v1 score2 v2</code></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment">#### # ===================================================</span>
<span class="token comment"># zadd 将一个或多个成员元素及其分数值加入到有序集当中。</span>
<span class="token comment"># zrange 返回有序集中，指定区间内的成员</span>
<span class="token comment"># ===================================================</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> zadd myset <span class="token number">1</span> <span class="token string">"one"</span>
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">1</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> zadd myset <span class="token number">2</span> <span class="token string">"two"</span> <span class="token number">3</span> <span class="token string">"three"</span>
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">2</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> ZRANGE myset <span class="token number">0</span> <span class="token parameter variable">-1</span>
<span class="token number">1</span> <span class="token punctuation">)</span> <span class="token string">"one"</span>
<span class="token number">2</span> <span class="token punctuation">)</span> <span class="token string">"two"</span>
<span class="token number">3</span> <span class="token punctuation">)</span> <span class="token string">"three"</span>

<span class="token comment"># ===================================================</span>
<span class="token comment"># zrangebyscore 返回有序集合中指定分数区间的成员列表。有序集成员按分数值递增(从小到大)</span>
次序排列。
<span class="token comment"># ===================================================</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> zadd salary <span class="token number">2500</span> xiaoming
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">1</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> zadd salary <span class="token number">5000</span> xiaohong
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">1</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> zadd salary <span class="token number">500</span> kuangshen
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">1</span>
<span class="token comment"># Inf无穷大量+∞,同样地,-∞可以表示为-Inf。</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> ZRANGEBYSCORE salary <span class="token parameter variable">-inf</span> +inf <span class="token comment"># 显示整个有序集</span>
<span class="token number">1</span> <span class="token punctuation">)</span> <span class="token string">"kuangshen"</span>
<span class="token number">2</span> <span class="token punctuation">)</span> <span class="token string">"xiaoming"</span>
<span class="token number">3</span> <span class="token punctuation">)</span> <span class="token string">"xiaohong"</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> ZRANGEBYSCORE salary <span class="token parameter variable">-inf</span> +inf withscores <span class="token comment"># 递增排列</span>
<span class="token number">1</span> <span class="token punctuation">)</span> <span class="token string">"kuangshen"</span>
<span class="token number">2</span> <span class="token punctuation">)</span> <span class="token string">"500"</span>
<span class="token number">3</span> <span class="token punctuation">)</span> <span class="token string">"xiaoming"</span>
<span class="token number">4</span> <span class="token punctuation">)</span> <span class="token string">"2500"</span>
<span class="token number">5</span> <span class="token punctuation">)</span> <span class="token string">"xiaohong"</span>
<span class="token number">6</span> <span class="token punctuation">)</span> <span class="token string">"5000"</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> ZREVRANGE salary <span class="token number">0</span> <span class="token parameter variable">-1</span> WITHSCORES  <span class="token comment"># 递减排列</span>
<span class="token number">1</span> <span class="token punctuation">)</span> <span class="token string">"xiaohong"</span>
<span class="token number">2</span> <span class="token punctuation">)</span> <span class="token string">"5000"</span>
<span class="token number">3</span> <span class="token punctuation">)</span> <span class="token string">"xiaoming"</span>
<span class="token number">4</span> <span class="token punctuation">)</span> <span class="token string">"2500"</span>
<span class="token number">5</span> <span class="token punctuation">)</span> <span class="token string">"kuangshen"</span>
<span class="token number">6</span> <span class="token punctuation">)</span> <span class="token string">"500"</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> ZRANGEBYSCORE salary <span class="token parameter variable">-inf</span> <span class="token number">2500</span> WITHSCORES <span class="token comment"># 显示工资 &lt;=2500</span>
的所有成员
<span class="token number">1</span> <span class="token punctuation">)</span> <span class="token string">"kuangshen"</span>
<span class="token number">2</span> <span class="token punctuation">)</span> <span class="token string">"500"</span>
<span class="token number">3</span> <span class="token punctuation">)</span> <span class="token string">"xiaoming"</span>
<span class="token number">4</span> <span class="token punctuation">)</span> <span class="token string">"2500"</span>

<span class="token comment">#### # ===================================================</span>
<span class="token comment"># zrem 移除有序集中的一个或多个成员</span>
<span class="token comment"># ===================================================</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> ZRANGE salary <span class="token number">0</span> <span class="token parameter variable">-1</span>
<span class="token number">1</span> <span class="token punctuation">)</span> <span class="token string">"kuangshen"</span>
<span class="token number">2</span> <span class="token punctuation">)</span> <span class="token string">"xiaoming"</span>
<span class="token number">3</span> <span class="token punctuation">)</span> <span class="token string">"xiaohong"</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> zrem salary kuangshen
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">1</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> ZRANGE salary <span class="token number">0</span> <span class="token parameter variable">-1</span>
<span class="token number">1</span> <span class="token punctuation">)</span> <span class="token string">"xiaoming"</span>
<span class="token number">2</span> <span class="token punctuation">)</span> <span class="token string">"xiaohong"</span>

<span class="token comment"># ===================================================</span>
<span class="token comment"># zcard 命令用于计算集合中元素的数量。</span>
<span class="token comment"># ===================================================</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> zcard salary
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">2</span>
OK

<span class="token comment"># ===================================================</span>
<span class="token comment"># zcount 计算有序集合中指定分数区间的成员数量。</span>
<span class="token comment"># ===================================================</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> zadd myset <span class="token number">1</span> <span class="token string">"hello"</span>
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">1</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> zadd myset <span class="token number">2</span> <span class="token string">"world"</span> <span class="token number">3</span> <span class="token string">"kuangshen"</span>
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">2</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> ZCOUNT myset <span class="token number">1</span> <span class="token number">3</span>
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">3</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> ZCOUNT myset <span class="token number">1</span> <span class="token number">2</span>
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">2</span>

<span class="token comment"># ===================================================</span>
<span class="token comment"># zrank 返回有序集中指定成员的排名。其中有序集成员按分数值递增(从小到大)顺序排列。</span>
<span class="token comment"># ===================================================</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> zadd salary <span class="token number">2500</span> xiaoming
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">1</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> zadd salary <span class="token number">5000</span> xiaohong
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">1</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> zadd salary <span class="token number">500</span> kuangshen
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">1</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> ZRANGE salary <span class="token number">0</span> <span class="token parameter variable">-1</span> WITHSCORES  <span class="token comment"># 显示所有成员及其 score 值</span>
<span class="token number">1</span> <span class="token punctuation">)</span> <span class="token string">"kuangshen"</span>
<span class="token number">2</span> <span class="token punctuation">)</span> <span class="token string">"500"</span>
<span class="token number">3</span> <span class="token punctuation">)</span> <span class="token string">"xiaoming"</span>
<span class="token number">4</span> <span class="token punctuation">)</span> <span class="token string">"2500"</span>
<span class="token number">5</span> <span class="token punctuation">)</span> <span class="token string">"xiaohong"</span>
<span class="token number">6</span> <span class="token punctuation">)</span> <span class="token string">"5000"</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> zrank salary kuangshen  <span class="token comment"># 显示 kuangshen 的薪水排名，最少</span>
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">0</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> zrank salary xiaohong <span class="token comment"># 显示 xiaohong 的薪水排名，第三</span>
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">2</span>

<span class="token comment"># ===================================================</span>
<span class="token comment"># zrevrank 返回有序集中成员的排名。其中有序集成员按分数值递减(从大到小)排序。</span>
<span class="token comment"># ===================================================</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> ZREVRANK salary bright
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br><span class="line-number">93</span><br><span class="line-number">94</span><br><span class="line-number">95</span><br><span class="line-number">96</span><br><span class="line-number">97</span><br><span class="line-number">98</span><br><span class="line-number">99</span><br><span class="line-number">100</span><br><span class="line-number">101</span><br><span class="line-number">102</span><br><span class="line-number">103</span><br><span class="line-number">104</span><br><span class="line-number">105</span><br><span class="line-number">106</span><br></div></div><h3 id="redis-键-key" tabindex="-1"><a class="header-anchor" href="#redis-键-key" aria-hidden="true">#</a> Redis 键（key）</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># keys * 查看所有的key</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> keys *
<span class="token punctuation">(</span>empty list or <span class="token builtin class-name">set</span><span class="token punctuation">)</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> <span class="token builtin class-name">set</span> name qinjiang
OK
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> keys *
<span class="token number">1</span> <span class="token punctuation">)</span> <span class="token string">"name"</span>

<span class="token comment"># exists key 的名字，判断某个key是否存在</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> EXISTS name
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">1</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> EXISTS name1
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">0</span>

<span class="token comment"># move key db ---> 当前库就没有了，被移除了</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> move name <span class="token number">1</span>
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">1</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> keys *
<span class="token punctuation">(</span>empty list or <span class="token builtin class-name">set</span><span class="token punctuation">)</span>

<span class="token comment"># expire key 秒钟：为给定 key 设置生存时间，当 key 过期时(生存时间为 0 )，它会被自动删</span>
除。
<span class="token comment"># ttl key 查看还有多少秒过期，-1 表示永不过期，-2 表示已过期</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> <span class="token builtin class-name">set</span> name qinjiang
OK

<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> EXPIRE name <span class="token number">10</span>
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">1</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> ttl name
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">4</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> ttl name
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">3</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> ttl name
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">2</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> ttl name
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">1</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> ttl name
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token parameter variable">-2</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> keys *
<span class="token punctuation">(</span>empty list or <span class="token builtin class-name">set</span><span class="token punctuation">)</span>

<span class="token comment"># type key 查看你的key是什么类型</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> <span class="token builtin class-name">set</span> name qinjiang
OK
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> get name
<span class="token string">"qinjiang"</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> <span class="token builtin class-name">type</span> name
string
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br></div></div><h3 id="三种特殊数据类型" tabindex="-1"><a class="header-anchor" href="#三种特殊数据类型" aria-hidden="true">#</a> 三种特殊数据类型</h3>
<h4 id="geo-地理位置" tabindex="-1"><a class="header-anchor" href="#geo-地理位置" aria-hidden="true">#</a> GEO 地理位置</h4>
<blockquote>
<p>Redis 的 GEO 特性在 Redis 3.2 版本中推出， 这个功能可以将用户给定的地理位置信息储存起来， 并对这些信息进行操作。来实现诸如附近位置、摇一摇这类依赖于地理位置信息的功能。geo 的数据类型为 zset。
GEO 的数据结构总共有六个常用命令：geoadd、geopos、geodist、georadius、georadiusbymember、gethash</p>
</blockquote>
<p><a href="https://www.redis.net.cn/order/3685.html" target="_blank" rel="noopener noreferrer">官方文档<ExternalLinkIcon/></a></p>
<h5 id="geoadd" tabindex="-1"><a class="header-anchor" href="#geoadd" aria-hidden="true">#</a> geoadd</h5>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 语法</span>
geoadd key longitude latitude member<span class="token punctuation">..</span>.

<span class="token comment"># 将给定的空间元素(纬度、经度、名字)添加到指定的键里面。</span>
<span class="token comment"># 这些数据会以有序集he的形式被储存在键里面，从而使得georadius和georadiusbymember这样的命令可以在之后通过位置查询取得这些元素。</span>
<span class="token comment"># geoadd命令以标准的x,y格式接受参数,所以用户必须先输入经度,然后再输入纬度。</span>
<span class="token comment"># geoadd能够记录的坐标是有限的:非常接近两极的区域无法被索引。</span>
<span class="token comment"># 有效的经度介于-180-180度之间，有效的纬度介于-85.05112878 度至 85.05112878 度之间。，当用户尝试输入一个超出范围的经度或者纬度时,geoadd命令将返回一个错误。</span>

<span class="token comment"># 测试：百度搜索经纬度查询，模拟真实数据</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> geoadd china:city <span class="token number">116.23</span> <span class="token number">40.22</span> 北京 <span class="token number">121.48</span> <span class="token number">31.40</span> 上海 <span class="token number">106.54</span> <span class="token number">29.40</span> 重庆 <span class="token number">108.93</span> <span class="token number">34.23</span> 西安
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">4</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><h5 id="geopos" tabindex="-1"><a class="header-anchor" href="#geopos" aria-hidden="true">#</a> geopos</h5>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>geopos key member <span class="token punctuation">[</span>member<span class="token punctuation">..</span>.<span class="token punctuation">]</span>
<span class="token comment">#从key里返回所有给定位置元素的位置（经度和纬度）</span>

<span class="token comment"># 测试：</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> geopos china:city 上海
<span class="token number">1</span> <span class="token punctuation">)</span> <span class="token number">1</span> <span class="token punctuation">)</span> <span class="token string">"121.48000091314315796"</span>
<span class="token number">2</span> <span class="token punctuation">)</span> <span class="token string">"31.40000025319353938"</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> geopos china:city 新疆
<span class="token number">1</span> <span class="token punctuation">)</span> <span class="token punctuation">(</span>nil<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h5 id="geodist" tabindex="-1"><a class="header-anchor" href="#geodist" aria-hidden="true">#</a> geodist</h5>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>geodist key member1 member2 <span class="token punctuation">[</span>unit<span class="token punctuation">]</span>

<span class="token comment"># 返回两个给定位置之间的距离，如果两个位置之间的其中一个不存在,那么命令返回空值。</span>
<span class="token comment"># 指定单位的参数unit必须是以下单位的其中一个：</span>
<span class="token comment"># m表示单位为米 km表示单位为千米 mi表示单位为英里 ft表示单位为英尺</span>
<span class="token comment"># 如果用户没有显式地指定单位参数,那么geodist默认使用米作为单位。</span>
<span class="token comment"># geodist命令在计算距离时会假设地球为完美的球形,在极限情况下,这一假设最大会造成0.5%的误差。</span>

<span class="token comment"># 测试：</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> geodist china:city 北京 上海
<span class="token string">"1088785.4302"</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> geodist china:city 北京 上海 km
<span class="token string">"1088.7854"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><h5 id="georadius" tabindex="-1"><a class="header-anchor" href="#georadius" aria-hidden="true">#</a> georadius</h5>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 语法</span>
georadius key longitude latitude radius m<span class="token operator">|</span>km<span class="token operator">|</span>ft<span class="token operator">|</span>mi <span class="token punctuation">[</span>withcoord<span class="token punctuation">]</span><span class="token punctuation">[</span>withdist<span class="token punctuation">]</span>
<span class="token punctuation">[</span>withhash<span class="token punctuation">]</span><span class="token punctuation">[</span>asc<span class="token operator">|</span>desc<span class="token punctuation">]</span><span class="token punctuation">[</span>count count<span class="token punctuation">]</span>
<span class="token comment"># 以给定的经纬度为中心， 找出某一半径内的元素</span>

<span class="token comment"># 测试：重新连接 redis-cli，增加参数 --raw ，可以强制输出中文，不然会乱码</span>
redis-cli <span class="token parameter variable">--raw</span> <span class="token parameter variable">-p</span> <span class="token number">6379</span>
<span class="token comment"># 在 china:city 中寻找坐标 100 30 半径为 1000km 的城市</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> georadius china:city <span class="token number">100</span> <span class="token number">30</span> <span class="token number">1000</span> km
重庆
西安

<span class="token comment"># withdist 返回位置名称和中心距离</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> georadius china:city <span class="token number">100</span> <span class="token number">30</span> <span class="token number">1000</span> km withdist
重庆
<span class="token number">635.2850</span>
西安
<span class="token number">963.3171</span>

<span class="token comment"># withcoord 返回位置名称和经纬度</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> georadius china:city <span class="token number">100</span> <span class="token number">30</span> <span class="token number">1000</span> km withcoord
重庆
<span class="token number">106.54000014066696167</span>
<span class="token number">29.39999880018641676</span>
西安
<span class="token number">108.92999857664108276</span>
<span class="token number">34.23000121926852302</span>

<span class="token comment"># withdist withcoord 返回位置名称 距离 和经纬度 count 限定寻找个数</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> georadius china:city <span class="token number">100</span> <span class="token number">30</span> <span class="token number">1000</span> km withcoord withdist count
<span class="token number">1</span>
重庆
<span class="token number">635.2850</span>
<span class="token number">106.54000014066696167</span>
<span class="token number">29.39999880018641676</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br></div></div><h5 id="georadiusbymember" tabindex="-1"><a class="header-anchor" href="#georadiusbymember" aria-hidden="true">#</a> georadiusbymember</h5>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment">#### # 语法</span>
georadiusbymember key member radius m<span class="token operator">|</span>km<span class="token operator">|</span>ft<span class="token operator">|</span>mi <span class="token punctuation">[</span>withcoord<span class="token punctuation">]</span><span class="token punctuation">[</span>withdist<span class="token punctuation">]</span>
<span class="token punctuation">[</span>withhash<span class="token punctuation">]</span><span class="token punctuation">[</span>asc<span class="token operator">|</span>desc<span class="token punctuation">]</span><span class="token punctuation">[</span>count count<span class="token punctuation">]</span>
<span class="token comment"># 找出位于指定范围内的元素，中心点是由给定的位置元素决定</span>

<span class="token comment"># 测试：</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> GEORADIUSBYMEMBER china:city 北京 <span class="token number">1000</span> km
北京
西安
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h5 id="geohash" tabindex="-1"><a class="header-anchor" href="#geohash" aria-hidden="true">#</a> geohash</h5>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 语法</span>
geohash key member <span class="token punctuation">[</span>member<span class="token punctuation">..</span>.<span class="token punctuation">]</span>
<span class="token comment"># Redis使用geohash将二维经纬度转换为一维字符串，字符串越长表示位置更精确,两个字符串越相似表示距离越近。</span>

<span class="token comment"># 测试：</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> geohash china:city 北京 上海
wx4sucu47r0
wtw6sk5n300
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><h5 id="zrem" tabindex="-1"><a class="header-anchor" href="#zrem" aria-hidden="true">#</a> zrem</h5>
<blockquote>
<p>GEO 没有提供删除成员的命令，但是因为 GEO 的底层实现是 zset，所以可以借用 zrem 命令实现对地理位置信息的删除.</p>
</blockquote>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> geoadd china:city <span class="token number">116.23</span> <span class="token number">40.22</span> beijin
<span class="token number">1</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> zrange china:city <span class="token number">0</span> <span class="token parameter variable">-1</span> <span class="token comment"># 查看全部的元素</span>
重庆
西安
上海
beijin
北京
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> zrem china:city beijin  <span class="token comment"># 移除元素</span>
<span class="token number">1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><h4 id="hyperloglog" tabindex="-1"><a class="header-anchor" href="#hyperloglog" aria-hidden="true">#</a> HyperLogLog</h4>
<p><strong>简介</strong></p>
<p>Redis 在 2.8.9 版本添加了 HyperLogLog 结构。
Redis HyperLogLog 是用来做基数统计的算法，HyperLogLog 的优点是，在输入元素的数量或者体积 非常非常大时，计算基数所需的空间总是固定 的、并且是很小的。
在 Redis 里面，每个 HyperLogLog 键只需要花费 12 KB 内存，就可以计算接近 2^64 个不同元素的基 数。这和计算基数时，元素越多耗费内存就越多的集合形成鲜明对比。</p>
<blockquote>
<p>HyperLogLog 则是一种算法，它提供了不精确的去重计数方案。举个栗子：假如我要统计网页的 UV（浏览用户数量，一天内同一个用户多次访问只能算一次），传统的解决方案是使用 Set 来保存用户 id，然后统计 Set 中的元素数量来获取页面 UV。但这种方案只能承载少量用户，一旦用户数量大起来就需要消耗大量的空间来存储用户 id。我的目的是统计用户数量而不是保存用户，这简直是个吃力不讨好的方案！而使用 Redis 的 HyperLogLog 最多需要 12k 就可以统计大量的用户数，尽管它大概有 0.81%的错误率，但对于统计 UV 这种不需要很精确的数据是可以忽略不计的。</p>
</blockquote>
<p>**基数：**比如数据集 {1, 3, 5, 7, 5, 7, 8}， 那么这个数据集的基数集为 {1, 3, 5 ,7, 8}, 基数(不重复元素)为 5 。基数估计就是在误差可接受的范围内，快速计算基数。</p>
<h5 id="基本命令" tabindex="-1"><a class="header-anchor" href="#基本命令" aria-hidden="true">#</a> 基本命令</h5>
<table>
<thead>
<tr>
<th>命令</th>
<th>描述</th>
</tr>
</thead>
<tbody>
<tr>
<td>PFADD key element [element...]</td>
<td>添加指定元素到 HyperLogLog 中。</td>
</tr>
<tr>
<td>PFCOUNT key [key...]</td>
<td>返回给定 HyperLogLog 的基数估算值。</td>
</tr>
<tr>
<td>PFMERGE destkey sourcekey[sourcekey...]</td>
<td>将多个 HyperLogLog 合并为一个 HyperLogLog，并集计算</td>
</tr>
</tbody>
</table>
<h5 id="示例" tabindex="-1"><a class="header-anchor" href="#示例" aria-hidden="true">#</a> 示例</h5>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token number">127.0</span>.0.1: <span class="token number">6379</span> <span class="token operator">></span> PFADD mykey a b c d e f g h i j
<span class="token number">1</span>
<span class="token number">127.0</span>.0.1: <span class="token number">6379</span> <span class="token operator">></span> PFCOUNT mykey
<span class="token number">10</span>
<span class="token number">127.0</span>.0.1: <span class="token number">6379</span> <span class="token operator">></span> PFADD mykey2 i j z x c <span class="token function">v</span> b n m
<span class="token number">1</span>
<span class="token number">127.0</span>.0.1: <span class="token number">6379</span> <span class="token operator">></span> PFMERGE mykey3 mykey mykey2
OK
<span class="token number">127.0</span>.0.1: <span class="token number">6379</span> <span class="token operator">></span> PFCOUNT mykey3
<span class="token number">15</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><h4 id="bitmap" tabindex="-1"><a class="header-anchor" href="#bitmap" aria-hidden="true">#</a> BitMap</h4>
<p><strong>简介</strong></p>
<p>在开发中，可能会遇到这种情况：需要统计用户的某些信息，如活跃或不活跃，登录或者不登录；又如需要记录用户一年的打卡情况，打卡了是 1 ， 没有打卡是 0 ，如果使用普通的 key/value 存储，则要记录 365 条记录，如果用户量很大，需要的空间也会很大，所以 Redis 提供了 Bitmap 位图这中数据结构，Bitmap 就是通过操作二进制位来进行记录，即为 0 和 1；如果要记录 365 天的打卡情况，使用 Bitmap 表示的形式大概如下：0101000111000111...，这样就可以大幅度节约内存， 365 天相当于 365 bit，又 1 字节 = 8 bit , 所以相当于使用 46 个字节即可。</p>
<blockquote>
<p>BitMap 就是通过一个 bit 位来表示某个元素对应的值或者状态, 其中的 key 就是对应元素本身，实际上底层也是通过对字符串的操作来实现。Redis 从 2.2 版本之后新增了 setbit, getbit, bitcount 等几个 bitmap 相关命令。</p>
</blockquote>
<h5 id="setbit-设置操作" tabindex="-1"><a class="header-anchor" href="#setbit-设置操作" aria-hidden="true">#</a> setbit 设置操作</h5>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>SETBIT key offset value <span class="token builtin class-name">:</span> 设置 key 的第 offset 位为 value <span class="token punctuation">(</span><span class="token number">1</span> 或 <span class="token number">0</span><span class="token punctuation">)</span>
<span class="token comment"># 使用 bitmap 来记录上述事例中一周的打卡记录如下所示：</span>
<span class="token comment"># 周一： 1 ，周二： 0 ，周三： 0 ，周四： 1 ，周五： 1 ，周六： 0 ，周天： 0 （ 1 为打卡， 0 为不打卡）</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> setbit sign <span class="token number">0</span> <span class="token number">1</span>
<span class="token number">0</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> setbit sign <span class="token number">1</span> <span class="token number">0</span>
<span class="token number">0</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> setbit sign <span class="token number">2</span> <span class="token number">0</span>
<span class="token number">0</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> setbit sign <span class="token number">3</span> <span class="token number">1</span>
<span class="token number">0</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> setbit sign <span class="token number">4</span> <span class="token number">1</span>
<span class="token number">0</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> setbit sign <span class="token number">5</span> <span class="token number">0</span>
<span class="token number">0</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> setbit sign <span class="token number">6</span> <span class="token number">0</span>
<span class="token number">0</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><h5 id="getbit-获取操作" tabindex="-1"><a class="header-anchor" href="#getbit-获取操作" aria-hidden="true">#</a> getbit 获取操作</h5>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>GETBIT key offset 获取 offset 设置的值，未设置过默认返回 <span class="token number">0</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> getbit sign <span class="token number">3</span> <span class="token comment"># 查看周四是否打卡</span>
<span class="token number">1</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> getbit sign <span class="token number">6</span> <span class="token comment"># 查看周七是否打卡</span>
<span class="token number">0</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h5 id="bitcount-统计操作" tabindex="-1"><a class="header-anchor" href="#bitcount-统计操作" aria-hidden="true">#</a> bitcount 统计操作</h5>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>bitcount key <span class="token punctuation">[</span>start, end<span class="token punctuation">]</span> 统计 key 上位为 <span class="token number">1</span> 的个数
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> bitcount sign
<span class="token number">3</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h2 id="redis-事务" tabindex="-1"><a class="header-anchor" href="#redis-事务" aria-hidden="true">#</a> Redis 事务</h2>
<h3 id="理论" tabindex="-1"><a class="header-anchor" href="#理论" aria-hidden="true">#</a> 理论</h3>
<p><strong>Redis 事务</strong></p>
<blockquote>
<p>Redis 事务的本质是一组命令的集合。事务支持一次执行多个命令，一个事务中所有命令都会被序列化。在事务执行过程，会按照顺序串行化执行队列中的命令，其他客户端提交的命令请求不会插入到事务执行命令序列中。<br/>
总结说：redis 事务就是一次性、顺序性、排他性的执行一个队列中的一系列命令。</p>
</blockquote>
<p><strong>Redis 事务没有隔离级别的概念</strong></p>
<blockquote>
<p>批量操作在发送 <code>EXEC</code> 命令前被放入队列缓存，并不会被实际执行！</p>
</blockquote>
<p><strong>Redis 不保证原子性</strong></p>
<blockquote>
<p>Redis 中，单条命令是原子性执行的，但事务不保证原子性，且没有回滚。事务中任意命令执行失败，其余的命令仍会被执行。</p>
</blockquote>
<p><strong>Redis 事务的三个阶段</strong></p>
<blockquote>
<ul>
<li>开始事务</li>
<li>命令入队</li>
<li>执行事务</li>
</ul>
</blockquote>
<h3 id="事务相关命令" tabindex="-1"><a class="header-anchor" href="#事务相关命令" aria-hidden="true">#</a> 事务相关命令</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">watch</span> key1 key2<span class="token punctuation">..</span>.  <span class="token comment">#监视一或多个key,如果在事务执行之前，被监视的key被其他命令改动，则事务被打断 （ 类似乐观锁 ）</span>
multi <span class="token comment"># 标记一个事务块的开始（ queued ）</span>
<span class="token builtin class-name">exec</span> <span class="token comment"># 执行所有事务块的命令 （ 一旦执行exec后，之前加的监控锁都会被取消掉 ）</span>
discard <span class="token comment"># 取消事务，放弃事务块中的所有命令</span>
unwatch <span class="token comment"># 取消watch对所有key的监控</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h3 id="实践" tabindex="-1"><a class="header-anchor" href="#实践" aria-hidden="true">#</a> 实践</h3>
<p><strong>正常执行</strong></p>
<p><img src="@source/Back/imgs/Redis/2.png" alt="2"></p>
<p><strong>放弃事务</strong></p>
<p><img src="@source/Back/imgs/Redis/3.png" alt="3"></p>
<p>若在事务队列中存在命令性错误（类似于 java 编译性错误），则执行 EXEC 命令时，所有命令都不会执行</p>
<p><img src="@source/Back/imgs/Redis/4.png" alt="4"></p>
<p>若在事务队列中存在语法性错误（类似于 java 的 1/0 的运行时异常），则执行 EXEC 命令时，其他正确命令会被执行，错误命令抛出异常。</p>
<p><img src="@source/Back/imgs/Redis/5.png" alt="5"></p>
<h3 id="watch-监控" tabindex="-1"><a class="header-anchor" href="#watch-监控" aria-hidden="true">#</a> Watch 监控</h3>
<h4 id="悲观锁" tabindex="-1"><a class="header-anchor" href="#悲观锁" aria-hidden="true">#</a> 悲观锁</h4>
<blockquote>
<p>悲观锁(Pessimistic Lock),顾名思义，就是很悲观，每次去拿数据的时候都认为别人会修改，所以每次在拿数据的时候都会上锁，这样别人想拿到这个数据就会 block 直到它拿到锁。传统的关系型数据库里面就用到了很多这种锁机制，比如行锁，表锁等，读锁，写锁等，都是在操作之前先上锁。</p>
</blockquote>
<h4 id="乐观锁" tabindex="-1"><a class="header-anchor" href="#乐观锁" aria-hidden="true">#</a> 乐观锁</h4>
<blockquote>
<p>乐观锁(Optimistic Lock),顾名思义，就是很乐观，每次去拿数据的时候都认为别人不会修改，所以不会上锁。但是在更新的时候会判断一下再此期间别人有没有去更新这个数据，可以使用版本号等机制，乐观锁适用于多读的应用类型，这样可以提高吞吐量，乐观锁策略：提交版本必须大于记录当前版本才能执行更新。</p>
</blockquote>
<h4 id="测试" tabindex="-1"><a class="header-anchor" href="#测试" aria-hidden="true">#</a> 测试</h4>
<ol>
<li>初始化信用卡可用余额和欠额</li>
</ol>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> <span class="token builtin class-name">set</span> balance <span class="token number">100</span>
OK
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> <span class="token builtin class-name">set</span> debt <span class="token number">0</span>
OK
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><ol start="2">
<li>使用 watch 检测 balance，事务期间 balance 数据未变动，事务执行成功</li>
</ol>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> <span class="token function">watch</span> balance
OK
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> MULTI
OK
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> decrby balance <span class="token number">20</span>
QUEUED
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> incrby debt <span class="token number">20</span>
QUEUED
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> <span class="token builtin class-name">exec</span>
<span class="token number">1</span> <span class="token punctuation">)</span> <span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">80</span>
<span class="token number">2</span> <span class="token punctuation">)</span> <span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">20</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><ol start="3">
<li>使用 watch 检测 balance，事务期间 balance 数据变动，事务执行失败！</li>
</ol>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment">#### # 窗口一</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> <span class="token function">watch</span> balance
OK
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> MULTI  <span class="token comment"># 执行完毕后，执行窗口二代码测试</span>
OK
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> decrby balance <span class="token number">20</span>
QUEUED
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> incrby debt <span class="token number">20</span>
QUEUED
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> <span class="token builtin class-name">exec</span>  <span class="token comment"># 修改失败！</span>
<span class="token punctuation">(</span>nil<span class="token punctuation">)</span>

<span class="token comment"># 窗口二</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> get balance
<span class="token string">"80"</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> <span class="token builtin class-name">set</span> balance <span class="token number">200</span>
OK

<span class="token comment"># 窗口一：出现问题后放弃监视，然后重来！</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> UNWATCH  <span class="token comment"># 放弃监视</span>
OK
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> <span class="token function">watch</span> balance
OK
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> MULTI
OK
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> decrby balance <span class="token number">20</span>
QUEUED
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> incrby debt <span class="token number">20</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br></div></div><blockquote>
<ul>
<li>一但执行 EXEC 开启事务的执行后，无论事务使用执行成功， WARCH 对变量的监控都将被取消。故当事务执行失败后，需重新执行 WATCH 命令对变量进行监控，并开启新的事务进行操作。<br/></li>
<li>watch 指令类似于乐观锁，在事务提交时，如果 watch 监控的多个 KEY 中任何 KEY 的值已经被其他客户端更改，则使用 EXEC 执行事务时，事务队列将不会被执行，同时返回 Nullmulti-bulk 应答以通知调用者事务执行失败。</li>
</ul>
</blockquote>
<h2 id="redis-conf" tabindex="-1"><a class="header-anchor" href="#redis-conf" aria-hidden="true">#</a> Redis.conf</h2>
<h3 id="基本配置" tabindex="-1"><a class="header-anchor" href="#基本配置" aria-hidden="true">#</a> 基本配置</h3>
<blockquote>
<p>位置：Redis 的配置文件位于 Redis 安装目录下，文件名为 redis.conf</p>
</blockquote>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>config get *  <span class="token comment"># 获取全部的配置</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>配置文件的地址：</p>
<p><img src="@source/Back/imgs/Redis/6.png" alt="6"></p>
<p>一般情况下，会单独拷贝出来一份进行操作。来保证初始文件的安全。</p>
<h4 id="units-单位" tabindex="-1"><a class="header-anchor" href="#units-单位" aria-hidden="true">#</a> Units 单位</h4>
<p><img src="@source/Back/imgs/Redis/7.png" alt="7"></p>
<ol>
<li>配置大小单位，开头定义了一些基本的度量单位，只支持 bytes，不支持 bit</li>
<li>对大小写不敏感</li>
</ol>
<h4 id="includes-包含" tabindex="-1"><a class="header-anchor" href="#includes-包含" aria-hidden="true">#</a> INCLUDES 包含</h4>
<p>和 Spring 配置文件类似，可以通过 includes 包含，redis.conf 可以作为总文件，可以包含其他文件！</p>
<h4 id="network-网络配置" tabindex="-1"><a class="header-anchor" href="#network-网络配置" aria-hidden="true">#</a> NETWORK 网络配置</h4>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token builtin class-name">bind</span> <span class="token number">127.0</span>.0.1  <span class="token comment"># 绑定的ip</span>
protected-mode <span class="token function">yes</span> <span class="token comment"># 保护模式</span>
port <span class="token number">6379</span> <span class="token comment"># 默认端口</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h4 id="general-通用" tabindex="-1"><a class="header-anchor" href="#general-通用" aria-hidden="true">#</a> GENERAL 通用</h4>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>daemonize <span class="token function">yes</span> <span class="token comment"># 默认情况下，Redis不作为守护进程运行。需要开启的话，改为 yes</span>
<span class="token comment"># 可通过upstart和systemd管理Redis守护进程</span>
supervised no  
<span class="token comment"># 以后台进程方式运行redis，则需要指定pid 文件</span>
pidfile /var/run/redis_6379.pid  

loglevel notice 
<span class="token comment"># 日志级别。可选项有：</span>
<span class="token comment"># debug（记录大量日志信息，适用于开发、测试阶段）；</span>
<span class="token comment"># verbose（较多日志信息）；</span>
<span class="token comment"># notice（适量日志信息，使用于生产环境）；</span>
<span class="token comment"># warning（仅有部分重要、关键信息才会被记录）。</span>

<span class="token comment"># 日志文件的位置，当指定为空字符串时，为标准输出</span>
logfile <span class="token string">""</span> 
<span class="token comment"># 设置数据库的数目。默认的数据库是DB 0</span>
databases <span class="token number">16</span> 
<span class="token comment"># 是否总是显示logo</span>
always-show-logo <span class="token function">yes</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><h4 id="snapshopting-快照" tabindex="-1"><a class="header-anchor" href="#snapshopting-快照" aria-hidden="true">#</a> SNAPSHOPTING 快照</h4>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 900秒（ 15 分钟）内至少 1 个key值改变（则进行数据库保存--持久化）</span>
save <span class="token number">900</span> <span class="token number">1</span>
<span class="token comment"># 300秒（ 5 分钟）内至少 10 个key值改变（则进行数据库保存--持久化）</span>
save <span class="token number">300</span> <span class="token number">10</span>
<span class="token comment"># 60秒（ 1 分钟）内至少 10000 个key值改变（则进行数据库保存--持久化）</span>
save <span class="token number">60</span> <span class="token number">10000</span>

<span class="token comment"># 持久化出现错误后，是否依然进行继续进行工作</span>
stop-writes-on-bgsave-error <span class="token function">yes</span>

<span class="token comment"># 使用压缩rdb文件 yes：压缩，但是需要一些cpu的消耗。no：不压缩，需要更多的磁盘空间</span>
rdbcompression <span class="token function">yes</span>

<span class="token comment"># 是否校验rdb文件，更有利于文件的容错性，但是在保存rdb文件的时候，会有大概10%的性能损耗</span>
rdbchecksum <span class="token function">yes</span>

<span class="token comment"># dbfilenamerdb文件名称</span>
dbfilename dump.rdb

<span class="token comment"># dir 数据目录，数据库的写入会在这个目录。rdb、aof文件也会写在这个目录</span>
dir./  
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><h4 id="replication-复制-我们后面讲主从复制再给大家讲解-这里先跳过" tabindex="-1"><a class="header-anchor" href="#replication-复制-我们后面讲主从复制再给大家讲解-这里先跳过" aria-hidden="true">#</a> REPLICATION 复制 我们后面讲主从复制再给大家讲解！这里先跳过！</h4>
<h4 id="security-安全" tabindex="-1"><a class="header-anchor" href="#security-安全" aria-hidden="true">#</a> SECURITY 安全</h4>
<p>访问密码的查看，设置和取消</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 启动redis</span>
<span class="token comment"># 连接客户端</span>

<span class="token comment"># 获得和设置密码</span>
config get requirepass
config <span class="token builtin class-name">set</span> requirepass <span class="token string">"123456"</span>

<span class="token comment"># 测试ping，发现需要验证</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> <span class="token function">ping</span>
NOAUTH Authentication required.
<span class="token comment"># 验证</span>
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> auth <span class="token number">123456</span>
OK
<span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> <span class="token function">ping</span>
PONG
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><h4 id="限制" tabindex="-1"><a class="header-anchor" href="#限制" aria-hidden="true">#</a> 限制</h4>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>maxclients <span class="token number">10000</span> <span class="token comment"># 设置能连上redis的最大客户端连接数量</span>
maxmemory <span class="token operator">&lt;</span>bytes<span class="token operator">></span> <span class="token comment"># redis配置的最大内存容量</span>
maxmemory-policy noeviction <span class="token comment"># maxmemory-policy 内存达到上限的处理策略</span>
<span class="token comment"># volatile-lru：利用LRU算法移除设置过过期时间的key。</span>
<span class="token comment"># volatile-random：随机移除设置过过期时间的key。</span>
<span class="token comment"># volatile-ttl：移除即将过期的key，根据最近过期时间来删除（辅以TTL）</span>
<span class="token comment"># allkeys-lru：利用LRU算法移除任何key。</span>
<span class="token comment"># allkeys-random：随机移除任何key。</span>
<span class="token comment"># noeviction：不移除任何key，只是返回一个写错误。</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h4 id="append-only-模式" tabindex="-1"><a class="header-anchor" href="#append-only-模式" aria-hidden="true">#</a> append only 模式</h4>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>appendonly no <span class="token comment"># 是否以append only模式作为持久化方式，默认使用的是rdb方式持久化，这种方式在许多应用中已经足够用了</span>
appendfilename <span class="token string">"appendonly.aof"</span> <span class="token comment"># appendfilename AOF 文件名称</span>
appendfsync everysec
<span class="token comment"># appendfsync aof持久化策略的配置</span>
<span class="token comment"># no表示不执行fsync，由操作系统保证数据同步到磁盘，速度最快。</span>
<span class="token comment"># always表示每次写入都执行fsync，以保证数据同步到磁盘。</span>
<span class="token comment"># everysec表示每秒执行一次fsync，可能会导致丢失这1s数据。</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>具体的会在后面持久化配置部分</p>
<h3 id="常见配置介绍" tabindex="-1"><a class="header-anchor" href="#常见配置介绍" aria-hidden="true">#</a> 常见配置介绍</h3>
<ul>
<li>1、Redis 默认不是以守护进程的方式运行，可以通过该配置项修改，使用 yes 启用守护进程</li>
</ul>
<blockquote>
<p><code>daemonize no</code></p>
</blockquote>
<ul>
<li>2、当 Redis 以守护进程方式运行时，Redis 默认会把 <code>pid</code> 写入<code>/var/run/redis.pid</code> 文件，可以通过 <code>pidfile</code> 指定</li>
</ul>
<blockquote>
<p><code>pidfile /var/run/redis.pid</code></p>
</blockquote>
<ul>
<li>3、指定 Redis 监听端口，默认端口为 6379</li>
</ul>
<blockquote>
<p><code>port 6379</code></p>
</blockquote>
<ul>
<li>4、绑定的主机地址</li>
</ul>
<blockquote>
<p><code>bind 127.0.0.1</code></p>
</blockquote>
<ul>
<li>5、当 客户端闲置多长时间后关闭连接，如果指定为 0 ，表示关闭该功能</li>
</ul>
<blockquote>
<p><code>timeout 300</code></p>
</blockquote>
<ul>
<li>6、指定日志记录级别，Redis 总共支持四个级别：<code>debug</code>、<code>verbose</code>、<code>notice</code>、<code>warning</code>，默认为 <code>verbose</code></li>
</ul>
<blockquote>
<p><code>loglevel verbose</code></p>
</blockquote>
<ul>
<li>7、日志记录方式，默认为标准输出，如果配置 Redis 为守护进程方式运行，而这里又配置为日志记录方式为标准输出，则日志将会发送给<code>/dev/null</code></li>
</ul>
<blockquote>
<p><code>logfile stdout</code></p>
</blockquote>
<ul>
<li>8、设置数据库的数量，默认数据库为 0 ，可以使用 SELECT 命令在连接上指定数据库 id</li>
</ul>
<blockquote>
<p><code>databases 16</code></p>
</blockquote>
<ul>
<li>9、指定在多长时间内，有多少次更新操作，就将数据同步到数据文件，可以多个条件配合</li>
</ul>
<blockquote>
<p>save Redis 默认配置文件中提供了三个条件： <code>save 900 1 save 300 10 save 60 10000</code> 分别表示 900 秒（ 15 分钟）内有 1 个更改， 300 秒（ 5 分钟）内有 10 个更改以及 60 秒内有 10000 个更改。</p>
</blockquote>
<ul>
<li>10、指定存储至本地数据库时是否压缩数据，默认为 yes，Redis 采用 LZF 压缩，如果为了节省 CPU 时间，可以关闭该选项，但会导致数据库文件变的巨大</li>
</ul>
<blockquote>
<p><code>rdbcompression yes</code></p>
</blockquote>
<ul>
<li>11、指定本地数据库文件名，默认值为 <code>dump.rdb</code></li>
</ul>
<blockquote>
<p><code>dbfilename dump.rdb</code></p>
</blockquote>
<ul>
<li>12、指定本地数据库存放目录</li>
</ul>
<blockquote>
<p><code>dir./</code></p>
</blockquote>
<ul>
<li>13、设置当本机为 <code>slav</code> 服务时，设置 <code>master</code> 服务的 IP 地址及端口，在 Redis 启动时，它会自动从 <code>master</code> 进行数据同步</li>
</ul>
<blockquote>
<p><code>slaveof</code></p>
</blockquote>
<ul>
<li>14、当 <code>master</code> 服务设置了密码保护时，<code>slav</code> 服务连接 <code>master</code> 的密码</li>
</ul>
<blockquote>
<p><code>masterauth</code></p>
</blockquote>
<ul>
<li>15、设置 Redis 连接密码，如果配置了连接密码，客户端在连接 Redis 时需要通过 <code>AUTH</code> 命令提供密码，默认关闭</li>
</ul>
<blockquote>
<p><code>requirepass foobared</code></p>
</blockquote>
<ul>
<li>16、设置同一时间最大客户端连接数，默认无限制，Redis 可以同时打开的客户端连接数为 Redis 进程可以打开的最大文件描述符数，如果设置 <code>maxclients 0</code>，表示不作限制。当客户端连接数到达限制时，Redis 会关闭新的连接并向客户端返回 max number of clients reached 错误信息</li>
</ul>
<blockquote>
<p><code>maxclients 128</code></p>
</blockquote>
<ul>
<li>17、指定 Redis 最大内存限制，Redis 在启动时会把数据加载到内存中，达到最大内存后，Redis 会先尝试清除已到期或即将到期的 Key，当此方法处理后，仍然到达最大内存设置，将无法再进行写入操作，但仍然可以进行读取操作。Redis 新的 vm 机制，会把 Key 存放内存，Value 会存放在 swap 区</li>
</ul>
<blockquote>
<p><code>maxmemory</code></p>
</blockquote>
<ul>
<li>18、指定是否在每次更新操作后进行日志记录，Redis 在默认情况下是异步的把数据写入磁盘，如果不开启，可能会在断电时导致一段时间内的数据丢失。因为redis 本身同步数据文件是按上面 save 条件来同步的，所以有的数据会在一段时间内只存在于内存中。默认为 no</li>
</ul>
<blockquote>
<p><code>appendonly no</code></p>
</blockquote>
<ul>
<li>19、指定更新日志文件名，默认为 <code>appendonly.aof</code></li>
</ul>
<blockquote>
<p><code>appendfilename appendonly.aof</code></p>
</blockquote>
<ul>
<li>20、指定更新日志条件，共有 3 个可选值：</li>
</ul>
<blockquote>
<p><code>no</code>：表示等操作系统进行数据缓存同步到磁盘（快）<br>
<code>always</code>：表示每次更新操作后手动调用 fsync()将数据写到磁盘（慢，安全）<br>
<code>everysec</code>：表示每秒同步一次（折衷，默认值）<br>
<code>appendfsync everysec</code>：表示每秒钟将缓冲区中的数据同步到磁盘上<br></p>
</blockquote>
<ul>
<li>21、指定是否启用虚拟内存机制，默认值为 no，简单的介绍一下，VM 机制将数据分页存放，由 Redis 将访问量较少的页即冷数据 swap 到磁盘上，访问多的页面由磁盘自动换出到内存中（在后面的文章我会仔细分析 Redis 的 VM 机制）</li>
</ul>
<blockquote>
<p><code>vm-enabled no</code></p>
</blockquote>
<ul>
<li>22、虚拟内存文件路径，默认值为<code>/tmp/redis.swap</code>，不可多个 Redis 实例共享</li>
</ul>
<blockquote>
<p><code>vm-swap-file /tmp/redis.swap</code></p>
</blockquote>
<ul>
<li>23、将所有大于 <code>vm-max-memory</code> 的数据存入虚拟内存,无论 <code>vm-max-memory</code> 设置多小,所有索引数据都是内存存储的(Redis 的索引数据 就是 keys),也就是说,当 <code>vm-max-memory</code> 设置为 0 的时候,其实是所有 value 都存在于磁盘。默认值为 0</li>
</ul>
<blockquote>
<p><code>vm-max-memory 0</code></p>
</blockquote>
<ul>
<li>24、<code>Redis swap</code> 文件分成了很多的 page，一个对象可以保存在多个 page 上面，但一个 page 上不能被多个对象共享，<code>vm-page-size</code> 是要根据存储的 数据大小来设定的，作者建议如果存储很多小对象，page 大小最好设置为 32或者 64bytes；如果存储很大大对象，则可以使用更大的 page，如果不 确定，就使用默认值</li>
</ul>
<blockquote>
<p><code>vm-page-size 32</code></p>
</blockquote>
<ul>
<li>25、设置 swap 文件中的 page 数量，由于页表（一种表示页面空闲或使用的 bitmap）是在放在内存中的，，在磁盘上每 8 个 pages 将消耗 1byte 的内存。</li>
</ul>
<blockquote>
<p><code>vm-pages 134217728</code></p>
</blockquote>
<ul>
<li>26、设置访问 swap 文件的线程数,最好不要超过机器的核数,如果设置为 0,那么所有对 swap 文件的操作都是串行的，可能会造成比较长时间的延迟。默认值为 4</li>
</ul>
<blockquote>
<p><code>vm-max-threads 4</code></p>
</blockquote>
<ul>
<li>27、设置在向客户端应答时，是否把较小的包合并为一个包发送，默认为开启</li>
</ul>
<blockquote>
<p><code>glueoutputbuf yes</code></p>
</blockquote>
<ul>
<li>28、指定在超过一定的数量或者最大的元素超过某一临界值时，采用一种特殊的哈希算法</li>
</ul>
<blockquote>
<p><code>hash-max-zipmap-entries 64&lt;br&gt;</code>
<code>hash-max-zipmap-value 512</code></p>
</blockquote>
<ul>
<li>29、指定是否激活重置哈希，默认为开启（后面在介绍 Redis 的哈希算法时具体介绍）</li>
</ul>
<blockquote>
<p><code>activerehashing yes</code></p>
</blockquote>
<ul>
<li>30、指定包含其它的配置文件，可以在同一主机上多个 Redis 实例之间使用同一份配置文件，而同时各个实例又拥有自己的特定配置文件</li>
</ul>
<blockquote>
<p><code>include /path/to/local.conf</code></p>
</blockquote>
<h2 id="redis-的持久化" tabindex="-1"><a class="header-anchor" href="#redis-的持久化" aria-hidden="true">#</a> Redis 的持久化</h2>
<blockquote>
<p>Redis 是内存数据库，如果不将内存中的数据库状态保存到磁盘，那么一旦服务器进程退出，服务器中的数据库状态也会消失。所以 Redis 提供了持久化功能！</p>
</blockquote>
<h3 id="rdb-redis-database" tabindex="-1"><a class="header-anchor" href="#rdb-redis-database" aria-hidden="true">#</a> RDB（Redis DataBase）</h3>
<h4 id="什么是-rdb" tabindex="-1"><a class="header-anchor" href="#什么是-rdb" aria-hidden="true">#</a> 什么是 RDB</h4>
<blockquote>
<p>在指定的时间间隔内将内存中的数据集快照写入磁盘，也就是行话讲的 Snapshot 快照，它恢复时是将快照文件直接读到内存里。</p>
<p>Redis 会单独创建（fork）一个子进程来进行持久化，会先将数据写入到一个临时文件中，待持久化过程都结束了，再用这个临时文件替换上次持久化好的文件。整个过程中，主进程是不进行任何 IO 操作的。这就确保了极高的性能。如果需要进行大规模数据的恢复，且对于数据恢复的完整性不是非常敏感，那 RDB 方式要比 AOF 方式更加的高效。RDB 的缺点是最后一次持久化后的数据可能丢失。</p>
</blockquote>
<h4 id="fork" tabindex="-1"><a class="header-anchor" href="#fork" aria-hidden="true">#</a> Fork</h4>
<blockquote>
<p>Fork 的作用是复制一个与当前进程一样的进程。新进程的所有数据（变量，环境变量，程序计数器等）数值都和原进程一致，但是是一个全新的进程，并作为原进程的子进程。</p>
</blockquote>
<p><strong>Rdb 保存的是 <code>dump.rdb</code> 文件</strong></p>
<p><img src="@source/Back/imgs/Redis/8.png" alt="8"></p>
<h4 id="配置位置及-snapshotting-解析" tabindex="-1"><a class="header-anchor" href="#配置位置及-snapshotting-解析" aria-hidden="true">#</a> 配置位置及 SNAPSHOTTING 解析</h4>
<p><img src="@source/Back/imgs/Redis/9.png" alt="9"></p>
<h4 id="这里的触发条件机制-我们可以修改测试一下" tabindex="-1"><a class="header-anchor" href="#这里的触发条件机制-我们可以修改测试一下" aria-hidden="true">#</a> 这里的触发条件机制，我们可以修改测试一下：</h4>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>save <span class="token number">120</span> <span class="token number">10</span> <span class="token comment"># 120秒内修改 10 次则触发RDB</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>RDB 是整合内存的压缩过的 Snapshot，RDB 的数据结构，可以配置复合的快照触发条件。 默认：</p>
<ul>
<li>1 分钟内改了 1 万次</li>
<li>5 分钟内改了 10 次</li>
<li>15 分钟内改了 1 次</li>
</ul>
<p>如果想禁用 RDB 持久化的策略，只要不设置任何 save指令，或者给 save 传入一个空字符串参数也可以。若要修改完毕需要立马生效，可以手动使用 save 命令！立马生效!</p>
<h4 id="其余命令解析" tabindex="-1"><a class="header-anchor" href="#其余命令解析" aria-hidden="true">#</a> 其余命令解析</h4>
<p><code>Stop-writes-on-bgsave-error</code>：如果配置为 no，表示你不在乎数据不一致或者有其他的手段发现和控制，默认为 yes。</p>
<p><code>rbdcompression</code>：对于存储到磁盘中的快照，可以设置是否进行压缩存储。如果是的话，redis 会采用 LZF 算法进行压缩，如果你不想消耗 CPU 来进行压缩的话，可以设置为关闭此功能。</p>
<p><code>rdbchecksum</code>：在存储快照后，还可以让 redis 使用 CRC64 算法来进行数据校验，但是这样做会增加大约 10%的性能消耗，如果希望获取到最大的性能提升，可以关闭此功能。默认为 yes。</p>
<h4 id="触发-rdb-快照" tabindex="-1"><a class="header-anchor" href="#触发-rdb-快照" aria-hidden="true">#</a> 触发 RDB 快照</h4>
<ol>
<li>
<p>配置文件中默认的快照配置，建议多用一台机子作为备份，复制一份 dump.rdb</p>
</li>
<li>
<p>命令 save 或者是 bgsave</p>
</li>
<li>
<p>save 时只管保存，其他不管，全部阻塞</p>
</li>
<li>
<p>bgsave，Redis 会在后台异步进行快照操作，快照同时还可以响应客户端请求。可以通过 lastsave 命令获取最后一次成功执行快照的时间。</p>
</li>
<li>
<p>执行 flushall 命令，也会产生 dump.rdb 文件，但里面是空的，无意义!</p>
</li>
<li>
<p>退出的时候也会产生 dump.rdb 文件！</p>
</li>
</ol>
<h4 id="如何恢复" tabindex="-1"><a class="header-anchor" href="#如何恢复" aria-hidden="true">#</a> 如何恢复</h4>
<ol>
<li>将备份文件（dump.rdb）移动到 redis 安装目录并启动服务即可</li>
<li>CONFIG GET dir 获取目录</li>
</ol>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> config get <span class="token function">dir</span>
<span class="token function">dir</span>
/usr/local/bin
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h4 id="优点和缺点" tabindex="-1"><a class="header-anchor" href="#优点和缺点" aria-hidden="true">#</a> 优点和缺点</h4>
<p><strong>优点：</strong></p>
<ul>
<li>适合大规模的数据恢复</li>
<li>对数据完整性和一致性要求不高</li>
</ul>
<p><strong>缺点：</strong></p>
<ul>
<li>在一定间隔时间做一次备份，所以如果 redis 意外 down 掉的话，就会丢失最后一次快照后的所有修改</li>
<li>Fork 的时候，内存中的数据被克隆了一份，大致 2 倍的膨胀性需要考虑。</li>
</ul>
<h4 id="小结" tabindex="-1"><a class="header-anchor" href="#小结" aria-hidden="true">#</a> 小结</h4>
<p><img src="@source/Back/imgs/Redis/10.png" alt="10"></p>
<h3 id="aof-append-only-file" tabindex="-1"><a class="header-anchor" href="#aof-append-only-file" aria-hidden="true">#</a> AOF（Append Only File）</h3>
<blockquote>
<p>以日志的形式来记录每个写操作，将 Redis 执行过的所有指令记录下来（读操作不记录），只许追加文件但不可以改写文件，redis 启动之初会读取该文件重新构建数据，换言之，redis 重启的话就根据日志文件的内容将写指令从前到后执行一次以完成数据的恢复工作</p>
</blockquote>
<p><code>AOF保存的是 appendonly.aof 文件</code></p>
<h4 id="配置" tabindex="-1"><a class="header-anchor" href="#配置" aria-hidden="true">#</a> 配置</h4>
<p><img src="@source/Back/imgs/Redis/11.png" alt="11"></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>appendonly no <span class="token comment"># 是否以append only模式作为持久化方式，默认使用的是rdb方式持久化，这种方式在许多应用中已经足够用了</span>

appendfilename <span class="token string">"appendonly.aof"</span> <span class="token comment"># appendfilename AOF 文件名称</span>

<span class="token comment"># appendfsync aof持久化策略的配置</span>
appendfsync everysec
<span class="token comment"># no表示不执行fsync，由操作系统保证数据同步到磁盘，速度最快。</span>
<span class="token comment"># always表示每次写入都执行fsync，以保证数据同步到磁盘。</span>
<span class="token comment"># everysec表示每秒执行一次fsync，可能会导致丢失这1s数据。</span>

No-appendfsync-on-rewrite <span class="token comment"># 重写时是否可以运用Appendfsync，用默认no即可，保证数据安全性</span>

Auto-aof-rewrite-min-size <span class="token comment"># 设置重写的基准值</span>

Auto-aof-rewrite-percentage <span class="token comment">#设置重写的基准值</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><h4 id="aof-启动-修复-恢复" tabindex="-1"><a class="header-anchor" href="#aof-启动-修复-恢复" aria-hidden="true">#</a> AOF 启动/修复/恢复</h4>
<p><strong>正常恢复：</strong></p>
<ul>
<li>启动：设置 Yes，修改默认的 appendonly no，改为 yes</li>
<li>将有数据的 aof 文件复制一份保存到对应目录（config get dir）</li>
<li>恢复：重启 redis 然后重新加载</li>
</ul>
<p><strong>异常恢复：</strong></p>
<ul>
<li>启动：设置 Yes</li>
<li>故意破坏 appendonly.aof 文件！</li>
<li>修复： redis-check-aof --fix appendonly.aof 进行修复</li>
<li>恢复：重启 redis 然后重新加载</li>
</ul>
<h4 id="rewrite" tabindex="-1"><a class="header-anchor" href="#rewrite" aria-hidden="true">#</a> Rewrite</h4>
<blockquote>
<p>AOF 采用文件追加方式，文件会越来越大，为避免出现此种情况，新增了重写机制，当 AOF 文件的大小超过所设定的阈值时，Redis 就会启动 AOF 文件的内容压缩，只保留可以恢复数据的最小指令集，可以使用命令 <code>bgrewriteaof</code> ！</p>
</blockquote>
<h4 id="重写原理" tabindex="-1"><a class="header-anchor" href="#重写原理" aria-hidden="true">#</a> 重写原理</h4>
<blockquote>
<p>AOF 文件持续增长而过大时，会 fork 出一条新进程来将文件重写（也是先写临时文件最后再 rename），遍历新进程的内存中数据，每条记录有一条的 Set 语句。重写 aof 文件的操作，并没有读取旧的 aof 文件，这点和快照有点类似！</p>
</blockquote>
<h4 id="触发机制" tabindex="-1"><a class="header-anchor" href="#触发机制" aria-hidden="true">#</a> 触发机制</h4>
<p>在Redis中，AOF触发机制有以下几种方式：</p>
<ol>
<li>
<p>每个命令都触发：每当客户端执行一个写操作的命令时，Redis会立即将该命令写入AOF文件。这是最安全的方式，可以保证每条写操作都被持久化，但也会导致频繁的磁盘写入操作，对性能有一定影响。</p>
</li>
<li>
<p>按时间触发：Redis可以配置一个时间间隔，例如每秒钟，当经过指定的时间间隔后，Redis会将这段时间内的所有写操作命令一次性写入AOF文件。这种方式可以减少磁盘写入的频率，提高性能，但在发生故障时可能会丢失最后一次时间间隔内的写操作。</p>
</li>
<li>
<p>混合触发：Redis还可以采用混合的方式，结合上述两种方式。例如可以先按时间触发将一部分操作写入AOF文件，然后在接收到特定命令或达到一定条件时，立即将剩余的操作写入AOF文件。这种方式兼具了实时性和性能的考虑。</p>
</li>
</ol>
<p>需要注意的是，无论采用何种触发机制，Redis都提供了持久化策略的配置选项，可以根据实际需求进行灵活的调整。常见的持久化策略有：</p>
<ul>
<li>always：每个命令都立即写入AOF文件，保证最高的数据安全性。</li>
<li>everysec：每秒钟将操作日志写入AOF文件一次，平衡了性能和数据安全性。</li>
<li>no：完全禁用AOF持久化，仅依靠内存快照（RDB）来进行数据恢复。</li>
</ul>
<p>通过合理配置AOF触发机制和持久化策略，可以在满足数据安全性要求的前提下，兼顾Redis服务器的性能和效率。</p>
<h4 id="优点和缺点-1" tabindex="-1"><a class="header-anchor" href="#优点和缺点-1" aria-hidden="true">#</a> 优点和缺点</h4>
<p><strong>优点：</strong></p>
<ul>
<li>每修改同步：appendfsync always 同步持久化，每次发生数据变更会被立即记录到磁盘，性能较差但数据完整性比较好</li>
<li>每秒同步： appendfsync everysec 异步操作，每秒记录 ，如果一秒内宕机，有数据丢失</li>
<li>不同步： appendfsync no 从不同步</li>
</ul>
<p><strong>缺点：</strong></p>
<ul>
<li>相同数据集的数据而言，aof 文件要远大于 rdb 文件，恢复速度慢于 rdb。</li>
<li>Aof 运行效率要慢于 rdb，每秒同步策略效率较好，不同步效率和 rdb 相同。</li>
</ul>
<h4 id="小结-1" tabindex="-1"><a class="header-anchor" href="#小结-1" aria-hidden="true">#</a> 小结</h4>
<p><img src="@source/Back/imgs/Redis/12.png" alt="12"></p>
<h3 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h3>
<ol>
<li>
<p>RDB 持久化方式能够在指定的时间间隔内对你的数据进行快照存储</p>
</li>
<li>
<p>AOF 持久化方式记录每次对服务器写的操作，当服务器重启的时候会重新执行这些命令来恢复原始的数据，AOF 命令以 Redis 协议追加保存每次写的操作到文件末尾，Redis 还能对 AOF 文件进行后台重写，使得 AOF 文件的体积不至于过大。</p>
</li>
<li>
<p>只做缓存，如果你只希望你的数据在服务器运行的时候存在，你也可以不使用任何持久化</p>
</li>
<li>
<p>同时开启两种持久化方式</p>
<ul>
<li>在这种情况下，当 redis 重启的时候会优先载入 AOF 文件来恢复原始的数据，因为在通常情况下 AOF 文件保存的数据集要比 RDB 文件保存的数据集要完整。</li>
<li>RDB的数据不实时，同时使用两者时服务器重启也只会找 AOF 文件，那要不要只使用 AOF 呢？作者建议不要，因为 RDB 更适合用于备份数据库（AOF 在不断变化不好备份），快速重启，而且不会有 AOF 可能潜在的 Bug，留着作为一个万一的手段。</li>
</ul>
</li>
<li>
<p>性能建议</p>
<ul>
<li>因为 RDB 文件只用作后备用途，建议只在 Slave 上持久化 RDB 文件，而且只要 15 分钟备份一次就够了，只保留 save 900 1 这条规则。</li>
<li>如果 Enable AOF ，好处是在最恶劣情况下也只会丢失不超过两秒数据，启动脚本较简单只 load 自己的 AOF 文件就可以了，代价一是带来了持续的 IO，二是 AOF rewrite 的最后将 rewrite 过程中产生的新数据写到新文件 造成的阻塞几乎是不可避免的。只要硬盘许可，应该尽量减少 AOF rewrite 的频率，AOF 重写的基础大小默认值 64M 太小了，可以设到 5G 以上，默认超过原大小 100%大小重写可以改到适当的数值。</li>
<li>如果不 Enable AOF ，仅靠 Master-Slave Repllcation 实现高可用性也可以，能省掉一大笔 IO，也减少了 rewrite 时带来的系统波动。代价是如果 Master/Slave 同时倒掉，会丢失十几分钟的数据，启动脚本也要比较两个 Master/Slave 中的 RDB 文件，载入较新的那个，微博就是这种架构。</li>
</ul>
</li>
</ol>
<h2 id="redis-发布订阅" tabindex="-1"><a class="header-anchor" href="#redis-发布订阅" aria-hidden="true">#</a> Redis 发布订阅</h2>
<ul>
<li>Redis 发布订阅(pub/sub)是一种消息通信模式：发送者(pub)发送消息，订阅者(sub)接收消息。</li>
<li>Redis 客户端可以订阅任意数量的频道。</li>
</ul>
<p>订阅/发布消息图：</p>
<p><img src="@source/Back/imgs/Redis/13.png" alt="13"></p>
<p>下图展示了频道 channel1 ， 以及订阅这个频道的三个客户端 —— client2 、 client5 和 client1 之间的</p>
<p><img src="@source/Back/imgs/Redis/14.png" alt="14"></p>
<p>当有新消息通过 PUBLISH 命令发送给频道 channel1 时， 这个消息就会被发送给订阅它的三个客户端：</p>
<p><img src="@source/Back/imgs/Redis/15.png" alt="15"></p>
<h3 id="命令" tabindex="-1"><a class="header-anchor" href="#命令" aria-hidden="true">#</a> 命令</h3>
<p>这些命令被广泛用于构建即时通信应用，比如网络聊天室(chatroom)和实时广播、实时提醒等。</p>
<table>
<thead>
<tr>
<th>命令</th>
<th>描述</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>PSUBSCRIBE pattern [pattern ...]</code></td>
<td>订阅一个或多个符合给定模式的频道。</td>
</tr>
<tr>
<td><code>PUBSUB subcommand [argument [argument ...]]</code></td>
<td>查看订阅与发布系统状态。</td>
</tr>
<tr>
<td><code>PUBLISH channel message</code></td>
<td>将信息发送到指定的频道。</td>
</tr>
<tr>
<td><code>PUNSUBSCRIBE [pattern [pattern ...]]</code></td>
<td>退订所有给定模式的频道。</td>
</tr>
<tr>
<td><code>SUBSCRIBE channel [channel ...]</code></td>
<td>订阅给定的一个或多个频道的信息。</td>
</tr>
<tr>
<td><code>UNSUBSCRIBE [channel [channel ...]]</code></td>
<td>退订给定的频道。</td>
</tr>
</tbody>
</table>
<h3 id="测试-1" tabindex="-1"><a class="header-anchor" href="#测试-1" aria-hidden="true">#</a> 测试</h3>
<p>以下实例演示了发布订阅是如何工作的。在我们实例中我们创建了订阅频道名为 redisChat :</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>redis <span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> SUBSCRIBE redisChat

Reading messages<span class="token punctuation">..</span>. <span class="token punctuation">(</span>press Ctrl-C to quit<span class="token punctuation">)</span>
<span class="token number">1</span> <span class="token punctuation">)</span> <span class="token string">"subscribe"</span>
<span class="token number">2</span> <span class="token punctuation">)</span> <span class="token string">"redisChat"</span>
<span class="token number">3</span> <span class="token punctuation">)</span> <span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>现在，我们先重新开启个 redis 客户端，然后在同一个频道 redisChat 发布两次消息，订阅者就能接收到消息。</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>redis <span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> PUBLISH redisChat <span class="token string">"Hello,Redis"</span>
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">1</span>
redis <span class="token number">127.0</span>.0.1:637<span class="token operator"><span class="token file-descriptor important">9</span>></span> PUBLISH redisChat <span class="token string">"Hello，Kuangshen"</span>
<span class="token punctuation">(</span>integer<span class="token punctuation">)</span> <span class="token number">1</span>

<span class="token comment"># 订阅者的客户端会显示如下消息</span>
<span class="token number">1</span> <span class="token punctuation">)</span> <span class="token string">"message"</span>
<span class="token number">2</span> <span class="token punctuation">)</span> <span class="token string">"redisChat"</span>
<span class="token number">3</span> <span class="token punctuation">)</span> <span class="token string">"Hello,Redis"</span>
<span class="token number">1</span> <span class="token punctuation">)</span> <span class="token string">"message"</span>
<span class="token number">2</span> <span class="token punctuation">)</span> <span class="token string">"redisChat"</span>
<span class="token number">3</span> <span class="token punctuation">)</span> <span class="token string">"Hello，Kuangshen"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><h3 id="原理" tabindex="-1"><a class="header-anchor" href="#原理" aria-hidden="true">#</a> 原理</h3>
<ul>
<li>Redis 是使用 C 实现的，通过分析 Redis 源码里的 pubsub.c 文件，了解发布和订阅机制的底层实现，籍此加深对 Redis 的理解。</li>
<li>Redis 通过 PUBLISH 、SUBSCRIBE 和 PSUBSCRIBE 等命令实现发布和订阅功能。通过 SUBSCRIBE 命令订阅某频道后，redis-server 里维护了一个字典，字典的键就是一个个 channel，而字典的值则是一个链表，链表中保存了所有订阅这个 channel 的客户端。SUBSCRIBE 命令的关键，就是将客户端添加到给定 channel 的订阅链表中。</li>
<li>通过 PUBLISH 命令向订阅者发送消息，redis-server 会使用给定的频道作为键，在它所维护的 channel 字典中查找记录了订阅这个频道的所有客户端的链表，遍历这个链表，将消息发布给所有订阅者。</li>
<li>Pub/Sub 从字面上理解就是发布（Publish）与订阅（Subscribe），在 Redis 中，你可以设定对某一个 key 值进行消息发布及消息订阅，当一个 key 值上进行了消息发布后，所有订阅它的客户端都会收到相应的消息。这一功能最明显的用法就是用作实时消息系统，比如普通的即时聊天，群聊等功能。</li>
</ul>
<h3 id="使用场景" tabindex="-1"><a class="header-anchor" href="#使用场景" aria-hidden="true">#</a> 使用场景</h3>
<ol>
<li>Pub/Sub 构建实时消息系统</li>
<li>Redis 的 Pub/Sub 系统可以构建实时的消息系统</li>
<li>比如很多用 Pub/Sub 构建的实时聊天系统的例子。</li>
</ol>
<h2 id="redis-主从复制" tabindex="-1"><a class="header-anchor" href="#redis-主从复制" aria-hidden="true">#</a> Redis 主从复制</h2>
<h3 id="概念" tabindex="-1"><a class="header-anchor" href="#概念" aria-hidden="true">#</a> 概念</h3>
<blockquote>
<p>主从复制，是指将一台 Redis 服务器的数据，复制到其他的 Redis 服务器。前者称为主节点<code>(master/leader)</code>，后者称为从节点<code>(slave/follower)</code>；数据的复制是单向的，只能由主节点到从节点。Master 以写为主，Slave 以读为主。
默认情况下，每台 Redis 服务器都是主节点；且一个主节点可以有多个从节点(或没有从节点)，但一个从节点只能有一个主节点。</p>
</blockquote>
<p>主从复制的作用主要包括：</p>
<ul>
<li>**数据冗余：**主从复制实现了数据的热备份，是持久化之外的一种数据冗余方式。</li>
<li>**故障恢复：**当主节点出现问题时，可以由从节点提供服务，实现快速的故障恢复；实际上是一种服务的冗余。</li>
<li>**负载均衡：**在主从复制的基础上，配合读写分离，可以由主节点提供写服务，由从节点提供读服务（即写 Redis 数据时应用连接主节点，读 Redis 数据时应用连接从节点），分担服务器负载；尤其是在写少读多的场景下，通过多个从节点分担读负载，可以大大提高 Redis 服务器的并发量。</li>
<li>**高可用基石：**除了上述作用以外，主从复制还是哨兵和集群能够实施的基础，因此说主从复制是 Redis 高可用的基础。</li>
</ul>
<p>一般来说，要将 Redis 运用于工程项目中，只使用一台 Redis 是万万不能的，原因如下：</p>
<ul>
<li>**从结构上：**单个 Redis 服务器会发生单点故障，并且一台服务器需要处理所有的请求负载，压力较大；</li>
<li>**从容量上：**单个 Redis 服务器内存容量有限，就算一台 Redis 服务器内存容量为 256G，也不能将所有内存用作 Redis 存储内存，一般来说，单台 Redis 最大使用内存不应该超过 20G。</li>
</ul>
<blockquote>
<p>电商网站上的商品，一般都是一次上传，无数次浏览的，说专业点也就是&quot;多读少写&quot;。 对于这种场景，我们可以使如下这种架构：</p>
</blockquote>
<p><img src="@source/Back/imgs/Redis/16.png" alt="16"></p>
<h3 id="环境配置" tabindex="-1"><a class="header-anchor" href="#环境配置" aria-hidden="true">#</a> 环境配置</h3>
<h4 id="基本配置-1" tabindex="-1"><a class="header-anchor" href="#基本配置-1" aria-hidden="true">#</a> 基本配置</h4>
<p>配从库不配主库，从库配置：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>slaveof 主库ip 主库端口 <span class="token comment"># 配置主从</span>
info replication <span class="token comment"># 查看信息</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>每次与 master 断开之后，都需要重新连接，除非配置进 <code>redis.conf</code> 文件！</p>
<h4 id="修改-conf-文件" tabindex="-1"><a class="header-anchor" href="#修改-conf-文件" aria-hidden="true">#</a> 修改 conf 文件</h4>
<p>准备工作：配置主从复制，至少需要三个，一主二从！配置三个客户端！</p>
<p><img src="@source/Back/imgs/Redis/17.png" alt="17"></p>
<ol>
<li>拷贝多个 redis.conf 文件</li>
</ol>
<p><img src="@source/Back/imgs/Redis/18.png" alt="18"></p>
<ol start="2">
<li>指定端口 6379 ，依次类推</li>
<li>开启 <code>daemonize yes</code></li>
<li><code>Pid</code> 文件名字 <code>pidfile /var/run/redis_6379.pid</code> , 依次类推</li>
<li><code>Log</code> 文件名字 <code>logfile &quot;6379.log&quot;</code> , 依次类推</li>
<li><code>Dump.rdb</code> 名字 <code>dbfilename dump6379.rdb</code> , 依次类推</li>
</ol>
<p><img src="@source/Back/imgs/Redis/19.png" alt="19"></p>
<p><strong>上面都配置完毕后，3 个服务通过 3 个不同的配置文件开启，准备环境就 OK 了！</strong></p>
<p><img src="@source/Back/imgs/Redis/20.png" alt="20"></p>
<h3 id="一主二从" tabindex="-1"><a class="header-anchor" href="#一主二从" aria-hidden="true">#</a> 一主二从</h3>
<ul>
<li>1 、环境初始化</li>
</ul>
<p><img src="@source/Back/imgs/Redis/21.png" alt="21"></p>
<p>默认三个都是 Master 主节点</p>
<p><img src="@source/Back/imgs/Redis/22.png" alt="22"></p>
<ul>
<li>2 、配置为一个 Master 两个 Slave</li>
</ul>
<p><img src="@source/Back/imgs/Redis/23.png" alt="23"></p>
<ul>
<li>3 、在主机设置值，在从机都可以取到！从机不能写值！</li>
</ul>
<p><img src="@source/Back/imgs/Redis/24.png" alt="24"></p>
<p>测试一：主机挂了，查看从机信息，主机恢复，再次查看信息</p>
<p>测试二：从机挂了，查看主机信息，从机恢复，查看从机信息</p>
<h4 id="层层链路" tabindex="-1"><a class="header-anchor" href="#层层链路" aria-hidden="true">#</a> 层层链路</h4>
<blockquote>
<p>上一个 Slave 可以是下一个 slave 和 Master，Slave 同样可以接收其他 slaves 的连接和同步请求，那么该 slave 作为了链条中下一个的 master，可以有效减轻 master 的写压力！</p>
</blockquote>
<p><img src="@source/Back/imgs/Redis/25.png" alt="25"></p>
<blockquote>
<p>测试： 6379 设置值以后 6380 和 6381 都可以获取到！OK！</p>
</blockquote>
<h4 id="取代主节点" tabindex="-1"><a class="header-anchor" href="#取代主节点" aria-hidden="true">#</a> 取代主节点</h4>
<blockquote>
<p>一主二从的情况下，如果主机断了，从机可以使用命令 <code>SLAVEOF NO ONE</code> 将自己改为主机！这个时候其余的从机链接到这个节点。对一个从属服务器执行命令 <code>SLAVEOF NO ONE</code> 将使得这个从属服务器关闭复制功能，并从从属服务器转变回主服务器，原来同步所得的数据集不会被丢弃。</p>
</blockquote>
<p><img src="@source/Back/imgs/Redis/26.png" alt="26"></p>
<p>主机再回来，也只是一个光杆司令了，从机为了正常使用跑到了新的主机上！</p>
<h4 id="复制原理" tabindex="-1"><a class="header-anchor" href="#复制原理" aria-hidden="true">#</a> 复制原理</h4>
<blockquote>
<p><code>Slave</code> 启动成功连接到 <code>master</code> 后会发送一个 <code>sync</code> 命令 <code>Master</code> 接到命令，启动后台的存盘进程，同时收集所有接收到的用于修改数据集命令，在后台进程执行完毕之后，<code>master</code> 将传送整个数据文件到 <code>slave</code>，并完成一次完全同步。全量复制：而 <code>slave</code> 服务在接收到数据库文件数据后，将其存盘并加载到内存中。增量复制：<code>Master</code> 继续将新的所有收集到的修改命令依次传给 <code>slave</code>，完成同步但是只要是重新连接 <code>master</code>，一次完全同步（全量复制）将被自动执行</p>
</blockquote>
<h3 id="哨兵模式" tabindex="-1"><a class="header-anchor" href="#哨兵模式" aria-hidden="true">#</a> 哨兵模式</h3>
<h4 id="概述" tabindex="-1"><a class="header-anchor" href="#概述" aria-hidden="true">#</a> 概述</h4>
<blockquote>
<p>主从切换技术的方法是：当主服务器宕机后，需要手动把一台从服务器切换为主服务器，这就需要人工干预，费事费力，还会造成一段时间内服务不可用。这不是一种推荐的方式，更多时候，我们优先考虑哨兵模式。Redis 从 2.8 开始正式提供了 <code>Sentinel（哨兵）</code> 架构来解决这个问题。谋朝篡位的自动版，能够后台监控主机是否故障，如果故障了根据投票数自动将从库转换为主库。哨兵模式是一种特殊的模式，首先 Redis 提供了哨兵的命令，哨兵是一个独立的进程，作为进程，它会独立运行。其原理是 <strong>哨兵通过发送命令，等待 Redis 服务器响应，从而监控运行的多个 Redis 实例。</strong></p>
</blockquote>
<p><img src="@source/Back/imgs/Redis/27.png" alt="27"></p>
<p>这里的哨兵有两个作用</p>
<ul>
<li>通过发送命令，让 Redis 服务器返回监控其运行状态，包括主服务器和从服务器。</li>
<li>当哨兵监测到 <code>master</code> 宕机，会自动将 <code>slave</code> 切换成 <code>master</code>，然后通过 发布订阅模式 通知其他的从服务器，修改配置文件，让它们切换主机。</li>
</ul>
<blockquote>
<p>然而一个哨兵进程对 Redis 服务器进行监控，可能会出现问题，为此，我们可以使用多个哨兵进行监控。各个哨兵之间还会进行监控，这样就形成了多哨兵模式。</p>
</blockquote>
<p><img src="@source/Back/imgs/Redis/28.png" alt="28"></p>
<blockquote>
<p>假设主服务器宕机，哨兵 1 先检测到这个结果，系统并不会马上进行 <code>failover</code> 过程，仅仅是哨兵 1 主观的认为主服务器不可用，这个现象成为 主观下线 。当后面的哨兵也检测到主服务器不可用，并且数量达到一定值时，那么哨兵之间就会进行一次投票，投票的结果由一个哨兵发起，进行 <code>failover</code>[故障转移]操作。切换成功后，就会通过发布订阅模式，让各个哨兵把自己监控的从服务器实现切换主机，这个过程称为客观下线 。</p>
</blockquote>
<h4 id="配置测试" tabindex="-1"><a class="header-anchor" href="#配置测试" aria-hidden="true">#</a> 配置测试</h4>
<ol>
<li>调整结构， 6379 带着 80 、 81</li>
<li>自定义的 <code>/myredis</code> 目录下新建 <code>sentinel.conf</code> 文件，名字千万不要错</li>
<li>配置哨兵，填写内容
<ul>
<li><code>sentinel monitor</code> 被监控主机名字 <code>127.0.0.1 6379 1</code></li>
<li>上面最后一个数字 1 ，表示主机挂掉后 <code>slave</code> 投票看让谁接替成为主机，得票数多少后成为主机</li>
</ul>
</li>
<li>启动哨兵
<ul>
<li><code>Redis-sentinel /myredis/sentinel.conf</code></li>
<li>上述目录依照各自的实际情况配置，可能目录不同</li>
</ul>
</li>
<li>正常主从演示</li>
<li>原有的 <code>Master</code> 挂了</li>
<li>投票新选</li>
<li>重新主从继续开工，<code>info replication</code> 查查看</li>
<li>问题：如果之前的 <code>master</code> 重启回来，会不会双 <code>master</code> 冲突？ 之前的回来只能做小弟了</li>
</ol>
<h4 id="哨兵模式的优缺点" tabindex="-1"><a class="header-anchor" href="#哨兵模式的优缺点" aria-hidden="true">#</a> 哨兵模式的优缺点</h4>
<p><strong>优点：</strong></p>
<ul>
<li>哨兵集群模式是基于主从模式的，所有主从的优点，哨兵模式同样具有。</li>
<li>主从可以切换，故障可以转移，系统可用性更好。</li>
<li>哨兵模式是主从模式的升级，系统更健壮，可用性更高。</li>
</ul>
<p><strong>缺点：</strong></p>
<ul>
<li>Redis 较难支持在线扩容，在集群容量达到上限时在线扩容会变得很复杂。</li>
<li>实现哨兵模式的配置也不简单，甚至可以说有些繁琐</li>
</ul>
<h4 id="哨兵配置说明" tabindex="-1"><a class="header-anchor" href="#哨兵配置说明" aria-hidden="true">#</a> 哨兵配置说明</h4>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># Example sentinel.conf</span>

<span class="token comment"># 哨兵sentinel实例运行的端口 默认 26379</span>
port <span class="token number">26379</span>

<span class="token comment"># 哨兵sentinel的工作目录</span>
<span class="token function">dir</span> /tmp

<span class="token comment"># 哨兵sentinel监控的redis主节点的 ip port</span>
<span class="token comment"># master-name 可以自己命名的主节点名字 只能由字母A-z、数字0-9 、这三个字符".-_"组成。</span>
<span class="token comment"># quorum 配置多少个sentinel哨兵统一认为master主节点失联 那么这时客观上认为主节点失联了</span>
<span class="token comment"># sentinel monitor &lt;master-name> &lt;ip> &lt;redis-port> &lt;quorum></span>
sentinel monitor mymaster <span class="token number">127.0</span>.0.1 <span class="token number">6379</span> <span class="token number">2</span>

<span class="token comment"># 当在Redis实例中开启了requirepass foobared 授权密码 这样所有连接Redis实例的客户端都</span>
要提供密码
<span class="token comment"># 设置哨兵sentinel 连接主从的密码 注意必须为主从设置一样的验证密码</span>
<span class="token comment"># sentinel auth-pass &lt;master-name> &lt;password></span>
sentinel auth-pass mymaster MySUPER--secret-0123passw0rd

<span class="token comment"># 指定多少毫秒之后 主节点没有应答哨兵sentinel 此时 哨兵主观上认为主节点下线 默认 30 秒</span>
<span class="token comment"># sentinel down-after-milliseconds &lt;master-name> &lt;milliseconds></span>
sentinel down-after-milliseconds mymaster <span class="token number">30000</span>

<span class="token comment"># 这个配置项指定了在发生failover主备切换时最多可以有多少个slave同时对新的master进行 同步，这个数字越小，完成failover所需的时间就越长，但是如果这个数字越大，就意味着越 多的slave因为replication而不可用。可以通过将这个值设为 1 来保证每次只有一个slave 处于不能处理命令请求的状态。</span>
<span class="token comment"># sentinel parallel-syncs &lt;master-name> &lt;numslaves></span>
sentinel parallel-syncs mymaster <span class="token number">1</span>

<span class="token comment"># 故障转移的超时时间 failover-timeout 可以用在以下这些方面：</span>
<span class="token comment"># 1. 同一个sentinel对同一个master两次failover之间的间隔时间。</span>
<span class="token comment"># 2. 当一个slave从一个错误的master那里同步数据开始计算时间。直到slave被纠正为向正确的master那里同步数据时。</span>
<span class="token comment"># 3.当想要取消一个正在进行的failover所需要的时间。</span>
<span class="token comment"># 4.当进行failover时，配置所有slaves指向新的master所需的最大时间。不过，即使过了这个超时，slaves依然会被正确配置为指向master，但是就不按parallel-syncs所配置的规则来了</span>
<span class="token comment"># 默认三分钟</span>
<span class="token comment"># sentinel failover-timeout &lt;master-name> &lt;milliseconds></span>
sentinel failover-timeout mymaster <span class="token number">180000</span>

<span class="token comment"># SCRIPTS EXECUTION</span>

<span class="token comment"># 配置当某一事件发生时所需要执行的脚本，可以通过脚本来通知管理员，例如当系统运行不正常时发邮件通知相关人员。</span>
<span class="token comment"># 对于脚本的运行结果有以下规则：</span>
<span class="token comment"># 若脚本执行后返回 1 ，那么该脚本稍后将会被再次执行，重复次数目前默认为 10</span>
<span class="token comment"># 若脚本执行后返回 2 ，或者比 2 更高的一个返回值，脚本将不会重复执行。</span>
<span class="token comment"># 如果脚本在执行过程中由于收到系统中断信号被终止了，则同返回值为 1 时的行为相同。</span>
<span class="token comment"># 一个脚本的最大执行时间为60s，如果超过这个时间，脚本将会被一个SIGKILL信号终止，之后重新执行。</span>

<span class="token comment"># 通知型脚本:当sentinel有任何警告级别的事件发生时（比如说redis实例的主观失效和客观失效等等），将会去调用这个脚本，这时这个脚本应该通过邮件，SMS等方式去通知系统管理员关于系统不正常运行的信息。调用该脚本时，将传给脚本两个参数，一个是事件的类型，一个是事件的描述。如果sentinel.conf配置文件中配置了这个脚本路径，那么必须保证这个脚本存在于这个路径，并且是可执行的，否则sentinel无法正常启动成功。</span>
<span class="token comment"># 通知脚本</span>
<span class="token comment"># sentinel notification-script &lt;master-name> &lt;script-path></span>
sentinel notification-script mymaster /var/redis/notify.sh

<span class="token comment"># 客户端重新配置主节点参数脚本</span>
<span class="token comment"># 当一个master由于failover而发生改变时，这个脚本将会被调用，通知相关的客户端关于master地址已经发生改变的信息。</span>
<span class="token comment"># 以下参数将会在调用脚本时传给脚本:</span>
<span class="token comment"># &lt;master-name> &lt;role> &lt;state> &lt;from-ip> &lt;from-port> &lt;to-ip> &lt;to-port></span>
<span class="token comment"># 目前&lt;state>总是“failover”,</span>
<span class="token comment"># &lt;role>是“leader”或者“observer”中的一个。</span>
<span class="token comment"># 参数 from-ip, from-port, to-ip, to-port是用来和旧的master和新的master(即旧的slave)通信的</span>
<span class="token comment"># sentinel client-reconfig-script &lt;master-name> &lt;script-path></span>
sentinel client-reconfig-script mymaster /var/redis/reconfig.sh
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br></div></div><h2 id="缓存穿透和雪崩" tabindex="-1"><a class="header-anchor" href="#缓存穿透和雪崩" aria-hidden="true">#</a> 缓存穿透和雪崩</h2>
<blockquote>
<p>Redis 缓存的使用，极大的提升了应用程序的性能和效率，特别是数据查询方面。但同时，它也带来了一些问题。其中，最要害的问题，就是数据的一致性问题，从严格意义上讲，这个问题无解。如果对数据的一致性要求很高，那么就不能使用缓存。</p>
<p>另外的一些典型问题就是，缓存穿透、缓存雪崩和缓存击穿。目前，业界也都有比较流行的解决方案。</p>
</blockquote>
<h3 id="缓存穿透" tabindex="-1"><a class="header-anchor" href="#缓存穿透" aria-hidden="true">#</a> 缓存穿透</h3>
<h4 id="概念-1" tabindex="-1"><a class="header-anchor" href="#概念-1" aria-hidden="true">#</a> 概念</h4>
<blockquote>
<p>缓存穿透的概念很简单，用户想要查询一个数据，发现 redis 内存数据库没有，也就是缓存没有命中，于是向持久层数据库查询。发现也没有，于是本次查询失败。当用户很多的时候，缓存都没有命中，于是都去请求了持久层数据库。这会给持久层数据库造成很大的压力，这时候就相当于出现了缓存穿透。</p>
</blockquote>
<h4 id="布隆过滤器" tabindex="-1"><a class="header-anchor" href="#布隆过滤器" aria-hidden="true">#</a> 布隆过滤器</h4>
<blockquote>
<p>布隆过滤器是一种数据结构，对所有可能查询的参数以 hash 形式存储，在控制层先进行校验，不符合则丢弃，从而避免了对底层存储系统的查询压力；</p>
</blockquote>
<p><img src="@source/Back/imgs/Redis/29.png" alt="29"></p>
<h4 id="缓存空对象" tabindex="-1"><a class="header-anchor" href="#缓存空对象" aria-hidden="true">#</a> 缓存空对象</h4>
<blockquote>
<p>当存储层不命中后，即使返回的空对象也将其缓存起来，同时会设置一个过期时间，之后再访问这个数据将会从缓存中获取，保护了后端数据源；</p>
</blockquote>
<p><img src="@source/Back/imgs/Redis/30.png" alt="30"></p>
<p><strong>但是这种方法会存在两个问题：</strong></p>
<ol>
<li>如果空值能够被缓存起来，这就意味着缓存需要更多的空间存储更多的键，因为这当中可能会有很多的空值的键；</li>
<li>即使对空值设置了过期时间，还是会存在缓存层和存储层的数据会有一段时间窗口的不一致，这对于需要保持一致性的业务会有影响。</li>
</ol>
<h3 id="缓存击穿" tabindex="-1"><a class="header-anchor" href="#缓存击穿" aria-hidden="true">#</a> 缓存击穿</h3>
<h4 id="概述-1" tabindex="-1"><a class="header-anchor" href="#概述-1" aria-hidden="true">#</a> 概述</h4>
<blockquote>
<p>这里需要注意和缓存击穿的区别，缓存击穿，是指一个 key 非常热点，在不停的扛着大并发，大并发集中对这一个点进行访问，当这个 key 在失效的瞬间，持续的大并发就穿破缓存，直接请求数据库，就像在一个屏障上凿开了一个洞。</p>
<p>当某个 key 在过期的瞬间，有大量的请求并发访问，这类数据一般是热点数据，由于缓存过期，会同时访问数据库来查询最新数据，并且回写缓存，会导使数据库瞬间压力过大。</p>
</blockquote>
<h4 id="设置热点数据永不过期" tabindex="-1"><a class="header-anchor" href="#设置热点数据永不过期" aria-hidden="true">#</a> 设置热点数据永不过期</h4>
<p>从缓存层面来看，没有设置过期时间，所以不会出现热点 key 过期后产生的问题。</p>
<h4 id="加互斥锁" tabindex="-1"><a class="header-anchor" href="#加互斥锁" aria-hidden="true">#</a> 加互斥锁</h4>
<p>分布式锁：使用分布式锁，保证对于每个 key 同时只有一个线程去查询后端服务，其他线程没有获得分布式锁的权限，因此只需要等待即可。这种方式将高并发的压力转移到了分布式锁，因此对分布式锁的考验很大。</p>
<h3 id="缓存雪崩" tabindex="-1"><a class="header-anchor" href="#缓存雪崩" aria-hidden="true">#</a> 缓存雪崩</h3>
<h4 id="概念-2" tabindex="-1"><a class="header-anchor" href="#概念-2" aria-hidden="true">#</a> 概念</h4>
<blockquote>
<p>缓存雪崩，是指在某一个时间段，缓存集中过期失效。</p>
<p>产生雪崩的原因之一，比如在写本文的时候，马上就要到双十二零点，很快就会迎来一波抢购，这波商品时间比较集中的放入了缓存，假设缓存一个小时。那么到了凌晨一点钟的时候，这批商品的缓存就都过期了。而对这批商品的访问查询，都落到了数据库上，对于数据库而言，就会产生周期性的压力波峰。于是所有的请求都会达到存储层，存储层的调用量会暴增，造成存储层也会挂掉的情况。</p>
</blockquote>
<p><img src="@source/Back/imgs/Redis/31.png" alt="31"></p>
<blockquote>
<p>其实集中过期，倒不是非常致命，比较致命的缓存雪崩，是缓存服务器某个节点宕机或断网。因为自然形成的缓存雪崩，一定是在某个时间段集中创建缓存，这个时候，数据库也是可以顶住压力的。无非就是对数据库产生周期性的压力而已。而缓存服务节点的宕机，对数据库服务器造成的压力是不可预知的，很有可能瞬间就把数据库压垮。</p>
</blockquote>
<h4 id="redis-高可用" tabindex="-1"><a class="header-anchor" href="#redis-高可用" aria-hidden="true">#</a> redis 高可用</h4>
<blockquote>
<p>这个思想的含义是，既然 redis 有可能挂掉，那我多增设几台 redis，这样一台挂掉之后其他的还可以继续工作，其实就是搭建的集群。</p>
</blockquote>
<h4 id="限流降级" tabindex="-1"><a class="header-anchor" href="#限流降级" aria-hidden="true">#</a> 限流降级</h4>
<blockquote>
<p>这个解决方案的思想是，在缓存失效后，通过加锁或者队列来控制读数据库写缓存的线程数量。比如对某个 key 只允许一个线程查询数据和写缓存，其他线程等待。</p>
</blockquote>
<h4 id="数据预热" tabindex="-1"><a class="header-anchor" href="#数据预热" aria-hidden="true">#</a> 数据预热</h4>
<blockquote>
<p>数据加热的含义就是在正式部署之前，我先把可能的数据先预先访问一遍，这样部分可能大量访问的数据就会加载到缓存中。在即将发生大并发访问前手动触发加载缓存不同的 key，设置不同的过期时间，让缓存失效的时间点尽量均匀。</p>
</blockquote>
<h2 id="jedis" tabindex="-1"><a class="header-anchor" href="#jedis" aria-hidden="true">#</a> Jedis</h2>
<blockquote>
<p>Jedis 是 Redis 官方推荐的 Java 连接开发工具。要在 Java 开发中使用好 Redis 中间件，必须对 Jedis 熟悉才能写成漂亮的代码</p>
</blockquote>
<h3 id="测试联通" tabindex="-1"><a class="header-anchor" href="#测试联通" aria-hidden="true">#</a> 测试联通</h3>
<ol>
<li>新建一个普通的 Maven 项目</li>
<li>导入 redis 的依赖！</li>
</ol>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token comment">&lt;!-- https://mvnrepository.com/artifact/redis.clients/jedis --></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>redis.clients<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>jedis<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>3.2.0<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>com.alibaba<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>fastjson<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>1.2.58<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><ol start="3">
<li>编写测试代码</li>
</ol>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>kuang<span class="token punctuation">.</span>ping</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">redis<span class="token punctuation">.</span>clients<span class="token punctuation">.</span>jedis<span class="token punctuation">.</span></span><span class="token class-name">Jedis</span></span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Ping</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Jedis</span> jedis <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Jedis</span><span class="token punctuation">(</span><span class="token string">"127.0.0.1"</span><span class="token punctuation">,</span> <span class="token number">6379</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"连接成功"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//查看服务是否运行</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"服务正在运行: "</span> <span class="token operator">+</span> jedis<span class="token punctuation">.</span><span class="token function">ping</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><ol start="4">
<li>启动redis服务</li>
<li>启动测试，结果</li>
</ol>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 连接成功</span>
<span class="token comment"># 服务正在运行:PONG</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h3 id="常用-api" tabindex="-1"><a class="header-anchor" href="#常用-api" aria-hidden="true">#</a> 常用 API</h3>
<h4 id="基本操作" tabindex="-1"><a class="header-anchor" href="#基本操作" aria-hidden="true">#</a> 基本操作</h4>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">TestPassword</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Jedis</span> jedis <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Jedis</span><span class="token punctuation">(</span><span class="token string">"127.0.0.1"</span><span class="token punctuation">,</span> <span class="token number">6379</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//验证密码，如果没有设置密码这段代码省略</span>
        <span class="token comment">// jedis.auth("password");</span>
        jedis<span class="token punctuation">.</span><span class="token function">connect</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//连接</span>
        jedis<span class="token punctuation">.</span><span class="token function">disconnect</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//断开连接</span>
        jedis<span class="token punctuation">.</span><span class="token function">flushAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//清空所有的key</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><h4 id="key" tabindex="-1"><a class="header-anchor" href="#key" aria-hidden="true">#</a> key</h4>
<table>
<thead>
<tr>
<th>方法</th>
<th>描述</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>flushDB()</code></td>
<td>清空当前选择数据库中的所有数据</td>
</tr>
<tr>
<td><code>exists(&quot;key&quot;)</code></td>
<td>判断指定键是否存在</td>
</tr>
<tr>
<td><code>set(&quot;key&quot;, &quot;value&quot;)</code></td>
<td>新增或修改指定键的值</td>
</tr>
<tr>
<td><code>keys(&quot;*&quot;)</code></td>
<td>获取系统中所有的键</td>
</tr>
<tr>
<td><code>del(&quot;key&quot;)</code></td>
<td>删除指定键及其对应的值</td>
</tr>
<tr>
<td><code>type(&quot;key&quot;)</code></td>
<td>获取指定键对应的值的类型</td>
</tr>
<tr>
<td><code>randomKey()</code></td>
<td>随机返回一个键</td>
</tr>
<tr>
<td><code>rename(&quot;oldKey&quot;, &quot;newKey&quot;)</code></td>
<td>重命名指定键</td>
</tr>
<tr>
<td><code>get(&quot;key&quot;)</code></td>
<td>获取指定键对应的值</td>
</tr>
<tr>
<td><code>select(index)</code></td>
<td>选择指定索引的数据库</td>
</tr>
<tr>
<td><code>dbSize()</code></td>
<td>返回当前选择数据库中键的数量</td>
</tr>
<tr>
<td><code>flushAll()</code></td>
<td>删除所有数据库中的所有键和值</td>
</tr>
</tbody>
</table>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">TestKey</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Jedis</span> jedis <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Jedis</span><span class="token punctuation">(</span><span class="token string">"127.0.0.1"</span><span class="token punctuation">,</span> <span class="token number">6379</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"清空数据："</span> <span class="token operator">+</span> jedis<span class="token punctuation">.</span><span class="token function">flushDB</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"判断某个键是否存在："</span> <span class="token operator">+</span> jedis<span class="token punctuation">.</span><span class="token function">exists</span><span class="token punctuation">(</span><span class="token string">"username"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"新增&lt;'username','kuangshen'>的键值对："</span> <span class="token operator">+</span> jedis<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token string">"username"</span><span class="token punctuation">,</span> <span class="token string">"kuangshen"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"新增&lt;'password','password'>的键值对："</span> <span class="token operator">+</span> jedis<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token string">"password"</span><span class="token punctuation">,</span> <span class="token string">"password"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span><span class="token string">"系统中所有的键如下："</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Set</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">></span></span> keys <span class="token operator">=</span> jedis<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span><span class="token string">"*"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>keys<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"删除键password:"</span> <span class="token operator">+</span> jedis<span class="token punctuation">.</span><span class="token function">del</span><span class="token punctuation">(</span><span class="token string">"password"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"判断键password是否存在："</span> <span class="token operator">+</span> jedis<span class="token punctuation">.</span><span class="token function">exists</span><span class="token punctuation">(</span><span class="token string">"password"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"查看键username所存储的值的类型："</span> <span class="token operator">+</span> jedis<span class="token punctuation">.</span><span class="token function">type</span><span class="token punctuation">(</span><span class="token string">"username"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"随机返回key空间的一个："</span> <span class="token operator">+</span> jedis<span class="token punctuation">.</span><span class="token function">randomKey</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"重命名key："</span> <span class="token operator">+</span> jedis<span class="token punctuation">.</span><span class="token function">rename</span><span class="token punctuation">(</span><span class="token string">"username"</span><span class="token punctuation">,</span> <span class="token string">"name"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"取出改后的name："</span> <span class="token operator">+</span> jedis<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">"name"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"按索引查询："</span> <span class="token operator">+</span> jedis<span class="token punctuation">.</span><span class="token function">select</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"删除当前选择数据库中的所有key："</span> <span class="token operator">+</span> jedis<span class="token punctuation">.</span><span class="token function">flushDB</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"返回当前数据库中key的数目："</span> <span class="token operator">+</span> jedis<span class="token punctuation">.</span><span class="token function">dbSize</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"删除所有数据库中的所有key："</span> <span class="token operator">+</span> jedis<span class="token punctuation">.</span><span class="token function">flushAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div><h4 id="string" tabindex="-1"><a class="header-anchor" href="#string" aria-hidden="true">#</a> String</h4>
<table>
<thead>
<tr>
<th>方法</th>
<th>描述</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>set(&quot;key1&quot;, &quot;value1&quot;)</code></td>
<td>新增或修改指定键的值为 &quot;value1&quot;</td>
</tr>
<tr>
<td><code>del(&quot;key01&quot;, &quot;key02&quot;)</code></td>
<td>删除多个键及其对应的值</td>
</tr>
<tr>
<td><code>get(&quot;key1&quot;)</code></td>
<td>获取键 &quot;key1&quot; 对应的值（超过有效时间，返回 null）</td>
</tr>
<tr>
<td><code>append(&quot;key3&quot;, &quot;End&quot;)</code></td>
<td>在键 &quot;key3&quot; 的值后面追加 &quot;End&quot;</td>
</tr>
<tr>
<td><code>mset(&quot;key01&quot;, &quot;value01&quot;, &quot;key02&quot;, &quot;value02&quot;, &quot;key03&quot;, &quot;value03&quot;)</code></td>
<td>批量设置多个键值对</td>
</tr>
<tr>
<td><code>mget(&quot;key01&quot;, &quot;key02&quot;, &quot;key03&quot;)</code></td>
<td>获取多个键对应的值</td>
</tr>
<tr>
<td><code>setnx(&quot;key1&quot;, &quot;value1&quot;)</code></td>
<td>当键 &quot;key1&quot; 不存在时，新增键值对</td>
</tr>
<tr>
<td><code>setex(&quot;key3&quot;, 2, &quot;value3&quot;)</code></td>
<td>新增键值对，并设置有效时间为 2 秒</td>
</tr>
<tr>
<td><code>getSet(&quot;key2&quot;, &quot;key2GetSet&quot;)</code></td>
<td>获取键 &quot;key2&quot; 的原值，并将其更新为 &quot;key2GetSet&quot;</td>
</tr>
<tr>
<td><code>getrange(&quot;key2&quot;, 2, 4)</code></td>
<td>获取键 &quot;key2&quot; 的值的子串，起始位置为 2，结束位置为 4</td>
</tr>
</tbody>
</table>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">TestString</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Jedis</span> jedis <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Jedis</span><span class="token punctuation">(</span><span class="token string">"127.0.0.1"</span><span class="token punctuation">,</span> <span class="token number">6379</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        jedis<span class="token punctuation">.</span><span class="token function">flushDB</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"===========增加数据==========="</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>jedis<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token string">"key1"</span><span class="token punctuation">,</span> <span class="token string">"value1"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>jedis<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token string">"key2"</span><span class="token punctuation">,</span> <span class="token string">"value2"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>jedis<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token string">"key3"</span><span class="token punctuation">,</span> <span class="token string">"value3"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"删除键key2:"</span> <span class="token operator">+</span> jedis<span class="token punctuation">.</span><span class="token function">del</span><span class="token punctuation">(</span><span class="token string">"key2"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"获取键key2:"</span> <span class="token operator">+</span> jedis<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">"key2"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"修改key1:"</span> <span class="token operator">+</span> jedis<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token string">"key1"</span><span class="token punctuation">,</span> <span class="token string">"value1Changed"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"获取key1的值："</span> <span class="token operator">+</span> jedis<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">"key1"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"在key3后面加入值："</span> <span class="token operator">+</span> jedis<span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span><span class="token string">"key3"</span><span class="token punctuation">,</span> <span class="token string">"End"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"key3的值："</span> <span class="token operator">+</span> jedis<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">"key3"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"增加多个键值对："</span> <span class="token operator">+</span> jedis<span class="token punctuation">.</span><span class="token function">mset</span><span class="token punctuation">(</span><span class="token string">"key01"</span><span class="token punctuation">,</span> <span class="token string">"value01"</span><span class="token punctuation">,</span> <span class="token string">"key02"</span><span class="token punctuation">,</span> <span class="token string">"value02"</span><span class="token punctuation">,</span> <span class="token string">"key03"</span><span class="token punctuation">,</span> <span class="token string">"value03"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"获取多个键值对："</span> <span class="token operator">+</span> jedis<span class="token punctuation">.</span><span class="token function">mget</span><span class="token punctuation">(</span><span class="token string">"key01"</span><span class="token punctuation">,</span> <span class="token string">"key02"</span><span class="token punctuation">,</span> <span class="token string">"key03"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"获取多个键值对："</span> <span class="token operator">+</span> jedis<span class="token punctuation">.</span><span class="token function">mget</span><span class="token punctuation">(</span><span class="token string">"key01"</span><span class="token punctuation">,</span> <span class="token string">"key02"</span><span class="token punctuation">,</span> <span class="token string">"key03"</span><span class="token punctuation">,</span> <span class="token string">"key04"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"删除多个键值对："</span> <span class="token operator">+</span> jedis<span class="token punctuation">.</span><span class="token function">del</span><span class="token punctuation">(</span><span class="token string">"key01"</span><span class="token punctuation">,</span> <span class="token string">"key02"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"获取多个键值对："</span> <span class="token operator">+</span> jedis<span class="token punctuation">.</span><span class="token function">mget</span><span class="token punctuation">(</span><span class="token string">"key01"</span><span class="token punctuation">,</span> <span class="token string">"key02"</span><span class="token punctuation">,</span> <span class="token string">"key03"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        jedis<span class="token punctuation">.</span><span class="token function">flushDB</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"===========新增键值对防止覆盖原先值=============="</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>jedis<span class="token punctuation">.</span><span class="token function">setnx</span><span class="token punctuation">(</span><span class="token string">"key1"</span><span class="token punctuation">,</span> <span class="token string">"value1"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>jedis<span class="token punctuation">.</span><span class="token function">setnx</span><span class="token punctuation">(</span><span class="token string">"key2"</span><span class="token punctuation">,</span> <span class="token string">"value2"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>jedis<span class="token punctuation">.</span><span class="token function">setnx</span><span class="token punctuation">(</span><span class="token string">"key2"</span><span class="token punctuation">,</span> <span class="token string">"value2-new"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>jedis<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">"key1"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>jedis<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">"key2"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"===========新增键值对并设置有效时间============="</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>jedis<span class="token punctuation">.</span><span class="token function">setex</span><span class="token punctuation">(</span><span class="token string">"key3"</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token string">"value3"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>jedis<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">"key3"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token class-name">TimeUnit</span><span class="token punctuation">.</span><span class="token constant">SECONDS</span><span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">InterruptedException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>jedis<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">"key3"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"===========获取原值，更新为新值=========="</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>jedis<span class="token punctuation">.</span><span class="token function">getSet</span><span class="token punctuation">(</span><span class="token string">"key2"</span><span class="token punctuation">,</span> <span class="token string">"key2GetSet"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>jedis<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">"key2"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"获得key2的值的字串："</span> <span class="token operator">+</span> jedis<span class="token punctuation">.</span><span class="token function">getrange</span><span class="token punctuation">(</span><span class="token string">"key2"</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br></div></div><h4 id="list" tabindex="-1"><a class="header-anchor" href="#list" aria-hidden="true">#</a> List</h4>
<table>
<thead>
<tr>
<th>方法</th>
<th>描述</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>lpush(&quot;collections&quot;, &quot;ArrayList&quot;, &quot;Vector&quot;, &quot;Stack&quot;, &quot;HashMap&quot;, &quot;WeakHashMap&quot;, &quot;LinkedHashMap&quot;)</code></td>
<td>在列表左侧添加多个元素</td>
</tr>
<tr>
<td><code>lrange(&quot;collections&quot;, 0, num)</code></td>
<td><code>num = -1</code>：获取列表中所有元素，<code>num != -1</code>：获取列表中指定区间的元素</td>
</tr>
<tr>
<td><code>lrem(&quot;collections&quot;, 2, &quot;HashMap&quot;)</code></td>
<td>删除列表中指定元素的个数</td>
</tr>
<tr>
<td><code>ltrim(&quot;collections&quot;, 0, 3)</code></td>
<td>删除列表中指定区间之外的元素</td>
</tr>
<tr>
<td><code>lpop(&quot;collections&quot;)</code></td>
<td>列表左侧出栈</td>
</tr>
<tr>
<td><code>rpush(&quot;collections&quot;, &quot;EnumMap&quot;)</code></td>
<td>在列表右侧添加单个元素</td>
</tr>
<tr>
<td><code>rpop(&quot;collections&quot;)</code></td>
<td>列表右侧出栈</td>
</tr>
<tr>
<td><code>lset(&quot;collections&quot;, 1, &quot;LinkedArrayList&quot;)</code></td>
<td>修改列表指定下标的元素内容</td>
</tr>
<tr>
<td><code>llen(&quot;collections&quot;)</code></td>
<td>获取列表的长度</td>
</tr>
<tr>
<td><code>lindex(&quot;collections&quot;, 2)</code></td>
<td>获取列表指定下标的元素</td>
</tr>
<tr>
<td><code>lpush(&quot;sortedList&quot;, &quot;3&quot;, &quot;6&quot;, &quot;2&quot;, &quot;0&quot;, &quot;7&quot;, &quot;4&quot;)</code></td>
<td>在排序列表左侧添加多个元素</td>
</tr>
<tr>
<td><code>sort(&quot;sortedList&quot;)</code></td>
<td>对排序列表进行排序</td>
</tr>
</tbody>
</table>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">TestList</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Jedis</span> jedis <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Jedis</span><span class="token punctuation">(</span><span class="token string">"127.0.0.1"</span><span class="token punctuation">,</span> <span class="token number">6379</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        jedis<span class="token punctuation">.</span><span class="token function">flushDB</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"===========添加一个list==========="</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        jedis<span class="token punctuation">.</span><span class="token function">lpush</span><span class="token punctuation">(</span><span class="token string">"collections"</span><span class="token punctuation">,</span> <span class="token string">"ArrayList"</span><span class="token punctuation">,</span> <span class="token string">"Vector"</span><span class="token punctuation">,</span> <span class="token string">"Stack"</span><span class="token punctuation">,</span> <span class="token string">"HashMap"</span><span class="token punctuation">,</span> <span class="token string">"WeakHashMap"</span><span class="token punctuation">,</span> <span class="token string">"LinkedHashMap"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        jedis<span class="token punctuation">.</span><span class="token function">lpush</span><span class="token punctuation">(</span><span class="token string">"collections"</span><span class="token punctuation">,</span> <span class="token string">"HashSet"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        jedis<span class="token punctuation">.</span><span class="token function">lpush</span><span class="token punctuation">(</span><span class="token string">"collections"</span><span class="token punctuation">,</span> <span class="token string">"TreeSet"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        jedis<span class="token punctuation">.</span><span class="token function">lpush</span><span class="token punctuation">(</span><span class="token string">"collections"</span><span class="token punctuation">,</span> <span class="token string">"TreeMap"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"collections的内容："</span> <span class="token operator">+</span> jedis<span class="token punctuation">.</span><span class="token function">lrange</span><span class="token punctuation">(</span><span class="token string">"collections"</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//-1代表倒数第一个元素，-2代表倒数第二个元素,end为-1表示查询全部</span>

        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"collections区间0-3的元素："</span> <span class="token operator">+</span> jedis<span class="token punctuation">.</span><span class="token function">lrange</span><span class="token punctuation">(</span><span class="token string">"collections"</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"==============================="</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 删除列表指定的值 ，第二个参数为删除的个数（有重复时），后add进去的值先被删，类似于出栈</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"删除指定元素个数："</span> <span class="token operator">+</span> jedis<span class="token punctuation">.</span><span class="token function">lrem</span><span class="token punctuation">(</span><span class="token string">"collections"</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token string">"HashMap"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"collections的内容："</span> <span class="token operator">+</span> jedis<span class="token punctuation">.</span><span class="token function">lrange</span><span class="token punctuation">(</span><span class="token string">"collections"</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"删除下表0-3区间之外的元素："</span> <span class="token operator">+</span> jedis<span class="token punctuation">.</span><span class="token function">ltrim</span><span class="token punctuation">(</span><span class="token string">"collections"</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"collections的内容："</span> <span class="token operator">+</span> jedis<span class="token punctuation">.</span><span class="token function">lrange</span><span class="token punctuation">(</span><span class="token string">"collections"</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"collections列表出栈（左端）："</span> <span class="token operator">+</span> jedis<span class="token punctuation">.</span><span class="token function">lpop</span><span class="token punctuation">(</span><span class="token string">"collections"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"collections的内容："</span> <span class="token operator">+</span> jedis<span class="token punctuation">.</span><span class="token function">lrange</span><span class="token punctuation">(</span><span class="token string">"collections"</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"collections添加元素，从列表右端，与lpush相对应："</span> <span class="token operator">+</span> jedis<span class="token punctuation">.</span><span class="token function">rpush</span><span class="token punctuation">(</span><span class="token string">"collections"</span><span class="token punctuation">,</span> <span class="token string">"EnumMap"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"collections的内容："</span> <span class="token operator">+</span> jedis<span class="token punctuation">.</span><span class="token function">lrange</span><span class="token punctuation">(</span><span class="token string">"collections"</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"collections列表出栈（右端）："</span> <span class="token operator">+</span> jedis<span class="token punctuation">.</span><span class="token function">rpop</span><span class="token punctuation">(</span><span class="token string">"collections"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"collections的内容："</span> <span class="token operator">+</span> jedis<span class="token punctuation">.</span><span class="token function">lrange</span><span class="token punctuation">(</span><span class="token string">"collections"</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"修改collections指定下标 1 的内容："</span> <span class="token operator">+</span> jedis<span class="token punctuation">.</span><span class="token function">lset</span><span class="token punctuation">(</span><span class="token string">"collections"</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token string">"LinkedArrayList"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"collections的内容："</span> <span class="token operator">+</span> jedis<span class="token punctuation">.</span><span class="token function">lrange</span><span class="token punctuation">(</span><span class="token string">"collections"</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"==============================="</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"collections的长度："</span> <span class="token operator">+</span> jedis<span class="token punctuation">.</span><span class="token function">llen</span><span class="token punctuation">(</span><span class="token string">"collections"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"获取collections下标为 2 的元素："</span> <span class="token operator">+</span> jedis<span class="token punctuation">.</span><span class="token function">lindex</span><span class="token punctuation">(</span><span class="token string">"collections"</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"==============================="</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        jedis<span class="token punctuation">.</span><span class="token function">lpush</span><span class="token punctuation">(</span><span class="token string">"sortedList"</span><span class="token punctuation">,</span> <span class="token string">"3"</span><span class="token punctuation">,</span> <span class="token string">"6"</span><span class="token punctuation">,</span> <span class="token string">"2"</span><span class="token punctuation">,</span> <span class="token string">"0"</span><span class="token punctuation">,</span> <span class="token string">"7"</span><span class="token punctuation">,</span> <span class="token string">"4"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"sortedList排序前："</span> <span class="token operator">+</span> jedis<span class="token punctuation">.</span><span class="token function">lrange</span><span class="token punctuation">(</span><span class="token string">"sortedList"</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>jedis<span class="token punctuation">.</span><span class="token function">sort</span><span class="token punctuation">(</span><span class="token string">"sortedList"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"sortedList排序后："</span> <span class="token operator">+</span> jedis<span class="token punctuation">.</span><span class="token function">lrange</span><span class="token punctuation">(</span><span class="token string">"sortedList"</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br></div></div><h4 id="set" tabindex="-1"><a class="header-anchor" href="#set" aria-hidden="true">#</a> Set</h4>
<table>
<thead>
<tr>
<th>方法</th>
<th>描述</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>sadd(key, member1, member2, ...)</code></td>
<td>向集合中添加元素，不重复</td>
</tr>
<tr>
<td><code>smembers(key)</code></td>
<td>获取集合中所有元素</td>
</tr>
<tr>
<td><code>srem(key, member1, member2, ...)</code></td>
<td>从集合中删除一个或多个元素</td>
</tr>
<tr>
<td><code>spop(key)</code></td>
<td>随机移除集合中的一个元素</td>
</tr>
<tr>
<td><code>scard(key)</code></td>
<td>返回集合中元素的数量</td>
</tr>
<tr>
<td><code>sismember(key, member)</code></td>
<td>判断元素是否在集合中</td>
</tr>
<tr>
<td><code>smove(srcKey, dstKey, member)</code></td>
<td>将集合srcKey中的元素member移到集合dstKey中</td>
</tr>
<tr>
<td><code>sinter(key1, key2, ...)</code></td>
<td>返回多个集合的交集</td>
</tr>
<tr>
<td><code>sunion(key1, key2, ...)</code></td>
<td>返回多个集合的并集</td>
</tr>
<tr>
<td><code>sdiff(key1, key2, ...)</code></td>
<td>返回多个集合的差集</td>
</tr>
<tr>
<td><code>sinterstore(dstKey, key1, key2, ...)</code></td>
<td>求多个集合的交集，并将结果保存到dstKey的集合中</td>
</tr>
</tbody>
</table>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">TestSet</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Jedis</span> jedis <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Jedis</span><span class="token punctuation">(</span><span class="token string">"127.0.0.1"</span><span class="token punctuation">,</span> <span class="token number">6379</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        jedis<span class="token punctuation">.</span><span class="token function">flushDB</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"============向集合中添加元素（不重复）============"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>jedis<span class="token punctuation">.</span><span class="token function">sadd</span><span class="token punctuation">(</span><span class="token string">"eleSet"</span><span class="token punctuation">,</span> <span class="token string">"e1"</span><span class="token punctuation">,</span> <span class="token string">"e2"</span><span class="token punctuation">,</span> <span class="token string">"e4"</span><span class="token punctuation">,</span> <span class="token string">"e3"</span><span class="token punctuation">,</span> <span class="token string">"e0"</span><span class="token punctuation">,</span> <span class="token string">"e8"</span><span class="token punctuation">,</span> <span class="token string">"e7"</span><span class="token punctuation">,</span> <span class="token string">"e5"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>jedis<span class="token punctuation">.</span><span class="token function">sadd</span><span class="token punctuation">(</span><span class="token string">"eleSet"</span><span class="token punctuation">,</span> <span class="token string">"e6"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>jedis<span class="token punctuation">.</span><span class="token function">sadd</span><span class="token punctuation">(</span><span class="token string">"eleSet"</span><span class="token punctuation">,</span> <span class="token string">"e6"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"eleSet的所有元素为："</span> <span class="token operator">+</span> jedis<span class="token punctuation">.</span><span class="token function">smembers</span><span class="token punctuation">(</span><span class="token string">"eleSet"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"删除一个元素e0："</span> <span class="token operator">+</span> jedis<span class="token punctuation">.</span><span class="token function">srem</span><span class="token punctuation">(</span><span class="token string">"eleSet"</span><span class="token punctuation">,</span> <span class="token string">"e0"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"eleSet的所有元素为："</span> <span class="token operator">+</span> jedis<span class="token punctuation">.</span><span class="token function">smembers</span><span class="token punctuation">(</span><span class="token string">"eleSet"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"删除两个元素e7和e6："</span> <span class="token operator">+</span> jedis<span class="token punctuation">.</span><span class="token function">srem</span><span class="token punctuation">(</span><span class="token string">"eleSet"</span><span class="token punctuation">,</span> <span class="token string">"e7"</span><span class="token punctuation">,</span> <span class="token string">"e6"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"eleSet的所有元素为："</span> <span class="token operator">+</span> jedis<span class="token punctuation">.</span><span class="token function">smembers</span><span class="token punctuation">(</span><span class="token string">"eleSet"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"随机的移除集合中的一个元素："</span> <span class="token operator">+</span> jedis<span class="token punctuation">.</span><span class="token function">spop</span><span class="token punctuation">(</span><span class="token string">"eleSet"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"随机的移除集合中的一个元素："</span> <span class="token operator">+</span> jedis<span class="token punctuation">.</span><span class="token function">spop</span><span class="token punctuation">(</span><span class="token string">"eleSet"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"eleSet的所有元素为："</span> <span class="token operator">+</span> jedis<span class="token punctuation">.</span><span class="token function">smembers</span><span class="token punctuation">(</span><span class="token string">"eleSet"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"eleSet中包含元素的个数："</span> <span class="token operator">+</span> jedis<span class="token punctuation">.</span><span class="token function">scard</span><span class="token punctuation">(</span><span class="token string">"eleSet"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"e3是否在eleSet中："</span> <span class="token operator">+</span> jedis<span class="token punctuation">.</span><span class="token function">sismember</span><span class="token punctuation">(</span><span class="token string">"eleSet"</span><span class="token punctuation">,</span> <span class="token string">"e3"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"e1是否在eleSet中："</span> <span class="token operator">+</span> jedis<span class="token punctuation">.</span><span class="token function">sismember</span><span class="token punctuation">(</span><span class="token string">"eleSet"</span><span class="token punctuation">,</span> <span class="token string">"e1"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"e1是否在eleSet中："</span> <span class="token operator">+</span> jedis<span class="token punctuation">.</span><span class="token function">sismember</span><span class="token punctuation">(</span><span class="token string">"eleSet"</span><span class="token punctuation">,</span> <span class="token string">"e5"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"================================="</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>jedis<span class="token punctuation">.</span><span class="token function">sadd</span><span class="token punctuation">(</span><span class="token string">"eleSet1"</span><span class="token punctuation">,</span> <span class="token string">"e1"</span><span class="token punctuation">,</span> <span class="token string">"e2"</span><span class="token punctuation">,</span> <span class="token string">"e4"</span><span class="token punctuation">,</span> <span class="token string">"e3"</span><span class="token punctuation">,</span> <span class="token string">"e0"</span><span class="token punctuation">,</span> <span class="token string">"e8"</span><span class="token punctuation">,</span> <span class="token string">"e7"</span><span class="token punctuation">,</span> <span class="token string">"e5"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>jedis<span class="token punctuation">.</span><span class="token function">sadd</span><span class="token punctuation">(</span><span class="token string">"eleSet2"</span><span class="token punctuation">,</span> <span class="token string">"e1"</span><span class="token punctuation">,</span> <span class="token string">"e2"</span><span class="token punctuation">,</span> <span class="token string">"e4"</span><span class="token punctuation">,</span> <span class="token string">"e3"</span><span class="token punctuation">,</span> <span class="token string">"e0"</span><span class="token punctuation">,</span> <span class="token string">"e8"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"将eleSet1中删除e1并存入eleSet3中："</span> <span class="token operator">+</span> jedis<span class="token punctuation">.</span><span class="token function">smove</span><span class="token punctuation">(</span><span class="token string">"eleSet1"</span><span class="token punctuation">,</span> <span class="token string">"eleSet3"</span><span class="token punctuation">,</span> <span class="token string">"e1"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//移到集合元素</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"将eleSet1中删除e2并存入eleSet3中："</span> <span class="token operator">+</span> jedis<span class="token punctuation">.</span><span class="token function">smove</span><span class="token punctuation">(</span><span class="token string">"eleSet1"</span><span class="token punctuation">,</span> <span class="token string">"eleSet3"</span><span class="token punctuation">,</span> <span class="token string">"e2"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"eleSet1中的元素："</span> <span class="token operator">+</span> jedis<span class="token punctuation">.</span><span class="token function">smembers</span><span class="token punctuation">(</span><span class="token string">"eleSet1"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"eleSet3中的元素："</span> <span class="token operator">+</span> jedis<span class="token punctuation">.</span><span class="token function">smembers</span><span class="token punctuation">(</span><span class="token string">"eleSet3"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"============集合运算================="</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"eleSet1中的元素："</span> <span class="token operator">+</span> jedis<span class="token punctuation">.</span><span class="token function">smembers</span><span class="token punctuation">(</span><span class="token string">"eleSet1"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"eleSet2中的元素："</span> <span class="token operator">+</span> jedis<span class="token punctuation">.</span><span class="token function">smembers</span><span class="token punctuation">(</span><span class="token string">"eleSet2"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"eleSet1和eleSet2的交集:"</span> <span class="token operator">+</span> jedis<span class="token punctuation">.</span><span class="token function">sinter</span><span class="token punctuation">(</span><span class="token string">"eleSet1"</span><span class="token punctuation">,</span> <span class="token string">"eleSet2"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"eleSet1和eleSet2的并集:"</span> <span class="token operator">+</span> jedis<span class="token punctuation">.</span><span class="token function">sunion</span><span class="token punctuation">(</span><span class="token string">"eleSet1"</span><span class="token punctuation">,</span> <span class="token string">"eleSet2"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"eleSet1和eleSet2的差集:"</span> <span class="token operator">+</span> jedis<span class="token punctuation">.</span><span class="token function">sdiff</span><span class="token punctuation">(</span><span class="token string">"eleSet1"</span><span class="token punctuation">,</span> <span class="token string">"eleSet2"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//eleSet1中有，eleSet2中没有</span>
        jedis<span class="token punctuation">.</span><span class="token function">sinterstore</span><span class="token punctuation">(</span><span class="token string">"eleSet4"</span><span class="token punctuation">,</span> <span class="token string">"eleSet1"</span><span class="token punctuation">,</span> <span class="token string">"eleSet2"</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//求交集并将交集保存到dstkey的集合</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"eleSet4中的元素："</span> <span class="token operator">+</span> jedis<span class="token punctuation">.</span><span class="token function">smembers</span><span class="token punctuation">(</span><span class="token string">"eleSet4"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br></div></div><h4 id="hash" tabindex="-1"><a class="header-anchor" href="#hash" aria-hidden="true">#</a> Hash</h4>
<table>
<thead>
<tr>
<th>方法</th>
<th>描述</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>jedis.hmset(&quot;hash&quot;, map)</code></td>
<td>添加名称为hash的hash元素</td>
</tr>
<tr>
<td><code>jedis.hmget(&quot;hash&quot;, &quot;key3&quot;, &quot;key4&quot;)</code></td>
<td>获取hash中的值</td>
</tr>
<tr>
<td><code>jedis.hset(&quot;hash&quot;, &quot;key5&quot;, &quot;value5&quot;)</code></td>
<td>向名称为hash的hash中添加key为key5，value为value5元素</td>
</tr>
<tr>
<td><code>jedis.hgetAll(&quot;hash&quot;)</code></td>
<td>获取散列hash的所有键值对</td>
</tr>
<tr>
<td><code>jedis.hkeys(&quot;hash&quot;)</code></td>
<td>获取散列hash的所有键</td>
</tr>
<tr>
<td><code>jedis.hvals(&quot;hash&quot;)</code></td>
<td>获取散列hash的所有值</td>
</tr>
<tr>
<td><code>jedis.hincrBy(&quot;hash&quot;, &quot;key6&quot;, 6)</code></td>
<td>将key6保存的值加上一个整数，如果key6不存在则添加key6</td>
</tr>
<tr>
<td><code>jedis.hdel(&quot;hash&quot;, &quot;key2&quot;)</code></td>
<td>删除一个或者多个键值对</td>
</tr>
<tr>
<td><code>jedis.hlen(&quot;hash&quot;)</code></td>
<td>获取散列hash中键值对的个数</td>
</tr>
<tr>
<td><code>jedis.hexists(&quot;hash&quot;, &quot;key2&quot;)</code></td>
<td>判断hash中是否存在key2</td>
</tr>
</tbody>
</table>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">TestHash</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Jedis</span> jedis <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Jedis</span><span class="token punctuation">(</span><span class="token string">"127.0.0.1"</span><span class="token punctuation">,</span> <span class="token number">6379</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        jedis<span class="token punctuation">.</span><span class="token function">flushDB</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">></span></span> map <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        map<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">"key1"</span><span class="token punctuation">,</span> <span class="token string">"value1"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        map<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">"key2"</span><span class="token punctuation">,</span> <span class="token string">"value2"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        map<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">"key3"</span><span class="token punctuation">,</span> <span class="token string">"value3"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        map<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">"key4"</span><span class="token punctuation">,</span> <span class="token string">"value4"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//添加名称为hash（key）的hash元素</span>
        jedis<span class="token punctuation">.</span><span class="token function">hmset</span><span class="token punctuation">(</span><span class="token string">"hash"</span><span class="token punctuation">,</span> map<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//向名称为hash的hash中添加key为key5，value为value5元素</span>
        jedis<span class="token punctuation">.</span><span class="token function">hset</span><span class="token punctuation">(</span><span class="token string">"hash"</span><span class="token punctuation">,</span> <span class="token string">"key5"</span><span class="token punctuation">,</span> <span class="token string">"value5"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"散列hash的所有键值对为："</span> <span class="token operator">+</span> jedis<span class="token punctuation">.</span><span class="token function">hgetAll</span><span class="token punctuation">(</span><span class="token string">"hash"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//return Map&lt;String,String></span>

        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"散列hash的所有键为："</span> <span class="token operator">+</span> jedis<span class="token punctuation">.</span><span class="token function">hkeys</span><span class="token punctuation">(</span><span class="token string">"hash"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//return</span>
        <span class="token class-name">Set</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">></span></span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"散列hash的所有值为："</span> <span class="token operator">+</span> jedis<span class="token punctuation">.</span><span class="token function">hvals</span><span class="token punctuation">(</span><span class="token string">"hash"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//return</span>
        <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">></span></span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"将key6保存的值加上一个整数，如果key6不存在则添加key6："</span> <span class="token operator">+</span> jedis<span class="token punctuation">.</span><span class="token function">hincrBy</span><span class="token punctuation">(</span><span class="token string">"hash"</span><span class="token punctuation">,</span> <span class="token string">"key6"</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"散列hash的所有键值对为："</span> <span class="token operator">+</span> jedis<span class="token punctuation">.</span><span class="token function">hgetAll</span><span class="token punctuation">(</span><span class="token string">"hash"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"将key6保存的值加上一个整数，如果key6不存在则添加key6："</span> <span class="token operator">+</span> jedis<span class="token punctuation">.</span><span class="token function">hincrBy</span><span class="token punctuation">(</span><span class="token string">"hash"</span><span class="token punctuation">,</span> <span class="token string">"key6"</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"散列hash的所有键值对为："</span> <span class="token operator">+</span> jedis<span class="token punctuation">.</span><span class="token function">hgetAll</span><span class="token punctuation">(</span><span class="token string">"hash"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"删除一个或者多个键值对："</span> <span class="token operator">+</span> jedis<span class="token punctuation">.</span><span class="token function">hdel</span><span class="token punctuation">(</span><span class="token string">"hash"</span><span class="token punctuation">,</span> <span class="token string">"key2"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"散列hash的所有键值对为："</span> <span class="token operator">+</span> jedis<span class="token punctuation">.</span><span class="token function">hgetAll</span><span class="token punctuation">(</span><span class="token string">"hash"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"散列hash中键值对的个数："</span> <span class="token operator">+</span> jedis<span class="token punctuation">.</span><span class="token function">hlen</span><span class="token punctuation">(</span><span class="token string">"hash"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"判断hash中是否存在key2："</span> <span class="token operator">+</span> jedis<span class="token punctuation">.</span><span class="token function">hexists</span><span class="token punctuation">(</span><span class="token string">"hash"</span><span class="token punctuation">,</span> <span class="token string">"key2"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"判断hash中是否存在key3："</span> <span class="token operator">+</span> jedis<span class="token punctuation">.</span><span class="token function">hexists</span><span class="token punctuation">(</span><span class="token string">"hash"</span><span class="token punctuation">,</span> <span class="token string">"key3"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"获取hash中的值："</span> <span class="token operator">+</span> jedis<span class="token punctuation">.</span><span class="token function">hmget</span><span class="token punctuation">(</span><span class="token string">"hash"</span><span class="token punctuation">,</span> <span class="token string">"key3"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"获取hash中的值："</span> <span class="token operator">+</span> jedis<span class="token punctuation">.</span><span class="token function">hmget</span><span class="token punctuation">(</span><span class="token string">"hash"</span><span class="token punctuation">,</span> <span class="token string">"key3"</span><span class="token punctuation">,</span> <span class="token string">"key4"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br></div></div><h3 id="事务" tabindex="-1"><a class="header-anchor" href="#事务" aria-hidden="true">#</a> 事务</h3>
<table>
<thead>
<tr>
<th>方法</th>
<th>描述</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>jedis.multi()</code></td>
<td>开启事务</td>
</tr>
<tr>
<td><code>multi.exec()</code></td>
<td>执行进入队列的命令</td>
</tr>
<tr>
<td><code>multi.discard()</code></td>
<td>出现异常，回滚</td>
</tr>
<tr>
<td><code>multi.watch(key)</code></td>
<td>监视key，如果在事务执行之前key被其他命令所改动，则事务被打断</td>
</tr>
</tbody>
</table>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>kuang<span class="token punctuation">.</span>multi</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>alibaba<span class="token punctuation">.</span>fastjson<span class="token punctuation">.</span></span><span class="token class-name">JSONObject</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">redis<span class="token punctuation">.</span>clients<span class="token punctuation">.</span>jedis<span class="token punctuation">.</span></span><span class="token class-name">Jedis</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">redis<span class="token punctuation">.</span>clients<span class="token punctuation">.</span>jedis<span class="token punctuation">.</span></span><span class="token class-name">Transaction</span></span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">TestMulti</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">//创建客户端连接服务端，redis服务端需要被开启</span>
        <span class="token class-name">Jedis</span> jedis <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Jedis</span><span class="token punctuation">(</span><span class="token string">"127.0.0.1"</span><span class="token punctuation">,</span> <span class="token number">6379</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        jedis<span class="token punctuation">.</span><span class="token function">flushDB</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">JSONObject</span> jsonObject <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">JSONObject</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        jsonObject<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">"hello"</span><span class="token punctuation">,</span> <span class="token string">"world"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        jsonObject<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">"name"</span><span class="token punctuation">,</span> <span class="token string">"java"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//开启事务</span>
        <span class="token class-name">Transaction</span> multi <span class="token operator">=</span> jedis<span class="token punctuation">.</span><span class="token function">multi</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">String</span> result <span class="token operator">=</span> jsonObject<span class="token punctuation">.</span><span class="token function">toJSONString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token comment">//向redis存入一条数据</span>
            multi<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token string">"json"</span><span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">//再存入一条数据</span>
            multi<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token string">"json2"</span><span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">//这里引发了异常，用 0 作为被除数</span>
            <span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">100</span> <span class="token operator">/</span> <span class="token number">0</span><span class="token punctuation">;</span>
            <span class="token comment">//如果没有引发异常，执行进入队列的命令</span>
            multi<span class="token punctuation">.</span><span class="token function">exec</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">//如果出现异常，回滚</span>
            multi<span class="token punctuation">.</span><span class="token function">discard</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>jedis<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">"json"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>jedis<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">"json2"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">//最终关闭客户端</span>
            jedis<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br></div></div><h2 id="springboot-整合" tabindex="-1"><a class="header-anchor" href="#springboot-整合" aria-hidden="true">#</a> SpringBoot 整合</h2>
<h3 id="基础使用" tabindex="-1"><a class="header-anchor" href="#基础使用" aria-hidden="true">#</a> 基础使用</h3>
<blockquote>
<p>在 SpringBoot 中一般使用 RedisTemplate 提供的方法来操作 Redis。</p>
</blockquote>
<ul>
<li><code>JedisPoolConfig</code> (这个是配置连接池)</li>
<li><code>RedisConnectionFactory</code> 这个是配置连接信息，这里的 <code>RedisConnectionFactory</code> 是一个接口，我们需要使用它的实现类，在 SpringD Data Redis 方案中提供了以下四种工厂模型：
<ul>
<li><code>JredisConnectionFactory</code></li>
<li><code>JedisConnectionFactory</code></li>
<li><code>LettuceConnectionFactory</code></li>
<li><code>SrpConnectionFactory</code></li>
</ul>
</li>
<li><code>RedisTemplate</code> 基本操作</li>
</ul>
<ol>
<li>导入依赖</li>
</ol>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-data-redis<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><ol start="2">
<li>yaml 配置</li>
</ol>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">redis</span><span class="token punctuation">:</span>
    <span class="token key atrule">host</span><span class="token punctuation">:</span> 127.0.0.1
    <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">6379</span>
    <span class="token key atrule">password</span><span class="token punctuation">:</span> <span class="token number">123456</span>
    <span class="token key atrule">jedis</span><span class="token punctuation">:</span>
      <span class="token key atrule">pool</span><span class="token punctuation">:</span>
        <span class="token key atrule">max-active</span><span class="token punctuation">:</span> <span class="token number">8</span>
        <span class="token key atrule">max-wait</span><span class="token punctuation">:</span> <span class="token punctuation">-</span>1ms
        <span class="token key atrule">max-idle</span><span class="token punctuation">:</span> <span class="token number">500</span>
        <span class="token key atrule">min-idle</span><span class="token punctuation">:</span> <span class="token number">0</span>
    <span class="token key atrule">lettuce</span><span class="token punctuation">:</span>
    <span class="token key atrule">shutdown-timeout</span><span class="token punctuation">:</span> 0ms
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><ol start="3">
<li>测试</li>
</ol>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@SpringBootTest</span>
<span class="token keyword">class</span> <span class="token class-name">SpringbootRedisApplicationTests</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">RedisTemplate</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">></span></span> redisTemplate<span class="token punctuation">;</span>
    <span class="token annotation punctuation">@Test</span>
    <span class="token keyword">void</span> <span class="token function">contextLoads</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        redisTemplate<span class="token punctuation">.</span><span class="token function">opsForValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token string">"myKey"</span><span class="token punctuation">,</span> <span class="token string">"myValue"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>redisTemplate<span class="token punctuation">.</span><span class="token function">opsForValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">"myKey"</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><h3 id="封装工具类" tabindex="-1"><a class="header-anchor" href="#封装工具类" aria-hidden="true">#</a> 封装工具类</h3>
<ol>
<li>新建一个 SpringBoot 项目</li>
<li>导入 redis 的启动器</li>
</ol>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>spring-boot-starter-data-redis<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><ol start="3">
<li>配置 redis，可以查看 <code>RedisProperties</code> 分析</li>
</ol>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token comment"># Redis服务器地址</span>
spring.redis.host=127.0.0.1
<span class="token comment"># Redis服务器连接端口</span>
spring.redis.port= 6379
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><ol start="4">
<li>分析 <code>RedisAutoConfiguration</code> 自动配置类</li>
</ol>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Configuration</span><span class="token punctuation">(</span>proxyBeanMethods <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@ConditionalOnClass</span><span class="token punctuation">(</span><span class="token class-name">RedisOperations</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@EnableConfigurationProperties</span><span class="token punctuation">(</span><span class="token class-name">RedisProperties</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@Import</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token class-name">LettuceConnectionConfiguration</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token class-name">JedisConnectionConfiguration</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">RedisAutoConfiguration</span> <span class="token punctuation">{</span>
    <span class="token annotation punctuation">@Bean</span>
    <span class="token annotation punctuation">@ConditionalOnMissingBean</span><span class="token punctuation">(</span>name <span class="token operator">=</span> <span class="token string">"redisTemplate"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">RedisTemplate</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Object</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">></span></span>
    <span class="token function">redisTemplate</span><span class="token punctuation">(</span><span class="token class-name">RedisConnectionFactory</span> redisConnectionFactory<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">UnknownHostException</span> <span class="token punctuation">{</span>
        <span class="token class-name">RedisTemplate</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Object</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">></span></span> template <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">RedisTemplate</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        template<span class="token punctuation">.</span><span class="token function">setConnectionFactory</span><span class="token punctuation">(</span>redisConnectionFactory<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> template<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Bean</span>
    <span class="token annotation punctuation">@ConditionalOnMissingBean</span>
    <span class="token keyword">public</span> <span class="token class-name">StringRedisTemplate</span> <span class="token function">stringRedisTemplate</span><span class="token punctuation">(</span><span class="token class-name">RedisConnectionFactory</span> redisConnectionFactory<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">UnknownHostException</span> <span class="token punctuation">{</span>
        <span class="token class-name">StringRedisTemplate</span> template <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">StringRedisTemplate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        template<span class="token punctuation">.</span><span class="token function">setConnectionFactory</span><span class="token punctuation">(</span>redisConnectionFactory<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> template<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div><blockquote>
<p>通过源码可以看出，SpringBoot 自动帮我们在容器中生成了一个 <code>RedisTemplate</code> 和一个 <code>StringRedisTemplate。</code><br/>
但是，这个 <code>RedisTemplate</code> 的泛型是<code>&lt;Object,Object&gt;</code>，写代码不方便，需要写好多类型转换的代码；我们需要一个泛型为<code>&lt;String,Object&gt;</code>形式的 <code>RedisTemplate。</code><br/>
并且，这个 <code>RedisTemplate</code> 没有设置数据存在 Redis 时，key 及 value 的序列化方式。<br/>
看到这个<code>@ConditionalOnMissingBean</code> 注解后，就知道如果 Spring 容器中有了 <code>RedisTemplate</code> 对象了，这个自动配置的 <code>RedisTemplate</code> 不会实例化。因此我们可以直接自己写个配置类，配置 <code>RedisTemplate。</code></p>
</blockquote>
<ol start="5">
<li>既然自动配置不好用，就重新配置一个 <code>RedisTemplate</code></li>
</ol>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>kuang<span class="token punctuation">.</span>config</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>fasterxml<span class="token punctuation">.</span>jackson<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">JsonAutoDetect</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>fasterxml<span class="token punctuation">.</span>jackson<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">PropertyAccessor</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>fasterxml<span class="token punctuation">.</span>jackson<span class="token punctuation">.</span>databind<span class="token punctuation">.</span></span><span class="token class-name">ObjectMapper</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>context<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">Bean</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>context<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">Configuration</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>data<span class="token punctuation">.</span>redis<span class="token punctuation">.</span>connection<span class="token punctuation">.</span></span><span class="token class-name">RedisConnectionFactory</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>data<span class="token punctuation">.</span>redis<span class="token punctuation">.</span>core<span class="token punctuation">.</span></span><span class="token class-name">RedisTemplate</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>data<span class="token punctuation">.</span>redis<span class="token punctuation">.</span>serializer<span class="token punctuation">.</span></span><span class="token class-name">Jackson2JsonRedisSerializer</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>data<span class="token punctuation">.</span>redis<span class="token punctuation">.</span>serializer<span class="token punctuation">.</span></span><span class="token class-name">StringRedisSerializer</span></span><span class="token punctuation">;</span>

<span class="token annotation punctuation">@Configuration</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">RedisConfig</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Bean</span>
    <span class="token annotation punctuation">@SuppressWarnings</span><span class="token punctuation">(</span><span class="token string">"all"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">RedisTemplate</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">></span></span> <span class="token function">redisTemplate</span><span class="token punctuation">(</span><span class="token class-name">RedisConnectionFactory</span> factory<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">RedisTemplate</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">></span></span> template <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">RedisTemplate</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        template<span class="token punctuation">.</span><span class="token function">setConnectionFactory</span><span class="token punctuation">(</span>factory<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Jackson2JsonRedisSerializer</span> jackson2JsonRedisSerializer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Jackson2JsonRedisSerializer</span><span class="token punctuation">(</span><span class="token class-name">Object</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">ObjectMapper</span> om <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ObjectMapper</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        om<span class="token punctuation">.</span><span class="token function">setVisibility</span><span class="token punctuation">(</span><span class="token class-name">PropertyAccessor</span><span class="token punctuation">.</span><span class="token constant">ALL</span><span class="token punctuation">,</span> <span class="token class-name">JsonAutoDetect<span class="token punctuation">.</span>Visibility</span><span class="token punctuation">.</span><span class="token constant">ANY</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        om<span class="token punctuation">.</span><span class="token function">enableDefaultTyping</span><span class="token punctuation">(</span><span class="token class-name">ObjectMapper<span class="token punctuation">.</span>DefaultTyping</span><span class="token punctuation">.</span><span class="token constant">NON_FINAL</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        jackson2JsonRedisSerializer<span class="token punctuation">.</span><span class="token function">setObjectMapper</span><span class="token punctuation">(</span>om<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">StringRedisSerializer</span> stringRedisSerializer <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">StringRedisSerializer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// key采用String的序列化方式</span>
        template<span class="token punctuation">.</span><span class="token function">setKeySerializer</span><span class="token punctuation">(</span>stringRedisSerializer<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// hash的key也采用String的序列化方式</span>
        template<span class="token punctuation">.</span><span class="token function">setHashKeySerializer</span><span class="token punctuation">(</span>stringRedisSerializer<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// value序列化方式采用jackson</span>
        template<span class="token punctuation">.</span><span class="token function">setValueSerializer</span><span class="token punctuation">(</span>jackson2JsonRedisSerializer<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// hash的value序列化方式采用jackson</span>
        template<span class="token punctuation">.</span><span class="token function">setHashValueSerializer</span><span class="token punctuation">(</span>jackson2JsonRedisSerializer<span class="token punctuation">)</span><span class="token punctuation">;</span>
        template<span class="token punctuation">.</span><span class="token function">afterPropertiesSet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> template<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br></div></div><ol start="7">
<li>写一个 Redis 工具类（直接用 <code>RedisTemplate</code> 操作 Redis，需要很多行代码，因此直接封装好一个 <code>RedisUtils</code>，这样写代码更方便点。这个<code>RedisUtils</code> 交给 Spring 容器实例化，使用时直接注解注入。）</li>
</ol>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>kuang<span class="token punctuation">.</span>utils</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>beans<span class="token punctuation">.</span>factory<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">Autowired</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>data<span class="token punctuation">.</span>redis<span class="token punctuation">.</span>core<span class="token punctuation">.</span></span><span class="token class-name">RedisTemplate</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>stereotype<span class="token punctuation">.</span></span><span class="token class-name">Component</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">CollectionUtils</span></span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">List</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">Map</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">Set</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span>concurrent<span class="token punctuation">.</span></span><span class="token class-name">TimeUnit</span></span><span class="token punctuation">;</span>

<span class="token annotation punctuation">@Component</span>
<span class="token keyword">public</span> <span class="token keyword">final</span> <span class="token keyword">class</span> <span class="token class-name">RedisUtil</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">RedisTemplate</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">></span></span> redisTemplate<span class="token punctuation">;</span>
<span class="token comment">// =============================common============================</span>

    <span class="token doc-comment comment">/**
     * 指定缓存失效时间
     * <span class="token keyword">@param</span> <span class="token parameter">key</span> 键
     * <span class="token keyword">@param</span> <span class="token parameter">time</span> 时间(秒)
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">expire</span><span class="token punctuation">(</span><span class="token class-name">String</span> key<span class="token punctuation">,</span> <span class="token keyword">long</span> time<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>time <span class="token operator">></span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                redisTemplate<span class="token punctuation">.</span><span class="token function">expire</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> time<span class="token punctuation">,</span> <span class="token class-name">TimeUnit</span><span class="token punctuation">.</span><span class="token constant">SECONDS</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 根据key 获取过期时间
     * <span class="token keyword">@param</span> <span class="token parameter">key</span> 键 不能为null
     * <span class="token keyword">@return</span> 时间(秒) 返回 0 代表为永久有效
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">long</span> <span class="token function">getExpire</span><span class="token punctuation">(</span><span class="token class-name">String</span> key<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> redisTemplate<span class="token punctuation">.</span><span class="token function">getExpire</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> <span class="token class-name">TimeUnit</span><span class="token punctuation">.</span><span class="token constant">SECONDS</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 判断key是否存在
     * <span class="token keyword">@param</span> <span class="token parameter">key</span> 键
     * <span class="token keyword">@return</span> true 存在 false不存在
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">hasKey</span><span class="token punctuation">(</span><span class="token class-name">String</span> key<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> redisTemplate<span class="token punctuation">.</span><span class="token function">hasKey</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 删除缓存
     * <span class="token keyword">@param</span> <span class="token parameter">key</span> 可以传一个值 或多个
     */</span>
    <span class="token annotation punctuation">@SuppressWarnings</span><span class="token punctuation">(</span><span class="token string">"unchecked"</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">del</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> key<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>key <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> key<span class="token punctuation">.</span>length <span class="token operator">></span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>key<span class="token punctuation">.</span>length <span class="token operator">==</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                redisTemplate<span class="token punctuation">.</span><span class="token function">delete</span><span class="token punctuation">(</span>key<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                redisTemplate<span class="token punctuation">.</span><span class="token function">delete</span><span class="token punctuation">(</span><span class="token class-name">CollectionUtils</span><span class="token punctuation">.</span><span class="token function">arrayToList</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token comment">// ============================String=============================</span>

    <span class="token doc-comment comment">/**
     * 普通缓存获取
     * <span class="token keyword">@param</span> <span class="token parameter">key</span> 键
     * <span class="token keyword">@return</span> 值
     */</span>
    <span class="token keyword">public</span> <span class="token class-name">Object</span> <span class="token function">get</span><span class="token punctuation">(</span><span class="token class-name">String</span> key<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> key <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">?</span> <span class="token keyword">null</span> <span class="token operator">:</span> redisTemplate<span class="token punctuation">.</span><span class="token function">opsForValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 普通缓存放入
     * <span class="token keyword">@param</span> <span class="token parameter">key</span> 键
     * <span class="token keyword">@param</span> <span class="token parameter">value</span> 值
     * <span class="token keyword">@return</span> true成功 false失败
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">set</span><span class="token punctuation">(</span><span class="token class-name">String</span> key<span class="token punctuation">,</span> <span class="token class-name">Object</span> value<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            redisTemplate<span class="token punctuation">.</span><span class="token function">opsForValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> value<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     普通缓存放入并设置时间
     * <span class="token keyword">@param</span> <span class="token parameter">key</span> 键
     * <span class="token keyword">@param</span> <span class="token parameter">value</span> 值
     * <span class="token keyword">@param</span> <span class="token parameter">time</span> 时间(秒) time要大于 0 如果time小于等于 0 将设置无限期
     * <span class="token keyword">@return</span> true成功 false 失败
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">set</span><span class="token punctuation">(</span><span class="token class-name">String</span> key<span class="token punctuation">,</span> <span class="token class-name">Object</span> value<span class="token punctuation">,</span> <span class="token keyword">long</span> time<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>time <span class="token operator">></span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                redisTemplate<span class="token punctuation">.</span><span class="token function">opsForValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> value<span class="token punctuation">,</span> time<span class="token punctuation">,</span>
                        <span class="token class-name">TimeUnit</span><span class="token punctuation">.</span><span class="token constant">SECONDS</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
                <span class="token function">set</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> value<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     递增
     * <span class="token keyword">@param</span> <span class="token parameter">key</span> 键
     * <span class="token keyword">@param</span> <span class="token parameter">delta</span> 要增加几(大于0)
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">long</span> <span class="token function">incr</span><span class="token punctuation">(</span><span class="token class-name">String</span> key<span class="token punctuation">,</span> <span class="token keyword">long</span> delta<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>delta <span class="token operator">&lt;</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">RuntimeException</span><span class="token punctuation">(</span><span class="token string">"递增因子必须大于0"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> redisTemplate<span class="token punctuation">.</span><span class="token function">opsForValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">increment</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> delta<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 递减
     * <span class="token keyword">@param</span> <span class="token parameter">key</span> 键
     * <span class="token keyword">@param</span> <span class="token parameter">delta</span> 要减少几(小于0)
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">long</span> <span class="token function">decr</span><span class="token punctuation">(</span><span class="token class-name">String</span> key<span class="token punctuation">,</span> <span class="token keyword">long</span> delta<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>delta <span class="token operator">&lt;</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">RuntimeException</span><span class="token punctuation">(</span><span class="token string">"递减因子必须大于0"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> redisTemplate<span class="token punctuation">.</span><span class="token function">opsForValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">increment</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> <span class="token operator">-</span>delta<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token comment">// ================================Map=================================</span>

    <span class="token doc-comment comment">/**
     * HashGet
     * <span class="token keyword">@param</span> <span class="token parameter">key</span> 键 不能为null
     * <span class="token keyword">@param</span> <span class="token parameter">item</span> 项 不能为null
     */</span>
    <span class="token keyword">public</span> <span class="token class-name">Object</span> <span class="token function">hget</span><span class="token punctuation">(</span><span class="token class-name">String</span> key<span class="token punctuation">,</span> <span class="token class-name">String</span> item<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> redisTemplate<span class="token punctuation">.</span><span class="token function">opsForHash</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> item<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 获取hashKey对应的所有键值
     * <span class="token keyword">@param</span> <span class="token parameter">key</span> 键
     * <span class="token keyword">@return</span> 对应的多个键值
     */</span>
    <span class="token keyword">public</span> <span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Object</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">></span></span> <span class="token function">hmget</span><span class="token punctuation">(</span><span class="token class-name">String</span> key<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> redisTemplate<span class="token punctuation">.</span><span class="token function">opsForHash</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">entries</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * HashSet
     * <span class="token keyword">@param</span> <span class="token parameter">key</span> 键
     * <span class="token keyword">@param</span> <span class="token parameter">map</span> 对应多个键值
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">hmset</span><span class="token punctuation">(</span><span class="token class-name">String</span> key<span class="token punctuation">,</span> <span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">></span></span> map<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            redisTemplate<span class="token punctuation">.</span><span class="token function">opsForHash</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">putAll</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> map<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * HashSet 并设置时间
     * <span class="token keyword">@param</span> <span class="token parameter">key</span> 键
     * <span class="token keyword">@param</span> <span class="token parameter">map</span> 对应多个键值
     * <span class="token keyword">@param</span> <span class="token parameter">time</span> 时间(秒)
     * <span class="token keyword">@return</span> true成功 false失败
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">hmset</span><span class="token punctuation">(</span><span class="token class-name">String</span> key<span class="token punctuation">,</span> <span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">></span></span> map<span class="token punctuation">,</span> <span class="token keyword">long</span> time<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            redisTemplate<span class="token punctuation">.</span><span class="token function">opsForHash</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">putAll</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> map<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>time <span class="token operator">></span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token function">expire</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> time<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 向一张hash表中放入数据,如果不存在将创建
     *
     * <span class="token keyword">@param</span> <span class="token parameter">key</span> 键
     * <span class="token keyword">@param</span> <span class="token parameter">item</span> 项
     * <span class="token keyword">@param</span> <span class="token parameter">value</span> 值
     * <span class="token keyword">@return</span> true 成功 false失败
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">hset</span><span class="token punctuation">(</span><span class="token class-name">String</span> key<span class="token punctuation">,</span> <span class="token class-name">String</span> item<span class="token punctuation">,</span> <span class="token class-name">Object</span> value<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            redisTemplate<span class="token punctuation">.</span><span class="token function">opsForHash</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> item<span class="token punctuation">,</span> value<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 向一张hash表中放入数据,如果不存在将创建
     *
     * <span class="token keyword">@param</span> <span class="token parameter">key</span> 键
     * <span class="token keyword">@param</span> <span class="token parameter">item</span> 项
     * <span class="token keyword">@param</span> <span class="token parameter">value</span> 值
     * <span class="token keyword">@param</span> <span class="token parameter">time</span> 时间(秒) 注意:如果已存在的hash表有时间,这里将会替换原有的时间
     * <span class="token keyword">@return</span> true 成功 false失败
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">hset</span><span class="token punctuation">(</span><span class="token class-name">String</span> key<span class="token punctuation">,</span> <span class="token class-name">String</span> item<span class="token punctuation">,</span> <span class="token class-name">Object</span> value<span class="token punctuation">,</span> <span class="token keyword">long</span> time<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            redisTemplate<span class="token punctuation">.</span><span class="token function">opsForHash</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> item<span class="token punctuation">,</span> value<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>time <span class="token operator">></span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token function">expire</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> time<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 删除hash表中的值
     *
     * <span class="token keyword">@param</span> <span class="token parameter">key</span> 键 不能为null
     * <span class="token keyword">@param</span> <span class="token parameter">item</span> 项 可以使多个 不能为null
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">hdel</span><span class="token punctuation">(</span><span class="token class-name">String</span> key<span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> item<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        redisTemplate<span class="token punctuation">.</span><span class="token function">opsForHash</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">delete</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> item<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 判断hash表中是否有该项的值
     *
     * <span class="token keyword">@param</span> <span class="token parameter">key</span> 键 不能为null
     * <span class="token keyword">@param</span> <span class="token parameter">item</span> 项 不能为null
     * <span class="token keyword">@return</span> true 存在 false不存在
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">hHasKey</span><span class="token punctuation">(</span><span class="token class-name">String</span> key<span class="token punctuation">,</span> <span class="token class-name">String</span> item<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> redisTemplate<span class="token punctuation">.</span><span class="token function">opsForHash</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">hasKey</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> item<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * hash递增 如果不存在,就会创建一个 并把新增后的值返回
     *
     * <span class="token keyword">@param</span> <span class="token parameter">key</span> 键
     * <span class="token keyword">@param</span> <span class="token parameter">item</span> 项
     * <span class="token keyword">@param</span> <span class="token parameter">by</span> 要增加几(大于0)
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">double</span> <span class="token function">hincr</span><span class="token punctuation">(</span><span class="token class-name">String</span> key<span class="token punctuation">,</span> <span class="token class-name">String</span> item<span class="token punctuation">,</span> <span class="token keyword">double</span> by<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> redisTemplate<span class="token punctuation">.</span><span class="token function">opsForHash</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">increment</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> item<span class="token punctuation">,</span> by<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * hash递减
     *
     * <span class="token keyword">@param</span> <span class="token parameter">key</span> 键
     * <span class="token keyword">@param</span> <span class="token parameter">item</span> 项
     * <span class="token keyword">@param</span> <span class="token parameter">by</span> 要减少记(小于0)
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">double</span> <span class="token function">hdecr</span><span class="token punctuation">(</span><span class="token class-name">String</span> key<span class="token punctuation">,</span> <span class="token class-name">String</span> item<span class="token punctuation">,</span> <span class="token keyword">double</span> by<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> redisTemplate<span class="token punctuation">.</span><span class="token function">opsForHash</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">increment</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> item<span class="token punctuation">,</span> <span class="token operator">-</span>by<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token comment">// ============================set=============================</span>

    <span class="token doc-comment comment">/**
     * 根据key获取Set中的所有值
     * <span class="token keyword">@param</span> <span class="token parameter">key</span> 键
     */</span>
    <span class="token keyword">public</span> <span class="token class-name">Set</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Object</span><span class="token punctuation">></span></span> <span class="token function">sGet</span><span class="token punctuation">(</span><span class="token class-name">String</span> key<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> redisTemplate<span class="token punctuation">.</span><span class="token function">opsForSet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">members</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 根据value从一个set中查询,是否存在
     *
     * <span class="token keyword">@param</span> <span class="token parameter">key</span> 键
     * <span class="token keyword">@param</span> <span class="token parameter">value</span> 值
     * <span class="token keyword">@return</span> true 存在 false不存在
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">sHasKey</span><span class="token punctuation">(</span><span class="token class-name">String</span> key<span class="token punctuation">,</span> <span class="token class-name">Object</span> value<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> redisTemplate<span class="token punctuation">.</span><span class="token function">opsForSet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isMember</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> value<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 将数据放入set缓存
     *
     * <span class="token keyword">@param</span> <span class="token parameter">key</span> 键
     * <span class="token keyword">@param</span> <span class="token parameter">values</span> 值 可以是多个
     * <span class="token keyword">@return</span> 成功个数
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">long</span> <span class="token function">sSet</span><span class="token punctuation">(</span><span class="token class-name">String</span> key<span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> values<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> redisTemplate<span class="token punctuation">.</span><span class="token function">opsForSet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> values<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 将set数据放入缓存
     *
     * <span class="token keyword">@param</span> <span class="token parameter">key</span> 键
     * <span class="token keyword">@param</span> <span class="token parameter">time</span> 时间(秒)
     * <span class="token keyword">@param</span> <span class="token parameter">values</span> 值 可以是多个
     * <span class="token keyword">@return</span> 成功个数
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">long</span> <span class="token function">sSetAndTime</span><span class="token punctuation">(</span><span class="token class-name">String</span> key<span class="token punctuation">,</span> <span class="token keyword">long</span> time<span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> values<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token class-name">Long</span> count <span class="token operator">=</span> redisTemplate<span class="token punctuation">.</span><span class="token function">opsForSet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> values<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>time <span class="token operator">></span> <span class="token number">0</span><span class="token punctuation">)</span>
                <span class="token function">expire</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> time<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> count<span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 获取set缓存的长度
     * <span class="token keyword">@param</span> <span class="token parameter">key</span> 键
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">long</span> <span class="token function">sGetSetSize</span><span class="token punctuation">(</span><span class="token class-name">String</span> key<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> redisTemplate<span class="token punctuation">.</span><span class="token function">opsForSet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 移除值为value的
     *
     * <span class="token keyword">@param</span> <span class="token parameter">key</span> 键
     * <span class="token keyword">@param</span> <span class="token parameter">values</span> 值 可以是多个
     * <span class="token keyword">@return</span> 移除的个数
     */</span>

    <span class="token keyword">public</span> <span class="token keyword">long</span> <span class="token function">setRemove</span><span class="token punctuation">(</span><span class="token class-name">String</span> key<span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> values<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token class-name">Long</span> count <span class="token operator">=</span> redisTemplate<span class="token punctuation">.</span><span class="token function">opsForSet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> values<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> count<span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token comment">// ===============================list=================================</span>

    <span class="token doc-comment comment">/**
     * 获取list缓存的内容
     *
     * <span class="token keyword">@param</span> <span class="token parameter">key</span> 键
     * <span class="token keyword">@param</span> <span class="token parameter">start</span> 开始
     * <span class="token keyword">@param</span> <span class="token parameter">end</span> 结束 0 到 -1代表所有值
     */</span>
    <span class="token keyword">public</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Object</span><span class="token punctuation">></span></span> <span class="token function">lGet</span><span class="token punctuation">(</span><span class="token class-name">String</span> key<span class="token punctuation">,</span> <span class="token keyword">long</span> start<span class="token punctuation">,</span> <span class="token keyword">long</span> end<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> redisTemplate<span class="token punctuation">.</span><span class="token function">opsForList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">range</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> start<span class="token punctuation">,</span> end<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 获取list缓存的长度
     *
     * <span class="token keyword">@param</span> <span class="token parameter">key</span> 键
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">long</span> <span class="token function">lGetListSize</span><span class="token punctuation">(</span><span class="token class-name">String</span> key<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> redisTemplate<span class="token punctuation">.</span><span class="token function">opsForList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 通过索引 获取list中的值
     *
     * <span class="token keyword">@param</span> <span class="token parameter">key</span> 键
     * <span class="token keyword">@param</span> <span class="token parameter">index</span> 索引 index>=0时， 0 表头， 1 第二个元素，依次类推；index&lt;0
    时，-1，表尾，-2倒数第二个元素，依次类推
     */</span>
    <span class="token keyword">public</span> <span class="token class-name">Object</span> <span class="token function">lGetIndex</span><span class="token punctuation">(</span><span class="token class-name">String</span> key<span class="token punctuation">,</span> <span class="token keyword">long</span> index<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> redisTemplate<span class="token punctuation">.</span><span class="token function">opsForList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">index</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> index<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 将list放入缓存
     *
     * <span class="token keyword">@param</span> <span class="token parameter">key</span> 键
     * <span class="token keyword">@param</span> <span class="token parameter">value</span> 值
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">lSet</span><span class="token punctuation">(</span><span class="token class-name">String</span> key<span class="token punctuation">,</span> <span class="token class-name">Object</span> value<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            redisTemplate<span class="token punctuation">.</span><span class="token function">opsForList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">rightPush</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> value<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 将list放入缓存
     * <span class="token keyword">@param</span> <span class="token parameter">key</span> 键
     * <span class="token keyword">@param</span> <span class="token parameter">value</span> 值
     * <span class="token keyword">@param</span> <span class="token parameter">time</span> 时间(秒)
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">lSet</span><span class="token punctuation">(</span><span class="token class-name">String</span> key<span class="token punctuation">,</span> <span class="token class-name">Object</span> value<span class="token punctuation">,</span> <span class="token keyword">long</span> time<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            redisTemplate<span class="token punctuation">.</span><span class="token function">opsForList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">rightPush</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> value<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>time <span class="token operator">></span> <span class="token number">0</span><span class="token punctuation">)</span>
                <span class="token function">expire</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> time<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 将list放入缓存
     *
     * <span class="token keyword">@param</span> <span class="token parameter">key</span> 键
     * <span class="token keyword">@param</span> <span class="token parameter">value</span> 值
     * <span class="token keyword">@return</span>
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">lSet</span><span class="token punctuation">(</span><span class="token class-name">String</span> key<span class="token punctuation">,</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Object</span><span class="token punctuation">></span></span> value<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            redisTemplate<span class="token punctuation">.</span><span class="token function">opsForList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">rightPushAll</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> value<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 将list放入缓存
     *
     * <span class="token keyword">@param</span> <span class="token parameter">key</span> 键
     * <span class="token keyword">@param</span> <span class="token parameter">value</span> 值
     * <span class="token keyword">@param</span> <span class="token parameter">time</span> 时间(秒)
     * <span class="token keyword">@return</span>
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">lSet</span><span class="token punctuation">(</span><span class="token class-name">String</span> key<span class="token punctuation">,</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Object</span><span class="token punctuation">></span></span> value<span class="token punctuation">,</span> <span class="token keyword">long</span> time<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            redisTemplate<span class="token punctuation">.</span><span class="token function">opsForList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">rightPushAll</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> value<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>time <span class="token operator">></span> <span class="token number">0</span><span class="token punctuation">)</span>
                <span class="token function">expire</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> time<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 根据索引修改list中的某条数据
     *
     * <span class="token keyword">@param</span> <span class="token parameter">key</span> 键
     * <span class="token keyword">@param</span> <span class="token parameter">index</span> 索引
     * <span class="token keyword">@param</span> <span class="token parameter">value</span> 值
     * <span class="token keyword">@return</span>
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">lUpdateIndex</span><span class="token punctuation">(</span><span class="token class-name">String</span> key<span class="token punctuation">,</span> <span class="token keyword">long</span> index<span class="token punctuation">,</span> <span class="token class-name">Object</span> value<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            redisTemplate<span class="token punctuation">.</span><span class="token function">opsForList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> index<span class="token punctuation">,</span> value<span class="token punctuation">)</span><span class="token punctuation">;</span>
            ren <span class="token boolean">true</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 移除N个值为value
     *
     * <span class="token keyword">@param</span> <span class="token parameter">key</span> 键
     * <span class="token keyword">@param</span> <span class="token parameter">count</span> 移除多少个
     * <span class="token keyword">@param</span> <span class="token parameter">value</span> 值
     * <span class="token keyword">@return</span> 移除的个数
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">long</span> <span class="token function">lRemove</span><span class="token punctuation">(</span><span class="token class-name">String</span> key<span class="token punctuation">,</span> <span class="token keyword">long</span> count<span class="token punctuation">,</span> <span class="token class-name">Object</span> value<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token class-name">Long</span> remove <span class="token operator">=</span> redisTemplate<span class="token punctuation">.</span><span class="token function">opsForList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> count<span class="token punctuation">,</span> value<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> remove<span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br><span class="line-number">93</span><br><span class="line-number">94</span><br><span class="line-number">95</span><br><span class="line-number">96</span><br><span class="line-number">97</span><br><span class="line-number">98</span><br><span class="line-number">99</span><br><span class="line-number">100</span><br><span class="line-number">101</span><br><span class="line-number">102</span><br><span class="line-number">103</span><br><span class="line-number">104</span><br><span class="line-number">105</span><br><span class="line-number">106</span><br><span class="line-number">107</span><br><span class="line-number">108</span><br><span class="line-number">109</span><br><span class="line-number">110</span><br><span class="line-number">111</span><br><span class="line-number">112</span><br><span class="line-number">113</span><br><span class="line-number">114</span><br><span class="line-number">115</span><br><span class="line-number">116</span><br><span class="line-number">117</span><br><span class="line-number">118</span><br><span class="line-number">119</span><br><span class="line-number">120</span><br><span class="line-number">121</span><br><span class="line-number">122</span><br><span class="line-number">123</span><br><span class="line-number">124</span><br><span class="line-number">125</span><br><span class="line-number">126</span><br><span class="line-number">127</span><br><span class="line-number">128</span><br><span class="line-number">129</span><br><span class="line-number">130</span><br><span class="line-number">131</span><br><span class="line-number">132</span><br><span class="line-number">133</span><br><span class="line-number">134</span><br><span class="line-number">135</span><br><span class="line-number">136</span><br><span class="line-number">137</span><br><span class="line-number">138</span><br><span class="line-number">139</span><br><span class="line-number">140</span><br><span class="line-number">141</span><br><span class="line-number">142</span><br><span class="line-number">143</span><br><span class="line-number">144</span><br><span class="line-number">145</span><br><span class="line-number">146</span><br><span class="line-number">147</span><br><span class="line-number">148</span><br><span class="line-number">149</span><br><span class="line-number">150</span><br><span class="line-number">151</span><br><span class="line-number">152</span><br><span class="line-number">153</span><br><span class="line-number">154</span><br><span class="line-number">155</span><br><span class="line-number">156</span><br><span class="line-number">157</span><br><span class="line-number">158</span><br><span class="line-number">159</span><br><span class="line-number">160</span><br><span class="line-number">161</span><br><span class="line-number">162</span><br><span class="line-number">163</span><br><span class="line-number">164</span><br><span class="line-number">165</span><br><span class="line-number">166</span><br><span class="line-number">167</span><br><span class="line-number">168</span><br><span class="line-number">169</span><br><span class="line-number">170</span><br><span class="line-number">171</span><br><span class="line-number">172</span><br><span class="line-number">173</span><br><span class="line-number">174</span><br><span class="line-number">175</span><br><span class="line-number">176</span><br><span class="line-number">177</span><br><span class="line-number">178</span><br><span class="line-number">179</span><br><span class="line-number">180</span><br><span class="line-number">181</span><br><span class="line-number">182</span><br><span class="line-number">183</span><br><span class="line-number">184</span><br><span class="line-number">185</span><br><span class="line-number">186</span><br><span class="line-number">187</span><br><span class="line-number">188</span><br><span class="line-number">189</span><br><span class="line-number">190</span><br><span class="line-number">191</span><br><span class="line-number">192</span><br><span class="line-number">193</span><br><span class="line-number">194</span><br><span class="line-number">195</span><br><span class="line-number">196</span><br><span class="line-number">197</span><br><span class="line-number">198</span><br><span class="line-number">199</span><br><span class="line-number">200</span><br><span class="line-number">201</span><br><span class="line-number">202</span><br><span class="line-number">203</span><br><span class="line-number">204</span><br><span class="line-number">205</span><br><span class="line-number">206</span><br><span class="line-number">207</span><br><span class="line-number">208</span><br><span class="line-number">209</span><br><span class="line-number">210</span><br><span class="line-number">211</span><br><span class="line-number">212</span><br><span class="line-number">213</span><br><span class="line-number">214</span><br><span class="line-number">215</span><br><span class="line-number">216</span><br><span class="line-number">217</span><br><span class="line-number">218</span><br><span class="line-number">219</span><br><span class="line-number">220</span><br><span class="line-number">221</span><br><span class="line-number">222</span><br><span class="line-number">223</span><br><span class="line-number">224</span><br><span class="line-number">225</span><br><span class="line-number">226</span><br><span class="line-number">227</span><br><span class="line-number">228</span><br><span class="line-number">229</span><br><span class="line-number">230</span><br><span class="line-number">231</span><br><span class="line-number">232</span><br><span class="line-number">233</span><br><span class="line-number">234</span><br><span class="line-number">235</span><br><span class="line-number">236</span><br><span class="line-number">237</span><br><span class="line-number">238</span><br><span class="line-number">239</span><br><span class="line-number">240</span><br><span class="line-number">241</span><br><span class="line-number">242</span><br><span class="line-number">243</span><br><span class="line-number">244</span><br><span class="line-number">245</span><br><span class="line-number">246</span><br><span class="line-number">247</span><br><span class="line-number">248</span><br><span class="line-number">249</span><br><span class="line-number">250</span><br><span class="line-number">251</span><br><span class="line-number">252</span><br><span class="line-number">253</span><br><span class="line-number">254</span><br><span class="line-number">255</span><br><span class="line-number">256</span><br><span class="line-number">257</span><br><span class="line-number">258</span><br><span class="line-number">259</span><br><span class="line-number">260</span><br><span class="line-number">261</span><br><span class="line-number">262</span><br><span class="line-number">263</span><br><span class="line-number">264</span><br><span class="line-number">265</span><br><span class="line-number">266</span><br><span class="line-number">267</span><br><span class="line-number">268</span><br><span class="line-number">269</span><br><span class="line-number">270</span><br><span class="line-number">271</span><br><span class="line-number">272</span><br><span class="line-number">273</span><br><span class="line-number">274</span><br><span class="line-number">275</span><br><span class="line-number">276</span><br><span class="line-number">277</span><br><span class="line-number">278</span><br><span class="line-number">279</span><br><span class="line-number">280</span><br><span class="line-number">281</span><br><span class="line-number">282</span><br><span class="line-number">283</span><br><span class="line-number">284</span><br><span class="line-number">285</span><br><span class="line-number">286</span><br><span class="line-number">287</span><br><span class="line-number">288</span><br><span class="line-number">289</span><br><span class="line-number">290</span><br><span class="line-number">291</span><br><span class="line-number">292</span><br><span class="line-number">293</span><br><span class="line-number">294</span><br><span class="line-number">295</span><br><span class="line-number">296</span><br><span class="line-number">297</span><br><span class="line-number">298</span><br><span class="line-number">299</span><br><span class="line-number">300</span><br><span class="line-number">301</span><br><span class="line-number">302</span><br><span class="line-number">303</span><br><span class="line-number">304</span><br><span class="line-number">305</span><br><span class="line-number">306</span><br><span class="line-number">307</span><br><span class="line-number">308</span><br><span class="line-number">309</span><br><span class="line-number">310</span><br><span class="line-number">311</span><br><span class="line-number">312</span><br><span class="line-number">313</span><br><span class="line-number">314</span><br><span class="line-number">315</span><br><span class="line-number">316</span><br><span class="line-number">317</span><br><span class="line-number">318</span><br><span class="line-number">319</span><br><span class="line-number">320</span><br><span class="line-number">321</span><br><span class="line-number">322</span><br><span class="line-number">323</span><br><span class="line-number">324</span><br><span class="line-number">325</span><br><span class="line-number">326</span><br><span class="line-number">327</span><br><span class="line-number">328</span><br><span class="line-number">329</span><br><span class="line-number">330</span><br><span class="line-number">331</span><br><span class="line-number">332</span><br><span class="line-number">333</span><br><span class="line-number">334</span><br><span class="line-number">335</span><br><span class="line-number">336</span><br><span class="line-number">337</span><br><span class="line-number">338</span><br><span class="line-number">339</span><br><span class="line-number">340</span><br><span class="line-number">341</span><br><span class="line-number">342</span><br><span class="line-number">343</span><br><span class="line-number">344</span><br><span class="line-number">345</span><br><span class="line-number">346</span><br><span class="line-number">347</span><br><span class="line-number">348</span><br><span class="line-number">349</span><br><span class="line-number">350</span><br><span class="line-number">351</span><br><span class="line-number">352</span><br><span class="line-number">353</span><br><span class="line-number">354</span><br><span class="line-number">355</span><br><span class="line-number">356</span><br><span class="line-number">357</span><br><span class="line-number">358</span><br><span class="line-number">359</span><br><span class="line-number">360</span><br><span class="line-number">361</span><br><span class="line-number">362</span><br><span class="line-number">363</span><br><span class="line-number">364</span><br><span class="line-number">365</span><br><span class="line-number">366</span><br><span class="line-number">367</span><br><span class="line-number">368</span><br><span class="line-number">369</span><br><span class="line-number">370</span><br><span class="line-number">371</span><br><span class="line-number">372</span><br><span class="line-number">373</span><br><span class="line-number">374</span><br><span class="line-number">375</span><br><span class="line-number">376</span><br><span class="line-number">377</span><br><span class="line-number">378</span><br><span class="line-number">379</span><br><span class="line-number">380</span><br><span class="line-number">381</span><br><span class="line-number">382</span><br><span class="line-number">383</span><br><span class="line-number">384</span><br><span class="line-number">385</span><br><span class="line-number">386</span><br><span class="line-number">387</span><br><span class="line-number">388</span><br><span class="line-number">389</span><br><span class="line-number">390</span><br><span class="line-number">391</span><br><span class="line-number">392</span><br><span class="line-number">393</span><br><span class="line-number">394</span><br><span class="line-number">395</span><br><span class="line-number">396</span><br><span class="line-number">397</span><br><span class="line-number">398</span><br><span class="line-number">399</span><br><span class="line-number">400</span><br><span class="line-number">401</span><br><span class="line-number">402</span><br><span class="line-number">403</span><br><span class="line-number">404</span><br><span class="line-number">405</span><br><span class="line-number">406</span><br><span class="line-number">407</span><br><span class="line-number">408</span><br><span class="line-number">409</span><br><span class="line-number">410</span><br><span class="line-number">411</span><br><span class="line-number">412</span><br><span class="line-number">413</span><br><span class="line-number">414</span><br><span class="line-number">415</span><br><span class="line-number">416</span><br><span class="line-number">417</span><br><span class="line-number">418</span><br><span class="line-number">419</span><br><span class="line-number">420</span><br><span class="line-number">421</span><br><span class="line-number">422</span><br><span class="line-number">423</span><br><span class="line-number">424</span><br><span class="line-number">425</span><br><span class="line-number">426</span><br><span class="line-number">427</span><br><span class="line-number">428</span><br><span class="line-number">429</span><br><span class="line-number">430</span><br><span class="line-number">431</span><br><span class="line-number">432</span><br><span class="line-number">433</span><br><span class="line-number">434</span><br><span class="line-number">435</span><br><span class="line-number">436</span><br><span class="line-number">437</span><br><span class="line-number">438</span><br><span class="line-number">439</span><br><span class="line-number">440</span><br><span class="line-number">441</span><br><span class="line-number">442</span><br><span class="line-number">443</span><br><span class="line-number">444</span><br><span class="line-number">445</span><br><span class="line-number">446</span><br><span class="line-number">447</span><br><span class="line-number">448</span><br><span class="line-number">449</span><br><span class="line-number">450</span><br><span class="line-number">451</span><br><span class="line-number">452</span><br><span class="line-number">453</span><br><span class="line-number">454</span><br><span class="line-number">455</span><br><span class="line-number">456</span><br><span class="line-number">457</span><br><span class="line-number">458</span><br><span class="line-number">459</span><br><span class="line-number">460</span><br><span class="line-number">461</span><br><span class="line-number">462</span><br><span class="line-number">463</span><br><span class="line-number">464</span><br><span class="line-number">465</span><br><span class="line-number">466</span><br><span class="line-number">467</span><br><span class="line-number">468</span><br><span class="line-number">469</span><br><span class="line-number">470</span><br><span class="line-number">471</span><br><span class="line-number">472</span><br><span class="line-number">473</span><br><span class="line-number">474</span><br><span class="line-number">475</span><br><span class="line-number">476</span><br><span class="line-number">477</span><br><span class="line-number">478</span><br><span class="line-number">479</span><br><span class="line-number">480</span><br><span class="line-number">481</span><br><span class="line-number">482</span><br><span class="line-number">483</span><br><span class="line-number">484</span><br><span class="line-number">485</span><br><span class="line-number">486</span><br><span class="line-number">487</span><br><span class="line-number">488</span><br><span class="line-number">489</span><br><span class="line-number">490</span><br><span class="line-number">491</span><br><span class="line-number">492</span><br><span class="line-number">493</span><br><span class="line-number">494</span><br><span class="line-number">495</span><br><span class="line-number">496</span><br><span class="line-number">497</span><br><span class="line-number">498</span><br><span class="line-number">499</span><br><span class="line-number">500</span><br><span class="line-number">501</span><br><span class="line-number">502</span><br><span class="line-number">503</span><br><span class="line-number">504</span><br><span class="line-number">505</span><br><span class="line-number">506</span><br><span class="line-number">507</span><br><span class="line-number">508</span><br><span class="line-number">509</span><br><span class="line-number">510</span><br><span class="line-number">511</span><br><span class="line-number">512</span><br><span class="line-number">513</span><br><span class="line-number">514</span><br><span class="line-number">515</span><br><span class="line-number">516</span><br><span class="line-number">517</span><br><span class="line-number">518</span><br><span class="line-number">519</span><br><span class="line-number">520</span><br><span class="line-number">521</span><br><span class="line-number">522</span><br><span class="line-number">523</span><br><span class="line-number">524</span><br><span class="line-number">525</span><br><span class="line-number">526</span><br><span class="line-number">527</span><br><span class="line-number">528</span><br><span class="line-number">529</span><br><span class="line-number">530</span><br><span class="line-number">531</span><br><span class="line-number">532</span><br><span class="line-number">533</span><br><span class="line-number">534</span><br><span class="line-number">535</span><br></div></div></template>
