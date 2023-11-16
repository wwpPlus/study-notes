<template><h1 id="工程化" tabindex="-1"><a class="header-anchor" href="#工程化" aria-hidden="true">#</a> 工程化</h1>
<h2 id="为什么需要模块化" tabindex="-1"><a class="header-anchor" href="#为什么需要模块化" aria-hidden="true">#</a> 为什么需要模块化</h2>
<p>当前端工程到达一定规模后，就会出现下面的问题：</p>
<ul>
<li>
<p>全局变量污染</p>
</li>
<li>
<p>依赖混乱</p>
</li>
</ul>
<p>上面的问题，共同导致了<strong>代码文件难以细分</strong></p>
<p>模块化就是为了解决上面两个问题出现的</p>
<p>模块化出现后，我们就可以把臃肿的代码细分到各个小文件中，便于后期维护管理</p>
<h2 id="前端模块化标准" tabindex="-1"><a class="header-anchor" href="#前端模块化标准" aria-hidden="true">#</a> 前端模块化标准</h2>
<p>前端主要有两大模块化标准：</p>
<ul>
<li>CommonJS，简称CMJ，这是一个<strong>社区</strong>规范，出现时间较早，目前仅node环境支持</li>
<li>ES Module，简称ESM，这是随着ES6发布的<strong>官方</strong>模块化标准，目前浏览器和新版本node环境均支持</li>
</ul>
<blockquote>
<p>node环境</p>
<p>下载地址：https://nodejs.org/zh-cn/</p>
<p><img src="http://mdrs.yuanjin.tech/img/20210423130904.png" alt="image-20210423130904669"></p>
</blockquote>
<h2 id="commonjs如何实现模块化" tabindex="-1"><a class="header-anchor" href="#commonjs如何实现模块化" aria-hidden="true">#</a> CommonJS如何实现模块化</h2>
<p>node天生支持CommonJS模块化标准</p>
<p>node规定：</p>
<ol>
<li>
<p>node中的每个js文件都是一个CMJ模块，通过node命令运行的模块，叫做入口模块</p>
</li>
<li>
<p>模块中的所有全局定义的变量、函数，都不会污染到其他模块</p>
</li>
<li>
<p>模块可以暴露（导出）一些内容给其他模块使用，需要暴露什么内容，就在模块中给<code>module.exports</code>赋值</p>
</li>
<li>
<p>一个模块可以导入其他模块，使用函数<code>require(&quot;要导入的模块路径&quot;)</code>即可完成，该函数返回目标模块的导出结果</p>
<ol>
<li>导入模块时，可以省略<code>.js</code></li>
<li>导入模块时，必须以<code>./</code>或<code>../</code>开头</li>
</ol>
</li>
<li>
<p>一个模块在被导入时会运行一次，然后它的导出结果会被node缓存起来，后续对该模块导入时，不会重新运行，直接使用缓存结果</p>
</li>
</ol>
<h2 id="commonjs" tabindex="-1"><a class="header-anchor" href="#commonjs" aria-hidden="true">#</a> CommonJS</h2>
<blockquote>
<p>标准类型：社区规范</p>
<p>支持环境：node</p>
<p>依赖类型：动态依赖</p>
</blockquote>
<h3 id="如何导出" tabindex="-1"><a class="header-anchor" href="#如何导出" aria-hidden="true">#</a> 如何导出</h3>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>module<span class="token punctuation">.</span>exports <span class="token operator">=</span> 导出的值
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><h3 id="如何导入" tabindex="-1"><a class="header-anchor" href="#如何导入" aria-hidden="true">#</a> 如何导入</h3>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"模块路径"</span><span class="token punctuation">)</span> <span class="token comment">// 函数返回模块导出的值</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><h2 id="es-module" tabindex="-1"><a class="header-anchor" href="#es-module" aria-hidden="true">#</a> ES Module</h2>
<blockquote>
<p>标准类型：官方标准</p>
<p>支持环境：node，浏览器</p>
<p>依赖类型：静态依赖，动态依赖</p>
</blockquote>
<h3 id="如何导出-1" tabindex="-1"><a class="header-anchor" href="#如何导出-1" aria-hidden="true">#</a> 如何导出</h3>
<p><strong>ES Module</strong>的导出</p>
<p>ES Module分为两种导出方式：</p>
<ul>
<li>具名导出（普通导出），可以导出多个</li>
<li>默认导出，只能导出一个</li>
</ul>
<p>一个模块可以同时存在两种导出方式，最终会合并为一个「对象」导出</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token keyword">const</span> a <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> <span class="token comment">// 具名，常用</span>
<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">b</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token comment">// 具名，常用</span>
<span class="token keyword">export</span> <span class="token keyword">const</span> <span class="token function-variable function">c</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span><span class="token punctuation">}</span>  <span class="token comment">// 具名，常用</span>
<span class="token keyword">const</span> d <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
<span class="token keyword">export</span> <span class="token punctuation">{</span> d <span class="token punctuation">}</span> <span class="token comment">// 具名</span>
<span class="token keyword">const</span> k <span class="token operator">=</span> <span class="token number">10</span>
<span class="token keyword">export</span> <span class="token punctuation">{</span> k <span class="token keyword">as</span> temp <span class="token punctuation">}</span> <span class="token comment">// 具名</span>

