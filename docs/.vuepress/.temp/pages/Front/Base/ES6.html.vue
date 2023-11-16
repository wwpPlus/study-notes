<template><h1 id="es6" tabindex="-1"><a class="header-anchor" href="#es6" aria-hidden="true">#</a> ES6</h1>
<p>ES6， 全称 ECMAScript 6.0 ，是 JavaScript 的下一个版本标准，2015.06 发版。</p>
<h2 id="es6基础" tabindex="-1"><a class="header-anchor" href="#es6基础" aria-hidden="true">#</a> ES6基础</h2>
<h3 id="零碎的改动" tabindex="-1"><a class="header-anchor" href="#零碎的改动" aria-hidden="true">#</a> 零碎的改动</h3>
<h4 id="严格模式" tabindex="-1"><a class="header-anchor" href="#严格模式" aria-hidden="true">#</a> 严格模式</h4>
<p>此为ES5新增语法</p>
<p>参考：https://www.runoob.com/js/js-strict.html</p>
<p>参考：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Strict_mode</p>
<h4 id="let-和-const" tabindex="-1"><a class="header-anchor" href="#let-和-const" aria-hidden="true">#</a> let 和 const</h4>
<p>ES6建议不再使用<code>var</code>定义变量，而使用<code>let</code>定义变量，<code>const</code>定义常量</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> a <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> <span class="token comment">// 使用 let 定义变量</span>
a <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span> <span class="token comment">// 变量的值是可修改的</span>

<span class="token keyword">const</span> b <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> <span class="token comment">// 使用 const 定义常量</span>
b <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span> <span class="token comment">// ❌ 报错，常量的值不可修改</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p><strong>对于开发的影响：均使用const，实在需要修改变量，再改为let</strong></p>
<p>无论是let还是const，它们均解决了长久以来变量定义的问题，使用它们定义变量，具有以下特点：</p>
<ul>
<li>
<p>全局定义的变量不再作为属性添加到全局对象中</p>
</li>
<li>
<p>在变量定义之前使用它会报错</p>
</li>
<li>
<p>不可重复定义同名变量</p>
</li>
<li>
<p>使用<code>const</code>定义变量时，必须初始化</p>
</li>
<li>
<p>变量具有块级作用域，在代码块之外不可使用</p>
<p>注意，在for循环中使用let定义变量，变量所在的作用域是循环体，因此在循环外不能使用。另外，for循环会对该变量做特殊处理，让每次循环使用的都是一个独立的循环变量，这可以解决JS由来已久的问题。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 过去的问题</span>
<span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">var</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">3</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token comment">// 输出：3 3 3</span>

<span class="token comment">// 过去的解决办法：IIFE</span>
<span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">var</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">3</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">i</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token comment">// 输出：0 1 2</span>

<span class="token comment">// 现在的做法</span>
<span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> <span class="token number">3</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token comment">// 输出：0 1 2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br></div></div></li>
</ul>
<h4 id="幂运算" tabindex="-1"><a class="header-anchor" href="#幂运算" aria-hidden="true">#</a> 幂运算</h4>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token number">2</span> <span class="token operator">**</span> <span class="token number">3</span>  <span class="token comment">// 8</span>
<span class="token number">2</span> <span class="token operator">**</span> <span class="token number">4</span>  <span class="token comment">// 16</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h4 id="字符串新增api" tabindex="-1"><a class="header-anchor" href="#字符串新增api" aria-hidden="true">#</a> 字符串新增API</h4>
<table>
<thead>
<tr>
<th>API</th>
<th>含义</th>
</tr>
</thead>
<tbody>
<tr>
<td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/includes" target="_blank" rel="noopener noreferrer">String.prototype.includes(s)<ExternalLinkIcon/></a></td>
<td>字符串中是否包含某个子串</td>
</tr>
<tr>
<td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/trim" target="_blank" rel="noopener noreferrer">String.prototype.trim()<ExternalLinkIcon/></a></td>
<td>去掉字符串首尾空白字符</td>
</tr>
<tr>
<td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/trimstart" target="_blank" rel="noopener noreferrer">String.prototype.trimStart()<ExternalLinkIcon/></a></td>
<td>去掉字符串开始的空白字符</td>
</tr>
<tr>
<td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/trimend" target="_blank" rel="noopener noreferrer">String.prototype.trimEnd()<ExternalLinkIcon/></a></td>
<td>去掉字符串末尾的空白字符</td>
</tr>
<tr>
<td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/replaceall" target="_blank" rel="noopener noreferrer">String.prototype.replaceAll(s, t)<ExternalLinkIcon/></a></td>
<td>将字符串中<strong>所有</strong>的s替换为t</td>
</tr>
<tr>
<td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/startswith" target="_blank" rel="noopener noreferrer">String.prototype.startsWith(s)<ExternalLinkIcon/></a></td>
<td>判断字符串是否以s开头</td>
</tr>
<tr>
<td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/endswith" target="_blank" rel="noopener noreferrer">String.prototype.endsWith(s)<ExternalLinkIcon/></a></td>
<td>判断字符串是否以s结尾</td>
</tr>
<tr>
<td></td>
<td></td>
</tr>
</tbody>
</table>
<h4 id="模板字符串" tabindex="-1"><a class="header-anchor" href="#模板字符串" aria-hidden="true">#</a> 模板字符串</h4>
<p>ES6提供了一种新的字符串字面量的书写方式，即模板字符串，写法为</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">字符串内容</span><span class="token template-punctuation string">`</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>模板字符串可以轻松的实现换行和拼接</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> user <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'monica'</span><span class="token punctuation">,</span> <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token number">17</span> <span class="token punctuation">}</span>
<span class="token keyword">const</span> s1 <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">姓名：</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>user<span class="token punctuation">.</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">，年龄：</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>user<span class="token punctuation">.</span>age<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">
my name is </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>user<span class="token punctuation">.</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">;</span>
<span class="token comment">// 等同于</span>
<span class="token keyword">const</span> s2 <span class="token operator">=</span> <span class="token string">'姓名：'</span> <span class="token operator">+</span> user<span class="token punctuation">.</span>name <span class="token operator">+</span> <span class="token string">'，年龄：'</span> <span class="token operator">+</span> user<span class="token punctuation">.</span>age <span class="token operator">+</span> <span class="token string">'\nmy name is '</span> <span class="token operator">+</span> user<span class="token punctuation">.</span>name

<span class="token comment">/* 
 * s1和s2均为：
 * 姓名：monica，年龄：17
 * my name is monica
 */</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>在需要换行或拼接时，模板字符串远胜于普通字符串</p>
<p>通常，我们可以使用模板字符串拼接html</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> user <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'monica'</span><span class="token punctuation">,</span> <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token number">17</span> <span class="token punctuation">}</span>
<span class="token keyword">const</span> html <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">
&lt;div>
	&lt;p>&lt;span class="k">姓名&lt;/span>&lt;span class="v"></span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>user<span class="token punctuation">.</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&lt;/span>&lt;/p>
	&lt;p>&lt;span class="k">年龄&lt;/span>&lt;span class="v"></span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>user<span class="token punctuation">.</span>age<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">&lt;/span>&lt;/p>
&lt;/div>
</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">;</span>
<span class="token comment">/* 
 * &lt;div>
 *  &lt;p>&lt;span class="k">姓名&lt;/span>&lt;span class="v">monica&lt;/span>&lt;/p>
 *  &lt;p>&lt;span class="k">年龄&lt;/span>&lt;span class="v">17&lt;/span>&lt;/p>
 * &lt;/div>
 */</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><h3 id="数组" tabindex="-1"><a class="header-anchor" href="#数组" aria-hidden="true">#</a> 数组</h3>
