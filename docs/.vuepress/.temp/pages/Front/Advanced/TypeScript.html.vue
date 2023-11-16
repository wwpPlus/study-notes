<template><h1 id="typescript" tabindex="-1"><a class="header-anchor" href="#typescript" aria-hidden="true">#</a> TypeScript</h1>
<p>TypeScript 是 JavaScript 的一个超集，支持 ECMAScript 6 标准。</p>
<p>TypeScript 由微软开发的自由和开源的编程语言。</p>
<p>TypeScript 设计目标是开发大型应用，它可以编译成纯 JavaScript，编译出来的 JavaScript 可以运行在任何浏览器上。</p>
<h2 id="语言特性" tabindex="-1"><a class="header-anchor" href="#语言特性" aria-hidden="true">#</a> 语言特性</h2>
<p>TypeScript 是一种给 JavaScript 添加特性的语言扩展。增加的功能包括：</p>
<ul>
<li>类型批注和编译时类型检查</li>
<li>类型推断</li>
<li>类型擦除</li>
<li>接口</li>
<li>枚举</li>
<li>Mixin</li>
<li>泛型编程</li>
<li>名字空间</li>
<li>元组</li>
<li>Await</li>
</ul>
<p>以下功能是从 ECMA 2015 反向移植而来：</p>
<ul>
<li>类</li>
<li>模块</li>
<li>lambda 函数的箭头语法</li>
<li>可选参数以及默认参数</li>
</ul>
<h2 id="安装typescript" tabindex="-1"><a class="header-anchor" href="#安装typescript" aria-hidden="true">#</a> 安装TypeScript</h2>
<div class="language-powershell ext-powershell line-numbers-mode"><pre v-pre class="language-powershell"><code>npm config <span class="token function">set</span> registry https:<span class="token operator">/</span><span class="token operator">/</span>registry<span class="token punctuation">.</span>npmmirror<span class="token punctuation">.</span>com
npm install <span class="token operator">-</span>g typescript
tsc <span class="token operator">-</span>v
<span class="token comment"># ts转换为js</span>
tsc tsc app<span class="token punctuation">.</span>ts 
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>ts转换为js
<img src="@source/Front/Advanced/imgs/typescript/ts_transform.jpg" alt="转换过程"></p>
<h2 id="数据类型" tabindex="-1"><a class="header-anchor" href="#数据类型" aria-hidden="true">#</a> 数据类型</h2>
<p>any、number、string、boolean、Array、元组、enum、void、undefined、null、never</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token comment">// 启用 --strictNullChecks</span>
<span class="token keyword">let</span> x<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>
x <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> <span class="token comment">// 编译正确</span>
x <span class="token operator">=</span> <span class="token keyword">undefined</span><span class="token punctuation">;</span>    <span class="token comment">// 编译错误</span>
x <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>    <span class="token comment">// 编译错误</span>

<span class="token comment">//  可以用 | 来支持多种类型</span>
<span class="token keyword">let</span> x<span class="token operator">:</span> <span class="token builtin">number</span> <span class="token operator">|</span> <span class="token keyword">null</span> <span class="token operator">|</span> <span class="token keyword">undefined</span><span class="token punctuation">;</span>
x <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> <span class="token comment">// 编译正确</span>
x <span class="token operator">=</span> <span class="token keyword">undefined</span><span class="token punctuation">;</span>    <span class="token comment">// 编译正确</span>
x <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>    <span class="token comment">// 编译正确</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>类型断言</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">var</span> str <span class="token operator">=</span> <span class="token string">'1'</span> 
<span class="token keyword">var</span> str2<span class="token operator">:</span><span class="token builtin">number</span> <span class="token operator">=</span> <span class="token operator">&lt;</span><span class="token builtin">number</span><span class="token operator">></span> <span class="token operator">&lt;</span><span class="token builtin">any</span><span class="token operator">></span> str   <span class="token comment">//str、str2 是 string 类型</span>
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>str2<span class="token punctuation">)</span>
<span class="token comment">// 1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>类型推断</p>
<h2 id="typescript-接口" tabindex="-1"><a class="header-anchor" href="#typescript-接口" aria-hidden="true">#</a> TypeScript 接口</h2>
<p>在接口中使用联合类型</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">interface</span> <span class="token class-name">RunOptions</span> <span class="token punctuation">{</span> 
    program<span class="token operator">:</span><span class="token builtin">string</span><span class="token punctuation">;</span> 
    commandline<span class="token operator">:</span><span class="token builtin">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">|</span><span class="token builtin">string</span><span class="token operator">|</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=></span><span class="token builtin">string</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
