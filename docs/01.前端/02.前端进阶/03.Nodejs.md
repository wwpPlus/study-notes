---
title: Nodejs
date: 2023-11-16 17:26:40
permalink: /pages/8b6af1/
---
# Nodejs

Node.js 是运行在服务端的 JavaScript。

Node.js 是一个基于 Chrome JavaScript 运行时建立的一个平台。

Node.js 是一个事件驱动 I/O 服务端 JavaScript 环境，基于 Google 的 V8 引擎，V8 引擎执行 Javascript 的速度非常快，性能非常好。

## Nodejs的组成部分

1. 引入 required 模块。

2. 创建服务器：服务器可以监听客户端的请求，类似于 Apache 、Nginx 等 HTTP 服务器。

3. 接收请求与响应请求 服务器很容易创建，客户端可以使用浏览器或终端发送 HTTP 请求，服务器接收请求后返回响应数据。

4. Node 自带了交互式解释器，REPL

```js
var http = require('http');
http.createServer(function (request, response) {
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.end('Hello World\n');
}).listen(8888);
console.log('Server running at http://127.0.0.1:8888/');
```

## NPM使用介绍

NPM是随同NodeJS一起安装的包管理工具，能解决NodeJS代码部署上的很多问题，常见的使用场景有以下几种：

- 允许用户从NPM服务器下载别人编写的第三方包到本地使用。
- 允许用户从NPM服务器下载并安装别人编写的命令行程序到本地使用。
- 允许用户将自己编写的包或命令行程序上传到NPM服务器供别人使用。

express 包就放在了工程目录下的 node_modules 目录中，因此在代码中只需要通过 require('express') 的方式就好，无需指定第三方包路径。

### 本地安装

1. 将安装包放在 ./node_modules 下（运行 npm 命令时所在的目录），如果没有 node_modules 目录，会在当前执行 npm 命令的目录下生成 node_modules 目录。
2. 可以通过 `require()` 来引入本地安装的包。

### 全局安装

1. 将安装包放在 /usr/local 下或者你 node 的安装目录。
2. 可以直接在命令行里使用。

## 回调函数

Node.js 异步编程的直接体现就是回调。

Node.js 几乎每一个 API 都是支持回调函数的。

```js
// 阻塞
var fs = require("fs");
var data = fs.readFileSync('input.txt');
console.log(data.toString());
console.log("程序执行结束!");   // 后输出
// 非阻塞
var fs = require("fs");
fs.readFile('input.txt', function (err, data) {
    if (err) return console.error(err);
    console.log(data.toString());
});
console.log("程序执行结束!");   // 先输出
```

## 事件循环

Node.js 是单进程单线程应用程序，但是因为 V8 引擎提供的异步执行回调接口，通过这些接口可以处理大量的并发，所以性能非常高。

Node.js 基本上所有的事件机制都是用设计模式中观察者模式实现。

Node.js 单线程类似进入一个while(true)的事件循环，直到没有事件观察者退出，每个异步事件都生成一个事件观察者，如果有事件发生就调用该回调函数.

### 事件驱动程序

Node.js 使用事件驱动模型，当web server接收到请求，就把它关闭然后进行处理，然后去服务下一个web请求。

当这个请求完成，它被放回处理队列，当到达队列开头，这个结果被返回给用户。

这个模型非常高效可扩展性非常强，因为 webserver 一直接受请求而不等待任何读写操作。（这也称之为非阻塞式IO或者事件驱动IO）

在事件驱动模型中，会生成一个主循环来监听事件，当检测到事件时触发回调函数。

![事件驱动程序](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/nodejs/%E4%BA%8B%E4%BB%B6%E9%A9%B1%E5%8A%A8%E7%A8%8B%E5%BA%8F.jpg)


整个事件驱动的流程就是这么实现的，非常简洁。有点类似于观察者模式，事件相当于一个主题(Subject)，而所有注册到这个事件上的处理函数相当于观察者(Observer)。

Node.js 有多个内置的事件，我们可以通过引入 events 模块，并通过实例化 EventEmitter 类来绑定和监听事件，如下实例：

```js
// 引入 events 模块
var events = require('events');
// 创建 eventEmitter 对象
var eventEmitter = new events.EventEmitter();
// 创建事件处理程序
var connectHandler = function connected() {
   console.log('连接成功。'); 
   // 触发 data_received 事件 
   eventEmitter.emit('data_received');
}
// 绑定 connection 事件处理程序
eventEmitter.on('connection', connectHandler);
// 使用匿名函数绑定 data_received 事件
eventEmitter.on('data_received', function(){
   console.log('数据接收成功。');
});
// 触发 connection 事件 
eventEmitter.emit('connection');
console.log("程序执行完毕。");
// node main.js
// 连接成功。
// 数据接收成功。
// 程序执行完毕。
```

> 在 Node 应用程序中，执行异步操作的函数将回调函数作为最后一个参数， 回调函数接收错误对象作为第一个参数。

### EventEmitter

Node.js 所有的异步 I/O 操作在完成时都会发送一个事件到事件队列。

Node.js 里面的许多对象都会分发事件，所有这些产生事件的对象都是 events.EventEmitter 的实例。

events 模块只提供了一个对象： events.EventEmitter。EventEmitter 的核心就是事件触发与事件监听器功能的封装。

