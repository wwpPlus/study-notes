<template><h1 id="网络" tabindex="-1"><a class="header-anchor" href="#网络" aria-hidden="true">#</a> 网络</h1>
<blockquote>
<p>对于前端而言，网络部分代码不多，以概念为主。</p>
<p>对概念的理解程度，决定了是否能够看懂接口文档，同时也决定了是否能更好的掌控网络相关代码。</p>
</blockquote>
<h2 id="网络基本概念" tabindex="-1"><a class="header-anchor" href="#网络基本概念" aria-hidden="true">#</a> 网络基本概念</h2>
<h3 id="客户端和服务器" tabindex="-1"><a class="header-anchor" href="#客户端和服务器" aria-hidden="true">#</a> 客户端和服务器</h3>
<p>在网络的世界里，两个应用程序之间会经常发生通信。</p>
<p>在大部分情况下，通信总是由一方发出一个消息开始，而另一方回复一个消息结束。</p>
<p>发出消息的一方称之为<strong>客户端 Client</strong>，发出消息的过程称之为<strong>请求 Request</strong>。</p>
<p>回复消息的一方称之为<strong>服务器 Server</strong>，回复消息的过程称之为<strong>响应 Response</strong></p>
<p><img src="http://mdrs.yuanjin.tech/img/20220415151044.png" alt="image-20220415151039230"></p>
<p>这个过程中，有几个点需要<strong>特别注意</strong>：</p>
<ol>
<li>
<p>不管是客户端，还是服务器，它们都是一个<strong>应用程序</strong>，而不是一台计算机。客户端和服务器可以分布在不同的计算机上，也可以在同一台计算机上，并不需要特殊看待。</p>
<p>比如我们之前接触的 live server 插件，就是一个服务器，它运行在本地的计算机上。</p>
<p>大部分后端开发的就是服务器程序，前端的 Node 技术也能开发服务器程序。</p>
</li>
<li>
<p>客户端和服务器的这种交互模式称之为「经典 C/S 结构」。在这种结构中，如果客户端是浏览器，则我们称之为 B/S 结构。</p>
</li>
<li>
<p>服务器程序往往是为互联网产品提供服务，因此又称之为 web 服务器。</p>
</li>
<li>
<p>一次完整的交互，总是从请求开始，响应结束。</p>
</li>
</ol>
<h3 id="url" tabindex="-1"><a class="header-anchor" href="#url" aria-hidden="true">#</a> url</h3>
<p>要完成一次请求和响应，首先需要让客户端找到服务器，不仅如此，还要找到服务器上我们想要的资源。</p>
<p>在现实生活中，如果我们要找一个人，我们可以通过一个地址来找到他。</p>
<img src="http://mdrs.yuanjin.tech/img/20220415153102.png" alt="image-20220415153102596" style="zoom:50%;" />
<p>和现实生活类似，在互联网中，我们可以通过一个叫 <em>url 地址</em> 的东西找到我们想要的资源。</p>
<p>url 全称 uniform resource locator，统一资源定位符。它是一个字符串，用于表达互联网中某个资源的位置。</p>
<p>url 地址示例：</p>
<ul>
<li>百度首页的 url 地址：https://www.baidu.com/</li>
<li>某篇新闻页面的 url 地址：https://mbd.baidu.com/newspage/data/landingsuper?context=%7B%22nid%22%3A%22news_9610068257663826418%22%7D&amp;n_type=-1&amp;p_from=-1</li>
<li>某知名 css 的 url 地址：https://meyerweb.com/eric/tools/css/reset/reset.css</li>
<li>某知名 js 的 url 地址：https://cdn.bootcdn.net/ajax/libs/jquery/3.6.0/jquery.min.js</li>
<li>某张图片的 url 地址：https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic_source%2F84%2F87%2F80%2F848780a296b66b382018fa7f675ecd06.jpg&amp;refer=http%3A%2F%2Fup.enterdesk.com&amp;app=2002&amp;size=f9999,10000&amp;q=a80&amp;n=0&amp;g=0n&amp;fmt=auto?sec=1652600873&amp;t=803c81d81387ec5f9fd1d92ba9d7665a</li>
</ul>
<p>url 地址可以很长，也可以很短。</p>
<p>通过 url 地址可以找到互联网上的资源，它可以是页面、图片、视频、音频、css 代码、js 代码、可供下载的文件、或者其他任何东西。</p>
<p>一个完整的 url 地址由多个部分组成</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>完整的url地址
协议 + 主机 + 端口 + 路径 + 参数 + hash
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>示例：</p>
<p><img src="http://mdrs.yuanjin.tech/img/20220415160543.png" alt="image-20220415160543391"></p>
<h4 id="协议-protocal-schema" tabindex="-1"><a class="header-anchor" href="#协议-protocal-schema" aria-hidden="true">#</a> 协议 Protocal / Schema</h4>
<p>它表示客户端希望用什么方式和服务器沟通，现在只需要知道这里固定写 http 或 https 即可</p>
<blockquote>
<p>小知识：</p>
<ol>
<li>如果在浏览器的地址栏省略了协议，浏览器会自动为你补全</li>
<li>可以在 Chrome 浏览器的地址栏点击右键，显示完整的地址</li>
<li>https 协议比 http 协议更安全，但往往出现在线上，本地的服务器通常不会是 https</li>
</ol>
</blockquote>
<h4 id="主机-host" tabindex="-1"><a class="header-anchor" href="#主机-host" aria-hidden="true">#</a> 主机 Host</h4>
<p>它表示客户端希望在哪台计算机上寻找资源</p>
<p>这里有两种写法：IP 地址和域名</p>
<ol>
<li>
<p>IP 地址。IP 地址是一个网络中计算机的唯一编号，通常，一个 IP 对应一台计算机。</p>
<blockquote>
<p>记住特殊 IP 地址： 127.0.0.1，它表示本机 IP</p>
</blockquote>
</li>
<li>
<p>域名。域名类似 IP 地址的别名，把不容易记忆的数字变为容易记忆的单词。当使用域名访问时，会自动转换为 IP 地址。</p>
<blockquote>
<p>记住特殊域名：localhost，它表示的 IP 地址是 127.0.0.1</p>
</blockquote>
</li>
</ol>
<h4 id="端口-port" tabindex="-1"><a class="header-anchor" href="#端口-port" aria-hidden="true">#</a> 端口 Port</h4>
<p>它表示客户端希望在哪个应用程序中寻找资源</p>
<p>每个服务器程序，都会监听一个或多个端口，只有找到对应的端口，才能找到这个服务器程序。</p>
<p><strong>端口号是可选的</strong>，若不填写，则：</p>
<ol>
<li>如果使用的是 http 协议，默认端口号为 80</li>
<li>如果使用的是 https 协议，默认端口号为 443</li>
</ol>
<h4 id="路径-path" tabindex="-1"><a class="header-anchor" href="#路径-path" aria-hidden="true">#</a> 路径 Path</h4>
<p>服务器上往往有许许多多的资源，每个资源都有自己的访问路径</p>
<p><strong>路径是可选的</strong>，若不填写，则路径为 /</p>
<h4 id="参数-query-param" tabindex="-1"><a class="header-anchor" href="#参数-query-param" aria-hidden="true">#</a> 参数 Query / Param</h4>
<p>某些资源可以根据需要呈现不同的内容，比如一篇新闻列表的页面，可以指定它呈现第几页的新闻，而「第几页」就属于一些额外信息，这些额外信息可以通过参数传递</p>
<p>比如，我们访问一个新闻列表的页面，同时希望它展示第 5 页，每页展示 10 条新闻，我们<strong>可能</strong>得到下面的 url 地址：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>http://duyiedu.com/news?page=1&amp;limit=10
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>上面这个 url 地址中，<code>page=1&amp;limit=10</code>就是参数部分，这部分可以包含多个参数，不同的参数之间使用<code>&amp;</code>符号分割</p>
<p><strong>参数是可选的</strong></p>
<h4 id="hash" tabindex="-1"><a class="header-anchor" href="#hash" aria-hidden="true">#</a> hash</h4>
<p>在网络通信中，hash 没有什么用，它往往作为浏览器的锚链接出现。</p>
<h3 id="http" tabindex="-1"><a class="header-anchor" href="#http" aria-hidden="true">#</a> http</h3>
<p>通过 url 地址，能够在茫茫互联网中准确的找到自己想要的服务。</p>
<p>但光找到服务还是不够，双方需要「用同一种语言」来对话，否则都听不懂对方在说什么。</p>
<p>这个「语言」就是协议，而互联网中最常见的协议就是 http 协议</p>
<blockquote>
<p>https 是在 http 协议基础上发展起来的，它增加了安全性，其他和 http 协议完全一致</p>
</blockquote>
<p>http 是基于 请求-响应 的方式完成通信的，每一次通信都是由客户端向服务器发出请求，传递一些消息过去，然后经过服务器程序处理后，响应给客户端一些消息。</p>
<p>http 协议规定：</p>
<ol>
<li>
<p>每次 请求-响应 都是<strong>独立</strong>的，相互之间互不干扰。这种模式的协议我们称之为<strong>无状态协议</strong></p>
<p>http 的无状态会带来一些问题，这些问题我们会在后续的课程中讨论</p>
</li>
<li>
<p>每次 请求-响应 传递的消息都是<strong>纯文本（字符串）</strong>，而且文本格式必须按照 http 协议规定的格式书写。</p>
</li>
</ol>
<p><img src="http://mdrs.yuanjin.tech/img/20220415172453.png" alt="image-20220415172453837"></p>
<h4 id="请求的消息格式" tabindex="-1"><a class="header-anchor" href="#请求的消息格式" aria-hidden="true">#</a> 请求的消息格式</h4>
<p>请求消息格式有三部分组成</p>
<p><img src="http://mdrs.yuanjin.tech/img/20220415173353.png" alt="image-20220415173353090"></p>
<ul>
<li>请求行：高度概括了客户端想要干什么</li>
<li>请求头：描述了请求的一些额外信息</li>
<li>请求体：包含了要给服务器传递的正文数据。<strong>请求体是可以省略的</strong></li>
</ul>
<h5 id="请求行" tabindex="-1"><a class="header-anchor" href="#请求行" aria-hidden="true">#</a> 请求行</h5>
<p>请求行是整个 http 报文的第一行字符串，它包含三个部分：请求方法 路径+参数+hash 协议和版本</p>
<p>重点关注<strong>请求方法</strong></p>
<p>请求方法是一个单词，它表达了客户端的「动作」，比如：</p>
<ul>
<li>GET：获取</li>
<li>POST：提交</li>
</ul>
<p>在 http 协议中，并没有规定只能使用上面两种动作，甚至没有规定每种动作会带来怎样的变化</p>
<p>而在实际的应用中，我们逐渐有了一些约定俗成的规范：</p>
<ol>
<li>动作通常有：GET（获取资源）、POST（提交消息）、PUT（修改数据）、DELETE（删除数据）。其中，GET 和 POST 最为常见。</li>
<li>GET 和 DELETE 请求不能有请求体，而 POST 和 PUT 请求可以有请求体</li>
</ol>
<p>**浏览器遵循了上面的规范，这带来了 GET 和 POST 的诸多区别。**比如，由于 GET 请求没有请求体，所以要传递数据只能把数据放到 url 的参数中</p>
<p>在浏览器中，获取数据一般使用的都是 GET 请求，比如：</p>
<ul>
<li>在地址栏输入地址并按下回车</li>
<li>点击了某个 a 元素</li>
<li>获取图片、音频、视频</li>
<li>获取 css、js、字体等文件</li>
</ul>
<p><strong>事实上，浏览器自动发出的请求基本都是 GET 请求，而 POST 请求需要开发者手动处理，比如在 form 表单中设置 method 为 POST</strong></p>
<h5 id="请求头-header" tabindex="-1"><a class="header-anchor" href="#请求头-header" aria-hidden="true">#</a> 请求头 header</h5>
<p>请求头是一系列的键值对，里面包含了诸多和业务无关的信息</p>
<p>浏览器每次请求服务器都会自动附带很多的请求头，其实这些请求头大部分服务器是不需要的</p>
<blockquote>
<p>你可以说不要，但不能说我没给</p>
</blockquote>
<p>我们只需关注下面几个请求头即可：</p>
<ol>
<li>
<p>Host：url 地址中的主机</p>
</li>
<li>
<p>User-Agent：客户端的信息描述</p>
</li>
<li>
<p>Content-Type: 请求体的消息是什么格式，如果没有请求体，这个字段无意义</p>
<p>该字段的常见取值为：</p>
<ul>
<li>
<p>application/x-www-form-urlencoded</p>
<p>表示请求体的数据格式和 url 地址中参数的格式一样，比如</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>loginId=admin&amp;loginPwd=123123
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<p>application/json</p>
<p>表示请求体的数据是 json 格式，比如</p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token punctuation">{</span> <span class="token property">"loginId"</span><span class="token operator">:</span> <span class="token string">"admin"</span><span class="token punctuation">,</span> <span class="token property">"loginPwd"</span><span class="token operator">:</span> <span class="token string">"123123"</span> <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<p>multipart/form-data</p>
<p>一种特殊的请求体格式，上传文件一般选择该格式</p>
</li>
</ul>
</li>
</ol>
<h5 id="请求体-body" tabindex="-1"><a class="header-anchor" href="#请求体-body" aria-hidden="true">#</a> 请求体 body</h5>
<p>包含业务数据的字符串</p>
<p>理论上，请求体可以是任意格式的字符串，但习惯上，服务器普遍能识别以下格式：</p>
<ul>
<li>application/x-www-form-urlencoded：<code>属性名=属性值&amp;属性名=属性值...</code></li>
<li>application/json：<code>{&quot;属性名&quot;:&quot;属性值&quot;, &quot;属性名&quot;:&quot;属性值&quot;}</code></li>
<li>multipart/form-data：使用某个随机字符串作为属性之间的分隔符，通常用于文件上传</li>
</ul>
<p>由于请求体格式的多样性，服务器在分析请求体时可能无法知晓具体的格式，从而不知道如何解析请求体，因此，服务器往往要求在请求头中附带一个属性<code>Content-Type</code>来描述请求体使用的格式</p>
<p>例如</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>Content-Type: application/x-www-form-urlencoded
Content-Type: application/json
Content-Type: multipart/form-data
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h4 id="响应的消息格式" tabindex="-1"><a class="header-anchor" href="#响应的消息格式" aria-hidden="true">#</a> 响应的消息格式</h4>
<p>服务器（通常由后端开发）收到请求的消息后，会运行后端代码对请求进行处理，处理完成后，会给予响应。</p>
<p>服务器的响应格式包含三个部分</p>
<p><img src="http://mdrs.yuanjin.tech/img/20220415182351.png" alt="image-20220415182351508"></p>
<h5 id="响应行" tabindex="-1"><a class="header-anchor" href="#响应行" aria-hidden="true">#</a> 响应行</h5>
<p>响应行是整个响应字符串的第一行。</p>
<p>响应行包含两个部分：</p>
<ul>
<li>协议版本：表示服务器打算和客户端用什么协议通信</li>
<li><strong>状态码、状态消息</strong>：表示服务器对当前请求的表态</li>
</ul>
<p><strong>通常</strong>，状态码和状态消息是一一对应的，比如状态码 200 的消息就是 OK</p>
<p>不同的请求可能会得到不同的状态码，至于到底会得到哪个状态码，由后端程序决定。</p>
<p>状态码分为五类：</p>
<table>
<thead>
<tr>
<th style="text-align:left">分类</th>
<th style="text-align:left">分类描述</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">1**</td>
<td style="text-align:left">信息，服务器收到请求，需要请求者继续执行操作</td>
</tr>
<tr>
<td style="text-align:left">2**</td>
<td style="text-align:left">成功，操作被成功接收并处理</td>
</tr>
<tr>
<td style="text-align:left">3**</td>
<td style="text-align:left">重定向，需要进一步的操作以完成请求</td>
</tr>
<tr>
<td style="text-align:left">4**</td>
<td style="text-align:left">客户端错误，请求包含语法错误或无法完成请求</td>
</tr>
<tr>
<td style="text-align:left">5**</td>
<td style="text-align:left">服务器错误，服务器在处理请求的过程中发生了错误</td>
</tr>
</tbody>
</table>
<p>通常认为，0~399 之间的状态码都是正常的，其他是不正常的</p>
<p>常见的状态码有：</p>
<ol>
<li>
<p>200 OK：一切正常。</p>
</li>
<li>
<p>301 Moved Permanently：资源已被永久重定向。</p>
<p><code>你的请求我收到了，但是呢，你要的东西不在这个地址了，我已经永远的把它移动到了一个新的地址，麻烦你取请求新的地址，地址我放到了响应头的Location中了</code></p>
</li>
<li>
<p>302 Found：资源已被临时重定向。</p>
<p><code>你的请求我收到了，但是呢，你要的东西不在这个地址了，我临时的把它移动到了一个新的地址，麻烦你取请求新的地址，地址我放到了请求头的Location中了</code></p>
</li>
<li>
<p>304 Not Modified：文档内容未被修改。</p>
<p><code>你的请求我收到了，你要的东西跟之前是一样的，没有任何的变化，所以我就不给你结果了，你自己就用以前的吧。啥？你没有缓存以前的内容，关我啥事</code></p>
</li>
<li>
<p>400 Bad Request：语义有误，当前请求无法被服务器理解。</p>
<p><code>你给我发的是个啥啊，我听都听不懂</code></p>
</li>
<li>
<p>403 Forbidden：服务器拒绝执行。</p>
<p><code>你的请求我已收到，但是我就是不给你东西</code></p>
</li>
<li>
<p>404 Not Found：资源不存在。</p>
<p><code>你的请求我收到了，但我没有你要的东西</code></p>
</li>
<li>
<p>500 Internal Server Error：服务器内部错误。</p>
<p><code>你的请求我已收到，但这道题我不会，解不出来，先睡了</code></p>
</li>
</ol>
<h5 id="响应头-header" tabindex="-1"><a class="header-anchor" href="#响应头-header" aria-hidden="true">#</a> 响应头 header</h5>
<p>和请求头一样，响应头也是由很多个键值对组成的，具体有哪些键值对，完全取决于服务器程序</p>
<p>目前，对我们最重要的键值对是<code>Content-Type</code>，它有多种取值，表示响应体的数据类型。</p>
<p>在 B/S 模式中，浏览器会自动根据响应头中<code>Content-Type</code>的取值，决定如何处理响应体。</p>
<ol>
<li><code>text/plain</code>: 普通的纯文本，浏览器通常会将响应体原封不动的显示到页面上</li>
<li><code>text/html</code>：html 文档，浏览器通常会将响应体作为页面进行渲染</li>
<li><code>text/javascript</code> 或 <code>application/javascript</code>：js 代码，浏览器通常会使用 JS 执行引擎将它解析执行</li>
<li><code>text/css</code>：css 代码，浏览器会将它视为样式</li>
<li><code>image/jpeg</code>：浏览器会将它视为 jpg 图片</li>
<li><code>attachment</code>：附件，浏览器看到这个类型，通常会触发下载功能</li>
<li>其他<code>MIME</code>类型</li>
</ol>
<h5 id="响应体-body" tabindex="-1"><a class="header-anchor" href="#响应体-body" aria-hidden="true">#</a> 响应体 body</h5>
<p>响应的主体内容</p>
<h2 id="浏览器页面处理流程" tabindex="-1"><a class="header-anchor" href="#浏览器页面处理流程" aria-hidden="true">#</a> 浏览器页面处理流程</h2>
<p>当在浏览器地址栏中输入一个 url 地址，并按下回车后，会发生什么？</p>
<blockquote>
<p>试试这个地址：oss.duyiedu.com/test/index.html</p>
</blockquote>
<p><img src="http://mdrs.yuanjin.tech/img/20220428165634.png" alt="image-20220428165629557"></p>
<h2 id="ajax" tabindex="-1"><a class="header-anchor" href="#ajax" aria-hidden="true">#</a> AJAX</h2>
<blockquote>
<p>AJAX 就是浏览器赋予 JS 的一套 API，通过这套 API 能够使 JS 具备网络通信的能力</p>
</blockquote>
<h3 id="历史" tabindex="-1"><a class="header-anchor" href="#历史" aria-hidden="true">#</a> 历史</h3>
<p>浏览器本身就具备网络通信的能力，但在早期，浏览器并没有把这个能力开放给 JS。</p>
<p>最早是微软在 IE 浏览器中把这一能力向 JS 开放，让 JS 可以在代码中实现发送请求，这项技术在 2005 年被正式命名为 AJAX（<strong>A</strong>synchronous <strong>J</strong>avascript <strong>A</strong>nd <strong>X</strong>ML）</p>
<p>IE 使用了一套 API 来完成请求的发送，这套 API 主要依靠一个构造函数完成。该构造函数的名称为<code>XMLHttpRequest</code>，简称为<code>XHR</code>，所以这套 API 又称之为<code>XHR API</code></p>
<p>由于<code>XHR API</code>有着诸多缺陷，在 HTML5 和 ES6 发布之后，产生了一套更完善的 API 来发送请求。这套 API 主要使用的是一个叫做<code>fetch</code>的函数，因此这套 API 又称之为<code>Fetch API</code></p>
<p><strong>无论是<code>XHR</code>还是<code>Fetch</code>，它们都是实现 ajax 的技术手段，只是 API 不同。</strong></p>
<h3 id="xhr-api" tabindex="-1"><a class="header-anchor" href="#xhr-api" aria-hidden="true">#</a> XHR API</h3>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> xhr <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">XMLHttpRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//创建发送请求的对象</span>
xhr<span class="token punctuation">.</span><span class="token function-variable function">onreadystatechange</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">//当请求状态发生改变时运行的函数</span>
  <span class="token comment">// xhr.readyState： 一个数字，用于判断请求到了哪个阶段</span>
  <span class="token comment">// 0: 刚刚创建好了请求对象，但还未配置请求（未调用open方法）</span>
  <span class="token comment">// 1: open方法已被调用</span>
  <span class="token comment">// 2: send方法已被调用</span>
  <span class="token comment">// 3: 正在接收服务器的响应消息体</span>
  <span class="token comment">// 4: 服务器响应的所有内容均已接收完毕</span>
  <span class="token comment">// xhr.responseText： 获取服务器响应的消息体文本</span>
  <span class="token comment">// xhr.getResponseHeader("Content-Type") 获取响应头Content-Type</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
