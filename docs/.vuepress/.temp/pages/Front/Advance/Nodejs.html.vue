<template><h1 id="nodejs" tabindex="-1"><a class="header-anchor" href="#nodejs" aria-hidden="true">#</a> Nodejs</h1>
<p>Node.js 是运行在服务端的 JavaScript。</p>
<p>Node.js 是一个基于 Chrome JavaScript 运行时建立的一个平台。</p>
<p>Node.js 是一个事件驱动 I/O 服务端 JavaScript 环境，基于 Google 的 V8 引擎，V8 引擎执行 Javascript 的速度非常快，性能非常好。</p>
<h2 id="nodejs的组成部分" tabindex="-1"><a class="header-anchor" href="#nodejs的组成部分" aria-hidden="true">#</a> Nodejs的组成部分</h2>
<ol>
<li>
<p>引入 required 模块。</p>
</li>
<li>
<p>创建服务器：服务器可以监听客户端的请求，类似于 Apache 、Nginx 等 HTTP 服务器。</p>
</li>
<li>
<p>接收请求与响应请求 服务器很容易创建，客户端可以使用浏览器或终端发送 HTTP 请求，服务器接收请求后返回响应数据。</p>
</li>
<li>
<p>Node 自带了交互式解释器，REPL</p>
</li>
</ol>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> http <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'http'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
http<span class="token punctuation">.</span><span class="token function">createServer</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">request<span class="token punctuation">,</span> response</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    response<span class="token punctuation">.</span><span class="token function">writeHead</span><span class="token punctuation">(</span><span class="token number">200</span><span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token string-property property">'Content-Type'</span><span class="token operator">:</span> <span class="token string">'text/plain'</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    response<span class="token punctuation">.</span><span class="token function">end</span><span class="token punctuation">(</span><span class="token string">'Hello World\n'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">listen</span><span class="token punctuation">(</span><span class="token number">8888</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'Server running at http://127.0.0.1:8888/'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h2 id="npm使用介绍" tabindex="-1"><a class="header-anchor" href="#npm使用介绍" aria-hidden="true">#</a> NPM使用介绍</h2>
<p>NPM是随同NodeJS一起安装的包管理工具，能解决NodeJS代码部署上的很多问题，常见的使用场景有以下几种：</p>
<ul>
<li>允许用户从NPM服务器下载别人编写的第三方包到本地使用。</li>
<li>允许用户从NPM服务器下载并安装别人编写的命令行程序到本地使用。</li>
<li>允许用户将自己编写的包或命令行程序上传到NPM服务器供别人使用。</li>
</ul>
<p>express 包就放在了工程目录下的 node_modules 目录中，因此在代码中只需要通过 require('express') 的方式就好，无需指定第三方包路径。</p>
<h3 id="本地安装" tabindex="-1"><a class="header-anchor" href="#本地安装" aria-hidden="true">#</a> 本地安装</h3>
<ol>
<li>将安装包放在 ./node_modules 下（运行 npm 命令时所在的目录），如果没有 node_modules 目录，会在当前执行 npm 命令的目录下生成 node_modules 目录。</li>
<li>可以通过 <code>require()</code> 来引入本地安装的包。</li>
</ol>
<h3 id="全局安装" tabindex="-1"><a class="header-anchor" href="#全局安装" aria-hidden="true">#</a> 全局安装</h3>
<ol>
<li>将安装包放在 /usr/local 下或者你 node 的安装目录。</li>
<li>可以直接在命令行里使用。</li>
</ol>
<h2 id="回调函数" tabindex="-1"><a class="header-anchor" href="#回调函数" aria-hidden="true">#</a> 回调函数</h2>
<p>Node.js 异步编程的直接体现就是回调。</p>
<p>Node.js 几乎每一个 API 都是支持回调函数的。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 阻塞</span>
<span class="token keyword">var</span> fs <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"fs"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> data <span class="token operator">=</span> fs<span class="token punctuation">.</span><span class="token function">readFileSync</span><span class="token punctuation">(</span><span class="token string">'input.txt'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>data<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"程序执行结束!"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>   <span class="token comment">// 后输出</span>
<span class="token comment">// 非阻塞</span>
<span class="token keyword">var</span> fs <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"fs"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
fs<span class="token punctuation">.</span><span class="token function">readFile</span><span class="token punctuation">(</span><span class="token string">'input.txt'</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">err<span class="token punctuation">,</span> data</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token keyword">return</span> console<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>data<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"程序执行结束!"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>   <span class="token comment">// 先输出</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><h2 id="事件循环" tabindex="-1"><a class="header-anchor" href="#事件循环" aria-hidden="true">#</a> 事件循环</h2>
<p>Node.js 是单进程单线程应用程序，但是因为 V8 引擎提供的异步执行回调接口，通过这些接口可以处理大量的并发，所以性能非常高。</p>
<p>Node.js 基本上所有的事件机制都是用设计模式中观察者模式实现。</p>
<p>Node.js 单线程类似进入一个while(true)的事件循环，直到没有事件观察者退出，每个异步事件都生成一个事件观察者，如果有事件发生就调用该回调函数.</p>
<h3 id="事件驱动程序" tabindex="-1"><a class="header-anchor" href="#事件驱动程序" aria-hidden="true">#</a> 事件驱动程序</h3>
<p>Node.js 使用事件驱动模型，当web server接收到请求，就把它关闭然后进行处理，然后去服务下一个web请求。</p>
<p>当这个请求完成，它被放回处理队列，当到达队列开头，这个结果被返回给用户。</p>
<p>这个模型非常高效可扩展性非常强，因为 webserver 一直接受请求而不等待任何读写操作。（这也称之为非阻塞式IO或者事件驱动IO）</p>
<p>在事件驱动模型中，会生成一个主循环来监听事件，当检测到事件时触发回调函数。</p>
<p><img src="@source/Front/Advance/imgs/nodejs/事件驱动程序.jpg" alt="事件驱动程序"></p>
<p>整个事件驱动的流程就是这么实现的，非常简洁。有点类似于观察者模式，事件相当于一个主题(Subject)，而所有注册到这个事件上的处理函数相当于观察者(Observer)。</p>
<p>Node.js 有多个内置的事件，我们可以通过引入 events 模块，并通过实例化 EventEmitter 类来绑定和监听事件，如下实例：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 引入 events 模块</span>
<span class="token keyword">var</span> events <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'events'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 创建 eventEmitter 对象</span>
<span class="token keyword">var</span> eventEmitter <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">events<span class="token punctuation">.</span>EventEmitter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 创建事件处理程序</span>
<span class="token keyword">var</span> <span class="token function-variable function">connectHandler</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token function">connected</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'连接成功。'</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
   <span class="token comment">// 触发 data_received 事件 </span>
   eventEmitter<span class="token punctuation">.</span><span class="token function">emit</span><span class="token punctuation">(</span><span class="token string">'data_received'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// 绑定 connection 事件处理程序</span>
eventEmitter<span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">'connection'</span><span class="token punctuation">,</span> connectHandler<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 使用匿名函数绑定 data_received 事件</span>
eventEmitter<span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">'data_received'</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
   console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'数据接收成功。'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 触发 connection 事件 </span>
eventEmitter<span class="token punctuation">.</span><span class="token function">emit</span><span class="token punctuation">(</span><span class="token string">'connection'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"程序执行完毕。"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// node main.js</span>
<span class="token comment">// 连接成功。</span>
<span class="token comment">// 数据接收成功。</span>
<span class="token comment">// 程序执行完毕。</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div><blockquote>
<p>在 Node 应用程序中，执行异步操作的函数将回调函数作为最后一个参数， 回调函数接收错误对象作为第一个参数。</p>
</blockquote>
<h3 id="eventemitter" tabindex="-1"><a class="header-anchor" href="#eventemitter" aria-hidden="true">#</a> EventEmitter</h3>
<p>Node.js 所有的异步 I/O 操作在完成时都会发送一个事件到事件队列。</p>
<p>Node.js 里面的许多对象都会分发事件，所有这些产生事件的对象都是 events.EventEmitter 的实例。</p>
<p>events 模块只提供了一个对象： events.EventEmitter。EventEmitter 的核心就是事件触发与事件监听器功能的封装。</p>
<table>
<thead>
<tr>
<th>方法</th>
<th>描述</th>
</tr>
</thead>
<tbody>
<tr>
<td>addListener(event, listener)</td>
<td>为指定事件添加一个监听器到监听器数组的尾部。</td>
</tr>
<tr>
<td>on(event, listener)</td>
<td>为指定事件注册一个监听器，接受一个字符串 event 和一个回调函数。</td>
</tr>
<tr>
<td>once(event, listener)</td>
<td>为指定事件注册一个单次监听器，即 监听器最多只会触发一次，触发后立刻解除该监听器。</td>
</tr>
<tr>
<td>removeListener(event, listener)</td>
<td>移除指定事件的某个监听器，监听器必须是该事件已经注册过的监听器。它接受两个参数，第一个是事件名称，第二个是回调函数名称。</td>
</tr>
<tr>
<td>removeAllListeners([event])</td>
<td>移除所有事件的所有监听器， 如果指定事件，则移除指定事件的所有监听器。</td>
</tr>
<tr>
<td>setMaxListeners(n)</td>
<td>默认情况下， EventEmitters 如果你添加的监听器超过 10 个就会输出警告信息。 setMaxListeners 函数用于改变监听器的默认限制的数量。</td>
</tr>
<tr>
<td>listeners(event)</td>
<td>返回指定事件的监听器数组。</td>
</tr>
<tr>
<td>emit(event, [arg1], [arg2], [...])</td>
<td>按监听器的顺序执行执行每个监听器，如果事件有注册监听返回 true，否则返回 false。</td>
</tr>
<tr>
<td>listenerCount(emitter, event)</td>
<td>类方法，返回指定事件的监听器数量。</td>
</tr>
</tbody>
</table>
<p>以下实例通过 connection（连接）事件演示了 EventEmitter 类的应用。
main.js</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> events <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'events'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> eventEmitter <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">events<span class="token punctuation">.</span>EventEmitter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 监听器 #1</span>
<span class="token keyword">var</span> <span class="token function-variable function">listener1</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token function">listener1</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'监听器 listener1 执行。'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 监听器 #2</span>
<span class="token keyword">var</span> <span class="token function-variable function">listener2</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token function">listener2</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'监听器 listener2 执行。'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 绑定 connection 事件，处理函数为 listener1 </span>
eventEmitter<span class="token punctuation">.</span><span class="token function">addListener</span><span class="token punctuation">(</span><span class="token string">'connection'</span><span class="token punctuation">,</span> listener1<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 绑定 connection 事件，处理函数为 listener2</span>
eventEmitter<span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">'connection'</span><span class="token punctuation">,</span> listener2<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">var</span> eventListeners <span class="token operator">=</span> eventEmitter<span class="token punctuation">.</span><span class="token function">listenerCount</span><span class="token punctuation">(</span><span class="token string">'connection'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>eventListeners <span class="token operator">+</span> <span class="token string">" 个监听器监听连接事件。"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 处理 connection 事件 </span>
eventEmitter<span class="token punctuation">.</span><span class="token function">emit</span><span class="token punctuation">(</span><span class="token string">'connection'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 移除监绑定的 listener1 函数</span>
eventEmitter<span class="token punctuation">.</span><span class="token function">removeListener</span><span class="token punctuation">(</span><span class="token string">'connection'</span><span class="token punctuation">,</span> listener1<span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"listener1 不再受监听。"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 触发连接事件</span>
eventEmitter<span class="token punctuation">.</span><span class="token function">emit</span><span class="token punctuation">(</span><span class="token string">'connection'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

eventListeners <span class="token operator">=</span> eventEmitter<span class="token punctuation">.</span><span class="token function">listenerCount</span><span class="token punctuation">(</span><span class="token string">'connection'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>eventListeners <span class="token operator">+</span> <span class="token string">" 个监听器监听连接事件。"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"程序执行完毕。"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 执行结果</span>
<span class="token comment">// node main.js</span>
<span class="token comment">// 2 个监听器监听连接事件。</span>
<span class="token comment">// 监听器 listener1 执行。</span>
<span class="token comment">// 监听器 listener2 执行。</span>
<span class="token comment">// listener1 不再受监听。</span>
<span class="token comment">// 监听器 listener2 执行。</span>
<span class="token comment">// 1 个监听器监听连接事件。</span>
<span class="token comment">// 程序执行完毕。</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br></div></div><h2 id="buffer" tabindex="-1"><a class="header-anchor" href="#buffer" aria-hidden="true">#</a> Buffer</h2>
<p>JavaScript 语言自身只有字符串数据类型，没有二进制数据类型。</p>
<p>但在处理像TCP流或文件流时，必须使用到二进制数据。因此在 Node.js中，定义了一个 Buffer 类，该类用来创建一个专门存放二进制数据的缓存区。</p>
<table>
<thead>
<tr>
<th>方法</th>
<th>描述</th>
</tr>
</thead>
<tbody>
<tr>
<td>Buffer.from(array)</td>
<td>返回一个被 array 的值初始化的新的 Buffer 实例（传入的 array 的元素只能是数字，不然就会自动被 0 覆盖）</td>
</tr>
<tr>
<td>Buffer.from(arrayBuffer[, byteOffset[, length]])</td>
<td>返回一个新建的与给定的 ArrayBuffer 共享同一内存的 Buffer。</td>
</tr>
<tr>
<td>Buffer.from(buffer)</td>
<td>复制传入的 Buffer 实例的数据，并返回一个新的 Buffer 实例</td>
</tr>
<tr>
<td>Buffer.from(string[, encoding])</td>
<td>返回一个被 string 的值初始化的新的 Buffer 实例</td>
</tr>
<tr>
<td>buf.write(string[, offset[, length]][, encoding])</td>
<td>写入缓冲区</td>
</tr>
<tr>
<td>buf.toString([encoding[, start[, end]]])</td>
<td>从缓冲区读取数据</td>
</tr>
<tr>
<td>buf.toJSON()Buffer</td>
<td>转换为 JSON 对象</td>
</tr>
<tr>
<td>Buffer.concat(list[, totalLength])</td>
<td>缓冲区合并,totalLength：指定合并后Buffer对象的总长度。</td>
</tr>
<tr>
<td>buf.compare(otherBuffer)</td>
<td>缓冲区比较</td>
</tr>
<tr>
<td>buf.copy(targetBuffer[, targetStart[, sourceStart[, sourceEnd]]])</td>
<td>缓冲区拷贝</td>
</tr>
<tr>
<td>buf.slice([start[, end]])</td>
<td>缓冲区裁剪</td>
</tr>
</tbody>
</table>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 创建一个长度为 10、且用 0 填充的 Buffer。</span>
<span class="token keyword">const</span> buf1 <span class="token operator">=</span> Buffer<span class="token punctuation">.</span><span class="token function">alloc</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 创建一个长度为 10、且用 0x1 填充的 Buffer。 </span>
<span class="token keyword">const</span> buf2 <span class="token operator">=</span> Buffer<span class="token punctuation">.</span><span class="token function">alloc</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 创建一个长度为 10、且未初始化的 Buffer。</span>
<span class="token comment">// 这个方法比调用 Buffer.alloc() 更快，</span>
<span class="token comment">// 但返回的 Buffer 实例可能包含旧数据，</span>
<span class="token comment">// 因此需要使用 fill() 或 write() 重写。</span>
<span class="token keyword">const</span> buf3 <span class="token operator">=</span> Buffer<span class="token punctuation">.</span><span class="token function">allocUnsafe</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 创建一个包含 [0x1, 0x2, 0x3] 的 Buffer。</span>
<span class="token keyword">const</span> buf4 <span class="token operator">=</span> Buffer<span class="token punctuation">.</span><span class="token function">from</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 创建一个包含 UTF-8 字节 [0x74, 0xc3, 0xa9, 0x73, 0x74] 的 Buffer。</span>
<span class="token keyword">const</span> buf5 <span class="token operator">=</span> Buffer<span class="token punctuation">.</span><span class="token function">from</span><span class="token punctuation">(</span><span class="token string">'tést'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 创建一个包含 Latin-1 字节 [0x74, 0xe9, 0x73, 0x74] 的 Buffer。</span>
<span class="token keyword">const</span> buf6 <span class="token operator">=</span> Buffer<span class="token punctuation">.</span><span class="token function">from</span><span class="token punctuation">(</span><span class="token string">'tést'</span><span class="token punctuation">,</span> <span class="token string">'latin1'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><h2 id="stream-流" tabindex="-1"><a class="header-anchor" href="#stream-流" aria-hidden="true">#</a> Stream(流)</h2>
<ul>
<li>从流中读取数据</li>
<li>写入流</li>
<li>管道流：管道提供了一个输出流到输入流的机制。通常用于从一个流中获取数据并将数据传递到另外一个流中。</li>
<li>链式流：链式是通过连接输出流到另外一个流并创建多个流操作链的机制。链式流一般用于管道操作</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> fs <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"fs"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 读取input.txt中内容写入到output.txt</span>
<span class="token keyword">function</span> <span class="token function">remove_file_content</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">var</span> data <span class="token operator">=</span> <span class="token string">''</span><span class="token punctuation">;</span>

    <span class="token comment">// 创建可读流</span>
    <span class="token keyword">var</span> readerStream <span class="token operator">=</span> fs<span class="token punctuation">.</span><span class="token function">createReadStream</span><span class="token punctuation">(</span><span class="token string">'input.txt'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 设置编码为 utf8。</span>
    readerStream<span class="token punctuation">.</span><span class="token function">setEncoding</span><span class="token punctuation">(</span><span class="token string">'UTF8'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 处理流事件 --> data, end, and error</span>
    readerStream<span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">'data'</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">chunk</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    data <span class="token operator">+=</span> chunk<span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    readerStream<span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">'end'</span><span class="token punctuation">,</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    readerStream<span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">'error'</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">err</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>err<span class="token punctuation">.</span>stack<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 创建一个可以写入的流，写入到文件 output.txt 中</span>
    <span class="token keyword">var</span> writerStream <span class="token operator">=</span> fs<span class="token punctuation">.</span><span class="token function">createWriteStream</span><span class="token punctuation">(</span><span class="token string">'output.txt'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 使用 utf8 编码写入数据</span>
    writerStream<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span>data<span class="token punctuation">,</span><span class="token string">'UTF8'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 标记文件末尾</span>
    writerStream<span class="token punctuation">.</span><span class="token function">end</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 处理流事件 --> finish、error</span>
    writerStream<span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">'finish'</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"写入完成。"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 管道流：以上过程可以简化</span>
    <span class="token comment">// 创建一个可读流</span>
    <span class="token keyword">var</span> readerStream <span class="token operator">=</span> fs<span class="token punctuation">.</span><span class="token function">createReadStream</span><span class="token punctuation">(</span><span class="token string">'input.txt'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 创建一个可写流</span>
    <span class="token keyword">var</span> writerStream <span class="token operator">=</span> fs<span class="token punctuation">.</span><span class="token function">createWriteStream</span><span class="token punctuation">(</span><span class="token string">'output.txt'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 管道读写操作</span>
    <span class="token comment">// 读取 input.txt 文件内容，并将内容写入到 output.txt 文件中</span>
    readerStream<span class="token punctuation">.</span><span class="token function">pipe</span><span class="token punctuation">(</span>writerStream<span class="token punctuation">)</span><span class="token punctuation">;</span>

    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"程序执行完毕"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 解压缩文件</span>
<span class="token keyword">var</span> zlib <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'zlib'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">function</span> <span class="token function">compress</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 压缩 input.txt 文件为 input.txt.gz</span>
    fs<span class="token punctuation">.</span><span class="token function">createReadStream</span><span class="token punctuation">(</span><span class="token string">'input.txt'</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">pipe</span><span class="token punctuation">(</span>zlib<span class="token punctuation">.</span><span class="token function">createGzip</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">pipe</span><span class="token punctuation">(</span>fs<span class="token punctuation">.</span><span class="token function">createWriteStream</span><span class="token punctuation">(</span><span class="token string">'input.txt.gz'</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"文件压缩完成。"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">decompress</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 解压 input.txt.gz 文件为 input.txt</span>
    fs<span class="token punctuation">.</span><span class="token function">createReadStream</span><span class="token punctuation">(</span><span class="token string">'input.txt.gz'</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">pipe</span><span class="token punctuation">(</span>zlib<span class="token punctuation">.</span><span class="token function">createGunzip</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">pipe</span><span class="token punctuation">(</span>fs<span class="token punctuation">.</span><span class="token function">createWriteStream</span><span class="token punctuation">(</span><span class="token string">'input.txt'</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"文件解压完成。"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br></div></div><h2 id="模块系统" tabindex="-1"><a class="header-anchor" href="#模块系统" aria-hidden="true">#</a> 模块系统</h2>
<p>Node.js 中存在 4 类模块（原生模块和3种文件模块）</p>
<p>Node.js 提供了 exports 和 require 两个对象，其中 exports 是模块公开的接口，require 用于从外部获取一个模块的接口，即所获取模块的 exports 对象。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 成员函数封装到模块中</span>
exports<span class="token punctuation">.</span><span class="token function-variable function">world</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'Hello World'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 把一个对象封装到模块中</span>
<span class="token comment">//hello.js </span>
<span class="token keyword">function</span> <span class="token function">Hello</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> 
    <span class="token keyword">var</span> name<span class="token punctuation">;</span> 
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function-variable function">setName</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">thyName</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> 
        name <span class="token operator">=</span> thyName<span class="token punctuation">;</span> 
    <span class="token punctuation">}</span><span class="token punctuation">;</span> 
    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function-variable function">sayHello</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> 
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'Hello '</span> <span class="token operator">+</span> name<span class="token punctuation">)</span><span class="token punctuation">;</span> 
    <span class="token punctuation">}</span><span class="token punctuation">;</span> 
<span class="token punctuation">}</span><span class="token punctuation">;</span> 
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> Hello<span class="token punctuation">;</span>

<span class="token comment">//main.js</span>
<span class="token keyword">var</span> hello1 <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'./hello1'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
hello1<span class="token punctuation">.</span><span class="token function">world</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> Hello <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'./hello2'</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
hello2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Hello</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
hello2<span class="token punctuation">.</span><span class="token function">setName</span><span class="token punctuation">(</span><span class="token string">'BYVoid'</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
hello2<span class="token punctuation">.</span><span class="token function">sayHello</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br></div></div><blockquote>
<p>exports 和 module.exports 的使用
如果要对外暴露属性或方法，就用 exports 就行，要暴露对象(类似class，包含了很多属性和方法)，就用 module.exports。</p>
</blockquote>
<h3 id="加载模块的过程" tabindex="-1"><a class="header-anchor" href="#加载模块的过程" aria-hidden="true">#</a> 加载模块的过程</h3>
<p><img src="imgs/nodejs/nodejs加载模块的过程.jpg" alt="nodejs加载模块的过程"></p>
<p><strong>加载模块的优先级</strong></p>
<p>优先从文件模块的缓存中加载已经存在的模块 -&gt; 检查模块是否在原生模块列表中 -&gt; 从文件系统中加载实际的文件</p>
<h3 id="require方法" tabindex="-1"><a class="header-anchor" href="#require方法" aria-hidden="true">#</a> require方法</h3>
<p>参数</p>
<ul>
<li>http、fs、path等，原生模块。</li>
<li>./mod或../mod，相对路径的文件模块。</li>
<li>/pathtomodule/mod，绝对路径的文件模块。</li>
<li>mod，非原生模块的文件模块。</li>
</ul>
<p>在路径 Y 下执行 require(X) 语句执行顺序：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>1. 如果 X 是内置模块
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
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br></div></div><h2 id="路由" tabindex="-1"><a class="header-anchor" href="#路由" aria-hidden="true">#</a> 路由</h2>
<p>需要的数据都会包含在request对象中，该对象作为哦那Request()回调函数的第一个参数传递，为了解析这些数据，需要额外引入url和querystring模块</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// server.js</span>
<span class="token keyword">var</span> http <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"http"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> url <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"url"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 
<span class="token keyword">function</span> <span class="token function">start</span><span class="token punctuation">(</span><span class="token parameter">route</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">function</span> <span class="token function">onRequest</span><span class="token punctuation">(</span><span class="token parameter">request<span class="token punctuation">,</span> response</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> pathname <span class="token operator">=</span> url<span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span>request<span class="token punctuation">.</span>url<span class="token punctuation">)</span><span class="token punctuation">.</span>pathname<span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"Request for "</span> <span class="token operator">+</span> pathname <span class="token operator">+</span> <span class="token string">" received."</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 
    <span class="token function">route</span><span class="token punctuation">(</span>pathname<span class="token punctuation">)</span><span class="token punctuation">;</span>
 
    response<span class="token punctuation">.</span><span class="token function">writeHead</span><span class="token punctuation">(</span><span class="token number">200</span><span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token string-property property">"Content-Type"</span><span class="token operator">:</span> <span class="token string">"text/plain"</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    response<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span><span class="token string">"Hello World"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    response<span class="token punctuation">.</span><span class="token function">end</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
 
  http<span class="token punctuation">.</span><span class="token function">createServer</span><span class="token punctuation">(</span>onRequest<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">listen</span><span class="token punctuation">(</span><span class="token number">8888</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"Server has started."</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
exports<span class="token punctuation">.</span>start <span class="token operator">=</span> start<span class="token punctuation">;</span>


<span class="token comment">// router.js</span>
<span class="token keyword">function</span> <span class="token function">route</span><span class="token punctuation">(</span><span class="token parameter">pathname</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"About to route a request for "</span> <span class="token operator">+</span> pathname<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
exports<span class="token punctuation">.</span>route <span class="token operator">=</span> route<span class="token punctuation">;</span>

<span class="token comment">// index.js</span>
<span class="token keyword">var</span> server <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"./server"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> router <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"./router"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
server<span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span>router<span class="token punctuation">.</span>route<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br></div></div><h2 id="全局对象" tabindex="-1"><a class="header-anchor" href="#全局对象" aria-hidden="true">#</a> 全局对象</h2>
<p>Node.js 中的全局对象是 global</p>
<table>
<thead>
<tr>
<th>名称</th>
<th>描述</th>
</tr>
</thead>
<tbody>
<tr>
<td>__filename</td>
<td>当前正在执行的脚本的文件绝对路径</td>
</tr>
<tr>
<td>__dirname</td>
<td>当前执行脚本所在的目录</td>
</tr>
<tr>
<td>setTimeout(cb, ms)</td>
<td>指定的毫秒(ms)数后执行指定函数(cb)</td>
</tr>
<tr>
<td>clearTimeout(t)</td>
<td>停止一个之前通过 setTimeout() 创建的定时器</td>
</tr>
<tr>
<td>setInterval(cb, ms)</td>
<td>在指定的毫秒(ms)数后执行指定函数(cb)</td>
</tr>
<tr>
<td>console</td>
<td>用于提供控制台标准输出</td>
</tr>
<tr>
<td>process</td>
<td>用于描述当前Node.js 进程状态的对象</td>
</tr>
</tbody>
</table>
<h2 id="常用工具" tabindex="-1"><a class="header-anchor" href="#常用工具" aria-hidden="true">#</a> 常用工具</h2>
<h3 id="util模块" tabindex="-1"><a class="header-anchor" href="#util模块" aria-hidden="true">#</a> util模块</h3>
<p>util 是一个Node.js 核心模块，提供常用函数的集合</p>
<table>
<thead>
<tr>
<th>方法</th>
<th>描述</th>
</tr>
</thead>
<tbody>
<tr>
<td>util.callbackify(original)</td>
<td>将 async 异步函数（或者一个返回值为 Promise 的函数）转换成遵循异常优先的回调风格的函数</td>
</tr>
<tr>
<td>util.inherits(constructor, superConstructor)</td>
<td>是一个实现对象间原型继承的函数。</td>
</tr>
<tr>
<td>util.inspect(object,[showHidden],[depth],[colors])</td>
<td>是一个将任意对象转换 为字符串的方法，通常用于调试和错误输出。</td>
</tr>
<tr>
<td>util.isArray(object)</td>
<td>判断 object 是否是一个数组</td>
</tr>
<tr>
<td>util.isRegExp(object)</td>
<td>判断 object 是否是一个正则表达式</td>
</tr>
<tr>
<td>util.isDate(object)</td>
<td>判断 object 是否是一个日期</td>
</tr>
</tbody>
</table>
<h3 id="其他模块" tabindex="-1"><a class="header-anchor" href="#其他模块" aria-hidden="true">#</a> 其他模块</h3>
<table>
<thead>
<tr>
<th>模块</th>
<th>功能</th>
</tr>
</thead>
<tbody>
<tr>
<td>os</td>
<td>提供基本的系统操作函数。</td>
</tr>
<tr>
<td>path</td>
<td>提供了处理和转换文件路径的工具。</td>
</tr>
<tr>
<td>net</td>
<td>用于底层的网络通信。提供了服务端和客户端的的操作。</td>
</tr>
<tr>
<td>dns</td>
<td>用于解析域名。</td>
</tr>
<tr>
<td>domain</td>
<td>简化异步代码的异常处理，可以捕捉处理try catch无法捕捉的。</td>
</tr>
</tbody>
</table>
<h2 id="get-post请求" tabindex="-1"><a class="header-anchor" href="#get-post请求" aria-hidden="true">#</a> GET/POST请求</h2>
<p>get请求</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> http <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'http'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> url <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'url'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> util <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'util'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 
http<span class="token punctuation">.</span><span class="token function">createServer</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">req<span class="token punctuation">,</span> res</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    res<span class="token punctuation">.</span><span class="token function">writeHead</span><span class="token punctuation">(</span><span class="token number">200</span><span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token string-property property">'Content-Type'</span><span class="token operator">:</span> <span class="token string">'text/plain'</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 解析 url 参数</span>
    <span class="token keyword">var</span> params <span class="token operator">=</span> url<span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span>req<span class="token punctuation">.</span>url<span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">.</span>query<span class="token punctuation">;</span>
    res<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span><span class="token string">"网站名："</span> <span class="token operator">+</span> params<span class="token punctuation">.</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>
    res<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span><span class="token string">"\n"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    res<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span><span class="token string">"网站 URL："</span> <span class="token operator">+</span> params<span class="token punctuation">.</span>url<span class="token punctuation">)</span><span class="token punctuation">;</span>
    res<span class="token punctuation">.</span><span class="token function">end</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">listen</span><span class="token punctuation">(</span><span class="token number">3000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p>post请求</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> http <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'http'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> querystring <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'querystring'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 
<span class="token keyword">var</span> postHTML <span class="token operator">=</span> 
  <span class="token string">'&lt;html>&lt;head>&lt;meta charset="utf-8">&lt;title>Node.js 实例&lt;/title>&lt;/head>'</span> <span class="token operator">+</span>
  <span class="token string">'&lt;body>'</span> <span class="token operator">+</span>
  <span class="token string">'&lt;form method="post">'</span> <span class="token operator">+</span>
  <span class="token string">'网站名： &lt;input name="name">&lt;br>'</span> <span class="token operator">+</span>
  <span class="token string">'网站 URL： &lt;input name="url">&lt;br>'</span> <span class="token operator">+</span>
  <span class="token string">'&lt;input type="submit">'</span> <span class="token operator">+</span>
  <span class="token string">'&lt;/form>'</span> <span class="token operator">+</span>
  <span class="token string">'&lt;/body>&lt;/html>'</span><span class="token punctuation">;</span>
 
http<span class="token punctuation">.</span><span class="token function">createServer</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">req<span class="token punctuation">,</span> res</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> body <span class="token operator">=</span> <span class="token string">""</span><span class="token punctuation">;</span>
  req<span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">'data'</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">chunk</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    body <span class="token operator">+=</span> chunk<span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  req<span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">'end'</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 解析参数</span>
    body <span class="token operator">=</span> querystring<span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span>body<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 设置响应头部信息及编码</span>
    res<span class="token punctuation">.</span><span class="token function">writeHead</span><span class="token punctuation">(</span><span class="token number">200</span><span class="token punctuation">,</span> <span class="token punctuation">{</span><span class="token string-property property">'Content-Type'</span><span class="token operator">:</span> <span class="token string">'text/html; charset=utf8'</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>body<span class="token punctuation">.</span>name <span class="token operator">&amp;&amp;</span> body<span class="token punctuation">.</span>url<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// 输出提交的数据</span>
        res<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span><span class="token string">"网站名："</span> <span class="token operator">+</span> body<span class="token punctuation">.</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>
        res<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span><span class="token string">"&lt;br>"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        res<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span><span class="token string">"网站 URL："</span> <span class="token operator">+</span> body<span class="token punctuation">.</span>url<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>  <span class="token comment">// 输出表单</span>
        res<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span>postHTML<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    res<span class="token punctuation">.</span><span class="token function">end</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">listen</span><span class="token punctuation">(</span><span class="token number">3000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br></div></div><h2 id="express-框架" tabindex="-1"><a class="header-anchor" href="#express-框架" aria-hidden="true">#</a> Express 框架</h2>
<h3 id="express-应用" tabindex="-1"><a class="header-anchor" href="#express-应用" aria-hidden="true">#</a> Express 应用</h3>
<p>Express 框架核心特性：</p>
<ul>
<li>可以设置中间件来响应 HTTP 请求。</li>
<li>定义了路由表用于执行不同的 HTTP 请求动作。</li>
<li>可以通过向模板传递参数来动态渲染 HTML 页面。</li>
</ul>
<p>安装 Express：<code>npm install express --save</code></p>
<p>以下几个重要的模块是需要与 express 框架一起安装的：</p>
<ul>
<li>body-parser：node.js 中间件，用于处理 JSON, Raw, Text 和 URL 编码的数据。</li>
<li>cookie-parser：这就是一个解析Cookie的工具。通过req.cookies可以取到传过来的cookie，并把它们转成对象。</li>
<li>multer：node.js 中间件，用于处理 enctype=&quot;multipart/form-data&quot;（设置表单的MIME编码）的表单数据。</li>
</ul>
<p>示例</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> express <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'express'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> app <span class="token operator">=</span> <span class="token function">express</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">//  主页输出 "Hello World"</span>
app<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">'/'</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">req<span class="token punctuation">,</span> res</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"主页 GET 请求"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   res<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span><span class="token string">'Hello GET'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token comment">//  POST 请求</span>
app<span class="token punctuation">.</span><span class="token function">post</span><span class="token punctuation">(</span><span class="token string">'/'</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">req<span class="token punctuation">,</span> res</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"主页 POST 请求"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   res<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span><span class="token string">'Hello POST'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token comment">//  /del_user 页面响应</span>
app<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">'/del_user'</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">req<span class="token punctuation">,</span> res</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"/del_user 响应 DELETE 请求"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   res<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span><span class="token string">'删除页面'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token comment">//  /list_user 页面 GET 请求</span>
app<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">'/list_user'</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">req<span class="token punctuation">,</span> res</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"/list_user GET 请求"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   res<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span><span class="token string">'用户列表页面'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token comment">// 对页面 abcd, abxcd, ab123cd, 等响应 GET 请求</span>
app<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">'/ab*cd'</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">req<span class="token punctuation">,</span> res</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>   
   console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"/ab*cd GET 请求"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   res<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span><span class="token string">'正则匹配'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token keyword">var</span> server <span class="token operator">=</span> app<span class="token punctuation">.</span><span class="token function">listen</span><span class="token punctuation">(</span><span class="token number">8081</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> host <span class="token operator">=</span> server<span class="token punctuation">.</span><span class="token function">address</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>address
  <span class="token keyword">var</span> port <span class="token operator">=</span> server<span class="token punctuation">.</span><span class="token function">address</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>port
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"应用实例，访问地址为 http://%s:%s"</span><span class="token punctuation">,</span> host<span class="token punctuation">,</span> port<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br></div></div><h3 id="请求和响应" tabindex="-1"><a class="header-anchor" href="#请求和响应" aria-hidden="true">#</a> 请求和响应</h3>
<p>request 对象常用属性</p>
<ol>
<li>req.app：当callback为外部文件时，用req.app访问express的实例</li>
<li>req.baseUrl：获取路由当前安装的URL路径</li>
<li>req.body / req.cookies：获得「请求主体」/ Cookies</li>
<li>req.fresh / req.stale：判断请求是否还「新鲜」</li>
<li>req.hostname / req.ip：获取主机名和IP地址</li>
<li>req.originalUrl：获取原始请求URL</li>
<li>req.params：获取路由的parameters</li>
<li>req.path：获取请求路径</li>
<li>req.protocol：获取协议类型</li>
<li>req.query：获取URL的查询参数串</li>
<li>req.route：获取当前匹配的路由</li>
<li>req.subdomains：获取子域名</li>
<li>req.accepts()：检查可接受的请求的文档类型</li>
<li>req.acceptsCharsets / req.acceptsEncodings / req.acceptsLanguages：返回指定字符集的第一个可接受字符编码</li>
<li>req.get()：获取指定的HTTP请求头</li>
<li>req.is()：判断请求头Content-Type的MIME类型</li>
</ol>
<p>response 对象常用属性</p>
<ol>
<li>res.app：同req.app一样</li>
<li>res.append()：追加指定HTTP头</li>
<li>res.set()在res.append()后将重置之前设置的头</li>
<li>res.cookie(name，value [，option])：设置Cookie</li>
<li>opition: domain / expires / httpOnly / maxAge / path / secure / signed</li>
<li>res.clearCookie()：清除Cookie</li>
<li>res.download()：传送指定路径的文件</li>
<li>res.get()：返回指定的HTTP头</li>
<li>res.json()：传送JSON响应</li>
<li>res.jsonp()：传送JSONP响应</li>
<li>res.location()：只设置响应的Location HTTP头，不设置状态码或者close response</li>
<li>res.redirect()：设置响应的Location HTTP头，并且设置状态码302</li>
<li>res.render(view,[locals],callback)：渲染一个view，同时向callback传递渲染后的字符串，如果在渲染过程中有错误发生next(err)将会被自动调用。callback将会被传入一个可能发生的错误以及渲染后的页面，这样就不会自动输出了。</li>
<li>res.send()：传送HTTP响应</li>
<li>res.sendFile(path [，options] [，fn])：传送指定路径的文件 -会自动根据文件extension设定Content-Type</li>
<li>res.set()：设置HTTP头，传入object可以一次设置多个头</li>
<li>res.status()：设置HTTP状态码</li>
<li>res.type()：设置Content-Type的MIME类型</li>
</ol>
<h3 id="静态文件" tabindex="-1"><a class="header-anchor" href="#静态文件" aria-hidden="true">#</a> 静态文件</h3>
<p>Express 提供了内置的中间件 express.static 来设置静态文件</p>
<p>如果将图片， CSS, JavaScript 文件放在 public 目录下
通过 <code>app.use('/public', express.static('public')); </code> 访问目录下的文件</p>
<p>访问<code> http://127.0.0.1:8081/public/images/logo.png</code> 可以看到public下的静态文件图片</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> express <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'express'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> app <span class="token operator">=</span> <span class="token function">express</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span><span class="token string">'/public'</span><span class="token punctuation">,</span> express<span class="token punctuation">.</span><span class="token function">static</span><span class="token punctuation">(</span><span class="token string">'public'</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 
app<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">'/'</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">req<span class="token punctuation">,</span> res</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   res<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span><span class="token string">'Hello World'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token keyword">var</span> server <span class="token operator">=</span> app<span class="token punctuation">.</span><span class="token function">listen</span><span class="token punctuation">(</span><span class="token number">8081</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
 
  <span class="token keyword">var</span> host <span class="token operator">=</span> server<span class="token punctuation">.</span><span class="token function">address</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>address
  <span class="token keyword">var</span> port <span class="token operator">=</span> server<span class="token punctuation">.</span><span class="token function">address</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>port
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"应用实例，访问地址为 http://%s:%s"</span><span class="token punctuation">,</span> host<span class="token punctuation">,</span> port<span class="token punctuation">)</span>
 
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><h3 id="文件上传" tabindex="-1"><a class="header-anchor" href="#文件上传" aria-hidden="true">#</a> 文件上传</h3>
<p>index.html：创建一个用于上传文件的表单，使用 POST 方法，表单 enctype 属性设置为 multipart/form-data</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">></span></span>文件上传表单<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h3</span><span class="token punctuation">></span></span>文件上传：<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h3</span><span class="token punctuation">></span></span>
    选择一个文件上传: <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>br</span> <span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>form</span> <span class="token attr-name">action</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>/file_upload<span class="token punctuation">"</span></span> <span class="token attr-name">method</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>post<span class="token punctuation">"</span></span> <span class="token attr-name">enctype</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>multipart/form-data<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>file<span class="token punctuation">"</span></span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>image<span class="token punctuation">"</span></span> <span class="token attr-name">size</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>50<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>br</span> <span class="token punctuation">/></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>submit<span class="token punctuation">"</span></span> <span class="token attr-name">value</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>上传文件<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>form</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><p>server.js：用于接收来自前端页面的文件上传请求，保存上传的文件，并返回上传成功信息。</p>
<ol>
<li>引入body-parser中间件和multer模块，用于解析post请求传输的表单数据（包括文件）。</li>
<li>在 <code>'/public'</code> 下提供静态资源服务，指定body-parser的解析方式，以及multer接收文件的存储路径和上传文件的字段名。</li>
<li>当发起POST请求访问 <code>/file_upload</code> 时，将文件保存到同级目录中，并返回一个JSON对象表示上传成功信息。</li>
</ol>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> express <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'express'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> app <span class="token operator">=</span> <span class="token function">express</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> fs <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"fs"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">var</span> bodyParser <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'body-parser'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> multer  <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'multer'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span><span class="token string">'/public'</span><span class="token punctuation">,</span> express<span class="token punctuation">.</span><span class="token function">static</span><span class="token punctuation">(</span><span class="token string">'public'</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>bodyParser<span class="token punctuation">.</span><span class="token function">urlencoded</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">extended</span><span class="token operator">:</span> <span class="token boolean">false</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span><span class="token function">multer</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">dest</span><span class="token operator">:</span> <span class="token string">'/tmp/'</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">array</span><span class="token punctuation">(</span><span class="token string">'image'</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

app<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">'/index.html'</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">req<span class="token punctuation">,</span> res</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   res<span class="token punctuation">.</span><span class="token function">sendFile</span><span class="token punctuation">(</span> __dirname <span class="token operator">+</span> <span class="token string">"/"</span> <span class="token operator">+</span> <span class="token string">"index.html"</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

app<span class="token punctuation">.</span><span class="token function">post</span><span class="token punctuation">(</span><span class="token string">'/file_upload'</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">req<span class="token punctuation">,</span> res</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>req<span class="token punctuation">.</span>files<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// 上传的文件信息</span>
   <span class="token keyword">var</span> des_file <span class="token operator">=</span> __dirname <span class="token operator">+</span> <span class="token string">"/"</span> <span class="token operator">+</span> req<span class="token punctuation">.</span>files<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>originalname<span class="token punctuation">;</span>
   fs<span class="token punctuation">.</span><span class="token function">readFile</span><span class="token punctuation">(</span> req<span class="token punctuation">.</span>files<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>path<span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">err<span class="token punctuation">,</span> data</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        fs<span class="token punctuation">.</span><span class="token function">writeFile</span><span class="token punctuation">(</span>des_file<span class="token punctuation">,</span> data<span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">err</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
         <span class="token keyword">if</span><span class="token punctuation">(</span> err <span class="token punctuation">)</span><span class="token punctuation">{</span>
              console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span> err <span class="token punctuation">)</span><span class="token punctuation">;</span>
         <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
               response <span class="token operator">=</span> <span class="token punctuation">{</span>
                   <span class="token literal-property property">message</span><span class="token operator">:</span><span class="token string">'File uploaded successfully'</span><span class="token punctuation">,</span> 
                   <span class="token literal-property property">filename</span><span class="token operator">:</span>req<span class="token punctuation">.</span>files<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>originalname
              <span class="token punctuation">}</span><span class="token punctuation">;</span>
          <span class="token punctuation">}</span>
          console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span> response <span class="token punctuation">)</span><span class="token punctuation">;</span>
          res<span class="token punctuation">.</span><span class="token function">end</span><span class="token punctuation">(</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span> response <span class="token punctuation">)</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>
       <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">var</span> server <span class="token operator">=</span> app<span class="token punctuation">.</span><span class="token function">listen</span><span class="token punctuation">(</span><span class="token number">8081</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> host <span class="token operator">=</span> server<span class="token punctuation">.</span><span class="token function">address</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>address
  <span class="token keyword">var</span> port <span class="token operator">=</span> server<span class="token punctuation">.</span><span class="token function">address</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>port
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"应用实例，访问地址为 http://%s:%s"</span><span class="token punctuation">,</span> host<span class="token punctuation">,</span> port<span class="token punctuation">)</span>
 
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br></div></div><h3 id="cookie-管理" tabindex="-1"><a class="header-anchor" href="#cookie-管理" aria-hidden="true">#</a> cookie 管理</h3>
<p>使用中间件向 Node.js 服务器发送 cookie 信息</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// express_cookie.js 文件</span>
<span class="token keyword">var</span> express <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'express'</span><span class="token punctuation">)</span>
<span class="token keyword">var</span> cookieParser <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'cookie-parser'</span><span class="token punctuation">)</span>
<span class="token keyword">var</span> util <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'util'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 
<span class="token keyword">var</span> app <span class="token operator">=</span> <span class="token function">express</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span><span class="token function">cookieParser</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
 
app<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">'/'</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">req<span class="token punctuation">,</span> res</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"Cookies: "</span> <span class="token operator">+</span> util<span class="token punctuation">.</span><span class="token function">inspect</span><span class="token punctuation">(</span>req<span class="token punctuation">.</span>cookies<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
 
app<span class="token punctuation">.</span><span class="token function">listen</span><span class="token punctuation">(</span><span class="token number">8081</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><h2 id="restful-api" tabindex="-1"><a class="header-anchor" href="#restful-api" aria-hidden="true">#</a> RESTful API</h2>
<p>REST即表述性状态传递（英文：Representational State Transfer，简称REST）是一种软件架构风格。</p>
<p>HTTP 方法，REST 基本架构的四个方法：GET、PUT、DELETE、POST</p>
<p>示例</p>
<table>
<thead>
<tr>
<th>URI</th>
<th>HTTP 方法</th>
<th>发送内容</th>
<th>结果</th>
</tr>
</thead>
<tbody>
<tr>
<td>listUsers</td>
<td>GET</td>
<td>空</td>
<td>显示所有用户列表</td>
</tr>
<tr>
<td>addUser</td>
<td>POST</td>
<td>JSON 字符串</td>
<td>添加新用户</td>
</tr>
<tr>
<td>deleteUser</td>
<td>DELETE</td>
<td>JSON 字符串</td>
<td>删除用户</td>
</tr>
<tr>
<td>:id</td>
<td>GET</td>
<td>空</td>
<td>显示用户详细信息</td>
</tr>
</tbody>
</table>
<p>user.json</p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
   <span class="token property">"user1"</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">"name"</span> <span class="token operator">:</span> <span class="token string">"mahesh"</span><span class="token punctuation">,</span>
      <span class="token property">"password"</span> <span class="token operator">:</span> <span class="token string">"password1"</span><span class="token punctuation">,</span>
      <span class="token property">"profession"</span> <span class="token operator">:</span> <span class="token string">"teacher"</span><span class="token punctuation">,</span>
      <span class="token property">"id"</span><span class="token operator">:</span> <span class="token number">1</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>server.js</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> express <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'express'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> app <span class="token operator">=</span> <span class="token function">express</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> fs <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"fs"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 获取用户列表</span>
app<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">'/listUsers'</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">req<span class="token punctuation">,</span> res</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   fs<span class="token punctuation">.</span><span class="token function">readFile</span><span class="token punctuation">(</span> __dirname <span class="token operator">+</span> <span class="token string">"/"</span> <span class="token operator">+</span> <span class="token string">"users.json"</span><span class="token punctuation">,</span> <span class="token string">'utf8'</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">err<span class="token punctuation">,</span> data</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
       console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span> data <span class="token punctuation">)</span><span class="token punctuation">;</span>
       res<span class="token punctuation">.</span><span class="token function">end</span><span class="token punctuation">(</span> data <span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>


<span class="token comment">//添加的新用户数据</span>
<span class="token keyword">var</span> user <span class="token operator">=</span> <span class="token punctuation">{</span>
   <span class="token string-property property">"user2"</span> <span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token string-property property">"name"</span> <span class="token operator">:</span> <span class="token string">"mohit"</span><span class="token punctuation">,</span>
      <span class="token string-property property">"password"</span> <span class="token operator">:</span> <span class="token string">"password2"</span><span class="token punctuation">,</span>
      <span class="token string-property property">"profession"</span> <span class="token operator">:</span> <span class="token string">"teacher"</span><span class="token punctuation">,</span>
      <span class="token string-property property">"id"</span><span class="token operator">:</span> <span class="token number">2</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
app<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">'/addUser'</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">req<span class="token punctuation">,</span> res</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   <span class="token comment">// 读取已存在的数据</span>
   fs<span class="token punctuation">.</span><span class="token function">readFile</span><span class="token punctuation">(</span> __dirname <span class="token operator">+</span> <span class="token string">"/"</span> <span class="token operator">+</span> <span class="token string">"users.json"</span><span class="token punctuation">,</span> <span class="token string">'utf8'</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">err<span class="token punctuation">,</span> data</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
       data <span class="token operator">=</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span> data <span class="token punctuation">)</span><span class="token punctuation">;</span>
       data<span class="token punctuation">[</span><span class="token string">"user2"</span><span class="token punctuation">]</span> <span class="token operator">=</span> user<span class="token punctuation">[</span><span class="token string">"user2"</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
       console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span> data <span class="token punctuation">)</span><span class="token punctuation">;</span>
       res<span class="token punctuation">.</span><span class="token function">end</span><span class="token punctuation">(</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token comment">// 显示用户详情</span>
app<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">'/:id'</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">req<span class="token punctuation">,</span> res</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   <span class="token comment">// 首先我们读取已存在的用户</span>
   fs<span class="token punctuation">.</span><span class="token function">readFile</span><span class="token punctuation">(</span> __dirname <span class="token operator">+</span> <span class="token string">"/"</span> <span class="token operator">+</span> <span class="token string">"users.json"</span><span class="token punctuation">,</span> <span class="token string">'utf8'</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">err<span class="token punctuation">,</span> data</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
       data <span class="token operator">=</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span> data <span class="token punctuation">)</span><span class="token punctuation">;</span>
       <span class="token keyword">var</span> user <span class="token operator">=</span> data<span class="token punctuation">[</span><span class="token string">"user"</span> <span class="token operator">+</span> req<span class="token punctuation">.</span>params<span class="token punctuation">.</span>id<span class="token punctuation">]</span> 
       console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span> user <span class="token punctuation">)</span><span class="token punctuation">;</span>
       res<span class="token punctuation">.</span><span class="token function">end</span><span class="token punctuation">(</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span>user<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token keyword">var</span> id <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
<span class="token comment">// 删除用户</span>
app<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">'/deleteUser'</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">req<span class="token punctuation">,</span> res</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   <span class="token comment">// First read existing users.</span>
   fs<span class="token punctuation">.</span><span class="token function">readFile</span><span class="token punctuation">(</span> __dirname <span class="token operator">+</span> <span class="token string">"/"</span> <span class="token operator">+</span> <span class="token string">"users.json"</span><span class="token punctuation">,</span> <span class="token string">'utf8'</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">err<span class="token punctuation">,</span> data</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
       data <span class="token operator">=</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span> data <span class="token punctuation">)</span><span class="token punctuation">;</span>
       <span class="token keyword">delete</span> data<span class="token punctuation">[</span><span class="token string">"user"</span> <span class="token operator">+</span> id<span class="token punctuation">]</span><span class="token punctuation">;</span>
       console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span> data <span class="token punctuation">)</span><span class="token punctuation">;</span>
       res<span class="token punctuation">.</span><span class="token function">end</span><span class="token punctuation">(</span> <span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token keyword">var</span> server <span class="token operator">=</span> app<span class="token punctuation">.</span><span class="token function">listen</span><span class="token punctuation">(</span><span class="token number">8081</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> host <span class="token operator">=</span> server<span class="token punctuation">.</span><span class="token function">address</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>address
  <span class="token keyword">var</span> port <span class="token operator">=</span> server<span class="token punctuation">.</span><span class="token function">address</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>port
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"应用实例，访问地址为 http://%s:%s"</span><span class="token punctuation">,</span> host<span class="token punctuation">,</span> port<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br></div></div><h2 id="多进程" tabindex="-1"><a class="header-anchor" href="#多进程" aria-hidden="true">#</a> 多进程</h2>
<p>Node.js 是以单线程的模式运行的，但它使用的是事件驱动来处理并发，这样有助于我们在多核 cpu 的系统上创建多个子进程，从而提高性能。</p>
<p>每个子进程总是带有三个流对象：child.stdin, child.stdout 和child.stderr。他们可能会共享父进程的 stdio 流，或者也可以是独立的被导流的流对象。</p>
<p>Node 提供了 <code>child_process</code> 模块来创建子进程，方法有：</p>
<p><strong>exec - child_process.exec</strong>、
使用子进程执行命令，缓存子进程的输出，并将子进程的输出以
回调函数参数的形式返回。</p>
<p>示例：创建两个 js 文件 support.js 和 master.js</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// support.js</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"进程 "</span> <span class="token operator">+</span> process<span class="token punctuation">.</span>argv<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span> <span class="token operator">+</span> <span class="token string">" 执行。"</span> <span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// master.js</span>
<span class="token keyword">const</span> fs <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'fs'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> child_process <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'child_process'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 
<span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">var</span> i<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span> i<span class="token operator">&lt;</span><span class="token number">3</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> workerProcess <span class="token operator">=</span> child_process<span class="token punctuation">.</span><span class="token function">exec</span><span class="token punctuation">(</span><span class="token string">'node support.js '</span><span class="token operator">+</span>i<span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">error<span class="token punctuation">,</span> stdout<span class="token punctuation">,</span> stderr</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>error<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>error<span class="token punctuation">.</span>stack<span class="token punctuation">)</span><span class="token punctuation">;</span>
            console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'Error code: '</span><span class="token operator">+</span>error<span class="token punctuation">.</span>code<span class="token punctuation">)</span><span class="token punctuation">;</span>
            console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'Signal received: '</span><span class="token operator">+</span>error<span class="token punctuation">.</span>signal<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'stdout: '</span> <span class="token operator">+</span> stdout<span class="token punctuation">)</span><span class="token punctuation">;</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'stderr: '</span> <span class="token operator">+</span> stderr<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 
    workerProcess<span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">'exit'</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">code</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'子进程已退出，退出码 '</span><span class="token operator">+</span>code<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 运行输出</span>
<span class="token comment">// node master.js </span>
<span class="token comment">// 子进程已退出，退出码 0</span>
<span class="token comment">// stdout: 进程 1 执行。</span>

<span class="token comment">// stderr: </span>
<span class="token comment">// 子进程已退出，退出码 0</span>
<span class="token comment">// stdout: 进程 0 执行。</span>

<span class="token comment">// stderr: </span>
<span class="token comment">// 子进程已退出，退出码 0</span>
<span class="token comment">// stdout: 进程 2 执行。</span>

<span class="token comment">// stderr: </span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br></div></div><p><strong>spawn - child_process.spawn</strong>
使用指定的命令行参数创建新进程。</p>
<p>示例：创建两个 js 文件 support.js(同exec()方法示例) 和 master.js</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> fs <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'fs'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> child_process <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'child_process'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 
<span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">var</span> i<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span> i<span class="token operator">&lt;</span><span class="token number">3</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> workerProcess <span class="token operator">=</span> child_process<span class="token punctuation">.</span><span class="token function">exec</span><span class="token punctuation">(</span><span class="token string">'node support.js '</span><span class="token operator">+</span>i<span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">error<span class="token punctuation">,</span> stdout<span class="token punctuation">,</span> stderr</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>error<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>error<span class="token punctuation">.</span>stack<span class="token punctuation">)</span><span class="token punctuation">;</span>
            console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'Error code: '</span><span class="token operator">+</span>error<span class="token punctuation">.</span>code<span class="token punctuation">)</span><span class="token punctuation">;</span>
            console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'Signal received: '</span><span class="token operator">+</span>error<span class="token punctuation">.</span>signal<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'stdout: '</span> <span class="token operator">+</span> stdout<span class="token punctuation">)</span><span class="token punctuation">;</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'stderr: '</span> <span class="token operator">+</span> stderr<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 
    workerProcess<span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">'exit'</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">code</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'子进程已退出，退出码 '</span><span class="token operator">+</span>code<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 运行结果</span>
<span class="token comment">// node master.js stdout: 进程 0 执行。</span>

<span class="token comment">// 子进程已退出，退出码 0</span>
<span class="token comment">// stdout: 进程 1 执行。</span>

<span class="token comment">// 子进程已退出，退出码 0</span>
<span class="token comment">// stdout: 进程 2 执行。</span>

<span class="token comment">// 子进程已退出，退出码 0 </span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br></div></div><p><strong>fork - child_process.fork</strong>
是 spawn()的特殊形式，用于在子进程中运行的模块，如 fork('./son.js') 相当于 spawn('node', ['./son.js']) 。与spawn方法不同的是，fork会在父进程与子进程之间，建立一个通信管道，用于进程之间的通信。</p>
<p>示例：创建两个 js 文件 support.js(同exec()方法示例) 和 master.js</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> fs <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'fs'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> child_process <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'child_process'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 
<span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">var</span> i<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span> i<span class="token operator">&lt;</span><span class="token number">3</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   <span class="token keyword">var</span> worker_process <span class="token operator">=</span> child_process<span class="token punctuation">.</span><span class="token function">fork</span><span class="token punctuation">(</span><span class="token string">"support.js"</span><span class="token punctuation">,</span> <span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>    
 
   worker_process<span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span><span class="token string">'close'</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">code</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'子进程已退出，退出码 '</span> <span class="token operator">+</span> code<span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">//运行结果</span>
<span class="token comment">// node master.js </span>
<span class="token comment">// 进程 0 执行。</span>
<span class="token comment">// 子进程已退出，退出码 0</span>
<span class="token comment">// 进程 1 执行。</span>
<span class="token comment">// 子进程已退出，退出码 0</span>
<span class="token comment">// 进程 2 执行。</span>
<span class="token comment">// 子进程已退出，退出码 0</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div><table>
<thead>
<tr>
<th>方法</th>
<th>描述</th>
</tr>
</thead>
<tbody>
<tr>
<td>exec()</td>
<td>child_process.exec 使用子进程执行命令，缓存子进程的输出，并将子进程的输出以回调函数参数的形式返回。</td>
</tr>
<tr>
<td>spawn()</td>
<td>child_process.spawn 使用指定的命令行参数创建新进程</td>
</tr>
<tr>
<td>fork()</td>
<td>child_process.fork 是 spawn() 方法的特殊形式，用于创建进程</td>
</tr>
</tbody>
</table>
<h2 id="连接-mysql" tabindex="-1"><a class="header-anchor" href="#连接-mysql" aria-hidden="true">#</a> 连接 MySQL</h2>
<h3 id="安装驱动" tabindex="-1"><a class="header-anchor" href="#安装驱动" aria-hidden="true">#</a> 安装驱动</h3>
<p><code>npm install mysql</code></p>
<h3 id="mysql数据库操作-curd" tabindex="-1"><a class="header-anchor" href="#mysql数据库操作-curd" aria-hidden="true">#</a> MySQL数据库操作( CURD )</h3>
<p>CURD 示例</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">SET</span> NAMES utf8<span class="token punctuation">;</span>
<span class="token keyword">SET</span> FOREIGN_KEY_CHECKS <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> <span class="token operator">-</span> 表和表之间建立的外键约束，导致无法删除表及修改表结构，导入数据时需要先取消外键约束

<span class="token keyword">DROP</span> <span class="token keyword">TABLE</span> <span class="token keyword">IF</span> <span class="token keyword">EXISTS</span> <span class="token identifier"><span class="token punctuation">`</span>websites<span class="token punctuation">`</span></span><span class="token punctuation">;</span>
<span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> <span class="token identifier"><span class="token punctuation">`</span>websites<span class="token punctuation">`</span></span> <span class="token punctuation">(</span>
  <span class="token identifier"><span class="token punctuation">`</span>id<span class="token punctuation">`</span></span> <span class="token keyword">int</span><span class="token punctuation">(</span><span class="token number">11</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">AUTO_INCREMENT</span><span class="token punctuation">,</span>
  <span class="token identifier"><span class="token punctuation">`</span>name<span class="token punctuation">`</span></span> <span class="token keyword">char</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">DEFAULT</span> <span class="token string">''</span> <span class="token keyword">COMMENT</span> <span class="token string">'站点名称'</span><span class="token punctuation">,</span>
  <span class="token identifier"><span class="token punctuation">`</span>url<span class="token punctuation">`</span></span> <span class="token keyword">varchar</span><span class="token punctuation">(</span><span class="token number">255</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">DEFAULT</span> <span class="token string">''</span><span class="token punctuation">,</span>
  <span class="token identifier"><span class="token punctuation">`</span>alexa<span class="token punctuation">`</span></span> <span class="token keyword">int</span><span class="token punctuation">(</span><span class="token number">11</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">DEFAULT</span> <span class="token string">'0'</span> <span class="token keyword">COMMENT</span> <span class="token string">'Alexa 排名'</span><span class="token punctuation">,</span>
  <span class="token identifier"><span class="token punctuation">`</span>country<span class="token punctuation">`</span></span> <span class="token keyword">char</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">DEFAULT</span> <span class="token string">''</span> <span class="token keyword">COMMENT</span> <span class="token string">'国家'</span><span class="token punctuation">,</span>
  <span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span> <span class="token punctuation">(</span><span class="token identifier"><span class="token punctuation">`</span>id<span class="token punctuation">`</span></span><span class="token punctuation">)</span>
<span class="token punctuation">)</span> <span class="token keyword">ENGINE</span><span class="token operator">=</span><span class="token keyword">InnoDB</span> <span class="token keyword">AUTO_INCREMENT</span><span class="token operator">=</span><span class="token number">6</span> <span class="token keyword">DEFAULT</span> <span class="token keyword">CHARSET</span><span class="token operator">=</span>utf8<span class="token punctuation">;</span>

<span class="token keyword">BEGIN</span><span class="token punctuation">;</span>
<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> <span class="token identifier"><span class="token punctuation">`</span>websites<span class="token punctuation">`</span></span> <span class="token keyword">VALUES</span> <span class="token punctuation">(</span><span class="token string">'1'</span><span class="token punctuation">,</span> <span class="token string">'淘宝'</span><span class="token punctuation">,</span> <span class="token string">'https://www.taobao.com/'</span><span class="token punctuation">,</span> <span class="token string">'13'</span><span class="token punctuation">,</span> <span class="token string">'CN'</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token string">'2'</span><span class="token punctuation">,</span> <span class="token string">'微博'</span><span class="token punctuation">,</span> <span class="token string">'http://weibo.com/'</span><span class="token punctuation">,</span> <span class="token string">'20'</span><span class="token punctuation">,</span> <span class="token string">'CN'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">COMMIT</span><span class="token punctuation">;</span>

<span class="token keyword">SET</span> FOREIGN_KEY_CHECKS <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> <span class="token operator">-</span> 数据导入后再设置外键约束
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div><p>数据库操作： <code>query(sql, sql_param, callback_function)</code></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> mysql <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'mysql'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  
<span class="token keyword">var</span> connection <span class="token operator">=</span> mysql<span class="token punctuation">.</span><span class="token function">createConnection</span><span class="token punctuation">(</span><span class="token punctuation">{</span>     
  <span class="token literal-property property">host</span><span class="token operator">:</span> <span class="token string">'localhost'</span><span class="token punctuation">,</span>       
  <span class="token literal-property property">user</span><span class="token operator">:</span> <span class="token string">'root'</span><span class="token punctuation">,</span>              
  <span class="token literal-property property">password</span><span class="token operator">:</span> <span class="token string">'123456'</span><span class="token punctuation">,</span>       
  <span class="token literal-property property">port</span><span class="token operator">:</span> <span class="token string">'3306'</span><span class="token punctuation">,</span>                   
  <span class="token literal-property property">database</span><span class="token operator">:</span> <span class="token string">'test'</span> 
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
connection<span class="token punctuation">.</span><span class="token function">connect</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 插入数据</span>
<span class="token keyword">var</span>  addSql <span class="token operator">=</span> <span class="token string">'INSERT INTO websites(Id,name,url,alexa,country) VALUES(0,?,?,?,?)'</span><span class="token punctuation">;</span>
<span class="token keyword">var</span>  addSqlParams <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">'nodejs'</span><span class="token punctuation">,</span> <span class="token string">'https://nodejs.org'</span><span class="token punctuation">,</span><span class="token string">'666666'</span><span class="token punctuation">,</span> <span class="token string">'CN'</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
connection<span class="token punctuation">.</span><span class="token function">query</span><span class="token punctuation">(</span>addSql<span class="token punctuation">,</span>addSqlParams<span class="token punctuation">,</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">err<span class="token punctuation">,</span> result</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'[INSERT ERROR] - '</span><span class="token punctuation">,</span>err<span class="token punctuation">.</span>message<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>        
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'INSERT ID:'</span><span class="token punctuation">,</span>result<span class="token punctuation">)</span><span class="token punctuation">;</span>        
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 修改数据</span>
<span class="token keyword">var</span> modSql <span class="token operator">=</span> <span class="token string">'UPDATE websites SET name = ? WHERE Id = ?'</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> modSqlParams <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">'nodejs666'</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
connection<span class="token punctuation">.</span><span class="token function">query</span><span class="token punctuation">(</span>modSql<span class="token punctuation">,</span>modSqlParams<span class="token punctuation">,</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">err<span class="token punctuation">,</span> result</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   <span class="token keyword">if</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">{</span>
         console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'[UPDATE ERROR] - '</span><span class="token punctuation">,</span>err<span class="token punctuation">.</span>message<span class="token punctuation">)</span><span class="token punctuation">;</span>
         <span class="token keyword">return</span><span class="token punctuation">;</span>
   <span class="token punctuation">}</span>        
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'UPDATE affectedRows'</span><span class="token punctuation">,</span>result<span class="token punctuation">.</span>affectedRows<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 查询数据</span>
<span class="token keyword">var</span> sql <span class="token operator">=</span> <span class="token string">'SELECT * FROM websites'</span><span class="token punctuation">;</span>
connection<span class="token punctuation">.</span><span class="token function">query</span><span class="token punctuation">(</span>sql<span class="token punctuation">,</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">err<span class="token punctuation">,</span> result</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'[SELECT ERROR] - '</span><span class="token punctuation">,</span>err<span class="token punctuation">.</span>message<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 查询结果</span>
<span class="token comment">// [ RowDataPacket {</span>
<span class="token comment">//     id: 0,</span>
<span class="token comment">//     name: 'nodejs666',</span>
<span class="token comment">//     url: 'https://nodejs.org',</span>
<span class="token comment">//     alexa: 666666,</span>
<span class="token comment">//     country: 'CN' }</span>
<span class="token comment">// ]</span>

<span class="token comment">// 删除数据</span>
<span class="token keyword">var</span> delSql <span class="token operator">=</span> <span class="token string">'DELETE FROM websites where id=0'</span><span class="token punctuation">;</span>
connection<span class="token punctuation">.</span><span class="token function">query</span><span class="token punctuation">(</span>delSql<span class="token punctuation">,</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">err<span class="token punctuation">,</span> result</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'[DELETE ERROR] - '</span><span class="token punctuation">,</span>err<span class="token punctuation">.</span>message<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>        
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'DELETE affectedRows'</span><span class="token punctuation">,</span>result<span class="token punctuation">.</span>affectedRows<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

connection<span class="token punctuation">.</span><span class="token function">end</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br></div></div><h2 id="连接-mongodb" tabindex="-1"><a class="header-anchor" href="#连接-mongodb" aria-hidden="true">#</a> 连接 MongoDB</h2>
<h3 id="安装驱动-1" tabindex="-1"><a class="header-anchor" href="#安装驱动-1" aria-hidden="true">#</a> 安装驱动</h3>
<p><code>npm install mongodb</code></p>
<h3 id="创建数据库和集合" tabindex="-1"><a class="header-anchor" href="#创建数据库和集合" aria-hidden="true">#</a> 创建数据库和集合</h3>
<p>使用 <code>MongoClient</code> 对象对数据库进行操作，MongoDB 会自动创建数据库和集合</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> MongoClient <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'mongodb'</span><span class="token punctuation">)</span><span class="token punctuation">.</span>MongoClient<span class="token punctuation">;</span>
<span class="token keyword">var</span> url <span class="token operator">=</span> <span class="token string">"mongodb://localhost:27017/nodejs"</span><span class="token punctuation">;</span>
 
MongoClient<span class="token punctuation">.</span><span class="token function">connect</span><span class="token punctuation">(</span>url<span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">err<span class="token punctuation">,</span> db</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token keyword">throw</span> err<span class="token punctuation">;</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"数据库已创建!"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">var</span> dbase <span class="token operator">=</span> db<span class="token punctuation">.</span><span class="token function">db</span><span class="token punctuation">(</span><span class="token string">"nodejs"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    dbase<span class="token punctuation">.</span><span class="token function">createCollection</span><span class="token punctuation">(</span><span class="token string">'site'</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">err<span class="token punctuation">,</span> res</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token keyword">throw</span> err<span class="token punctuation">;</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"创建集合!"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        db<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><h3 id="mongodb数据库操作-curd" tabindex="-1"><a class="header-anchor" href="#mongodb数据库操作-curd" aria-hidden="true">#</a> MongoDB数据库操作( CURD )</h3>
<p>数据库操作</p>
<table>
<thead>
<tr>
<th>操作</th>
<th>功能</th>
</tr>
</thead>
<tbody>
<tr>
<td>insertOne()</td>
<td>插入一条数据</td>
</tr>
<tr>
<td>insertMany()</td>
<td>插入多条数据</td>
</tr>
<tr>
<td>find()</td>
<td>可以返回匹配条件的所有数据</td>
</tr>
<tr>
<td>updateOne()</td>
<td>更新一条数据</td>
</tr>
<tr>
<td>updateMany()</td>
<td>更新所有符合条的文档数据</td>
</tr>
<tr>
<td>deleteOne()</td>
<td>删除一条文档数据</td>
</tr>
<tr>
<td>deleteMany()</td>
<td>删除多条文档数据</td>
</tr>
<tr>
<td>sort()</td>
<td>该方法接受一个参数，规定是升序(1)还是降序(-1)</td>
</tr>
<tr>
<td>limit()</td>
<td>设置指定的返回条数，实现分页查询</td>
</tr>
<tr>
<td>drop()</td>
<td>删除集合</td>
</tr>
<tr>
<td>$lookup</td>
<td>左连接</td>
</tr>
</tbody>
</table>
<p>CURD 操作示例</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> MongoClient <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'mongodb'</span><span class="token punctuation">)</span><span class="token punctuation">.</span>MongoClient<span class="token punctuation">;</span>
<span class="token keyword">var</span> url <span class="token operator">=</span> <span class="token string">"mongodb://localhost:27017/"</span><span class="token punctuation">;</span>
 
MongoClient<span class="token punctuation">.</span><span class="token function">connect</span><span class="token punctuation">(</span>url<span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">err<span class="token punctuation">,</span> db</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token keyword">throw</span> err<span class="token punctuation">;</span>
    <span class="token keyword">var</span> dbo <span class="token operator">=</span> db<span class="token punctuation">.</span><span class="token function">db</span><span class="token punctuation">(</span><span class="token string">"nodejs"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">add_one</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 添加一条数据</span>
    <span class="token function">add_many</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 添加多条数据</span>
    <span class="token function">select</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 按条件查询数据</span>
    <span class="token function">update_one</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 更新一条数据</span>
    <span class="token function">updata_many</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 更新多条数据</span>
    <span class="token function">delete_one</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 删除一条数据</span>
    <span class="token function">delete_many</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 删除符合条件的多条数据</span>
    <span class="token function">sort</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 按照字段排序</span>
    <span class="token function">page</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 分页查询</span>
    <span class="token function">left_join</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 进行左连接操作</span>
    <span class="token function">drop_collection</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 删除集合</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
db<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">function</span> <span class="token function">add_one</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> myobj <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">"nodejs官网"</span><span class="token punctuation">,</span> <span class="token literal-property property">url</span><span class="token operator">:</span> <span class="token string">"www.nodejs"</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
    dbo<span class="token punctuation">.</span><span class="token function">collection</span><span class="token punctuation">(</span><span class="token string">"site"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">insertOne</span><span class="token punctuation">(</span>myobj<span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">err<span class="token punctuation">,</span> res</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token keyword">throw</span> err<span class="token punctuation">;</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"文档插入成功"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">add_many</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> myobj <span class="token operator">=</span>  <span class="token punctuation">[</span>
        <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'nodejs'</span><span class="token punctuation">,</span> <span class="token literal-property property">url</span><span class="token operator">:</span> <span class="token string">'https://nodejs.org'</span><span class="token punctuation">,</span> <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">'cn'</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'Google'</span><span class="token punctuation">,</span> <span class="token literal-property property">url</span><span class="token operator">:</span> <span class="token string">'https://www.google.com'</span><span class="token punctuation">,</span> <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">'en'</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'Facebook'</span><span class="token punctuation">,</span> <span class="token literal-property property">url</span><span class="token operator">:</span> <span class="token string">'https://www.google.com'</span><span class="token punctuation">,</span> <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">'en'</span><span class="token punctuation">}</span>
       <span class="token punctuation">]</span><span class="token punctuation">;</span>
    dbo<span class="token punctuation">.</span><span class="token function">collection</span><span class="token punctuation">(</span><span class="token string">"site"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">insertMany</span><span class="token punctuation">(</span>myobj<span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">err<span class="token punctuation">,</span> res</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token keyword">throw</span> err<span class="token punctuation">;</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"插入的文档数量为: "</span> <span class="token operator">+</span> res<span class="token punctuation">.</span>insertedCount<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">select</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> whereStr <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token string-property property">"name"</span><span class="token operator">:</span><span class="token string">'nodejs'</span><span class="token punctuation">}</span><span class="token punctuation">;</span>  <span class="token comment">// 查询条件</span>
    dbo<span class="token punctuation">.</span><span class="token function">collection</span><span class="token punctuation">(</span><span class="token string">"site"</span><span class="token punctuation">)</span><span class="token punctuation">.</span> <span class="token function">find</span><span class="token punctuation">(</span>whereStr<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toArray</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">err<span class="token punctuation">,</span> result</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token comment">// 返回集合中所有数据</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token keyword">throw</span> err<span class="token punctuation">;</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">update_one</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> whereStr <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token string-property property">"name"</span><span class="token operator">:</span><span class="token string">'nodejs'</span><span class="token punctuation">}</span><span class="token punctuation">;</span>  <span class="token comment">// 查询条件</span>
    <span class="token keyword">var</span> updateStr <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token literal-property property">$set</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token string-property property">"url"</span> <span class="token operator">:</span> <span class="token string">"https://nodejs.org"</span> <span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
    dbo<span class="token punctuation">.</span><span class="token function">collection</span><span class="token punctuation">(</span><span class="token string">"site"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">updateOne</span><span class="token punctuation">(</span>whereStr<span class="token punctuation">,</span> updateStr<span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">err<span class="token punctuation">,</span> res</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token keyword">throw</span> err<span class="token punctuation">;</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"文档更新成功"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">updata_many</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> whereStr <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token string-property property">"type"</span><span class="token operator">:</span><span class="token string">'en'</span><span class="token punctuation">}</span><span class="token punctuation">;</span>  <span class="token comment">// 查询条件</span>
    <span class="token keyword">var</span> updateStr <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token literal-property property">$set</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token string-property property">"url"</span> <span class="token operator">:</span> <span class="token string">"https://nodejs.org"</span> <span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
    dbo<span class="token punctuation">.</span><span class="token function">collection</span><span class="token punctuation">(</span><span class="token string">"site"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">updateMany</span><span class="token punctuation">(</span>whereStr<span class="token punctuation">,</span> updateStr<span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">err<span class="token punctuation">,</span> res</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token keyword">throw</span> err<span class="token punctuation">;</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>res<span class="token punctuation">.</span>result<span class="token punctuation">.</span>nModified <span class="token operator">+</span> <span class="token string">" 条文档被更新"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">delete_one</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> whereStr <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token string-property property">"name"</span><span class="token operator">:</span><span class="token string">'nodejs'</span><span class="token punctuation">}</span><span class="token punctuation">;</span>  <span class="token comment">// 查询条件</span>
    dbo<span class="token punctuation">.</span><span class="token function">collection</span><span class="token punctuation">(</span><span class="token string">"site"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">deleteOne</span><span class="token punctuation">(</span>whereStr<span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">err<span class="token punctuation">,</span> obj</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token keyword">throw</span> err<span class="token punctuation">;</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"文档删除成功"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">delete_many</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> whereStr <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">"en"</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>  <span class="token comment">// 查询条件</span>
    dbo<span class="token punctuation">.</span><span class="token function">collection</span><span class="token punctuation">(</span><span class="token string">"site"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">deleteMany</span><span class="token punctuation">(</span>whereStr<span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">err<span class="token punctuation">,</span> obj</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token keyword">throw</span> err<span class="token punctuation">;</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>obj<span class="token punctuation">.</span>result<span class="token punctuation">.</span>n <span class="token operator">+</span> <span class="token string">" 条文档被删除"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">sort</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> mysort <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token number">1</span> <span class="token punctuation">}</span><span class="token punctuation">;</span> <span class="token comment">// 按 type 字段升序</span>
    dbo<span class="token punctuation">.</span><span class="token function">collection</span><span class="token punctuation">(</span><span class="token string">"site"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">sort</span><span class="token punctuation">(</span>mysort<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toArray</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">err<span class="token punctuation">,</span> result</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token keyword">throw</span> err<span class="token punctuation">;</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">page</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 跳过前面两条数据，读取两条数据</span>
    dbo<span class="token punctuation">.</span><span class="token function">collection</span><span class="token punctuation">(</span><span class="token string">"site"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">skip</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">limit</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toArray</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">err<span class="token punctuation">,</span> result</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token keyword">throw</span> err<span class="token punctuation">;</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">left_join</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    dbo<span class="token punctuation">.</span><span class="token function">collection</span><span class="token punctuation">(</span><span class="token string">'orders'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">aggregate</span><span class="token punctuation">(</span><span class="token punctuation">[</span>
    <span class="token punctuation">{</span> <span class="token literal-property property">$lookup</span><span class="token operator">:</span>
       <span class="token punctuation">{</span>
         <span class="token literal-property property">from</span><span class="token operator">:</span> <span class="token string">'products'</span><span class="token punctuation">,</span>            <span class="token comment">// 右集合</span>
         <span class="token literal-property property">localField</span><span class="token operator">:</span> <span class="token string">'product_id'</span><span class="token punctuation">,</span>    <span class="token comment">// 左集合 join 字段</span>
         <span class="token literal-property property">foreignField</span><span class="token operator">:</span> <span class="token string">'_id'</span><span class="token punctuation">,</span>         <span class="token comment">// 右集合 join 字段</span>
         <span class="token keyword">as</span><span class="token operator">:</span> <span class="token string">'orderdetails'</span>           <span class="token comment">// 新生成字段（类型array）</span>
       <span class="token punctuation">}</span>
     <span class="token punctuation">}</span>
    <span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toArray</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">err<span class="token punctuation">,</span> res</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token keyword">throw</span> err<span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">stringify</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    db<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">drop_collection</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 删除 test 集合</span>
    dbo<span class="token punctuation">.</span><span class="token function">collection</span><span class="token punctuation">(</span><span class="token string">"test"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">drop</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">err<span class="token punctuation">,</span> delOK</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>  <span class="token comment">// 执行成功 delOK 返回 true，否则返回 false</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token keyword">throw</span> err<span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>delOK<span class="token punctuation">)</span> console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"集合已删除"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        db<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br><span class="line-number">93</span><br><span class="line-number">94</span><br><span class="line-number">95</span><br><span class="line-number">96</span><br><span class="line-number">97</span><br><span class="line-number">98</span><br><span class="line-number">99</span><br><span class="line-number">100</span><br><span class="line-number">101</span><br><span class="line-number">102</span><br><span class="line-number">103</span><br><span class="line-number">104</span><br><span class="line-number">105</span><br><span class="line-number">106</span><br><span class="line-number">107</span><br><span class="line-number">108</span><br><span class="line-number">109</span><br><span class="line-number">110</span><br><span class="line-number">111</span><br><span class="line-number">112</span><br><span class="line-number">113</span><br></div></div><h3 id="使用promise" tabindex="-1"><a class="header-anchor" href="#使用promise" aria-hidden="true">#</a> 使用promise</h3>
<p>目的是更加优雅地书写复杂的异步任务。</p>
<p>使用promise实现四个连续操作：增加 、查询 、更改 、删除。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> MongoClient <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"mongodb"</span><span class="token punctuation">)</span><span class="token punctuation">.</span>MongoClient<span class="token punctuation">;</span>
<span class="token keyword">const</span> url <span class="token operator">=</span> <span class="token string">"mongodb://localhost/"</span><span class="token punctuation">;</span>
MongoClient<span class="token punctuation">.</span><span class="token function">connect</span><span class="token punctuation">(</span>url<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">conn</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"数据库已连接"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">const</span> test <span class="token operator">=</span> conn<span class="token punctuation">.</span><span class="token function">db</span><span class="token punctuation">(</span><span class="token string">"testdb"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">collection</span><span class="token punctuation">(</span><span class="token string">"test"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 增加</span>
    test<span class="token punctuation">.</span><span class="token function">insertOne</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token string-property property">"site"</span><span class="token operator">:</span> <span class="token string">"nodejs.org"</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">res</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token comment">// 查询</span>
        <span class="token keyword">return</span> test<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">arr</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
            console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>arr<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token comment">// 更改</span>
        <span class="token keyword">return</span> test<span class="token punctuation">.</span><span class="token function">updateMany</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token string-property property">"site"</span><span class="token operator">:</span> <span class="token string">"nodejs.org"</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token punctuation">{</span> <span class="token literal-property property">$set</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token string-property property">"site"</span><span class="token operator">:</span> <span class="token string">"example.com"</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">res</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token comment">// 查询</span>
        <span class="token keyword">return</span> test<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">arr</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
            console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>arr<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token comment">// 删除</span>
        <span class="token keyword">return</span> test<span class="token punctuation">.</span><span class="token function">deleteMany</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token string-property property">"site"</span><span class="token operator">:</span> <span class="token string">"example.com"</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">res</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token comment">// 查询</span>
        <span class="token keyword">return</span> test<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">arr</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
            console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>arr<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">catch</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">err</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"数据操作失败"</span> <span class="token operator">+</span> err<span class="token punctuation">.</span>message<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">finally</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        conn<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">catch</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">err</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"数据库连接失败"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br></div></div><p>用异步函数实现相同的数据操作</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> MongoClient <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"mongodb"</span><span class="token punctuation">)</span><span class="token punctuation">.</span>MongoClient<span class="token punctuation">;</span>
<span class="token keyword">const</span> url <span class="token operator">=</span> <span class="token string">"mongodb://localhost/"</span><span class="token punctuation">;</span>
 
<span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">dataOperate</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> conn <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
        conn <span class="token operator">=</span> <span class="token keyword">await</span> MongoClient<span class="token punctuation">.</span><span class="token function">connect</span><span class="token punctuation">(</span>url<span class="token punctuation">)</span><span class="token punctuation">;</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"数据库已连接"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">const</span> test <span class="token operator">=</span> conn<span class="token punctuation">.</span><span class="token function">db</span><span class="token punctuation">(</span><span class="token string">"testdb"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">collection</span><span class="token punctuation">(</span><span class="token string">"test"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 增加</span>
        <span class="token keyword">await</span> test<span class="token punctuation">.</span><span class="token function">insertOne</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token string-property property">"site"</span><span class="token operator">:</span> <span class="token string">"nodejs.org"</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 查询</span>
        <span class="token keyword">var</span> arr <span class="token operator">=</span> <span class="token keyword">await</span> test<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>arr<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 更改</span>
        <span class="token keyword">await</span> test<span class="token punctuation">.</span><span class="token function">updateMany</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token string-property property">"site"</span><span class="token operator">:</span> <span class="token string">"nodejs.org"</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
            <span class="token punctuation">{</span> <span class="token literal-property property">$set</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token string-property property">"site"</span><span class="token operator">:</span> <span class="token string">"example.com"</span> <span class="token punctuation">}</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 查询</span>
        arr <span class="token operator">=</span> <span class="token keyword">await</span> test<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>arr<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 删除</span>
        <span class="token keyword">await</span> test<span class="token punctuation">.</span><span class="token function">deleteMany</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token string-property property">"site"</span><span class="token operator">:</span> <span class="token string">"example.com"</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 查询</span>
        arr <span class="token operator">=</span> <span class="token keyword">await</span> test<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>arr<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"错误："</span> <span class="token operator">+</span> err<span class="token punctuation">.</span>message<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>conn <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> conn<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
 
<span class="token function">dataOperate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 运行结果</span>
<span class="token comment">// 数据库已连接</span>
<span class="token comment">// [ { _id: 5f169006a2780f0cd4ea640b, site: 'nodejs.org' } ]</span>
<span class="token comment">// [ { _id: 5f169006a2780f0cd4ea640b, site: 'example.com' } ]</span>
<span class="token comment">// []</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br></div></div></template>