| 方法                               | 描述                                                                                                                           |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| addListener(event, listener)       | 为指定事件添加一个监听器到监听器数组的尾部。                                                                                   |
| on(event, listener)                | 为指定事件注册一个监听器，接受一个字符串 event 和一个回调函数。                                                                |
| once(event, listener)              | 为指定事件注册一个单次监听器，即 监听器最多只会触发一次，触发后立刻解除该监听器。                                              |
| removeListener(event, listener)    | 移除指定事件的某个监听器，监听器必须是该事件已经注册过的监听器。它接受两个参数，第一个是事件名称，第二个是回调函数名称。       |
| removeAllListeners([event])        | 移除所有事件的所有监听器， 如果指定事件，则移除指定事件的所有监听器。                                                          |
| setMaxListeners(n)                 | 默认情况下， EventEmitters 如果你添加的监听器超过 10 个就会输出警告信息。 setMaxListeners 函数用于改变监听器的默认限制的数量。 |
| listeners(event)                   | 返回指定事件的监听器数组。                                                                                                     |
| emit(event, [arg1], [arg2], [...]) | 按监听器的顺序执行执行每个监听器，如果事件有注册监听返回 true，否则返回 false。                                                |
| listenerCount(emitter, event)      | 类方法，返回指定事件的监听器数量。                                                                                             |

以下实例通过 connection（连接）事件演示了 EventEmitter 类的应用。
main.js

```js
var events = require('events');
var eventEmitter = new events.EventEmitter();

// 监听器 #1
var listener1 = function listener1() {
   console.log('监听器 listener1 执行。');
}

// 监听器 #2
var listener2 = function listener2() {
  console.log('监听器 listener2 执行。');
}

// 绑定 connection 事件，处理函数为 listener1 
eventEmitter.addListener('connection', listener1);

// 绑定 connection 事件，处理函数为 listener2
eventEmitter.on('connection', listener2);

var eventListeners = eventEmitter.listenerCount('connection');
console.log(eventListeners + " 个监听器监听连接事件。");

// 处理 connection 事件 
eventEmitter.emit('connection');

// 移除监绑定的 listener1 函数
eventEmitter.removeListener('connection', listener1);
console.log("listener1 不再受监听。");

// 触发连接事件
eventEmitter.emit('connection');

eventListeners = eventEmitter.listenerCount('connection');
console.log(eventListeners + " 个监听器监听连接事件。");

console.log("程序执行完毕。");

// 执行结果
// node main.js
// 2 个监听器监听连接事件。
// 监听器 listener1 执行。
// 监听器 listener2 执行。
// listener1 不再受监听。
// 监听器 listener2 执行。
// 1 个监听器监听连接事件。
// 程序执行完毕。
```

## Buffer

JavaScript 语言自身只有字符串数据类型，没有二进制数据类型。

但在处理像TCP流或文件流时，必须使用到二进制数据。因此在 Node.js中，定义了一个 Buffer 类，该类用来创建一个专门存放二进制数据的缓存区。

| 方法                                                              | 描述                                                                                                  |
| ----------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| Buffer.from(array)                                                | 返回一个被 array 的值初始化的新的 Buffer 实例（传入的 array 的元素只能是数字，不然就会自动被 0 覆盖） |
| Buffer.from(arrayBuffer[, byteOffset[, length]])                  | 返回一个新建的与给定的 ArrayBuffer 共享同一内存的 Buffer。                                            |
| Buffer.from(buffer)                                               | 复制传入的 Buffer 实例的数据，并返回一个新的 Buffer 实例                                              |
| Buffer.from(string[, encoding])                                   | 返回一个被 string 的值初始化的新的 Buffer 实例                                                        |
| buf.write(string[, offset[, length]][, encoding])                 | 写入缓冲区                                                                                            |
| buf.toString([encoding[, start[, end]]])                          | 从缓冲区读取数据                                                                                      |
| buf.toJSON()Buffer                                                | 转换为 JSON 对象                                                                                      |
| Buffer.concat(list[, totalLength])                                | 缓冲区合并,totalLength：指定合并后Buffer对象的总长度。                                                |
| buf.compare(otherBuffer)                                          | 缓冲区比较                                                                                            |
| buf.copy(targetBuffer[, targetStart[, sourceStart[, sourceEnd]]]) | 缓冲区拷贝                                                                                            |
| buf.slice([start[, end]])                                         | 缓冲区裁剪                                                                                            |

```js
// 创建一个长度为 10、且用 0 填充的 Buffer。
const buf1 = Buffer.alloc(10);

// 创建一个长度为 10、且用 0x1 填充的 Buffer。 
const buf2 = Buffer.alloc(10, 1);

// 创建一个长度为 10、且未初始化的 Buffer。
// 这个方法比调用 Buffer.alloc() 更快，
// 但返回的 Buffer 实例可能包含旧数据，
// 因此需要使用 fill() 或 write() 重写。
const buf3 = Buffer.allocUnsafe(10);

// 创建一个包含 [0x1, 0x2, 0x3] 的 Buffer。
const buf4 = Buffer.from([1, 2, 3]);

// 创建一个包含 UTF-8 字节 [0x74, 0xc3, 0xa9, 0x73, 0x74] 的 Buffer。
const buf5 = Buffer.from('tést');

// 创建一个包含 Latin-1 字节 [0x74, 0xe9, 0x73, 0x74] 的 Buffer。
const buf6 = Buffer.from('tést', 'latin1');
```