<h4 id="for-of-循环" tabindex="-1"><a class="header-anchor" href="#for-of-循环" aria-hidden="true">#</a> for-of 循环</h4>
<p>ES6提供了一种爽翻天的方式遍历各种数组和伪数组</p>
<p>示例1：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> arr <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">'a'</span><span class="token punctuation">,</span> <span class="token string">'b'</span><span class="token punctuation">,</span> <span class="token string">'c'</span><span class="token punctuation">]</span>
<span class="token comment">// 过去的方式——垃圾</span>
<span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> arr<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token keyword">const</span> item <span class="token operator">=</span> arr<span class="token punctuation">[</span>i<span class="token punctuation">]</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token comment">// for of 的方式，结果一样</span>
<span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">const</span> item <span class="token keyword">of</span> arr<span class="token punctuation">)</span><span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p>示例2:</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> elements <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">querySelectorAll</span><span class="token punctuation">(</span><span class="token string">'.item'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// for of 的方式</span>
<span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">const</span> elem <span class="token keyword">of</span> elements<span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token comment">// elem 为获取到的每一个元素</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h4 id="新增api" tabindex="-1"><a class="header-anchor" href="#新增api" aria-hidden="true">#</a> 新增API</h4>
<table>
<thead>
<tr>
<th>API</th>
<th>作用</th>
<th>图示</th>
</tr>
</thead>
<tbody>
<tr>
<td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray" target="_blank" rel="noopener noreferrer">Array.isArray(target)<ExternalLinkIcon/></a></td>
<td>判断target是否为一个数组</td>
<td></td>
</tr>
<tr>
<td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/from" target="_blank" rel="noopener noreferrer">Array.from(source)<ExternalLinkIcon/></a></td>
<td>将某个伪数组source转换为一个真数组返回</td>
<td></td>
</tr>
<tr>
<td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/fill" target="_blank" rel="noopener noreferrer">Array.prototype.fill(n)<ExternalLinkIcon/></a></td>
<td>将数组的某些项设置为n</td>
<td><img src="http://mdrs.yuanjin.tech/img/20210602165516.png" alt="image-20210602165515908" style="zoom:50%;" /></td>
</tr>
<tr>
<td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach" target="_blank" rel="noopener noreferrer">Array.prototype.forEach(fn)<ExternalLinkIcon/></a></td>
<td>遍历数组，传入一个函数，每次遍历会运行该函数</td>
<td><img src="http://mdrs.yuanjin.tech/img/20210602165832.png" alt="image-20210602165832725" style="zoom:50%;" /></td>
</tr>
<tr>
<td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/map" target="_blank" rel="noopener noreferrer">Array.prototype.map(fn)<ExternalLinkIcon/></a></td>
<td>数组映射，传入一个函数，映射数组中的每一项</td>
<td><img src="http://mdrs.yuanjin.tech/img/20210602170025.png" alt="image-20210602170025141" style="zoom:50%;" /></td>
</tr>
<tr>
<td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/filter" target="_blank" rel="noopener noreferrer">Array.prototype.filter(fn)<ExternalLinkIcon/></a></td>
<td>数组筛选，传入一个函数，仅保留满足条件的项</td>
<td><img src="http://mdrs.yuanjin.tech/img/20210602170149.png" alt="image-20210602170149489" style="zoom:50%;" /></td>
</tr>
<tr>
<td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce" target="_blank" rel="noopener noreferrer">Array.prototype.reduce(fn)<ExternalLinkIcon/></a></td>
<td>数组聚合，传入一个函数，对数组每一项按照该函数的返回聚合</td>
<td><img src="http://mdrs.yuanjin.tech/img/20210602170451.png" alt="image-20210602170451299" style="zoom:50%;" /></td>
</tr>
<tr>
<td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/some" target="_blank" rel="noopener noreferrer">Array.prototype.some(fn)<ExternalLinkIcon/></a></td>
<td>传入一个函数，判断数组中是否有至少一个通过该函数测试的项</td>
<td><img src="http://mdrs.yuanjin.tech/img/20210602171403.png" alt="image-20210602171403455" style="zoom:50%;" /></td>
</tr>
<tr>
<td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/every" target="_blank" rel="noopener noreferrer">Array.prototype.every(fn)<ExternalLinkIcon/></a></td>
<td>传入一个函数，判断数组中是否所有项都能通过该函数的测试</td>
<td><img src="http://mdrs.yuanjin.tech/img/20210602171441.png" alt="image-20210602171441468" style="zoom:50%;" /></td>
</tr>
<tr>
<td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/find" target="_blank" rel="noopener noreferrer">Array.prototype.find(fn)<ExternalLinkIcon/></a></td>
<td>传入一个函数，找到数组中第一个能通过该函数测试的项</td>
<td><img src="http://mdrs.yuanjin.tech/img/20210602171510.png" alt="image-20210602171510075" style="zoom:50%;" /></td>
</tr>
<tr>
<td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/includes" target="_blank" rel="noopener noreferrer">Array.prototype.includes(item)<ExternalLinkIcon/></a></td>
<td>判断数组中是否存在item，判定规则使用的是<code>Object.is</code></td>
<td><img src="http://mdrs.yuanjin.tech/img/20210602170615.png" alt="image-20210602170615564" style="zoom:50%;" /></td>
</tr>
<tr>
<td></td>
<td></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="对象" tabindex="-1"><a class="header-anchor" href="#对象" aria-hidden="true">#</a> 对象</h3>
<h4 id="对象成员速写" tabindex="-1"><a class="header-anchor" href="#对象成员速写" aria-hidden="true">#</a> 对象成员速写</h4>
<p>在某些场景下，ES6提供了一种更加简洁的方式书写对象成员</p>
<p>示例1：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> name <span class="token operator">=</span> <span class="token string">'monica'</span><span class="token punctuation">,</span> age <span class="token operator">=</span> <span class="token number">17</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> <span class="token function-variable function">sayHello</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">my name is </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token keyword">this</span><span class="token punctuation">.</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// 过去的方式</span>
<span class="token keyword">const</span> user <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> name<span class="token punctuation">,</span>
  <span class="token literal-property property">age</span><span class="token operator">:</span> age<span class="token punctuation">,</span>
  <span class="token literal-property property">sayHello</span><span class="token operator">:</span> sayHello
<span class="token punctuation">}</span>

<span class="token comment">// 速写</span>
<span class="token keyword">const</span> user <span class="token operator">=</span> <span class="token punctuation">{</span>
  name<span class="token punctuation">,</span>
  age<span class="token punctuation">,</span>
  sayHello
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><p>示例2：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 过去的方式</span>
<span class="token keyword">const</span> MyMath <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token function-variable function">sum</span><span class="token operator">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span> b</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token comment">//...</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function-variable function">random</span><span class="token operator">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">min<span class="token punctuation">,</span> max</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token comment">//...</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 速写</span>
<span class="token keyword">const</span> MyMath <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token function">sum</span><span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span> b</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token comment">// ...</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function">random</span><span class="token punctuation">(</span><span class="token parameter">min<span class="token punctuation">,</span> max</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token comment">// ...</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><h4 id="解构" tabindex="-1"><a class="header-anchor" href="#解构" aria-hidden="true">#</a> 解构</h4>
<p>ES6提供了一种特殊的语法，通过该语法，可以轻松的从数组或对象中取出想要的部分</p>
<p>示例1：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> user <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'monica'</span><span class="token punctuation">,</span>
  <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token number">17</span><span class="token punctuation">,</span>
  <span class="token literal-property property">addr</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">province</span><span class="token operator">:</span> <span class="token string">'黑龙江'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">city</span><span class="token operator">:</span> <span class="token string">'哈尔滨'</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 取出 user 中的 name 和 age</span>
<span class="token keyword">const</span> <span class="token punctuation">{</span> name<span class="token punctuation">,</span> age <span class="token punctuation">}</span> <span class="token operator">=</span> user<span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>name<span class="token punctuation">,</span> age<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//  monica 17</span>

<span class="token comment">// 取出 user 中的 city</span>
<span class="token keyword">const</span> <span class="token punctuation">{</span> <span class="token literal-property property">addr</span><span class="token operator">:</span> <span class="token punctuation">{</span> city <span class="token punctuation">}</span> <span class="token punctuation">}</span> <span class="token operator">=</span> user
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>city<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//  哈尔滨</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><p>示例2：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> arr <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">]</span>
<span class="token comment">// 取出数组每一项的值，分别放到变量a、b、c、d中</span>
<span class="token keyword">const</span> <span class="token punctuation">[</span>a<span class="token punctuation">,</span> b<span class="token punctuation">,</span> c<span class="token punctuation">,</span> d<span class="token punctuation">]</span> <span class="token operator">=</span> arr<span class="token punctuation">;</span>
<span class="token comment">// 仅取出数组下标1、2的值</span>
<span class="token keyword">const</span> <span class="token punctuation">[</span><span class="token punctuation">,</span> a<span class="token punctuation">,</span> b<span class="token punctuation">]</span> <span class="token operator">=</span> arr<span class="token punctuation">;</span> 
<span class="token comment">// 仅取出数组下标1、3的值</span>
<span class="token keyword">const</span> <span class="token punctuation">[</span><span class="token punctuation">,</span> a<span class="token punctuation">,</span> <span class="token punctuation">,</span> b<span class="token punctuation">]</span> <span class="token operator">=</span> arr<span class="token punctuation">;</span>
<span class="token comment">// 取出数组前两位的值，放到变量a和b中，剩下的值放到一个新数组arr2中</span>
<span class="token keyword">const</span> <span class="token punctuation">[</span>a<span class="token punctuation">,</span> b<span class="token punctuation">,</span> <span class="token operator">...</span>arr2<span class="token punctuation">]</span> <span class="token operator">=</span> arr<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><p>示例3：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> a <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">,</span> b <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
<span class="token comment">// 交换两个变量</span>
<span class="token punctuation">[</span>b<span class="token punctuation">,</span> a<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span>a<span class="token punctuation">,</span> b<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>示例4：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 在参数位置对传入的对象进行解构</span>
<span class="token keyword">function</span> <span class="token function">method</span><span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span>a<span class="token punctuation">,</span> b<span class="token punctuation">}</span></span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">const</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">a</span><span class="token operator">:</span><span class="token number">1</span><span class="token punctuation">,</span>
  <span class="token literal-property property">b</span><span class="token operator">:</span><span class="token number">2</span><span class="token punctuation">,</span>
  <span class="token literal-property property">c</span><span class="token operator">:</span><span class="token number">3</span>
<span class="token punctuation">}</span>
<span class="token function">method</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 1 2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>示例5：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 箭头函数也可以在参数位置进行解构</span>
<span class="token keyword">const</span> <span class="token function-variable function">method</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span>a<span class="token punctuation">,</span> b<span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token keyword">const</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">a</span><span class="token operator">:</span><span class="token number">1</span><span class="token punctuation">,</span>
  <span class="token literal-property property">b</span><span class="token operator">:</span><span class="token number">2</span><span class="token punctuation">,</span>
  <span class="token literal-property property">c</span><span class="token operator">:</span><span class="token number">3</span>
