<template><p><img src="http://mdrs.yuanjin.tech/img/20210421144913.png" alt="技能树.drawio"></p>
<h1 id="第三方库概览" tabindex="-1"><a class="header-anchor" href="#第三方库概览" aria-hidden="true">#</a> 第三方库概览</h1>
<table>
<thead>
<tr>
<th>名称</th>
<th>文档</th>
<th>一句话介绍</th>
</tr>
</thead>
<tbody>
<tr>
<td>jQuery</td>
<td>官网：https://jquery.com/<br />中文网：https://jquery.cuishifeng.cn/</td>
<td>让操作DOM变得更容易</td>
</tr>
<tr>
<td>Lodash</td>
<td>官网：https://lodash.com/docs<br />中文网：https://www.lodashjs.com/</td>
<td>你能想到的工具函数它都帮你写了</td>
</tr>
<tr>
<td>Animate.css</td>
<td>官网：https://animate.style/</td>
<td>常见的CSS动画效果都帮你写好了</td>
</tr>
<tr>
<td>Axios</td>
<td>官网：https://axios-http.com/zh/</td>
<td>让网络请求变得更简单</td>
</tr>
<tr>
<td>MockJS</td>
<td>官网：http://mockjs.com/</td>
<td>ajax拦截和模拟数据生成</td>
</tr>
<tr>
<td>Moment</td>
<td>官网：https://momentjs.com/<br />中文网：http://momentjs.cn/</td>
<td>让日期处理更容易</td>
</tr>
<tr>
<td>ECharts</td>
<td>官网：https://echarts.apache.org/zh</td>
<td>搞定所有你能想到的图表📈</td>
</tr>
<tr>
<td>animejs</td>
<td>官网：https://animejs.com/</td>
<td>简单好用的JS动画库</td>
</tr>
<tr>
<td>editormd</td>
<td>官网：https://pandao.github.io/editor.md</td>
<td>markdown编辑器</td>
</tr>
<tr>
<td>validate</td>
<td>官网：http://validatejs.org/</td>
<td>简单好用的JS对象验证库</td>
</tr>
<tr>
<td>date-fns</td>
<td>官网：https://date-fns.org/</td>
<td>功能和Moment几乎相同<br />支持tree shaking</td>
</tr>
<tr>
<td>zepto</td>
<td>官网：https://zeptojs.com/</td>
<td>功能和jQuery几乎相同<br />对移动端支持更好<br />包体积更小</td>
</tr>
<tr>
<td>nprogress</td>
<td>官网：https://github.com/rstacruz/nprogress</td>
<td>简单好用的进度条插件<br />YouTube就使用的是它</td>
</tr>
<tr>
<td>qs</td>
<td>官网：https://github.com/ljharb/qs</td>
<td>一个用于解析url的小工具</td>
</tr>
</tbody>
</table>
<p>对于第三方库，除了下载使用，还可以通过CDN在线使用</p>
<blockquote>
<p>科普知识：CDN</p>
<p>CDN称之为内容分发网络（Content Delivery Network）。</p>
<p>简单来说，就是提供很多的服务器，用户访问时，自动就近选择服务器给用户提供资源</p>
<p><img src="http://mdrs.yuanjin.tech/img/20210203133956.png" alt="img"></p>
</blockquote>
<p>国内使用广泛的免费CDN站点：https://www.bootcdn.cn/</p>
<h2 id="jquery" tabindex="-1"><a class="header-anchor" href="#jquery" aria-hidden="true">#</a> JQuery</h2>
<blockquote>
<p>官网：https://jquery.com/</p>
<p>中文网：https://jquery.cuishifeng.cn/</p>
<p>CDN：https://cdn.bootcdn.net/ajax/libs/jquery/3.6.0/jquery.min.js</p>
</blockquote>
<p>针对DOM的操作无非以下几种：</p>
<ul>
<li>获取它</li>
<li>创建它</li>
<li>监听它</li>
<li>改变它</li>
</ul>
<p>JQuery可以让上面整个过程更加轻松</p>
<h3 id="jquery函数" tabindex="-1"><a class="header-anchor" href="#jquery函数" aria-hidden="true">#</a> jQuery函数</h3>
<p>jQuery提供了一个函数，名称为<code>jQuery</code>，也可以写作<code>$</code></p>
<p>该函数提供了强大的DOM控制能力</p>
<p>通过下面的示例，可以快速理解jQuery的核心功能</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 获取类样式为container的所有DOM</span>
<span class="token keyword">const</span> container <span class="token operator">=</span> <span class="token function">$</span><span class="token punctuation">(</span><span class="token string">".container"</span><span class="token punctuation">)</span>