## Stream(流)

- 从流中读取数据
- 写入流
- 管道流：管道提供了一个输出流到输入流的机制。通常用于从一个流中获取数据并将数据传递到另外一个流中。
- 链式流：链式是通过连接输出流到另外一个流并创建多个流操作链的机制。链式流一般用于管道操作

```js
var fs = require("fs");
// 读取input.txt中内容写入到output.txt
function remove_file_content(){
    var data = '';

    // 创建可读流
    var readerStream = fs.createReadStream('input.txt');
    // 设置编码为 utf8。
    readerStream.setEncoding('UTF8');
    // 处理流事件 --> data, end, and error
    readerStream.on('data', function(chunk) {
    data += chunk;
    });
    readerStream.on('end',function(){
    console.log(data);
    });
    readerStream.on('error', function(err){
    console.log(err.stack);
    });

    // 创建一个可以写入的流，写入到文件 output.txt 中
    var writerStream = fs.createWriteStream('output.txt');
    // 使用 utf8 编码写入数据
    writerStream.write(data,'UTF8');
    // 标记文件末尾
    writerStream.end();
    // 处理流事件 --> finish、error
    writerStream.on('finish', function() {
        console.log("写入完成。");
    });

    // 管道流：以上过程可以简化
    // 创建一个可读流
    var readerStream = fs.createReadStream('input.txt');
    // 创建一个可写流
    var writerStream = fs.createWriteStream('output.txt');
    // 管道读写操作
    // 读取 input.txt 文件内容，并将内容写入到 output.txt 文件中
    readerStream.pipe(writerStream);

    console.log("程序执行完毕");
}

// 解压缩文件
var zlib = require('zlib');
function compress () {
    // 压缩 input.txt 文件为 input.txt.gz
    fs.createReadStream('input.txt')
        .pipe(zlib.createGzip())
        .pipe(fs.createWriteStream('input.txt.gz'));
    console.log("文件压缩完成。");
}

function decompress () {
    // 解压 input.txt.gz 文件为 input.txt
    fs.createReadStream('input.txt.gz')
        .pipe(zlib.createGunzip())
        .pipe(fs.createWriteStream('input.txt'));
    console.log("文件解压完成。");
}
```

## 模块系统

Node.js 中存在 4 类模块（原生模块和3种文件模块）

Node.js 提供了 exports 和 require 两个对象，其中 exports 是模块公开的接口，require 用于从外部获取一个模块的接口，即所获取模块的 exports 对象。

```js
// 成员函数封装到模块中
exports.world = function() {
  console.log('Hello World');
}

// 把一个对象封装到模块中
//hello.js 
function Hello() { 
    var name; 
    this.setName = function(thyName) { 
        name = thyName; 
    }; 
    this.sayHello = function() { 
        console.log('Hello ' + name); 
    }; 
}; 
module.exports = Hello;

//main.js
var hello1 = require('./hello1');
hello1.world();
var Hello = require('./hello2'); 
hello2 = new Hello(); 
hello2.setName('BYVoid'); 
hello2.sayHello(); 
```

> exports 和 module.exports 的使用
> 如果要对外暴露属性或方法，就用 exports 就行，要暴露对象(类似class，包含了很多属性和方法)，就用 module.exports。

### 加载模块的过程

![nodejs加载模块的过程](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/nodejs/nodejs加载模块的过程.jpg)

**加载模块的优先级**

优先从文件模块的缓存中加载已经存在的模块 -> 检查模块是否在原生模块列表中 -> 从文件系统中加载实际的文件

### require方法

参数

- http、fs、path等，原生模块。
- ./mod或../mod，相对路径的文件模块。
- /pathtomodule/mod，绝对路径的文件模块。
- mod，非原生模块的文件模块。

在路径 Y 下执行 require(X) 语句执行顺序：

```
1. 如果 X 是内置模块
   a. 返回内置模块
   b. 停止执行
2. 如果 X 以 '/' 开头
   a. 设置 Y 为文件根路径
3. 如果 X 以 './' 或 '/' or '../' 开头
   a. LOAD_AS_FILE(Y + X)
   b. LOAD_AS_DIRECTORY(Y + X)
4. LOAD_NODE_MODULES(X, dirname(Y))
5. 抛出异常 "not found"

LOAD_AS_FILE(X)
1. 如果 X 是一个文件, 将 X 作为 JavaScript 文本载入并停止执行。
2. 如果 X.js 是一个文件, 将 X.js 作为 JavaScript 文本载入并停止执行。
3. 如果 X.json 是一个文件, 解析 X.json 为 JavaScript 对象并停止执行。
4. 如果 X.node 是一个文件, 将 X.node 作为二进制插件载入并停止执行。

LOAD_INDEX(X)
1. 如果 X/index.js 是一个文件,  将 X/index.js 作为 JavaScript 文本载入并停止执行。
2. 如果 X/index.json 是一个文件, 解析 X/index.json 为 JavaScript 对象并停止执行。
3. 如果 X/index.node 是一个文件,  将 X/index.node 作为二进制插件载入并停止执行。

LOAD_AS_DIRECTORY(X)
1. 如果 X/package.json 是一个文件,
   a. 解析 X/package.json, 并查找 "main" 字段。
   b. let M = X + (json main 字段)
   c. LOAD_AS_FILE(M)
   d. LOAD_INDEX(M)
2. LOAD_INDEX(X)

LOAD_NODE_MODULES(X, START)
1. let DIRS=NODE_MODULES_PATHS(START)
2. for each DIR in DIRS:
   a. LOAD_AS_FILE(DIR/X)
   b. LOAD_AS_DIRECTORY(DIR/X)

NODE_MODULES_PATHS(START)
1. let PARTS = path split(START)
2. let I = count of PARTS - 1
3. let DIRS = []
4. while I >= 0,
   a. if PARTS[I] = "node_modules" CONTINUE
   b. DIR = path join(PARTS[0 .. I] + "node_modules")
   c. DIRS = DIRS + DIR
   d. let I = I - 1
5. return DIRS
```

