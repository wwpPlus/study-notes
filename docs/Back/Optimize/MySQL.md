# MySQL

## 前言

文档涉及到的知识：

1. 深入理解Mysql索引底层数据结构与算法

- 索引底层数据结构红黑树、B+树详解

- 面试常问的B树与B+树的区别是什么

- 索引在B+树上如何快速定位

- 千万级数据表如何用B+树索引快速查找

- MylSAM与Innodb存储引擎底层索引实现区别

- 聚集索引、聚簇索引与稀疏索引到底是什么

- 为什么推荐使用自增整型的主键而不是UUID

- 很少使用的索引底层结构Hash是怎样的

- 联合索引底层数据存储结构又是怎样的

- 索引最左前缀原则底层实现原理

2. Explain详解与索引最佳实践

- Mysql执行计划Explain工具详解

- Mysql优化经常用到的覆盖索引详解

- 从B+树底层来分析下常见索引优化规则

- 经常用到的like查询应该如何优化

- 索引优化最佳实践

3. —条SQL在MySQL中是如何执行的

- 梳理下MySQL内部组件结构

- 为什么说Mysql的查询缓存很鸡肋

- Mysql词法分析器原理详解

- Mysql底层优化器与执行器详解

- Mysql归档日志bin-log详解

- 不小心删库了如何快速恢复

4. Mysql索引优化实战

- Mysql索引下推优化详解

- 为什么范围查找Mysql没有用索引下推优化

- Mysql内部选择索引机制揭秘

- Mysql索引成本计算工具trace详解

- 看下常用的Order by与Group by优化细节

- Using filesort文件排序原理详解

- 文件单路排序与双路排序详细过程

- 文件排序优化机制详解

- 互联网公司索引设计核心原则

- 社交场景APP索引设计优化实战

5. Mysql索引优化实战二

- 最常用的分页查询如何高效优化

- Join表关联查询优化

- 表关联嵌套循环连接Nested-Loop Join(NLJ)算法详解

- 基于块的嵌套循环连接Block Nested-Loop Join(BNL)算法

- in和exsits优化细节小表驱动大表详解

- count查询的各种形式优化细节

- 阿里巴巴Mysql优化规范详解

- MySQL数据类型选择优化

6. 深入理解Mysql事务隔离级别与锁机制

- Mysql事务及其ACID属性详解

- Mysql事务隔离级别详解

- Mysql底层锁机制详解

- 实例演示各种事务隔离级别效果

- Mysql底层脏读与幻读如何解决

- Mysql底层间隙锁(Gap Lock)详解与优化

- Mysql底层临键锁(Next-key Locks)详解

- lnnoDB的行锁到底锁的是什么

7. 深入理解MVCC与BufferPool缓存机制

- 彻底理解MVCC多版本并发控制机制

- undo日志版本链与read view机制详解

- 通过实例演示理解MVCC内部版本链比对规则

- lnnodb引擎SQL执行的BufferPool缓存机制

8. 进阶知识

- MySQL内核查询成本计算实战

- MySQL执行原理之索引合并详解

- MySQL内核查询优化规则详解

- InnoDB引擎底层原理及MySQL8.0新增特性详解


## 数据库范式设计

### 范式设计

关系数据库有六种范式：第一范式（1NF）、第二范式（2NF）、第三范式（3NF）、巴斯-科德范式（BCNF）、第四范式(4NF）和第五范式（5NF，又称完美范式）。

**第一范式**

定义： 属于第一范式关系的所有属性都不可再分，即数据项不可分。

理解： 第一范式强调数据表的原子性，是其他范式的基础。例如下表：

![0](./imgs/MySQL/2100.png)

`name-age`列具有两个属性，一个name，一个 age不符合第一范式，把它拆分成两列

![0](./imgs/MySQL/2102.png)

**第二范式**

第二范式（2NF）要求数据库表中的每个实例或行必须可以被惟一地区分。通常在实现来说，需要为表加上一个列，以存储各个实例的惟一标识。例如员工信息表中加上了员工编号（emp_id）列，因为每个员工的员工编号是惟一的，因此每个员工可以被惟一区分。这个惟一属性列被称为**主关键字或主键、主码**。

也就是说要求表中只具有一个业务主键，而且第二范式（2NF）要求实体的属性完全依赖于主关键字。所谓完全依赖是指不能存在仅依赖主关键字一部分的属性。

有两张表：订单表，产品表

![0](./imgs/MySQL/2093.png)

![0](./imgs/MySQL/2101.png)

一个订单有多个产品，所以订单的主键为【订单ID】和【产品ID】组成的联合主键，这样2个组件不符合第二范式，而且产品ID和订单ID没有强关联，故，把订单表进行拆分为订单表与订单与商品的中间表

![0](./imgs/MySQL/2088.png)

**第三范式**

每一个非主属性既不部分依赖于也不传递依赖于业务主键，也就是在第二范式的基础上消除了非主键对主键的传递依赖。

例如，存在一个部门信息表，其中每个部门有部门编号（dept_id）、部门名称、部门简介等信息。那么在员工信息表中列出部门编号后就不能再将部门名称、部门简介等与部门有关的信息再加入员工信息表中。如果不存在部门信息表，则根据第三范式（3NF）也应该构建它，否则就会有大量的数据冗余。

![img](./imgs/MySQL/2094.png)

![img](./imgs/MySQL/2099.png)

其中

1. **产品 ID与订单编号存在关联关系**

2. **产品名称与订单编号存在关联关系**

3. **产品ID与产品名称存在关联关系**

> 订单表里如果如果产品ID发生改变，同一个表里产品名称也要跟着改变，这样不符合第三范式，应该**把**产品名称**这一列从订单表中删除。**

### 反范式设计

反范式化就是为了性能和读取效率得考虑而适当得对数据库设计范式得要求进行违反。允许存在少量得冗余，换句话来说反范式化就是使用空间来换取时间。

**性能提升-缓存和汇总**

最常见的反范式化数据的方法是**复制或者缓存**，在不同的表中存储相同的特定列。比如从父表冗余一些数据到子表的。

缓存衍生值也是有用的。如果需要显示每个用户发了多少消息，可以每次执行一个对用户发送消息进行`count`的子查询来计算并显示它，也可以在user表用户中建一个消息发送数目的专门列，每当用户发新消息时更新这个值。

有需要时创建一张完全独立的汇总表或缓存表也是提升性能的好办法。“缓存表”来表示存储那些可以比较简单地从其他表获取（但是每次获取的速度比较慢）数据的表（例如，逻辑上冗余的数据)。而“汇总表”时,则保存的是使用`GROUP BY`语句聚合数据的表。

在使用缓存表和汇总表时，有个关键点是如何维护缓存表和汇总表中的数据，常用的有两种方式

- 实时维护数据
- 定期重建

这个取决于应用程序，不过一般来说，缓存表用实时维护数据更多点，往往在一个事务中同时更新数据本表和缓存表，汇总表则用定期重建更多，使用定时任务对汇总表进行更新。

**性能提升-计数器表**

计数器表在Web应用中很常见。比如网站点击数、用户的朋友数、文件下载次数等。对于高并发下的处理，首先可以创建一张独立的表存储计数器，这样可使计数器表小且快，并且可以使用一些更高级的技巧。

比如假设有一个计数器表，只有一行数据，记录网站的点击次数，网站的每次点击都会导致对计数器进行更新，问题在于，对于任何想要更新这一行的事务来说，这条记录上都有一个全局的互斥锁(mutex)。这会使得这些事务只能串行执行，会严重限制系统的并发能力。

改进：可以将计数器保存在多行中，每次随机选择一行进行更新。在具体实现上，可以增加一个槽（`slot`)字段，然后预先在这张表增加100行或者更多数据，当对计数器更新时，选择一个随机的槽（`slot`)进行更新即可。

>  这种解决思路其实就是**写热点的分散**，在JDK的JDK1.8中新的原子类`LongAdder`也是这种处理方式，而我们在实际的缓冲中间件Redis等的使用、架构设计中，可以采用这种写热点的分散的方式，当然架构设计中对于写热点还有**削峰填谷**的处理方式，这种在MySQL的实现中也有体现。

**反范式设计-分库分表中的查询**

例如，用户购买了商品,需要将交易记录保存下来,那么如果按照买家的纬度分表，则每个买家的交易记录都被保存在同一表中，我们可以很快、 很方便地査到某个买家的购买情况,，但是某个商品被购买的交易数据很有可能分布在多张表中，査找起来比较麻烦。反之，按照商品维度分表，则可以很方便地査找到该商品的购买情况，但若要査找到买家的交易记录，则会比较麻烦 。

所以常见的解决方式如下：

1. 在多个分片表查询后合并数据集, 这种方式的效率很低；

2. 记录两份数据, 一份按照买家纬度分表, 一份按照商品维度分表；
3.  通过搜索引擎解决, 但如果实时性要求很高, 就需要实现实时搜索。

在某电商交易平台下，可能有买家査询自己在某一时间段的订单，也可能有卖家査询自已在某一时间段的订单，如果使用了分库分表方案，则这两个需求是难以满足的，因此，通用的解决方案是：在交易生成时生成一份按照买家分片的数据副本和一份按照卖家分片的数据副本，查询时分别满足之前的两个需求，因此，查询的数据和交易的数据可能是分别存储的，并从不同的系统提供接口。

### 范式化和反范式总结

**范式化设计优缺点**

1. 范式化的更新操作通常比反范式化要快。

2. 当数据较好地范式化时，就只有很少或者没有重复数据，所以只需要修改更少的数据。

3. 范式化的表通常更小，可以更好地放在内存里，所以执行操作会更快。

4. 很少有多余的数据意味着检索列表数据时更少需要DISTINCT或者GROUP BY语句。在非范式化的结构中必须使用DISTINCT或者GROUPBY才能获得一份唯一的列表，但是如果是一张单独的表，很可能则只需要简单的查询这张表就行了。

范式化设计的缺点是通常需要关联。稍微复杂一些的查询语句在符合范式的表上都可能需要至少一次关联，也许更多。这不但代价昂贵，也可能使一些索引策略无效。例如，范式化可能将列存放在不同的表中，而这些列如果在一个表中本可以属于同一个索引。 

**反范式化设计优缺点**

1. 反范式设计可以减少表的关联

2. 可以更好的进行索引优化。

反范式设计缺点也很明显

1. 存在数据冗余及数据维护异常；
2. 对数据的修改需要更多的成本。

## MySQL内部结构

![img](./imgs/MySQL/12570.png)

大体来说，MySQL 可以分为 Server 层和存储引擎层两部分。

**Server层**

主要包括连接器、查询缓存、分析器、优化器、执行器等，涵盖 MySQL 的大多数核心服务功能，以及所有的内置函数（如日期、时间、数学和加密函数等），所有跨存储引擎的功能都在这一层实现，比如存储过程、触发器、视图等。

**Store层**

存储引擎层负责数据的存储和提取。其架构模式是插件式的，支持 InnoDB、MyISAM、Memory 等多个存储引擎。现在最常用的存储引擎是 InnoDB，它从 MySQL 5.5.5 版本开始成为了默认存储引擎。也就是说如果我们在create table时不指定表的存储引擎类型,默认会给你设置存储引擎为InnoDB。

**示例数据库**

```sql
CREATE TABLE `test` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
```

**连接器**

连接数据库。连接器负责跟客户端建立连接、获取权限、维持和管理连接。连接命令如下：

```sh
mysql -h host[数据库地址] -u root[用户] -p root[密码] -P 3306
```

在完成经典的 TCP 握手后，连接器就要开始认证身份。用户成功建立连接后，即使用管理员账号对这个用户的权限做了修改，也不会影响已经存在连接的权限。修改完成后，只有再新建的连接才会使用新的权限设置。用户的权限表在系统表空间的mysql的user表中。

![img](./imgs/MySQL/12637.png)

连接完成后，如果没有后续的动作，这个连接就处于空闲状态，可以在 `show processlist` 命令中看到它。

![img](./imgs/MySQL/12632.png)

> 客户端如果长时间不发送command到Server端，连接器就会自动将它断开。这个时间是由参数 `wait_timeout` 控制的，默认值是 8 小时。
>
> 开发当中我们大多数时候用的都是长连接，连接成功后，如果客户端持续有请求，则一直使用同一个连接，如果长连接累积下来，可能导致内存占用太大，被系统强行杀掉。
>
> 怎么解决**长连接累积导致内存占用太大**问题呢？
>
> 1. 定期断开长连接。使用一段时间，或者程序里面判断执行过一个占用内存的大查询后，断开连接，之后要查询再重连。
>
> 2. 如果用的是 MySQL 5.7 或更新版本，可以在每次执行一个比较大的操作后，通过执行 `mysql_reset_connection` 来重新初始化连接资源。这个过程不需要重连和重新做权限验证，但是会将连接恢复到刚刚创建完时的状态。

**分析器**

MySQL 需要对 SQL 语句做解析。

词法分析器分成6个主要步骤完成对sql语句的分析

**词法分析->语法分析->语义分析->构造执行树->生成执行计划->计划的执行**

下图是SQL词法分析的过程步骤：

![img](./imgs/MySQL/12742.png)

**优化器**

优化器是在表里面有多个索引的时候，决定使用哪个索引；或者在一个语句有多表关联（join）的时候，决定各个表的连接顺序。通过**计算cost值**选择最佳的执行方案。

**执行器**

```sql
select * from test where id=10;
```

1. 调用 InnoDB 引擎接口取这个表的第一行，判断 ID 值是不是 10，如果不是则跳过，如果是则将这行存在结果集中；
2. 调用引擎接口取“下一行”，重复相同的判断逻辑，直到取到这个表的最后一行。
3. 执行器将上述遍历过程中所有满足条件的行组成的记录集作为结果集返回给客户端。

**bin-log归档**

SQL执行时，会将sql语句的执行逻辑记录在bin-log当中

binlog是Server层实现的二进制日志，它会记录我们的cud操作。

Binlog有以下几个特点：

1. Binlog在MySQL的Server层实现（引擎共用）

2. Binlog为逻辑日志,记录的是一条语句的原始逻辑

3. Binlog不限大小,追加写入,不会覆盖以前的日志	

如果，我们**误删了数据库**,可以**使用binlog进行归档**！首先需要先开启MySQL的binlog功能。

**配置my.cnf**

```sh
配置开启binlog
log-bin=/usr/local/mysql/data/binlog/mysql-bin
注意5.7以及更高版本需要配置本项：server-id=123454（自定义,保证唯一性）;
#binlog格式，有3种statement,row,mixed
binlog-format=ROW
#表示每1次执行写入就与硬盘同步，会影响性能，为0时表示，事务提交时mysql不做刷盘操作，由系统决定
sync-binlog=1
```

**binlog命令**

```sh
show variables like '%log_bin%'; 查看bin-log是否开启
flush logs; 会多一个最新的bin-log日志
show master status; 查看最后一个bin-log日志的相关信息
reset master; 清空所有的bin-log日志
/usr/local/mysql/bin/mysqlbinlog --no-defaults /usr/local/mysql/data/binlog/mysql-bin.000001 查看binlog内容 
```

binlog里的内容不具备可读性，所以需要我们自己去判断恢复的逻辑点位，怎么观察呢？看重点信息，比如`begin,commit`这种关键词信息，只要在binlog当中看到了，你就可以理解为begin-commit之间的信息是一个完整的事务逻辑,然后再根据位置position判断恢复即可。binlog内容如下：

![img](./imgs/MySQL/12847.png)

**数据归档操作**

```sh
从bin-log恢复数据
恢复全部数据
/usr/local/mysql/bin/mysqlbinlog --no-defaults /usr/local/mysql/data/binlog/mysql-bin.000001 |mysql -uroot -p tuling(数据库名)
恢复指定位置数据
/usr/local/mysql/bin/mysqlbinlog --no-defaults --start-position="408" --stop-position="731"  /usr/local/mysql/data/binlog/mysql-bin.000001 |mysql -uroot -p tuling(数据库)
恢复指定时间段数据
/usr/local/mysql/bin/mysqlbinlog --no-defaults /usr/local/mysql/data/binlog/mysql-bin.000001 --stop-date= "2018-03-02 12:00:00"  --start-date= "2019-03-02 11:55:00"|mysql -uroot -p test(数据库)
```

**归档测试**

1. 定义一个存储过程，写入数据

```sql
drop procedure if exists tproc;
delimiter $$
create procedure tproc(i int)
begin
    declare s int default 1;
    declare c char(50) default repeat('a',50);
    while s<=i do
        start transaction;
        insert into test values(null,c);
        commit;
        set s=s+1;
    end while;
end$$
delimiter ;
```

2. 删除数据

```sh
truncate test;
```

3. 利用binlog归档

```sh
/usr/local/mysql/bin/mysqlbinlog --no-defaults /usr/local/mysql/data/binlog/mysql-bin.000001 |mysql -uroot -p tuling(数据库名)
```

4. 归档完毕，数据恢复

## Explain工具

使用`EXPLAIN`关键字可以模拟优化器执行SQL语句，分析你的查询语句或是结构的性能瓶颈 在 select 语句之前增加 explain 关键字，MySQL 会在查询上设置一个标记，执行查询会返回执行计划的信息，而不是执行这条SQL

> 如果 from 中包含子查询，仍会执行该子查询，将结果放入临时表中

**Explain分析示例**

参考官方文档：https://dev.mysql.com/doc/refman/5.7/en/explain-output.html

