<template><h1 id="npm" tabindex="-1"><a class="header-anchor" href="#npm" aria-hidden="true">#</a> npm</h1>
<p>npm官网：https://www.npmjs.com/</p>
<p>npm全命令：https://docs.npmjs.com/cli/v7/commands</p>
<h2 id="概念" tabindex="-1"><a class="header-anchor" href="#概念" aria-hidden="true">#</a> 概念</h2>
<ol>
<li>
<p>什么是<strong>包</strong>？</p>
<p>包（package）是一个或多个js模块的集合，它们共同完成某一类功能</p>
<p>可以简单的认为每一个工程就是一个包</p>
<p>有些包是为了给别人用的，这种包也叫第三方库</p>
</li>
<li>
<p>什么是<strong>包管理器</strong>？</p>
<p>包管理器是一个管理包的工具，前端常见的包管理器有npm、yarn、cnpm、pnpm等</p>
<p>包管理器具备以下能力：</p>
<ul>
<li>让开发者可以轻松的下载包</li>
<li>让开发者可以轻松的升级和卸载包</li>
<li>能够自动管理包的依赖</li>
</ul>
</li>
<li>
<p>什么是<strong>cli</strong></p>
<p>cli是一个命令行工具，它提供一个终端命令，通过该命令可以完成一些功能</p>
</li>
</ol>
<h2 id="node查找包的顺序" tabindex="-1"><a class="header-anchor" href="#node查找包的顺序" aria-hidden="true">#</a> node查找包的顺序</h2>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token function">require</span><span class="token punctuation">(</span><span class="token string">"a"</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><ol>
<li>查找是否有内置模块a</li>
<li>查找当前目录的node_modules中是否有a</li>
<li>依次查找上级目录的node_modules中是否有a，直到根目录</li>
</ol>
<h2 id="配置源" tabindex="-1"><a class="header-anchor" href="#配置源" aria-hidden="true">#</a> 配置源</h2>
<h3 id="查看源" tabindex="-1"><a class="header-anchor" href="#查看源" aria-hidden="true">#</a> 查看源</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">npm</span> config get registry
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><h3 id="配置淘宝镜像源" tabindex="-1"><a class="header-anchor" href="#配置淘宝镜像源" aria-hidden="true">#</a> 配置淘宝镜像源</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">npm</span> config <span class="token builtin class-name">set</span> registry https://registry.npm.taobao.org
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><h3 id="配置官方源" tabindex="-1"><a class="header-anchor" href="#配置官方源" aria-hidden="true">#</a> 配置官方源</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>	<span class="token function">npm</span> config <span class="token builtin class-name">set</span> registry https://registry.npmjs.org/
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><h2 id="初始化" tabindex="-1"><a class="header-anchor" href="#初始化" aria-hidden="true">#</a> 初始化</h2>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">npm</span> init <span class="token comment"># 初始化工程，帮助生成 package.json 文件</span>
<span class="token function">npm</span> init <span class="token parameter variable">-y</span> <span class="token comment"># 初始化工程，全部使用默认配置生成 package.json 文件</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h2 id="package-json" tabindex="-1"><a class="header-anchor" href="#package-json" aria-hidden="true">#</a> package.json</h2>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">"dependencies"</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token comment">// 本地普通依赖</span>
    <span class="token property">"qrcode"</span><span class="token operator">:</span> <span class="token string">"^1.4.4"</span> <span class="token comment">// 依赖包qrcode，版本1.4.4，主版本号不变，此版本号和补丁版本可增</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">"devDenpendencies"</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token comment">// 开发依赖</span>
    <span class="token property">"webpack"</span><span class="token operator">:</span> <span class="token string">"^5.0.0"</span> 
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><h2 id="安装" tabindex="-1"><a class="header-anchor" href="#安装" aria-hidden="true">#</a> 安装</h2>
<h3 id="本地安装" tabindex="-1"><a class="header-anchor" href="#本地安装" aria-hidden="true">#</a> 本地安装</h3>
<p>会将包下载到当前命令行所在目录的node_modules中</p>
<p>绝大部分安装都使用本地安装</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 下面的 install 可以替换为 i</span>
<span class="token function">npm</span> <span class="token function">install</span> 包名
<span class="token function">npm</span> <span class="token function">install</span> <span class="token parameter variable">--save</span> 包名
<span class="token function">npm</span> <span class="token function">install</span> 包名@版本号
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>若仅作为开发依赖，则添加参数<code>-D</code></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 下面的 install 可以替换为 i</span>
<span class="token function">npm</span> <span class="token function">install</span> <span class="token parameter variable">-D</span> 包名
<span class="token function">npm</span> <span class="token function">install</span> <span class="token parameter variable">-D</span> 包名@版本号
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>若要还原安装</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 下面的 install 可以替换为 i</span>
<span class="token function">npm</span> <span class="token function">install</span>
<span class="token function">npm</span> <span class="token function">install</span> <span class="token parameter variable">--production</span> <span class="token comment"># 仅还原dependencies中的依赖</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h3 id="全局安装" tabindex="-1"><a class="header-anchor" href="#全局安装" aria-hidden="true">#</a> 全局安装</h3>
<p>会将包下载到一个全局的位置</p>
<p>只有需要使用某个全局命令时，才需要进行全局安装</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 下面的 install 可以替换为 i</span>
<span class="token function">npm</span> <span class="token function">install</span> <span class="token parameter variable">-g</span> 包名
<span class="token function">npm</span> <span class="token function">install</span> <span class="token parameter variable">-g</span> 包名@版本号
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h2 id="卸载" tabindex="-1"><a class="header-anchor" href="#卸载" aria-hidden="true">#</a> 卸载</h2>
<h3 id="本地卸载" tabindex="-1"><a class="header-anchor" href="#本地卸载" aria-hidden="true">#</a> 本地卸载</h3>
<p>卸载本地的安装包</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 下面的 uninstall 均可替换为 un</span>
<span class="token function">npm</span> uninstall 包名
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h3 id="全局卸载" tabindex="-1"><a class="header-anchor" href="#全局卸载" aria-hidden="true">#</a> 全局卸载</h3>
<p>卸载全局的安装包</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 下面的 uninstall 均可替换为 un</span>
<span class="token function">npm</span> uninstall <span class="token parameter variable">-g</span> 包名
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h2 id="查看包信息" tabindex="-1"><a class="header-anchor" href="#查看包信息" aria-hidden="true">#</a> 查看包信息</h2>
<h3 id="查看包所有的版本" tabindex="-1"><a class="header-anchor" href="#查看包所有的版本" aria-hidden="true">#</a> 查看包所有的版本</h3>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># view 可以替换为 v</span>
<span class="token function">npm</span> view 包名 versions
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h2 id="练习1-全局安装练习" tabindex="-1"><a class="header-anchor" href="#练习1-全局安装练习" aria-hidden="true">#</a> 练习1：全局安装练习</h2>
<ol>
<li>全局安装<code>moeda</code></li>
<li>运行命令<code>moeda 1 cny</code>，查看当前人民币汇率</li>
</ol>
<h2 id="练习2-开发流程练习" tabindex="-1"><a class="header-anchor" href="#练习2-开发流程练习" aria-hidden="true">#</a> 练习2：开发流程练习</h2>
<ol>
<li>
<p>创建一个工程，名为<code>qr-shower</code></p>
</li>
<li>
<p>使用git初始化</p>
</li>
<li>
<p>使用npm初始化</p>
</li>
<li>
<p>添加.gitignore文件，内容如下：</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>node_modules
.DS_Store
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div></li>
<li>
<p>git提交：init proj</p>
</li>
<li>
<p>关联并推送到gitee</p>
</li>
<li>
<p>新建<code>index.js</code></p>
</li>
<li>
<p>设置<code>package.json</code>的脚本<code>start</code>，用于运行<code>index.js</code>命令</p>
</li>
<li>
<p>安装<code>qrcode</code></p>
</li>
<li>
<p>编写下面的代码</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">var</span> QRCode <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'qrcode'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