## 路由

需要的数据都会包含在request对象中，该对象作为哦那Request()回调函数的第一个参数传递，为了解析这些数据，需要额外引入url和querystring模块

```js
// server.js
var http = require("http");
var url = require("url");
 
function start(route) {
  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");
 
    route(pathname);
 
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Hello World");
    response.end();
  }
 
  http.createServer(onRequest).listen(8888);
  console.log("Server has started.");
}
exports.start = start;


// router.js
function route(pathname) {
  console.log("About to route a request for " + pathname);
}
exports.route = route;

// index.js
var server = require("./server");
var router = require("./router");
server.start(router.route);
```

## 全局对象

Node.js 中的全局对象是 global

| 名称                | 描述                                       |
| ------------------- | ------------------------------------------ |
| __filename          | 当前正在执行的脚本的文件绝对路径           |
| __dirname           | 当前执行脚本所在的目录                     |
| setTimeout(cb, ms)  | 指定的毫秒(ms)数后执行指定函数(cb)         |
| clearTimeout(t)     | 停止一个之前通过 setTimeout() 创建的定时器 |
| setInterval(cb, ms) | 在指定的毫秒(ms)数后执行指定函数(cb)       |
| console             | 用于提供控制台标准输出                     |
| process             | 用于描述当前Node.js 进程状态的对象         |

## 常用工具

### util模块

util 是一个Node.js 核心模块，提供常用函数的集合

| 方法                                               | 描述                                                                                   |
| -------------------------------------------------- | -------------------------------------------------------------------------------------- |
| util.callbackify(original)                         | 将 async 异步函数（或者一个返回值为 Promise 的函数）转换成遵循异常优先的回调风格的函数 |
| util.inherits(constructor, superConstructor)       | 是一个实现对象间原型继承的函数。                                                       |
| util.inspect(object,[showHidden],[depth],[colors]) | 是一个将任意对象转换 为字符串的方法，通常用于调试和错误输出。                          |
| util.isArray(object)                               | 判断 object 是否是一个数组                                                             |
| util.isRegExp(object)                              | 判断 object 是否是一个正则表达式                                                       |
| util.isDate(object)                                | 判断 object 是否是一个日期                                                             |

### 其他模块

| 模块   | 功能                                                      |
| ------ | --------------------------------------------------------- |
| os     | 提供基本的系统操作函数。                                  |
| path   | 提供了处理和转换文件路径的工具。                          |
| net    | 用于底层的网络通信。提供了服务端和客户端的的操作。        |
| dns    | 用于解析域名。                                            |
| domain | 简化异步代码的异常处理，可以捕捉处理try catch无法捕捉的。 |


## GET/POST请求

get请求

```js
var http = require('http');
var url = require('url');
var util = require('util');
 
http.createServer(function(req, res){
    res.writeHead(200, {'Content-Type': 'text/plain'});
    // 解析 url 参数
    var params = url.parse(req.url, true).query;
    res.write("网站名：" + params.name);
    res.write("\n");
    res.write("网站 URL：" + params.url);
    res.end();
}).listen(3000);
```

post请求

```js
var http = require('http');
var querystring = require('querystring');
 
var postHTML = 
  '<html><head><meta charset="utf-8"><title>Node.js 实例</title></head>' +
  '<body>' +
  '<form method="post">' +
  '网站名： <input name="name"><br>' +
  '网站 URL： <input name="url"><br>' +
  '<input type="submit">' +
  '</form>' +
  '</body></html>';
 
http.createServer(function (req, res) {
  var body = "";
  req.on('data', function (chunk) {
    body += chunk;
  });
  req.on('end', function () {
    // 解析参数
    body = querystring.parse(body);
    // 设置响应头部信息及编码
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
    if(body.name && body.url) { // 输出提交的数据
        res.write("网站名：" + body.name);
        res.write("<br>");
        res.write("网站 URL：" + body.url);
    } else {  // 输出表单
        res.write(postHTML);
    }
    res.end();
  });
}).listen(3000);
```

## Express 框架

### Express 应用

Express 框架核心特性：

- 可以设置中间件来响应 HTTP 请求。
- 定义了路由表用于执行不同的 HTTP 请求动作。
- 可以通过向模板传递参数来动态渲染 HTML 页面。

安装 Express：`npm install express --save`

以下几个重要的模块是需要与 express 框架一起安装的：