<span class="token punctuation">}</span> 
<span class="token comment">// commandline 是字符串</span>
<span class="token keyword">var</span> options<span class="token operator">:</span>RunOptions <span class="token operator">=</span> <span class="token punctuation">{</span>program<span class="token operator">:</span><span class="token string">"test1"</span><span class="token punctuation">,</span>commandline<span class="token operator">:</span><span class="token string">"Hello"</span><span class="token punctuation">}</span><span class="token punctuation">;</span> 
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>options<span class="token punctuation">.</span>commandline<span class="token punctuation">)</span>  
<span class="token comment">// commandline 是字符串数组</span>
options <span class="token operator">=</span> <span class="token punctuation">{</span>program<span class="token operator">:</span><span class="token string">"test1"</span><span class="token punctuation">,</span>commandline<span class="token operator">:</span><span class="token punctuation">[</span><span class="token string">"Hello"</span><span class="token punctuation">,</span><span class="token string">"World"</span><span class="token punctuation">]</span><span class="token punctuation">}</span><span class="token punctuation">;</span> 
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>options<span class="token punctuation">.</span>commandline<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>options<span class="token punctuation">.</span>commandline<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  
<span class="token comment">// commandline 是一个函数表达式</span>
options <span class="token operator">=</span> <span class="token punctuation">{</span>program<span class="token operator">:</span><span class="token string">"test1"</span><span class="token punctuation">,</span><span class="token function-variable function">commandline</span><span class="token operator">:</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=></span><span class="token punctuation">{</span><span class="token keyword">return</span> <span class="token string">"**Hello World**"</span><span class="token punctuation">;</span><span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">;</span> 
<span class="token keyword">var</span> fn<span class="token operator">:</span><span class="token builtin">any</span> <span class="token operator">=</span> options<span class="token punctuation">.</span>commandline<span class="token punctuation">;</span> 
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><p>接口和数组</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">interface</span> <span class="token class-name">namelist</span> <span class="token punctuation">{</span> 
   <span class="token punctuation">[</span>index<span class="token operator">:</span><span class="token builtin">number</span><span class="token punctuation">]</span><span class="token operator">:</span><span class="token builtin">string</span> 
<span class="token punctuation">}</span>
<span class="token comment">// 类型一致，正确</span>
<span class="token keyword">var</span> list2<span class="token operator">:</span>namelist <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">"Google"</span><span class="token punctuation">,</span><span class="token string">"Runoob"</span><span class="token punctuation">,</span><span class="token string">"Taobao"</span><span class="token punctuation">]</span>
<span class="token comment">// 错误元素 1 不是 string 类型</span>
<span class="token comment">// var list2:namelist = ["Runoob",1,"Taobao"]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>接口多继承</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">interface</span> <span class="token class-name">IParent1</span> <span class="token punctuation">{</span> 
    v1<span class="token operator">:</span><span class="token builtin">number</span> 
<span class="token punctuation">}</span> 
<span class="token keyword">interface</span> <span class="token class-name">IParent2</span> <span class="token punctuation">{</span> 
    v2<span class="token operator">:</span><span class="token builtin">number</span> 
<span class="token punctuation">}</span> 
<span class="token keyword">interface</span> <span class="token class-name">Child</span> <span class="token keyword">extends</span> <span class="token class-name">IParent1</span><span class="token punctuation">,</span> IParent2 <span class="token punctuation">{</span> <span class="token punctuation">}</span> 
<span class="token keyword">var</span> Iobj<span class="token operator">:</span>Child <span class="token operator">=</span> <span class="token punctuation">{</span> v1<span class="token operator">:</span><span class="token number">12</span><span class="token punctuation">,</span> v2<span class="token operator">:</span><span class="token number">23</span><span class="token punctuation">}</span> 
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"value 1: "</span><span class="token operator">+</span>Iobj<span class="token punctuation">.</span>v1<span class="token operator">+</span><span class="token string">" value 2: "</span><span class="token operator">+</span>Iobj<span class="token punctuation">.</span>v2<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h2 id="类" tabindex="-1"><a class="header-anchor" href="#类" aria-hidden="true">#</a> 类</h2>
<p>TypeScript 是面向对象的 JavaScript。</p>
<ul>
<li>
<p>子类只能继承一个父类，TypeScript 不支持继承多个类，但支持多重继承，且继承类的方法可以重写</p>
</li>
<li>
<p>static 关键字用于定义类的数据成员（属性和方法）为静态的，静态成员可以直接通过类名调用。</p>
</li>
<li>
<p>instanceof 运算符用于判断对象是否是指定的类型，如果是返回 true，否则返回 false。</p>
</li>
<li>
<p>TypeScript 中，可以使用访问控制符来保护对类、变量、方法和构造方法的访问。</p>
<ul>
<li>
<p>public（默认） : 公有，可以在任何地方被访问。</p>
</li>
<li>
<p>protected : 受保护，可以被其自身以及其子类访问。</p>
</li>
<li>
<p>private : 私有，只能被其定义所在的类访问。</p>
</li>
</ul>
</li>
<li>
<p>类可以实现接口，使用关键字 implements</p>
</li>
</ul>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">interface</span> <span class="token class-name">IRoot</span> <span class="token punctuation">{</span> 
   str<span class="token operator">:</span><span class="token builtin">string</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token class-name">Root</span> <span class="token punctuation">{</span> 
    str<span class="token operator">:</span><span class="token builtin">string</span><span class="token punctuation">;</span>
    <span class="token keyword">static</span> num<span class="token operator">:</span><span class="token builtin">number</span><span class="token punctuation">;</span>
    <span class="token keyword">private</span> str1<span class="token operator">:</span><span class="token builtin">string</span> <span class="token operator">=</span> <span class="token string">"world"</span> 
    <span class="token function">doPrint</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span><span class="token keyword">void</span> <span class="token punctuation">{</span>
        <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"父类的 doPrint() 方法。"</span><span class="token punctuation">)</span> 
    <span class="token punctuation">}</span> 
