<template><h1 id="promise" tabindex="-1"><a class="header-anchor" href="#promise" aria-hidden="true">#</a> Promise</h1>
<blockquote>
<p>Promise 的面试题基本都是代码题，不提供参考答案，否则容易干扰思考</p>
<p>若需知道正确答案，请自行运行</p>
</blockquote>
<p><img src="http://mdrs.yuanjin.tech/img/20210618161125.png" alt="image-20210618161125894"></p>
<h2 id="链式调用规则" tabindex="-1"><a class="header-anchor" href="#链式调用规则" aria-hidden="true">#</a> 链式调用规则</h2>
<p><img src="http://mdrs.yuanjin.tech/img/20210621103501.png" alt="image-20210621103501094"></p>
<ol>
<li>
<p>then 方法必定会返回一个新的 Promise</p>
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
<h2 id="promise-的静态方法" tabindex="-1"><a class="header-anchor" href="#promise-的静态方法" aria-hidden="true">#</a> Promise 的静态方法</h2>
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
<h2 id="async-和-await" tabindex="-1"><a class="header-anchor" href="#async-和-await" aria-hidden="true">#</a> async 和 await</h2>
<p>有了 Promise，异步任务就有了一种统一的处理方式</p>
<p>有了统一的处理方式，ES 官方就可以对其进一步优化</p>
<p>ES7 推出了两个关键字<code>async</code>和<code>await</code>，用于更加优雅的表达 Promise</p>
<h3 id="async" tabindex="-1"><a class="header-anchor" href="#async" aria-hidden="true">#</a> async</h3>
<p>async 关键字用于修饰函数，被它修饰的函数，一定返回 Promise</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">method1</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token number">1</span><span class="token punctuation">;</span> <span class="token comment">// 该函数的返回值是Promise完成后的数据</span>
<span class="token punctuation">}</span>

<span class="token function">method1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Promise { 1 }</span>

<span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">method2</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> Promise<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 若返回的是Promise，则method得到的Promise状态和其一致</span>
<span class="token punctuation">}</span>

<span class="token function">method2</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Promise { 1 }</span>

<span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">method3</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 若执行过程报错，则任务是rejected</span>
<span class="token punctuation">}</span>

<span class="token function">method3</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Promise { &lt;rejected> Error(1) }</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><h3 id="await" tabindex="-1"><a class="header-anchor" href="#await" aria-hidden="true">#</a> await</h3>
<p><code>await</code>关键字表示等待某个 Promise 完成，<strong>它必须用于<code>async</code>函数中</strong></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">method</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> n <span class="token operator">=</span> <span class="token keyword">await</span> Promise<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>n<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 1</span>
<span class="token punctuation">}</span>

<span class="token comment">// 上面的函数等同于</span>
<span class="token keyword">function</span> <span class="token function">method</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resolve<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    Promise<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">n</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>n<span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><p><code>await</code>也可以等待其他数据</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">method</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> n <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token number">1</span><span class="token punctuation">;</span> <span class="token comment">// 等同于 await Promise.resolve(1)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>如果需要针对失败的任务进行处理，可以使用<code>try-catch</code>语法</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">method</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">try</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> n <span class="token operator">=</span> <span class="token keyword">await</span> Promise<span class="token punctuation">.</span><span class="token function">reject</span><span class="token punctuation">(</span><span class="token number">123</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 这句代码将抛出异常</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"成功"</span><span class="token punctuation">,</span> n<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">"失败"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token function">method</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 输出： 失败 123</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><h2 id="事件循环" tabindex="-1"><a class="header-anchor" href="#事件循环" aria-hidden="true">#</a> 事件循环</h2>
<p>根据目前所学，进入事件队列的函数有以下几种：</p>
<ul>
<li><code>setTimeout</code>的回调，宏任务（macro task）</li>
<li><code>setInterval</code>的回调，宏任务（macro task）</li>
<li>Promise 的<code>then</code>函数回调，<strong>微任务</strong>（micro task）</li>
<li><code>requestAnimationFrame</code>的回调，宏任务（macro task）</li>
<li>事件处理函数，宏任务(macro task)</li>
</ul>
</template>