- body-parser：node.js 中间件，用于处理 JSON, Raw, Text 和 URL 编码的数据。
- cookie-parser：这就是一个解析Cookie的工具。通过req.cookies可以取到传过来的cookie，并把它们转成对象。
- multer：node.js 中间件，用于处理 enctype="multipart/form-data"（设置表单的MIME编码）的表单数据。

示例

```js
var express = require('express');
var app = express();

//  主页输出 "Hello World"
app.get('/', function (req, res) {
   console.log("主页 GET 请求");
   res.send('Hello GET');
})

//  POST 请求
app.post('/', function (req, res) {
   console.log("主页 POST 请求");
   res.send('Hello POST');
})

//  /del_user 页面响应
app.get('/del_user', function (req, res) {
   console.log("/del_user 响应 DELETE 请求");
   res.send('删除页面');
})

//  /list_user 页面 GET 请求
app.get('/list_user', function (req, res) {
   console.log("/list_user GET 请求");
   res.send('用户列表页面');
})

// 对页面 abcd, abxcd, ab123cd, 等响应 GET 请求
app.get('/ab*cd', function(req, res) {   
   console.log("/ab*cd GET 请求");
   res.send('正则匹配');
})

var server = app.listen(8081, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
})
```

### 请求和响应

request 对象常用属性

1. req.app：当callback为外部文件时，用req.app访问express的实例
1. req.baseUrl：获取路由当前安装的URL路径
1. req.body / req.cookies：获得「请求主体」/ Cookies
1. req.fresh / req.stale：判断请求是否还「新鲜」
1. req.hostname / req.ip：获取主机名和IP地址
1. req.originalUrl：获取原始请求URL
1. req.params：获取路由的parameters
1. req.path：获取请求路径
1. req.protocol：获取协议类型
1. req.query：获取URL的查询参数串
1. req.route：获取当前匹配的路由
1. req.subdomains：获取子域名
1. req.accepts()：检查可接受的请求的文档类型
1. req.acceptsCharsets / req.acceptsEncodings / req.acceptsLanguages：返回指定字符集的第一个可接受字符编码
1. req.get()：获取指定的HTTP请求头
1. req.is()：判断请求头Content-Type的MIME类型

response 对象常用属性

1. res.app：同req.app一样
1. res.append()：追加指定HTTP头
1. res.set()在res.append()后将重置之前设置的头
1. res.cookie(name，value [，option])：设置Cookie
1. opition: domain / expires / httpOnly / maxAge / path / secure / signed
1. res.clearCookie()：清除Cookie
1. res.download()：传送指定路径的文件
1. res.get()：返回指定的HTTP头
1. res.json()：传送JSON响应
1. res.jsonp()：传送JSONP响应
1. res.location()：只设置响应的Location HTTP头，不设置状态码或者close response
1. res.redirect()：设置响应的Location HTTP头，并且设置状态码302
1. res.render(view,[locals],callback)：渲染一个view，同时向callback传递渲染后的字符串，如果在渲染过程中有错误发生next(err)将会被自动调用。callback将会被传入一个可能发生的错误以及渲染后的页面，这样就不会自动输出了。
1. res.send()：传送HTTP响应
1. res.sendFile(path [，options] [，fn])：传送指定路径的文件 -会自动根据文件extension设定Content-Type
1. res.set()：设置HTTP头，传入object可以一次设置多个头
1. res.status()：设置HTTP状态码
1. res.type()：设置Content-Type的MIME类型

### 静态文件

Express 提供了内置的中间件 express.static 来设置静态文件

如果将图片， CSS, JavaScript 文件放在 public 目录下
通过 `app.use('/public', express.static('public'));
` 访问目录下的文件

访问` http://127.0.0.1:8081/public/images/logo.png` 可以看到public下的静态文件图片

```js
var express = require('express');
var app = express();

app.use('/public', express.static('public'));
 
app.get('/', function (req, res) {
   res.send('Hello World');
})

var server = app.listen(8081, function () {
 
  var host = server.address().address
  var port = server.address().port
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
 
})
```

### 文件上传


index.html：创建一个用于上传文件的表单，使用 POST 方法，表单 enctype 属性设置为 multipart/form-data

```html
<html>
<head>
    <title>文件上传表单</title>
</head>
<body>
    <h3>文件上传：</h3>
    选择一个文件上传: <br />
    <form action="/file_upload" method="post" enctype="multipart/form-data">
        <input type="file" name="image" size="50" />
        <br />
        <input type="submit" value="上传文件" />
    </form>
</body>
</html>
```

server.js：用于接收来自前端页面的文件上传请求，保存上传的文件，并返回上传成功信息。

1. 引入body-parser中间件和multer模块，用于解析post请求传输的表单数据（包括文件）。
2. 在 `'/public'` 下提供静态资源服务，指定body-parser的解析方式，以及multer接收文件的存储路径和上传文件的字段名。
3. 当发起POST请求访问 `/file_upload` 时，将文件保存到同级目录中，并返回一个JSON对象表示上传成功信息。

```js
var express = require('express');
var app = express();
var fs = require("fs");

var bodyParser = require('body-parser');
var multer  = require('multer');

app.use('/public', express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({ dest: '/tmp/'}).array('image'));

app.get('/index.html', function (req, res) {
   res.sendFile( __dirname + "/" + "index.html" );
})

app.post('/file_upload', function (req, res) {
   console.log(req.files[0]);  // 上传的文件信息
   var des_file = __dirname + "/" + req.files[0].originalname;
   fs.readFile( req.files[0].path, function (err, data) {
        fs.writeFile(des_file, data, function (err) {
         if( err ){
              console.log( err );
         }else{
               response = {
                   message:'File uploaded successfully', 
                   filename:req.files[0].originalname
              };
          }
          console.log( response );
          res.end( JSON.stringify( response ) );
       });
   });
})
var server = app.listen(8081, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
 
})
```