<span class="token punctuation">}</span> 
 
<span class="token keyword">class</span> <span class="token class-name">Child</span> <span class="token keyword">extends</span> <span class="token class-name">Root</span> <span class="token punctuation">{</span><span class="token punctuation">}</span> 
<span class="token keyword">class</span> <span class="token class-name">Leaf</span> <span class="token keyword">extends</span> <span class="token class-name">Child</span> <span class="token punctuation">{</span>
    <span class="token function">doPrint</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span><span class="token keyword">void</span> <span class="token punctuation">{</span> 
        <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">doPrint</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// 调用父类的函数</span>
        <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"子类的 doPrint()方法。"</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span> <span class="token comment">// 多重继承，继承了 Child 和 Root 类</span>
 
<span class="token keyword">var</span> obj <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Leaf</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
obj<span class="token punctuation">.</span>str <span class="token operator">=</span><span class="token string">"hello"</span>
Leaf<span class="token punctuation">.</span>num <span class="token operator">=</span> <span class="token number">12</span>
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>obj<span class="token punctuation">.</span>str<span class="token punctuation">)</span>
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>obj<span class="token punctuation">.</span><span class="token function">doPrint</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"obj 对象是 Leaf 类实例化来的吗？ "</span> <span class="token operator">+</span> obj <span class="token keyword">instanceof</span> <span class="token class-name">Leaf</span><span class="token punctuation">)</span>
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>obj<span class="token punctuation">.</span>str1<span class="token punctuation">)</span>     <span class="token comment">// 编译错误，不可访问</span>
<span class="token comment">// hello</span>
<span class="token comment">// 父类的 doPrint() 方法。</span>
<span class="token comment">// 子类的 doPrint()方法。</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br></div></div><h2 id="对象" tabindex="-1"><a class="header-anchor" href="#对象" aria-hidden="true">#</a> 对象</h2>
<p>传递对象参数</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">var</span> sites <span class="token operator">=</span> <span class="token punctuation">{</span> 
    site1<span class="token operator">:</span><span class="token string">"Runoob"</span><span class="token punctuation">,</span> 
    site2<span class="token operator">:</span><span class="token string">"Google"</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span> 
<span class="token keyword">var</span> <span class="token function-variable function">invokesites</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span>obj<span class="token operator">:</span> <span class="token punctuation">{</span> site1<span class="token operator">:</span><span class="token builtin">string</span><span class="token punctuation">,</span> site2 <span class="token operator">:</span><span class="token builtin">string</span> <span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> 
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"site1 :"</span><span class="token operator">+</span>obj<span class="token punctuation">.</span>site1<span class="token punctuation">)</span> 
    <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"site2 :"</span><span class="token operator">+</span>obj<span class="token punctuation">.</span>site2<span class="token punctuation">)</span> 