<span class="token punctuation">}</span>
<span class="token function">method</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 1 2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><p>示例6：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> users <span class="token operator">=</span> <span class="token punctuation">[</span>
  <span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span><span class="token string">'monica'</span><span class="token punctuation">,</span> <span class="token literal-property property">age</span><span class="token operator">:</span><span class="token number">17</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span><span class="token string">'邓哥'</span><span class="token punctuation">,</span> <span class="token literal-property property">age</span><span class="token operator">:</span><span class="token number">70</span><span class="token punctuation">}</span>
<span class="token punctuation">]</span>
<span class="token comment">// 在遍历时进行解构</span>
<span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">const</span> <span class="token punctuation">{</span>name<span class="token punctuation">,</span> age<span class="token punctuation">}</span> <span class="token keyword">of</span> users<span class="token punctuation">)</span><span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>name<span class="token punctuation">,</span> age<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><h4 id="展开运算符" tabindex="-1"><a class="header-anchor" href="#展开运算符" aria-hidden="true">#</a> 展开运算符</h4>
<p>示例1：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> arr <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token comment">// 对数组的展开</span>
Math<span class="token punctuation">.</span><span class="token function">max</span><span class="token punctuation">(</span><span class="token operator">...</span>arr<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 相当于：Math.max(3, 6, 1, 7, 2)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>示例2：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> o1 <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span> 
  <span class="token literal-property property">b</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
<span class="token keyword">const</span> o2 <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token number">3</span><span class="token punctuation">,</span> 
  <span class="token literal-property property">c</span><span class="token operator">:</span> <span class="token number">4</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
<span class="token comment">// 对对象的展开</span>
<span class="token keyword">const</span> o3 <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token operator">...</span>o1<span class="token punctuation">,</span>
  <span class="token operator">...</span>o2
<span class="token punctuation">}</span>
<span class="token comment">/*
	o3：{
		a: 3,
		b: 2,
		c: 4
	}
*/</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br></div></div><p>示例3：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> arr <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">,</span><span class="token number">4</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> arr2 <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token operator">...</span>arr<span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token comment">// [1,2,3,4,5]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>示例4：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> user <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'monica'</span><span class="token punctuation">,</span>
  <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token number">17</span>
<span class="token punctuation">}</span>
<span class="token keyword">const</span> user2 <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token operator">...</span>user<span class="token punctuation">,</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'邓哥'</span>
<span class="token punctuation">}</span>
<span class="token comment">// user2: { name:'邓哥', age: 17 }</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h4 id="属性描述符" tabindex="-1"><a class="header-anchor" href="#属性描述符" aria-hidden="true">#</a> 属性描述符</h4>
<p>对于对象中的每个成员，JS使用属性描述符来描述它们</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> user <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'monica'</span><span class="token punctuation">,</span>
  <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token number">17</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>上面的对象，在JS内部被描述为</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token punctuation">{</span>
  <span class="token comment">// 属性 name 的描述符</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token string">'monica'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">configurable</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token comment">// 该属性的描述符是否可以被重新定义</span>
    <span class="token literal-property property">enumerable</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token comment">// 该属性是否允许被遍历，会影响for-in循环</span>
    <span class="token literal-property property">writable</span><span class="token operator">:</span> <span class="token boolean">true</span> <span class="token comment">// 该属性是否允许被修改</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token comment">// 属性 age 的描述符</span>
  <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token string">'monica'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">configurable</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token comment">// 该属性的描述符是否可以被重新定义</span>
    <span class="token literal-property property">enumerable</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token comment">// 该属性是否允许被遍历，会影响for-in循环</span>
    <span class="token literal-property property">writable</span><span class="token operator">:</span> <span class="token boolean">true</span> <span class="token comment">// 该属性是否允许被修改</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><p>ES5提供了一系列的API，针对属性描述符进行操作</p>
<ol>
<li>
<p><code>Object.getOwnPropertyDescriptor(obj, propertyName)</code></p>
<p>该方法用于获取一个属性的描述符</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> user <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'monica'</span><span class="token punctuation">,</span>
  <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token number">17</span>
<span class="token punctuation">}</span>