### cookie 管理

使用中间件向 Node.js 服务器发送 cookie 信息

```js
// express_cookie.js 文件
var express = require('express')
var cookieParser = require('cookie-parser')
var util = require('util');
 
var app = express()
app.use(cookieParser())
 
app.get('/', function(req, res) {
    console.log("Cookies: " + util.inspect(req.cookies));
})
 
app.listen(8081)
```

## RESTful API

REST即表述性状态传递（英文：Representational State Transfer，简称REST）是一种软件架构风格。

HTTP 方法，REST 基本架构的四个方法：GET、PUT、DELETE、POST

示例

| URI        | HTTP 方法 | 发送内容    | 结果             |
| ---------- | --------- | ----------- | ---------------- |
| listUsers  | GET       | 空          | 显示所有用户列表 |
| addUser    | POST      | JSON 字符串 | 添加新用户       |
| deleteUser | DELETE    | JSON 字符串 | 删除用户         |
| :id        | GET       | 空          | 显示用户详细信息 |

user.json
```json
{
   "user1" : {
      "name" : "mahesh",
      "password" : "password1",
      "profession" : "teacher",
      "id": 1
   }
}
```

server.js

```js
var express = require('express');
var app = express();
var fs = require("fs");

// 获取用户列表
app.get('/listUsers', function (req, res) {
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
       console.log( data );
       res.end( data );
   });
})


//添加的新用户数据
var user = {
   "user2" : {
      "name" : "mohit",
      "password" : "password2",
      "profession" : "teacher",
      "id": 2
   }
}
app.get('/addUser', function (req, res) {
   // 读取已存在的数据
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
       data["user2"] = user["user2"];
       console.log( data );
       res.end( JSON.stringify(data));
   });
})

// 显示用户详情
app.get('/:id', function (req, res) {
   // 首先我们读取已存在的用户
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
       var user = data["user" + req.params.id] 
       console.log( user );
       res.end( JSON.stringify(user));
   });
})

var id = 2;
// 删除用户
app.get('/deleteUser', function (req, res) {
   // First read existing users.
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
       delete data["user" + id];
       console.log( data );
       res.end( JSON.stringify(data));
   });
})

var server = app.listen(8081, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
})
```

## 多进程

Node.js 是以单线程的模式运行的，但它使用的是事件驱动来处理并发，这样有助于我们在多核 cpu 的系统上创建多个子进程，从而提高性能。

每个子进程总是带有三个流对象：child.stdin, child.stdout 和child.stderr。他们可能会共享父进程的 stdio 流，或者也可以是独立的被导流的流对象。

Node 提供了 `child_process` 模块来创建子进程，方法有：

**exec - child_process.exec**、
使用子进程执行命令，缓存子进程的输出，并将子进程的输出以
回调函数参数的形式返回。

示例：创建两个 js 文件 support.js 和 master.js

```js
// support.js
console.log("进程 " + process.argv[2] + " 执行。" );

// master.js
const fs = require('fs');
const child_process = require('child_process');
 
for(var i=0; i<3; i++) {
    var workerProcess = child_process.exec('node support.js '+i, function (error, stdout, stderr) {
        if (error) {
            console.log(error.stack);
            console.log('Error code: '+error.code);
            console.log('Signal received: '+error.signal);
        }
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
    });
 
    workerProcess.on('exit', function (code) {
        console.log('子进程已退出，退出码 '+code);
    });
}

// 运行输出
// node master.js 
// 子进程已退出，退出码 0
// stdout: 进程 1 执行。

// stderr: 
// 子进程已退出，退出码 0
// stdout: 进程 0 执行。

// stderr: 
// 子进程已退出，退出码 0
// stdout: 进程 2 执行。

// stderr: 
```

**spawn - child_process.spawn**
使用指定的命令行参数创建新进程。

示例：创建两个 js 文件 support.js(同exec()方法示例) 和 master.js

```js
const fs = require('fs');
const child_process = require('child_process');
 
for(var i=0; i<3; i++) {
    var workerProcess = child_process.exec('node support.js '+i, function (error, stdout, stderr) {
        if (error) {
            console.log(error.stack);
            console.log('Error code: '+error.code);
            console.log('Signal received: '+error.signal);
        }
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
    });
 
    workerProcess.on('exit', function (code) {
        console.log('子进程已退出，退出码 '+code);
    });
}

// 运行结果
// node master.js stdout: 进程 0 执行。

// 子进程已退出，退出码 0
// stdout: 进程 1 执行。

// 子进程已退出，退出码 0
// stdout: 进程 2 执行。

// 子进程已退出，退出码 0 
```

**fork - child_process.fork**
是 spawn()的特殊形式，用于在子进程中运行的模块，如 fork('./son.js') 相当于 spawn('node', ['./son.js']) 。与spawn方法不同的是，fork会在父进程与子进程之间，建立一个通信管道，用于进程之间的通信。

示例：创建两个 js 文件 support.js(同exec()方法示例) 和 master.js

