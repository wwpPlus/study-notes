<template><h1 id="javascript" tabindex="-1"><a class="header-anchor" href="#javascript" aria-hidden="true">#</a> JavaScript</h1>
<h2 id="javascript基础" tabindex="-1"><a class="header-anchor" href="#javascript基础" aria-hidden="true">#</a> JavaScript基础</h2>
<h3 id="javascript数据类型" tabindex="-1"><a class="header-anchor" href="#javascript数据类型" aria-hidden="true">#</a> JavaScript数据类型</h3>
<p>在 JavaScript 中有 6 种不同的数据类型：</p>
<ul>
<li>string</li>
<li>number</li>
<li>boolean</li>
<li>object</li>
<li>function</li>
<li>symbol</li>
</ul>
<p>3 种对象类型：</p>
<ul>
<li>Object</li>
<li>Date</li>
<li>Array</li>
</ul>
<p>2 个不包含任何值的数据类型：</p>
<ul>
<li>null</li>
<li>undefined</li>
</ul>
<h3 id="javascript变量的生存期" tabindex="-1"><a class="header-anchor" href="#javascript变量的生存期" aria-hidden="true">#</a> JavaScript变量的生存期</h3>
<ul>
<li>局部变量会在函数运行以后被删除。</li>
<li>全局变量会在页面关闭后被删除。</li>
</ul>
<h3 id="javascript声明提升" tabindex="-1"><a class="header-anchor" href="#javascript声明提升" aria-hidden="true">#</a> JavaScript声明提升</h3>
<p>声明提升：函数声明和变量声明总是会被解释器悄悄地被&quot;提升&quot;到方法体的最顶部。
JavaScript 只有声明的变量会提升，初始化的不会。</p>
<h3 id="this关键字" tabindex="-1"><a class="header-anchor" href="#this关键字" aria-hidden="true">#</a> this关键字</h3>
<ul>
<li>在方法中，this 表示该方法所属的对象。</li>
<li>如果单独使用，this 表示全局对象。</li>
<li>在函数中，this 表示全局对象。</li>
<li>在函数中，在严格模式下，this 是未定义的(undefined)。</li>
<li>在事件中，this 表示接收事件的元素。</li>
<li>类似 call() 和 apply() 方法可以将 this 引用到任何对象。</li>
</ul>
<p>在下面实例中，当我们使用 person2 作为参数来调用 person1.fullName 方法时, this 将指向 person2, 即便它是 person1 的方法：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> person1 <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token function-variable function">fullName</span><span class="token operator">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>firstName <span class="token operator">+</span> <span class="token string">" "</span> <span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span>lastName<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">var</span> person2 <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">firstName</span><span class="token operator">:</span><span class="token string">"John"</span><span class="token punctuation">,</span>
    <span class="token literal-property property">lastName</span><span class="token operator">:</span> <span class="token string">"Doe"</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
person1<span class="token punctuation">.</span><span class="token function">fullName</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>person2<span class="token punctuation">)</span><span class="token punctuation">;</span>  <span class="token comment">// 返回 "John Doe"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><h3 id="let和const关键字" tabindex="-1"><a class="header-anchor" href="#let和const关键字" aria-hidden="true">#</a> let和const关键字</h3>
<ul>
<li>使用 <code>var</code> 关键字重新声明变量可能会带来问题。
在块中重新声明变量也会重新声明块外的变量, <code>let</code> 关键字就可以解决这个问题，因为它只在 <code>let</code> 命令所在的代码块 <code>{}</code> 内有效。</li>
</ul>
<blockquote>
<p><code>let</code> 关键字定义的变量则不可以在使用后声明，也就是变量需要先声明再使用。</p>
</blockquote>
<ul>
<li><code>const</code> 用于声明一个或多个常量，声明时必须进行初始化，且初始化后值不可再修改。</li>
</ul>
<blockquote>
<p><code>const</code> 的本质: <code>const</code> 定义的变量并非常量，并非不可变，它定义了一个常量引用一个值。使用 const 定义的对象或者数组，其实是可变的，但是不能对常量对象、数组重新赋值。</p>
</blockquote>
<h3 id="函数" tabindex="-1"><a class="header-anchor" href="#函数" aria-hidden="true">#</a> 函数</h3>
<p>箭头函数</p>
<p>有的箭头函数都没有自己的 this。 不适合定义一个 对象的方法。
当我们使用箭头函数的时候，箭头函数会默认帮我们绑定外层 this 的值，所以在箭头函数中 this 的值和外层的 this 是一样的。
箭头函数是不能提升的，所以需要在使用之前定义。</p>
<p>函数参数</p>
<ul>
<li>显式参数在函数定义时列出。显式参数时没有指定数据类型。</li>
<li>隐式参数在函数调用时传递给函数真正的值。隐式参数没有进行类型检测、参数的个数也没有进行检测。</li>
</ul>
<p>函数有个内置的对象 arguments 对象包含了函数调用的参数数组。</p>
<ul>
<li>
<p>通过值传递参数：在函数中调用的参数是函数的隐式参数。函数仅仅只是获取值。如果函数修改参数的值，不会修改显式参数的初始值（在函数外定义）。隐式参数的改变在函数外是不可见的。</p>
</li>
<li>
<p>通过对象传递参数：可以引用对象的值。因此我们在函数内部修改对象的属性就会修改其初始的值。修改对象属性可作用于函数外部（全局变量）。修改对象属性在函数外是可见的。</p>
</li>
<li>
<p>严格模式(strict mode)下, 在调用函数时第一个参数会成为 this 的值， 即使该参数不是一个对象。</p>
</li>
<li>
<p>非严格模式(non-strict mode)下, 如果第一个参数的值是 null 或 undefined, 它将使用全局对象替代。</p>
</li>
</ul>
<p>闭包
在 <code>JavaScript</code> 中，所有函数都能访问它们上一层的作用域。
<code>JavaScript</code> 支持嵌套函数。嵌套函数可以访问上一层的函数变量。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> add <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> counter <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token keyword">return</span> counter <span class="token operator">+=</span> <span class="token number">1</span><span class="token punctuation">;</span><span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">add</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">add</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">add</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 计数器为 3</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>实例解析</p>
<p>计数器受匿名函数的作用域保护，只能通过 add 方法修改。</p>
<ol>
<li>
<p>变量 add 指定了函数自我调用的返回字值。</p>
</li>
<li>
<p>自我调用函数只执行一次。设置计数器为 0。并返回函数表达式。</p>
</li>
<li>
<p>add变量可以作为一个函数使用。非常棒的部分是它可以访问函数上一层作用域的计数器。</p>
</li>
<li>
<p>这个叫作 JavaScript 闭包。它使得函数拥有私有变量变成可能。</p>
</li>
</ol>
<blockquote>
<p>闭包是一种保护私有变量的机制，在函数执行时形成私有的作用域，保护里面的私有变量不受外界干扰。直观的说就是形成一个不销毁的栈环境。</p>
</blockquote>
<h3 id="javascript-prototype-原型对象" tabindex="-1"><a class="header-anchor" href="#javascript-prototype-原型对象" aria-hidden="true">#</a> JavaScript prototype（原型对象）</h3>
<p>所有的 JavaScript 对象都会从一个 prototype（原型对象）中继承属性和方法。</p>
<p>所有 JavaScript 中的对象都是位于原型链顶端的 Object 的实例。</p>
<p>JavaScript 对象有一个指向一个原型对象的链。当试图访问一个对象的属性时，它不仅仅在该对象上搜寻，还会搜寻该对象的原型，以及该对象的原型的原型，依次层层向上搜索，直到找到一个名字匹配的属性或到达原型链的末尾。</p>
<h3 id="原型链" tabindex="-1"><a class="header-anchor" href="#原型链" aria-hidden="true">#</a> 原型链</h3>
<h4 id="什么是原型链" tabindex="-1"><a class="header-anchor" href="#什么是原型链" aria-hidden="true">#</a> 什么是原型链</h4>
<p><strong>所有的对象都是通过<code>new 函数</code>的方式创建的</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> u1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">User</span><span class="token punctuation">(</span><span class="token string">'邓'</span><span class="token punctuation">,</span> <span class="token string">'旭明'</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 对象 u1 通过 new User 创建</span>
<span class="token keyword">var</span> u2 <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token comment">// 对象 u2 通过 new Object 创建</span>
  <span class="token literal-property property">firstName</span><span class="token operator">:</span> <span class="token string">'莫'</span><span class="token punctuation">,</span>
  <span class="token literal-property property">lastName</span><span class="token operator">:</span> <span class="token string">'妮卡'</span>