```sql
示例表：
DROP TABLE IF EXISTS `actor`; 
CREATE TABLE `actor` (
  `id` int(11) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `actor` (`id`, `name`, `update_time`) VALUES (1,'a','2017-12-22 15:27:18'), (2,'b','2017-12-22 15:27:18'), (3,'c','2017-12-22 15:27:18');

DROP TABLE IF EXISTS `film`;
CREATE TABLE `film` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `film` (`id`, `name`) VALUES (3,'film0'),(1,'film1'),(2,'film2');

DROP TABLE IF EXISTS `film_actor`;
CREATE TABLE `film_actor` (
  `id` int(11) NOT NULL,
  `film_id` int(11) NOT NULL,
  `actor_id` int(11) NOT NULL,
  `remark` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_film_actor_id` (`film_id`,`actor_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `film_actor` (`id`, `film_id`, `actor_id`) VALUES (1,1,1),(2,1,2),(3,2,1);
```

```sql
explain select * from actor;
```

![image-20240119170032583](./imgs/MySQL/image-20240119170032583.png)

> 在查询中的每个表会输出一行，如果有两个表通过 join 连接查询，那么会输出两行

接下来我们将展示 explain 中每个列的信息。

**1. id列**

id列的编号是 select 的序列号，有几个 select 就有几个id，并且id的顺序是按 select 出现的顺序增长的。

id列越大执行优先级越高，id相同则从上往下执行，id为NULL最后执行。

**2. select_type列**

select_type 表示对应行是简单还是复杂的查询。

1）simple：简单查询。查询不包含子查询和union

```sql
explain select * from film where id = 2;
```

2）primary：复杂查询中最外层的 select

3）subquery：包含在 select 中的子查询（不在 from 子句中）

4）derived：包含在 from 子句中的子查询。MySQL会将结果存放在一个临时表中，也称为派生表（derived的英文含义）

用这个例子来了解 primary、subquery 和 derived 类型

```sql
set session optimizer_switch='derived_merge=off';   # 关闭mysql5.7新特性对衍生表的合并优化
explain select (select 1 from actor where id = 1) from (select * from film where id = 1) der;
```

![image-20240119170436480](./imgs/MySQL/image-20240119170436480.png)

```sql
set session optimizer_switch='derived_merge=on';	#还原默认配置
```

5）union：在 union 中的第二个和随后的 select

```sql
explain select 1 union all select 1;
```

![image-20240119170503645](./imgs/MySQL/image-20240119170503645.png)

**3. table列**

这一列表示 explain 的一行正在访问哪个表。

当 from 子句中有子查询时，table列是格式，表示当前查询依赖 id=N 的查询，于是先执行 id=N 的查询。

当有 union 时，UNION RESULT 的 table 列的值为，1和2表示参与 union 的 select 行id。

**4. type列**

这一列表示**关联类型或访问类型**，即MySQL决定如何查找表中的行，查找数据行记录的大概范围。

依次从最优到最差分别为：**system > const > eq_ref > ref > range > index > ALL**

一般来说，**得保证查询达到range级别，最好达到ref**

**NULL**：mysql能够在优化阶段分解查询语句，在执行阶段用不着再访问表或索引。例如：在索引列中选取最小值，可以单独查找索引来完成，不需要在执行时访问表

```sql
explain select min(id) from film;
```

![image-20240119170731360](./imgs/MySQL/image-20240119170731360.png)

**const, system**：mysql能对查询的某部分进行优化并将其转化成一个常量（可以看`show warnings` 的结果）。用于 primary key 或 unique key 的所有列与常数比较时，所以表最多有一个匹配行，读取1次，速度比较快。**system是const的特例**，表里只有一条元组匹配时为system

```sql
explain extended select * from (select * from film where id = 1) tmp;
```

![image-20240119170801219](./imgs/MySQL/image-20240119170801219.png)

```sql
show warnings;
```

![image-20240119170823446](./imgs/MySQL/image-20240119170823446.png)

**eq_ref**：primary key 或 unique key 索引的所有部分被连接使用 ，最多只会返回一条符合条件的记录。这可能是在 const 之外最好的联接类型了，简单的 select 查询不会出现这种 type。

```sql
explain select * from film_actor left join film on film_actor.film_id = film.id;
```

![image-20240119170843948](./imgs/MySQL/image-20240119170843948.png)

**ref**：相比 eq_ref，不使用唯一索引，而是使用普通索引或者唯一性索引的部分前缀，索引要和某个值相比较，可能会找到多个符合条件的行。

1. 简单 select 查询，name是普通索引（非唯一索引）

```sql
explain select * from film where name = 'film1';
```

![image-20240119170938304](./imgs/MySQL/image-20240119170938304.png)

2.关联表查询，idx_film_actor_id是film_id和actor_id的联合索引，这里使用到了film_actor的左边前缀film_id部分。

```sql
explain select film_id from film left join film_actor on film.id = film_actor.film_id;
```

![image-20240119170952591](./imgs/MySQL/image-20240119170952591.png)

**range**：范围扫描通常出现在 `in(), between ,> ,<, >=` 等操作中。使用一个索引来检索给定范围的行。

```sql
explain select * from actor where id > 1;
```

![image-20240119171018445](./imgs/MySQL/image-20240119171018445.png)

**index**：扫描全索引就能拿到结果，一般是扫描某个二级索引，这种扫描不会从索引树根节点开始快速查找，而是直接对二级索引的叶子节点遍历和扫描，速度还是比较慢的，这种查询一般为使用覆盖索引，二级索引一般比较小，所以这种通常比ALL快一些。

```sql
explain select * from film;
```

![image-20240119171049668](./imgs/MySQL/image-20240119171049668.png)

**ALL**：即全表扫描，扫描你的聚簇索引的所有叶子节点。通常情况下这需要增加索引来进行优化了。

```sql
explain select * from actor;
```

![image-20240119171057757](./imgs/MySQL/image-20240119171057757.png)

**5. possible_keys列**

这一列显示查询可能使用哪些索引来查找。 

explain 时可能出现 possible_keys 有列，而 key 显示 NULL 的情况，这种情况是因为表中数据不多，mysql认为索引对此查询帮助不大，选择了全表查询。 

如果该列是NULL，则没有相关的索引。在这种情况下，可以通过检查 where 子句看是否可以创造一个适当的索引来提高查询性能，然后用 explain 查看效果。

**6. key列**

这一列显示mysql实际采用哪个索引来优化对该表的访问。

如果没有使用索引，则该列是 NULL。如果想强制mysql使用或忽视possible_keys列中的索引，在查询中使用 force index、ignore index。

**7. key_len列**

这一列显示了mysql在索引里使用的字节数，通过这个值可以算出具体使用了索引中的哪些列。 

举例来说，film_actor的联合索引 idx_film_actor_id 由 film_id 和 actor_id 两个int列组成，并且每个int是4字节。通过结果中的key_len=4可推断出查询使用了第一个列：film_id列来执行索引查找。

```sql
explain select * from film_actor where film_id = 2;
```

![image-20240119171742592](./imgs/MySQL/image-20240119171742592.png)

key_len计算规则如下：

- 字符串，char(n)和varchar(n)，5.0.3以后版本中，**n均代表字符数，而不是字节数，**如果是utf-8，一个数字或字母占1个字节，一个汉字占3个字节

- - char(n)：如果存汉字长度就是 3n 字节
  - varchar(n)：如果存汉字则长度是 3n + 2 字节，加的2字节用来存储字符串长度，因为varchar是变长字符串

- 数值类型

- - tinyint：1字节
  - smallint：2字节
  - int：4字节
  - bigint：8字节　　

- 时间类型　

- - date：3字节
  - timestamp：4字节
  - datetime：8字节

- 如果字段允许为 NULL，需要1字节记录是否为 NULL

索引最大长度是768字节，当字符串过长时，mysql会做一个类似**左前缀索引**的处理，将前半部分的字符提取出来做索引。

**8. ref列**

这一列显示了在key列记录的索引中，表查找值所用到的列或常量，常见的有：const（常量），字段名（例：film.id）

**9. rows列**

这一列是mysql估计要读取并检测的行数，注意这个不是结果集里的行数。

**10. Extra列**

这一列展示的是额外信息。常见的重要值如下： 

1）**Using index**：使用覆盖索引

**覆盖索引定义**：mysql执行计划explain结果里的key有使用索引，如果select后面查询的字段都可以从这个索引的树中获取，这种情况一般可以说是用到了覆盖索引，extra里一般都有using index；覆盖索引一般针对的是辅助索引，整个查询结果只通过辅助索引就能拿到结果，不需要通过辅助索引树找到主键，再通过主键去主键索引树里获取其它字段值

```sql
explain select film_id from film_actor where film_id = 1;
```

![image-20240119171919125](./imgs/MySQL/image-20240119171919125.png)

2）**Using where**：使用 where 语句来处理结果，并且查询的列未被索引覆盖

```sql
explain select * from actor where name = 'a';
```

![image-20240119171945765](./imgs/MySQL/image-20240119171945765.png)

3）**Using index condition**：查询的列不完全被索引覆盖，where条件中是一个前导列的范围；

```sql
explain select * from film_actor where film_id > 1;
```

![image-20240119172021404](./imgs/MySQL/image-20240119172021404.png)

4）**Using temporary**：mysql需要创建一张临时表来处理查询。出现这种情况一般是要进行优化的，首先是想到用索引来优化。

1. actor.name没有索引，此时创建了张临时表来distinct

```sql
explain select distinct name from actor;
```

![image-20240119172059358](./imgs/MySQL/image-20240119172059358.png)

2. film.name建立了idx_name索引，此时查询时extra是using index，没有用临时表

```sql
explain select distinct name from film;
```

![image-20240119172151676](./imgs/MySQL/image-20240119172151676.png)

5）**Using filesort**：将用外部排序而不是索引排序，数据较小时从内存排序，否则需要在磁盘完成排序。这种情况下一般也是要考虑使用索引来优化的。

1. actor.name未创建索引，会浏览actor整个表，保存排序关键字name和对应的id，然后排序name并检索行记录

```sql
explain select * from actor order by name;
```

![image-20240119172230846](./imgs/MySQL/image-20240119172230846.png)

2. film.name建立了idx_name索引,此时查询时extra是using index

```sql
explain select * from film order by name;
```

![image-20240119172254791](./imgs/MySQL/image-20240119172254791.png)

6）**Select tables optimized away**：使用某些聚合函数（比如 max、min）来访问存在索引的某个字段时

```sql
explain select min(id) from film;
```

![image-20240119172315772](./imgs/MySQL/image-20240119172315772.png)

## MySQL索引

### 索引数据结构

索引是帮助MySQL高效获取数据的排好序的数据结构

**B-Tree**性质：

1. 叶节点具有相同的深度，叶节点的指针为空

2. 所有索引元素不重复

3. 节点中的数据索引从左到右递增排列

![image-20240119182449764](./imgs/MySQL/image-20240119182449764.png)

**B+Tree**性质：

1. 非叶子节点不存储data，只存储索引(冗余)，可以放更多的索引

2. 叶子节点包含所有索引字段

3. 叶子节点用指针连接，提高区间访问的性能

![image-20240119182548156](./imgs/MySQL/image-20240119182548156.png)

**MyISAM存储引擎索引实现**

MyISAM索引文件和数据文件是分离的(非聚簇)

![image-20240119182643155](./imgs/MySQL/image-20240119182643155.png)

**InnoDB存储引擎索引实现**

InnoDB索引实现(聚簇)

1. 表数据文件本身就是按B+Tree组织的一个索引结构文件

2. 聚簇索引-叶节点包含了完整的数据记录
3. 非主键索引结构叶子节点存储的数据包含主键值（考虑到数据一致性和节省存储空间）

**主键索引**

![image-20240119182749357](./imgs/MySQL/image-20240119182749357.png)

**非主键索引（二级索引）**

![image-20240119182752863](./imgs/MySQL/image-20240119182752863.png)

**联合索引**

![image-20240119182835797](./imgs/MySQL/image-20240119182835797.png)

### InnoDB中的索引

**聚簇索引和非聚簇索引**

聚簇索引的定义：叶子节点保存的不只是键值，还保存了位于同一行记录里的其他列的信息，由于聚簇索引决定了表的物理排列顺序，一个表只有一个物理排列顺序，所以一个表只能创建一个聚簇索引。

非聚簇索引：叶子节点仅保存了键位信息以及该行数据的地址，有的非聚簇索引只保存了键位信息机器主键。

- mysam存储引擎：不管是主键索引，唯一键索引还是普通索引都是非聚簇索引；
- innodb存储引擎：有且只有一个聚簇索引。

> 聚簇索引就是`innodb`存储引擎里的聚簇索引，非聚簇索引就是`innodb`存储引擎里的普通二级索引。

**聚簇索引**

InnoDB中使用了聚簇索引，就是**将表的主键用来构造一棵B+树，并且将整张表的行记录数据存放在该B+树的叶子节点中，一页数据占16KB**。也就是所谓的索引即数据，数据即索引。由于聚簇索引是利用表的主键构建的，所以每张表只能拥有一个聚簇索引。

聚簇索引的叶子节点就是数据页。换句话说，数据页上存放的是完整的每行记录。聚簇索引优点就是：

- 通过过聚簇索引能获取完整的整行数据。
- 对于主键的排序查找和范围查找速度非常快。

> 如果没有定义主键，MySQL会使用唯一性索引，没有唯一性索引，MySQL也会创建一个隐含列RowID来做主键，然后用这个主键来建立聚簇索引。

![0](./imgs/MySQL/2098.png)

**辅助索引/二级索引**

对于辅助索引(Secondary Index，也称二级索引、非聚簇索引)，叶子节点并不包含行记录的全部数据。叶子节点除了包含键值以外，每个叶子节点中的索引行中还包含了相应行数据的聚簇索引键。

![0](./imgs/MySQL/2096.png)

比如辅助索引`index(node)`，那么叶子节点中包含的数据就包括了`(主键、note)`。

**回表**

辅助索引的存在并不影响数据在聚簇索引中的组织，因此每张表上可以有多个辅助索引。

当通过辅助索引来寻找数据时

1. InnoDB存储引擎会遍历辅助索引并通过叶级别的指针获得指向主键索引的主键；
2. 然后再通过主键索引（聚簇索引）来找到一个完整的行记录。

> 这个过程也被称为**回表**。也就是根据辅助索引的值查询一条完整的用户记录需要使用到2棵B+树：一次辅助索引，一次聚簇索引。

![0](./imgs/MySQL/2086.png)

**MRR**

从上文可以看出，每次从二级索引中读取到一条记录后，就会根据该记录的主键值执行回表操作。而在某个扫描区间中的二级索引记录的主键值是无序的，也就是说这些二级索引记录对应的聚簇索引记录所在的页面的页号是无序的。

每次执行回表操作时都相当于要随机读取一个聚簇索引页面，而这些随机IO带来的性能开销比较大。

MySQL中提出了一个名为`Disk-Sweep Multi-Range Read` (MRR，多范围读取)的优化措施，即先读取一部分二级索引记录，将它们的主键值排好序之后再统一执行回表操作。

相对于每读取一条二级索引记录就立即执行回表操作，这样会节省一些IO开销。使用这个`MRR`优化措施的条件比较苛刻，所以我们直接认为每读取一条二级索引记录就立即执行回表操作。

**联合索引/复合索引**

将表上的多个列组合起来进行索引我们称之为联合索引或者复合索引，比如`index(a,b)`就是将`a, b`两个列组合起来构成一个索引。

> 建立联合索引只会建立1棵B+树，多个列分别建立索引会分别以每个列则建立B+树，有几个列就有几个B+树，比如，`index(note)、index(b)`，就分别对`note, b`两个列各构建了一个索引。

`index(note,b)`在索引构建上，包含了两个意思：

1. 先把各个记录按照note列进行排序。

2. 在记录的note列相同的情况下，采用b列进行排序

![0](./imgs/MySQL/2097.png)

**自适应哈希索引**

在InnoDB存储引擎内部自己去监控索引表，如果监控到某个索引经常用，那么就认为是**热数据**，然后内部自己创建一个`hash`索引，称之为自适应哈希索引( `Adaptive Hash Index,AHI`)，创建以后，如果下次又查询到这个索引，那么直接通过`hash`算法推导出记录的地址，直接一次就能查到数据，比重复去`B+tree`索引中查询三四次节点的效率高了不少。

InnoDB存储引擎使用的哈希函数采用**除法散列方式**，其冲突机制采用**链表方式**。

> 对于自适应哈希索引仅是数据库自身创建并使用的，我们并不能对其进行干预。
>
> 哈希索引只能用来搜索等值的查询，如 `SELECT* FROM table WHERE index co=xxx`。而对于其他查找类型，如范围查找，是不能使用哈希索引的

```sql
-- 查看当前自适应哈希索引的使用状况
show engine innodb status\G;
```

![0](./imgs/MySQL/2084.png)

![0](./imgs/MySQL/2090.png)

通过 `hash searches: non-hash searches`可以大概了解使用哈希索引后的效率。

### 三星索引

对于一个查询而言，一个三星索引，可能是其最好的索引。

如果查询使用三星索引，一次查询通常只需要进行一次磁盘随机读以及一次窄索引片的扫描，因此其相应时间通常比使用一个普通索引的响应时间少几个数量级。

三星索引概念：

1. 索引将相关的记录放到一起则获得一星；

2. 如果索引中的数据顺序和查找中的排列顺序一致则获得二星；

3. 如果索引中的列包含了查询中需要的全部列则获得三星。

**一星★★**

一星的意思是：如果一个查询相关的索引行是相邻的或者至少相距足够靠近的话，必须扫描的索引片宽度就会缩至最短，也就是说，让索引片尽量变窄，也就是所说的索引的扫描范围越小越好。

**二星（排序星）★**

在满足一星的情况下，当查询需要排序，`group by, order by`，如果查询所需的顺序与索引是一致的（索引本身是有序的），就可以不用再另外排序了，一般来说排序可是影响性能的关键因素。

**三星（宽索引星）★★**

在满足了二星的情况下，如果索引中所包含了这个查询所需的所有列（包括 `where 子句` 和 `select 子句`中所需的列，也就是覆盖索引），这样一来，查询就不再需要回表了，减少了查询的步骤和IO请求次数，性能几乎可以提升一倍。

**达成三星索引**

```sql
create table customer(
cno int,
lname varchar(10),
fname varchar(10),
sex int,
weight int,
city varchar(10));
);

-- sql查询
select cno,fname from customer where lname =’xx’ and city =’yy’ order by fname;

-- 建立三星索引
create index idx_cust on customer(city,lname,fname,cno);
```

> 第一颗星：所有等值谓词的列，是组合索引的开头的列，可以把索引片缩得很窄，符合。
>
> 第二颗星：order by的fname字段在组合索引中且是索引自动排序好的，符合。
>
> 第三颗星：select中的cno字段、fname字段在组合索引中存在，符合。

**达不成三星索引**

```sql
CREATE TABLE `test` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`user_name` varchar(100) DEFAULT NULL,
	`sex` int(11) DEFAULT NULL,
	`age` int(11) DEFAULT NULL,
	`c_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

-- sql查询
select user_name,sex,age from test where user_name like 'test%'  and sex =1 ORDER BY age;
```

- 建立索引`(user_name,sex,age)`

不满足第二颗星，user_name 采用了范围匹配，sex 是过滤列，此时age 列无法保证有序的。

- 建立索引`(sex, age，user_name)`

不满足第一颗星，只可以匹配到sex，sex选择性很差，意味着是一个宽索引片。

### 索引实践

```sql
-- 示例表：
CREATE TABLE `employees` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(24) NOT NULL DEFAULT '' COMMENT '姓名',
  `age` int(11) NOT NULL DEFAULT '0' COMMENT '年龄',
  `position` varchar(20) NOT NULL DEFAULT '' COMMENT '职位',
  `hire_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '入职时间',
  PRIMARY KEY (`id`),
  KEY `idx_name_age_position` (`name`,`age`,`position`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COMMENT='员工记录表';

INSERT INTO employees(name,age,position,hire_time) VALUES('LiLei',22,'manager',NOW());
INSERT INTO employees(name,age,position,hire_time) VALUES('HanMeimei', 23,'dev',NOW());
INSERT INTO employees(name,age,position,hire_time) VALUES('Lucy',23,'dev',NOW());
```

#### 全值匹配

```sql
EXPLAIN SELECT * FROM employees WHERE name= 'LiLei';
```

![image-20240119173019130](./imgs/MySQL/image-20240119173019130.png)

```sql
EXPLAIN SELECT * FROM employees WHERE name= 'LiLei' AND age = 22;
```

![image-20240119173027745](./imgs/MySQL/image-20240119173027745.png)

```sql
EXPLAIN SELECT * FROM employees WHERE  name= 'LiLei' AND  age = 22 AND position ='manager';
```

![image-20240119173037638](./imgs/MySQL/image-20240119173037638.png)

#### 最左前缀法则

如果索引了多列，要遵守最左前缀法则。指的是查询从索引的最左前列开始并且不跳过索引中的列。

```sql
EXPLAIN SELECT * FROM employees WHERE name = 'Bill' and age = 31;
EXPLAIN SELECT * FROM employees WHERE age = 30 AND position = 'dev';
EXPLAIN SELECT * FROM employees WHERE position = 'manager';
```

![image-20240119173130722](./imgs/MySQL/image-20240119173130722.png)

#### 索引列上不做任何操作

例如（计算、函数、（自动or手动）类型转换）会导致索引失效而转向全表扫描

```sql
EXPLAIN SELECT * FROM employees WHERE name = 'LiLei';
EXPLAIN SELECT * FROM employees WHERE left(name,3) = 'LiLei';
```

![image-20240119173158544](./imgs/MySQL/image-20240119173158544.png)

给hire_time增加一个普通索引：

```sql
ALTER TABLE `employees` ADD INDEX `idx_hire_time` (`hire_time`) USING BTREE ;
EXPLAIN  select * from employees where date(hire_time) ='2018-09-30';
```

![image-20240119173217332](./imgs/MySQL/image-20240119173217332.png)

转化为日期范围查询，有可能会走索引：

```sql
EXPLAIN  select * from employees where hire_time >='2018-09-30 00:00:00'  and  hire_time <='2018-09-30 23:59:59';
```

![image-20240119173237898](./imgs/MySQL/image-20240119173237898.png)

还原最初索引状态

```sql
ALTER TABLE `employees` DROP INDEX `idx_hire_time`;
```

#### 不能使用索引中范围条件右边的列

```sql
EXPLAIN SELECT * FROM employees WHERE name= 'LiLei' AND age = 22 AND position ='manager';
EXPLAIN SELECT * FROM employees WHERE name= 'LiLei' AND age > 22 AND position ='manager';
```

![image-20240119173407346](./imgs/MySQL/image-20240119173407346.png)

#### 尽量使用覆盖索引

只访问索引的查询（索引列包含查询列），减少 `select *` 语句

```sql
EXPLAIN SELECT name,age FROM employees WHERE name= 'LiLei' AND age = 23 AND position ='manager';
```

![image-20240119173530046](./imgs/MySQL/image-20240119173530046.png)

```sql
EXPLAIN SELECT * FROM employees WHERE name= 'LiLei' AND age = 23 AND position ='manager';
```

![image-20240119173612426](./imgs/MySQL/image-20240119173612426.png)

#### 使用`!=,<>,not in,not exists`会导致全表扫描

```sql
EXPLAIN SELECT * FROM employees WHERE name != 'LiLei';
```

![image-20240119173814256](./imgs/MySQL/image-20240119173814256.png)

#### `is null,is not null` 一般情况下无法使用索引

```sql
EXPLAIN SELECT * FROM employees WHERE name is null
```

![image-20240119173910946](./imgs/MySQL/image-20240119173910946.png)

#### like以通配符开头导致全表扫描

```sql
EXPLAIN SELECT * FROM employees WHERE name like '%Lei'
```

![image-20240119174035356](./imgs/MySQL/image-20240119174035356.png)

```sql
EXPLAIN SELECT * FROM employees WHERE name like 'Lei%'
```

![image-20240119174047983](./imgs/MySQL/image-20240119174047983.png)

如何解决`like'%字符串%`失效的问题？

1. 使用覆盖索引，查询字段必须是建立覆盖索引字段

```sql
EXPLAIN SELECT name,age,position FROM employees WHERE name like '%Lei%';
```

![image-20240119174236395](./imgs/MySQL/image-20240119174236395.png)

2. 如果不能使用覆盖索引则可能需要借助搜索引擎，如`ElasticSearch`

#### 字符串不加单引号索引失效

```sql
EXPLAIN SELECT * FROM employees WHERE name = '1000';
EXPLAIN SELECT * FROM employees WHERE name = 1000;
```

![image-20240119174343623](./imgs/MySQL/image-20240119174343623.png)

#### 少使用or或in

用or或in查询时，mysql不一定使用索引，mysql内部优化器会根据检索比例、表大小等多个因素整体评估是否使用索引，详见范围查询优化

```sql
EXPLAIN SELECT * FROM employees WHERE name = 'LiLei' or name = 'HanMeimei';
```

![image-20240119174444026](./imgs/MySQL/image-20240119174444026.png)

#### 范围查询优化

给年龄添加单值索引

```sql
ALTER TABLE `employees` ADD INDEX `idx_age` (`age`) USING BTREE ;
explain select * from employees where age >=1 and age <=2000;
```

![image-20240119174527127](./imgs/MySQL/image-20240119174527127.png)

没走索引原因：mysql内部优化器会根据检索比例、表大小等多个因素整体评估是否使用索引。比如这个例子，可能是由于单次数据量查询过大导致优化器最终选择不走索引

优化方法：可以将大的范围拆分成多个小范围

```sql
explain select * from employees where age >=1 and age <=1000;
explain select * from employees where age >=1001 and age <=2000;
```

![image-20240119174553731](./imgs/MySQL/image-20240119174553731.png)

还原最初索引状态

```sql
ALTER TABLE `employees` DROP INDEX `idx_age`;
```

#### 索引使用总结

![image-20240119174623484](./imgs/MySQL/image-20240119174623484.png)

> `like KK%`相当于=常量，`%KK,%KK%` 相当于范围

### MySQL查询成本计算

**示例**

```sql
CREATE TABLE `order_exp`  (
  `id` bigint(22) NOT NULL AUTO_INCREMENT COMMENT '订单的主键',
  `order_no` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '订单的编号',
  `order_note` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '订单的说明',
  `insert_time` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '插入订单的时间',
  `expire_duration` bigint(22) NOT NULL COMMENT '订单的过期时长，单位秒',
  `expire_time` datetime(0) NOT NULL COMMENT '订单的过期时间',
  `order_status` smallint(6) NOT NULL DEFAULT 0 COMMENT '订单的状态，0：未支付；1：已支付；-1：已过期，关闭',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `u_idx_day_status`(`insert_time`, `order_status`, `expire_time`) USING BTREE,
  INDEX `idx_order_no`(`order_no`) USING BTREE,
  INDEX `idx_expire_time`(`expire_time`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10819 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

INSERT INTO `order_exp` VALUES (16, 'DD00_15S', '你好，李焕英。7排15号,过期时长:DD00_15S', '2021-03-22 18:23:42', 15, '2021-03-22 18:23:57', 0);
INSERT INTO `order_exp` VALUES (21, 'DD00_10S', '你好，李焕英。7排10号,过期时长:DD00_10S', '2021-03-22 18:28:18', 10, '2021-03-22 18:28:28', 0);
INSERT INTO `order_exp` VALUES (27, 'DD00_16S', '你好，李焕英。7排16号,过期时长:DD00_16S', '2021-03-22 18:28:19', 16, '2021-03-22 18:28:35', 0);
INSERT INTO `order_exp` VALUES (38, 'DD00_18S', '你好，李焕英。7排18号,过期时长:DD00_18S', '2021-03-22 18:28:20', 18, '2021-03-22 18:28:38', 0);
INSERT INTO `order_exp` VALUES (50, 'DD00_23S', '你好，李焕英。7排23号,过期时长:DD00_23S', '2021-03-22 18:28:21', 23, '2021-03-22 18:28:44', 0);
```

通过`EXPLAIN`语句查看到最后优化器决定使用的执行计划，优化器最终会选择成本最低的那种方案来作为最终的执行计划。

```sql
SET optimizer_trace="enabled=on";

SELECT * FROM order_exp WHERE order_no IN ('DD00_10S', 'DD00_15S', 'DD00_16S') AND  expire_time> '2021-03-22 18:22:28' AND expire_time<= '2021-03-22 18:35:09' AND insert_time< expire_time AND order_note LIKE '%7排1%' AND  order_status = 0;

SELECT * FROM information_schema.OPTIMIZER_TRACE;
```

可以看见全表扫描的成本：**2.85**

![image-20240122170500210](./imgs/MySQL/image-20240122170500210.png)

- 使用索引`idx_order_no`的成本为：**1.81**

- 使用索引`idx_expire_time`的成本为：**2.01**

![image-20240122170810730](./imgs/MySQL/image-20240122170810730.png)

最终MySQL使用了`idx_expire_no`作为这个SQL查询过程中索引：

![image-20240122171050487](./imgs/MySQL/image-20240122171050487.png)

1. **I/O成本**

我们的表经常使用的MyISAM、InnoDB存储引擎都是将数据和索引都存储到磁盘上的，当我们想查询表中的记录时，需要先把数据或者索引加载到内存中然后再操作。这个从磁盘到内存这个加载的过程损耗的时间称之为I/O成本。

2. **CPU成本**

读取以及检测记录是否满足对应的搜索条件、对结果集进行排序等这些操作损耗的时间称之为CPU成本。

对于InnoDB存储引擎来说，页是磁盘和内存之间交互的基本单位，MySQL规定读取一个页面花费的成本默认是1.0，读取以及检测一条记录是否符合搜索条件的成本默认是0.2。1.0、0.2这些数字称之为成本常数，这两个成本常数我们最常用到，当然还有其他的成本常数。

> 不管读取记录时需不需要检测是否满足搜索条件，其成本都算是0.2。

## MySQL索引优化实战

**示例二**

```sql
-- 示例表
CREATE TABLE `employees` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(24) NOT NULL DEFAULT '' COMMENT '姓名',
  `age` int(11) NOT NULL DEFAULT '0' COMMENT '年龄',
  `position` varchar(20) NOT NULL DEFAULT '' COMMENT '职位',
  `hire_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '入职时间',
  PRIMARY KEY (`id`),
  KEY `idx_name_age_position` (`name`,`age`,`position`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COMMENT='员工记录表';

INSERT INTO employees(name,age,position,hire_time) VALUES('LiLei',22,'manager',NOW());
INSERT INTO employees(name,age,position,hire_time) VALUES('HanMeimei', 23,'dev',NOW());
INSERT INTO employees(name,age,position,hire_time) VALUES('Lucy',23,'dev',NOW());

-- 插入一些示例数据
drop procedure if exists insert_emp; 
delimiter ;;
create procedure insert_emp()        
begin
  declare i int;                    
  set i=1;                          
  while(i<=100000)do                 
    insert into employees(name,age,position) values(CONCAT('zhuge',i),i,'dev');  
    set i=i+1;                       
  end while;
end;;
delimiter ;
call insert_emp();
```

**1、联合索引第一个字段用范围不会走索引**

```sql
EXPLAIN SELECT * FROM employees WHERE name > 'LiLei' AND age = 22 AND position ='manager';
```

![0](https://note.youdao.com/yws/public/resource/d2e8a0ae8c9dc2a45c799b771a5899f6/xmlnote/8B6932DA0FCA46D0A473192F7832275B/98405.png)

![0](./imgs/MySQL/98405.png)

> 联合索引第一个字段就用范围查找不会走索引，mysql内部可能觉得第一个字段就用范围，结果集应该很大，回表效率不高，还不如就全表扫描

**2、强制走索引**

```sql
EXPLAIN SELECT * FROM employees force index(idx_name_age_position) WHERE name > 'LiLei' AND age = 22 AND position ='manager'; 
```

![0](./imgs/MySQL/98401.png)

> 虽然使用了强制走索引让联合索引第一个字段范围查找也走索引，扫描的行rows看上去也少了点，但是最终查找效率不一定比全表扫描高，因为回表效率不高

做一个小实验：

```sql
-- 关闭查询缓存
set global query_cache_size=0;  
set global query_cache_type=0;
-- 执行时间0.333s
SELECT * FROM employees WHERE name > 'LiLei';
-- 执行时间0.444s
SELECT * FROM employees force index(idx_name_age_position) WHERE name > 'LiLei';
```

**3、覆盖索引优化**

```sql
EXPLAIN SELECT name,age,position FROM employees WHERE name > 'LiLei' AND age = 22 AND position ='manager';
```

![0](./imgs/MySQL/98402.png)

**4、in和or在表数据量比较大的情况会走索引，在表记录不多的情况下会选择全表扫描**

```sql
EXPLAIN SELECT * FROM employees WHERE name in ('LiLei','HanMeimei','Lucy') AND age = 22 AND position ='manager';
```

![img](./imgs/MySQL/98400-170547754227750.png)

```sql
EXPLAIN SELECT * FROM employees WHERE (name = 'LiLei' or name = 'HanMeimei') AND age = 22 AND position ='manager';
```

![0](./imgs/MySQL/98400.png)

做一个小实验，将employees 表复制一张employees_copy的表，里面保留两三条记录

 ```sql
 EXPLAIN SELECT * FROM employees_copy WHERE name in ('LiLei','HanMeimei','Lucy') AND age = 22 AND position ='manager';
 ```

![0](./imgs/MySQL/98406.png)

```sql
EXPLAIN SELECT * FROM employees_copy WHERE (name = 'LiLei' or name = 'HanMeimei') AND age = 22 AND position ='manager';
```

![0](./imgs/MySQL/98408.png)

**5、like KK% 一般情况都会走索引**

```sql
EXPLAIN SELECT * FROM employees WHERE name like 'LiLei%' AND age = 22 AND position ='manager';
```

![0](./imgs/MySQL/98404.png)

```sql
EXPLAIN SELECT * FROM employees_copy WHERE name like 'LiLei%' AND age = 22 AND position ='manager'; 
```

![0](./imgs/MySQL/98407.png)

这里补充一个概念，**索引下推（Index Condition Pushdown，ICP）**, `like KK%`其实就是用到了索引下推优化

### 索引下推

对于辅助的联合索引`idx_name_age_position(name,age,position)`，正常情况按照**最左前缀原则**

```sql
SELECT * FROM employees WHERE name like 'LiLei%' AND age = 22 AND position ='manager'
```

 这种情况只会走name字段索引，因为根据name字段过滤完，得到的索引行里的age和position是无序的，无法很好的利用索引。

在MySQL5.6之前的版本，这个查询只能在联合索引里匹配到名字是 **'LiLei' 开头**的索引，然后拿这些索引对应的主键逐个回表，到主键索引上找出相应的记录，再比对**age**和**position**这两个字段的值是否符合。

MySQL 5.6引入了索引下推优化，**可以在索引遍历过程中，对索引中包含的所有字段先做判断，过滤掉不符合条件的记录之后再回表，可以有效的减少回表次数**。使用了索引下推优化后，上面那个查询在联合索引里匹配到名字是 **'LiLei' 开头**的索引之后，同时还会在索引里过滤**age**和**position**这两个字段，拿着过滤完剩下的索引对应的主键id再回表查整行数据。

索引下推会减少回表次数，对于innodb引擎的表索引下推**只能用于二级索引**，innodb的主键索引（聚簇索引）树叶子节点上保存的是全行数据，所以这个时候索引下推并不会起到减少查询全行数据的效果。

**为什么范围查找Mysql没有用索引下推优化？**

可能是Mysql认为范围查找过滤的结果集过大，`like KK%` 在绝大多数情况来看，过滤后的结果集比较小，所以这里Mysql选择给 `like KK%` 用了索引下推优化，当然这也不是绝对的，有时`like KK%` 也不一定就会走索引下推。

### 选择合适的索引

```sql
EXPLAIN select * from employees where name > 'a';
```

![0](./imgs/MySQL/75942.png)

如果用name索引需要遍历name字段联合索引树，然后还需要根据遍历出来的主键值去主键索引树里再去查出最终数据，成本比全表扫描还高，可以用覆盖索引优化，这样只需要遍历name字段的联合索引树就能拿到所有结果，如下：

```sql
EXPLAIN select name,age,position from employees where name > 'a' ;
```

![0](./imgs/MySQL/75945.png)

```sql
EXPLAIN select * from employees where name > 'zzz' ;
```

![0](./imgs/MySQL/75948.png)

对于上面这两种 `name>'a'` 和 `name>'zzz'` 的执行结果，mysql最终是否选择走索引或者一张表涉及多个索引，mysql最终如何选择索引，我们可以用**trace工具**来一查究竟，开启trace工具会影响mysql性能，所以只能临时分析sql使用，用完之后立即关闭

**trace工具用法：**

```sh
set session optimizer_trace="enabled=on",end_markers_in_json=on;  --开启trace select * from employees where name > 'a' order by position;
SELECT * FROM information_schema.OPTIMIZER_TRACE; 

查看trace字段：
{
  "steps": [
    {
      "join_preparation": {    --第一阶段：SQL准备阶段，格式化sql
        "select#": 1,
        "steps": [
          {
            "expanded_query": "/* select#1 */ select `employees`.`id` AS `id`,`employees`.`name` AS `name`,`employees`.`age` AS `age`,`employees`.`position` AS `position`,`employees`.`hire_time` AS `hire_time` from `employees` where (`employees`.`name` > 'a') order by `employees`.`position`"
          }
        ] /* steps */
      } /* join_preparation */
    },
    {
      "join_optimization": {    --第二阶段：SQL优化阶段
        "select#": 1,
        "steps": [
          {
            "condition_processing": {    --条件处理
              "condition": "WHERE",
              "original_condition": "(`employees`.`name` > 'a')",
              "steps": [
                {
                  "transformation": "equality_propagation",
                  "resulting_condition": "(`employees`.`name` > 'a')"
                },
                {
                  "transformation": "constant_propagation",
                  "resulting_condition": "(`employees`.`name` > 'a')"
                },
                {
                  "transformation": "trivial_condition_removal",
                  "resulting_condition": "(`employees`.`name` > 'a')"
                }
              ] /* steps */
            } /* condition_processing */
          },
          {
            "substitute_generated_columns": {
            } /* substitute_generated_columns */
          },
          {
            "table_dependencies": [    --表依赖详情
              {
                "table": "`employees`",
                "row_may_be_null": false,
                "map_bit": 0,
                "depends_on_map_bits": [
                ] /* depends_on_map_bits */
              }
            ] /* table_dependencies */
          },
          {
            "ref_optimizer_key_uses": [
            ] /* ref_optimizer_key_uses */
          },
          {
            "rows_estimation": [    --预估表的访问成本
              {
                "table": "`employees`",
                "range_analysis": {
                  "table_scan": {     --全表扫描情况
                    "rows": 10123,    --扫描行数
                    "cost": 2054.7    --查询成本
                  } /* table_scan */,
                  "potential_range_indexes": [    --查询可能使用的索引
                    {
                      "index": "PRIMARY",    --主键索引
                      "usable": false,
                      "cause": "not_applicable"
                    },
                    {
                      "index": "idx_name_age_position",    --辅助索引
                      "usable": true,
                      "key_parts": [
                        "name",
                        "age",
                        "position",
                        "id"
                      ] /* key_parts */
                    }
                  ] /* potential_range_indexes */,
                  "setup_range_conditions": [
                  ] /* setup_range_conditions */,
                  "group_index_range": {
                    "chosen": false,
                    "cause": "not_group_by_or_distinct"
                  } /* group_index_range */,
                  "analyzing_range_alternatives": {    --分析各个索引使用成本
                    "range_scan_alternatives": [
                      {
                        "index": "idx_name_age_position",
                        "ranges": [
                          "a < name"      --索引使用范围
                        ] /* ranges */,
                        "index_dives_for_eq_ranges": true,
                        "rowid_ordered": false,    --使用该索引获取的记录是否按照主键排序
                        "using_mrr": false,
                        "index_only": false,       --是否使用覆盖索引
                        "rows": 5061,              --索引扫描行数
                        "cost": 6074.2,            --索引使用成本
                        "chosen": false,           --是否选择该索引
                        "cause": "cost"
                      }
                    ] /* range_scan_alternatives */,
                    "analyzing_roworder_intersect": {
                      "usable": false,
                      "cause": "too_few_roworder_scans"
                    } /* analyzing_roworder_intersect */
                  } /* analyzing_range_alternatives */
                } /* range_analysis */
              }
            ] /* rows_estimation */
          },
          {
            "considered_execution_plans": [
              {
                "plan_prefix": [
                ] /* plan_prefix */,
                "table": "`employees`",
                "best_access_path": {    --最优访问路径
                  "considered_access_paths": [   --最终选择的访问路径
                    {
                      "rows_to_scan": 10123,
                      "access_type": "scan",     --访问类型：为scan，全表扫描
                      "resulting_rows": 10123,
                      "cost": 2052.6,
                      "chosen": true,            --确定选择
                      "use_tmp_table": true
                    }
                  ] /* considered_access_paths */
                } /* best_access_path */,
                "condition_filtering_pct": 100,
                "rows_for_plan": 10123,
                "cost_for_plan": 2052.6,
                "sort_cost": 10123,
                "new_cost_for_plan": 12176,
                "chosen": true
              }
            ] /* considered_execution_plans */
          },
          {
            "attaching_conditions_to_tables": {
              "original_condition": "(`employees`.`name` > 'a')",
              "attached_conditions_computation": [
              ] /* attached_conditions_computation */,
              "attached_conditions_summary": [
                {
                  "table": "`employees`",
                  "attached": "(`employees`.`name` > 'a')"
                }
              ] /* attached_conditions_summary */
            } /* attaching_conditions_to_tables */
          },
          {
            "clause_processing": {
              "clause": "ORDER BY",
              "original_clause": "`employees`.`position`",
              "items": [
                {
                  "item": "`employees`.`position`"
                }
              ] /* items */,
              "resulting_clause_is_simple": true,
              "resulting_clause": "`employees`.`position`"
            } /* clause_processing */
          },
          {
            "reconsidering_access_paths_for_index_ordering": {
              "clause": "ORDER BY",
              "steps": [
              ] /* steps */,
              "index_order_summary": {
                "table": "`employees`",
                "index_provides_order": false,
                "order_direction": "undefined",
                "index": "unknown",
                "plan_changed": false
              } /* index_order_summary */
            } /* reconsidering_access_paths_for_index_ordering */
          },
          {
            "refine_plan": [
              {
                "table": "`employees`"
              }
            ] /* refine_plan */
          }
        ] /* steps */
      } /* join_optimization */
    },
    {
      "join_execution": {    --第三阶段：SQL执行阶段
        "select#": 1,
        "steps": [
        ] /* steps */
      } /* join_execution */
    }
  ] /* steps */
}

结论：全表扫描的成本低于索引扫描，所以mysql最终选择全表扫描

select * from employees where name > 'zzz' order by position;
SELECT * FROM information_schema.OPTIMIZER_TRACE;

查看trace字段可知索引扫描的成本低于全表扫描，所以mysql最终选择索引扫描

set session optimizer_trace="enabled=off";    --关闭trace
```

### 常见sql优化

#### order by与group by优化

Case1：

![0](./imgs/MySQL/75983.png)

> 利用最左前缀法则：中间字段不能断，因此查询用到了name索引，从key_len=74也能看出，age索引列用在排序过程中，因为Extra字段里没有using filesort

Case 2：

![0](./imgs/MySQL/75979.png)

> 从explain的执行结果来看：key_len=74，查询使用了name索引，由于用了position进行排序，跳过了age，出现了Using filesort。

Case 3：

![0](./imgs/MySQL/75993.png)

> 查找只用到索引name，age和position用于排序，无Using filesort。

Case 4：

![0](./imgs/MySQL/76003.png)

> 和Case 3中explain的执行结果一样，但是出现了Using filesort，因为索引的创建顺序为name,age,position，但是排序的时候age和position颠倒位置了。

Case 5：

![0](./imgs/MySQL/76025.png)

> 与Case 4对比，在Extra中并未出现Using filesort，因为age为常量，在排序中被优化，所以索引未颠倒，不会出现Using filesort。

Case 6：

![0](./imgs/MySQL/76038.png)

> 虽然排序的字段列与索引顺序一样，且order by默认升序，这里position desc变成了降序，导致与索引的排序方式不同，从而产生Using filesort。Mysql8以上版本有降序索引可以支持该种查询方式。

Case 7：

![0](./imgs/MySQL/76049.png)

> 对于排序来说，多个相等条件也是范围查询

Case 8：

![0](./imgs/MySQL/76074.png)

> 可以用覆盖索引优化

![0](./imgs/MySQL/76079.png)

**优化总结：**

1. MySQL支持两种方式的排序`filesort`和`index`，Using index是指MySQL扫描索引本身完成排序。index效率高，filesort效率低。

2. `order by`满足两种情况会使用`Using index`。

   1. order by语句使用索引最左前缀。

   2. 使用where子句与order by子句条件列组合满足索引最左前缀。

3. 尽量在索引列上完成排序，遵循索引建立（索引创建的顺序）时的最左前缀法则。

4. 如果`order by`的条件不在索引列上，就会产生Using filesort。

5. 能用覆盖索引尽量用覆盖索引。

6. `group by`与`order by`很类似，其实质是先排序后分组，遵照索引创建顺序的最左前缀法则。对于group by的优化如果不需要排序的可以加上**order by null禁止排序**。注意，where高于having，能写在where中的限定条件就不要去having限定了。

#### 分页查询优化

**示例三**

```sql
-- 示例表：
CREATE TABLE `employees` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(24) NOT NULL DEFAULT '' COMMENT '姓名',
  `age` int(11) NOT NULL DEFAULT '0' COMMENT '年龄',
  `position` varchar(20) NOT NULL DEFAULT '' COMMENT '职位',
  `hire_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '入职时间',
  PRIMARY KEY (`id`),
  KEY `idx_name_age_position` (`name`,`age`,`position`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COMMENT='员工记录表';
```

很多时候我们业务系统实现分页功能可能会用如下sql实现

```sql
select * from employees limit 10000,10;
```

表示从表 employees 中取出从 10001 行开始的 10 行记录。看似只查询了 10 条记录，实际这条 SQL 是先读取 10010 条记录，然后抛弃前 10000 条记录，然后读到后面 10 条想要的数据。因此要查询一张大表比较靠后的数据，执行效率是非常低的。

**常见的分页场景优化技巧：**

**1、根据自增且连续的主键排序的分页查询**

首先来看一个根据自增且连续主键排序的分页查询的例子：

```sql
select * from employees limit 90000,5;
```

![0](./imgs/MySQL/100109.png)

该 SQL 表示查询从第 90001开始的五行数据，没添加单独 order by，表示通过**主键排序**。我们再看表 employees ，因为主键是自增并且连续的，所以可以改写成按照主键去查询从第 90001开始的五行数据，如下：

```sql
select * from employees where id > 90000 limit 5;
```

![0](./imgs/MySQL/100108.png)

查询的结果是一致的。我们再对比一下执行计划：

```sql
EXPLAIN select * from employees limit 90000,5;
```

![0](./imgs/MySQL/100117.png)

```sql
EXPLAIN select * from employees where id > 90000 limit 5;
```

![0](./imgs/MySQL/100113.png)

显然改写后的 SQL 走了索引，而且扫描的行数大大减少，执行效率更高。 

但是，这条改写的SQL 在很多场景并不实用，因为表中可能某些记录被删后，主键空缺，导致结果不一致，如下图试验所示（先删除一条前面的记录，然后再测试原 SQL 和优化后的 SQL）：

![0](./imgs/MySQL/100105.png)

![0](./imgs/MySQL/100103.png)

两条 SQL 的结果并不一样，因此，如果主键不连续，不能使用上面描述的优化方法。

另外如果原 SQL 是 order by 非主键的字段，按照上面说的方法改写会导致两条 SQL 的结果不一致。所以这种改写得满足以下两个条件：

- 主键自增且连续
- 结果是按照主键排序的

**2、根据非主键字段排序的分页查询**

再看一个根据非主键字段排序的分页查询，SQL 如下：

```mysql
select * from employees ORDER BY name limit 90000,5;
```

![0](./imgs/MySQL/100110.png)

```mysql
EXPLAIN select * from employees ORDER BY name limit 90000,5;
```

![0](./imgs/MySQL/100107.png)

发现并没有使用 name 字段的索引（key 字段对应的值为 null），具体原因上节课讲过：**扫描整个索引并查找到没索引的行(可能要遍历多个索引树)的成本比扫描全表的成本更高，所以优化器放弃使用索引**。

知道不走索引的原因，那么怎么优化呢？

其实关键是**让排序时返回的字段尽可能少**，所以可以让排序和分页操作先查出主键，然后根据主键查到对应的记录，SQL改写如下

```sql
select * from employees e inner join (select id from employees order by name limit 90000,5) ed on e.id = ed.id;
```

![0](./imgs/MySQL/100106.png)

需要的结果与原 SQL 一致，执行时间减少了一半以上，我们再对比优化前后sql的执行计划：

![0](./imgs/MySQL/100104.png)

原 SQL 使用的是 filesort 排序，而优化后的 SQL 使用的是索引排序。

#### join关联查询优化

```sql
-- 示例表：
CREATE TABLE `t1` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `a` int(11) DEFAULT NULL,
  `b` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_a` (`a`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

create table t2 like t1;

-- 插入一些示例数据
-- 往t1表插入1万行记录
drop procedure if exists insert_t1; 
delimiter ;;
create procedure insert_t1()        
begin
  declare i int;                    
  set i=1;                          
  while(i<=10000)do                 
    insert into t1(a,b) values(i,i);  
    set i=i+1;                       
  end while;
end;;
delimiter ;
call insert_t1();

-- 往t2表插入100行记录
drop procedure if exists insert_t2; 
delimiter ;;
create procedure insert_t2()        
begin
  declare i int;                    
  set i=1;                          
  while(i<=100)do                 
    insert into t2(a,b) values(i,i);  
    set i=i+1;                       
  end while;
end;;
delimiter ;
call insert_t2();
```

**mysql的表关联常见有两种算法**

- Nested-Loop Join 算法

- Block Nested-Loop Join 算法

**1、** **嵌套循环连接** **Nested-Loop Join(NLJ) 算法**

一次一行循环地从第一张表（称为**驱动表**）中读取行，在这行数据中取到关联字段，根据关联字段在另一张表（**被驱动表**）里取出满足条件的行，然后取出两张表的结果合集。

```sql
EXPLAIN select * from t1 inner join t2 on t1.a= t2.a;
```

![0](./imgs/MySQL/100112.png)

从执行计划中可以看到这些信息：

- 驱动表是 t2，被驱动表是 t1。先执行的就是驱动表(执行计划结果的id如果一样则按从上到下顺序执行sql)；优化器一般会优先选择**小表做驱动表，**用where条件过滤完驱动表，然后再跟被驱动表做关联查询。**所以使用 inner join 时，排在前面的表并不一定就是驱动表。**
- 当使用left join时，左表是驱动表，右表是被驱动表，当使用right join时，右表时驱动表，左表是被驱动表，当使用join时，mysql会选择数据量比较小的表作为驱动表，大表作为被驱动表。
- 使用了 NLJ算法。一般 join 语句中，如果执行计划 Extra 中未出现 **Using join buffer** 则表示使用的 join 算法是 NLJ。

**上面sql的大致流程如下：**

1. 从表 t2 中读取一行数据（如果t2表有查询过滤条件的，用先用条件过滤完，再从过滤结果里取出一行数据）；
2. 从第 1 步的数据中，取出关联字段 a，到表 t1 中查找；
3. 取出表 t1 中满足条件的行，跟 t2 中获取到的结果合并，作为结果返回给客户端；
4. 重复上面 3 步。

整个过程会读取 t2 表的所有数据(**扫描100行**)，然后遍历这每行数据中字段 a 的值，根据 t2 表中 a 的值索引扫描 t1 表中的对应行(**扫描100次 t1 表的索引，1次扫描可以认为最终只扫描 t1 表一行完整数据，也就是总共 t1 表也扫描了100行**)。因此整个过程扫描了 **200 行**。

如果被驱动表的关联字段没索引，**使用NLJ算法性能会比较低(下面有详细解释)**，mysql会选择Block Nested-Loop Join算法。

**2、** **基于块的嵌套循环连接 Block Nested-Loop Join(BNL)算法**

把**驱动表**的数据读入到 join_buffer 中，然后扫描**被驱动表**，把**被驱动表**每一行取出来跟 join_buffer 中的数据做对比。

```sql
EXPLAIN select * from t1 inner join t2 on t1.b= t2.b;
```

![0](./imgs/MySQL/100111.png)

Extra 中 的Using join buffer (Block Nested Loop)说明该关联查询使用的是 BNL 算法。

**上面sql的大致流程如下：**

1. 把 t2 的所有数据放入到 **join_buffer** 中
2. 把表 t1 中每一行取出来，跟 join_buffer 中的数据做对比
3. 返回满足 join 条件的数据

整个过程对表 t1 和 t2 都做了一次全表扫描，因此扫描的总行数为10000(表 t1 的数据总量) + 100(表 t2 的数据总量) = **10100**。并且 join_buffer 里的数据是无序的，因此对表 t1 中的每一行，都要做 100 次判断，所以内存中的判断次数是 100 * 10000= **100 万次**。

这个例子里表 t2 才 100 行，要是表 t2 是一个大表，join_buffer 放不下怎么办呢？·

join_buffer 的大小是由参数 join_buffer_size 设定的，默认值是 256k。如果放不下表 t2 的所有数据话，策略很简单，就是**分段放**。

比如 t2 表有1000行记录， join_buffer 一次只能放800行数据，那么执行过程就是先往 join_buffer 里放800行记录，然后从 t1 表里取数据跟 join_buffer 中数据对比得到部分结果，然后清空  join_buffer ，再放入 t2 表剩余200行记录，再次从 t1 表里取数据跟 join_buffer 中数据对比。所以就多扫了一次 t1 表。

**被驱动表的关联字段没索引为什么要选择使用 BNL 算法而不使用 Nested-Loop Join 呢？**

如果上面第二条sql使用 Nested-Loop Join，那么扫描行数为 100 * 10000 = 100万次，这个是**磁盘扫描**。

很显然，用BNL磁盘扫描次数少很多，相比于磁盘扫描，BNL的内存计算会快得多。

因此MySQL对于被驱动表的关联字段没索引的关联查询，一般都会使用 BNL 算法。如果有索引一般选择 NLJ 算法，有索引的情况下 NLJ 算法比 BNL算法性能更高

**对于关联sql的优化**

- **关联字段加索引**，让mysql做join操作时尽量选择NLJ算法，驱动表因为需要全部查询出来，所以过滤的条件也尽量要走索引，避免全表扫描，总之，能走索引的过滤条件尽量都走索引
- **小表驱动大表**，写多表连接sql时如果**明确知道**哪张表是小表可以用straight_join写法固定连接驱动方式，省去mysql优化器自己判断的时间

**straight_join解释：straight_join**功能同join类似，但能让左边的表来驱动右边的表，能改表优化器对于联表查询的执行顺序。

比如：

```sql
select * from t2 straight_join t1 on t2.a = t1.a;
-- 代表指定mysql选着 t2 表作为驱动表。
```

- **straight_join**只适用于inner join，并不适用于left join，right join。（因为left join，right join已经代表指定了表的执行顺序）
- 尽可能让优化器去判断，因为大部分情况下mysql优化器是比人要聪明的。使用**straight_join**一定要慎重，因为部分情况下人为指定的执行顺序并不一定会比优化引擎要靠谱。

**对于小表定义的明确**

在决定哪个表做驱动表的时候，应该是两个表按照各自的条件过滤，**过滤完成之后**，计算参与 join 的各个字段的总数据量，**数据量小的那个表，就是“小表”**，应该作为驱动表。

#### in和exsits优化

原则：**小表驱动大表**，即小的数据集驱动大的数据集

**in：**当B表的数据集小于A表的数据集时，in优于exists

```sql
select * from A where id in (select id from B)
# 等价于： 　
for(select id from B){      
	select * from A where A.id = B.id 
}              
```

**exists：**当A表的数据集小于B表的数据集时，exists优于in

将主查询A的数据，放到子查询B中做条件验证，根据验证结果（true或false）来决定主查询的数据是否保留

```sql
select * from A where exists (select 1 from B where B.id = A.id)
# 等价于:
for(select * from A){
	select * from B where B.id = A.id
}
#A表与B表的ID字段应建立索引              
```

1、EXISTS (subquery)只返回TRUE或FALSE，因此子查询中的`SELECT * `也可以用`SELECT 1`替换,官方说法是实际执行时会忽略SELECT清单,因此没有区别

2、EXISTS子查询的实际执行过程可能经过了优化而不是我们理解上的逐条对比

3、EXISTS子查询往往也可以用JOIN来代替，何种最优需要具体问题具体分析

#### count(*)查询优化

```sql
-- 临时关闭mysql查询缓存，为了查看sql多次执行的真实时间
set global query_cache_size=0;
set global query_cache_type=0;
EXPLAIN select count(1) from employees;
EXPLAIN select count(id) from employees;
EXPLAIN select count(name) from employees;
EXPLAIN select count(*) from employees;              
```

> 注意：以上4条sql只有根据某个字段count不会统计字段为null值的数据行

![0](./imgs/MySQL/100116.png)

**四个sql的执行计划一样，说明这四个sql执行效率应该差不多**

- 字段有索引：`count(*)≈count(1)>count(字段)>count(主键 id) `，字段有索引，`count(字段)`统计走二级索引，二级索引存储数据比主键索引少，所以`count(字段)>count(主键 id)`

- 字段无索引：`count(*)≈count(1)>count(主键 id)>count(字段)`，字段没有索引，`count(字段)`统计走不了索引，`count(主键 id)`可以走主键索引，所以`count(主键 id)>count(字段)`

- `count(1)、count(字段)`执行过程类似，不过`count(1)`不需要取出字段统计，就用常量1做统计，`count(字段)`还需要取出字段，所以理论上`count(1)`比`count(字段)`会快一点。

- `count(*)` 是例外，mysql并不会把全部字段取出来，而是专门做了优化，不取值，按行累加，效率很高，所以不需要用`count(列名)或count(常量)`来替代 `count(*)`。

为什么对于`count(id)`，mysql最终选择辅助索引而不是主键聚簇索引？因为**二级索引相对主键索引存储数据更少**，检索性能应该更高，mysql内部做了点优化(应该是在5.7版本才优化)。

#### 常见优化方法

**1、查询mysql自己维护的总行数**

对于**myisam存储引擎**的表做不带where条件的`count查询`性能是很高的，因为myisam存储引擎的表的总行数会被mysql存储在磁盘上，查询不需要计算

![0](./imgs/MySQL/100114.png)

对于**innodb存储引擎**的表mysql不会存储表的总记录行数**(因为有MVCC机制)**，`count查询`需要实时计算

**2、show table status**

如果只需要知道表总行数的估计值可以用如下sql查询，性能很高

![0](./imgs/MySQL/100115.png)

**3、将总数维护到Redis里**

插入或删除表数据行的时候同时维护redis里的表总行数key的计数值(用incr或decr命令)，但是这种方式可能不准，很难保证表操作和redis操作的事务一致性

**4、增加数据库计数表**

插入或删除表数据行的时候同时维护计数表，让他们在同一个事务里操作

### filesort文件排序

**filesort文件排序方式**

- 单路排序：是一次性取出满足条件行的所有字段，然后在`sort buffer`中进行排序；用trace工具可以看到**sort_mode**信息里显示`< sort_key, additional_fields >`或者`< sort_key, packed_additional_fields >`
- 双路排序（又叫**回表**排序模式）：是首先根据相应的条件取出相应的**排序字段**和**可以直接定位行数据的行 ID**，然后在 sort buffer 中进行排序，排序完后需要再次取回其它需要的字段；用trace工具可以看到**sort_mode**信息里显示`< sort_key, rowid >`

MySQL 通过比较系统变量 `max_length_for_sort_data`(**默认1024字节**) 的大小和需要查询的字段总大小来判断使用哪种排序模式。

- 如果字段的总长度小于`max_length_for_sort_data` ，使用单路排序模式；
- 如果字段的总长度大于`max_length_for_sort_data` ，使用双路排序模式。

**示例验证下各种排序方式：**

![0](./imgs/MySQL/76138.png)

查看下这条sql对应trace结果如下(只展示排序部分)：

```sql
set session optimizer_trace="enabled=on",end_markers_in_json=on;  --开启trace
select * from employees where name = 'zhuge' order by position;
select * from information_schema.OPTIMIZER_TRACE;

trace排序部分结果：
"join_execution": {    --Sql执行阶段
        "select#": 1,
        "steps": [
          {
            "filesort_information": [
              {
                "direction": "asc",
                "table": "`employees`",
                "field": "position"
              }
            ] /* filesort_information */,
            "filesort_priority_queue_optimization": {
              "usable": false,
              "cause": "not applicable (no LIMIT)"
            } /* filesort_priority_queue_optimization */,
            "filesort_execution": [
            ] /* filesort_execution */,
            "filesort_summary": {                      --文件排序信息
              "rows": 10000,                           --预计扫描行数
              "examined_rows": 10000,                  --参与排序的行
              "number_of_tmp_files": 3,                --使用临时文件的个数，这个值如果为0代表全部使用的sort_buffer内存排序，否则使用的磁盘文件排序
              "sort_buffer_size": 262056,              --排序缓存的大小，单位Byte
              "sort_mode": "<sort_key, packed_additional_fields>"       --排序方式，这里用的单路排序
            } /* filesort_summary */
          }
        ] /* steps */
      } /* join_execution */
      
      
set max_length_for_sort_data = 10;    --employees表所有字段长度总和肯定大于10字节
select * from employees where name = 'zhuge' order by position;
select * from information_schema.OPTIMIZER_TRACE;

trace排序部分结果：
"join_execution": {
        "select#": 1,
        "steps": [
          {
            "filesort_information": [
              {
                "direction": "asc",
                "table": "`employees`",
                "field": "position"
              }
            ] /* filesort_information */,
            "filesort_priority_queue_optimization": {
              "usable": false,
              "cause": "not applicable (no LIMIT)"
            } /* filesort_priority_queue_optimization */,
            "filesort_execution": [
            ] /* filesort_execution */,
            "filesort_summary": {
              "rows": 10000,
              "examined_rows": 10000,
              "number_of_tmp_files": 2,
              "sort_buffer_size": 262136,   
              "sort_mode": "<sort_key, rowid>"         --排序方式，这里用的双路排序
            } /* filesort_summary */
          }
        ] /* steps */
      } /* join_execution */


set session optimizer_trace="enabled=off";    --关闭trace
```

我们先看**单路排序**的详细过程：

1. 从索引name找到第一个满足 name = ‘zhuge’ 条件的主键 id
2. 根据主键 id 取出整行，**取出所有字段的值，存入 sort_buffer 中**
3. 从索引name找到下一个满足 name = ‘zhuge’ 条件的主键 id
4. 重复步骤 2、3 直到不满足 name = ‘zhuge’ 
5. 对 sort_buffer 中的数据按照字段 position 进行排序
6. 返回结果给客户端

我们再看下**双路排序**的详细过程：

1. 从索引 name 找到第一个满足 name = ‘zhuge’  的主键id
2. 根据主键 id 取出整行，**把排序字段 position 和主键 id 这两个字段放到 sort buffer 中**
3. 从索引 name 取下一个满足 name = ‘zhuge’  记录的主键 id
4. 重复 3、4 直到不满足 name = ‘zhuge’ 
5. 对 sort_buffer 中的字段 position 和主键 id 按照字段 position 进行排序
6. 遍历排序好的 id 和字段 position，按照 id 的值**回到原表**中取出 所有字段的值返回给客户端

其实对比两个排序模式，单路排序会把所有需要查询的字段都放到 sort buffer 中，而双路排序只会把主键和需要排序的字段放到 sort buffer 中进行排序，然后再通过主键回到原表查询需要的字段。

- 如果 MySQL **排序内存** **sort_buffer** 配置的比较小并且没有条件继续增加了，可以适当把 `max_length_for_sort_data` 配置小点，让优化器选择使用**双路排序**算法，可以在sort_buffer 中一次排序更多的行，只是需要再根据主键回到原表取数据。

- 如果 MySQL 排序内存有条件可以配置比较大，可以适当增大 `max_length_for_sort_data` 的值，让优化器优先选择全字段排序(**单路排序**)，把需要的字段放到 sort_buffer 中，这样排序后就会直接从内存里返回查询结果了。

所以，MySQL通过 **max_length_for_sort_data** 这个参数来控制排序，在不同场景使用不同的排序模式，从而提升排序效率。

> 如果全部使用sort_buffer内存排序一般情况下效率会高于磁盘文件排序，但不能因为这个就随便增大sort_buffer(默认1M)，mysql很多参数设置都是做过优化的，不要轻易调整。

### 慢查询

MySQL的慢查询，全名是**慢查询日志**，是MySQL提供的一种日志记录，用来记录在MySQL中**响应时间超过阀值**的语句。

具体环境中，运行时间超过`long_query_time`值的SQL语句，则会被记录到慢查询日志中。

`long_query_time`的默认值为10，意思是记录运行10秒以上的语句。

默认情况下，MySQL数据库并不启动慢查询日志，需要手动来设置这个参数。

当然，**如果不是调优需要的话，一般不建议启动该参数**，因为开启慢查询日志会或多或少带来一定的性能影响。

慢查询日志支持将日志记录写入文件和数据库表。

**慢查询的相关参数**

| 参数名                        | 描述                                   | 取值范围                              |
| ----------------------------- | -------------------------------------- | ------------------------------------- |
| slow_query_log                | 是否开启慢查询日志                     | 1: 开启, 0: 关闭                      |
| log-slow-queries              | 旧版MySQL数据库慢查询日志存储路径      | 字符串                                |
| slow-query-log-file           | 新版MySQL数据库慢查询日志存储路径      | 字符串                                |
| long_query_time               | 慢查询阈值                             | 正整数                                |
| log_queries_not_using_indexes | 是否记录未使用索引的查询到慢查询日志中 | 1: 记录, 0: 不记录                    |
| log_output                    | 日志存储方式                           | 'FILE': 存入文件, 'TABLE': 存入数据库 |

**配置示例**

默认情况下`slow_query_log`的值为OFF，表示慢查询日志是禁用的，可以通过设置`slow_query_log`的值来开启，如下所示：

```sh
show variables  like '%slow_query_log%';
 +---------------------+-----------------------------------------------+
 | Variable_name       | Value                                         |
 +---------------------+-----------------------------------------------+
 | slow_query_log      | OFF                                           |
 | slow_query_log_file | /home/WDPM/MysqlData/mysql/DB-Server-slow.log |
 +---------------------+-----------------------------------------------+
 2 rows in set (0.00 sec)
 
set global slow_query_log=1;
Query OK, 0 rows affected (0.09 sec)
```

使用`set global slow_query_log=1`开启了慢查询日志只对当前数据库生效，MySQL重启后则会失效。如果要永久生效，就必须修改配置文件`my.cnf`（其它系统变量也是如此）。

`my.cnf`要增加或修改参数`slow_query_log` 和`slow_query_log_file`，然后重启MySQL服务器，如下所示

```sh
slow_query_log=1
slow_query_log_file=/tmp/mysql_slow.log
long_query_time=3 
log_output=FILE 	# 将日志存入文件
```

设置慢查询阈值

```sh
show variables like 'long_query_time%';
 +-----------------+-----------+
 | Variable_name   | Value     |
 +-----------------+-----------+
 | long_query_time | 10.000000 |
 +-----------------+-----------+
 1 row in set (0.00 sec)
 
set global long_query_time=4;
 Query OK, 0 rows affected (0.00 sec)
 
show variables like 'long_query_time';
 +-----------------+-----------+
 | Variable_name   | Value     |
 +-----------------+-----------+
 | long_query_time | 10.000000 |
 +-----------------+-----------+
 1 row in set (0.00 sec)
```

### 索引合并

MySQL在一般情况下执行一个查询时最多只会用到单个二级索引，但存在有特殊情况，在这些特殊情况下也可能在一个查询中使用到多个二级索引，MySQL中这种使用到多个索引来完成一次查询的执行方法称之为：索引合并（`index merge`）

#### Intersection合并

交集合并：某个查询可以使用多个二级索引，将从多个二级索引中查询到的结果取交集，比方说下边这个查询：

```sql
SELECT * FROM order_exp WHERE order_no = 'a' AND expire_time = 'b';
```

假设这个查询使用`Intersection`合并的方式执行的话，那这个过程就是这样的： 

1. 从`idx_order_no`二级索引对应的B+树中取出`order_no= 'a'`的相关记录。 
2. 从`idx_insert_time`二级索引对应的B+树中取出`insert_time= 'b'`的相关记录。 
3. 二级索引的记录都是由**索引列 + 主键**构成的，所以可以计算出这两个结果集中id值的**交集**。 按照上面步骤取到的id值列表进行回表操作，也就是从聚簇索引中把指定id值的完整用户记录取出来，返回给用户。

为啥不直接使用`idx_order_no`或者`idx_insert_time`只根据某个搜索条件去读取一个二级索引，然后回表后再过滤另外一个搜索条件呢？这里要分析一下两种查询执行方式之间需要的成本代价。

- 只读取一个二级索引的成本： 按照某个搜索条件读取一个二级索引，根据从该二级索引得到的主键值进行回表操作，然后再过滤其他的搜索条件。
- 读取多个二级索引之后取交集成本： 按照不同的搜索条件分别读取不同的二级索引，将从多个二级索引得到的主键值取交集， 然后进行回表操作。 

虽然读取多个二级索引比读取一个二级索引消耗性能，但是大部分情况下读取二级索引的操作是**顺序I/O**，而回表操作是**随机I/O**，所以如果只读取一个二级索引时需要回表的记录数特别多，而读取多个二级索引之后取交集的记录数非常少，当节省的因为回表而造成的性能损耗比访问多个二级索引带来的性能损耗更高时，读取多个二级索引后取交集比只读 取一个二级索引的成本更低。

MySQL在某些特定的情况下才可能会使用到`Intersection`索引合并

1. 等值匹配

二级索引列是等值匹配的情况，对于联合索引来说，在联合索引中的每个列都必须等值匹配，不能出现只匹配部分列的情况。 而下边这两个查询就不能进行`Intersection`索引合并： 

```sql
SELECT * FROM order_exp WHERE order_no> 'a' AND insert_time = 'a' AND order_status = 'b' AND expire_time = 'c';

 SELECT * FROM order_exp WHERE order_no = 'a' AND insert_time = 'a';
```

 第一个查询是因为对`order_no`进行了范围匹配

第二个查询是因为联合索引`u_idx_day_status`中的`order_status和expire_time`列并没有出现在搜索条件中，所以这两个查询不能进行Intersection索引合并。

2. 主键列可以是范围匹配

比方说下边这个查询可能用到主键和`u_idx_day_status`进行`Intersection`索引合并的操作：

```sql
SELECT * FROM order_exp WHERE id > 100 AND insert_time = 'a';
```

> 之所以在二级索引列都是等值匹配的情况下才可能使用`Intersection`索引合并，是因为只有在这种情况下根据二级索引查询出的结果集是按照主键值排序的。

`Intersection`索引合并会把从多个二级索引中查询出的主键值求交集，如果从各个二级索引中查询的到的结果集本身就是已经按照主键排好序的，那么求交集的过程就很容易。

按照有序的主键值去回表取记录有个专有名词，叫：`Rowid Ordered Retrieval`，简称`ROR`。

> 联合索引可以替代`Intersection`索引合并

#### Union合并

在写查询语句时经常想把既符合某个搜索条件的记录取出来，也把符合另外的某个搜索条件的记录取出来，这些不同的搜索条件之间是OR关系。有时候OR关系的不同搜索条件会使用到不同的索引，比方说这样：

```sql
SELECT * FROM order_exp WHERE order_no = 'a' OR expire_time = 'b'
```

`Intersection`是交集的意思，这适用于使用不同索引的搜索条件之间使用`AND`连接起来的 情况；`Union`是并集的意思，适用于使用不同索引的搜索条件之间使用`OR`连接起来的情 况。与`Intersection`索引合并类似，MySQL在某些特定的情况下才可能会使用到`Union`索引合并。

等值匹配、主键列可以是范围匹配与`Intersection`分析类似

**使用`Intersection`索引合并的搜索条件**

就是搜索条件的某些部分使用`Intersection`索引合并的方式得到的主键集合和其他方式得到的主键集合取交集，比方说这个查询：

```sql
SELECT * FROM order_exp WHERE insert_time = 'a' AND order_status = 'b' AND expire_time = 'c' OR (order_no = 'a' AND expire_time = 'b');
```

优化器可能采用这样的方式来执行这个查询： 

1. 先按照搜索条件`order_no = 'a' AND expire_time = 'b'`从索引`idx_order_no和 idx_expire_time`中使用`Intersection`索引合并的方式得到一个主键集合。 
2. 再按照搜索条件 `insert_time = 'a' AND order_status = 'b' AND expire_time = 'c'`从联合索引`u_idx_day_status`中得到另一个主键集合。 
3. 最后采用`Union`索引合并的方式把上述两个主键集合取并集，然后进行回表操作，将结果返回给用户。

> 查询条件符合了这些情况也不一定就会采用`Intersection、Union`索引合并。
>
> 优化器只有在单独根据搜索条件从某个二级索引中获取的记录数比较少，通过`Intersection、Union` 索引合并后进行访问的代价比全表扫描更小时才会使用`Intersection、Union`索引合并

#### Sort-Union合并

`Union`索引合并的使用条件太苛刻，必须保证各个二级索引列在进行等值匹配的条件下才可能被用到，比方说下边这个查询就无法使用到`Union`索引合并： 

```sql
SELECT * FROM order_exp WHERE order_no< 'a' OR expire_time> 'z'
```

这是因为根据`order_no< 'a'`从`idx_order_no`索引中获取的二级索引记录的主键值不是排好序的，根据`expire_time> 'z'`从`idx_expire_time`索引中获取的二级索引记录的主键值也不是排好序的，但是`order_no< 'a'`和`expire_time> 'z'`这两个条件又特别让我们动心。所以我们可以这样做：

1. 先根据`order_no< 'a'`条件从`idx_order_no`二级索引中获取记录，并按照记录的主键值进行排序 
2. 再根据`expire_time> 'z'`条件从`idx_expire_time`二级索引中获取记录，并按照记录的主键值进行排序，因为上述的两个二级索引主键值都是排好序的，剩下的操作和`Union`索引合并方式就一样 了。 

上述这种**先按照二级索引记录的主键值进行排序，之后按照`Union`索引合并方式执行**称之为`Sort-Union`索引合并，很显然，这种`Sort-Union`索引合并比单纯的`Union`索引合并多了一步对**二级索引记录的主键值排序**的过程。

### 索引设计原则

**1、代码先行，索引后上**

不知大家一般是怎么给数据表建立索引的，是建完表马上就建立索引吗？

这其实是不对的，一般应该等到主体业务功能开发完毕，把涉及到该表相关sql都要拿出来分析之后再建立索引。

**2、联合索引尽量覆盖条件**

比如可以设计一个或者两三个联合索引(尽量少建单值索引)，让每一个联合索引都尽量去包含sql语句里的where、order by、group by的字段，还要确保这些联合索引的字段顺序尽量满足sql查询的最左前缀原则。

**3、不要在小基数字段上建立索引**

索引基数是指这个字段在表里总共有多少个不同的值，比如一张表总共100万行记录，其中有个性别字段，其值不是男就是女，那么该字段的基数就是2。

如果对这种小基数字段建立索引的话，还不如全表扫描了，因为你的索引树里就包含男和女两种值，根本没法进行快速的二分查找，那用索引就没有太大的意义了。

一般建立索引，尽量使用那些基数比较大的字段，就是值比较多的字段，那么才能发挥出B+树快速二分查找的优势来。

**4、长字符串可以采用前缀索引**

尽量对字段类型较小的列设计索引，比如说什么tinyint之类的，因为字段类型较小的话，占用磁盘空间也会比较小，此时你在搜索的时候性能也会比较好一点。

当然，这个所谓的字段类型小一点的列，也不是绝对的，很多时候你就是要针对varchar(255)这种字段建立索引，哪怕多占用一些磁盘空间也是有必要的。

对于这种varchar(255)的大字段可能会比较占用磁盘空间，可以稍微优化下，比如针对这个字段的前20个字符建立索引，就是说，对这个字段里的每个值的前20个字符放在索引树里，类似于 KEY index(name(20),age,position)。

此时你在where条件里搜索的时候，如果是根据name字段来搜索，那么此时就会先到索引树里根据name字段的前20个字符去搜索，定位到之后前20个字符的前缀匹配的部分数据之后，再回到聚簇索引提取出来完整的name字段值进行比对。

但是假如你要是order by name，那么此时你的name因为在索引树里仅仅包含了前20个字符，所以这个排序是没法用上索引的， group by也是同理。所以这里大家要对前缀索引有一个了解。

**5、where与order by冲突时优先where**

在where和order by出现索引设计冲突时，到底是针对where去设计索引，还是针对order by设计索引？到底是让where去用上索引，还是让order by用上索引?

一般这种时候往往都是让where条件去使用索引来快速筛选出来一部分指定的数据，接着再进行排序。

因为大多数情况基于索引进行where筛选往往可以最快速度筛选出你要的少部分数据，然后做排序的成本可能会小很多。    

### 索引设计实战

以社交场景APP来举例，我们一般会去搜索一些好友，这里面就涉及到对用户信息的筛选，这里肯定就是对用户user表搜索了，这个表一般来说数据量会比较大，我们先不考虑分库分表的情况，比如，我们一般会筛选地区(省市)，性别，年龄，身高，爱好之类的，有的APP可能用户还有评分，比如用户的受欢迎程度评分，我们可能还会根据评分来排序等等。

对于后台程序来说除了过滤用户的各种条件，还需要分页之类的处理，可能会生成类似sql语句执行：

```sql
select xx from user where xx=xx and xx=xx order by xx limit xx,xx
```

对于这种情况如何合理设计索引了，比如**用户可能经常会根据省市优先筛选同城的用户，还有根据性别去筛选**，那我们是否应该设计一个联合索引` (province,city,sex) `了？这些字段好像基数都不大，其实是应该的，因为这些字段查询太频繁了。

假设**又有用户根据年龄范围去筛选**了，比如 ：

```sql
select xx from user where province=xx and city=xx and age>=xx and age<=xx
```

我们尝试着把age字段加入联合索引` (province,city,sex,age)`，注意，一般这种范围查找的条件都要放在最后，之前讲过联合索引范围之后条件的是不能用索引的，但是对于当前这种情况依然用不到age这个索引字段，因为**用户没有筛选sex字段**，那怎么优化了？其实我们可以这么来优化下sql的写法：

```sql
select xx from user where province=xx and city=xx and sex in ('female','male') and age>=xx and age<=xx
```

**对于爱好之类的字段也可以类似sex字段处理**，所以可以把爱好字段也加入索引 `(province,city,sex,hobby,age) `

假设可能还有一个筛选条件，比如**要筛选最近一周登录过的用户**，一般大家肯定希望跟活跃用户交友了，这样能尽快收到反馈，对应后台sql可能是这样：

```sql
select xx from user where  province=xx and city=xx and sex in ('female','male') and age>=xx and age<=xx and latest_login_time>= xx
```

那我们是否能把 latest_login_time 字段也加入索引了？比如`  (province,city,sex,hobby,age,latest_login_time) `，显然是不行的，那怎么来优化这种情况了？其实我们可以试着再设计一个字段`is_login_in_latest_7_days`，用户如果一周内有登录值就为1，否则为0，那么我们就可以把索引设计成` (province,city,sex,hobby,is_login_in_latest_7_days,age)`  来满足上面那种场景了！

一般来说，通过这么一个多字段的索引是能够过滤掉绝大部分数据的，就保留小部分数据下来基于磁盘文件进行`order by`语句的排序，最后基于limit进行分页，那么一般性能还是比较高的。

不过有时可能用户会这么来查询，就**查下受欢迎度较高的女性**，比如sql：

```sql
select xx from user where sex = 'female'  order by score limit xx,xx
```

那么上面那个索引是很难用上的，不能把太多的字段以及太多的值都用 in 语句拼接到sql里的，那怎么办了？其实我们可以再设计一个辅助的联合索引，比如 (sex,score)，这样就能满足查询要求了。

以上就是给大家讲的一些索引设计的思路了，核心思想就是，尽量利用一两个复杂的多字段联合索引，抗下你80%以上的查询，然后用一两个辅助索引尽量抗下剩余的一些非典型查询，保证这种大数据量表的查询尽可能多的都能充分利用索引，这样就能保证你的查询速度和性能了！

![img](./imgs/MySQL/127322-17056503928981.png)

## MySQL事务与锁机制

### 事务

**概述**

数据库一般都会并发执行多个事务，多个事务可能会并发的对相同的一批数据进行增删改查操作，可能就会导致脏写、脏读、不可重复读、幻读这些问题。

这些问题的本质都是数据库的多事务并发问题，为了解决多事务并发问题，数据库设计了**事务隔离机制、锁机制、MVCC多版本并发控制隔离机制**，用一整套机制来**解决多事务并发问题**。

#### ACID属性

事务是由一组SQL语句组成的逻辑处理单元,事务具有以下4个属性,通常简称为事务的ACID属性。

- 原子性(Atomicity) ：事务是一个原子操作单元,其对数据的修改,要么全都执行，要么全都不执行。
- 一致性(Consistent) ：在事务开始和完成时,数据都必须保持一致状态。这意味着所有相关的数据规则都必须应用于事务的修改，以保持数据的完整性。
- 隔离性(Isolation) ：数据库系统提供一定的隔离机制，保证事务在不受外部并发操作影响的“独立”环境执行。这意味着事务处理过程中的中间状态对外部是不可见的，反之亦然。
- 持久性(Durable) ：事务完成之后，它对于数据的修改是永久性的，即使出现系统故障也能够保持。

#### 并发事务的问题

1. **更新丢失(Lost Update)或脏写**

　　当两个或多个事务选择同一行，然后基于最初选定的值更新该行时，由于每个事务都不知道其他事务的存在，就会发生丢失更新问题–**最后的更新覆盖了由其他事务所做的更新**。

2. **脏读（Dirty Reads）**

　　一个事务正在对一条记录做修改，在这个事务完成并提交前，这条记录的数据就处于不一致的状态；这时，另一个事务也来读取同一条记录，如果不加控制，第二个事务读取了这些“脏”数据，并据此作进一步的处理，就会产生未提交的数据依赖关系。这种现象被形象的叫做“脏读”。

> **事务A读取到了事务B已经修改但尚未提交的数据**，还在这个数据基础上做了操作。此时，如果B事务回滚，A读取的数据无效，不符合一致性要求。

3. **不可重读（Non-Repeatable Reads） **

　　一个事务在读取某些数据后的某个时间，再次读取以前读过的数据，却发现其读出的数据已经发生了改变、或某些记录已经被删除了！这种现象就叫做“不可重复读”。

> **事务A内部的相同查询语句在不同时刻读出的结果不一致，不符合隔离性**

4. **幻读（Phantom Reads）**

　　一个事务按相同的查询条件重新读取以前检索过的数据，却发现其他事务插入了满足其查询条件的新数据，这种现象就称为“幻读”。

> **事务A读取到了事务B提交的新增数据，不符合隔离性**

#### 事务隔离级别

“脏读”、“不可重复读”和“幻读”，其实都是数据库读一致性问题，必须由数据库提供一定的事务隔离机制来解决。

| 隔离级别                   | 脏读(Dirty Read) | 不可重复读(NonRepeatable Read) | 幻读(Phantom Read) |
| -------------------------- | ---------------- | ------------------------------ | ------------------ |
| 读未提交(Read uncommitted) | 可能             | 可能                           | 可能               |
| 读已提交(Read committed)   | 不可能           | 可能                           | 可能               |
| 可重复读(Repeatableread)   | 不可能           | 不可能                         | 可能               |
| 可串行化(Serializable)     | 不可能           | 不可能                         | 不可能             |

> 数据库的事务隔离越严格，并发副作用越小，但付出的代价也就越大，因为事务隔离实质上就是使事务在一定程度上**串行化**进行，这显然与“并发”是矛盾的。
> 
> 同时，不同的应用对读一致性和事务隔离程度的要求也是不同的，比如许多应用对“不可重复读"和“幻读”并不敏感，可能更关心数据并发访问的能力。

```sh
# 查看看当前数据库的事务隔离级别
show variables like 'tx_isolation';
# 设置事务隔离级别
set tx_isolation='REPEATABLE-READ';
```

> MySQL默认的事务隔离级别是可重复读，用Spring开发程序时，如果不设置隔离级别默认用Mysql设置的隔离级别，如果Spring设置了就用已经设置的隔离级别

### 锁

锁是计算机协调多个进程或线程并发访问某一资源的机制。

在数据库中，除了传统的计算资源（如CPU、RAM、I/O等）的争用以外，数据也是一种供需要用户共享的资源。如何保证数据并发访问的一致性、有效性是所有数据库必须解决的一个问题，锁冲突也是影响数据库并发访问性能的一个重要因素。

#### 锁分类

锁分类：

- 从性能上分为乐观锁(用版本对比来实现)和悲观锁
- 从对数据操作的粒度分，分为表锁和行锁
- 从对数据库操作的类型分，分为读锁和写锁(都属于悲观锁)，还有意向锁

**读锁**（共享锁，S锁(`Shared`)）：针对同一份数据，多个读操作可以同时进行而不会互相影响，比如：

```sql
select * from T where id=1 lock in share mode
```

**写锁**（排它锁，X锁(`Exclusive`)）：当前写操作没有完成前，它会阻断其他写锁和读锁，数据修改操作都会加写锁，查询也可以通过`for update`加写锁，比如：

```sql
*select * from T where id=1* for update
```

**意向锁**（`Intention Lock`）：又称I锁，针对表锁，主要是为了提高加表锁的效率，是mysql数据库自己加的。当有事务给表的数据行加了共享锁或排他锁，同时会给表设置一个标识，代表已经有行锁了，其他事务要想对表加表锁时，就不必逐行判断有没有行锁可能跟表锁冲突了，直接读这个标识就可以确定自己该不该加表锁。特别是表中的记录很多时，逐行判断加表锁的方式效率很低。而这个标识就是意向锁。

意向锁主要分为：

- 意向共享锁，IS锁，对整个表加共享锁之前，需要先获取到意向共享锁。

- 意向排他锁，IX锁，对整个表加排他锁之前，需要先获取到意向排他锁。

#### 表锁

每次操作锁住整张表。开销小，加锁快；不会出现死锁；锁定粒度大，发生锁冲突的概率最高，并发度最低；一般用在整表数据迁移的场景。

**基本操作**	

```sql
-- 建表SQL
CREATE TABLE `mylock` (
	`id` INT (11) NOT NULL AUTO_INCREMENT,
	`NAME` VARCHAR (20) DEFAULT NULL,
	PRIMARY KEY (`id`)
) ENGINE = MyISAM DEFAULT CHARSET = utf8;

-- 插入数据
INSERT INTO`test`.`mylock` (`id`, `NAME`) VALUES ('1', 'a');
INSERT INTO`test`.`mylock` (`id`, `NAME`) VALUES ('2', 'b');
INSERT INTO`test`.`mylock` (`id`, `NAME`) VALUES ('3', 'c');
INSERT INTO`test`.`mylock` (`id`, `NAME`) VALUES ('4', 'd');

-- 手动增加表锁
lock table 表名称 read(write),表名称2 read(write);

-- 查看表上加过的锁
show open tables;

-- 删除表锁
unlock tables;
```

**案例分析(加读锁）**

![img](./imgs/MySQL/98805-17057216865341.png)

当前session和其他session都可以读该表，当前session中插入或者更新锁定的表都会报错，其他session插入或更新则会等待。

**案例分析(加写锁）**

![0](./imgs/MySQL/98803.png)

当前session对该表的增删改查都没有问题，其他session对该表的所有操作被阻塞

**案例结论**

1. 对MyISAM表的读操作(加读锁) ，不会阻塞其他进程对同一表的读请求，但会阻塞对同一表的写请求。只有当读锁释放后，才会执行其它进程的写操作。

2. 对MylSAM表的写操作(加写锁)，会阻塞其他进程对同一表的读和写操作，只有当写锁释放后，才会执行其它进程的读写操作。

#### 行锁

每次操作锁住一行数据。开销大，加锁慢；会出现死锁；锁定粒度最小，发生锁冲突的概率最低，并发度最高。

InnoDB与MYISAM的最大不同有两点：

- **InnoDB支持事务（TRANSACTION）**
- **InnoDB支持行级锁**

**行锁演示**

一个session开启事务更新不提交，另一个session更新同一条记录会阻塞，更新不同记录不会阻塞

**总结：**

InnoDB在执行查询语句`SELECT`时(非串行隔离级别)，不会加锁。但是`update、insert、delete`操作会加行锁。

> **读锁会阻塞写，但是不会阻塞读。而写锁则会把读和写都阻塞**。

#### 行锁与事务隔离级别案例

```sql
CREATE TABLE `account` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `balance` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
INSERT INTO `test`.`account` (`name`, `balance`) VALUES ('lilei', '450');
INSERT INTO `test`.`account` (`name`, `balance`) VALUES ('hanmei', '16000');
INSERT INTO `test`.`account` (`name`, `balance`) VALUES ('lucy', '2400');
```

##### 读未提交

1. 打开一个客户端A，并设置当前事务模式为`read uncommitted`（未提交读），查询表account的初始值：

```sql
set tx_isolation='read-uncommitted';              
```

![0](./imgs/MySQL/98804.png)

2. 在客户端A的事务提交之前，打开另一个客户端B，更新表account：

![0](./imgs/MySQL/98791.png)

3. 这时，虽然客户端B的事务还没提交，但是客户端A就可以查询到B已经更新的数据： 

![0](./imgs/MySQL/98792.png)

4. 一旦客户端B的事务因为某种原因回滚，所有的操作都将会被撤销，那客户端A查询到的数据其实就是**脏数据**： 

![0](./imgs/MySQL/98794.png)

5. 在客户端A执行更新语句

```sql
update account set balance = balance - 50 where id =1
```

lilei的balance没有变成350，居然是400，是不是很奇怪，数据不一致啊，如果你这么想就太天真 了，在应用程序中，我们会用400-50=350，并不知道其他会话回滚了，要想解决这个问题可以采用读已提交的隔离级别

![0](./imgs/MySQL/98790.png)

##### 读已提交

1. 打开一个客户端A，并设置当前事务模式为`read committed`（未提交读），查询表account的所有记录：

```sql
set tx_isolation='read-committed';
```

![0](./imgs/MySQL/98796.png)

2. 在客户端A的事务提交之前，打开另一个客户端B，更新表account： 

![0](./imgs/MySQL/98795.png)

3. 这时，客户端B的事务还没提交，客户端A不能查询到B已经更新的数据，解决了脏读问题： 

![0](./imgs/MySQL/98799.png)

4. 客户端B的事务提交

![0](./imgs/MySQL/98797.png)

5. 客户端A执行与上一步相同的查询，结果与上一步不一致，即产生了不可重复读的问题

![0](./imgs/MySQL/98798.png)

##### 可重复读

1. 打开一个客户端A，并设置当前事务模式为`repeatable read`，查询表account的所有记录

```sql
set tx_isolation='repeatable-read';
```

![0](./imgs/MySQL/98800.png)

2. 在客户端A的事务提交之前，打开另一个客户端B，更新表account并提交

![0](./imgs/MySQL/98789.png)

3. 在客户端A查询表account的所有记录，与步骤1 查询结果一致，没有出现不可重复读的问题

![0](./imgs/MySQL/98793.png)

4. 在客户端A，接着执行

```sql
update account set balance = balance - 50 where id = 1
```

balance没有变成400-50=350，lilei的balance值用的是步骤2中的350来算的，所以是300，数据的一致性倒是没有被破坏。可重复读的隔离级别下使用了**MVCC(multi-version concurrency control)**机制，`select`操作不会更新版本号，是快照读（历史版本）；`insert、update、delete`会更新版本号，是当前读（当前版本）。

![0](./imgs/MySQL/98787.png)

5. 重新打开客户端B，插入一条新数据后提交

![0](./imgs/MySQL/98788.png)

6. 在客户端A查询表account的所有记录，没有查出新增数据，所以没有出现幻读

![0](./imgs/MySQL/98802.png)

7. 验证幻读

在客户端A执行

```sql
update account set balance=888 where id = 4;
```

能更新成功，再次查询能查到客户端B新增的数据

![0](./imgs/MySQL/98801.png)

##### 串行化

1. 打开一个客户端A，并设置当前事务模式为`serializable`，查询表account的初始值：

```sql
set tx_isolation='**serializable**';
```

![0](./imgs/MySQL/98830.png)

2. 打开一个客户端B，并设置当前事务模式为`serializable`，更新相同的id为1 的记录会被阻塞等待，更新id为2的记录可以成功，说明在串行模式下`innodb`的查询也会被加上行锁。

如果客户端A执行的是一个范围查询，那么该**范围内的所有行包括每行记录所在的间隙区间范围**(就算该行数据还未被插入也会加锁，这种是间隙锁)**都会被加锁**。此时如果客户端B在该范围内插入数据都会被阻塞，所以就避免了幻读。

这种隔离级别并发性极低，开发中很少会用到。  

![0](./imgs/MySQL/98844.png)

##### 间隙锁(Gap Lock)

间隙锁，锁的就是两个值之间的空隙。Mysql默认级别是`repeatable-read`，有办法解决幻读问题吗？间隙锁在某些情况下可以解决幻读问题。

假设account表里数据如下：

![0](./imgs/MySQL/98874.png)

那么间隙就有 id 为 `(3,10)，(10,20)，(20,正无穷)` 这三个区间，

在`Session_1`下面执行

```sql
update account set name = 'zhuge' where id > 8 and id <18;
```

则其他Session没法在这个**范围所包含的所有行记录(包括间隙行记录)以及行记录所在的间隙**里插入或修改任何数据，即id在`(3,20]`区间都无法修改数据，注意最后那个20也是包含在内的。

> 间隙锁是在可重复读隔离级别下才会生效

##### 临键锁(Next-key Locks)

`Next-Key Locks`是行锁与间隙锁的组合。像上面那个例子里的这个`(3,20]`的整个区间可以叫做临键锁。

- 无索引行锁会升级为表锁(RR级别会升级为表锁，RC级别不会升级为表锁)

- 锁主要是加在索引上，如果对非索引字段更新，行锁可能会变表锁

`session1` 执行：

```sql
update account set balance = 800 where name = 'lilei';
```

`session2` 对该表任一行操作都会阻塞住

**InnoDB的行锁是针对索引加的锁，不是针对记录加的锁。并且该索引不能失效，否则都会从行锁升级为表锁**。

锁定某一行还可以用`lock in share mode`(共享锁) 和`for update`(排它锁)，例如：

```sql
select * from test_innodb_lock where a = 2 for update;
```

这样其他session只能读这行数据，修改则会被阻塞，直到锁定行的session提交

**结论**

Innodb存储引擎由于实现了行级锁定，虽然在锁定机制的实现方面所带来的性能损耗可能比表级锁定会要更高一下，但是在整体并发处理能力方面要远远优于MYISAM的表级锁定的。当系统并发量高的时候，Innodb的整体性能和MYISAM相比就会有比较明显的优势了。

但是，Innodb的行级锁定同样也有其脆弱的一面，当我们使用不当的时候，可能会让Innodb的整体性能表现不仅不能比MYISAM高，甚至可能会更差。

**行锁分析**

通过检查`InnoDB_row_lock`状态变量来分析系统上的行锁的争夺情况

```sql
show status like 'innodb_row_lock%';              
```

对各个状态量的说明如下：

| 指标                          | 描述                                   |
| ----------------------------- | -------------------------------------|
| ★Innodb_row_lock_time         | 从系统启动到现在锁定总时间长度         |
| ★Innodb_row_lock_time_avg     | 每次等待所花平均时间                   |
| ★Innodb_row_lock_waits        | 系统启动后到现在总共等待的次数         |
| Innodb_row_lock_current_waits | 当前正在等待锁定的数量                 |
| Innodb_row_lock_time_max      | 从系统启动到现在等待最长的一次所花时间 |

对于这5个状态变量，比较重要的主要是：

`Innodb_row_lock_time_avg（等待平均时长）、Innodb_row_lock_waits（等待总次数）、Innodb_row_lock_time（等待总时长）`

尤其是当等待次数很高，而且每次等待时长也不小的时候，我们就需要分析系统中为什么会有如此多的等待，然后根据分析结果着手制定优化计划。

**查看`INFORMATION_SCHEMA`系统库锁相关数据表**

```sql
-- 查看事务
select * from INFORMATION_SCHEMA.INNODB_TRX;
-- 查看锁
select * from INFORMATION_SCHEMA.INNODB_LOCKS;
-- 查看锁等待
select * from INFORMATION_SCHEMA.INNODB_LOCK_WAITS;

-- 释放锁，trx_mysql_thread_id可以从INNODB_TRX表里查看到
kill trx_mysql_thread_id

-- 查看锁等待详细信息
show engine innodb status\G; 
```

#### 死锁

```sql
set tx_isolation='repeatable-read';

-- Session_1执行
select * from account where id=1 for update;
-- Session_2执行
select * from account where id=2 for update;

-- Session_1执行
select * from account where id=2 for update;
-- Session_2执行
select * from account where id=1 for update;

-- 查看近期死锁日志信息
show engine innodb status\G; 
```

大多数情况mysql可以自动检测死锁并回滚产生死锁的那个事务，但是有些情况mysql没法自动检测死锁

#### 锁优化建议

- 尽可能让所有数据检索都通过索引来完成，避免无索引行锁升级为表锁
- 合理设计索引，尽量缩小锁的范围
- 尽可能减少检索条件范围，避免间隙锁
- 尽量控制事务大小，减少锁定资源量和时间长度，涉及事务加锁的sql尽量放在事务最后执行
- 尽可能低级别事务隔离

### MVCC多版本并发控制

MySQL在可重复读隔离级别下同样的sql查询语句在一个事务里多次执行查询结果相同，就算其它事务对数据有修改也不会影响当前事务sql语句的查询结果。

这个隔离性就是靠**`MVCC(Multi-Version Concurrency Control)`**机制来保证的，对一行数据的读和写两个操作默认是不会通过加锁互斥来保证隔离性，避免了频繁加锁互斥，而在串行化隔离级别为了保证较高的隔离性是通过将所有操作加锁互斥来实现的。

MySQL在读已提交和可重复读隔离级别下都实现了MVCC机制。

**undo日志版本链与`read view`机制**

**undo日志版本链**是指一行数据被多个事务依次修改过后，在每个事务修改完后，MySQL会保留修改前的数据**undo回滚日志**，并且用两个隐藏字段`trx_id`和`roll_pointer`把这些undo日志串联起来形成一个历史记录版本链

![0](./imgs/MySQL/99285.png)

在**可重复读隔离级别**，当事务开启，执行任何查询sql时会生成当前事务的**一致性视图read-view，**该视图在事务结束之前都不会变化(**如果是读已提交隔离级别在每次执行查询sql时都会重新生成**)，这个视图由执行查询时所有未提交事务id数组（数组里最小的id为`min_id`）和已创建的最大事务id（`max_id`）组成，事务里的任何sql查询结果需要从对应版本链里的最新数据开始逐条跟`read-view`做比对从而得到最终的快照结果。

**版本链比对规则：**

1. 如果 row 的 trx_id 落在绿色部分`(trx_id<min_id)`，表示这个版本是已提交的事务生成的，这个数据是可见的；

2. 如果 row 的 trx_id 落在红色部分`(trx_id>max_id)`，表示这个版本是由将来启动的事务生成的，是不可见的(若 row 的 trx_id 就是当前自己的事务是可见的）；

3. 如果 row 的 trx_id 落在黄色部分`(min_id <=trx_id<= max_id)`，那就包括两种情况

   1. 若 row 的 trx_id 在视图数组中，表示这个版本是由还没提交的事务生成的，不可见(若 row 的 trx_id 就是当前自己的事务是可见的)；

   2. 若 row 的 trx_id 不在视图数组中，表示这个版本是已经提交了的事务生成的，可见。

对于删除的情况可以认为是`update`的特殊情况，会将版本链上最新的数据复制一份，然后将trx_id修改成删除操作的trx_id，同时在该条记录的头信息（`record header`）里的（`deleted_flag`）标记位写上true，来表示当前记录已经被删除，在查询时按照上面的规则查到对应的记录如果delete_flag标记位为true，意味着记录已被删除，则不返回数据。

> `begin/start transaction` 命令并不是一个事务的起点，在执行到它们之后的第一个修改操作InnoDB表的语句，事务才真正启动，才会向mysql申请事务id，mysql内部是严格按照事务的启动顺序来分配事务id的。

**实例分析**

![image-20240122111555523](./imgs/MySQL/image-20240122111555523.png)

**总结：**

`MVCC`机制的实现就是通过`read-view`机制与`undo版本链`比对机制，使得不同的事务会根据数据版本链对比规则读取同一条数据在版本链上的不同版本数据。

### Innodb的BufferPool缓存机制

![0](./imgs/MySQL/99001.png)

**为什么Mysql不能直接更新磁盘上的数据而且设置这么一套复杂的机制来执行SQL？**

> 1. 因为来一个请求就直接对磁盘文件进行随机读写，然后更新磁盘文件里的数据性能可能相当差。
>
> 2. 因为磁盘随机读写的性能是非常差的，所以直接更新磁盘文件是不能让数据库抗住很高并发的。

MySQL这套机制看起来复杂，但它可以保证每个更新请求都是**更新内存BufferPool**，然后**顺序写日志文件**，同时还能保证各种异常情况下的数据一致性。

更新内存的性能是极高的，然后顺序写磁盘上的日志文件的性能也是非常高的，要远高于随机读写磁盘文件。

正是通过这套机制，才能让我们的MySQL数据库在较高配置的机器上每秒可以抗下几干甚至上万的读写请求。

## InnoDB 引擎底层存储和缓存原理

`InnoDB` 读取表中数据采取的方式是：将数据划分为若干个页，以页作为磁盘和内存之间交互的基本单位，`InnoDB` 中页的大小一般为 **16KB**。也就是在一般情况下，一次最少从磁盘中读取 16KB 的内容到内存中，一次最少把内存中的 16KB 内容刷新到磁盘中。

### 数据行格式

我们平时是以记录为单位来向表中插入数据的，这些记录在磁盘上的存放方式也被称为行格式或者记录格式。InnoDB 存储引擎设计了4 种不同类型的行格式，分别是 `Compact、Redundant、Dynamic、Compressed`行格式。

```sql
-- 指定行格式
CREATE TABLE 表名 (列的信息) ROW_FORMAT=行格式名称
```

`Compact`行格式：记录头信息，由固定的 5 个字节组成

![image-20240123101443393](./imgs/MySQL/image-20240123101443393.png)

| 字段名            | 长度 | 描述                                                         |
| ----------------- | ---- | ------------------------------------------------------------ |
| delete_mask       | 1b   | 标记该记录是否被删除                                         |
| min_rec_mask      | 1b   | B+树的每层非叶子节点中的最小记录都会添加该标记               |
| n_owned           | 4b   | 表示当前记录拥有的记录数                                     |
| heap_no           | 13b  | 表示当前记录在页的位置信息                                   |
| record_type       | 3b   | 表示当前记录的类型，0表示普通记录，1表示B+树非叶子节点记录，2表示最小记录，3表示最大记录 |
| next_record       | 16b  | 表示下一条记录的相对位置                                     |
| DB_ROW_ID(row_id) | 6B   | 表示行 ID，唯一标识一条记录                                  |
| DB_TRX_ID         | 6B   | 表示事务 ID                                                  |
| DB_ROLL_PTR       | 7B   | 表示回滚指针                                                 |

InnoDB 表对主键的生成策略是

1. 优先使用用户自定义主键作为主键；
2. 如果用户没有定义主键，则选取一个 Unique 键作为主键；
3. 如果表中连 Unique 键都没有定义的话，则 InnoDB 会为表默认添加一个名为 row_id 的隐藏列作为主键。 

`DB_TRX_ID`（也可以称为 trx_id） 和 `DB_ROLL_PTR`（也可以称为 roll_ptr） 这两 个列是必有的，但是 `row_id `是可选的（在没有自定义主键以及 Unique 键的情 况下才会添加该列）。 其他的行格式和 Compact 行格式差别不大。

> `Dynamic` 和 `Compressed` 行格式和 `Compact` 行格式类似，只不过在处理行溢出数据时有所不同。`Compressed` 行格式和 `Dynamic` 不同的一点是，`Compressed` 行格式会采用压缩算法对页面进行压缩，以节省空间。

**数据溢出**

如果一个页存放不了一条记录

- 在 `Compact` 和 `Redundant` 行格式中，对于占用存储空间非常大的列，在记录的真实数据处只会存储该列的该列的前 768 个字节的数据，然后把剩余的数据分散存储在几个其他的页中，记录的真实数据处用 20 个字节存储指向这些页的地址。这个过程也叫做行溢出，存储超出 768 字节的那些页面也被称为溢出页。
- `Dynamic` 和 `Compressed` 行格式，把所有的字节都存储到其他页面中，在记录的真实数据处存储其他页面的地址。

### 索引页格式

 InnoDB 管理存储空间的基本单位是页，一 个页的大小一般是 16KB。

![image-20240123103756125](./imgs/MySQL/image-20240123103756125.png)

| 块类型             | 长度   | 描述                                   |
| ------------------ | ------ | -------------------------------------- |
| File Header        | 38B    | 页的一些通用信息                       |
| Page Header        | 56B    | 数据页专有的一些信息                   |
| Infimum + Supremum | 26B    | 两个虚拟的行记录（最小记录和最大记录） |
| User Records       | 不确定 | 实际存储的行记录内容                   |
| Free Space         | 不确定 | 页中尚未使用的空间                     |
| Page Directory     | 不确定 | 页中的某些记录的相对位置               |
| File Trailer       | 8B     | 校验页是否完整                         |

**User Records**

我们自己存储的记录会按照我们指定的行格式存储到 `User Records` 部分。但是 在一开始生成页的时候，其实并没有 `User Records` 这个部分，每当我们插入一条记录，都会从`Free Space` 部分，也就是尚未使用的存储空间中申请一个记录大小 的空间划分到 `User Records` 部分，当 `Free Space` 部分的空间全部被 `User Records` 部分替代掉之后，也就意味着这个页使用完了，如果还有新的记录插入的话，就需要去申请新的页了。

当前记录被删除时，则会修改记录头信息中的 `delete_mask` 为 1，也就是说被 删除的记录还在页中，还在真实的磁盘上。这些被删除的记录之所以不立即从磁 盘上移除，是因为移除它们之后把其他的记录在磁盘上重新排列需要性能消耗。 所以只是打一个删除标记而已，所有被删除掉的记录都会组成一个所谓的垃圾链表，在这个链表中的记录占用的空间称之为所谓的**可重用空间**，之后如果有新记录插入到表中的话，可能把这些被删除的记录占用的存储空间覆盖掉。

同时我们插入的记录在会记录自己在本页中的位置，写入了记录头信息中`heap_no` 部分。`heap_no` 值为 0 和 1 的记录是 InnoDB 自动给每个页增加的两个记录，称为**伪记录或者虚拟记录**。这两个伪记录一个代表最小记录，一个代表最大记录，这两条存放在页的 `User Records` 部分，他们被单独放在一个称为 `Infimum  + Supremum` 的部分。

我们的记录按照主键从小到大的顺序形成了一个单链表，记录被删除，则从这个链表上摘除。

**Page Directory**

![image-20240123104854014](./imgs/MySQL/image-20240123104854014.png)

`Page Directory` 主要是解决记录链表的查找问题。

1. 将所有正常的记录（包括最大和最小记录，不包括标记为已删除的记录） 划分为几个组。 
2. 每个组的最后一条记录（也就是组内最大的那条记录）的头信息中的 `n_owned` 属性表示该记录拥有多少条记录，也就是该组内共有几条记录。 
3. 将每个组的最后一条记录的地址偏移量单独提取出来按顺序存储到靠近页的尾部的地方，这个地方就是所谓的 `Page Directory`，也就是页目录页面目录中的这些地址偏移量被称为槽（Slot），所以这个页面目录就是由槽组成的。
4. 每个分组中的记录条数是有规定的：对于最小记录所在的分组只能有 1 条 记录，最大记录所在的分组拥有的记录条数只能在 1~8 条之间，剩下的分组中 记录的条数范围只能在是 4~8 条之间。

###  InnoDB的体系结构

![image-20240123105510491](./imgs/MySQL/image-20240123105510491.png)

简化图

![image-20240123105622217](./imgs/MySQL/image-20240123105622217.png)

### InnoDB 的表空间

![image-20240123105809510](./imgs/MySQL/image-20240123105809510.png)



### Doublewrite buffer

双写缓冲区/双写机制是 InnoDB 的三大特性之一，还有两个是 `Buffer Pool`、自适应 Hash 索引。

它是一种特殊文件 `flush` 技术，带给 InnoDB 存储引擎的是数据页的可靠性。

它的作用是：在把页写到数据文件之前，InnoDB 先把它们写到`doublewrite  buffer`（双写缓冲区）的连续区域内，在写 `doublewrite buffer` 完成后，InnoDB 才会把页写到数据文件的适当的位置。如果在写页的过程中发生意外崩溃，InnoDB 在稍后的恢复过程中在 `doublewrite buffer` 中找到完好的 page 副本用于恢复。

在正常的情况下, MySQL 写数据页时，会写两遍到磁盘上，第一遍是写到 `doublewrite buffer`，第二遍是写到真正的数据文件中。如果发生了极端情况（断 电），InnoDB 再次启动后，发现了一个页数据已经损坏，那么此时就可以从 `doublewrite buffer` 中进行数据恢复了。

在数据库异常关闭的情况下启动时，都会做数据库恢复（redo）操作，恢复的过程中，数据库都会检查页面是不是合法（校验等等），如果发现一个页面校验结果不一致，则此时会用到双写这个功能。

### Buffer Pool

InnoDB 为了缓存磁盘中的页，在 MySQL 服务器启动的时候就向操作系统申请了一片连续的内存(`Buffer Pool`)

```sql
-- 查看Buffer Pool大小
show variables like 'innodb_buffer_pool_size';
-- 可通过启动服务时配置conf文件，innodb_buffer_pool_size参数修改Buffer Pool大小

-- 查看Buffer Pool的命中率
show engine innodb status；
```

`Buffer Pool`中默认的缓存页大小和在磁盘上默认的页大小是一样的，都是16KB。

![image-20240123111011316](./imgs/MySQL/image-20240123111011316.png)

对于free 链表中已经没有多余的空闲缓存页的情况，需要把某些旧的缓存页从 `Buffer Pool` 中移除，然后再把新的页放进来

InnoDB 采用**LRU**的策略对缓存页进行替换

InnoDB 把这个 **LRU** 链表按照一定比例分成两截，分别是：

1.  一部分存储使用频率非常高的缓存页，所以这一部分链表也叫做热数据，或 者称 young 区域，褐色部分。 
2. 另一部分存储使用频率不是很高的缓存页，所以这一部分链表也叫做冷数据， 或者称 old 区域，绿色部分，占比37%。

![image-20240123112258867](./imgs/MySQL/image-20240123112258867.png)

**多个 Buffer Pool 实例**

```sql
-- 查看Buffer Pool实例数
show variables like 'innodb_buffer_pool_instances';
-- 可通过启动服务时配置conf文件，innodb_buffer_pool_instances参数修改 Buffer Pool 实例的个数
```

在多线程环境下，访问 `Buffer Pool` 中的各种链表都需要**加锁**处理，在 `Buffer  Pool` 特别大而且多线程并发访问特别高的情况下，单一的 `Buffer Pool `可能会影响请求的处理速度。这个时候可以把它们拆分成若干个小的 `Buffer Pool`，每个 `Buffer Pool` 都称为一个实例，它们都是独立的，独立的去申请内存空间，独立的管理各种链表，所以在多线程并发访问时并不会相互影响，从而提高并发处理能力。

**free 链表的管理**

启动 MySQL 服务器的时候，先向操作系统申请 `Buffer Pool` 的内存空间，然后把它划分成若干对控制块和缓存页。但是此时并没有真实的磁盘页被缓存到 `Buffer Pool` 中（因为还没有用到）， 之后随着程序的运行，会不断的有磁盘上的页被缓存到 `Buffer Pool` 中。

把所有空闲的缓存页对应的控制 块作为一个节点放到一个链表中，这个链表被称作 free 链表。

![image-20240123111307687](./imgs/MySQL/image-20240123111307687.png)

用表空间号 + 页号作为 key，缓存页作为 value 创建一个**哈希表**，用来判断页是否在`Buffer Pool`中。

**flush 链表的管理**

如果我们修改了 `Buffer Pool` 中某个缓存页的数据，那它就和磁盘上的页不一 致了，这样的缓存页也被称为脏页（`dirty page`）。

MySQL对脏页的处理是：每次修改缓存页后，并不会立即把修改同步到磁盘上，而是在未来的某个时间点进行同步。 这个时候需要创建一个存储脏页的链表，凡是修改过的缓存页对应的控制块都会作为一个节点加入到一个链表中。这就是 flush 链表。

![image-20240123111904428](./imgs/MySQL/image-20240123111904428.png)

**刷新脏页到磁盘**

1. 从 LRU 链表的冷数据中刷新一部分页面到磁盘。

`BUF_FLUSH_LRU`：后台线程会定时从 LRU 链表尾部开始扫描一些页面，扫描的页面数量可以通过系统变量 `innodb_lru_scan_depth` 来指定，如果发现脏页，则会把它们刷新到磁盘。

2. 从 flush 链表中刷新一部分页面到磁盘。

`BUF_FLUSH_LIST`：后台线程也会定时从 flush 链表中刷新一部分页面到磁盘，刷新的速率取决于当时系统否繁忙。

`BUF_FLUSH_SINGLE_PAGE`：用户线程在准备加载一个磁盘页到 `Buffer Pool` 时没有可用的缓存页，这时就会尝试看flush 链表尾部有没有可以直接释放掉的未修改页面，如果没有的话会将链表尾部的一个脏页同步刷新到磁盘。

## InnoDB 引擎底层事务的原理

数据库事务的ACID特性如何保证

1. MySQL 中事务的原子性是通过 `undo log` 来实现；
2. 事务的持久性是通过 `redo log` 来实现；
3. 事务的隔离性是通过**读写锁+MVCC**来实现；
4.  事务的一致性通过原子性、隔离性、持久性来保证。

在事务的具体实现机制上，MySQL 采用的是 `WAL（Write-ahead logging，预写式日志）`机制来实现的。

在使用 `WAL` 的系统中，所有的修改都先被写入到日志中，然后再被应用到系 统中。通常包含 `redo` 和 `undo` 两部分信息。

- `redo log `称为重做日志，每当有操作时，在数据变更之前将操作写入 `redo log`， 这样当发生掉电之类的情况时系统可以在重启后继续操作。
- `undo log` 称为撤销日志，当一些变更执行到一半无法完成时，可以根据撤销日志恢复到变更之间的状态。
- MySQL 中用 `redo log`来在系统 Crash 重启之类的情况时修复数据（事 务的持久性），而 `undo log` 来保证事务的原子性。

### redo 日志

想让已经提交了的事务对数据库中数据所做的修改永久生效，即使后来系统崩溃，在重启后也能把这种修改恢复出来。这就需要把修改了哪些东西记录到磁盘中。

比方说某个事务将系统表空间中的第 100 号页面中偏移量为 1000 处的那个字节的值 1 改成 2；

只需要记录一下： 将第 0 号表空间的 100 号页面的偏移量为 1000 处的值更新为 2。

这样在事务提交时，把上述内容刷新到磁盘中，即使之后系统崩溃了， 重启之后只要按照上述内容所记录的步骤重新更新一下数据页，那么该事务对数据库中所做的修改又可以被恢复出来，也就意味着满足持久性的要求。因为在系统崩溃重启时需要按照上述内容所记录的步骤重新更新数据页，所以上述内容也被称之为**重做日志**(`redo log`) 。

与在事务提交时将所有修改过的内存中的页面刷新到磁盘中相比，只将该事务执行过程中产生的 redo 日志刷新到磁盘的好处如下：

1. redo 日志占用的空间非常小 存储表空间 ID、页号、偏移量以及需要更新的值所需的存储空间是很小的。 
2. redo 日志是顺序写入磁盘的 在执行事务的过程中，每执行一条语句，就可能产生若干条 redo 日志，这些 日志是按照产生的顺序写入磁盘的，也就是使用顺序 IO。

**redo 日志格式**

![image-20240123150344630](./imgs/MySQL/image-20240123150344630.png)

type：该条 redo 日志的类型，redo 日志设计大约有 53 种不同的类型日志。 

space ID：表空间 ID。

page number：页号。

data：该条 redo 日志的具体内容。

**redo 日志的写入过程**

InnoDB 为了更好的进行系统崩溃恢复，把 redo 日志都放在了大小为 512 字节 的块（block）中。 前边说过，为了解决磁盘速度过慢的问题而引入了 `Buffer Pool`。同理，写 入 redo 日志时也不能直接直接写到磁盘上，实际上在服务器启动时就向操作系统申请了一大片称之为 `redo log buffer` 的连续内存空间。这片内存空间被划分成若干个连续的 `redo log block`，我们可以通过启动参数 `innodb_log_buffer_size` 来指定 `log buffer` 的大小，该启动参数的默认值为 **16MB**。 向`log buffer`中写入redo日志的过程是顺序的，也就是先往前边的block中写， 当该 block 的空闲空间用完之后再往下一个 block 中写。

**redo 日志刷盘时机**

在一些情况下`log buffer`会被刷新到磁盘里

1. `log buffer` 空间不足时，`log buffer` 的大小是有限的（通过系统变量 `innodb_log_buffer_size` 指定），如果不停的往这个有限大小的 `log buffer` 里塞入日志，很快它就会被填满。InnoDB 认为如果当前写入 `log buffer` 的` redo `日志量已经占满了 `log buffer` 总容量的大约**一半左右**，就需要把这些日志刷新到磁盘上。
2. 在事务提交时可以不把修改过的 `Buffer Pool` 页面刷新到磁盘， 但是为了保证持久性，必须要把修改这些页面对应的 `redo` 日志刷新到磁盘。
3. 后台有一个线程，大约每秒都会刷新一次 `log buffer` 中的 `redo` 日志到磁盘。
4. 正常关闭服务器时等等。

### undo 日志

事务需要保证原子性：事务中的操作要么全部完成，要么什 么也不做。但是偏偏有时候事务执行到一半会出现一些情况，比如：

- 情况一：事务执行过程中可能遇到各种错误，比如服务器本身的错误，操作系统错误，甚至是突然断电导致的错误。
- 情况二：程序员可以在事务执行过程中手动输入 `ROLLBACK` 语句结束当前的务的执行。

这两种情况都会导致事务执行到一半就结束，但是事务执行过程中可能已经修改了很多东西，为了保证事务的原子性，需要把东西改回原先的样子，这个过程就称之为**回滚**。

为了回滚而记录的这些东西称之为**撤销日志**(`undo log`)

**事务 id 生成机制**

这个事务 id 本质上就是一个数字，它的分配策略和我们前边提到的对隐藏列 `row_id`（当用户没有为表创建主键和 UNIQUE 键时 InnoDB 自动创建的列）的分配策略大抵相同，具体策略如下： 

1. 服务器会在内存中维护一个全局变量，每当需要为某个事务分配一个事务 id 时，就会把该变量的值当作事务 id 分配给该事务，并且把该变量自增 1。
2. 每当这个变量的值为 **256 的倍数**时，就会将该变量的值刷新到系统表空间的页号为 5 的页面中一个称之为 `Max Trx ID` 的属性处，这个属性占用 8 个字节的存储空间。 当系统下一次重新启动时，会将上边提到的 `Max Trx ID `属性加载到内存中，将该值加上 `256` 之后赋值给我们前边提到的全局变量（因为在上次关机时该全局变量的值可能大于 `Max Trx ID` 属性值）。

这样就可以保证整个系统中分配的事务 id 值是一个递增的数字。先被分配 id 的事务得到的是较小的事务 id，后被分配 id 的事务得到的是较大的事务 id。

**undo 日志的格式**

为了实现事务的原子性，InnoDB 存储引擎在实际进行增、删、改一条记录时， 都需要先把对应的 `undo` 日志记下来。一般每对一条记录做一次改动，就对应着 1 条 `undo` 日志，但在某些更新记录的操作中，也可能会对应着 2 条 `undo` 日志。



### 事务的流程

事务流程分为事务的**执行流程**和**事务恢复流程**。

- **事务执行**

MySQL 的事务主要主要是通过 `Redo Log` 和 `Undo Log` 实现的。 MySQL 事务执行流程如下图

![image-20240123152901105](./imgs/MySQL/image-20240123152901105.png)

可以看出，MySQL 在事务执行的过程中，会记录相应 SQL 语句的 `UndoLog` 和 `Redo Log`，然后在内存中更新数据并形成数据脏页。接下来 `RedoLog` 会根据一定规则触发刷盘操作，`Undo Log` 和数据脏页则通过刷盘机制刷盘。事务提交时， 会将当前事务相关的所有 `Redo Log` 刷盘，只有当前事务相关的所有 `Redo Log` 刷 盘成功，事务才算提交成功。

- **事务恢复**

如果一切正常，则 MySQL 事务会按照上图中的顺序执行。如果 MySQL 由于某种原因崩溃或者宕机，当然进行数据的恢复或者回滚操作。 如果事务在执行第 8 步,即事务提交之前，MySQL 崩溃或者宕机，此时会先使用 `Redo Log` 恢复数据，然后使用 `Undo Log` 回滚数据。 如果在执行第8步之后MySQL崩溃或者宕机，此时会使用`Redo Log`恢复数据， 大体流程如下图所示。

![image-20240123152930717](./imgs/MySQL/image-20240123152930717.png)

很明显，MySQL 崩溃恢复后，首先会获取日志检查点信息，随后根据日志检查点信息使用 `Redo Log` 进行恢复。MySQL 崩溃或者宕机时事务未提交，则接下来使用 `Undo Log` 回滚数据。如果在 MySQL 崩溃或者宕机时事务已经提交，则用 `Redo Log` 恢复数据即可。

**崩溃后的恢复为什么不用 `binlog`？**

1. 这两者使用方式不一样` binlog `会记录表所有更改操作，包括更新删除数据，更改表结构等等，主要用于人工恢复数据，而 `redo log` 对于我们是不可见的，它是 InnoDB 用于保证 `crash-safe` 能力的，也就是在事务提交后 MySQL 崩溃的话，可以保证事务的持久性，即事务提交后其更改是永久性的。 一句话概括：`binlog` 是用作人工恢复数据，`redo log` 是 MySQL 自己使用，用于保证在数据库崩溃时的事务持久性。
2. `redo log` 是 InnoDB 引擎特有的，`binlog` 是 MySQL 的 `Server` 层实现的, 所有引擎都可以使用。
3. `redo log` 是**物理日志**，记录的是“在某个数据页上做了什么修改”，恢复的速度更快；`binlog` 是**逻辑日志**，记录的是这个语句的原始逻辑，比如“给 ID=2 这的 c 字段加 1 ” ；
4. `redo log` 是**循环写**的日志文件，`redo log` 只会记录未刷盘的日志，已经刷入磁盘的数据都会从 `redo log` 这个有限大小的日志文件里删除。`binlog` 是**追加日志**，保存的是**全量**的日志。
5. 最重要的是，当数据库 `crash` 后，想要恢复未刷盘但已经写入 `redo log` 和 `binlog` 的数据到内存时，`binlog` 是无法恢复的。虽然 `binlog` 拥有全量的日志， 但没有一个标志让 InnoDB 判断哪些数据已经入表(写入磁盘)，哪些数据还没有。

### Redo 日志和 Undo 日志的关系

数据库崩溃重启后，需要先从 `redo log` 中把未落盘的脏页数据恢复回来，重新写入磁盘，保证用户的数据不丢失。当然，在崩溃恢复中还需要把未提交的事务进行回滚操作。由于回滚操作需要 `undo log` 日志支持，`undo log` 日志的完整性和可靠性需要 `redo log` 日志来保证，所以数据库崩溃需要先做 `redo log` 数据恢复， 然后做 `undo log` 回滚。

在事务执行过程中，除了记录 `redo` 一些记录，还会记录 `undo log` 日志。`Undo  log` 记录了数据每个操作前的状态，如果事务执行过程中需要回滚，就可以根据 `undo log` 进行回滚操作。

因为 `redo log` 是物理日志，记录的是数据库页的物理修改操作。所以 `undo log` （可以看成数据库的数据）的写入也会伴随着 `redo log` 的产生，这是因为 `undo log` 也需要持久化的保护。

事务进行过程中，每次 sql 语句执行，都会记录 `undo log` 和 `redo log`，然后更新数据形成脏页。事务执行 `COMMIT` 操作时，会将本事务相关的所有 `redo log` 进行落盘，只有所有的 `redo log` 落盘成功，才算 `COMMIT` 成功。然后内存中的 `undo log` 和脏页按照同样的规则进行落盘。如果此时发生崩溃，则只使用 `redo log` 恢复数据。