```js
const fs = require('fs');
const child_process = require('child_process');
 
for(var i=0; i<3; i++) {
   var worker_process = child_process.fork("support.js", [i]);    
 
   worker_process.on('close', function (code) {
      console.log('子进程已退出，退出码 ' + code);
   });
}
//运行结果
// node master.js 
// 进程 0 执行。
// 子进程已退出，退出码 0
// 进程 1 执行。
// 子进程已退出，退出码 0
// 进程 2 执行。
// 子进程已退出，退出码 0
```

| 方法    | 描述                                                                                                |
| ------- | --------------------------------------------------------------------------------------------------- |
| exec()  | child_process.exec 使用子进程执行命令，缓存子进程的输出，并将子进程的输出以回调函数参数的形式返回。 |
| spawn() | child_process.spawn 使用指定的命令行参数创建新进程                                                  |
| fork()  | child_process.fork 是 spawn() 方法的特殊形式，用于创建进程                                          |

## 连接 MySQL

### 安装驱动

`npm install mysql` 

### MySQL数据库操作( CURD )

CURD 示例

```sql
SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0; - 表和表之间建立的外键约束，导致无法删除表及修改表结构，导入数据时需要先取消外键约束

DROP TABLE IF EXISTS `websites`;
CREATE TABLE `websites` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` char(20) NOT NULL DEFAULT '' COMMENT '站点名称',
  `url` varchar(255) NOT NULL DEFAULT '',
  `alexa` int(11) NOT NULL DEFAULT '0' COMMENT 'Alexa 排名',
  `country` char(10) NOT NULL DEFAULT '' COMMENT '国家',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

BEGIN;
INSERT INTO `websites` VALUES ('1', '淘宝', 'https://www.taobao.com/', '13', 'CN'), ('2', '微博', 'http://weibo.com/', '20', 'CN');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1; - 数据导入后再设置外键约束
```

数据库操作： `query(sql, sql_param, callback_function)`

```js
var mysql = require('mysql');  
var connection = mysql.createConnection({     
  host: 'localhost',       
  user: 'root',              
  password: '123456',       
  port: '3306',                   
  database: 'test' 
}); 
connection.connect();

// 插入数据
var  addSql = 'INSERT INTO websites(Id,name,url,alexa,country) VALUES(0,?,?,?,?)';
var  addSqlParams = ['nodejs', 'https://nodejs.org','666666', 'CN'];
connection.query(addSql,addSqlParams,function (err, result) {
    if(err){
        console.log('[INSERT ERROR] - ',err.message);
        return;
    }        
    console.log('INSERT ID:',result);        
});

// 修改数据
var modSql = 'UPDATE websites SET name = ? WHERE Id = ?';
var modSqlParams = ['nodejs666', 0];
connection.query(modSql,modSqlParams,function (err, result) {
   if(err){
         console.log('[UPDATE ERROR] - ',err.message);
         return;
   }        
  console.log('UPDATE affectedRows',result.affectedRows);
});

// 查询数据
var sql = 'SELECT * FROM websites';
connection.query(sql,function (err, result) {
    if(err){
        console.log('[SELECT ERROR] - ',err.message);
        return;
    }
    console.log(result);
});
// 查询结果
// [ RowDataPacket {
//     id: 0,
//     name: 'nodejs666',
//     url: 'https://nodejs.org',
//     alexa: 666666,
//     country: 'CN' }
// ]

// 删除数据
var delSql = 'DELETE FROM websites where id=0';
connection.query(delSql,function (err, result) {
    if(err){
        console.log('[DELETE ERROR] - ',err.message);
        return;
    }        
    console.log('DELETE affectedRows',result.affectedRows);
});

connection.end();
```

## 连接 MongoDB

### 安装驱动

`npm install mongodb`

### 创建数据库和集合

使用 `MongoClient` 对象对数据库进行操作，MongoDB 会自动创建数据库和集合

```js
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/nodejs";
 
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("数据库已创建!");
  var dbase = db.db("nodejs");
    dbase.createCollection('site', function (err, res) {
        if (err) throw err;
        console.log("创建集合!");
        db.close();
    });
});
```

### MongoDB数据库操作( CURD )

数据库操作

| 操作         | 功能                                          |
| ------------ | --------------------------------------------- |
| insertOne()  | 插入一条数据                                  |
| insertMany() | 插入多条数据                                  |
| find()       | 可以返回匹配条件的所有数据                    |
| updateOne()  | 更新一条数据                                  |
| updateMany() | 更新所有符合条的文档数据                      |
| deleteOne()  | 删除一条文档数据                              |
| deleteMany() | 删除多条文档数据                              |
| sort()       | 该方法接受一个参数，规定是升序(1)还是降序(-1) |
| limit()      | 设置指定的返回条数，实现分页查询              |
| drop()       | 删除集合                                      |
| $lookup      | 左连接                                        |

CURD 操作示例

```js
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
 
MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("nodejs");
    add_one(); // 添加一条数据
    add_many(); // 添加多条数据
    select(); // 按条件查询数据
    update_one(); // 更新一条数据
    updata_many(); // 更新多条数据
    delete_one(); // 删除一条数据
    delete_many(); // 删除符合条件的多条数据
    sort(); // 按照字段排序
    page(); // 分页查询
    left_join(); // 进行左连接操作
    drop_collection(); // 删除集合
});
db.close();