Object<span class="token punctuation">.</span><span class="token function">getOwnPropertyDescriptor</span><span class="token punctuation">(</span>user<span class="token punctuation">,</span> <span class="token string">'name'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">/*
{
    value: 'monica',
    configurable: true, // 该属性的描述符是否可以被重新定义
    enumerable: true, // 该属性是否允许被遍历，会影响for-in循环
    writable: true // 该属性是否允许被修改
}
*/</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div></li>
<li>
<p><code>Object.defineProperty(obj, propertyName, descriptor)</code></p>
<p>该方法用于定义某个属性的描述符</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> user <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'monica'</span><span class="token punctuation">,</span>
  <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token number">17</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

Object<span class="token punctuation">.</span><span class="token function">defineProperty</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span> <span class="token string">'name'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">value</span><span class="token operator">:</span> <span class="token string">'邓哥'</span><span class="token punctuation">,</span> <span class="token comment">// 将其值进行修改</span>
  <span class="token literal-property property">enumerable</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token comment">// 让该属性不能被遍历</span>
  <span class="token literal-property property">writable</span><span class="token operator">:</span> <span class="token boolean">false</span> <span class="token comment">// 让该属性无法被重新赋值</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div></li>
</ol>
<h5 id="getter-和-setter" tabindex="-1"><a class="header-anchor" href="#getter-和-setter" aria-hidden="true">#</a> getter 和 setter</h5>
<p>属性描述符中有两个特殊的配置，分别为<code>get</code>和<code>set</code>，通过它们，可以把属性的取值和赋值变为方法调用</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
Object<span class="token punctuation">.</span><span class="token function">defineProperty</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span> <span class="token string">'a'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span>
  <span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span> <span class="token comment">// 读取属性a时，得到的是该方法的返回值</span>
    <span class="token keyword">return</span> <span class="token number">1</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token function">set</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span><span class="token punctuation">{</span> <span class="token comment">// 设置属性a时，会把值传入val，调用该方法</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>val<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>obj<span class="token punctuation">.</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 输出：1</span>
obj<span class="token punctuation">.</span>a <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">;</span> <span class="token comment">// 输出：3</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>obj<span class="token punctuation">.</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 输出：1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><h4 id="键值对" tabindex="-1"><a class="header-anchor" href="#键值对" aria-hidden="true">#</a> 键值对</h4>
<p><code>Object.keys(obj)</code>：获取对象的属性名组成的数组</p>
<p><code>Object.values(obj)</code>：获取对象的值组成的数组</p>
<p><code>Object.entries(obj)</code>：获取对象属性名和属性值组成的数组</p>
<p><code>Object.fromEntries(entries)</code>：将属性名和属性值的数组转换为对象</p>
<p>示例：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> user <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'monica'</span><span class="token punctuation">,</span>
  <span class="token literal-property property">age</span><span class="token operator">:</span> <span class="token number">17</span>
<span class="token punctuation">}</span>
Object<span class="token punctuation">.</span><span class="token function">keys</span><span class="token punctuation">(</span>user<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// ["name", "age"]</span>
Object<span class="token punctuation">.</span><span class="token function">values</span><span class="token punctuation">(</span>user<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// ["monica", 17]</span>
Object<span class="token punctuation">.</span><span class="token function">entries</span><span class="token punctuation">(</span>user<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// [ ["name", "monica"], ["age", 17] ]</span>
Object<span class="token punctuation">.</span><span class="token function">fromEntries</span><span class="token punctuation">(</span><span class="token punctuation">[</span> <span class="token punctuation">[</span><span class="token string">"name"</span><span class="token punctuation">,</span> <span class="token string">"monica"</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token string">"age"</span><span class="token punctuation">,</span> <span class="token number">17</span><span class="token punctuation">]</span> <span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// {name:'monica', age:17}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><h4 id="冻结" tabindex="-1"><a class="header-anchor" href="#冻结" aria-hidden="true">#</a> 冻结</h4>
<p>使用<code>Object.freeze(obj)</code>可以冻结一个对象，该对象的所有属性均不可更改</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">a</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
  <span class="token literal-property property">b</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">c</span><span class="token operator">:</span> <span class="token number">3</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

Object<span class="token punctuation">.</span><span class="token function">freeze</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//  冻结对象obj</span>

obj<span class="token punctuation">.</span>a <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span> <span class="token comment">// 不报错，代码无效</span>
obj<span class="token punctuation">.</span>k <span class="token operator">=</span> <span class="token number">4</span><span class="token punctuation">;</span> <span class="token comment">// 不报错，代码无效</span>
<span class="token keyword">delete</span> obj<span class="token punctuation">.</span>a<span class="token punctuation">;</span> <span class="token comment">// 不报错，代码无效</span>
obj<span class="token punctuation">.</span>b <span class="token operator">=</span> <span class="token number">5</span><span class="token punctuation">;</span> <span class="token comment">// 不报错，代码无效</span>

obj<span class="token punctuation">.</span>b<span class="token punctuation">.</span>c <span class="token operator">=</span> <span class="token number">5</span><span class="token punctuation">;</span> <span class="token comment">// b对象没有被冻结，有效</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// {a:1, b:{ c: 5 } }</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><p>可以使用<code>Object.isFrozen</code>来判断一个对象是否被冻结</p>
<h4 id="相同性判定" tabindex="-1"><a class="header-anchor" href="#相同性判定" aria-hidden="true">#</a> 相同性判定</h4>
<p><code>Object.is</code>方法，可以判断两个值是否相同，它和<code>===</code>的功能基本一致，区别在于：</p>
<ul>
<li>NaN和NaN相等</li>
<li>+0和-0不相等</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Object<span class="token punctuation">.</span><span class="token function">is</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// false</span>
Object<span class="token punctuation">.</span><span class="token function">is</span><span class="token punctuation">(</span><span class="token string">"1"</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// false</span>
Object<span class="token punctuation">.</span><span class="token function">is</span><span class="token punctuation">(</span><span class="token number">NaN</span><span class="token punctuation">,</span> <span class="token number">NaN</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>
Object<span class="token punctuation">.</span><span class="token function">is</span><span class="token punctuation">(</span><span class="token operator">+</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token operator">-</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// false</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h4 id="set" tabindex="-1"><a class="header-anchor" href="#set" aria-hidden="true">#</a> Set</h4>
<p><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Set" target="_blank" rel="noopener noreferrer">Set MDN<ExternalLinkIcon/></a></p>
<p>ES6新增了Set结构，用于保存唯一值的序列</p>
<h4 id="map" tabindex="-1"><a class="header-anchor" href="#map" aria-hidden="true">#</a> Map</h4>
<p><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map" target="_blank" rel="noopener noreferrer">Map MDN<ExternalLinkIcon/></a></p>
<p>ES6新增了Map结构，用于保存键值对的映射，它和对象的最大区别在于：对象的键只能是字符串，而Map的键可以是任何类型</p>
<h3 id="函数" tabindex="-1"><a class="header-anchor" href="#函数" aria-hidden="true">#</a> 函数</h3>
<h4 id="箭头函数" tabindex="-1"><a class="header-anchor" href="#箭头函数" aria-hidden="true">#</a> 箭头函数</h4>
<p>所有使用<strong>函数表达式</strong>的位置，均可以替换为箭头函数</p>
<p>箭头函数语法：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 完整语法</span>
<span class="token punctuation">(</span><span class="token parameter">参数列表</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span> 函数体 <span class="token punctuation">}</span>
<span class="token comment">// 若有且仅有一个参数</span>
<span class="token parameter">参数</span> <span class="token operator">=></span> <span class="token punctuation">{</span> 函数体 <span class="token punctuation">}</span>
<span class="token comment">// 若函数体有且仅有一条返回语句</span>
<span class="token punctuation">(</span><span class="token parameter">参数列表</span><span class="token punctuation">)</span> <span class="token operator">=></span> 返回语句
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>示例1：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">sum</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span> b</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> a <span class="token operator">+</span> b<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 箭头函数写法</span>
<span class="token keyword">const</span> <span class="token function-variable function">sum</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span> b</span><span class="token punctuation">)</span> <span class="token operator">=></span> a <span class="token operator">+</span> b
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>示例2：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>dom<span class="token punctuation">.</span><span class="token function-variable function">onclick</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">e</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token comment">// ....</span>
<span class="token punctuation">}</span>

<span class="token comment">// 箭头函数写法</span>
dom<span class="token punctuation">.</span><span class="token function-variable function">onclick</span> <span class="token operator">=</span> <span class="token parameter">e</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token comment">// ...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>示例3：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token comment">// ...</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span>

<span class="token comment">// 箭头函数写法</span>
<span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token comment">// ...</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>箭头函数有以下特点：</p>
<ol>
<li>
<p>不能使用<code>new</code>调用</p>
</li>
<li>
<p>没有原型，即没有<code>prototype</code>属性</p>
</li>
<li>
<p>没有<code>arugments</code></p>
</li>
<li>
<p>没有<code>this</code></p>
<blockquote>
<p>有些教程中会说：箭头函数的<code>this</code>永远指向箭头函数定义位置的<code>this</code>，因为箭头函数会绑定<code>this</code>。</p>
<p>这个说法没错，根本原因是它没有<code>this</code>，它里面的<code>this</code>使用的是外层的<code>this</code></p>
</blockquote>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> counter <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">count</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
  <span class="token function-variable function">start</span><span class="token operator">:</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token comment">// 这里的 this 指向 counter</span>
    <span class="token function">setInterval</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      <span class="token comment">// 这里的 this 实际上是 start 函数的 this</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>count<span class="token operator">++</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div></li>
</ol>
<p>箭头函数的这些特点，都足以说明：<strong>箭头函数特别适用于那些临时需要函数的位置</strong></p>
<blockquote>
<p>我们将来会在面试指导阶段对this指向进行总结</p>
</blockquote>
<h4 id="剩余参数" tabindex="-1"><a class="header-anchor" href="#剩余参数" aria-hidden="true">#</a> 剩余参数</h4>
<p>ES6不建议再使用<code>arguments</code>来获取参数列表，它推荐使用剩余参数来收集未知数量的参数</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// ...args为剩余参数</span>
<span class="token keyword">function</span> <span class="token function">method</span><span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span> b<span class="token punctuation">,</span> <span class="token operator">...</span>args</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b<span class="token punctuation">,</span> args<span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token function">method</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 1 2 [3, 4, 5, 6, 7]</span>
<span class="token function">method</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 1 2 []</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p><strong>注意，剩余参数只能声明为最后一个参数</strong></p>
<h4 id="参数默认值" tabindex="-1"><a class="header-anchor" href="#参数默认值" aria-hidden="true">#</a> 参数默认值</h4>
<p>ES6提供了参数默认值，当参数没有传递或传递为<code>undefined</code>时，会使用默认值</p>
<p>示例1：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 对参数 b 使用了默认值1</span>
<span class="token keyword">function</span> <span class="token function">method</span><span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span> b <span class="token operator">=</span> <span class="token number">1</span></span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token function">method</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 1  2</span>
<span class="token function">method</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 1 1</span>
<span class="token function">method</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token keyword">undefined</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 1 1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>示例2：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 对参数 b 使用了默认值1， 对参数 c 使用默认值2</span>
<span class="token keyword">const</span> <span class="token function-variable function">method</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span> b <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">,</span> c <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">,</span> d</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b<span class="token punctuation">,</span> c<span class="token punctuation">,</span> d<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token function">method</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 1 2 2 undefined</span>
<span class="token function">method</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 1 1 2 undefined</span>
<span class="token function">method</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token keyword">undefined</span><span class="token punctuation">,</span> <span class="token keyword">undefined</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 1 1 2 4</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h4 id="类语法" tabindex="-1"><a class="header-anchor" href="#类语法" aria-hidden="true">#</a> 类语法</h4>
<p>过去，函数有着两种调用方式：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token constant">A</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token constant">A</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 直接调用</span>
<span class="token keyword">new</span> <span class="token class-name">A</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 作为构造函数调用</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>这种做法无法从定义上明确函数的用途，因此，ES6推出了一种全新的语法来书写构造函数</p>
<p>示例1：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 旧的写法</span>
<span class="token keyword">function</span> <span class="token function">User</span><span class="token punctuation">(</span><span class="token parameter">firstName<span class="token punctuation">,</span> lastName</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>firstName <span class="token operator">=</span> firstName<span class="token punctuation">;</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>lastName <span class="token operator">=</span> lastName<span class="token punctuation">;</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>fullName <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>firstName<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>lastName<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
User<span class="token punctuation">.</span><span class="token function-variable function">isUser</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">u</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token operator">!</span><span class="token operator">!</span>u <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span><span class="token operator">!</span>u<span class="token punctuation">.</span>fullName
<span class="token punctuation">}</span>
<span class="token class-name">User</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">sayHello</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">Hello, my name is </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token keyword">this</span><span class="token punctuation">.</span>fullName<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 新的等效写法</span>
<span class="token keyword">class</span> <span class="token class-name">User</span><span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">firstName<span class="token punctuation">,</span> lastName</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>firstName <span class="token operator">=</span> firstName<span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>lastName <span class="token operator">=</span> lastName<span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>fullName <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>firstName<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>lastName<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  
  <span class="token keyword">static</span> <span class="token function">isUser</span><span class="token punctuation">(</span><span class="token parameter">u</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  	 <span class="token keyword">return</span> <span class="token operator">!</span><span class="token operator">!</span>u <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span><span class="token operator">!</span>u<span class="token punctuation">.</span>fullName
  <span class="token punctuation">}</span>
  
  <span class="token function">sayHello</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">Hello, my name is </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token keyword">this</span><span class="token punctuation">.</span>fullName<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br></div></div><p>示例2：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">Animal</span><span class="token punctuation">(</span><span class="token parameter">type<span class="token punctuation">,</span> name</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>type <span class="token operator">=</span> type<span class="token punctuation">;</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token class-name">Animal</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">intro</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">I am </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token keyword">this</span><span class="token punctuation">.</span>type<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">, my name is </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token keyword">this</span><span class="token punctuation">.</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">function</span> <span class="token function">Dog</span><span class="token punctuation">(</span><span class="token parameter">name</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token function">Animal</span><span class="token punctuation">.</span><span class="token function">call</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> <span class="token string">'狗'</span><span class="token punctuation">,</span> name<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token class-name">Dog</span><span class="token punctuation">.</span>prototype <span class="token operator">=</span> Object<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token class-name">Animal</span><span class="token punctuation">.</span>prototype<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 设置继承关系</span>

<span class="token comment">// 新的方式</span>

<span class="token keyword">class</span> <span class="token class-name">Animal</span><span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">type<span class="token punctuation">,</span> name</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>type <span class="token operator">=</span> type<span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  
  <span class="token function">intro</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">I am </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token keyword">this</span><span class="token punctuation">.</span>type<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">, my name is </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token keyword">this</span><span class="token punctuation">.</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">Dog</span> <span class="token keyword">extends</span> <span class="token class-name">Animal</span><span class="token punctuation">{</span>
 	<span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter">name</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">super</span><span class="token punctuation">(</span><span class="token string">'狗'</span><span class="token punctuation">,</span> name<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br></div></div><h4 id="函数api" tabindex="-1"><a class="header-anchor" href="#函数api" aria-hidden="true">#</a> 函数API</h4>
<table>
<thead>
<tr>
<th>API</th>
<th>含义</th>
</tr>
</thead>
<tbody>
<tr>
<td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/call" target="_blank" rel="noopener noreferrer">Function.prototype.call(obj, ...args)<ExternalLinkIcon/></a></td>
<td>调用函数，绑定this为obj<br />后续以列表的形式提供参数</td>
</tr>
<tr>
<td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/apply" target="_blank" rel="noopener noreferrer">Function.prototype.apply(obj, args)<ExternalLinkIcon/></a></td>
<td>调用函数，绑定this为obj<br />args以数组的形式提供参数</td>
</tr>
<tr>
<td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind" target="_blank" rel="noopener noreferrer">Function.prototype.bind(obj, ...args)<ExternalLinkIcon/></a></td>
<td>返回一个函数的拷贝<br />新函数的this被绑定为obj<br />起始参数被绑定为args</td>
</tr>
<tr>
<td></td>
<td></td>
</tr>
</tbody>
</table>
<h2 id="es6模块" tabindex="-1"><a class="header-anchor" href="#es6模块" aria-hidden="true">#</a> ES6模块</h2>
<h3 id="概述" tabindex="-1"><a class="header-anchor" href="#概述" aria-hidden="true">#</a> 概述</h3>
<p>ES6 引入了模块化，其设计思想是在编译时就能确定模块的依赖关系，以及输入和输出的变量。</p>
<p>ES6 的模块化分为导出（export） @与导入（import）两个模块。</p>
<h3 id="特点" tabindex="-1"><a class="header-anchor" href="#特点" aria-hidden="true">#</a> 特点</h3>
<p>ES6 的模块自动开启严格模式，不管你有没有在模块头部加上 use strict;。</p>
<p>模块中可以导入和导出各种类型的变量，如函数，对象，字符串，数字，布尔值，类等。</p>
<p>每个模块都有自己的上下文，每一个模块内声明的变量都是局部变量，不会污染全局作用域。</p>
<p>每一个模块只加载一次（是单例的）， 若再去加载同目录下同文件，直接从内存中读取。</p>
<h3 id="export-与-import" tabindex="-1"><a class="header-anchor" href="#export-与-import" aria-hidden="true">#</a> export 与 import</h3>
<h4 id="基本用法" tabindex="-1"><a class="header-anchor" href="#基本用法" aria-hidden="true">#</a> 基本用法</h4>
<p>模块导入导出各种类型的变量，如字符串，数值，函数，类。</p>
<ul>
<li>导出的函数声明与类声明必须要有名称（export default 命令另外考虑）。</li>
<li>不仅能导出声明还能导出引用（例如函数）。</li>
<li>export 命令可以出现在模块的任何位置，但必需处于模块顶层。</li>
<li>import 命令会提升到整个模块的头部，首先执行。</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">/*-----export [test.js]-----*/</span>
<span class="token keyword">let</span> myName <span class="token operator">=</span> <span class="token string">"Tom"</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> myAge <span class="token operator">=</span> <span class="token number">20</span><span class="token punctuation">;</span>
<span class="token keyword">let</span> <span class="token function-variable function">myfn</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token string">"My name is"</span> <span class="token operator">+</span> myName <span class="token operator">+</span> <span class="token string">"! I'm '"</span> <span class="token operator">+</span> myAge <span class="token operator">+</span> <span class="token string">"years old."</span>
<span class="token punctuation">}</span>
<span class="token keyword">let</span> myClass <span class="token operator">=</span>  <span class="token keyword">class</span> <span class="token class-name">myClass</span> <span class="token punctuation">{</span>
    <span class="token keyword">static</span> a <span class="token operator">=</span> <span class="token string">"yeah!"</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">export</span> <span class="token punctuation">{</span> myName<span class="token punctuation">,</span> myAge<span class="token punctuation">,</span> myfn<span class="token punctuation">,</span> myClass <span class="token punctuation">}</span>
 
<span class="token comment">/*-----import [xxx.js]-----*/</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> myName<span class="token punctuation">,</span> myAge<span class="token punctuation">,</span> myfn<span class="token punctuation">,</span> myClass <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"./test.js"</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">myfn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">// My name is Tom! I'm 20 years old.</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>myAge<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">// 20</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>myName<span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">// Tom</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>myClass<span class="token punctuation">.</span>a <span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">// yeah!</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><p>export 命令导出的接口名称，须和模块内部的变量有一一对应关系。</p>
<ul>
<li>导入的变量名，须和导出的接口名称相同，即顺序可以不一致。</li>
<li>不同模块导出接口名称命名重复， 使用 as 重新定义变量名。</li>
</ul>
<h4 id="import-命令的特点" tabindex="-1"><a class="header-anchor" href="#import-命令的特点" aria-hidden="true">#</a> import 命令的特点</h4>
<p><strong>只读属性</strong>：不允许在加载模块的脚本里面，改写接口的引用指向，即可以改写 import 变量类型为对象的属性值，不能改写 import 变量类型为基本类型的值。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">import</span> <span class="token punctuation">{</span>a<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"./xxx.js"</span>
a <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span> <span class="token comment">// error</span>
 
<span class="token keyword">import</span> <span class="token punctuation">{</span>a<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"./xxx.js"</span>
a<span class="token punctuation">.</span>foo <span class="token operator">=</span> <span class="token string">"hello"</span><span class="token punctuation">;</span> <span class="token comment">// a = { foo : 'hello' }</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h4 id="export-default-命令" tabindex="-1"><a class="header-anchor" href="#export-default-命令" aria-hidden="true">#</a> export default 命令</h4>
<ul>
<li>在一个文件或模块中，export、import 可以有多个，export default 仅有一个。</li>
<li>export default 中的 default 是对应的导出接口变量。</li>
<li>通过 export 方式导出，在导入时要加{ }，export default 则不需要。</li>
<li>export default 向外暴露的成员，可以使用任意变量来接收。</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token string">"My name is Tom!"</span><span class="token punctuation">;</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> a<span class="token punctuation">;</span> <span class="token comment">// 仅有一个</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token keyword">var</span> c <span class="token operator">=</span> <span class="token string">"error"</span><span class="token punctuation">;</span> 
<span class="token comment">// error，default 已经是对应的导出变量，不能跟着变量声明语句</span>
 
<span class="token keyword">import</span> b <span class="token keyword">from</span> <span class="token string">"./xxx.js"</span><span class="token punctuation">;</span> <span class="token comment">// 不需要加{}， 使用任意变量接收</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><p>复合使用</p>
<p>export 与 import 可以在同一模块使用，使用特点：</p>
<ul>
<li>可以将导出接口改名，包括 default。</li>
<li>复合使用 export 与 import ，也可以导出全部，当前模块导出的接口会覆盖继承导出的。</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">export</span> <span class="token punctuation">{</span> foo<span class="token punctuation">,</span> bar <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"methods"</span><span class="token punctuation">;</span>
 
<span class="token comment">// 约等于下面两段语句，不过上面导入导出方式该模块没有导入 foo 与 bar</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> foo<span class="token punctuation">,</span> bar <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"methods"</span><span class="token punctuation">;</span>
<span class="token keyword">export</span> <span class="token punctuation">{</span> foo<span class="token punctuation">,</span> bar <span class="token punctuation">}</span><span class="token punctuation">;</span>
 
<span class="token comment">/* ------- 特点 1 --------*/</span>
<span class="token comment">// 普通改名</span>
<span class="token keyword">export</span> <span class="token punctuation">{</span> foo <span class="token keyword">as</span> bar <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"methods"</span><span class="token punctuation">;</span>
<span class="token comment">// 将 foo 转导成 default</span>
<span class="token keyword">export</span> <span class="token punctuation">{</span> foo <span class="token keyword">as</span> <span class="token keyword">default</span> <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"methods"</span><span class="token punctuation">;</span>
<span class="token comment">// 将 default 转导成 foo</span>
<span class="token keyword">export</span> <span class="token punctuation">{</span> <span class="token keyword">default</span> <span class="token keyword">as</span> foo <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"methods"</span><span class="token punctuation">;</span>
 
<span class="token comment">/* ------- 特点 2 --------*/</span>
<span class="token keyword">export</span> <span class="token operator">*</span> <span class="token keyword">from</span> <span class="token string">"methods"</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><h2 id="promise-对象" tabindex="-1"><a class="header-anchor" href="#promise-对象" aria-hidden="true">#</a> Promise 对象</h2>
<blockquote>
<p>本节课的任务：</p>
<ol>
<li>理解Promise A+规范的基本概念</li>
<li>学会创建Promise</li>
<li>学会针对Promise进行后续处理</li>
</ol>
</blockquote>
<h3 id="邓哥的烦恼" tabindex="-1"><a class="header-anchor" href="#邓哥的烦恼" aria-hidden="true">#</a> 邓哥的烦恼</h3>
<p>邓哥心中有很多女神，他今天下定决心，要向这些女神表白，他认为，只要女神够多，根据概率学原理，总有一个会接收他</p>
<p>稳妥起见，邓哥决定使用<strong>串行</strong>的方式进行表白：先给第1位女神发送短信，然后等待女神的回应，如果成功了，就结束，如果失败了，则再给第2位女神发送短信，依次类推</p>
<p><img src="http://mdrs.yuanjin.tech/img/20210618150543.png" alt="image-20210618150543263"></p>
<p>邓哥的女神一共有4位，名字分别是：李建国、王富贵、周聚财、刘人勇</p>
<p>发短信是一个重复性的劳动，邓哥是个程序员，因此决定用函数封装这个动作</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 向某位女生发送一则表白短信</span>
<span class="token comment">// name: 女神的姓名</span>
<span class="token comment">// onFulffiled: 成功后的回调</span>
<span class="token comment">// onRejected: 失败后的回调</span>
<span class="token keyword">function</span> <span class="token function">sendMessage</span><span class="token punctuation">(</span><span class="token parameter">name<span class="token punctuation">,</span> onFulffiled<span class="token punctuation">,</span> onRejected</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token comment">// 模拟 发送表白短信</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>
    <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">邓哥 -> </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">：最近有谣言说我喜欢你，我要澄清一下，那不是谣言😘</span><span class="token template-punctuation string">`</span></span>
  <span class="token punctuation">)</span><span class="token punctuation">;</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">等待</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">回复......</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">// 模拟 女神回复需要一段时间</span>
  <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token comment">// 模拟 有10%的几率成功</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&lt;=</span> <span class="token number">0.1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 成功，调用 onFuffiled，并传递女神的回复</span>
      <span class="token function">onFulffiled</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> -> 邓哥：我是九，你是三，除了你还是你😘</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token comment">// 失败，调用 onRejected，并传递女神的回复</span>
      <span class="token function">onRejected</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> -> 邓哥：你是个好人😜</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div><p>有了这个函数后，邓哥于是开始编写程序发送短信了</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 首先向 李建国 发送消息</span>
<span class="token function">sendMessage</span><span class="token punctuation">(</span>
  <span class="token string">'李建国'</span><span class="token punctuation">,</span>
  <span class="token punctuation">(</span><span class="token parameter">reply</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token comment">// 如果成功了，输出回复的消息后，结束</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>reply<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">(</span><span class="token parameter">reply</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token comment">// 如果失败了，输出回复的消息后，向 王富贵 发送消息</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>reply<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">sendMessage</span><span class="token punctuation">(</span>
      <span class="token string">'王富贵'</span><span class="token punctuation">,</span>
      <span class="token punctuation">(</span><span class="token parameter">reply</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token comment">// 如果成功了，输出回复的消息后，结束</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>reply<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">(</span><span class="token parameter">reply</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
        <span class="token comment">// 如果失败了，输出回复的消息后，向 周聚财 发送消息</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>reply<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">sendMessage</span><span class="token punctuation">(</span>
          <span class="token string">'周聚财'</span><span class="token punctuation">,</span>
          <span class="token punctuation">(</span><span class="token parameter">reply</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
            <span class="token comment">// 如果成功了，输出回复的消息后，结束</span>
            console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>reply<span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token punctuation">}</span><span class="token punctuation">,</span>
          <span class="token punctuation">(</span><span class="token parameter">reply</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
            <span class="token comment">// 如果失败了，输出回复的消息后，向 刘人勇 发送消息</span>
            console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>reply<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token function">sendMessage</span><span class="token punctuation">(</span>
              <span class="token string">'刘人勇'</span><span class="token punctuation">,</span>
              <span class="token punctuation">(</span><span class="token parameter">reply</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
                <span class="token comment">// 如果成功了，输出回复的消息后，结束</span>
                console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>reply<span class="token punctuation">)</span><span class="token punctuation">;</span>
              <span class="token punctuation">}</span><span class="token punctuation">,</span>
              <span class="token punctuation">(</span><span class="token parameter">reply</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
                <span class="token comment">// 如果失败了，就彻底没戏了</span>
                console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>reply<span class="token punctuation">)</span><span class="token punctuation">;</span>
                console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'邓哥命犯天煞孤星，注定孤独终老！！'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
              <span class="token punctuation">}</span>
            <span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br></div></div><p>该程序完成后，邓哥内心是崩溃的</p>
<p>这一层一层的回调嵌套，形成了传说中的「<strong>回调地狱 callback hell</strong>」</p>
<p>邓哥是个完美主义者，怎么能忍受这样的代码呢？</p>
<p>要解决这样的问题，需要Promise出马</p>
<h3 id="promise规范" tabindex="-1"><a class="header-anchor" href="#promise规范" aria-hidden="true">#</a> Promise规范</h3>
<p>Promise是一套专门处理异步场景的规范，它能有效的避免回调地狱的产生，使异步代码更加清晰、简洁、统一</p>
<p>这套规范最早诞生于前端社区，规范名称为<a href="https://promisesaplus.com/" target="_blank" rel="noopener noreferrer">Promise A+<ExternalLinkIcon/></a></p>
<p>该规范出现后，立即得到了很多开发者的响应</p>
<p>Promise A+ 规定：</p>
<ol>
<li>
<p>所有的异步场景，都可以看作是一个异步任务，每个异步任务，在JS中应该表现为一个<strong>对象</strong>，该对象称之为<strong>Promise对象</strong>，也叫做任务对象</p>
<img src="http://mdrs.yuanjin.tech/img/20210618154556.png" alt="image-20210618154556558" style="zoom:50%;" />
</li>
<li>
<p>每个任务对象，都应该有两个阶段、三个状态</p>
<img src="http://mdrs.yuanjin.tech/img/20210618155145.png" alt="image-20210618155145355" style="zoom:50%;" />
<p>根据常理，它们之间存在以下逻辑：</p>
<ul>
<li>任务总是从未决阶段变到已决阶段，无法逆行</li>
<li>任务总是从挂起状态变到完成或失败状态，无法逆行</li>
<li>时间不能倒流，历史不可改写，任务一旦完成或失败，状态就固定下来，永远无法改变</li>
</ul>
</li>
<li>
<p><code>挂起-&gt;完成</code>，称之为<code>resolve</code>；<code>挂起-&gt;失败</code>称之为<code>reject</code>。任务完成时，可能有一个相关数据；任务失败时，可能有一个失败原因。</p>
<p><img src="http://mdrs.yuanjin.tech/img/20210618160538.png" alt="image-20210618160538875"></p>
</li>
<li>
<p>可以针对任务进行后续处理，针对完成状态的后续处理称之为onFulfilled，针对失败的后续处理称之为onRejected</p>
<p><img src="http://mdrs.yuanjin.tech/img/20210618161125.png" alt="image-20210618161125894"></p>
</li>
</ol>
<h3 id="promise-api" tabindex="-1"><a class="header-anchor" href="#promise-api" aria-hidden="true">#</a> Promise API</h3>
<p>ES6提供了一套API，实现了Promise A+规范</p>
<p>基本使用如下：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 创建一个任务对象，该任务立即进入 pending 状态</span>
<span class="token keyword">const</span> pro <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token comment">// 任务的具体执行流程，该函数会立即被执行</span>
  <span class="token comment">// 调用 resolve(data)，可将任务变为 fulfilled 状态， data 为需要传递的相关数据</span>
  <span class="token comment">// 调用 reject(reason)，可将任务变为 rejected 状态，reason 为需要传递的失败原因</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

pro<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>
  <span class="token punctuation">(</span><span class="token parameter">data</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token comment">// onFulfilled 函数，当任务完成后，会自动运行该函数，data为任务完成的相关数据</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">(</span><span class="token parameter">reason</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token comment">// onRejected 函数，当任务失败后，会自动运行该函数，reason为任务失败的相关原因</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><h3 id="邓哥的解决方案" tabindex="-1"><a class="header-anchor" href="#邓哥的解决方案" aria-hidden="true">#</a> 邓哥的解决方案</h3>
<p>学习了ES6的Promise后，邓哥决定对<code>sendMessage</code>函数进行改造，改造结果如下：</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 向某位女生发送一则表白短信</span>
<span class="token comment">// name: 女神的姓名</span>
<span class="token comment">// 该函数返回一个任务对象</span>
<span class="token keyword">function</span> <span class="token function">sendMessage</span><span class="token punctuation">(</span><span class="token parameter">name</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token comment">// 模拟 发送表白短信</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>
      <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">邓哥 -> </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">：最近有谣言说我喜欢你，我要澄清一下，那不是谣言😘</span><span class="token template-punctuation string">`</span></span>
    <span class="token punctuation">)</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">等待</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">回复......</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 模拟 女神回复需要一段时间</span>
    <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      <span class="token comment">// 模拟 有10%的几率成功</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&lt;=</span> <span class="token number">0.1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 成功，调用 resolve，并传递女神的回复</span>
        <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> -> 邓哥：我是九，你是三，除了你还是你😘</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token comment">// 失败，调用 reject，并传递女神的回复</span>
        <span class="token function">reject</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> -> 邓哥：你是个好人😜</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div><p>之后，就可以使用该函数来发送消息了</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token function">sendMessage</span><span class="token punctuation">(</span><span class="token string">'李建国'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>
  <span class="token punctuation">(</span><span class="token parameter">reply</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token comment">// 女神答应了，输出女神的回复</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>reply<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">(</span><span class="token parameter">reason</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token comment">// 女神拒绝了，输出女神的回复</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>reason<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><blockquote>
<p>至此，回调地狱的问题仍然没能解决</p>
<p>要解决回调地狱，还需要进一步学习Promise的知识</p>
</blockquote>
<p><img src="http://mdrs.yuanjin.tech/img/20210618161125.png" alt="image-20210618161125894"></p>
<h3 id="catch方法" tabindex="-1"><a class="header-anchor" href="#catch方法" aria-hidden="true">#</a> catch方法</h3>
<p><code>.catch(onRejected)</code> = <code>.then(null, onRejected)</code></p>
<h3 id="链式调用" tabindex="-1"><a class="header-anchor" href="#链式调用" aria-hidden="true">#</a> 链式调用</h3>
<p><img src="http://mdrs.yuanjin.tech/img/20210621103501.png" alt="image-20210621103501094"></p>
<ol>
<li>
<p>then方法必定会返回一个新的Promise</p>
<p>可理解为<code>后续处理也是一个任务</code></p>
</li>
<li>
<p>新任务的状态取决于后续处理：</p>
<ul>
<li>
<p>若没有相关的后续处理，新任务的状态和前任务一致，数据为前任务的数据</p>
</li>
<li>
<p>若有后续处理但还未执行，新任务挂起。</p>
</li>
<li>
<p>若后续处理执行了，则根据后续处理的情况确定新任务的状态</p>
<ul>
<li>后续处理执行无错，新任务的状态为完成，数据为后续处理的返回值</li>
<li>后续处理执行有错，新任务的状态为失败，数据为异常对象</li>
<li>后续执行后返回的是一个任务对象，新任务的状态和数据与该任务对象一致</li>
</ul>
</li>
</ul>
</li>
</ol>
<p>由于链式任务的存在，异步代码拥有了更强的表达力</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 常见任务处理代码</span>

<span class="token comment">/*
 * 任务成功后，执行处理1，失败则执行处理2
 */</span>
pro<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>处理<span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">catch</span><span class="token punctuation">(</span>处理<span class="token number">2</span><span class="token punctuation">)</span>

<span class="token comment">/*
 * 任务成功后，依次执行处理1、处理2
 */</span>
pro<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>处理<span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>处理<span class="token number">2</span><span class="token punctuation">)</span>

<span class="token comment">/*
 * 任务成功后，依次执行处理1、处理2，若任务失败或前面的处理有错，执行处理3
 */</span>
pro<span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>处理<span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>处理<span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">catch</span><span class="token punctuation">(</span>处理<span class="token number">3</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><h3 id="邓哥的解决方案-1" tabindex="-1"><a class="header-anchor" href="#邓哥的解决方案-1" aria-hidden="true">#</a> 邓哥的解决方案</h3>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 向某位女生发送一则表白短信</span>
<span class="token comment">// name: 女神的姓名</span>
<span class="token comment">// onFulffiled: 成功后的回调</span>
<span class="token comment">// onRejected: 失败后的回调</span>
<span class="token keyword">function</span> <span class="token function">sendMessage</span><span class="token punctuation">(</span><span class="token parameter">name</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token comment">// 模拟 发送表白短信</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>
      <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">邓哥 -> </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">：最近有谣言说我喜欢你，我要澄清一下，那不是谣言😘</span><span class="token template-punctuation string">`</span></span>
    <span class="token punctuation">)</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">等待</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">回复......</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 模拟 女神回复需要一段时间</span>
    <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      <span class="token comment">// 模拟 有10%的几率成功</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&lt;=</span> <span class="token number">0.1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 成功，调用 onFuffiled，并传递女神的回复</span>
        <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> -> 邓哥：我是九，你是三，除了你还是你😘</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token comment">// 失败，调用 onRejected，并传递女神的回复</span>
        <span class="token function">reject</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> -> 邓哥：你是个好人😜</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token function">sendMessage</span><span class="token punctuation">(</span><span class="token string">'李建国'</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">catch</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">reply</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token comment">// 失败，继续</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>reply<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token function">sendMessage</span><span class="token punctuation">(</span><span class="token string">'王富贵'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">catch</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">reply</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token comment">// 失败，继续</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>reply<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token function">sendMessage</span><span class="token punctuation">(</span><span class="token string">'周聚财'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">catch</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">reply</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token comment">// 失败，继续</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>reply<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token function">sendMessage</span><span class="token punctuation">(</span><span class="token string">'刘人勇'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>
    <span class="token punctuation">(</span><span class="token parameter">reply</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      <span class="token comment">// 成功，结束</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>reply<span class="token punctuation">)</span><span class="token punctuation">;</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'邓哥终于找到了自己的伴侣'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">(</span><span class="token parameter">reply</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      <span class="token comment">// 最后一个也失败了</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>reply<span class="token punctuation">)</span><span class="token punctuation">;</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'邓哥命犯天煞孤星，无伴终老，孤独一生'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br></div></div><h3 id="邓哥的新问题" tabindex="-1"><a class="header-anchor" href="#邓哥的新问题" aria-hidden="true">#</a> 邓哥的新问题</h3>
<p>邓嫂出门时，给邓哥交待了几个任务：</p>
<ol>
<li>
<p>做饭</p>
<p>可交给电饭煲完成</p>
</li>
<li>
<p>洗衣服</p>
<p>可交给洗衣机完成</p>
</li>
<li>
<p>打扫卫生</p>
<p>可交给扫地机器人完成</p>
</li>
</ol>
<p>邓哥需要在所有任务结束后给邓嫂汇报工作，哪些成功了，哪些失败了</p>
<p>为了最大程度的节约时间，邓哥希望这些任务同时进行，最终汇总结果统一处理</p>
<img src="http://mdrs.yuanjin.tech/img/20210621142519.png" alt="image-20210621142519937" style="zoom:50%;" />
<p>每个任务可以看做是一个返回Promise的函数</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 做饭</span>
<span class="token keyword">function</span> <span class="token function">cook</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'邓哥打开了电饭煲'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&lt;</span> <span class="token number">0.5</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">'饭已ok'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token function">reject</span><span class="token punctuation">(</span><span class="token string">'做饭却忘了加水，米饭变成了爆米花'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">2000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 洗衣服</span>
<span class="token keyword">function</span> <span class="token function">wash</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'邓哥打开了洗衣机'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&lt;</span> <span class="token number">0.5</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">'衣服已经洗好'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token function">reject</span><span class="token punctuation">(</span><span class="token string">'洗衣服时停水了，洗了个寂寞'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">2500</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 打扫卫生</span>
<span class="token keyword">function</span> <span class="token function">sweep</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'邓哥打开了扫地机器人'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&lt;</span> <span class="token number">0.5</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">'地板扫的非常干净'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token function">reject</span><span class="token punctuation">(</span><span class="token string">'扫地机器人被哈士奇一爪掀翻了'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">3000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br></div></div><p>如何利用这三个函数实现邓哥的要求呢？</p>
<h3 id="promise的静态方法" tabindex="-1"><a class="header-anchor" href="#promise的静态方法" aria-hidden="true">#</a> Promise的静态方法</h3>
<table>
<thead>
<tr>
<th>方法名</th>
<th>含义</th>
</tr>
</thead>
<tbody>
<tr>
<td>Promise.resolve(data)</td>
<td>直接返回一个完成状态的任务</td>
</tr>
<tr>
<td>Promise.reject(reason)</td>
<td>直接返回一个拒绝状态的任务</td>
</tr>
<tr>
<td>Promise.all(任务数组)</td>
<td>返回一个任务<br />任务数组全部成功则成功<br />任何一个失败则失败</td>
</tr>
<tr>
<td>Promise.any(任务数组)</td>
<td>返回一个任务<br />任务数组任一成功则成功<br />任务全部失败则失败</td>
</tr>
<tr>
<td>Promise.allSettled(任务数组)</td>
<td>返回一个任务<br />任务数组全部已决则成功<br />该任务不会失败</td>
</tr>
<tr>
<td>Promise.race(任务数组)</td>
<td>返回一个任务<br />任务数组任一已决则已决，状态和其一致</td>
</tr>
<tr>
<td></td>
<td></td>
</tr>
</tbody>
</table>
<h3 id="邓哥的解决方案-2" tabindex="-1"><a class="header-anchor" href="#邓哥的解决方案-2" aria-hidden="true">#</a> 邓哥的解决方案</h3>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>Promise<span class="token punctuation">.</span><span class="token function">allSettled</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token function">cook</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">wash</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">sweep</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">result</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token comment">// 处理汇总结果</span>
  <span class="token keyword">const</span> report <span class="token operator">=</span> result
    <span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">r</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">(</span>r<span class="token punctuation">.</span>status <span class="token operator">===</span> <span class="token string">'fulfilled'</span> <span class="token operator">?</span> r<span class="token punctuation">.</span>value <span class="token operator">:</span> r<span class="token punctuation">.</span>reason<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token string">';'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>report<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p><img src="http://mdrs.yuanjin.tech/img/20210618161125.png" alt="image-20210618161125894"></p>
<h3 id="消除回调" tabindex="-1"><a class="header-anchor" href="#消除回调" aria-hidden="true">#</a> 消除回调</h3>
<p>有了Promise，异步任务就有了一种统一的处理方式</p>
<p>有了统一的处理方式，ES官方就可以对其进一步优化</p>
<p>ES7推出了两个关键字<code>async</code>和<code>await</code>，用于更加优雅的表达Promise</p>
<h4 id="async" tabindex="-1"><a class="header-anchor" href="#async" aria-hidden="true">#</a> async</h4>
<p>async关键字用于修饰函数，被它修饰的函数，一定返回Promise</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">method1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token number">1</span><span class="token punctuation">;</span> <span class="token comment">// 该函数的返回值是Promise完成后的数据</span>
<span class="token punctuation">}</span>

<span class="token function">method1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Promise { 1 }</span>

<span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">method2</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token keyword">return</span> Promise<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 若返回的是Promise，则method得到的Promise状态和其一致</span>
<span class="token punctuation">}</span>

<span class="token function">method2</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Promise { 1 }</span>

<span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">method3</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 若执行过程报错，则任务是rejected</span>
<span class="token punctuation">}</span>

<span class="token function">method3</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Promise { &lt;rejected> Error(1) }</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><h4 id="await" tabindex="-1"><a class="header-anchor" href="#await" aria-hidden="true">#</a> await</h4>
<p><code>await</code>关键字表示等待某个Promise完成，<strong>它必须用于<code>async</code>函数中</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">method</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token keyword">const</span> n <span class="token operator">=</span> <span class="token keyword">await</span> Promise<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>n<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 1</span>
<span class="token punctuation">}</span>

<span class="token comment">// 上面的函数等同于</span>
<span class="token keyword">function</span> <span class="token function">method</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span><span class="token operator">=></span><span class="token punctuation">{</span>
    Promise<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">n</span><span class="token operator">=></span><span class="token punctuation">{</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>n<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><p><code>await</code>也可以等待其他数据</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">method</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token keyword">const</span> n <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token number">1</span><span class="token punctuation">;</span> <span class="token comment">// 等同于 await Promise.resolve(1)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>如果需要针对失败的任务进行处理，可以使用<code>try-catch</code>语法</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">method</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token keyword">try</span><span class="token punctuation">{</span>
    <span class="token keyword">const</span> n <span class="token operator">=</span> <span class="token keyword">await</span> Promise<span class="token punctuation">.</span><span class="token function">reject</span><span class="token punctuation">(</span><span class="token number">123</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 这句代码将抛出异常</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'成功'</span><span class="token punctuation">,</span> n<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">catch</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span><span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'失败'</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token function">method</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 输出： 失败 123</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><h3 id="邓哥表白的完美解决方案" tabindex="-1"><a class="header-anchor" href="#邓哥表白的完美解决方案" aria-hidden="true">#</a> 邓哥表白的完美解决方案</h3>
<p>邓哥的女神可不是只有4位，而是40位！</p>
<p>为了更加方便的编写表白代码，邓哥决定把这40位女神放到一个数组中，然后利用async和await轻松完成代码</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 女神的名字数组</span>
<span class="token keyword">const</span> beautyGirls <span class="token operator">=</span> <span class="token punctuation">[</span>
  <span class="token string">'梁平'</span><span class="token punctuation">,</span>
  <span class="token string">'邱杰'</span><span class="token punctuation">,</span>
  <span class="token string">'王超'</span>
<span class="token punctuation">]</span><span class="token punctuation">;</span>

<span class="token comment">// 向某位女生发送一则表白短信</span>
<span class="token comment">// name: 女神的姓名</span>
<span class="token keyword">function</span> <span class="token function">sendMessage</span><span class="token punctuation">(</span><span class="token parameter">name</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token comment">// 模拟 发送表白短信</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>
      <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">邓哥 -> </span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">：最近有谣言说我喜欢你，我要澄清一下，那不是谣言😘</span><span class="token template-punctuation string">`</span></span>
    <span class="token punctuation">)</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">等待</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">回复......</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 模拟 女神回复需要一段时间</span>
    <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      <span class="token comment">// 模拟 有10%的几率成功</span>
      <span class="token keyword">if</span> <span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&lt;=</span> <span class="token number">0.1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 成功，调用 onFuffiled，并传递女神的回复</span>
        <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> -> 邓哥：我是九，你是三，除了你还是你😘</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token comment">// 失败，调用 onRejected，并传递女神的回复</span>
        <span class="token function">reject</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> -> 邓哥：你是个好人😜</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 批量表白的程序</span>
<span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">proposal</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">let</span> isSuccess <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
  <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">const</span> girl <span class="token keyword">of</span> beautyGirls<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
      <span class="token keyword">const</span> reply <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">sendMessage</span><span class="token punctuation">(</span>girl<span class="token punctuation">)</span><span class="token punctuation">;</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>reply<span class="token punctuation">)</span><span class="token punctuation">;</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'表白成功!'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      isSuccess <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
      <span class="token keyword">break</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>reply<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>reply<span class="token punctuation">)</span><span class="token punctuation">;</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'表白失败'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>isSuccess<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">'邓哥注定孤独一生'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token function">proposal</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br></div></div><h2 id="generator函数" tabindex="-1"><a class="header-anchor" href="#generator函数" aria-hidden="true">#</a> Generator函数</h2>
<p>ES6 新引入了 Generator 函数，可以通过 yield 关键字，把函数的执行流挂起，为改变执行流程提供了可能，从而为异步编程提供解决方案。</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span><span class="token operator">*</span> <span class="token function">sendParameter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"start"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">var</span> x <span class="token operator">=</span> <span class="token keyword">yield</span> <span class="token string">'2'</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"one:"</span> <span class="token operator">+</span> x<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">var</span> y <span class="token operator">=</span> <span class="token keyword">yield</span> <span class="token string">'3'</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"two:"</span> <span class="token operator">+</span> y<span class="token punctuation">)</span><span class="token punctuation">;</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"total:"</span> <span class="token operator">+</span> <span class="token punctuation">(</span>x <span class="token operator">+</span> y<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// next不传参</span>
<span class="token keyword">var</span> sendp1 <span class="token operator">=</span> <span class="token function">sendParameter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
sendp1<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// start</span>
<span class="token comment">// {value: "2", done: false}</span>
sendp1<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// one:undefined</span>
<span class="token comment">// {value: "3", done: false}</span>
sendp1<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// two:undefined</span>
<span class="token comment">// total:NaN</span>
<span class="token comment">// {value: undefined, done: true}</span>
<span class="token comment">// next传参</span>
<span class="token keyword">var</span> sendp2 <span class="token operator">=</span> <span class="token function">sendParameter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
sendp2<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// start</span>
<span class="token comment">// {value: "2", done: false}</span>
sendp2<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// one:20</span>
<span class="token comment">// {value: "3", done: false}</span>
sendp2<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token number">30</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// two:30</span>
<span class="token comment">// total:50</span>
<span class="token comment">// {value: undefined, done: true}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br></div></div></template>