<span class="token comment">// export default 3 // 默认，常用</span>
<span class="token comment">// export default function() {} // 默认，常用</span>
<span class="token comment">// const e = 4;</span>
<span class="token comment">// export { e as default } // 默认</span>

<span class="token keyword">const</span> f <span class="token operator">=</span> <span class="token number">4</span><span class="token punctuation">,</span> g <span class="token operator">=</span> <span class="token number">5</span><span class="token punctuation">,</span> h <span class="token operator">=</span> <span class="token number">6</span>
<span class="token keyword">export</span> <span class="token punctuation">{</span> f<span class="token punctuation">,</span> g<span class="token punctuation">,</span> h <span class="token keyword">as</span> <span class="token keyword">default</span><span class="token punctuation">}</span> <span class="token comment">// 基本 + 默认</span>

<span class="token comment">// 以上代码将导出下面的对象</span>
<span class="token comment">/*
{
	a: 1,
	b: fn,
	c: fn,
	d: 2,
	temp: 10,
	f: 4,
	g: 5,
	default: 6
}
*/</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br></div></div><p><strong>注意：导出代码必须为顶级代码，即不可放到代码块中</strong></p>
<h3 id="如何导入-1" tabindex="-1"><a class="header-anchor" href="#如何导入-1" aria-hidden="true">#</a> 如何导入</h3>
<p>针对具名导出和默认导出，有不同的导入语法</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 仅运行一次该模块，不导入任何内容</span>
<span class="token keyword">import</span> <span class="token string">"模块路径"</span>
<span class="token comment">// 常用，导入属性 a、b，放到变量a、b中。a->a, b->b</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> a<span class="token punctuation">,</span> b <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"模块路径"</span>   
<span class="token comment">// 常用，导入属性 default，放入变量c中。default->c</span>
<span class="token keyword">import</span> c <span class="token keyword">from</span> <span class="token string">"模块路径"</span>  
<span class="token comment">// 常用，default->c，a->a, b->b</span>
<span class="token keyword">import</span> c<span class="token punctuation">,</span> <span class="token punctuation">{</span> a<span class="token punctuation">,</span> b <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"模块路径"</span> 
<span class="token comment">// 常用，将模块对象放入到变量obj中</span>
<span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> obj <span class="token keyword">from</span> <span class="token string">"模块路径"</span> 


<span class="token comment">// 导入属性a、b，放到变量temp1、temp2 中</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span>a <span class="token keyword">as</span> temp1<span class="token punctuation">,</span> b <span class="token keyword">as</span> temp2<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"模块路径"</span> 
<span class="token comment">// 导入属性default，放入变量a中，default是关键字，不能作为变量名，必须定义别名</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span><span class="token keyword">default</span> <span class="token keyword">as</span> a<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"模块路径"</span> 
<span class="token comment">//导入属性default、b，放入变量a、b中</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span><span class="token keyword">default</span> <span class="token keyword">as</span> a<span class="token punctuation">,</span> b<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"模块路径"</span> 
<span class="token comment">// 以上均为静态导入</span>

<span class="token keyword">import</span><span class="token punctuation">(</span><span class="token string">"模块路径"</span><span class="token punctuation">)</span> <span class="token comment">// 动态导入，返回一个Promise，完成时的数据为模块对象</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><p><strong>注意：静态导入的代码必须为在代码顶端，也不可放入代码块中</strong></p>
<p><strong>另外，静态导入的代码绑定的符号是常量，不可更改</strong></p>
<h2 id="什么是less" tabindex="-1"><a class="header-anchor" href="#什么是less" aria-hidden="true">#</a> 什么是Less？</h2>
<p><strong>Less</strong>是一种更加简洁的样式代码，它非常像CSS，但又不太一样，它让编写样式变得更容易</p>
<p>下面是css代码和Less代码的对比，它们都表达了一样的含义</p>
<p><img src="http://mdrs.yuanjin.tech/img/20210507125034.png" alt="image-20210507125034131"></p>
<p><strong>Less代码虽好，但它无法被浏览器识别</strong>，因此需要一个工具将其转换为血统纯正的css代码</p>
<p>由于<strong>node环境具有读写文件的能力</strong>，于是在node环境中可以轻松的完成文件的转换</p>
<p><code>npm</code>上有一个包叫做<code>less</code>，它运行在node环境中，通过它可以完成对Less代码的转换</p>
<img src="http://mdrs.yuanjin.tech/img/20210507105107.png" alt="image-20210507105107556" style="zoom:50%;" />
<p><strong>可以看出，node环境在前端工程化中，充当了一个辅助的角色，它并不直接运行前端代码，而是让我们编写前端代码更加舒适便利，在后续的课程中，你还会不断的体会到这一点</strong></p>
<p><strong>转换代码，称之为编译(compile)，转换代码的工具，称之为编译器(compiler)</strong></p>
<h3 id="体验less" tabindex="-1"><a class="header-anchor" href="#体验less" aria-hidden="true">#</a> 体验Less</h3>
<ol>
<li>
<p>新建<code>index.less</code>文件，编写下面的<code>less</code>代码</p>
<div class="language-less ext-less line-numbers-mode"><pre v-pre class="language-less"><code><span class="token variable">@green<span class="token punctuation">:</span></span> #008c8c<span class="token punctuation">;</span>
<span class="token selector">.list</span> <span class="token punctuation">{</span>
  <span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>
  <span class="token property">flex-wrap</span><span class="token punctuation">:</span> wrap<span class="token punctuation">;</span>
  <span class="token property">color</span><span class="token punctuation">:</span> <span class="token variable">@green</span><span class="token punctuation">;</span>
  <span class="token selector">li</span> <span class="token punctuation">{</span>
    <span class="token property">margin</span><span class="token punctuation">:</span> 1em<span class="token punctuation">;</span>
    <span class="token selector">&amp;:hover</span> <span class="token punctuation">{</span>
      <span class="token property">background</span><span class="token punctuation">:</span> <span class="token variable">@green</span><span class="token punctuation">;</span>
      <span class="token property">color</span><span class="token punctuation">:</span> #fff<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div></li>
<li>
<p>使用<code>npm</code>下载<code>less</code></p>
<p><code>less</code>包提供了一个<code>cli</code>工具<code>lessc</code>，你可以有两种方案使用它</p>
<p><strong>方案一：全局安装less</strong></p>
<p>这种方案可以让你在任何终端目录使用<code>lessc</code>命令，但不利于版本控制</p>
<p><strong>方案二：本地安装less</strong></p>
<p>这种方案会把<code>less</code>安装到工程目录的<code>node_modules</code>中，你无法全局使用<code>lessc</code>命令，但可以在当前工程目录中使用<code>npx lessc</code>运行该命令</p>
<blockquote>
<p>npx是npm提供的一个小工具，它可以运行当前项目中安装到node_modules的cli命令</p>
<p>如果配置<code>package.json</code>脚本，无须使用<code>npx</code></p>
<p>如果可以，应该尽量使用本地安装，而非全局安装</p>
</blockquote>
<p>如果可以，应该尽量使用本地安装，而非全局安装</p>
</li>
<li>
<p>使用<code>lessc</code>命令，对编写的<code>less</code>文件进行编译</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 将 index.less 编译成为 index.css</span>
lessc index.less index.css
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div></li>
<li>
<p>新建一个页面，引用编译结果<code>index.css</code></p>
</li>
</ol>
<blockquote>
<p>目前，编写less代码会遇到一点小麻烦，就是每次编写后，都需要运行命令进行编译</p>
<p>这个麻烦只是暂时的，将来很快就可以解决</p>
</blockquote>
<h3 id="less的核心语法" tabindex="-1"><a class="header-anchor" href="#less的核心语法" aria-hidden="true">#</a> Less的核心语法</h3>
<blockquote>
<p>Less官网：https://lesscss.org/</p>
<p>Less民间中文网：https://less.bootcss.com/</p>
</blockquote>
<p>Less提供了非常多的功能，帮助我们更加轻松的编写css代码</p>
<p>其中，我们最常用的功能有下面3个：</p>
<ul>
<li><a href="https://less.bootcss.com/#%E5%8F%98%E9%87%8F%EF%BC%88variables%EF%BC%89" target="_blank" rel="noopener noreferrer">变量<ExternalLinkIcon/></a></li>
<li><a href="https://less.bootcss.com/#%E5%B5%8C%E5%A5%97%EF%BC%88nesting%EF%BC%89" target="_blank" rel="noopener noreferrer">嵌套<ExternalLinkIcon/></a></li>
<li><a href="https://less.bootcss.com/#%E6%B7%B7%E5%90%88%EF%BC%88mixins%EF%BC%89" target="_blank" rel="noopener noreferrer">混合<ExternalLinkIcon/></a></li>
</ul>
<p>另外，你需要关注Less的特殊<a href="https://less.bootcss.com/#%E6%B3%A8%E9%87%8A%EF%BC%88comments%EF%BC%89" target="_blank" rel="noopener noreferrer">注释<ExternalLinkIcon/></a></p>
<blockquote>
<p><strong>工程化，为复杂应用而生</strong></p>
<p>本文为保持简单，牺牲了某些语言的准确性</p>
</blockquote>
<h2 id="工程化工具" tabindex="-1"><a class="header-anchor" href="#工程化工具" aria-hidden="true">#</a> 工程化工具</h2>
<p><strong>webpack是用来搭建前端工程的</strong></p>
<p>它运行在node环境中，它所做的事情，简单来说，就是<strong>打包</strong></p>
<img src="http://mdrs.yuanjin.tech/img/20210508172954.png" alt="image-20210508172953979" style="zoom:50%;" />
<p>具体来说，就是以某个模块作为入口，根据入口分析出所有模块的依赖关系，然后对各种模块进行合并、压缩，形成最终的打包结果</p>
<p><strong>在webpack的世界中，一切皆是模块</strong></p>
<h3 id="体验" tabindex="-1"><a class="header-anchor" href="#体验" aria-hidden="true">#</a> 体验</h3>
<blockquote>
<p>老师提供的工程，以<code>src/main.js</code>作为入口文件</p>
<p>按照习惯，所有的模块均放置在<code>src</code>目录中</p>
</blockquote>
<ol>
<li>
<p>安装依赖</p>
</li>
<li>
<p>编写多个模块</p>
<p>随意编写一些模块，可以是js、图片、音视频，以入口模块为起点，形成依赖关系</p>
</li>
<li>
<p>运行<code>npm run build</code>命令，进行打包</p>
</li>
<li>
<p>查看打包结果</p>
<p>打包结果放置在dist目录中</p>
</li>
</ol>
<p>通过上面的体验，可以发现，webpack给我们带来了至少以下好处：</p>
<ul>
<li>
<p>可以大胆的使用任意模块化标准</p>
<p>无须担心兼容性问题，因为webpack完成打包后，已经没有了任何模块化语句</p>
</li>
<li>
<p>可以将一些非JS代码也视为模块</p>
<p>这样可以对css、图片等资源进行更加细粒度的划分</p>
</li>
<li>
<p>在前端开发中，也可以使用npm</p>
<p>webpack不会运行你的源代码，无论是你自己写的模块，还是通过npm安装的模块，webpack一视同仁，统统视为依赖，最终合并到打包结果中</p>
</li>
<li>
<p>非常适合开发单页应用</p>
<p>单页应用是前端用户体验最好的web应用</p>
<p>所谓单页应用，是指只有一个html页面，页面中没有任何内容，所有的内容均靠js生成</p>
<p>要优雅的实现单页应用，最好依托于前端框架，比如vue、react</p>
</li>
</ul>
<p>webpack给我们开发带来的变化远不止于此，接下来一一体验</p>
<h3 id="页面模板" tabindex="-1"><a class="header-anchor" href="#页面模板" aria-hidden="true">#</a> 页面模板</h3>
<p>对于单页应用而言，只有一个空白的页面，所有内容都靠JS代码创建</p>
<p>webpack会自动生成一个页面，并且在页面中会自动加入对js和css的引用</p>
<p>它生成页面时，参考的是<code>public/index.html</code>，其称之为页面模板</p>
<h3 id="public目录" tabindex="-1"><a class="header-anchor" href="#public目录" aria-hidden="true">#</a> public目录</h3>
<p>webpack会非常暴力的将public目录中的所有文件（除页面模板外），复制到打包结果中</p>
<h3 id="开发服务器" tabindex="-1"><a class="header-anchor" href="#开发服务器" aria-hidden="true">#</a> 开发服务器</h3>
<p>如果每次修改完代码，都要经过<code>打包-&gt;运行</code>，未免太过麻烦</p>
<p>在开发阶段，我们可以运行<code>npm run serve</code>命令获得更好的打包体验</p>
<p>该命令会让<code>webpack</code>启动一个<strong>开发服务器</strong>。</p>
<p>在这个阶段，webpack并不会形成打包结果文件，而是把打包的内容放到内存中，当我们请求服务器时，服务器从内存中给予我们打包结果</p>
<p>与此同时，当源码发生变动时，webpack会自动重新打包，同时刷新页面以访问到最新的打包结果</p>
<p><img src="http://mdrs.yuanjin.tech/img/20210508194443.png" alt="image-20210508194442940"></p>
<h3 id="文件缓存" tabindex="-1"><a class="header-anchor" href="#文件缓存" aria-hidden="true">#</a> 文件缓存</h3>
<p>可以看到，除了页面外，其他的资源在打包完成后，文件名多了一些奇奇怪怪的字符</p>
<p>例如：<code>js/app-9ea93.js</code></p>
<p>其中，<code>9ea93</code>这样的字符称之为<code>hash</code>，它会随着模块内容的变化而变化</p>
<p><strong>源码内容不变，hash不变；源码内容变化，hash变化</strong></p>
<p>之所以这样做，是因为生产环境中，浏览器会对除页面外的静态资源进行缓存</p>
<p>如果不设置hash值，一旦代码更新，浏览器还会使用之前缓存的结果，无法使用最新的代码</p>
<img src="http://mdrs.yuanjin.tech/img/20210508183135.png" alt="image-20210508183135487" style="zoom:50%;" />
<p>有了hash值之后，即可解决此问题</p>
<p><img src="http://mdrs.yuanjin.tech/img/20210508183454.png" alt="image-20210508183454385"></p>
<p>webpack会在打包时自动处理hash值，并不会对我们写代码造成任何影响，但作为一个前端开发者，有必要了解这一点</p>
<h3 id="资源路径" tabindex="-1"><a class="header-anchor" href="#资源路径" aria-hidden="true">#</a> 资源路径</h3>
<p><strong>除代码和样式模块外，其他模块被视为资源模块</strong></p>
<p>值得特别注意的是，<strong>资源模块在源代码中的路径和打包后的路径是不一样的</strong>，这就导致我们在编写代码的时候，根本无法知晓最终的路径</p>
<p>最常见的例子，就是在css中使用背景图片</p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">.container</span><span class="token punctuation">{</span>
  <span class="token comment">/* 背景图使用了源码中的路径 */</span>
  <span class="token property">backgroud</span><span class="token punctuation">:</span> <span class="token url"><span class="token function">url</span><span class="token punctuation">(</span><span class="token string url">'../assets/1.png'</span><span class="token punctuation">)</span></span><span class="token punctuation">;</span> 
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>它能正常工作吗？</p>
<p>它能！</p>
<p>因为webpack非常智能的发现了这一点，对于css中的路径，webpack在打包时，会将其自动转换为打包结果的路径，比如，上面的代码在打包完成后，可能被转换为下面的格式</p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">.container</span><span class="token punctuation">{</span>
  <span class="token comment">/* css中的资源路径会被自动替换，我们无须关心 */</span>
  <span class="token property">background</span><span class="token punctuation">:</span> <span class="token url"><span class="token function">url</span><span class="token punctuation">(</span>/img/1492ea.png<span class="token punctuation">)</span></span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>但如果我们要通过js动态的使用路径，webpack是无法识别的</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 打包前</span>
<span class="token keyword">const</span> url <span class="token operator">=</span> <span class="token string">'./assets/1.png'</span><span class="token punctuation">;</span> <span class="token comment">// 该路径无法被转换</span>
img<span class="token punctuation">.</span>src <span class="token operator">=</span> url<span class="token punctuation">;</span>

<span class="token comment">// 打包后</span>
<span class="token keyword">const</span> url <span class="token operator">=</span> <span class="token string">'./assets/1.png'</span><span class="token punctuation">;</span> <span class="token comment">// ❌</span>
img<span class="token punctuation">.</span>src <span class="token operator">=</span> url<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>正确的做法是，通过模块化的方式导入资源，并获取资源路径</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 打包前</span>
<span class="token keyword">import</span> url <span class="token keyword">from</span> <span class="token string">'./assets/1.png'</span><span class="token punctuation">;</span> <span class="token comment">// 打包后，url得到的将是真实的路径</span>
img<span class="token punctuation">.</span>src <span class="token operator">=</span> url<span class="token punctuation">;</span>

<span class="token comment">// 打包后</span>
<span class="token keyword">const</span> url <span class="token operator">=</span> <span class="token string">'/img/1492ea.png'</span><span class="token punctuation">;</span> <span class="token comment">// ✅</span>
img<span class="token punctuation">.</span>src <span class="token operator">=</span> url<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h3 id="缺省的文件和后缀名" tabindex="-1"><a class="header-anchor" href="#缺省的文件和后缀名" aria-hidden="true">#</a> 缺省的文件和后缀名</h3>
<p>导入模块时，所有js模块均可省略<code>.js</code>，若导入的模块文件名为<code>index.js</code>，可省略文件名</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token string">'./home'</span><span class="token punctuation">;</span> <span class="token comment">// 若存在home.js，可省略js</span>
<span class="token keyword">import</span> <span class="token string">'./movie'</span><span class="token punctuation">;</span> <span class="token comment">// 若movie是一个目录，此次导入的是 ./movie/index.js</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h3 id="路径别名" tabindex="-1"><a class="header-anchor" href="#路径别名" aria-hidden="true">#</a> 路径别名</h3>
<p>随着体量的增长，不可避免的，会形成层级极深的目录</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>root
	<span class="token operator">|</span>- src
		<span class="token operator">|</span>- a
				<span class="token operator">|</span>- a1
						<span class="token operator">|</span>- a2
							 <span class="token operator">|</span>- index.js
		<span class="token operator">|</span>- b
				<span class="token operator">|</span>- b1
						<span class="token operator">|</span>- index.js
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>如果需要在<code>./src/a/a1/a2/index.js</code>中导入<code>./src/b/b1/index.js</code>，则可能产生下面特别恶心的代码</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token string">'../../../b/b1/index.js'</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>webpack提供了别名供我们快速定位到<code>./src</code>目录，通常，该别名为<code>@</code></p>
<p>上面的导入代码可简化为</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token string">'@/b/b1'</span><span class="token punctuation">;</span> <span class="token comment">// @表示src目录，同时省略了index.js</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><h3 id="js兼容性" tabindex="-1"><a class="header-anchor" href="#js兼容性" aria-hidden="true">#</a> js兼容性</h3>
<p>当webpack读取到js代码时，会自动对其进行兼容性处理</p>
<p>具体的处理方案涉及到两个配置文件：</p>
<ul>
<li><code>babel.config.js</code>：通过配置该文件，可以设置对哪些js代码进行降级处理</li>
<li><code>.browserslistrc</code>：通过配置该文件，可以设置在降级时，要兼容哪些浏览器，兼容的范围越光，降级产生的代码就越多，自然，打包后的体积就越大</li>
</ul>
<p>你无须知晓具体的配置方式</p>
<h3 id="打包压缩" tabindex="-1"><a class="header-anchor" href="#打包压缩" aria-hidden="true">#</a> 打包压缩</h3>
<p>webpack在打包时，会对所有js和css代码进行压缩</p>
<p>对于js，除了压缩之外，还会对其中的各种名称进行混淆</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token punctuation">(</span>self<span class="token punctuation">.</span>webpackChunkmovie_list<span class="token operator">=</span>self<span class="token punctuation">.</span>webpackChunkmovie_list<span class="token operator">||</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">[</span><span class="token number">587</span><span class="token punctuation">]</span><span class="token punctuation">,</span><span class="token punctuation">{</span><span class="token number">3587</span><span class="token operator">:</span><span class="token punctuation">(</span><span class="token parameter">r<span class="token punctuation">,</span>t<span class="token punctuation">,</span>n</span><span class="token punctuation">)</span><span class="token operator">=></span><span class="token punctuation">{</span><span class="token string">"use strict"</span><span class="token punctuation">;</span>n<span class="token punctuation">.</span><span class="token function">r</span><span class="token punctuation">(</span>t<span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token function">n</span><span class="token punctuation">(</span><span class="token number">5666</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token function">n</span><span class="token punctuation">(</span><span class="token number">1539</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token function">n</span><span class="token punctuation">(</span><span class="token number">8674</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token function">n</span><span class="token punctuation">(</span><span class="token number">9600</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token function">n</span><span class="token punctuation">(</span><span class="token number">1249</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token function">n</span><span class="token punctuation">(</span><span class="token number">2222</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token keyword">var</span> e<span class="token operator">=</span><span class="token function">n</span><span class="token punctuation">(</span><span class="token number">9755</span><span class="token punctuation">)</span><span class="token punctuation">,</span>a<span class="token operator">=</span>n<span class="token punctuation">.</span><span class="token function">n</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token keyword">var</span> o<span class="token punctuation">;</span><span class="token keyword">function</span> <span class="token function">i</span><span class="token punctuation">(</span><span class="token parameter">r</span><span class="token punctuation">)</span><span class="token punctuation">{</span>o<span class="token punctuation">.</span><span class="token function">html</span><span class="token punctuation">(</span>r<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">r</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token keyword">return</span><span class="token string">'&lt;li>\n  &lt;a href="'</span><span class="token punctuation">.</span><span class="token function">concat</span><span class="token punctuation">(</span>r<span class="token punctuation">.</span>url<span class="token punctuation">,</span><span class="token string">'" target="_blank">\n    &lt;img src="'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">concat</span><span class="token punctuation">(</span>r<span class="token punctuation">.</span>cover<span class="token punctuation">,</span><span class="token string">'" title="'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">concat</span><span class="token punctuation">(</span>r<span class="token punctuation">.</span>title<span class="token punctuation">,</span><span class="token string">'">\n  &lt;/a>\n  &lt;a href="'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">concat</span><span class="token punctuation">(</span>r<span class="token punctuation">.</span>url<span class="token punctuation">,</span><span class="token string">'" target="_blank" class="'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">concat</span><span class="token punctuation">(</span><span class="token string">"qmUYQv1xlJhGMQKz-kfAp"</span><span class="token punctuation">,</span><span class="token string">'">'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">concat</span><span class="token punctuation">(</span>r<span class="token punctuation">.</span>title<span class="token punctuation">,</span><span class="token string">'&lt;/a>\n  &lt;p class="'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">concat</span><span class="token punctuation">(</span><span class="token string">"_3yV5wC-URYTUP0sPvaE0ZR"</span><span class="token punctuation">,</span><span class="token string">'">'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">concat</span><span class="token punctuation">(</span>r<span class="token punctuation">.</span>rate<span class="token punctuation">,</span><span class="token string">"&lt;/p>\n  &lt;/li>"</span><span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token string">""</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">}</span>o<span class="token operator">=</span><span class="token function">a</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token string">"&lt;ul>"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">addClass</span><span class="token punctuation">(</span><span class="token string">"_1fsrc5VinfYHBXCF1s58qS"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">appendTo</span><span class="token punctuation">(</span><span class="token string">"#app"</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token keyword">var</span> c<span class="token operator">=</span><span class="token function">n</span><span class="token punctuation">(</span><span class="token number">8138</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token keyword">const</span> u<span class="token operator">=</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>混淆的作用一方面是为了进一步压缩包体积，另一方面是为了让我们的代码更难被其他人理解利用</p>
<h3 id="源码地图-source-map" tabindex="-1"><a class="header-anchor" href="#源码地图-source-map" aria-hidden="true">#</a> 源码地图 source map</h3>
<p>我们运行的是webpack打包后的结果，而打包后的结果是很难阅读的</p>
<p>但这样一来会带来新的问题，如果代码报错，我们就难以知道到底是那一行代码写的有问题</p>
<p>此时源码地图就发挥了作用</p>
<p>可以发现，js代码打包后都会跟上一个同名的、后缀为<code>.map</code>的文件，该文件就保存了原始代码的内容</p>
<p>请放心，这个内容人类是看不懂的，但浏览器可以看懂</p>
<p>当代码报错时，浏览器会定位到源码地图中的对应代码，而不是把真实报错的代码展示给我们</p>
<p>你无须关心这一点，但可以自然的从其中获得巨大的便利</p>
<h3 id="css工程化" tabindex="-1"><a class="header-anchor" href="#css工程化" aria-hidden="true">#</a> css工程化</h3>
<p>webpack能够识别<strong>所有</strong>的样式代码，包括<code>css</code>、<code>less</code>、<code>sass</code>、<code>stylus</code></p>
<p>在打包时，会将它们转换成纯正的<code>css</code></p>
<p>除此之外，它还具备以下的神奇能力</p>
<h3 id="自动厂商前缀" tabindex="-1"><a class="header-anchor" href="#自动厂商前缀" aria-hidden="true">#</a> 自动厂商前缀</h3>
<p>css有很多兼容性问题，解决这些兼容性问题的最常见办法，就是加上厂商前缀。</p>
<p>比如：</p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token comment">/* 兼容性不好的代码 */</span>
<span class="token selector">.container</span><span class="token punctuation">{</span>
	<span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>
  <span class="token property">transition</span><span class="token punctuation">:</span> 1s<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">/* 兼容性好的代码 */</span>
<span class="token selector">.container</span> <span class="token punctuation">{</span>
  <span class="token property">display</span><span class="token punctuation">:</span> -webkit-box<span class="token punctuation">;</span>
  <span class="token property">display</span><span class="token punctuation">:</span> -webkit-flex<span class="token punctuation">;</span>
  <span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span>
  <span class="token property">-webkit-transition</span><span class="token punctuation">:</span> 1s<span class="token punctuation">;</span>
  <span class="token property">transition</span><span class="token punctuation">:</span> 1s<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><p>webpack会根据<code>.browserlistrc</code>中指定的浏览器范围，<strong>按需、自动</strong>加上厂商前缀</p>
<p>我们开发无须关心</p>
<h3 id="css-module" tabindex="-1"><a class="header-anchor" href="#css-module" aria-hidden="true">#</a> css module</h3>
<p>css文件多了后，你怎么保证它们里面没有冲突的类样式？</p>
<p>靠层级选择器？就不担心效率？</p>
<p>靠命名规范？就不担心脑袋爆炸？</p>
<p>要靠就靠css module</p>
<p>当样式文件以<code>xxx.mdoule.xxx</code>的方式命名时，webpack会将该文件当成一个开启了<code>css module</code>的文件</p>
<p>比如：<code>index.module.less</code>、<code>movie.module.css</code>，都是开启了<code>css module</code>的文件</p>
<p><strong>文件中的所有类名都会被hash化</strong></p>
<div class="language-less ext-less line-numbers-mode"><pre v-pre class="language-less"><code><span class="token comment">// 源码</span>
<span class="token selector">.container</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token selector">.list</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token selector">.item</span><span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token comment">// 打包结果，绝无可能重名</span>
<span class="token selector">._2GFVidHvoHtfgtrdifua24</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token selector">._1fsrc5VinfYHBXCF1s58qS</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
<span class="token selector">.urPUKUukdS_UTSuWRI5-5</span><span class="token punctuation">{</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>现在就一个问题，我们在使用类名时，如何知道它打包结果的类名呢？</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token string">'./index.module.less'</span><span class="token punctuation">;</span>
dom<span class="token punctuation">.</span>classList<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">'container'</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// ❌ 最终的类名可不是这个</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>正确的方式如下：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// styles 是一个对象，里面映射了源码类名和打包类名的关系</span>
<span class="token keyword">import</span> styles <span class="token keyword">from</span> <span class="token string">'./index.module.less'</span><span class="token punctuation">;</span>
dom<span class="token punctuation">.</span>classList<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>styles<span class="token punctuation">.</span>container<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// ✅ 属性container中记录的就是container转换后的类名</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h3 id="真正的webpack没有那么神奇" tabindex="-1"><a class="header-anchor" href="#真正的webpack没有那么神奇" aria-hidden="true">#</a> 真正的webpack没有那么神奇</h3>
<p>实际上，webpack没有做这么多事，我们不能把功劳（怨念）全归结于它</p>
<p>它只是站在巨人（其他流氓）肩膀上而已</p>
<p>下图可以看个热闹</p>
<p><img src="http://mdrs.yuanjin.tech/img/20210508203658.png" alt="image-20210508203658298"></p>
<p>webpack通过插件（plugin）和加载器（loader）将这些技术整合在一起</p>
<p><code>上图的技术 + 乱七八糟一大堆其他技术 + 老师的配置 = 呈现给你的工程</code></p>
<p>目前，你无须理解这一些，保持敬畏即可</p>
<p>最后，说明一下工程中看不懂的文件：</p>
<ul>
<li><code>.browserslistrc</code>，表达适配的浏览器范围，会被工程化中的其他技术所使用</li>
<li><code>babel.config.js</code>，<code>babel</code>的配置文件，做js降级处理</li>
<li><code>postcss.config.js</code>，<code>postcss</code>的配置文件，做css代码转换</li>
<li><code>webpack.config.js</code>，<code>webpack</code>的配置文件，整合其他工程化技术，以及配置打包细节、开发服务器、路径别名等等</li>
</ul>
<h3 id="对我们开发的影响" tabindex="-1"><a class="header-anchor" href="#对我们开发的影响" aria-hidden="true">#</a> 对我们开发的影响</h3>
<ol>
<li>
<p>学会访问开发服务器查看效果</p>
</li>
<li>
<p>学会动态获取资源文件路径</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> url <span class="token keyword">from</span> <span class="token string">'./assets/1.png'</span><span class="token punctuation">;</span> 
img<span class="token punctuation">.</span>src <span class="token operator">=</span> url<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div></li>
<li>
<p>学会省略文件和后缀名</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token string">'./home'</span><span class="token punctuation">;</span> <span class="token comment">// 若存在home.js，可省略js</span>
<span class="token keyword">import</span> <span class="token string">'./movie'</span><span class="token punctuation">;</span> <span class="token comment">// 若movie是一个目录，此次导入的是 ./movie/index.js</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div></li>
<li>
<p>学会使用别名简化导入代码</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token string">'@/b/b1'</span><span class="token punctuation">;</span> <span class="token comment">// 实际导入： src/b/b1/index.js  (若b1是目录)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div></li>
<li>
<p>学会使用css module</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// styles 是一个对象，里面映射了源码类名和打包类名的关系</span>
<span class="token keyword">import</span> styles <span class="token keyword">from</span> <span class="token string">'./index.module.less'</span><span class="token punctuation">;</span>
dom<span class="token punctuation">.</span>classList<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>styles<span class="token punctuation">.</span>container<span class="token punctuation">)</span><span class="token punctuation">;</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div></li>
</ol>
</template>