<span class="token punctuation">}</span> 
<span class="token function">invokesites</span><span class="token punctuation">(</span>sites<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p><strong>鸭子类型</strong>：是动态类型的一种风格，是多态(polymorphism)的一种形式。在这种风格中，一个对象有效的语义，不是由继承自特定的类或实现特定的接口，而是由&quot;当前方法和属性的集合&quot;决定。</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">interface</span> <span class="token class-name">IPoint</span> <span class="token punctuation">{</span> 
    x<span class="token operator">:</span><span class="token builtin">number</span> 
    y<span class="token operator">:</span><span class="token builtin">number</span> 
<span class="token punctuation">}</span> 
<span class="token keyword">function</span> <span class="token function">addPoints</span><span class="token punctuation">(</span>p1<span class="token operator">:</span>IPoint<span class="token punctuation">,</span>p2<span class="token operator">:</span>IPoint<span class="token punctuation">)</span><span class="token operator">:</span>IPoint <span class="token punctuation">{</span> 
    <span class="token keyword">var</span> x <span class="token operator">=</span> p1<span class="token punctuation">.</span>x <span class="token operator">+</span> p2<span class="token punctuation">.</span>x 
    <span class="token keyword">var</span> y <span class="token operator">=</span> p1<span class="token punctuation">.</span>y <span class="token operator">+</span> p2<span class="token punctuation">.</span>y 
    <span class="token keyword">return</span> <span class="token punctuation">{</span>x<span class="token operator">:</span>x<span class="token punctuation">,</span>y<span class="token operator">:</span>y<span class="token punctuation">}</span> 
<span class="token punctuation">}</span> 
<span class="token comment">// 正确</span>
<span class="token keyword">var</span> newPoint <span class="token operator">=</span> <span class="token function">addPoints</span><span class="token punctuation">(</span><span class="token punctuation">{</span>x<span class="token operator">:</span><span class="token number">3</span><span class="token punctuation">,</span>y<span class="token operator">:</span><span class="token number">4</span><span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token punctuation">{</span>x<span class="token operator">:</span><span class="token number">5</span><span class="token punctuation">,</span>y<span class="token operator">:</span><span class="token number">1</span><span class="token punctuation">}</span><span class="token punctuation">)</span>  
<span class="token comment">// 错误 </span>
<span class="token keyword">var</span> newPoint2 <span class="token operator">=</span> <span class="token function">addPoints</span><span class="token punctuation">(</span><span class="token punctuation">{</span>x<span class="token operator">:</span><span class="token number">1</span><span class="token punctuation">}</span><span class="token punctuation">,</span><span class="token punctuation">{</span>x<span class="token operator">:</span><span class="token number">4</span><span class="token punctuation">,</span>y<span class="token operator">:</span><span class="token number">3</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><h2 id="typescript-命名空间" tabindex="-1"><a class="header-anchor" href="#typescript-命名空间" aria-hidden="true">#</a> TypeScript 命名空间</h2>
<p>命名空间一个最明确的目的就是解决重名问题。</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token comment">// IShape.ts 文件</span>
<span class="token keyword">namespace</span> Drawing <span class="token punctuation">{</span> 
    <span class="token keyword">export</span> <span class="token keyword">interface</span> <span class="token class-name">IShape</span> <span class="token punctuation">{</span> 
        <span class="token function">draw</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// Circle.ts 文件</span>
<span class="token comment">// &lt;reference path = "IShape.ts" /> </span>
<span class="token keyword">namespace</span> Drawing <span class="token punctuation">{</span> 
    <span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">Circle</span> <span class="token keyword">implements</span> <span class="token class-name">IShape</span> <span class="token punctuation">{</span> 
        <span class="token keyword">public</span> <span class="token function">draw</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> 
            <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"Circle is drawn"</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
        <span class="token punctuation">}</span>  
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// Triangle.ts 文件</span>
<span class="token comment">// &lt;reference path = "IShape.ts" /> </span>
<span class="token keyword">namespace</span> Drawing <span class="token punctuation">{</span> 
    <span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">Triangle</span> <span class="token keyword">implements</span> <span class="token class-name">IShape</span> <span class="token punctuation">{</span> 
        <span class="token keyword">public</span> <span class="token function">draw</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> 
            <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"Triangle is drawn"</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
        <span class="token punctuation">}</span> 
    <span class="token punctuation">}</span> 
<span class="token punctuation">}</span>

<span class="token comment">// TestShape.ts 文件</span>
<span class="token comment">// &lt;reference path = "IShape.ts" />   </span>
<span class="token comment">// &lt;reference path = "Circle.ts" /> </span>
<span class="token comment">// &lt;reference path = "Triangle.ts" />  </span>
<span class="token keyword">function</span> <span class="token function">drawAllShapes</span><span class="token punctuation">(</span>shape<span class="token operator">:</span>Drawing<span class="token punctuation">.</span>IShape<span class="token punctuation">)</span> <span class="token punctuation">{</span> 
    shape<span class="token punctuation">.</span><span class="token function">draw</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
<span class="token punctuation">}</span> 
<span class="token function">drawAllShapes</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Drawing</span><span class="token punctuation">.</span><span class="token function">Circle</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">drawAllShapes</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Drawing</span><span class="token punctuation">.</span><span class="token function">Triangle</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br></div></div><h2 id="typescript-模块" tabindex="-1"><a class="header-anchor" href="#typescript-模块" aria-hidden="true">#</a> TypeScript 模块</h2>
<p>TypeScript 模块的设计理念是可以更换的组织代码。
模块是在其自身的作用域里执行，并不是在全局作用域，这意味着定义在模块里面的变量、函数和类等在模块外部是不可见的，除非明确地使用 export 导出它们。</p>
<p>模块使用模块加载器去导入其它的模块。 在运行时，模块加载器的作用是在执行此模块代码前去查找并执行这个模块的所有依赖。 大家最熟知的JavaScript模块加载器是服务于 Node.js 的 CommonJS 和服务于 Web 应用的 Require.js。</p>
<p>此外还有有 SystemJs 和 Webpack。</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token comment">// IShape.ts 文件</span>
<span class="token keyword">export</span> <span class="token keyword">interface</span> <span class="token class-name">IShape</span> <span class="token punctuation">{</span> 
   <span class="token function">draw</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
<span class="token punctuation">}</span>

<span class="token comment">// Circle.ts 文件</span>
<span class="token keyword">import</span> shape <span class="token operator">=</span> <span class="token keyword">require</span><span class="token punctuation">(</span><span class="token string">"./IShape"</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">Circle</span> <span class="token keyword">implements</span> <span class="token class-name">shape</span><span class="token punctuation">.</span>IShape <span class="token punctuation">{</span> 
   <span class="token keyword">public</span> <span class="token function">draw</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> 
      <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"Cirlce is drawn (external module)"</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
   <span class="token punctuation">}</span> 
<span class="token punctuation">}</span>

<span class="token comment">// Triangle.ts 文件</span>
<span class="token keyword">import</span> shape <span class="token operator">=</span> <span class="token keyword">require</span><span class="token punctuation">(</span><span class="token string">"./IShape"</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
<span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">Triangle</span> <span class="token keyword">implements</span> <span class="token class-name">shape</span><span class="token punctuation">.</span>IShape <span class="token punctuation">{</span> 
   <span class="token keyword">public</span> <span class="token function">draw</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> 
      <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"Triangle is drawn (external module)"</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
   <span class="token punctuation">}</span> 
<span class="token punctuation">}</span>

<span class="token keyword">import</span> shape <span class="token operator">=</span> <span class="token keyword">require</span><span class="token punctuation">(</span><span class="token string">"./IShape"</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
<span class="token keyword">import</span> circle <span class="token operator">=</span> <span class="token keyword">require</span><span class="token punctuation">(</span><span class="token string">"./Circle"</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
<span class="token keyword">import</span> triangle <span class="token operator">=</span> <span class="token keyword">require</span><span class="token punctuation">(</span><span class="token string">"./Triangle"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>  
 
<span class="token keyword">function</span> <span class="token function">drawAllShapes</span><span class="token punctuation">(</span>shapeToDraw<span class="token operator">:</span> shape<span class="token punctuation">.</span>IShape<span class="token punctuation">)</span> <span class="token punctuation">{</span>
   shapeToDraw<span class="token punctuation">.</span><span class="token function">draw</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
<span class="token punctuation">}</span> 
 
<span class="token function">drawAllShapes</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">circle</span><span class="token punctuation">.</span><span class="token function">Circle</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
<span class="token function">drawAllShapes</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">triangle</span><span class="token punctuation">.</span><span class="token function">Triangle</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br></div></div><h2 id="typescript-声明文件" tabindex="-1"><a class="header-anchor" href="#typescript-声明文件" aria-hidden="true">#</a> TypeScript 声明文件</h2>
<p>TypeScript 作为 JavaScript 的超集，在开发过程中不可避免要引用其他第三方的 JavaScript 的库。虽然通过直接引用可以调用库的类和方法，但是却无法使用TypeScript 诸如类型检查等特性功能。为了解决这个问题，需要将这些库里的函数和方法体去掉后只保留导出类型声明，而产生了一个描述 JavaScript 库和模块信息的声明文件。通过引用这个声明文件，就可以借用 TypeScript 的各种特性来使用库文件了。</p>
<p>declare 定义的类型只会用于编译时的检查，编译结果中会被删除。</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token function">jQuery</span><span class="token punctuation">(</span><span class="token string">'#foo'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// index.ts(1,1): error TS2304: Cannot find name 'jQuery'.</span>
<span class="token keyword">declare</span> <span class="token keyword">var</span> <span class="token function-variable function">jQuery</span><span class="token operator">:</span> <span class="token punctuation">(</span>selector<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token builtin">any</span><span class="token punctuation">;</span>
<span class="token function">jQuery</span><span class="token punctuation">(</span><span class="token string">'#foo'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p><strong>声明文件</strong>
声明文件以 .d.ts 为后缀，例如：<code>runoob.d.ts</code>
声明文件或模块的语法格式如下：</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">declare</span> <span class="token keyword">module</span> Module_Name <span class="token punctuation">{</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>TypeScript 引入声明文件语法格式：<code>&lt;reference path = &quot; runoob.d.ts&quot; /&gt;</code></p>
<p>实例</p>
<p>CalcThirdPartyJsLib.js 文件</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> Runoob<span class="token punctuation">;</span>  
<span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">Runoob</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> Calc <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> 
        <span class="token keyword">function</span> <span class="token function">Calc</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> 
        <span class="token punctuation">}</span> 
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token class-name">Calc</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">doSum</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">limit</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">var</span> sum <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> 
 
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">var</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;=</span> limit<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> 
            sum <span class="token operator">=</span> sum <span class="token operator">+</span> i<span class="token punctuation">;</span> 
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> sum<span class="token punctuation">;</span> 
    <span class="token punctuation">}</span>
    Runoob<span class="token punctuation">.</span>Calc <span class="token operator">=</span> Calc<span class="token punctuation">;</span> 
    <span class="token keyword">return</span> Calc<span class="token punctuation">;</span> 
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span>Runoob <span class="token operator">||</span> <span class="token punctuation">(</span>Runoob <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
<span class="token keyword">var</span> test <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Runoob<span class="token punctuation">.</span>Calc</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br></div></div><p>设置声明文件 Calc.d.ts文件</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">declare</span> <span class="token keyword">module</span> Runoob <span class="token punctuation">{</span> 
   <span class="token keyword">export</span> <span class="token keyword">class</span> <span class="token class-name">Calc</span> <span class="token punctuation">{</span> 
      <span class="token function">doSum</span><span class="token punctuation">(</span>limit<span class="token operator">:</span><span class="token builtin">number</span><span class="token punctuation">)</span> <span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span> 
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>把声明文件加入到 TypeScript 中，CalcTest.ts 文件</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token comment">// &lt;reference path = "Calc.d.ts" /> </span>
<span class="token keyword">var</span> obj <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Runoob</span><span class="token punctuation">.</span><span class="token function">Calc</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
<span class="token comment">// obj.doSum("Hello"); // 编译错误</span>
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>obj<span class="token punctuation">.</span><span class="token function">doSum</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>测试</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">DOCTYPE</span> <span class="token name">html</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>head</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span> <span class="token attr-name">charset</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>utf-8<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>title</span><span class="token punctuation">></span></span>TypeScript学习<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>title</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>CalcThirdPartyJsLib.js<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>CalcTest.js<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token script"></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>head</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>body</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span><span class="token punctuation">></span></span>声明文件测试<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>body</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div></template>