function add_one () {
    var myobj = { name: "nodejs官网", url: "www.nodejs" };
    dbo.collection("site").insertOne(myobj, function(err, res) {
        if (err) throw err;
        console.log("文档插入成功");
    });
}
function add_many () {
    var myobj =  [
        { name: 'nodejs', url: 'https://nodejs.org', type: 'cn'},
        { name: 'Google', url: 'https://www.google.com', type: 'en'},
        { name: 'Facebook', url: 'https://www.google.com', type: 'en'}
       ];
    dbo.collection("site").insertMany(myobj, function(err, res) {
        if (err) throw err;
        console.log("插入的文档数量为: " + res.insertedCount);
    });
}
function select () {
    var whereStr = {"name":'nodejs'};  // 查询条件
    dbo.collection("site"). find(whereStr).toArray(function(err, result) { // 返回集合中所有数据
        if (err) throw err;
        console.log(result);
    });
}
function update_one () {
    var whereStr = {"name":'nodejs'};  // 查询条件
    var updateStr = {$set: { "url" : "https://nodejs.org" }};
    dbo.collection("site").updateOne(whereStr, updateStr, function(err, res) {
        if (err) throw err;
        console.log("文档更新成功");
    });
}
function updata_many () {
    var whereStr = {"type":'en'};  // 查询条件
    var updateStr = {$set: { "url" : "https://nodejs.org" }};
    dbo.collection("site").updateMany(whereStr, updateStr, function(err, res) {
        if (err) throw err;
        console.log(res.result.nModified + " 条文档被更新");
    });
}
function delete_one () {
    var whereStr = {"name":'nodejs'};  // 查询条件
    dbo.collection("site").deleteOne(whereStr, function(err, obj) {
        if (err) throw err;
        console.log("文档删除成功");
    });
}
function delete_many () {
    var whereStr = { type: "en" };  // 查询条件
    dbo.collection("site").deleteMany(whereStr, function(err, obj) {
        if (err) throw err;
        console.log(obj.result.n + " 条文档被删除");
    });
}
function sort () {
    var mysort = { type: 1 }; // 按 type 字段升序
    dbo.collection("site").find().sort(mysort).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
    });
}
function page () {
    // 跳过前面两条数据，读取两条数据
    dbo.collection("site").find().skip(2).limit(2).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
  });
}
function left_join () {
    dbo.collection('orders').aggregate([
    { $lookup:
       {
         from: 'products',            // 右集合
         localField: 'product_id',    // 左集合 join 字段
         foreignField: '_id',         // 右集合 join 字段
         as: 'orderdetails'           // 新生成字段（类型array）
       }
     }
    ]).toArray(function(err, res) {
    if (err) throw err;
    console.log(JSON.stringify(res));
    db.close();
  });
}
function drop_collection () {
    // 删除 test 集合
    dbo.collection("test").drop(function(err, delOK) {  // 执行成功 delOK 返回 true，否则返回 false
        if (err) throw err;
        if (delOK) console.log("集合已删除");
        db.close();
    });
}
```

### 使用promise

目的是更加优雅地书写复杂的异步任务。

使用promise实现四个连续操作：增加 、查询 、更改 、删除。

```js
const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost/";
MongoClient.connect(url).then((conn) => {
    console.log("数据库已连接");
    const test = conn.db("testdb").collection("test");
    // 增加
    test.insertOne({ "site": "nodejs.org" }).then((res) => {
        // 查询
        return test.find().toArray().then((arr) => {
            console.log(arr);
        });
    }).then(() => {
        // 更改
        return test.updateMany({ "site": "nodejs.org" },
            { $set: { "site": "example.com" } });
    }).then((res) => {
        // 查询
        return test.find().toArray().then((arr) => {
            console.log(arr);
        });
    }).then(() => {
        // 删除
        return test.deleteMany({ "site": "example.com" });
    }).then((res) => {
        // 查询
        return test.find().toArray().then((arr) => {
            console.log(arr);
        });
    }).catch((err) => {
        console.log("数据操作失败" + err.message);
    }).finally(() => {
        conn.close();
    });
}).catch((err) => {
    console.log("数据库连接失败");
});
```

用异步函数实现相同的数据操作

```js
const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost/";
 
async function dataOperate() {
    var conn = null;
    try {
        conn = await MongoClient.connect(url);
        console.log("数据库已连接");
        const test = conn.db("testdb").collection("test");
        // 增加
        await test.insertOne({ "site": "nodejs.org" });
        // 查询
        var arr = await test.find().toArray();
        console.log(arr);
        // 更改
        await test.updateMany({ "site": "nodejs.org" },
            { $set: { "site": "example.com" } });
        // 查询
        arr = await test.find().toArray();
        console.log(arr);
        // 删除
        await test.deleteMany({ "site": "example.com" });
        // 查询
        arr = await test.find().toArray();
        console.log(arr);
    } catch (err) {
        console.log("错误：" + err.message);
    } finally {
        if (conn != null) conn.close();
    }
}
 
dataOperate();

// 运行结果
// 数据库已连接
// [ { _id: 5f169006a2780f0cd4ea640b, site: 'nodejs.org' } ]
// [ { _id: 5f169006a2780f0cd4ea640b, site: 'example.com' } ]
// []
```