xhr<span class="token punctuation">.</span><span class="token function">open</span><span class="token punctuation">(</span><span class="token string">'请求方法'</span><span class="token punctuation">,</span> <span class="token string">'url地址'</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//配置请求</span>
xhr<span class="token punctuation">.</span><span class="token function">setRequestHeader</span><span class="token punctuation">(</span><span class="token string">'Content-Type'</span><span class="token punctuation">,</span> <span class="token string">'application/json'</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//设置请求头</span>
xhr<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span><span class="token string">'请求体内容'</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//构建请求体，发送到服务器，如果没有请求体，传递null</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><h3 id="fetch-api" tabindex="-1"><a class="header-anchor" href="#fetch-api" aria-hidden="true">#</a> Fetch API</h3>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> resp <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">fetch</span><span class="token punctuation">(</span><span class="token string">'url地址'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token comment">// 请求配置对象，可省略，省略则所有配置为默认值</span>
  <span class="token literal-property property">method</span><span class="token operator">:</span> <span class="token string">'请求方法'</span><span class="token punctuation">,</span> <span class="token comment">// 默认为GET</span>
  <span class="token literal-property property">headers</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token comment">// 请求头配置</span>
    <span class="token string-property property">'Content-Type'</span><span class="token operator">:</span> <span class="token string">'application/json'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token string">'abc'</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token literal-property property">body</span><span class="token operator">:</span> <span class="token string">'请求体内容'</span><span class="token punctuation">,</span> <span class="token comment">// 请求体</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// fetch会返回一个Promise，该Promise会在接收完响应头后变为fulfilled</span>

resp<span class="token punctuation">.</span>headers<span class="token punctuation">;</span> <span class="token comment">// 获取响应头对象</span>
resp<span class="token punctuation">.</span>status<span class="token punctuation">;</span> <span class="token comment">// 获取响应状态码，例如200</span>
resp<span class="token punctuation">.</span>statusText<span class="token punctuation">;</span> <span class="token comment">// 获取响应状态码文本，例如OK</span>
resp<span class="token punctuation">.</span><span class="token function">json</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 用json的格式解析即将到来的响应体，返回Promise，解析完成后得到一个对象</span>
resp<span class="token punctuation">.</span><span class="token function">text</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 用纯文本的格式解析即将到来的响应体，返回Promise，解析完成后得到一个字符串</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><h3 id="特别注意" tabindex="-1"><a class="header-anchor" href="#特别注意" aria-hidden="true">#</a> 特别注意</h3>
<p><strong>无论使用哪一种 API，AJAX 始终都是异步的</strong></p>
<p>在初学的时候，可以把网络传输的时间想象的夸张一点，比如每一次请求和响应都要经过一年才能完成。这样有助于理解网络是异步这一点</p>
<h3 id="常见问题" tabindex="-1"><a class="header-anchor" href="#常见问题" aria-hidden="true">#</a> 常见问题</h3>
<h4 id="跨域错误" tabindex="-1"><a class="header-anchor" href="#跨域错误" aria-hidden="true">#</a> 跨域错误</h4>
<p><img src="http://mdrs.yuanjin.tech/img/20220510154337.png" alt="image-20220510154337224"></p>
<p>这个错误通常发生在 AJAX 请求的时候，是一个跨域错误，这里需要了解什么叫跨域。</p>
<p>浏览器为了安全，制定了一个规则，即<strong>页面的源和请求目标的源应该保持一致</strong>，如果不一致，就产生了跨源或者叫跨域。</p>
<blockquote>
<p>源 = 协议 + 主机 + 端口</p>
</blockquote>
<p>比如：</p>
<table>
<thead>
<tr>
<th>页面源</th>
<th>目标源</th>
<th>是否跨域</th>
</tr>
</thead>
<tbody>
<tr>
<td>https://baidu.com/news.html</td>
<td>http://103.231.13.42/1.jpg</td>
<td>是</td>
</tr>
<tr>
<td>https://www.baidu.com/news.html</td>
<td>http://baidu.com:8080/1.jpg</td>
<td>是</td>
</tr>
<tr>
<td>https://baidu.com/news.html</td>
<td>https://baidu.com/1.jpg</td>
<td>否</td>
</tr>
</tbody>
</table>
<ul>
<li>浏览器对 img、link、script 的限制比较宽松，一般允许跨域</li>
<li>浏览器对 AJAX 比较严格，一般不允许跨域</li>
</ul>
<p><strong>浏览器对跨域行为作出的不同限制，统称为同源策略</strong></p>
<p>如果在 AJAX 中出现跨域请求，就会报出以上错误。</p>
<p>但如果服务器明确告知浏览器允许跨域，则浏览器会允许 AJAX 跨域请求。</p>
<h4 id="_404-错误" tabindex="-1"><a class="header-anchor" href="#_404-错误" aria-hidden="true">#</a> 404 错误</h4>
<p><img src="http://mdrs.yuanjin.tech/img/20220510153910.png" alt="image-20220510153910252"></p>
<p>浏览器请求某个资源，但服务器响应了一个 404 状态码，就会在控制台中报出这个错误。与此同时，你可以在浏览器的网络调试中进一步观察到这个错误。</p>
<p>404 错误是一种非常常见的错误，它表示服务器告诉客户端：你要的资源并不存在</p>
<p>要解决这个错误，首先要检查请求的 url 地址是否正确。如果 url 地址正确，则可能是服务器的问题，需要联系后端开发人员或者将问题上报</p>
<h4 id="favicon" tabindex="-1"><a class="header-anchor" href="#favicon" aria-hidden="true">#</a> favicon</h4>
<p><img src="http://mdrs.yuanjin.tech/img/20220510152948.png" alt="image-20220510152948450"></p>
<p>报错内容：加载资源失败：服务器响应了 404 状态码</p>
<p>请求地址：<code>:5500/favicon.ico</code></p>
<p>原因：</p>
<p>很多浏览器在解析页面后，如果发现页面中并没有使用<code>link</code>元素加载站点图标，会尝试请求以下地址来获取图标：</p>
<p><code>站点协议://站点主机:站点端口/favicon.ico</code></p>
<p>如果这个地址无法获得图标，就会报出相应错误</p>
<p>该错误会在下一次刷新后消失，是因为再次刷新后，浏览器<em>记忆</em>了之前无法获取图标的情况，就不再发出请求了。</p>
<h4 id="其他问题" tabindex="-1"><a class="header-anchor" href="#其他问题" aria-hidden="true">#</a> 其他问题</h4>
<blockquote>
<p><img src="http://mdrs.yuanjin.tech/img/20220510155614.png" alt="image-20220510155614692"></p>
<p>网络断开，检查你的网络连接，或者检查你是否在调试工具中进行了网络断开调试</p>
</blockquote>
<blockquote>
<p><img src="http://mdrs.yuanjin.tech/img/20220510155742.png" alt="image-20220510155742272"></p>
<p>访问的域名不存在，无法连接到服务器</p>
</blockquote>
</template>