<span class="token comment">// 获取container后面的兄弟元素，元素类样式必须包含list</span>
container<span class="token punctuation">.</span><span class="token function">nextAll</span><span class="token punctuation">(</span><span class="token string">".list"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 删除元素</span>
container<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 找到所有类样式为list元素的后代li元素，给它们加上类样式item</span>
<span class="token function">$</span><span class="token punctuation">(</span><span class="token string">".list li"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">addClass</span><span class="token punctuation">(</span><span class="token string">"item"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 为所有p元素添加一些style</span>
<span class="token function">$</span><span class="token punctuation">(</span><span class="token string">"p"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">css</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token string-property property">"color"</span><span class="token operator">:</span> <span class="token string">"#ff0011"</span><span class="token punctuation">,</span> <span class="token string-property property">"background"</span><span class="token operator">:</span> <span class="token string">"blue"</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 注册DOMContentLoaded事件</span>
<span class="token function">$</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span> 
	<span class="token comment">// ...</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token comment">// 给所有li元素注册点击事件</span>
<span class="token function">$</span><span class="token punctuation">(</span><span class="token string">"li"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">click</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token comment">// ...</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token comment">// 创建一个a元素，设置其内容为link，然后将它作为子元素追加到类样式为.list的元素中</span>
<span class="token function">$</span><span class="token punctuation">(</span><span class="token string">"&lt;a>"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">text</span><span class="token punctuation">(</span><span class="token string">"link"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">appendTo</span><span class="token punctuation">(</span><span class="token string">".list"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br></div></div><p>下面依次介绍jQuery中的核心概念，以便于文档查阅</p>
<h3 id="jquery对象和dom对象" tabindex="-1"><a class="header-anchor" href="#jquery对象和dom对象" aria-hidden="true">#</a> jQuery对象和DOM对象</h3>
<p>通过jQuery得到的元素是一个jQuery对象，而不是传统的DOM</p>
<p>jQuery对象是一个伪数组，它和DOM元素的关系如下</p>
<img src="http://mdrs.yuanjin.tech/img/20210522134507.png" alt="image-20210522134507738" style="zoom:50%;" />
<p>jQuery对象和DOM之间可以互相转换</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// jQuery -> DOM</span>
jQuery对象<span class="token punctuation">[</span>索引<span class="token punctuation">]</span>
jQuery对象<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>索引<span class="token punctuation">)</span>

<span class="token comment">// DOM -> jQuery</span>
<span class="token function">$</span><span class="token punctuation">(</span><span class="token constant">DOM</span>对象<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h3 id="官网文档中的目录" tabindex="-1"><a class="header-anchor" href="#官网文档中的目录" aria-hidden="true">#</a> 官网文档中的目录</h3>
<table>
<thead>
<tr>
<th>目录名</th>
<th>内容</th>
</tr>
</thead>
<tbody>
<tr>
<td>选择器</td>
<td>选择器是一个字符串，用于描述要选中哪些元素</td>
</tr>
<tr>
<td>筛选</td>
<td>在当前jQuery对象的基础上，进一步选中元素</td>
</tr>
<tr>
<td>文档处理</td>
<td>更改HTML文档结构，例如删除元素、清空元素内容、改变元素之间的关系</td>
</tr>
<tr>
<td>属性</td>
<td>控制元素属性，例如修改类样式、读取和设置文本框的value、读取和设置img的src</td>
</tr>
<tr>
<td>css</td>
<td>控制元素style样式，例如改变字体颜色、设置背景、获取元素尺寸、获取和设置滚动位置</td>
</tr>
<tr>
<td>事件</td>
<td>监听元素的事件，例如监听文档加载完成、监听元素被点击</td>
</tr>
<tr>
<td>ajax</td>
<td>jQuery封装了XHR，使ajax访问更加方便<br />这部分功能目前已被其他第三方库全面超越</td>
</tr>
</tbody>
</table>
<h2 id="lodash" tabindex="-1"><a class="header-anchor" href="#lodash" aria-hidden="true">#</a> Lodash</h2>
<blockquote>
<p>官网：https://lodash.com/docs</p>
<p>中文网：https://www.lodashjs.com/</p>
<p>CDN：https://cdn.bootcdn.net/ajax/libs/lodash.js/4.17.21/lodash.min.js</p>
</blockquote>
<p>Lodash是一个针对ES的古老工具库，它出现在ES5之前</p>
<p>Lodash提供了大量的API，弥补了ES中对象、函数、数组API不足的问题</p>
<p>你可以想到的大部分工具函数，都可以在Lodash中找到</p>
<blockquote>
<p>如果你不编写框架或通用库，一般不会用到Lodash</p>
</blockquote>
<h2 id="animate-css" tabindex="-1"><a class="header-anchor" href="#animate-css" aria-hidden="true">#</a> Animate.css</h2>
<blockquote>
<p>官网：https://animate.style/</p>
<p>CDN：https://cdn.bootcdn.net/ajax/libs/animate.css/4.1.1/animate.min.css</p>
</blockquote>
<p>Animate.css 库提供了大量的动画效果，开发者仅需使用它提供的类名即可</p>
<p><strong>注意：animate.css中的动画对行盒无效</strong></p>
<h3 id="基本使用" tabindex="-1"><a class="header-anchor" href="#基本使用" aria-hidden="true">#</a> 基本使用</h3>
<p>类名格式为：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>animate__animated animate__效果名
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>效果名分为以下几个大类，你可以从官网中找到对应的分类，每个分类下有多种效果名可供使用</p>
<table>
<thead>
<tr>
<th>分类</th>
<th>含义</th>
</tr>
</thead>
<tbody>
<tr>
<td>Attention seekers</td>
<td>强调</td>
</tr>
<tr>
<td>Back entrances</td>
<td>进入</td>
</tr>
<tr>
<td>Back exits</td>
<td>退出</td>
</tr>
<tr>
<td>Bouncing entrances</td>
<td>弹跳进入</td>
</tr>
<tr>
<td>Bouncing exits</td>
<td>弹跳退出</td>
</tr>
<tr>
<td>Fading entrances</td>
<td>淡入</td>
</tr>
<tr>
<td>Fading exits</td>
<td>淡出</td>
</tr>
<tr>
<td>Flippers</td>
<td>翻转</td>
</tr>
<tr>
<td>Lightspeed</td>
<td>光速</td>
</tr>
<tr>
<td>Rotating entrances</td>
<td>旋转进入</td>
</tr>
<tr>
<td>Rotating exits</td>
<td>旋转退出</td>
</tr>
<tr>
<td>Specials</td>
<td>特殊效果</td>
</tr>
<tr>
<td>Zooming entrances</td>
<td>缩放进入</td>
</tr>
<tr>
<td>Zooming exits</td>
<td>缩放退出</td>
</tr>
<tr>
<td>Sliding entrances</td>
<td>滑动进入</td>
</tr>
<tr>
<td>Sliding exits</td>
<td>滑动退出</td>
</tr>
</tbody>
</table>
<h3 id="工具类" tabindex="-1"><a class="header-anchor" href="#工具类" aria-hidden="true">#</a> 工具类</h3>
<p>Animate.css 还提供了多个工具类，可以控制动画的<strong>延时</strong>、<strong>重复次数</strong>、<strong>速度</strong></p>
<ul>
<li>
<p>延时</p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token comment">/* 默认无延时 */</span>
animate__delay-1s  <span class="token comment">/* 延时1秒 */</span>
animate__delay-2s  <span class="token comment">/* 延时2秒 */</span>
animate__delay-3s  <span class="token comment">/* 延时3秒 */</span>
animate__delay-4s  <span class="token comment">/* 延时4秒 */</span>
animate__delay-5s  <span class="token comment">/* 延时5秒 */</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div></li>
<li>
<p>重复次数</p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token comment">/* 默认重复1次 */</span>
animate__repeat-2	<span class="token comment">/* 重复2次 */</span>
animate__repeat-3	<span class="token comment">/* 重复3次 */</span>
animate__infinite	<span class="token comment">/* 重复无限次 */</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div></li>
<li>
<p>速度</p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token comment">/* 默认1秒内完成动画 */</span>
animate__slow <span class="token comment">/* 2秒内完成动画 */</span>
animate__slower	<span class="token comment">/* 3秒内完成动画 */</span>
animate__fast	<span class="token comment">/* 800毫秒内完成动画 */</span>
animate__faster	<span class="token comment">/* 500毫秒内完成动画 */</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div></li>
</ul>
<p>示例：</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token comment">&lt;!-- 
使用animate.css
动画名：bounce
速度：快
重复：无限次
延迟：1秒
--></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span>
    <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>
           animate__animated
           animate__bounce
           animate_fast
           animate__infinite
           animate__delay-1s
           <span class="token punctuation">"</span></span>
    <span class="token punctuation">></span></span>
  Hello Animate
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div><h2 id="axios" tabindex="-1"><a class="header-anchor" href="#axios" aria-hidden="true">#</a> Axios</h2>
<blockquote>
<p>官网：https://axios-http.com/zh/</p>
<p>CDN：https://cdn.bootcdn.net/ajax/libs/axios/0.21.1/axios.min.js</p>
</blockquote>
<p>axios是一个请求库，在浏览器环境中，它封装了XHR，提供更加便捷的API发送请求</p>
<h3 id="基本使用-1" tabindex="-1"><a class="header-anchor" href="#基本使用-1" aria-hidden="true">#</a> 基本使用</h3>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 发送 get 请求到 https://study.duyiedu.com/api/herolist，输出响应体的内容</span>
axios<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">"https://study.duyiedu.com/api/herolist"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">resp</span><span class="token operator">=></span><span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>resp<span class="token punctuation">.</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// resp.data 为响应体的数据，axios会自动解析JSON格式</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token comment">// 发送 get 请求到 https://study.duyiedu.com/api/user/exists?loginId=abc，输出响应体的内容</span>
axios<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">"https://study.duyiedu.com/api/user/exists"</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">params</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token comment">// 这里可以配置 query，axios会自动将其进行Url编码</span>
    <span class="token literal-property property">loginId</span><span class="token operator">:</span> <span class="token string">"abc"</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">resp</span><span class="token operator">=></span><span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>resp<span class="token punctuation">.</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// resp.data 为响应体的数据，axios会自动解析JSON格式</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token comment">// 发送 post 请求到 https://study.duyiedu.com/api/user/reg</span>
<span class="token comment">// axios 会将第二个参数转换为JSON格式的请求体</span>
axios<span class="token punctuation">.</span><span class="token function">post</span><span class="token punctuation">(</span><span class="token string">"https://study.duyiedu.com/api/user/reg"</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">loginId</span><span class="token operator">:</span> <span class="token string">'abc'</span><span class="token punctuation">,</span>
  <span class="token literal-property property">loginPwd</span><span class="token operator">:</span> <span class="token string">'123123'</span><span class="token punctuation">,</span>
  <span class="token literal-property property">nickname</span><span class="token operator">:</span> <span class="token string">'棒棒鸡'</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">resp</span><span class="token operator">=></span><span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>resp<span class="token punctuation">.</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// resp.data 为响应体的数据，axios会自动解析JSON格式</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div><p>axios的基本用法为：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>axios<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>url地址<span class="token punctuation">,</span> <span class="token punctuation">[</span>请求配置<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
axios<span class="token punctuation">.</span><span class="token function">post</span><span class="token punctuation">(</span>url地址<span class="token punctuation">,</span> <span class="token punctuation">[</span>请求体对象<span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token punctuation">[</span>请求配置<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 或直接使用 axios 方法，在请求配置中填写请求方法</span>
<span class="token function">axios</span><span class="token punctuation">(</span>请求配置<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h3 id="实例" tabindex="-1"><a class="header-anchor" href="#实例" aria-hidden="true">#</a> 实例</h3>
<p>axios允许开发者先创建一个实例，后续通过使用实例进行请求</p>
<p>这样做的好处是可以预先进行某些配置</p>
<p>示例：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 创建实例</span>
<span class="token keyword">const</span> instance <span class="token operator">=</span> axios<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">baseURL</span><span class="token operator">:</span> <span class="token string">'https://study.duyiedu.com/'</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 发送 get 请求到 https://study.duyiedu.com/api/herolist，输出响应体的内容</span>
instance<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">"/api/herolist"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">resp</span><span class="token operator">=></span><span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>resp<span class="token punctuation">.</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// resp.data 为响应体的数据，axios会自动解析JSON格式</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h3 id="拦截器" tabindex="-1"><a class="header-anchor" href="#拦截器" aria-hidden="true">#</a> 拦截器</h3>
<p>有时，我们可能需要对所有的请求或响应做一些统一的处理</p>
<p>比如，在请求时，如果发现本地有token，需要附带到请求头</p>
<p>又比如，在拿到响应后，我们仅需要取响应体中的data属性</p>
<p>再比如，如果发生错误，我们需要做一个弹窗显示</p>
<p><strong>这些统一的行为就非常适合使用拦截器</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 添加请求拦截器</span>
axios<span class="token punctuation">.</span>interceptors<span class="token punctuation">.</span>request<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">config</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// config 为当前的请求配置</span>
  <span class="token comment">// 在发送请求之前做些什么</span>
  <span class="token comment">// 这里，我们添加一个请求头</span>
  <span class="token keyword">const</span> token <span class="token operator">=</span> localStorage<span class="token punctuation">.</span><span class="token function">getItem</span><span class="token punctuation">(</span><span class="token string">'token'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">if</span><span class="token punctuation">(</span>token<span class="token punctuation">)</span><span class="token punctuation">{</span>
    config<span class="token punctuation">.</span>headers<span class="token punctuation">.</span>authorization <span class="token operator">=</span> token<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> config<span class="token punctuation">;</span> <span class="token comment">// 返回处理后的配置</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 添加响应拦截器</span>
axios<span class="token punctuation">.</span>interceptors<span class="token punctuation">.</span>response<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">resp</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 2xx 范围内的状态码都会触发该函数。</span>
  <span class="token comment">// 对响应数据做点什么</span>
  <span class="token keyword">return</span> resp<span class="token punctuation">.</span>data<span class="token punctuation">.</span>data<span class="token punctuation">;</span> <span class="token comment">// 仅得到响应体中的data属性</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 超出 2xx 范围的状态码都会触发该函数。</span>
  <span class="token comment">// 对响应错误做点什么</span>
  <span class="token function">alert</span><span class="token punctuation">(</span>error<span class="token punctuation">.</span>message<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 弹出错误消息</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div><p>设置好拦截器后，后续的请求和响应都会触发对应的函数</p>
<p>拦截器可以针对axios实例进行设置</p>
<h2 id="mockjs" tabindex="-1"><a class="header-anchor" href="#mockjs" aria-hidden="true">#</a> MockJS</h2>
<blockquote>
<p>官网：http://mockjs.com/</p>
<p>CDN：https://cdn.bootcdn.net/ajax/libs/Mock.js/1.0.0/mock-min.js</p>
</blockquote>
<p>MockJS有两个作用：</p>
<ol>
<li>产生模拟数据</li>
<li>拦截Ajax</li>
</ol>
<p>下面两张图说明MockJS的作用</p>
<p><img src="http://mdrs.yuanjin.tech/img/20210524134909.png" alt="image-20210524134909296"></p>
<p><img src="http://mdrs.yuanjin.tech/img/20210524135812.png" alt="image-20210524135812109"></p>
<h3 id="仅模拟数据" tabindex="-1"><a class="header-anchor" href="#仅模拟数据" aria-hidden="true">#</a> 仅模拟数据</h3>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Mock<span class="token punctuation">.</span><span class="token function">mock</span><span class="token punctuation">(</span>数据模板<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>数据模板有其特有的书写规范，具体写法见官网</p>
<h3 id="拦截-模拟数据" tabindex="-1"><a class="header-anchor" href="#拦截-模拟数据" aria-hidden="true">#</a> 拦截+模拟数据</h3>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Mock<span class="token punctuation">.</span><span class="token function">mock</span><span class="token punctuation">(</span>要拦截的url<span class="token punctuation">,</span> 要拦截的请求方法<span class="token punctuation">,</span> 数据模板<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>更多用法见官网</p>
<p><strong>注意，MockJS拦截数据的原理是重写了XHR，因此它仅能拦截XHR的数据请求，而无法拦截使用<code>fetch </code>发出的请求</strong></p>
<p>具体的，MockJS可以拦截：</p>
<ul>
<li>原生<code>XmlHttpRequest</code></li>
<li><code>jQuery</code>中的<code>$.ajax</code></li>
<li><code>axios</code></li>
</ul>
<p>MockJS可以模拟网络延时，用法为：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Mock<span class="token punctuation">.</span><span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">timeout</span><span class="token operator">:</span> <span class="token number">400</span> <span class="token comment">// 网络延时400毫秒</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

Mock<span class="token punctuation">.</span><span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  <span class="token literal-property property">timeout</span><span class="token operator">:</span> <span class="token string">'200-600'</span> <span class="token comment">// 网络延时200-600毫秒</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h2 id="moment" tabindex="-1"><a class="header-anchor" href="#moment" aria-hidden="true">#</a> Moment</h2>
<blockquote>
<p>官网：https://momentjs.com/</p>
<p>中文网：http://momentjs.cn/</p>
<p>CDN：https://cdn.bootcdn.net/ajax/libs/moment.js/2.29.1/moment.min.js</p>
<p>各种语言包：https://www.bootcdn.cn/moment.js/</p>
</blockquote>
<p>Moment提供了强大的日期处理能力</p>
<h3 id="时间基础知识" tabindex="-1"><a class="header-anchor" href="#时间基础知识" aria-hidden="true">#</a> 时间基础知识</h3>
<h4 id="单位" tabindex="-1"><a class="header-anchor" href="#单位" aria-hidden="true">#</a> 单位</h4>
<table>
<thead>
<tr>
<th>单位</th>
<th>名称</th>
<th>换算</th>
</tr>
</thead>
<tbody>
<tr>
<td>hour</td>
<td>小时</td>
<td>1 day = 24 hours</td>
</tr>
<tr>
<td>minute</td>
<td>分钟</td>
<td>1 hour = 60 minutes</td>
</tr>
<tr>
<td>second</td>
<td>秒</td>
<td>1 minute = 60 seconds</td>
</tr>
<tr>
<td>millisecond （ms）</td>
<td>毫秒</td>
<td>1 second = 1000 ms</td>
</tr>
<tr>
<td>nanosecond （ns）</td>
<td>纳秒</td>
<td>1 ms = 1000 ns</td>
</tr>
</tbody>
</table>
<h4 id="gmt和utc" tabindex="-1"><a class="header-anchor" href="#gmt和utc" aria-hidden="true">#</a> GMT和UTC</h4>
<p>世界划分为24个时区，北京在东8区，格林威治在0时区。</p>
<p><img src="https://gblobscdn.gitbook.com/assets%2F-LQcTxgqTqhC05ckLpLr%2F-LikgRi0I4q8Q0a3kFgz%2F-LikgSk-E-e8AcD50vHu%2F2019-07-02-11-14-46.png?alt=media" alt="时区"></p>
<p><strong>GMT</strong>：Greenwish Mean Time 格林威治世界时。太阳时，精确到毫秒。</p>
<p><strong>UTC</strong>：Universal Time Coodinated 世界协调时。以原子时间为计时标准，精确到纳秒。</p>
<blockquote>
<p>国际标准中，已全面使用UTC时间，而不再使用GMT时间</p>
</blockquote>
<p>GMT和UTC时间在文本表示格式上是一致的，均为<code>星期缩写, 日期 月份 年份 时间 GMT</code>，例如：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>Thu, 27 Aug 2020 08:01:44 GMT
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>另外，ISO 8601标准规定，建议使用以下方式表示时间：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>YYYY-MM-DDTHH:mm:ss.msZ
例如：
2020-08-27T08:01:44.000Z
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p><strong>GMT、UTC、ISO 8601都表示的是零时区的时间</strong></p>
<h4 id="unix-时间戳" tabindex="-1"><a class="header-anchor" href="#unix-时间戳" aria-hidden="true">#</a> Unix 时间戳</h4>
<blockquote>
<p>Unix 时间戳（Unix Timestamp）是Unix系统最早提出的概念</p>
</blockquote>
<p>它将UTC时间1970年1月1日凌晨作为起始时间，到指定时间经过的秒数（毫秒数）</p>
<h4 id="程序中的时间处理" tabindex="-1"><a class="header-anchor" href="#程序中的时间处理" aria-hidden="true">#</a> 程序中的时间处理</h4>
<p><strong>程序对时间的计算、存储务必使用UTC时间，或者时间戳</strong></p>
<p><strong>在和用户交互时，将UTC时间或时间戳转换为更加友好的文本</strong></p>
<img src="http://mdrs.yuanjin.tech/img/20200827163636.png" alt="image-20200827163636508" style="zoom:50%;" />
<p>思考下面的问题：</p>
<ol>
<li>用户的生日是本地时间还是UTC时间？</li>
<li>如果要比较两个日期的大小，是比较本地时间还是比较UTC时间？</li>
<li>如果要显示文章的发布日期，是显示本地时间还是显示UTC时间？</li>
<li><code>北京时间2020-8-28 10:00:00</code>和<code>格林威治2020-8-28 02:00:00</code>，两个时间哪个大，哪个小？</li>
<li><code>北京的时间戳为0</code>和<code>格林威治的时间戳为0</code>，它们的时间一样吗？</li>
<li>一个中国用户注册时填写的生日是<code>1970-1-1</code>，它出生的UTC时间是多少？时间戳是多少？</li>
</ol>
<h3 id="moment的核心用法" tabindex="-1"><a class="header-anchor" href="#moment的核心用法" aria-hidden="true">#</a> Moment的核心用法</h3>
<img src="http://mdrs.yuanjin.tech/img/20200828144832.png" alt="image-20200828144832151" style="zoom:50%;" />
<p>Moment的使用分为两个部分：</p>
<ol>
<li>获得Moment对象</li>
<li>针对Moment对象做各种操作</li>
</ol>
<h2 id="echarts" tabindex="-1"><a class="header-anchor" href="#echarts" aria-hidden="true">#</a> ECharts</h2>
<blockquote>
<p>官网：https://echarts.apache.org/zh</p>
<p>CDN：https://cdn.bootcdn.net/ajax/libs/echarts/5.1.1/echarts.min.js</p>
</blockquote>
<p>具体使用方法见课程讲解</p>
</template>