<span class="token punctuation">}</span>
<span class="token comment">// 等效于</span>
<span class="token keyword">var</span> u2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Object</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
u2<span class="token punctuation">.</span>firstName <span class="token operator">=</span> <span class="token string">'莫'</span><span class="token punctuation">;</span>
u2<span class="token punctuation">.</span>lastName <span class="token operator">=</span> <span class="token string">'妮卡'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>上面的代码形成的原型图如下</p>
<p><img src="http://mdrs.yuanjin.tech/img/20210903081220.png" alt="image-20210903081220607"></p>
<p>原型对象本身也是一个对象，默认情况下，是通过<code>new Object</code>创建的，因此，上面的两幅原型图是可以发生关联的</p>
<img src="http://mdrs.yuanjin.tech/img/20210903082540.png" alt="image-20210903082540379" style="zoom:50%;" />
<blockquote>
<p><code>Object.prototype.__proto__</code>比较特殊，它固定指向null</p>
</blockquote>
<p>可以看出，u1的隐式原型形成了一个链条，称之为<strong>原型链</strong></p>
<p>当读取对象成员时，会先看对象自身是否有该成员，如果没有，就依次在其原型链上查找</p>
<h4 id="完整的链条" tabindex="-1"><a class="header-anchor" href="#完整的链条" aria-hidden="true">#</a> 完整的链条</h4>
<p><img src="http://mdrs.yuanjin.tech/img/20210903152359.png" alt="image-20210903152359095"></p>
<h4 id="对开发的影响" tabindex="-1"><a class="header-anchor" href="#对开发的影响" aria-hidden="true">#</a> 对开发的影响</h4>
<h5 id="在原型上更改会产生多大影响" tabindex="-1"><a class="header-anchor" href="#在原型上更改会产生多大影响" aria-hidden="true">#</a> 在原型上更改会产生多大影响</h5>
<p>更改构造函数的原型会对所有原型链上有该构造函数的原型的对象产生影响</p>
<h5 id="学会利用原型链判断类型" tabindex="-1"><a class="header-anchor" href="#学会利用原型链判断类型" aria-hidden="true">#</a> 学会利用原型链判断类型</h5>
<ol>
<li>
<p><code>instanceof</code>关键字【常用】</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>object <span class="token keyword">instanceof</span> <span class="token class-name">constructor</span>
<span class="token comment">// 判断object的原型链中，是否存在constructor的原型</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div></li>
<li>
<p><code>Object.getPrototypeOf()</code>【不常用】</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Object<span class="token punctuation">.</span><span class="token function">getPrototypeOf</span><span class="token punctuation">(</span>object<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 返回object的隐式原型</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div></li>
</ol>
<h5 id="学会创建空原型的对象" tabindex="-1"><a class="header-anchor" href="#学会创建空原型的对象" aria-hidden="true">#</a> 学会创建空原型的对象</h5>
<ol>
<li>
<p>利用<code>Object.create()</code></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Object<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span>target<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 返回一个新对象，新对象以target作为隐式原型</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div></li>
<li>
<p>利用<code>Object.setPrototypeOf()</code></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Object<span class="token punctuation">.</span><span class="token function">setPrototypeOf</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span> prototype<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 设置obj的隐式原型为prototype</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div></li>
</ol>
<h3 id="继承" tabindex="-1"><a class="header-anchor" href="#继承" aria-hidden="true">#</a> 继承</h3>
<h4 id="会员系统" tabindex="-1"><a class="header-anchor" href="#会员系统" aria-hidden="true">#</a> 会员系统</h4>
<p>视频网站有两种会员：</p>
<ul>
<li>普通会员
<ul>
<li>属性：用户名、密码</li>
<li>方法：观看免费视频</li>
</ul>
</li>
<li>VIP会员
<ul>
<li>属性：普通会员的所有属性、会员到期时间</li>
<li>方法：普通会员的所有方法、观看付费视频</li>
</ul>
</li>
</ul>
<p>如果我们需要使用构造函数来创建会员，如何书写构造函数才能实现上面的需求？</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 普通会员的构造函数</span>
<span class="token keyword">function</span> <span class="token function">User</span><span class="token punctuation">(</span><span class="token parameter">username<span class="token punctuation">,</span> password</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>username <span class="token operator">=</span> username<span class="token punctuation">;</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>password <span class="token operator">=</span> password<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token class-name">User</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">playFreeVideo</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'观看免费视频'</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// VIP会员的构造函数</span>
<span class="token keyword">function</span> <span class="token function">VIPUser</span><span class="token punctuation">(</span><span class="token parameter">username<span class="token punctuation">,</span> password<span class="token punctuation">,</span> expires</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>username <span class="token operator">=</span> username<span class="token punctuation">;</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>password <span class="token operator">=</span> password<span class="token punctuation">;</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>expires <span class="token operator">=</span> expires<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token class-name">VIPUser</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">playFreeVideo</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'观看免费视频'</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token class-name">VIPUser</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">playPayVideo</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'观看付费视频'</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><p>上面的代码出现了两处重复代码：</p>
<ol>
<li>
<p>VIPUser的构造函数中包含重复代码</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">this</span><span class="token punctuation">.</span>username <span class="token operator">=</span> username<span class="token punctuation">;</span>
<span class="token keyword">this</span><span class="token punctuation">.</span>password <span class="token operator">=</span> password<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>这段代码和User构造函数并没有区别，可以想象得到，将来也不会有区别，即：<strong>普通用户该有的属性，VIP用户一定有</strong></p>
</li>
<li>
<p>VIPUser的原型上包含了重复代码</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token class-name">VIPUser</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">playFreeVideo</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'观看免费视频'</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>这个方法和User上的同名方法逻辑完全一致，可以想象得到，将来也不会有区别，即：<strong>普通用户该有的方法，VIP用户一定有</strong></p>
</li>
</ol>
<blockquote>
<p>如何解决上述两处重复？</p>
</blockquote>
<h4 id="处理构造器内部的重复" tabindex="-1"><a class="header-anchor" href="#处理构造器内部的重复" aria-hidden="true">#</a> 处理构造器内部的重复</h4>
<p>可以将VIPUser构造器改写为</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">VIPUser</span><span class="token punctuation">(</span><span class="token parameter">username<span class="token punctuation">,</span> password<span class="token punctuation">,</span> expires</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token function">User</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> username<span class="token punctuation">,</span> password<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>expires <span class="token operator">=</span> expires<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h4 id="处理原型上的重复" tabindex="-1"><a class="header-anchor" href="#处理原型上的重复" aria-hidden="true">#</a> 处理原型上的重复</h4>
<p>只需要将原型链设置为下面的结构即可</p>
<img src="http://mdrs.yuanjin.tech/img/20211214155347.png" alt="image-20211214155342118" style="zoom:50%;" />
<p>仅需一句代码即可</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Object<span class="token punctuation">.</span><span class="token function">setPrototypeOf</span><span class="token punctuation">(</span><span class="token class-name">VIPUser</span><span class="token punctuation">.</span>prototype<span class="token punctuation">,</span> <span class="token class-name">User</span><span class="token punctuation">.</span>prototype<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>至此，完美的解决了之前提到的两处重复代码的问题</p>
<h4 id="这和继承有什么关系" tabindex="-1"><a class="header-anchor" href="#这和继承有什么关系" aria-hidden="true">#</a> 这和继承有什么关系</h4>
<p>继承是面向对象的概念，它描述了两个对象类型（类，构造函数）之间的关系</p>
<p>如果在逻辑上可以描述为：A不一定是B，但B一定是A，则：B继承A、A派生B、A是B的父类、B是A的子类</p>
<p><strong>子类的实例应该自动拥有父类的所有成员</strong></p>
<p>继承具有两个特性：</p>
<ul>
<li>单根性：子类最多只有一个父类</li>
<li>传递性：间接父类的成员会传递到子类中</li>
</ul>
<h4 id="如何在js中封装继承" tabindex="-1"><a class="header-anchor" href="#如何在js中封装继承" aria-hidden="true">#</a> 如何在JS中封装继承</h4>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">inherit</span><span class="token punctuation">(</span><span class="token parameter">Child<span class="token punctuation">,</span> Parent</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token comment">// 在原型链上完成继承 </span>
  Object<span class="token punctuation">.</span><span class="token function">setPrototypeOf</span><span class="token punctuation">(</span><span class="token class-name">Child</span><span class="token punctuation">.</span>prototype<span class="token punctuation">,</span> <span class="token class-name">Parent</span><span class="token punctuation">.</span>prototype<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h3 id="异常" tabindex="-1"><a class="header-anchor" href="#异常" aria-hidden="true">#</a> 异常</h3>
<blockquote>
<p>重点是<strong>异常的分类</strong></p>
<p>剩余两部分的知识，绝大部分情况下都用不到，除非你要写一些 <em>高端</em> 的代码</p>
</blockquote>
<p><img src="http://mdrs.yuanjin.tech/img/20211222175234.png" alt="image-20211222175234095"></p>
<p><strong>异常并非坏事，它可以让开发人员及时发现错误、定位错误，甚至在某些时候，我们还需要故意的抛出异常</strong></p>
<h4 id="异常的分类" tabindex="-1"><a class="header-anchor" href="#异常的分类" aria-hidden="true">#</a> 异常的分类</h4>
<p>在JS中，异常表现为一个对象，不同的对象表达了不同的异常类型，不同类型的异常对应到不同的错误</p>
<table>
<thead>
<tr>
<th>异常类型</th>
<th>含义</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>SyntaxError</strong></td>
<td>语法错误</td>
</tr>
<tr>
<td><strong>ReferenceError</strong></td>
<td>引用错误，往往是使用了未定义的变量或函数</td>
</tr>
<tr>
<td><strong>TypeError</strong></td>
<td>类型错误，往往是使用了一个对象中不存在的成员</td>
</tr>
</tbody>
</table>
<p><strong>每个异常都是一个对象，通过对应的构造函数创建</strong></p>
<blockquote>
<p>所有的异常构造器都继承自Error，更多信息参见<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Error" target="_blank" rel="noopener noreferrer">MDN<ExternalLinkIcon/></a></p>
</blockquote>
<p>当代码运行过程中出现错误时，JS会：</p>
<ol>
<li>自动创建对应的异常对象，抛出错误</li>
<li>程序终止运行</li>
<li>控制台中会显示异常对象</li>
</ol>
<p>每个异常对象都至少记录了<strong>两个关键信息</strong>：</p>
<ol>
<li>错误消息描述：描述异常出现的原因</li>
<li>调用堆栈信息：描述异常出现的位置</li>
</ol>
<h4 id="捕获异常" tabindex="-1"><a class="header-anchor" href="#捕获异常" aria-hidden="true">#</a> 捕获异常</h4>
<p>捕获异常就是处理错误，当错误发生后，我们对错误进行相应的处理，让程序不至于终止</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">try</span><span class="token punctuation">{</span>
  <span class="token comment">// 代码1</span>
<span class="token punctuation">}</span>
<span class="token keyword">catch</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token comment">// 代码2：当代码1出现异常后，会执行这里的代码，异常对象会传递给err</span>
<span class="token punctuation">}</span>
<span class="token keyword">finally</span><span class="token punctuation">{</span>
  <span class="token comment">// 代码3：可省略。无论是否有异常，都会执行</span>
<span class="token punctuation">}</span>

<span class="token comment">// 无异常的执行顺序：代码1 --> 代码3</span>
<span class="token comment">// 有异常的执行顺序：代码1 --> 出现异常，中断代码1的执行 --> 代码2 --> 代码3</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><p><strong>在绝大部分时候，我们都无须捕获异常，除非满足以下要求：</strong></p>
<ol>
<li>我们能够预知某段代码会出现异常</li>
<li>我们知道出现异常后要做什么</li>
</ol>
<p>上面的条件任意一个不满足，都不应该处理异常</p>
<p><strong>永远不能为了不报错而捕获异常！</strong></p>
<p>下面是一段可能使用异常捕获的伪代码</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">try</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> heros <span class="token operator">=</span> network<span class="token punctuation">.</span><span class="token function">getHeros</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 从网络获取王者荣耀英雄数据，得到英雄数组</span>
  <span class="token function">createHTML</span><span class="token punctuation">(</span>heros<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 将数组生成HTML</span>
<span class="token punctuation">}</span>
<span class="token keyword">catch</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 出现网络故障，给用户显示一个提示框</span>
  <span class="token function">showErrorDialog</span><span class="token punctuation">(</span><span class="token string">'网络故障，请检查您的网络是否连接正常。故障原因：'</span> <span class="token operator">+</span> err<span class="token punctuation">.</span>message<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><h4 id="手动抛出异常" tabindex="-1"><a class="header-anchor" href="#手动抛出异常" aria-hidden="true">#</a> 手动抛出异常</h4>
<p>不仅浏览器会自动给我们抛出异常，我们还可以手动的抛出异常</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">throw</span> 异常对象<span class="token punctuation">;</span> <span class="token comment">// 当代码运行到这里，会终止执行，抛出异常对象，效果和浏览器抛出的错误完全一样</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>当编写函数时，如果满足下面三个条件，就可以选择抛出异常：</p>
<ol>
<li>预知执行过程中可能会出现某种错误</li>
<li>浏览器不会抛出这个错误</li>
<li>该函数无法处理这个错误</li>
</ol>
<p>下面展现了一个需要抛出异常的例子</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token doc-comment comment">/**
 * 得到两个数字之和
 * 若传递的不是数字，则会抛出TypeError
 * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span>number<span class="token punctuation">}</span></span> <span class="token parameter">a</span> 数字1
 * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span>number<span class="token punctuation">}</span></span> <span class="token parameter">b</span> 数字2
 * <span class="token keyword">@return</span> <span class="token class-name"><span class="token punctuation">{</span>number<span class="token punctuation">}</span></span> 两数之和
 */</span>
<span class="token keyword">function</span> <span class="token function">sum</span><span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span> b</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token keyword">typeof</span> a <span class="token operator">!==</span> <span class="token string">'number'</span> <span class="token operator">||</span> <span class="token keyword">typeof</span> b <span class="token operator">!==</span> <span class="token string">'number'</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">TypeError</span><span class="token punctuation">(</span><span class="token string">'必须传入两个数字才能求和'</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> a <span class="token operator">+</span> b<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p><strong>规范：如果某个函数需要抛出异常，一定要在函数的文档注释中阐述清楚</strong></p>
<h2 id="浏览器的渲染流程" tabindex="-1"><a class="header-anchor" href="#浏览器的渲染流程" aria-hidden="true">#</a> 浏览器的渲染流程</h2>
<h3 id="解析html" tabindex="-1"><a class="header-anchor" href="#解析html" aria-hidden="true">#</a> 解析HTML</h3>
<p>浏览器从网络或本地文件中获取到HTML源代码，然后从上到下的解析源代码</p>
<p>若解析过程中，读取到CSS或JS，<strong>停止解析（阻塞）</strong>，转而解析CSS或执行JS</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">html</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>en<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>UTF-8<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">http-equiv</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>X-UA-Compatible<span class="token punctuation">"</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>IE=edge<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>viewport<span class="token punctuation">"</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>width=device-width, initial-scale=1.0<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">></span></span>Document<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>link</span> <span class="token attr-name">rel</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>stylesheet<span class="token punctuation">"</span></span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>./css/index.css<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span><span class="token punctuation">></span></span>Hello World!<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>./js/index.js<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>Lorem<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><img src="http://mdrs.yuanjin.tech/img/20211222115309.png" alt="image-20211222115303832" style="zoom:50%;" />
<blockquote>
<p><strong>为什么要将CSS写到页面的开头，而JS写到页面的最后？</strong></p>
<p>将CSS写到页面开头，是为了让浏览器尽快读取并解析样式，避免给用户看到丑陋的页面，也是为了避免页面闪烁</p>
<p>将JS代码写到最后，是为了让浏览器尽快呈现页面给用户，然后再执行JS完成交互功能</p>
</blockquote>
<h3 id="生成dom树" tabindex="-1"><a class="header-anchor" href="#生成dom树" aria-hidden="true">#</a> 生成DOM树</h3>
<p><strong>浏览器会一边解析HTML，一边生成DOM树</strong>，我们在JS中获取到的DOM就是DOM树中的DOM</p>
<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-11-20-091428.png" alt="image-20211120171428854" style="zoom:50%;" />
<blockquote>
<p>当DOM树完全生成好后，会触发<code>DOMContentLoaded</code>事件</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>document<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">"DOMContentLoaded"</span><span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"DOM树已全部生成完毕"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>当页面中的所有外部资源全部加载完毕后，会触发<code>load</code>事件</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>window<span class="token punctuation">.</span><span class="token function-variable function">onload</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"所有资源已加载完成"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p><code>load</code>事件也可以针对单个外部资源使用，资源加载完成后触发</p>
</blockquote>
<h3 id="生成渲染树" tabindex="-1"><a class="header-anchor" href="#生成渲染树" aria-hidden="true">#</a> 生成渲染树</h3>
<p><strong>浏览器一边生成DOM树，一边计算DOM树中每个节点的样式规则，最终形成渲染树</strong>。</p>
<p>CSS属性的计算过程，发生在这一个步骤</p>
<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-11-20-091551.png" alt="image-20211120171550663" style="zoom:50%;" />
<h3 id="布局-layout-重排-reflow" tabindex="-1"><a class="header-anchor" href="#布局-layout-重排-reflow" aria-hidden="true">#</a> 布局 layout / 重排 reflow</h3>
<p>这个步骤又称之为<strong>reflow（回流、重排）</strong>，是指浏览器一边生成渲染树，一边计算每个元素最终的尺寸和位置</p>
<p>完成后，页面中的所有元素的位置和尺寸就确定下来了，即将被渲染到页面。</p>
<p>这个步骤会在页面之后的运行过程中不断的重复，<strong>下面的JS操作均会导致reflow</strong>：</p>
<ul>
<li>获取元素的尺寸和位置</li>
<li>直接或间接改变元素的尺寸和位置</li>
</ul>
<blockquote>
<p>reflow非常耗时，浏览器为了提升性能，对JS中<strong>连续</strong>导致reflow的代码，把reflow的时间点延迟到结束后进行，但在此过程中，如果遇到了获取尺寸和位置的代码，浏览器会迫不得已立即reflow</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>dom<span class="token punctuation">.</span>style<span class="token punctuation">.</span>width <span class="token operator">=</span> <span class="token string">'100px'</span>
dom<span class="token punctuation">.</span>style<span class="token punctuation">.</span>height <span class="token operator">=</span> <span class="token string">'200px'</span>
dom<span class="token punctuation">.</span>style<span class="token punctuation">.</span>left <span class="token operator">=</span> <span class="token string">'10px'</span>
dom<span class="token punctuation">.</span>style<span class="token punctuation">.</span>top <span class="token operator">=</span> <span class="token string">'10px'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><img src="http://mdrs.yuanjin.tech/img/20211222145016.png" alt="image-20211222145016258" style="zoom:50%;" />
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>dom<span class="token punctuation">.</span>style<span class="token punctuation">.</span>width <span class="token operator">=</span> <span class="token string">'100px'</span>
dom<span class="token punctuation">.</span>style<span class="token punctuation">.</span>height <span class="token operator">=</span> <span class="token string">'200px'</span>
dom<span class="token punctuation">.</span>clientHeight<span class="token punctuation">;</span> <span class="token comment">// 读取高度，导致强行reflow</span>
dom<span class="token punctuation">.</span>style<span class="token punctuation">.</span>left <span class="token operator">=</span> <span class="token string">'10px'</span>
dom<span class="token punctuation">.</span>style<span class="token punctuation">.</span>top <span class="token operator">=</span> <span class="token string">'10px'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><img src="http://mdrs.yuanjin.tech/img/20211222145207.png" alt="image-20211222145207563" style="zoom:50%;" />
</blockquote>
<h3 id="重绘-repaint" tabindex="-1"><a class="header-anchor" href="#重绘-repaint" aria-hidden="true">#</a> 重绘 repaint</h3>
<p>浏览器一边reflow，一边进行生成对应的图形绘制到页面，绘制的过程称之为repaint</p>
<p><strong>所有会导致reflow的代码，均会导致repaint</strong></p>
<p>绘制的过程是靠GPU完成的，速度非常快，因此，<strong>相对于导致reflow的代码，仅会导致repaint的代码效率会高出很多</strong></p>
<p>凡是不会影响盒子排列，仅影响盒子外观的代码都不会导致reflow，仅导致repaint，例如：</p>
<ul>
<li>改变背景颜色</li>
<li>改变字体颜色</li>
<li>圆角边框</li>
<li>背景图</li>
<li>......</li>
</ul>
<h2 id="技巧" tabindex="-1"><a class="header-anchor" href="#技巧" aria-hidden="true">#</a> 技巧</h2>
<h3 id="在循环中注册事件" tabindex="-1"><a class="header-anchor" href="#在循环中注册事件" aria-hidden="true">#</a> 在循环中注册事件</h3>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">3</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// 输出：3 3 3</span>

<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">3</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 产生一个新的作用域，作用域中有一个变量，值和这一次循环的i相同</span>
  <span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">i</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// 输出：0 1 2</span>
<span class="token comment">// 使用let 定义i 效果类似，块级作用域（代码块内有效）</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><h3 id="回调函数" tabindex="-1"><a class="header-anchor" href="#回调函数" aria-hidden="true">#</a> 回调函数</h3>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">filter</span><span class="token punctuation">(</span><span class="token parameter">arr<span class="token punctuation">,</span> callback</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> res <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> arr<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">callback</span><span class="token punctuation">(</span>arr<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      res<span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>arr<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">return</span> res<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">var</span> res <span class="token operator">=</span> <span class="token function">filter</span><span class="token punctuation">(</span>arr<span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">item</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> item<span class="token punctuation">.</span>age <span class="token operator">></span> <span class="token number">20</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><h3 id="函数防抖" tabindex="-1"><a class="header-anchor" href="#函数防抖" aria-hidden="true">#</a> 函数防抖</h3>
<p>使用条件</p>
<ol>
<li>函数频繁被触发</li>
<li>以最后一次结果为准</li>
</ol>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">debounce</span><span class="token punctuation">(</span><span class="token parameter">fn<span class="token punctuation">,</span> duration</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> timerId<span class="token punctuation">;</span>
  <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">clearTimeout</span><span class="token punctuation">(</span>timerId<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 将该函数的this传递到fn</span>
    <span class="token keyword">var</span> curThis <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
    <span class="token comment">// 将该函数的参数全部传递给fn</span>
    <span class="token keyword">var</span> args <span class="token operator">=</span> <span class="token class-name">Array</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span>arguments<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    timerId <span class="token operator">=</span> <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">fn</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span>curThis<span class="token punctuation">,</span> args<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span> duration<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token keyword">var</span> newHandler <span class="token operator">=</span> <span class="token function">debounce</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'用户有按键'</span><span class="token punctuation">,</span> e<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>value<span class="token punctuation">,</span> <span class="token string">'耗时操作'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">2000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">var</span> inp <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">'input'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
inp<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'input'</span><span class="token punctuation">,</span> newHandler<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">var</span> mouseMoveHandler <span class="token operator">=</span> <span class="token function">debounce</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'move'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

window<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'mousemove'</span><span class="token punctuation">,</span> mouseMoveHandler<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br></div></div><h3 id="断点调试" tabindex="-1"><a class="header-anchor" href="#断点调试" aria-hidden="true">#</a> 断点调试</h3>
<p><strong>debugger</strong></p>
<h2 id="标准库" tabindex="-1"><a class="header-anchor" href="#标准库" aria-hidden="true">#</a> 标准库</h2>
<h3 id="包装类" tabindex="-1"><a class="header-anchor" href="#包装类" aria-hidden="true">#</a> 包装类</h3>
<p>如果尝试着把原始类型（number、string、boolean）当做对象使用，JS会自动将其转换为对应包装类的实例</p>
<h4 id="number" tabindex="-1"><a class="header-anchor" href="#number" aria-hidden="true">#</a> Number</h4>
<p>https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number</p>
<table>
<thead>
<tr>
<th>API</th>
<th>含义</th>
<th>备注</th>
</tr>
</thead>
<tbody>
<tr>
<td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/NaN" target="_blank" rel="noopener noreferrer">Number.NaN<ExternalLinkIcon/></a></td>
<td>表示一个数学上并不存在的数字</td>
<td>可以直接书写为<code>NaN</code></td>
</tr>
<tr>
<td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/isNaN" target="_blank" rel="noopener noreferrer">Number.isNaN()<ExternalLinkIcon/></a></td>
<td>判断传入的值是否是NaN</td>
<td>可以直接书写为<code>isNaN</code></td>
</tr>
<tr>
<td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger" target="_blank" rel="noopener noreferrer">Number.isInteger()<ExternalLinkIcon/></a></td>
<td>判断传入的值是否是整数</td>
<td></td>
</tr>
<tr>
<td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/parseInt" target="_blank" rel="noopener noreferrer">Number.parseInt()<ExternalLinkIcon/></a></td>
<td>把传入的值转换为整数形式返回</td>
<td>可以直接书写为<code>parseInt()</code></td>
</tr>
<tr>
<td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/parseFloat" target="_blank" rel="noopener noreferrer">Number.parseFloat()<ExternalLinkIcon/></a></td>
<td>把传入的值转换为小数形式返回</td>
<td>可以直接书写为<code>parseFloat()</code></td>
</tr>
<tr>
<td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed" target="_blank" rel="noopener noreferrer">Number.prototype.toFixed()<ExternalLinkIcon/></a></td>
<td>将当前数字保留指定位数的小数返回</td>
<td>传入小数位数</td>
</tr>
<tr>
<td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/tostring" target="_blank" rel="noopener noreferrer">Number.prototype.toString()<ExternalLinkIcon/></a></td>
<td>将当前数字转换为字符串返回</td>
<td>传入进制2-36</td>
</tr>
</tbody>
</table>
<h4 id="string" tabindex="-1"><a class="header-anchor" href="#string" aria-hidden="true">#</a> String</h4>
<p>https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String</p>
<table>
<thead>
<tr>
<th>API</th>
<th>含义</th>
<th>备注</th>
</tr>
</thead>
<tbody>
<tr>
<td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/fromCharCode" target="_blank" rel="noopener noreferrer">String.fromCharCode()<ExternalLinkIcon/></a></td>
<td>根据编码值得到一个字符</td>
<td>传入一个或多个编码值</td>
</tr>
<tr>
<td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/length" target="_blank" rel="noopener noreferrer">String.prototype.length<ExternalLinkIcon/></a></td>
<td>得到字符串的长度</td>
<td></td>
</tr>
<tr>
<td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/charCodeAt" target="_blank" rel="noopener noreferrer">String.prototype.charCodeAt()<ExternalLinkIcon/></a></td>
<td>得到某个下标的字符编码</td>
<td>传入下标</td>
</tr>
<tr>
<td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/includes" target="_blank" rel="noopener noreferrer">String.prototype.includes()<ExternalLinkIcon/></a></td>
<td>判断当前字符串是否包含某个子串</td>
<td>传入子串</td>
</tr>
<tr>
<td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf" target="_blank" rel="noopener noreferrer">String.prototype.indexOf()<ExternalLinkIcon/></a></td>
<td>判断某个字符串在当前字符串中的第一个下标位置</td>
<td>如果没有，返回-1</td>
</tr>
<tr>
<td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/lastIndexOf" target="_blank" rel="noopener noreferrer">String.prototype.lastIndexOf()<ExternalLinkIcon/></a></td>
<td>判断某个字符串在当前字符串中的最后一个下标位置</td>
<td>如果没有，返回-1</td>
</tr>
<tr>
<td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith" target="_blank" rel="noopener noreferrer">String.prototype.endsWith()<ExternalLinkIcon/></a></td>
<td>判断某个字符串是否以指定的字符串结束</td>
<td>传入一个字符串</td>
</tr>
<tr>
<td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith" target="_blank" rel="noopener noreferrer">String.prototype.startsWith()<ExternalLinkIcon/></a></td>
<td>判断某个字符串是否以指定的字符串开始</td>
<td>传入一个字符串</td>
</tr>
<tr>
<td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/padStart" target="_blank" rel="noopener noreferrer">String.prototype.padStart()<ExternalLinkIcon/></a></td>
<td>将当前的字符串按照指定的字符在字符串开始位置填充到指定的位数，返回填充后的字符串</td>
<td>传入位数、填充字符</td>
</tr>
<tr>
<td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/padEnd" target="_blank" rel="noopener noreferrer">String.prototype.padEnd()<ExternalLinkIcon/></a></td>
<td>将当前的字符串按照指定的字符在字符串结束位置填充到指定的位数，返回填充后的字符串</td>
<td>传入位数、填充字符</td>
</tr>
<tr>
<td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/split" target="_blank" rel="noopener noreferrer">String.prototype.split()<ExternalLinkIcon/></a></td>
<td>把当前字符串按照某个字符串分割成一个字符串数组返回</td>
<td>传入分隔符</td>
</tr>
<tr>
<td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/substring" target="_blank" rel="noopener noreferrer">String.prototype.substring()<ExternalLinkIcon/></a></td>
<td>返回一个字符串在开始索引到结束索引之间的一个子集, 或从开始索引直到字符串的末尾的一个子集</td>
<td>传入开始字符、结束字符</td>
</tr>
<tr>
<td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/Trim" target="_blank" rel="noopener noreferrer">String.prototype.trim()<ExternalLinkIcon/></a></td>
<td>从字符串的两端删除空白字符，返回新字符串</td>
<td>无参数</td>
</tr>
<tr>
<td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/trimStart" target="_blank" rel="noopener noreferrer">String.prototype.trimStart()<ExternalLinkIcon/></a></td>
<td>从字符串的开头删除空白字符，返回新字符串</td>
<td>无参数</td>
</tr>
<tr>
<td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/trimEnd" target="_blank" rel="noopener noreferrer">String.prototype.trimEnd()<ExternalLinkIcon/></a></td>
<td>从字符串的末端删除空白字符，返回新字符串</td>
<td>无参数</td>
</tr>
<tr>
<td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/toUpperCase" target="_blank" rel="noopener noreferrer">String.prototype.toUpperCase()<ExternalLinkIcon/></a></td>
<td>将调用该方法的字符串转为大写形式并返回</td>
<td>无参数</td>
</tr>
<tr>
<td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/toLowerCase" target="_blank" rel="noopener noreferrer">String.prototype.toLowerCase()<ExternalLinkIcon/></a></td>
<td>将调用该方法的字符串转为小写形式并返回</td>
<td>无参数</td>
</tr>
<tr>
<td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/replace" target="_blank" rel="noopener noreferrer">String.prototype.replace()<ExternalLinkIcon/></a></td>
<td>替换字符串中的第一个对应字符为新字符</td>
<td></td>
</tr>
<tr>
<td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/replaceall" target="_blank" rel="noopener noreferrer">String.prototype.replaceAll()<ExternalLinkIcon/></a></td>
<td>替换字符串中的所有对应字符为新字符</td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="数学" tabindex="-1"><a class="header-anchor" href="#数学" aria-hidden="true">#</a> 数学</h3>
<p>https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math</p>
<table>
<thead>
<tr>
<th>API</th>
<th>含义</th>
<th>备注</th>
</tr>
</thead>
<tbody>
<tr>
<td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/PI" target="_blank" rel="noopener noreferrer">Math.PI<ExternalLinkIcon/></a></td>
<td>得到圆周率π</td>
<td></td>
</tr>
<tr>
<td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/abs" target="_blank" rel="noopener noreferrer">Math.abs()<ExternalLinkIcon/></a></td>
<td>求某个数绝对值</td>
<td>传入一个数</td>
</tr>
<tr>
<td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/ceil" target="_blank" rel="noopener noreferrer">Math.ceil()<ExternalLinkIcon/></a></td>
<td>向上取整</td>
<td>传入一个数</td>
</tr>
<tr>
<td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/floor" target="_blank" rel="noopener noreferrer">Math.floor()<ExternalLinkIcon/></a></td>
<td>向下取整</td>
<td>传入一个数</td>
</tr>
<tr>
<td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/max" target="_blank" rel="noopener noreferrer">Math.max()<ExternalLinkIcon/></a></td>
<td>求一个数列中的最大值</td>
<td>把数列依次传入</td>
</tr>
<tr>
<td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/min" target="_blank" rel="noopener noreferrer">Math.min()<ExternalLinkIcon/></a></td>
<td>求一个数列中的最小值</td>
<td>把数列依次传入</td>
</tr>
<tr>
<td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/random" target="_blank" rel="noopener noreferrer">Math.random()<ExternalLinkIcon/></a></td>
<td>得到一个0-1之间的随机小数</td>
<td>无参；无法取到1</td>
</tr>
<tr>
<td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/round" target="_blank" rel="noopener noreferrer">Math.round()<ExternalLinkIcon/></a></td>
<td>返回四舍五入的结果</td>
<td>传入一个数</td>
</tr>
</tbody>
</table>
<h3 id="日期" tabindex="-1"><a class="header-anchor" href="#日期" aria-hidden="true">#</a> 日期</h3>
<h4 id="时间基础知识" tabindex="-1"><a class="header-anchor" href="#时间基础知识" aria-hidden="true">#</a> 时间基础知识</h4>
<h5 id="单位" tabindex="-1"><a class="header-anchor" href="#单位" aria-hidden="true">#</a> 单位</h5>
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
<h5 id="gmt和utc" tabindex="-1"><a class="header-anchor" href="#gmt和utc" aria-hidden="true">#</a> GMT和UTC</h5>
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
<h5 id="unix-时间戳" tabindex="-1"><a class="header-anchor" href="#unix-时间戳" aria-hidden="true">#</a> Unix 时间戳</h5>
<blockquote>
<p>Unix 时间戳（Unix Timestamp）是Unix系统最早提出的概念</p>
</blockquote>
<p>它将UTC时间1970年1月1日凌晨作为起始时间，到指定时间经过的秒数（毫秒数）</p>
<h3 id="程序中的时间处理" tabindex="-1"><a class="header-anchor" href="#程序中的时间处理" aria-hidden="true">#</a> 程序中的时间处理</h3>
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
<h4 id="日期api" tabindex="-1"><a class="header-anchor" href="#日期api" aria-hidden="true">#</a> 日期API</h4>
<p>https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date</p>
<p>构造函数：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 得到一个当前日期对象</span>
<span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 根据时间戳得到一个日期对象</span>
<span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span>dateString<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 根据一个标准日期字符串得到一个日期对象</span>
<span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span>year<span class="token punctuation">,</span> monthIndex <span class="token punctuation">[</span><span class="token punctuation">,</span> day <span class="token punctuation">[</span><span class="token punctuation">,</span> hours <span class="token punctuation">[</span><span class="token punctuation">,</span> minutes <span class="token punctuation">[</span><span class="token punctuation">,</span> seconds <span class="token punctuation">[</span><span class="token punctuation">,</span> milliseconds<span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 根据年、月、日、小时、分钟、秒、毫秒得到一个日期对象</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><table>
<thead>
<tr>
<th>API</th>
<th>含义</th>
<th>备注</th>
</tr>
</thead>
<tbody>
<tr>
<td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/now" target="_blank" rel="noopener noreferrer">Date.now()<ExternalLinkIcon/></a></td>
<td>得到当前时间戳</td>
<td>无参</td>
</tr>
<tr>
<td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/getFullYear" target="_blank" rel="noopener noreferrer">Date.prototype.getFullYear()<ExternalLinkIcon/></a></td>
<td>得到年</td>
<td>无参；本地时间；</td>
</tr>
<tr>
<td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/getMonth" target="_blank" rel="noopener noreferrer">Date.prototype.getMonth()<ExternalLinkIcon/></a></td>
<td>得到月</td>
<td>无参；本地时间；范围0-11</td>
</tr>
<tr>
<td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/getDate" target="_blank" rel="noopener noreferrer">Date.prototype.getDate()<ExternalLinkIcon/></a></td>
<td>得到日</td>
<td>无参；本地时间；</td>
</tr>
<tr>
<td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/getHours" target="_blank" rel="noopener noreferrer">Date.prototype.getHours()<ExternalLinkIcon/></a></td>
<td>得到小时</td>
<td>无参；本地时间；</td>
</tr>
<tr>
<td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/getMinutes" target="_blank" rel="noopener noreferrer">Date.prototype.getMinutes()<ExternalLinkIcon/></a></td>
<td>得到分钟</td>
<td>无参；本地时间；</td>
</tr>
<tr>
<td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/getSeconds" target="_blank" rel="noopener noreferrer">Date.prototype.getSeconds()<ExternalLinkIcon/></a></td>
<td>得到秒</td>
<td>无参；本地时间；</td>
</tr>
<tr>
<td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/getMilliseconds" target="_blank" rel="noopener noreferrer">Date.prototype.getMilliseconds()<ExternalLinkIcon/></a></td>
<td>得到毫秒</td>
<td>无参；本地时间；</td>
</tr>
<tr>
<td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString" target="_blank" rel="noopener noreferrer">Date.prototype.toLocaleString()<ExternalLinkIcon/></a></td>
<td>得到日期本地的表示方式</td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="对象" tabindex="-1"><a class="header-anchor" href="#对象" aria-hidden="true">#</a> 对象</h3>
<p>https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object</p>
<table>
<thead>
<tr>
<th>API</th>
<th>含义</th>
<th>备注</th>
</tr>
</thead>
<tbody>
<tr>
<td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/assign" target="_blank" rel="noopener noreferrer">Object.assign()<ExternalLinkIcon/></a></td>
<td>将多个对象的属性混合到一起</td>
<td>后面覆盖前面</td>
</tr>
<tr>
<td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/getPrototypeOf" target="_blank" rel="noopener noreferrer">Object.getPrototypeOf()<ExternalLinkIcon/></a></td>
<td>获取一个对象的隐式原型</td>
<td></td>
</tr>
<tr>
<td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf" target="_blank" rel="noopener noreferrer">Object.setPrototypeOf()<ExternalLinkIcon/></a></td>
<td>设置一个对象的隐式原型</td>
<td></td>
</tr>
<tr>
<td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/create" target="_blank" rel="noopener noreferrer">Object.create()<ExternalLinkIcon/></a></td>
<td>创建一个新对象，同时设置新对象的隐式原型</td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="数组" tabindex="-1"><a class="header-anchor" href="#数组" aria-hidden="true">#</a> 数组</h3>
<p>https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array</p>
<table>
<thead>
<tr>
<th>API</th>
<th>含义</th>
<th>备注</th>
</tr>
</thead>
<tbody>
<tr>
<td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/concat" target="_blank" rel="noopener noreferrer">Array.prototype.concat()<ExternalLinkIcon/></a></td>
<td>把多个数组拼接成一个</td>
<td></td>
</tr>
<tr>
<td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/includes" target="_blank" rel="noopener noreferrer">Array.prototype.includes()<ExternalLinkIcon/></a></td>
<td>判断数组中是否包含某个值</td>
<td></td>
</tr>
<tr>
<td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf" target="_blank" rel="noopener noreferrer">Array.prototype.indexOf()<ExternalLinkIcon/></a></td>
<td>得到数组中某个值的第一个下标</td>
<td>若不存在则返回-1</td>
</tr>
<tr>
<td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/lastIndexOf" target="_blank" rel="noopener noreferrer">Array.prototype.lastIndexOf()<ExternalLinkIcon/></a></td>
<td>得到数组中某个值的最后一个下标</td>
<td>若不存在则返回-1</td>
</tr>
<tr>
<td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/join" target="_blank" rel="noopener noreferrer">Array.prototype.join()<ExternalLinkIcon/></a></td>
<td>把数组中每一项使用某个字符连接起来，形成一个字符串返回</td>
<td></td>
</tr>
<tr>
<td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/push" target="_blank" rel="noopener noreferrer">Array.prototype.push()<ExternalLinkIcon/></a></td>
<td>向数组的末尾添加一项</td>
<td></td>
</tr>
<tr>
<td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift" target="_blank" rel="noopener noreferrer">Array.prototype.unshift()<ExternalLinkIcon/></a></td>
<td>向数组的开头添加一项</td>
<td></td>
</tr>
<tr>
<td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/pop" target="_blank" rel="noopener noreferrer">Array.prototype.pop()<ExternalLinkIcon/></a></td>
<td>删除数组最后一项</td>
<td>返回被删除的值</td>
</tr>
<tr>
<td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/shift" target="_blank" rel="noopener noreferrer">Array.prototype.shift()<ExternalLinkIcon/></a></td>
<td>删除数组第一项</td>
<td>返回被删除的值</td>
</tr>
<tr>
<td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/splice" target="_blank" rel="noopener noreferrer">Array.prototype.splice()<ExternalLinkIcon/></a></td>
<td>删除、修改、插入任何位置的值</td>
<td></td>
</tr>
<tr>
<td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse" target="_blank" rel="noopener noreferrer">Array.prototype.reverse()<ExternalLinkIcon/></a></td>
<td>将数组中的元素顺序颠倒</td>
<td></td>
</tr>
<tr>
<td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/sort" target="_blank" rel="noopener noreferrer">Array.prototype.sort()<ExternalLinkIcon/></a></td>
<td>对数组进行排序</td>
<td>传入比较函数：0-位置不变，&lt;0-前者在前，&gt;0-前者在后</td>
</tr>
<tr>
<td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/slice" target="_blank" rel="noopener noreferrer">Array.prototype.slice()<ExternalLinkIcon/></a></td>
<td>对数组进行切割</td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="函数-1" tabindex="-1"><a class="header-anchor" href="#函数-1" aria-hidden="true">#</a> 函数</h3>
<p>https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function</p>
<table>
<thead>
<tr>
<th>API</th>
<th>含义</th>
<th>备注</th>
</tr>
</thead>
<tbody>
<tr>
<td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/apply" target="_blank" rel="noopener noreferrer">Function.prototype.apply()<ExternalLinkIcon/></a></td>
<td>执行函数，绑定this</td>
<td>参数列表以数组的形式传递</td>
</tr>
<tr>
<td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/call" target="_blank" rel="noopener noreferrer">Function.prototype.call()<ExternalLinkIcon/></a></td>
<td>执行函数，绑定this</td>
<td>参数列表依次传递</td>
</tr>
</tbody>
</table>
<h3 id="正则表达式" tabindex="-1"><a class="header-anchor" href="#正则表达式" aria-hidden="true">#</a> 正则表达式</h3>
<h4 id="创建正则对象" tabindex="-1"><a class="header-anchor" href="#创建正则对象" aria-hidden="true">#</a> 创建正则对象</h4>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 构造函数</span>
<span class="token keyword">new</span> <span class="token class-name">RegExp</span><span class="token punctuation">(</span><span class="token string">'规则'</span><span class="token punctuation">,</span> <span class="token string">'标识'</span><span class="token punctuation">)</span>
<span class="token comment">// 字面量书写</span>
<span class="token operator">/</span>规则<span class="token operator">/</span>标识
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h4 id="正则常用方法" tabindex="-1"><a class="header-anchor" href="#正则常用方法" aria-hidden="true">#</a> 正则常用方法</h4>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// reg是正则对象</span>
reg<span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span><span class="token string">'字符串'</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 验证字符串是否满足规则</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// reg是正则对象，str是字符串</span>
str<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span>reg<span class="token punctuation">,</span> <span class="token string">'替换目标'</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 将字符串中匹配正则的部分替换为目标</span>

<span class="token comment">// 将字符串中匹配正则的部分传入到回调函数的参数中，将函数的返回结果进行替换</span>
str<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span>reg<span class="token punctuation">,</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">s</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token string">'替换目标'</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h4 id="标识" tabindex="-1"><a class="header-anchor" href="#标识" aria-hidden="true">#</a> 标识</h4>
<table>
<thead>
<tr>
<th>标识字符</th>
<th>含义</th>
</tr>
</thead>
<tbody>
<tr>
<td>i</td>
<td>不区分大小写</td>
</tr>
<tr>
<td>g</td>
<td>全局匹配，如果没有此标识，只会匹配第一个</td>
</tr>
<tr>
<td>m</td>
<td>多行匹配</td>
</tr>
</tbody>
</table>
<h4 id="规则" tabindex="-1"><a class="header-anchor" href="#规则" aria-hidden="true">#</a> 规则</h4>
<p>详见：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_Expressions</p>
<h5 id="字符匹配规则" tabindex="-1"><a class="header-anchor" href="#字符匹配规则" aria-hidden="true">#</a> 字符匹配规则</h5>
<table>
<thead>
<tr>
<th>规则书写</th>
<th>含义</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>直接书写一个普通字符</code></td>
<td>匹配书写的字符</td>
</tr>
<tr>
<td><code>[字符规则]</code></td>
<td>匹配[]中出现的所有字符规则</td>
</tr>
<tr>
<td><code>[^字符串规则]</code></td>
<td>匹配[]中<strong>没有</strong>出现的字符规则</td>
</tr>
<tr>
<td><code>.</code></td>
<td>匹配任意字符</td>
</tr>
<tr>
<td><code>\d</code></td>
<td>匹配数字，等价于 <code>[0-9]</code></td>
</tr>
<tr>
<td><code>\D</code></td>
<td>匹配非数字</td>
</tr>
<tr>
<td><code>\s</code></td>
<td>匹配空白字符，包括空格、回车、换行、制表</td>
</tr>
<tr>
<td><code>\S</code></td>
<td>匹配所有非空白字符</td>
</tr>
<tr>
<td><code>\w</code></td>
<td>匹配单词字符，等价于 <code>[A-Za-z0-9_]</code></td>
</tr>
<tr>
<td><code>\W</code></td>
<td>匹配非单词字符，等价于 <code>[^A-Za-z0-9_]</code></td>
</tr>
<tr>
<td><code>^</code></td>
<td>匹配字符串开始，写到规则开始位置</td>
</tr>
<tr>
<td><code>$</code></td>
<td>匹配字符串结束，写到规则结束位置</td>
</tr>
<tr>
<td><code>\\</code></td>
<td>匹配<code>\</code></td>
</tr>
</tbody>
</table>
<h5 id="连续的规则" tabindex="-1"><a class="header-anchor" href="#连续的规则" aria-hidden="true">#</a> 连续的规则</h5>
<p>多个规则可以连续书写，用以匹配多个字符，例如：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\d[a-zA-Z]</span><span class="token regex-delimiter">/</span></span>  <span class="token comment">// 匹配以1个数字紧跟一个字母</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>若多个规则是一个或者的关系，使用<code>|</code>分割</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\d[a-zA-Z]|[a-zA-Z]\d</span><span class="token regex-delimiter">/</span></span> <span class="token comment">// 匹配以1个数字紧跟一个字母，或者一个字母紧跟一个数字</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><h5 id="规则的重复-量词" tabindex="-1"><a class="header-anchor" href="#规则的重复-量词" aria-hidden="true">#</a> 规则的重复（量词）</h5>
<p>一个或一段规则之后，可以紧跟一个量词，表示前面的规则出现的次数</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">[a-zA-Z]\d{3}</span><span class="token regex-delimiter">/</span></span>  <span class="token comment">// 匹配1个字母，后面跟上连续的3个数字，{3}是量词，应用的规则是\d</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">([a-zA-Z]\d){3}</span><span class="token regex-delimiter">/</span></span>  <span class="token comment">// {3}是量词，应用的规则是 [a-zA-Z]\d</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><table>
<thead>
<tr>
<th>量词</th>
<th>含义</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>{n}</code></td>
<td>出现n次</td>
</tr>
<tr>
<td><code>{n, m}</code></td>
<td>出现n-m次</td>
</tr>
<tr>
<td><code>{n,}</code></td>
<td>至少出现n次</td>
</tr>
<tr>
<td><code>*</code></td>
<td>出现0次或多次，等价于<code>{0,}</code></td>
</tr>
<tr>
<td><code>?</code></td>
<td>出现0次或一次，等价于<code>{0,1}</code></td>
</tr>
<tr>
<td><code>+</code></td>
<td>出现1次或多次，等价于<code>{1,}</code></td>
</tr>
</tbody>
</table>
<h2 id="webapi" tabindex="-1"><a class="header-anchor" href="#webapi" aria-hidden="true">#</a> WebAPI</h2>
<p>和标准库不同，WebAPI 是<strong>浏览器</strong>提供的一套 API，用于操作浏览器窗口和界面</p>
<p>WebAPI 中包含两个部分：</p>
<ul>
<li>BOM：Browser Object Model，浏览器模型，提供和浏览器相关的操作</li>
<li>DOM：Document Object Model，文档模型，提供和页面相关的操作</li>
</ul>
<img src="http://mdrs.yuanjin.tech/img/20211215154644.png" alt="image-20211215154639275" style="zoom:50%;" />
<h3 id="bom" tabindex="-1"><a class="header-anchor" href="#bom" aria-hidden="true">#</a> BOM</h3>
<p>BOM 提供了一系列的对象和函数，提供和浏览器本身相关的操作</p>
<h4 id="window" tabindex="-1"><a class="header-anchor" href="#window" aria-hidden="true">#</a> window</h4>
<p>全局对象</p>
<p>https://developer.mozilla.org/zh-CN/docs/Web/API/Window/window</p>
<table>
<thead>
<tr>
<th>API</th>
<th>含义</th>
<th>备注</th>
</tr>
</thead>
<tbody>
<tr>
<td><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Window/open" target="_blank" rel="noopener noreferrer"><code>open()</code><ExternalLinkIcon/></a></td>
<td>打开一个新的浏览器窗口</td>
<td>返回新窗口的 window 对象</td>
</tr>
<tr>
<td><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Window/close" target="_blank" rel="noopener noreferrer"><code>close()</code><ExternalLinkIcon/></a></td>
<td>关闭浏览器窗口</td>
<td>只能关闭使用 open 打开的浏览器窗口</td>
</tr>
<tr>
<td><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Window/setTimeout" target="_blank" rel="noopener noreferrer">==setTimeout()==<ExternalLinkIcon/></a></td>
<td>设置一个计时器<br />在一段时间后自动执行某个函数</td>
<td>参数 1：函数，无参，this 指向 window<br />参数 2：时间，毫秒<br />返回：计时器的 ID</td>
</tr>
<tr>
<td><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Window/clearTimeout" target="_blank" rel="noopener noreferrer">==clearTimeout()==<ExternalLinkIcon/></a></td>
<td>清除指定 ID 的计时器</td>
<td>传入计时器的 ID</td>
</tr>
<tr>
<td><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Window/setInterval" target="_blank" rel="noopener noreferrer">==setInterval()==<ExternalLinkIcon/></a></td>
<td>设置一个计时器<br />每隔一段时间自动执行某个函数</td>
<td>参数 1：函数，无参，this 指向 window<br />参数 2：时间，毫秒<br />返回：计时器的 ID</td>
</tr>
<tr>
<td><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Window/clearInterval" target="_blank" rel="noopener noreferrer">==clearInterval()==<ExternalLinkIcon/></a></td>
<td>清除指定 ID 的计时器</td>
<td>传入计时器的 ID</td>
</tr>
<tr>
<td><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Window/alert" target="_blank" rel="noopener noreferrer"><code>alert()</code><ExternalLinkIcon/></a></td>
<td>弹出提示框</td>
<td>不同的操作系统外观有差异</td>
</tr>
<tr>
<td><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Window/confirm" target="_blank" rel="noopener noreferrer"><code>confirm()</code><ExternalLinkIcon/></a></td>
<td>弹出确认框</td>
<td>不同的操作系统外观有差异</td>
</tr>
</tbody>
</table>
<h4 id="window-location" tabindex="-1"><a class="header-anchor" href="#window-location" aria-hidden="true">#</a> window.location</h4>
<p>https://developer.mozilla.org/zh-CN/docs/Web/API/Location</p>
<p>提供地址栏的相关操作</p>
<table>
<thead>
<tr>
<th>API</th>
<th>含义</th>
<th>备注</th>
</tr>
</thead>
<tbody>
<tr>
<td><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Location/href" target="_blank" rel="noopener noreferrer">==Location.href==<ExternalLinkIcon/></a></td>
<td>获取或设置页面当前地址</td>
<td>设置地址回导致页面跳转</td>
</tr>
<tr>
<td><a href="https://developer.mozilla.org/en-US/docs/Web/API/Location/protocol" target="_blank" rel="noopener noreferrer"><code>Location.protocol</code><ExternalLinkIcon/></a></td>
<td>获取或设置地址中的协议部分</td>
<td></td>
</tr>
<tr>
<td><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Location/host" target="_blank" rel="noopener noreferrer"><code>Location.host</code><ExternalLinkIcon/></a></td>
<td>获取或设置地址中的主机名和端口号</td>
<td></td>
</tr>
<tr>
<td><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Location/hostname" target="_blank" rel="noopener noreferrer"><code>Location.hostname</code><ExternalLinkIcon/></a></td>
<td>获取或设置地址中的主机名</td>
<td></td>
</tr>
<tr>
<td><a href="https://developer.mozilla.org/en-US/docs/Web/API/Location/port" target="_blank" rel="noopener noreferrer"><code>Location.port</code> <ExternalLinkIcon/></a></td>
<td>获取或设置地址中的端口号</td>
<td></td>
</tr>
<tr>
<td><a href="https://developer.mozilla.org/en-US/docs/Web/API/Location/pathname" target="_blank" rel="noopener noreferrer"><code>Location.pathname</code> <ExternalLinkIcon/></a></td>
<td>获取或设置地址中的路径部分</td>
<td></td>
</tr>
<tr>
<td><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Location/search" target="_blank" rel="noopener noreferrer"><code>Location.search</code><ExternalLinkIcon/></a></td>
<td>获取或设置地址中的参数部分</td>
<td></td>
</tr>
<tr>
<td><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Location/hash" target="_blank" rel="noopener noreferrer"><code>Location.hash</code><ExternalLinkIcon/></a></td>
<td>获取或设置地址中的 hash 部分</td>
<td></td>
</tr>
<tr>
<td><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Location/reload" target="_blank" rel="noopener noreferrer"><code>Location.reload()</code><ExternalLinkIcon/></a></td>
<td>刷新页面</td>
<td></td>
</tr>
</tbody>
</table>
<h4 id="window-history" tabindex="-1"><a class="header-anchor" href="#window-history" aria-hidden="true">#</a> window.history</h4>
<p>https://developer.mozilla.org/zh-CN/docs/Web/API/History</p>
<p>提供当前窗口历史记录的操作</p>
<table>
<thead>
<tr>
<th>API</th>
<th>含义</th>
<th>备注</th>
</tr>
</thead>
<tbody>
<tr>
<td><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/History/back" target="_blank" rel="noopener noreferrer"><code>History.back()</code><ExternalLinkIcon/></a></td>
<td>后退</td>
<td></td>
</tr>
<tr>
<td><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/History/forward" target="_blank" rel="noopener noreferrer"><code>History.forward()</code><ExternalLinkIcon/></a></td>
<td>前进</td>
<td></td>
</tr>
<tr>
<td><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/History/go" target="_blank" rel="noopener noreferrer"><code>History.go()</code><ExternalLinkIcon/></a></td>
<td>根据相对当前页面的偏移量，<br />进入指定的记录页</td>
<td></td>
</tr>
<tr>
<td><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/History/pushState" target="_blank" rel="noopener noreferrer"><code>History.pushState()</code><ExternalLinkIcon/></a></td>
<td>在历史记录中添加一条记录</td>
<td>页面不刷新</td>
</tr>
<tr>
<td><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/History/replaceState" target="_blank" rel="noopener noreferrer"><code>History.replaceState()</code><ExternalLinkIcon/></a></td>
<td>替换当前记录</td>
<td>页面不刷新</td>
</tr>
</tbody>
</table>
<h3 id="dom" tabindex="-1"><a class="header-anchor" href="#dom" aria-hidden="true">#</a> DOM</h3>
<p>DOM 是一个对象，它对应到 HTML 中的节点</p>
<img src="http://mdrs.yuanjin.tech/img/20211215164209.png" alt="image-20211215164209559" style="zoom:50%;" />
<h4 id="获取-dom" tabindex="-1"><a class="header-anchor" href="#获取-dom" aria-hidden="true">#</a> 获取 dom</h4>
<table>
<thead>
<tr>
<th>API</th>
<th>含义</th>
<th>备注</th>
</tr>
</thead>
<tbody>
<tr>
<td>document.getElementById()</td>
<td>根据元素 id 获取 dom</td>
<td>得到单个 dom</td>
</tr>
<tr>
<td>document.getElementsByTagName()<br />dom.getElementsByTagName()</td>
<td>根据元素名称获取 dom</td>
<td>得到 dom 的伪数组</td>
</tr>
<tr>
<td>document.getElementsByClassName()<br />dom.getElementsByClassName()</td>
<td>根据元素类样式获取 dom</td>
<td>得到 dom 的伪数组</td>
</tr>
<tr>
<td>==document.querySelector()==<br />==dom.querySelector()==</td>
<td>根据 CSS 选择器获取 dom</td>
<td>得到第一个匹配的 dom</td>
</tr>
<tr>
<td>==document.querySelectorAll()==<br />==dom.querySelectorAll()==</td>
<td>根据 CSS 选择器获取 dom</td>
<td>得到所有匹配的 dom<br />伪数组</td>
</tr>
<tr>
<td>==document.documentElement==</td>
<td>获取 html 元素</td>
<td></td>
</tr>
<tr>
<td>document.body</td>
<td>获取 body</td>
<td></td>
</tr>
<tr>
<td>document.head</td>
<td>获取 head</td>
<td></td>
</tr>
<tr>
<td>==dom.children==</td>
<td>获取 dom 的子元素</td>
<td>得到 dom 的伪数组</td>
</tr>
<tr>
<td>dom.childNodes</td>
<td>获取 dom 的子节点</td>
<td>得到 dom 节点的伪数组<br />关于节点对象点<a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Node" target="_blank" rel="noopener noreferrer">这里<ExternalLinkIcon/></a></td>
</tr>
<tr>
<td>dom.previousElementSibling</td>
<td>得到 dom 前一个兄弟元素</td>
<td></td>
</tr>
<tr>
<td>dom.nextElementSibling</td>
<td>得到 dom 后一个兄弟元素</td>
<td></td>
</tr>
<tr>
<td>==dom.parentElement==</td>
<td>得到 dom 的父元素</td>
<td></td>
</tr>
</tbody>
</table>
<h4 id="创建-dom" tabindex="-1"><a class="header-anchor" href="#创建-dom" aria-hidden="true">#</a> 创建 dom</h4>
<table>
<thead>
<tr>
<th>API</th>
<th>含义</th>
<th>备注</th>
</tr>
</thead>
<tbody>
<tr>
<td>==document.createElement()==</td>
<td>创建一个 dom 并返回</td>
<td>传入元素名称</td>
</tr>
</tbody>
</table>
<h4 id="更改-dom-结构" tabindex="-1"><a class="header-anchor" href="#更改-dom-结构" aria-hidden="true">#</a> 更改 dom 结构</h4>
<p>这里是指更改文档树（DOM 树）</p>
<table>
<thead>
<tr>
<th>API</th>
<th>含义</th>
<th>备注</th>
</tr>
</thead>
<tbody>
<tr>
<td>==dom.remove()==</td>
<td>从文档树中删除 dom</td>
<td>不是删除对象</td>
</tr>
<tr>
<td>dom.removeChild()</td>
<td>删除 dom 的某个子节点</td>
<td>传入 dom 对象</td>
</tr>
<tr>
<td><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Node/insertBefore" target="_blank" rel="noopener noreferrer"><code>dom.insertBefore()</code><ExternalLinkIcon/></a></td>
<td>在 dom 的子节点中，添加一个新节点到另一个节点之前</td>
<td></td>
</tr>
<tr>
<td>==dom.appendChild()==</td>
<td>添加一个新节点到 dom 的子节点末尾</td>
<td>传入 dom 对象</td>
</tr>
</tbody>
</table>
<h4 id="dom-属性" tabindex="-1"><a class="header-anchor" href="#dom-属性" aria-hidden="true">#</a> dom 属性</h4>
<p>本节的「属性」，是指 HTML 元素的「属性」</p>
<p>属性有两种：</p>
<ul>
<li>标准属性：HTML 元素本身拥有的属性，例如：
<ul>
<li>a 元素的 href、title</li>
<li>input 的 value</li>
<li>img 的 src</li>
<li>......</li>
</ul>
</li>
<li>自定义属性：HTML 元素标准中未定义的属性</li>
</ul>
<p><strong>所有标准属性均可通过 <code>dom.属性名</code> 得到，其中：</strong></p>
<ul>
<li>
<p>布尔属性会被自动转换为 boolean</p>
</li>
<li>
<p>路径类的属性会被转换为绝对路径</p>
</li>
<li>
<p>标准属性始终都是存在的，不管你是否有在元素中属性该属性</p>
</li>
<li>
<p>class 由于和关键字重名，因此需要使用 className</p>
</li>
</ul>
<p><strong>所有的自定义属性均可通过下面的方式操作：</strong></p>
<ul>
<li><code>dom.setAttribute(name, value)</code>，设置属性键值对</li>
<li><code>dom.getAttribute(name)</code>，获取属性值</li>
</ul>
<p>自定义属性和元素源码书写是对应的，可以尝试获取 a 元素的 href 属性对比标准属性，看看有什么不同。</p>
<h4 id="dom-内容" tabindex="-1"><a class="header-anchor" href="#dom-内容" aria-hidden="true">#</a> dom 内容</h4>
<table>
<thead>
<tr>
<th>API</th>
<th>含义</th>
<th>备注</th>
</tr>
</thead>
<tbody>
<tr>
<td>==dom.innerText==</td>
<td>获取或设置元素文本内容</td>
<td>设置时会自动进行 HTML 实体编码</td>
</tr>
<tr>
<td>==dom.innerHTML==</td>
<td>获取或设置元素的 HTML 内容</td>
<td></td>
</tr>
</tbody>
</table>
<h4 id="dom-样式" tabindex="-1"><a class="header-anchor" href="#dom-样式" aria-hidden="true">#</a> dom 样式</h4>
<p>在 JS 中，有两种样式：</p>
<ul>
<li>内联样式：元素的 style 属性中书写的样式</li>
<li>计算样式（最终样式）：元素最终计算出来的样式</li>
</ul>
<p><strong>JS 可以获取内联样式和计算样式，但只能设置内联样式</strong></p>
<p>下面罗列了样式的常见操作：</p>
<ul>
<li><code>dom.style</code>：获取元素的内联样式，得到样式对象
<ul>
<li>对象中的所有样式属性均可以被赋值，赋值后即可应用样式到元素的 style 中</li>
</ul>
</li>
<li><code>getComputedStyle(dom)</code>：获取元素的计算样式，得到一个样式对象
<ul>
<li>该样式对象中的属性是只读的，无法被重新赋值</li>
</ul>
</li>
</ul>
<p>关于<strong>样式对象</strong>，注意：</p>
<ul>
<li>当给样式赋值为空字符串时，相当于删除内联样式</li>
<li>当给样式的赋值不合法时，赋值语句无效，不会报错</li>
<li>CSS 的短横线命名法，在属性名中表现为驼峰命名法</li>
</ul>
<h4 id="监听-dom-事件" tabindex="-1"><a class="header-anchor" href="#监听-dom-事件" aria-hidden="true">#</a> 监听 dom 事件</h4>
<p>监听事件可以描述为一句话：</p>
<p><strong>某个 DOM</strong>发生了<strong>某件事</strong>之后，我需要做<strong>某些处理</strong></p>
<ul>
<li>某个 DOM：监听谁？</li>
<li>某件事（事件类型）：它发生了什么？</li>
<li>某些处理（处理函数）：我要做什么？</li>
</ul>
<p>下面是一段事件监听代码：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 为dom注册点击事件，当被点击时，自动运行事件处理函数</span>
dom<span class="token punctuation">.</span><span class="token function-variable function">onclick</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'dom 被点击了'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h5 id="事件类型" tabindex="-1"><a class="header-anchor" href="#事件类型" aria-hidden="true">#</a> 事件类型</h5>
<p>https://developer.mozilla.org/zh-CN/docs/Web/Events</p>
<h6 id="表单类事件" tabindex="-1"><a class="header-anchor" href="#表单类事件" aria-hidden="true">#</a> 表单类事件</h6>
<table>
<thead>
<tr>
<th>事件名称</th>
<th>触发时机</th>
<th>备注</th>
</tr>
</thead>
<tbody>
<tr>
<td>==submit==</td>
<td>表单被提交时触发</td>
<td>注册到 form 元素上</td>
</tr>
<tr>
<td>==input==</td>
<td>文本框改变后立即出发</td>
<td>注册到 input、textarea 上</td>
</tr>
<tr>
<td>==change==</td>
<td>文本框改变后、失去焦点时触发<br />下拉列表、多选框、单选框改变后立即触发</td>
<td>注册到 input、select、textarea 上</td>
</tr>
<tr>
<td>reset</td>
<td>表单被重置时触发</td>
<td>注册到 form 元素上</td>
</tr>
<tr>
<td>focus</td>
<td>元素聚焦时触发</td>
<td></td>
</tr>
<tr>
<td>blur</td>
<td>元素失去焦点时触发</td>
<td></td>
</tr>
</tbody>
</table>
<h6 id="鼠标类事件" tabindex="-1"><a class="header-anchor" href="#鼠标类事件" aria-hidden="true">#</a> 鼠标类事件</h6>
<table>
<thead>
<tr>
<th>事件名称</th>
<th>触发时机</th>
<th>备注</th>
</tr>
</thead>
<tbody>
<tr>
<td>==click==</td>
<td>鼠标按下抬起后触发</td>
<td></td>
</tr>
<tr>
<td>contextmenu</td>
<td>右键菜单显示前触发</td>
<td></td>
</tr>
<tr>
<td>==mousedown==</td>
<td>鼠标按下时触发</td>
<td></td>
</tr>
<tr>
<td>==mouseup==</td>
<td>鼠标抬起时触发</td>
<td></td>
</tr>
<tr>
<td>==mousemove==</td>
<td>鼠标在元素上移动时触发</td>
<td></td>
</tr>
<tr>
<td>==mouseenter==</td>
<td>鼠标进入元素时触发（不冒泡）</td>
<td></td>
</tr>
<tr>
<td>==mouseleave==</td>
<td>鼠标离开元素时触发（不冒泡）</td>
<td></td>
</tr>
<tr>
<td>mouseover</td>
<td>鼠标进入元素时触发（冒泡）</td>
<td></td>
</tr>
<tr>
<td>mouseout</td>
<td>鼠标离开元素时触发（冒泡）</td>
<td></td>
</tr>
<tr>
<td>wheel</td>
<td>鼠标滚轮滚动时触发</td>
<td></td>
</tr>
</tbody>
</table>
<h6 id="键盘事件" tabindex="-1"><a class="header-anchor" href="#键盘事件" aria-hidden="true">#</a> 键盘事件</h6>
<table>
<thead>
<tr>
<th>事件名称</th>
<th>触发时机</th>
<th>备注</th>
</tr>
</thead>
<tbody>
<tr>
<td>keydown</td>
<td>某个键被按下时触发</td>
<td></td>
</tr>
<tr>
<td>keyup</td>
<td>某个键被抬起时触发</td>
<td></td>
</tr>
</tbody>
</table>
<h5 id="注册事件" tabindex="-1"><a class="header-anchor" href="#注册事件" aria-hidden="true">#</a> 注册事件</h5>
<p>JS 提供了三种方式注册事件</p>
<p>方式 1：将事件注册写到元素上，这种方式基本被弃用</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>button</span> <span class="token special-attr"><span class="token attr-name">onclick</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span><span class="token value javascript language-javascript">js代码</span><span class="token punctuation">"</span></span></span><span class="token punctuation">></span></span>按钮<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>button</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>==方式 2：使用 dom 属性注册事件==</p>
<p>属性名为<code>on+事件类型</code></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 监听事件</span>
dom<span class="token punctuation">.</span><span class="token function-variable function">onclick</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 处理函数</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token comment">// 移除监听事件</span>
dom<span class="token punctuation">.</span>onclick <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>这种方式的特点是：</p>
<ul>
<li>优点：易于监听、覆盖、移除</li>
<li>缺点：只能注册一个处理函数</li>
<li>缺点：某些事件不支持用这种方式注册</li>
</ul>
<p>==方式 3：使用 addEventListener 方法注册事件==</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>dom<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'click'</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 处理函数1</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
dom<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'click'</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 处理函数2</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>这是最完美的事件注册方式，如果要移除用这种方式注册的事件，需要改写代码</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">handler1</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 处理函数1</span>
<span class="token punctuation">}</span>
<span class="token keyword">function</span> <span class="token function">handler2</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 处理函数2</span>
<span class="token punctuation">}</span>

dom<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'click'</span><span class="token punctuation">,</span> handler1<span class="token punctuation">)</span><span class="token punctuation">;</span>
dom<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'click'</span><span class="token punctuation">,</span> handler2<span class="token punctuation">)</span><span class="token punctuation">;</span>

dom<span class="token punctuation">.</span><span class="token function">removeEventListener</span><span class="token punctuation">(</span><span class="token string">'click'</span><span class="token punctuation">,</span> handler1<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 移除监听函数1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><h5 id="事件处理函数" tabindex="-1"><a class="header-anchor" href="#事件处理函数" aria-hidden="true">#</a> 事件处理函数</h5>
<p>当事件发生时，会自动调用事件处理函数，并向函数传递一个参数，该参数称之为事件对象，里面包含了事件发生的相关信息，比如鼠标位置、键盘按键等等</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>dom<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'click'</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>e<span class="token punctuation">.</span>clientX<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//打印鼠标的横坐标</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>常见的事件对象有：<a href="https://developer.mozilla.org/zh-CN/docs/Web/API/MouseEvent" target="_blank" rel="noopener noreferrer">鼠标事件对象<ExternalLinkIcon/></a>、<a href="https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent/KeyboardEvent" target="_blank" rel="noopener noreferrer">键盘事件对象<ExternalLinkIcon/></a></p>
<p>另外，在事件处理函数中，<code>this</code>始终指向注册事件的 dom</p>
<h4 id="dom-进阶" tabindex="-1"><a class="header-anchor" href="#dom-进阶" aria-hidden="true">#</a> dom 进阶</h4>
<h5 id="事件默认行为" tabindex="-1"><a class="header-anchor" href="#事件默认行为" aria-hidden="true">#</a> 事件默认行为</h5>
<p>某些元素的某些事件，浏览器会有自己的默认行为</p>
<p>比如：</p>
<ul>
<li>a 元素的 click 事件，浏览器会跳转页面</li>
<li>form 元素的 submit 事件，浏览器会提交表单，最终导致页面刷新</li>
<li>文本框的 keydown 事件，浏览器会将按键文本显示到文本框中</li>
<li>......</li>
</ul>
<p>如果我们要阻止浏览器的默认行为，就需要在对应时间中加入以下代码：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// e为事件对象</span>
e<span class="token punctuation">.</span><span class="token function">preventDefault</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h5 id="dom-尺寸和位置" tabindex="-1"><a class="header-anchor" href="#dom-尺寸和位置" aria-hidden="true">#</a> dom 尺寸和位置</h5>
<img src="http://mdrs.yuanjin.tech/img/20211216104505.png" alt="尺寸1" style="zoom:50%;" />
<p><img src="http://mdrs.yuanjin.tech/img/20220406223123.png" alt="尺寸2"></p>
<p><img src="http://mdrs.yuanjin.tech/img/20220213212313.png" alt="尺寸3"></p>
<img src="http://mdrs.yuanjin.tech/img/20211216104405.jpg" alt="尺寸4" style="zoom:50%;" />
<blockquote>
<p>调用<code>dom.scrollTo(x, y)</code>可以设置元素的滚动位置，x 和 y 分别表示 scrollLeft 和 scrollTop</p>
<p>该方法通用元素回到元素顶部<code>dom.scrollTo(0, 0)</code></p>
<p>如果要监听元素的滚动，可以监听事件类型：==scroll==</p>
</blockquote>
<p><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect" target="_blank" rel="noopener noreferrer">Element.getBoundingClientRect()<ExternalLinkIcon/></a></p>
<p><img src="http://mdrs.yuanjin.tech/img/202210151248555.png" alt="element-box-diagram"></p>
<blockquote>
<p>上图中的 top、left、right、bottom 均相对于视口</p>
</blockquote>
<p><strong>页面便签拖动</strong></p>
<p><code>index.html</code></p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">html</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>en<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>UTF-8<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">http-equiv</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>X-UA-Compatible<span class="token punctuation">"</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>IE=edge<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>viewport<span class="token punctuation">"</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>width=device-width, initial-scale=1.0<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">></span></span>可拖动的便笺<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">></span></span><span class="token style"><span class="token language-css">
        <span class="token selector">*</span> <span class="token punctuation">{</span>
            <span class="token property">margin</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
            <span class="token property">padding</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
            <span class="token property">box-sizing</span><span class="token punctuation">:</span> border-box<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token selector">.note</span> <span class="token punctuation">{</span>
            <span class="token property">box-shadow</span><span class="token punctuation">:</span> 0 0 5px #00000080<span class="token punctuation">;</span>
            <span class="token property">width</span><span class="token punctuation">:</span> 300px<span class="token punctuation">;</span>
            <span class="token property">color</span><span class="token punctuation">:</span> #333<span class="token punctuation">;</span>
            <span class="token property">background</span><span class="token punctuation">:</span> #fdf3a7<span class="token punctuation">;</span>
            <span class="token property">position</span><span class="token punctuation">:</span> fixed<span class="token punctuation">;</span>
            <span class="token property">left</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
            <span class="token property">top</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token selector">.move-bar</span> <span class="token punctuation">{</span>
            <span class="token property">background</span><span class="token punctuation">:</span> #fbe961<span class="token punctuation">;</span>
            <span class="token property">height</span><span class="token punctuation">:</span> 10px<span class="token punctuation">;</span>
            <span class="token property">cursor</span><span class="token punctuation">:</span> move<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token selector">.content p</span> <span class="token punctuation">{</span>
            <span class="token property">margin</span><span class="token punctuation">:</span> 1em 0<span class="token punctuation">;</span>
            <span class="token property">padding</span><span class="token punctuation">:</span> 0.5em<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token selector">.content</span> <span class="token punctuation">{</span>
            <span class="token property">outline</span><span class="token punctuation">:</span> none<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    </span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>note<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>move-bar<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>content<span class="token punctuation">"</span></span> <span class="token attr-name">contenteditable</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span><span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>这是一个便笺<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>里面的文字可以更改<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">></span></span>用鼠标按住顶部的移动条即可拖动便笺<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>./js/index.js<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br></div></div><p><code>index.js</code></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 让便签可被拖动，但不能超出视口</span>
<span class="token keyword">var</span> note <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">'.note'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">var</span> moveBar <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">'.move-bar'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

moveBar<span class="token punctuation">.</span><span class="token function-variable function">onmousedown</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 鼠标坐标</span>
  <span class="token keyword">var</span> x <span class="token operator">=</span> e<span class="token punctuation">.</span>clientX<span class="token punctuation">,</span> y <span class="token operator">=</span> e<span class="token punctuation">.</span>clientY<span class="token punctuation">;</span>
  <span class="token keyword">var</span> rect <span class="token operator">=</span> moveBar<span class="token punctuation">.</span><span class="token function">getBoundingClientRect</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

  <span class="token comment">// 元素坐标</span>
  <span class="token keyword">var</span> ex <span class="token operator">=</span> rect<span class="token punctuation">.</span>left<span class="token punctuation">,</span> ey <span class="token operator">=</span> rect<span class="token punctuation">.</span>top<span class="token punctuation">;</span>

  <span class="token comment">// 获取视口宽高、元素宽高</span>
  <span class="token keyword">var</span> viewWidth <span class="token operator">=</span> document<span class="token punctuation">.</span>documentElement<span class="token punctuation">.</span>clientWidth<span class="token punctuation">,</span> viewHeight <span class="token operator">=</span> document<span class="token punctuation">.</span>documentElement<span class="token punctuation">.</span>clientHeight<span class="token punctuation">;</span>
  <span class="token keyword">var</span> noteWidth <span class="token operator">=</span> note<span class="token punctuation">.</span>offsetWidth<span class="token punctuation">,</span> noteHeight <span class="token operator">=</span> note<span class="token punctuation">.</span>offsetHeight<span class="token punctuation">;</span>

  <span class="token keyword">var</span> maxLeft <span class="token operator">=</span> viewWidth <span class="token operator">-</span> noteWidth<span class="token punctuation">,</span> maxTop <span class="token operator">=</span> viewHeight <span class="token operator">-</span> noteHeight<span class="token punctuation">;</span>

  window<span class="token punctuation">.</span><span class="token function-variable function">onmousemove</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> disx <span class="token operator">=</span> e<span class="token punctuation">.</span>clientX <span class="token operator">-</span> x<span class="token punctuation">,</span> disy <span class="token operator">=</span> e<span class="token punctuation">.</span>clientY <span class="token operator">-</span> y<span class="token punctuation">;</span>
    <span class="token keyword">var</span> left <span class="token operator">=</span> disx <span class="token operator">+</span> ex<span class="token punctuation">,</span> top <span class="token operator">=</span> disy <span class="token operator">+</span> ey<span class="token punctuation">;</span>


    <span class="token comment">// 边界判断</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>left <span class="token operator">&lt;</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      left <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>left <span class="token operator">></span> maxLeft<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      left <span class="token operator">=</span> maxLeft<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>top <span class="token operator">&lt;</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      top <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>top <span class="token operator">></span> maxTop<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      top <span class="token operator">=</span> maxTop<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    note<span class="token punctuation">.</span>style<span class="token punctuation">.</span>left <span class="token operator">=</span> left <span class="token operator">+</span> <span class="token string">'px'</span><span class="token punctuation">;</span>
    note<span class="token punctuation">.</span>style<span class="token punctuation">.</span>top <span class="token operator">=</span> top <span class="token operator">+</span> <span class="token string">'px'</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>

  window<span class="token punctuation">.</span><span class="token function-variable function">onmouseup</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    window<span class="token punctuation">.</span>onmousemove <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    window<span class="token punctuation">.</span>onmouseup <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br></div></div><p>运行结果</p>
<p><img src="imgs/javascript/可拖动的便笺.jpg" alt="可拖动的便笺"></p>
<h5 id="事件传播机制" tabindex="-1"><a class="header-anchor" href="#事件传播机制" aria-hidden="true">#</a> 事件传播机制</h5>
<img src="http://mdrs.yuanjin.tech/img/20211216105521.jpg" alt="事件流" style="zoom: 50%;" />
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 在冒泡阶段触发</span>
div<span class="token punctuation">.</span><span class="token function-variable function">onclick</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">// 在捕获阶段触发事件</span>
div<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'click'</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 在冒泡阶段触发事件（默认）</span>
div<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'click'</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 事件处理函数</span>
<span class="token keyword">function</span> <span class="token function">handler</span><span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  e<span class="token punctuation">.</span>target<span class="token punctuation">;</span> <span class="token comment">// 获取事件源（目标阶段的dom）</span>
  e<span class="token punctuation">.</span><span class="token function">stopPropagation</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 阻止事件继续冒泡</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p><strong>事件委托示例</strong></p>
<p>代办事项</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">html</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>en<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>UTF-8<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">http-equiv</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>X-UA-Compatible<span class="token punctuation">"</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>IE=edge<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>viewport<span class="token punctuation">"</span></span> <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>width=device-width, initial-scale=1.0<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">></span></span>待办事项<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">></span></span><span class="token style"><span class="token language-css">
    <span class="token selector">*</span> <span class="token punctuation">{</span>
      <span class="token property">margin</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
      <span class="token property">padding</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
      <span class="token property">box-sizing</span><span class="token punctuation">:</span> border-box<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token selector">body</span> <span class="token punctuation">{</span>
      <span class="token property">font</span><span class="token punctuation">:</span> 300 14px / 1.4em <span class="token string">'Helvetica Neue'</span><span class="token punctuation">,</span> Helvetica<span class="token punctuation">,</span> Arial<span class="token punctuation">,</span> sans-serif<span class="token punctuation">;</span>
      <span class="token property">background</span><span class="token punctuation">:</span> <span class="token function">rgb</span><span class="token punctuation">(</span>245<span class="token punctuation">,</span> 245<span class="token punctuation">,</span> 245<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token property">color</span><span class="token punctuation">:</span> <span class="token function">rgb</span><span class="token punctuation">(</span>17<span class="token punctuation">,</span> 17<span class="token punctuation">,</span> 17<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token property">min-width</span><span class="token punctuation">:</span> 230px<span class="token punctuation">;</span>
      <span class="token property">max-width</span><span class="token punctuation">:</span> 550px<span class="token punctuation">;</span>
      <span class="token property">margin</span><span class="token punctuation">:</span> 0px auto<span class="token punctuation">;</span>
      <span class="token property">letter-spacing</span><span class="token punctuation">:</span> 1px<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token selector">.container</span> <span class="token punctuation">{</span>
      <span class="token property">width</span><span class="token punctuation">:</span> 500px<span class="token punctuation">;</span>
      <span class="token property">margin</span><span class="token punctuation">:</span> 0 auto<span class="token punctuation">;</span>
      <span class="token property">padding</span><span class="token punctuation">:</span> 2em<span class="token punctuation">;</span>
      <span class="token property">margin-bottom</span><span class="token punctuation">:</span> 2em<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token selector">.title</span> <span class="token punctuation">{</span>
      <span class="token property">font-size</span><span class="token punctuation">:</span> 80px<span class="token punctuation">;</span>
      <span class="token property">font-weight</span><span class="token punctuation">:</span> 200<span class="token punctuation">;</span>
      <span class="token property">text-align</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span>
      <span class="token property">color</span><span class="token punctuation">:</span> #b83f45<span class="token punctuation">;</span>
      <span class="token property">text-rendering</span><span class="token punctuation">:</span> optimizelegibility<span class="token punctuation">;</span>
      <span class="token property">margin</span><span class="token punctuation">:</span> 1em<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token selector">.section</span> <span class="token punctuation">{</span>
      <span class="token property">background</span><span class="token punctuation">:</span> #fff<span class="token punctuation">;</span>
      <span class="token property">box-shadow</span><span class="token punctuation">:</span> <span class="token function">rgb</span><span class="token punctuation">(</span>0 0 0 / 20%<span class="token punctuation">)</span> 0px 2px 4px 0px<span class="token punctuation">,</span>
        <span class="token function">rgb</span><span class="token punctuation">(</span>0 0 0 / 10%<span class="token punctuation">)</span> 0px 25px 50px 0px<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token selector">.txt</span> <span class="token punctuation">{</span>
      <span class="token property">padding</span><span class="token punctuation">:</span> 16px 16px 16px 60px<span class="token punctuation">;</span>
      <span class="token property">border</span><span class="token punctuation">:</span> none<span class="token punctuation">;</span>
      <span class="token property">outline</span><span class="token punctuation">:</span> none<span class="token punctuation">;</span>
      <span class="token property">margin</span><span class="token punctuation">:</span> 0px<span class="token punctuation">;</span>
      <span class="token property">width</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span>
      <span class="token property">font-size</span><span class="token punctuation">:</span> 24px<span class="token punctuation">;</span>
      <span class="token property">font-family</span><span class="token punctuation">:</span> inherit<span class="token punctuation">;</span>
      <span class="token property">font-weight</span><span class="token punctuation">:</span> inherit<span class="token punctuation">;</span>
      <span class="token property">line-height</span><span class="token punctuation">:</span> 1.4em<span class="token punctuation">;</span>
      <span class="token property">color</span><span class="token punctuation">:</span> inherit<span class="token punctuation">;</span>
      <span class="token property">letter-spacing</span><span class="token punctuation">:</span> inherit<span class="token punctuation">;</span>
      <span class="token property">border-bottom</span><span class="token punctuation">:</span> 1px solid <span class="token function">rgb</span><span class="token punctuation">(</span>230<span class="token punctuation">,</span> 230<span class="token punctuation">,</span> 230<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token selector">.txt::placeholder</span> <span class="token punctuation">{</span>
      <span class="token property">font-style</span><span class="token punctuation">:</span> italic<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token selector">.todo-list</span> <span class="token punctuation">{</span>
      <span class="token property">list-style</span><span class="token punctuation">:</span> none<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token selector">.todo-list li</span> <span class="token punctuation">{</span>
      <span class="token property">overflow</span><span class="token punctuation">:</span> hidden<span class="token punctuation">;</span>
      <span class="token property">padding</span><span class="token punctuation">:</span> 1em<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token selector">.todo-list li span</span> <span class="token punctuation">{</span>
      <span class="token property">float</span><span class="token punctuation">:</span> left<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token selector">.todo-list li button</span> <span class="token punctuation">{</span>
      <span class="token property">float</span><span class="token punctuation">:</span> right<span class="token punctuation">;</span>
      <span class="token comment">/* visibility: hidden; */</span>
      <span class="token property">color</span><span class="token punctuation">:</span> #b83f45<span class="token punctuation">;</span>
      <span class="token property">border</span><span class="token punctuation">:</span> none<span class="token punctuation">;</span>
      <span class="token property">outline</span><span class="token punctuation">:</span> none<span class="token punctuation">;</span>
      <span class="token property">background</span><span class="token punctuation">:</span> transparent<span class="token punctuation">;</span>
      <span class="token property">cursor</span><span class="token punctuation">:</span> pointer<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token selector">.todo-list li:hover button</span> <span class="token punctuation">{</span>
      <span class="token property">visibility</span><span class="token punctuation">:</span> visible<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  </span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>container<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>title<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>Things<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>section<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>input</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>txt<span class="token punctuation">"</span></span> <span class="token attr-name">type</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>text<span class="token punctuation">"</span></span> <span class="token attr-name">placeholder</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>what needs to be done？<span class="token punctuation">"</span></span> <span class="token punctuation">/></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>ul</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>todo-list<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>ul</span><span class="token punctuation">></span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">lang</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>javascript<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
    <span class="token comment">// 输入待办事项，按下回车后，添加事项到列表</span>
    <span class="token comment">// 使用事件委托的方式完成删除事件</span>
    <span class="token keyword">var</span> txt <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">'.txt'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">var</span> ul <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">'.todo-list'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">function</span> <span class="token function">createLi</span><span class="token punctuation">(</span><span class="token parameter">content</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      ul<span class="token punctuation">.</span>innerHTML <span class="token operator">+=</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">&lt;li>&lt;span></span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>content<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&lt;/span>&lt;button>删除&lt;/button>&lt;/li></span><span class="token template-punctuation string">`</span></span>
    <span class="token punctuation">}</span>
    txt<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'keydown'</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>e<span class="token punctuation">.</span>key <span class="token operator">===</span> <span class="token string">'Enter'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span>value<span class="token punctuation">.</span><span class="token function">trim</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">return</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token function">createLi</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>value<span class="token punctuation">.</span><span class="token function">trim</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>value <span class="token operator">=</span> <span class="token string">''</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    ul<span class="token punctuation">.</span><span class="token function">addEventListener</span><span class="token punctuation">(</span><span class="token string">'click'</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>e<span class="token punctuation">.</span>target<span class="token punctuation">.</span>tagName<span class="token punctuation">.</span><span class="token function">toLowerCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">===</span> <span class="token string">'button'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        e<span class="token punctuation">.</span>target<span class="token punctuation">.</span>parentNode<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  </span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br><span class="line-number">93</span><br><span class="line-number">94</span><br><span class="line-number">95</span><br><span class="line-number">96</span><br><span class="line-number">97</span><br><span class="line-number">98</span><br><span class="line-number">99</span><br><span class="line-number">100</span><br><span class="line-number">101</span><br><span class="line-number">102</span><br><span class="line-number">103</span><br><span class="line-number">104</span><br><span class="line-number">105</span><br><span class="line-number">106</span><br><span class="line-number">107</span><br><span class="line-number">108</span><br><span class="line-number">109</span><br><span class="line-number">110</span><br><span class="line-number">111</span><br><span class="line-number">112</span><br><span class="line-number">113</span><br><span class="line-number">114</span><br><span class="line-number">115</span><br><span class="line-number">116</span><br><span class="line-number">117</span><br><span class="line-number">118</span><br><span class="line-number">119</span><br><span class="line-number">120</span><br><span class="line-number">121</span><br><span class="line-number">122</span><br><span class="line-number">123</span><br><span class="line-number">124</span><br><span class="line-number">125</span><br><span class="line-number">126</span><br><span class="line-number">127</span><br><span class="line-number">128</span><br><span class="line-number">129</span><br><span class="line-number">130</span><br></div></div><p>运行结果</p>
<p><img src="imgs/javascript/代办事项.jpg" alt="代办事项"></p>
<h2 id="案例" tabindex="-1"><a class="header-anchor" href="#案例" aria-hidden="true">#</a> 案例</h2>
<h3 id="瀑布流" tabindex="-1"><a class="header-anchor" href="#瀑布流" aria-hidden="true">#</a> 瀑布流</h3>
<h4 id="什么是瀑布流" tabindex="-1"><a class="header-anchor" href="#什么是瀑布流" aria-hidden="true">#</a> 什么是瀑布流</h4>
<p>瀑布流，又称瀑布流式布局。是比较流行的一种网站页面布局，视觉表现为参差不齐的多栏布局，随着页面滚动条向下滚动，这种布局还会不断加载数据块并附加至当前尾部。</p>
<p><img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-07-29-033940.png" alt="image-20210729113939747"></p>
<h4 id="制作思路" tabindex="-1"><a class="header-anchor" href="#制作思路" aria-hidden="true">#</a> 制作思路</h4>
<p>首先第一步，我们仔细观察上面的瀑布流图片，你会发现他们都是定宽不定高的。
既然定宽，那么一共显示几列，我们也就能够计算出来。如下图所示：</p>
<p><img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-07-29-052059.png" alt="image-20210729132058407"></p>
<p>列数出来之后，我们拿一个数组来保存一行的高度。什么意思？看下图：
我们按照 4 列来算，一开始一张图片都没有放，每一列的高度都为 0，所以数组里面是 4 个 0</p>
<p><img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-07-29-052605.png" alt="image-20210729132605594"></p>
<p>接下来放入第一张图片，找数组里面最小的，目前都是 0，就放在第一列，放完之后需要更新数组里面的最小值</p>
<p><img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-07-29-052847.png" alt="image-20210729132846593"></p>
<p>然后依此类推，找数组最小的，会找到第二个 0，往第二列放入图片，更新数组，找到第三个 0，往第三列放入图片，更新数组...</p>
<p><img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-07-29-053211.png" alt="image-20210729133210534"></p>
<p>目前第一行满了，该放在第二行了，但是放在第二行的第几列呢？
实际上和上面的算法是一样的，找数组的最小值即可，哪个最小就放在哪一列，放完之后更新数组</p>
<p><img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-07-29-054002.png" alt="image-20210729134002131"></p>
<p>新的高度的计算公式：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>这一列新的高度 <span class="token operator">=</span> 这一列高度（数组里面存储的有） <span class="token operator">+</span> 间隙 <span class="token operator">+</span> 新的图片高度
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>然而这只是计算了 top 值，还有 left 值我们需要计算。每张图片的 left 值只和该图片所在的列有关。</p>
<p><img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-07-29-055725.png" alt="image-20210729135724717"></p>
<h4 id="重新布局-函数防抖" tabindex="-1"><a class="header-anchor" href="#重新布局-函数防抖" aria-hidden="true">#</a> 重新布局（函数防抖）</h4>
<p>目前为止，图片已经按照瀑布流的形式布局出来了。但是当我们改变窗体大小的时候，图片是要重新进行布局的。
这就涉及到了要监听 widnow 的 resize 事件，每当此事件触发时，就需要重新排列。
重新排列倒是很简单，只需要把前面的制作思路封装成一个函数，重新调用这个函数即可。但是这里涉及到一个函数发抖的知识。</p>
<p>具体的代码片段如下：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> timeId <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span> <span class="token comment">// 一个计时器的 id</span>
<span class="token comment">// 主要就是绑定窗口尺寸改变的监听事件</span>
window<span class="token punctuation">.</span><span class="token function-variable function">onresize</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token keyword">if</span><span class="token punctuation">(</span>timeId<span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token function">clearTimeout</span><span class="token punctuation">(</span>timeId<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  timeId <span class="token operator">=</span> <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token function">setPositions</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 重新排列</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">500</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div></template>