QRCode<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token string">'I am a pony!'</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">'terminal'</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">err<span class="token punctuation">,</span> data</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div></li>
<li>
<p>运行脚本<code>npm start</code>，查看效果</p>
</li>
<li>
<p>开发完成，提交，然后推送到gitee</p>
</li>
<li>
<p>删除本地工程</p>
</li>
<li>
<p>从gitee拉取工程</p>
</li>
<li>
<p>还原依赖</p>
</li>
<li>
<p>重新运行</p>
</li>
</ol>
<h2 id="windows系统下安装-nvm" tabindex="-1"><a class="header-anchor" href="#windows系统下安装-nvm" aria-hidden="true">#</a> Windows系统下安装 nvm</h2>
<p>nvm 全称为 node version manger，顾名思义就是管理 node 版本的一个工具，通过这个工具，我们可以在一台计算机上安装多个版本的 node，并且随时进行无缝的切换。</p>
<p><strong>1.  卸载原本的 node.js</strong></p>
<p>如果之前有安装过 node.js，那么首先我们需要卸载掉之前的安装</p>
<p><strong>2. 下载安装nvm</strong></p>
<p>链接:https://pan.baidu.com/s/1uoxlk8CVNHV2KTCwIGbQMQ?pwd=yi5m</p>
<p>提取码: yi5m</p>
<p><strong>3. 修改nvm源</strong></p>
<p>如果直接用 nvm 命令下载 node 的话，因为源在国外，所以会导致下载失败，所以我们最好修改 nvm 的源</p>
<p>打开 nvm 的下载路径，如果你是一路 next 的，那么一般就在：C:\Users\你现在用的用户名\AppData\Roaming\nvm</p>
<p>打开 setting.txt 文件，在末尾写入：</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>node_mirror: https://npm.taobao.org/mirrors/node/
npm_mirror: https://npm.taobao.org/mirrors/npm/
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p><strong>4. nvm常用命令</strong></p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token comment"># 查看当前安装和使用的 node 版本</span>
nvm list

<span class="token comment"># 安装某个 node 版本</span>
nvm <span class="token function">install</span> 版本号

<span class="token comment"># 切换 node 版本</span>
nvm use 版本号

<span class="token comment"># 设置默认版本</span>
nvm <span class="token builtin class-name">alias</span> v12.22.12
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><p><strong>5. 配置 npm 源</strong></p>
<p>安装 node 之后，一般对应的 npm 也会被安装好，但是默认 npm 的源是指向 npm 官网的，这就导致我们在下载包的时候会很慢。</p>
<p>我们需要修改 npm 的源</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>npm config <span class="token keyword">set</span> registry<span class="token operator">=</span>https<span class="token operator">:</span><span class="token operator">/</span><span class="token operator">/</span>registry<span class="token punctuation">.</span>npm<span class="token punctuation">.</span>taobao<span class="token punctuation">.</span>org
npm config <span class="token keyword">get</span> registry
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div></template>
