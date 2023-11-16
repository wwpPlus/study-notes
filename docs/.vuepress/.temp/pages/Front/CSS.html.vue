<template><h1 id="css" tabindex="-1"><a class="header-anchor" href="#css" aria-hidden="true">#</a> CSS</h1>
<h2 id="css-知识点" tabindex="-1"><a class="header-anchor" href="#css-知识点" aria-hidden="true">#</a> CSS 知识点</h2>
<h3 id="选择器" tabindex="-1"><a class="header-anchor" href="#选择器" aria-hidden="true">#</a> 选择器</h3>
<table>
<thead>
<tr>
<th>选择器类型</th>
<th>语法</th>
<th>描述</th>
</tr>
</thead>
<tbody>
<tr>
<td>通用选择器</td>
<td><code>*</code></td>
<td>选择所有元素。可以根据需要限制特定的名称空间或所有名称空间。</td>
</tr>
<tr>
<td>元素选择器</td>
<td><code>elementname</code></td>
<td>按照给定的节点名称选择所有匹配的元素。</td>
</tr>
<tr>
<td>类选择器</td>
<td><code>.classname</code></td>
<td>按照给定的 class 属性的值选择所有匹配的元素。</td>
</tr>
<tr>
<td>ID 选择器</td>
<td><code>#idname</code></td>
<td>按照给定的 id 属性选择一个与之匹配的元素。注意，id 在文档中应唯一。</td>
</tr>
<tr>
<td>属性选择器</td>
<td><code>[attr] [attr=value]</code></td>
<td>选择所有具有指定属性、等于指定值的元素的元素。</td>
</tr>
<tr>
<td>分组选择器</td>
<td><code>A, B </code></td>
<td>将不同的选择器组合在一起，选择被任意一个选择器选中的节点。</td>
</tr>
<tr>
<td>后代组合器</td>
<td><code>A B</code></td>
<td>选择前一个元素的后代节点。</td>
</tr>
<tr>
<td>直接子代组合器</td>
<td><code>A &gt; B</code></td>
<td>选择前一个元素的直接子代节点。</td>
</tr>
<tr>
<td>一般兄弟组合器</td>
<td><code>A ~ B</code></td>
<td>选择共享同一个父节点的兄弟元素，并且后一个节点在前一个节点后面。</td>
</tr>
<tr>
<td>紧邻兄弟组合器</td>
<td><code>A + B</code></td>
<td>选择共享同一个父节点的相邻元素，并且后一个元素紧跟在前一个之后。</td>
</tr>
</tbody>
</table>
<h3 id="伪元素" tabindex="-1"><a class="header-anchor" href="#伪元素" aria-hidden="true">#</a> 伪元素</h3>
<table>
<thead>
<tr>
<th>属性</th>
<th>示例</th>
<th>描述</th>
</tr>
</thead>
<tbody>
<tr>
<td>:link</td>
<td>a:link</td>
<td>选择所有未访问链接</td>
</tr>
<tr>
<td>:visited</td>
<td>a:visited</td>
<td>选择所有访问过的链接</td>
</tr>
<tr>
<td>:active</td>
<td>a:active</td>
<td>选择正在活动链接</td>
</tr>
<tr>
<td>:hover</td>
<td>a:hover</td>
<td>把鼠标放在链接上的状态</td>
</tr>
<tr>
<td>:focus</td>
<td>input:focus</td>
<td>选择元素输入后具有焦点</td>
</tr>
<tr>
<td>:first-letter</td>
<td>p:first-letter</td>
<td>选择每个<code>&lt;p&gt;</code> 元素的第一个字母</td>
</tr>
<tr>
<td>:first-line</td>
<td>p:first-line</td>
<td>选择每个<code>&lt;p&gt;</code> 元素的第一行</td>
</tr>
<tr>
<td>:first-child</td>
<td>p:first-child</td>
<td>选择器匹配属于任意元素的第一个子元素的<code>&lt;p&gt;</code> 元素</td>
</tr>
<tr>
<td>:before</td>
<td>p:before</td>
<td>在每个<code>&lt;p&gt;</code> 元素之前插入内容</td>
</tr>
<tr>
<td>:after</td>
<td>p:after</td>
<td>在每个<code>&lt;p&gt;</code> 元素之后插入内容</td>
</tr>
<tr>
<td>:lang(language)</td>
<td>p:lang(it)</td>
<td>为<code>&lt;p&gt;</code> 元素的 lang 属性选择一个开始值</td>
</tr>
</tbody>
</table>
<h3 id="层叠" tabindex="-1"><a class="header-anchor" href="#层叠" aria-hidden="true">#</a> 层叠</h3>
<p>声明冲突：同一个样式，多次应用到同一个元素</p>
<p>层叠：解决声明冲突的过程，浏览器自动处理（权重计算）</p>
<p>比较重要性，重要性从高到底：</p>
<blockquote>
<p>作者样式表：开发者书写的样式</p>
</blockquote>
<ol>
<li>作者样式表中的!important 样式</li>
<li>作者样式表中的普通样式</li>
<li>浏览器默认样式表中的样式</li>
</ol>
<p><strong>应用</strong></p>
<ol>
<li>重置样式表</li>
</ol>
<p>书写一些作者样式，覆盖浏览器的默认样式</p>
<p>重置样式表 -&gt; 浏览器的默认样式</p>
<p>常见的重置样式表：normalize.css、reset.css、meyer.css</p>
<ol start="2">
<li>爱恨法则</li>
</ol>
<p>link &gt; visited &gt; hover &gt; active</p>
<h3 id="继承" tabindex="-1"><a class="header-anchor" href="#继承" aria-hidden="true">#</a> 继承</h3>
<p>子元素会继承父元素的某些 CSS 属性</p>
<p>通常，跟文字内容相关的属性都能被继承</p>
<h3 id="属性值的计算过程" tabindex="-1"><a class="header-anchor" href="#属性值的计算过程" aria-hidden="true">#</a> 属性值的计算过程</h3>
<p>一个元素一个元素依次渲染，顺序按照页面文档的树形目录结构进行</p>
<p>渲染每个元素的前提条件：该元素的所有 CSS 属性必须有值</p>
<p>特殊的两个 CSS 取值：</p>
<ul>
<li>inherit：手动（强制）继承，将父元素的值取出应用到该元素</li>
<li>initial：初始值，将该属性设置为默认值</li>
</ul>
<h3 id="盒模型" tabindex="-1"><a class="header-anchor" href="#盒模型" aria-hidden="true">#</a> 盒模型</h3>
<p>box：盒子，每个元素在页面中都会生成一个矩形区域（盒子）</p>
<p>盒子类型：</p>
<ol>
<li>行盒，display 等于 inline 的元素</li>
<li>块盒，display 等于 block 的元素</li>
</ol>
<p>行盒在页面中不换行、块盒独占一行</p>
<p>display 默认值为 inline</p>
<p>浏览器默认样式表设置的块盒：容器元素、h1~h6、p</p>
<p>常见的行盒：span、a、img、video、audio</p>
<h4 id="盒子的组成部分" tabindex="-1"><a class="header-anchor" href="#盒子的组成部分" aria-hidden="true">#</a> 盒子的组成部分</h4>
<p>无论是行盒、还是块盒，都由下面几个部分组成，从内到外分别是：</p>
<ol>
<li>内容 content</li>
</ol>
<p>width、height，设置的是盒子内容的宽高</p>
<p>内容部分通常叫做整个盒子的<strong>内容盒 content-box</strong></p>
<ol start="2">
<li>填充(内边距) padding</li>
</ol>
<p>盒子边框到盒子内容的距离</p>
<p>padding-left、padding-right、padding-top、padding-bottom</p>
<p>padding: 简写属性</p>
<p>padding: 上 右 下 左</p>
<p>填充区+内容区 = <strong>填充盒 padding-box</strong></p>
<ol start="3">
<li>边框 border</li>
</ol>
<p>边框 = 边框样式 + 边框宽度 + 边框颜色</p>
<p>边框样式：border-style
边框宽度：border-width
边框颜色：border-color</p>
<p>边框+填充区+内容区 = <strong>边框盒 border-box</strong></p>
<ol start="4">
<li>外边距 margin</li>
</ol>
<h3 id="盒模型应用" tabindex="-1"><a class="header-anchor" href="#盒模型应用" aria-hidden="true">#</a> 盒模型应用</h3>
<h4 id="改变宽高范围" tabindex="-1"><a class="header-anchor" href="#改变宽高范围" aria-hidden="true">#</a> 改变宽高范围</h4>
<p>默认情况下，width 和 height 设置的是内容盒宽高。</p>
<blockquote>
<p>页面重构师：将 psd 文件（设计稿）制作为静态页面</p>
</blockquote>
<p>衡量设计稿尺寸的时候，往往使用的是边框盒，但设置 width 和 height，则设置的是内容盒</p>
<ol>
<li>精确计算</li>
<li>CSS3：box-sizing</li>
</ol>
<h4 id="改变背景覆盖范围" tabindex="-1"><a class="header-anchor" href="#改变背景覆盖范围" aria-hidden="true">#</a> 改变背景覆盖范围</h4>
<p>默认情况下，背景覆盖边框盒</p>
<p>可以通过 background-clip 进行修改</p>
<h4 id="溢出处理" tabindex="-1"><a class="header-anchor" href="#溢出处理" aria-hidden="true">#</a> 溢出处理</h4>
<p>overflow，控制内容溢出边框盒后的处理方式</p>
<h4 id="断词规则" tabindex="-1"><a class="header-anchor" href="#断词规则" aria-hidden="true">#</a> 断词规则</h4>
<p>word-break，会影响文字在什么位置被截断换行</p>
<p>normal：普通。CJK 字符（文字位置截断），非 CJK 字符（单词位置截断）</p>
<p>break-all：截断所有。所有字符都在文字处截断</p>
<p>keep-all：保持所有。所有文字都在单词之间截断</p>
<h4 id="空白处理" tabindex="-1"><a class="header-anchor" href="#空白处理" aria-hidden="true">#</a> 空白处理</h4>
<p>white-space: nowrap</p>
<h3 id="行盒的盒模型" tabindex="-1"><a class="header-anchor" href="#行盒的盒模型" aria-hidden="true">#</a> 行盒的盒模型</h3>
<p>常见的行盒：包含具体内容的元素</p>
<p>span、strong、em、i、img、video、audio</p>
<h4 id="显著特点" tabindex="-1"><a class="header-anchor" href="#显著特点" aria-hidden="true">#</a> 显著特点</h4>
<ol>
<li>盒子沿着内容沿伸</li>
<li>行盒不能设置宽高</li>
</ol>
<p>调整行盒的宽高，应该使用字体大小、行高、字体类型，间接调整。</p>
<ol start="3">
<li>内边距（填充区）</li>
</ol>
<p>水平方向有效，垂直方向不会实际占据空间。</p>
<ol start="4">
<li>边框</li>
</ol>
<p>水平方向有效，垂直方向不会实际占据空间。</p>
<ol start="5">
<li>外边距</li>
</ol>
<p>水平方向有效，垂直方向不会实际占据空间。</p>
<h4 id="行块盒" tabindex="-1"><a class="header-anchor" href="#行块盒" aria-hidden="true">#</a> 行块盒</h4>
<p>display：inline-block 的盒子</p>
<ol>
<li>不独占一行</li>
<li>盒模型中所有尺寸都有效</li>
</ol>
<h4 id="空白折叠" tabindex="-1"><a class="header-anchor" href="#空白折叠" aria-hidden="true">#</a> 空白折叠</h4>
<p>空白折叠，发生在行盒（行块盒）内部 或 行盒（行块盒）之间</p>
<h4 id="可替换元素-和-非可替换元素" tabindex="-1"><a class="header-anchor" href="#可替换元素-和-非可替换元素" aria-hidden="true">#</a> 可替换元素 和 非可替换元素</h4>
<p>大部分元素，页面上显示的结果，取决于元素内容，称为<strong>非可替换元素</strong></p>
<p>少部分元素，页面上显示的结果，取决于元素属性，称为<strong>可替换元素</strong></p>
<p>可替换元素：img、video、audio</p>
<p>绝大部分可替换元素均为行盒。</p>
<p>可替换元素类似于行块盒，盒模型中所有尺寸都有效。</p>
<h3 id="常规流" tabindex="-1"><a class="header-anchor" href="#常规流" aria-hidden="true">#</a> 常规流</h3>
<p>盒模型：规定单个盒子的规则</p>
<p>视觉格式化模型（布局规则）：页面中的多个盒子排列规则</p>
<p>视觉格式化模型，大体上将页面中盒子的排列分为三种方式：</p>
<ol>
<li>常规流</li>
<li>浮动</li>
<li>定位</li>
</ol>
<h4 id="常规流布局" tabindex="-1"><a class="header-anchor" href="#常规流布局" aria-hidden="true">#</a> 常规流布局</h4>
<p>常规流、文档流、普通文档流、常规文档流</p>
<p>所有元素，默认情况下，都属于常规流布局</p>
<p>总体规则：块盒独占一行，行盒水平依次排列</p>
<p>包含块（containing block）：每个盒子都有它的包含块，包含块决定了盒子的排列区域。</p>
<p>绝大部分情况下：盒子的包含块，为其父元素的内容盒</p>
<p><strong>块盒</strong></p>
<ol>
<li>每个块盒的总宽度，必须刚好等于包含块的宽度</li>
</ol>
<p>宽度的默认值是 auto</p>
<p>margin 的取值也可以是 auto，默认值 0</p>
<p>auto：将剩余空间吸收掉</p>
<p>width 吸收能力强于 margin</p>
<p>若宽度、边框、内边距、外边距计算后，仍然有剩余空间，该剩余空间被 margin-right 全部吸收</p>
<p>在常规流中，块盒在其包含快中居中，可以定宽、然后左右 margin 设置为 auto。</p>
<ol start="2">
<li>每个块盒垂直方向上的 auto 值</li>
</ol>
<p>height:auto， 适应内容的高度</p>
<p>margin:auto， 表示 0</p>
<ol start="3">
<li>百分比取值</li>
</ol>
<p>padding、宽、margin 可以取值为百分比</p>
<p>以上的所有百分比相对于包含块的宽度。</p>
<p>高度的百分比：</p>
<p>1）. 包含块的高度是否取决于子元素的高度，设置百分比无效
2）. 包含块的高度不取决于子元素的高度，百分比相对于父元素高度</p>
<ol start="4">
<li>上下外边距的合并</li>
</ol>
<p>两个常规流块盒，上下外边距相邻，会进行合并。</p>
<p>两个外边距取最大值。</p>
<h3 id="浮动" tabindex="-1"><a class="header-anchor" href="#浮动" aria-hidden="true">#</a> 浮动</h3>
<p>视觉格式化模型，大体上将页面中盒子的排列分为三种方式：</p>
<ol>
<li>常规流</li>
<li>浮动</li>
<li>定位</li>
</ol>
<h4 id="应用场景" tabindex="-1"><a class="header-anchor" href="#应用场景" aria-hidden="true">#</a> 应用场景</h4>
<ol>
<li>文字环绕</li>
<li>横向排列</li>
</ol>
<h4 id="浮动的基本特点" tabindex="-1"><a class="header-anchor" href="#浮动的基本特点" aria-hidden="true">#</a> 浮动的基本特点</h4>
<p>修改 float 属性值为：</p>
<ul>
<li>left：左浮动，元素靠上靠左</li>
<li>right：右浮动，元素靠上靠右</li>
</ul>
<p>默认值为 none</p>
<ol>
<li>当一个元素浮动后，元素必定为块盒(更改 display 属性为 block)</li>
<li>浮动元素的包含块，和常规流一样，为父元素的内容盒</li>
</ol>
<h4 id="盒子尺寸" tabindex="-1"><a class="header-anchor" href="#盒子尺寸" aria-hidden="true">#</a> 盒子尺寸</h4>
<ol>
<li>宽度为 auto 时，适应内容宽度</li>
<li>高度为 auto 时，与常规流一致，适应内容的高度</li>
<li>margin 为 auto，为 0.</li>
<li>边框、内边距、百分比设置与常规流一样</li>
</ol>
<h4 id="盒子排列" tabindex="-1"><a class="header-anchor" href="#盒子排列" aria-hidden="true">#</a> 盒子排列</h4>
<ol>
<li>左浮动的盒子靠上靠左排列</li>
<li>右浮动的盒子考上靠右排列</li>
<li>浮动盒子在包含块中排列时，会避开常规流块盒</li>
<li>常规流块盒在排列时，无视浮动盒子</li>
<li>行盒在排列时，会避开浮动盒子</li>
<li>外边距合并不会发生</li>
</ol>
<blockquote>
<p>如果文字没有在行盒中，浏览器会自动生成一个行盒包裹文字，该行盒叫做匿名行盒。</p>
</blockquote>
<h4 id="高度坍塌" tabindex="-1"><a class="header-anchor" href="#高度坍塌" aria-hidden="true">#</a> 高度坍塌</h4>
<p>高度坍塌的根源：常规流盒子的自动高度，在计算时，不会考虑浮动盒子</p>
<p>清除浮动，涉及 css 属性：clear</p>
<ul>
<li>默认值：none</li>
<li>left：清除左浮动，该元素必须出现在前面所有左浮动盒子的下方</li>
<li>right：清除右浮动，该元素必须出现在前面所有右浮动盒子的下方</li>
<li>both：清除左右浮动，该元素必须出现在前面所有浮动盒子的下方</li>
</ul>
<h3 id="定位" tabindex="-1"><a class="header-anchor" href="#定位" aria-hidden="true">#</a> 定位</h3>
<p>视觉格式化模型，大体上将页面中盒子的排列分为三种方式：</p>
<ol>
<li>常规流</li>
<li>浮动：float</li>
<li>定位：position</li>
</ol>
<p>定位：手动控制元素在包含块中的精准位置</p>
<p>涉及的 CSS 属性：position</p>
<h4 id="position-属性" tabindex="-1"><a class="header-anchor" href="#position-属性" aria-hidden="true">#</a> position 属性</h4>
<ul>
<li>默认值：static，静态定位（不定位）</li>
<li>relative：相对定位</li>
<li>absolute：绝对定位</li>
<li>fixed：固定定位</li>
</ul>
<p>一个元素，只要 position 的取值不是 static，认为该元素是一个定位元素。</p>
<p>定位元素会脱离文档流（相对定位除外）</p>
<p>一个脱离了文档流的元素：</p>
<ol>
<li>文档流中的元素摆放时，会忽略脱离了文档流的元素</li>
<li>文档流中元素计算自动高度时，会忽略脱离了文档流的元素</li>
</ol>
<h4 id="相对定位" tabindex="-1"><a class="header-anchor" href="#相对定位" aria-hidden="true">#</a> 相对定位</h4>
<p>不会导致元素脱离文档流，只是让元素在原来位置上进行偏移。</p>
<p>可以通过四个 CSS 属性对设置其位置：</p>
<ul>
<li>left</li>
<li>right</li>
<li>top</li>
<li>bottom</li>
</ul>
<p>盒子的偏移不会对其他盒子造成任何影响。</p>
<h4 id="绝对定位" tabindex="-1"><a class="header-anchor" href="#绝对定位" aria-hidden="true">#</a> 绝对定位</h4>
<ol>
<li>宽高为 auto，适应内容</li>
<li>包含块变化：找祖先中第一个定位元素，该元素的填充盒为其包含块。若找不到，则它的包含块为整个网页（初始化包含块）</li>
</ol>
<h4 id="固定定位" tabindex="-1"><a class="header-anchor" href="#固定定位" aria-hidden="true">#</a> 固定定位</h4>
<p>其他情况和绝对定位完全一样。</p>
<p>包含块不同：固定为视口（浏览器的可视窗口）</p>
<h4 id="定位下的居中" tabindex="-1"><a class="header-anchor" href="#定位下的居中" aria-hidden="true">#</a> 定位下的居中</h4>
<p>某个方向居中：</p>
<ol>
<li>定宽（高）</li>
<li>将左右（上下）距离设置为 0</li>
<li>将左右（上下）margin 设置为 auto</li>
</ol>
<p>绝对定位和固定定位中，margin 为 auto 时，会自动吸收剩余空间</p>
<h4 id="多个定位元素重叠时" tabindex="-1"><a class="header-anchor" href="#多个定位元素重叠时" aria-hidden="true">#</a> 多个定位元素重叠时</h4>
<p>堆叠上下文</p>
<p>设置 z-index，通常情况下，该值越大，越靠近用户</p>
<p>只有定位元素设置 z-index 有效</p>
<p>z-index 可以是负数，如果是负数，则遇到常规流、浮动元素，则会被其覆盖</p>
<h4 id="补充" tabindex="-1"><a class="header-anchor" href="#补充" aria-hidden="true">#</a> 补充</h4>
<ul>
<li>绝对定位、固定定位元素一定是块盒</li>
<li>绝对定位、固定定位元素一定不是浮动</li>
<li>没有外边距合并</li>
</ul>
<h3 id="更多的样式" tabindex="-1"><a class="header-anchor" href="#更多的样式" aria-hidden="true">#</a> 更多的样式</h3>
<h4 id="透明度" tabindex="-1"><a class="header-anchor" href="#透明度" aria-hidden="true">#</a> 透明度</h4>
<ol>
<li>opacity，它设置的是整个元素的透明，它的取值是 0 ~ 1</li>
<li>在颜色位置设置 alpha 通道(rgba )</li>
</ol>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">.alpha</span> <span class="token punctuation">{</span>
  <span class="token comment">/* 一个完全透明的颜色，等同于 transparent */</span>
  <span class="token property">color</span><span class="token punctuation">:</span> <span class="token function">rgba</span><span class="token punctuation">(</span>0<span class="token punctuation">,</span> 0<span class="token punctuation">,</span> 0<span class="token punctuation">,</span> 0<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">/* 一个完全不透明的颜色，等同于rgb */</span>
  <span class="token property">color</span><span class="token punctuation">:</span> <span class="token function">rgba</span><span class="token punctuation">(</span>0<span class="token punctuation">,</span> 0<span class="token punctuation">,</span> 0<span class="token punctuation">,</span> 1<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token comment">/* 一个半透明的颜色 */</span>
  <span class="token property">color</span><span class="token punctuation">:</span> <span class="token function">rgba</span><span class="token punctuation">(</span>0<span class="token punctuation">,</span> 0<span class="token punctuation">,</span> 0<span class="token punctuation">,</span> 0.5<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><h4 id="鼠标" tabindex="-1"><a class="header-anchor" href="#鼠标" aria-hidden="true">#</a> 鼠标</h4>
<p>使用 cursor 设置</p>
<h4 id="盒子隐藏" tabindex="-1"><a class="header-anchor" href="#盒子隐藏" aria-hidden="true">#</a> 盒子隐藏</h4>
<ol>
<li>display:none，不生成盒子</li>
<li>visibility:hidden，生成盒子，只是从视觉上移除盒子，盒子仍然占据空间。</li>
</ol>
<h4 id="背景图" tabindex="-1"><a class="header-anchor" href="#背景图" aria-hidden="true">#</a> 背景图</h4>
<h5 id="和-img-元素的区别" tabindex="-1"><a class="header-anchor" href="#和-img-元素的区别" aria-hidden="true">#</a> 和 img 元素的区别</h5>
<p>img 元素是属于 HTML 的概念</p>
<p>背景图属于 css 的概念</p>
<ol>
<li>当图片属于网页内容时，必须使用 img 元素</li>
<li>当图片仅用于美化页面时，必须使用背景图</li>
</ol>
<h5 id="涉及的-css-属性" tabindex="-1"><a class="header-anchor" href="#涉及的-css-属性" aria-hidden="true">#</a> 涉及的 css 属性</h5>
<ol>
<li>
<p>background-image</p>
</li>
<li>
<p>background-repeat</p>
</li>
</ol>
<p>默认情况下，背景图会在横坐标和纵坐标中进行重复</p>
<ol start="3">
<li>background-size</li>
</ol>
<p>预设值：contain、cover，类似于 object-fit
数值或百分比</p>
<ol start="4">
<li>background-position</li>
</ol>
<p>设置背景图的位置。</p>
<p>预设值：left、bottom、right、top、center</p>
<p>数值或百分比</p>
<p><strong>雪碧图（精灵图）（spirit）</strong></p>
<p>CSS Sprite，一般称为雪碧图或精灵图，它是一种图像拼合技术。该方法是将小图标和背景图像合并到一张图片上，然后利用 css 的背景定位来显示需要显示的图片部分。
雪碧图的使用有以下几个优点：</p>
<ol>
<li>减少图片的字节。</li>
<li>减少网页的 http 请求，从而大大的提高页面的性能。</li>
<li>解决了网页设计师在图片命名上的困扰，只需对一张集合的图片上命名就可以了，不需要对每一个小元素进行命名，从而提高了网页的制作效率。</li>
<li>更换风格方便，只需要在一张或少张图片上修改图片的颜色或样式，整个网页的风格就可以改变。维护起来更加方便。</li>
</ol>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>语法：background<span class="token operator">-</span>position<span class="token operator">:</span>npx npx<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>第一个值是调左右的，当你需要将背景图向右调的时候用正值，向左则为负值 同理将背景图上下调动的时候上是用负值，下是正值
<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-07-24-120427.png" alt="img" style="zoom:50%;" /></p>
<p>通过设置 background-position 属性，来调整背景图的位置
<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-07-24-121034.png" alt="image-20210724201034428" style="zoom:50%;" /></p>
<ol start="5">
<li>background-attachment</li>
</ol>
<p>通常用它控制背景图是否固定。</p>
<ol start="6">
<li>
<p>背景图和背景颜色混用</p>
</li>
<li>
<p>速写（简写）background</p>
</li>
</ol>
<h3 id="居中总结" tabindex="-1"><a class="header-anchor" href="#居中总结" aria-hidden="true">#</a> 居中总结</h3>
<p>居中：盒子在其包含块中居中</p>
<h4 id="行盒-行块盒-水平居中" tabindex="-1"><a class="header-anchor" href="#行盒-行块盒-水平居中" aria-hidden="true">#</a> 行盒（行块盒）水平居中</h4>
<p>直接设置行盒（行块盒）父元素<code>text-align:center</code></p>
<h4 id="常规流块盒水平居中" tabindex="-1"><a class="header-anchor" href="#常规流块盒水平居中" aria-hidden="true">#</a> 常规流块盒水平居中</h4>
<p>定宽，设置左右 margin 为 auto</p>
<h4 id="绝对定位元素的水平居中" tabindex="-1"><a class="header-anchor" href="#绝对定位元素的水平居中" aria-hidden="true">#</a> 绝对定位元素的水平居中</h4>
<p>定宽，设置左右的坐标为 0（left:0, right:0），将左右 margin 设置为 auto</p>
<blockquote>
<p>实际上，固定定位（fixed）是绝对定位（absolute）的特殊情况</p>
</blockquote>
<h4 id="单行文本的垂直居中" tabindex="-1"><a class="header-anchor" href="#单行文本的垂直居中" aria-hidden="true">#</a> 单行文本的垂直居中</h4>
<p>设置文本所在元素的行高，为整个区域的高度</p>
<h4 id="行块盒或块盒内多行文本的垂直居中" tabindex="-1"><a class="header-anchor" href="#行块盒或块盒内多行文本的垂直居中" aria-hidden="true">#</a> 行块盒或块盒内多行文本的垂直居中</h4>
<p>没有完美方案</p>
<p>设置盒子上下内边距相同，达到类似的效果。</p>
<h4 id="绝对定位的垂直居中" tabindex="-1"><a class="header-anchor" href="#绝对定位的垂直居中" aria-hidden="true">#</a> 绝对定位的垂直居中</h4>
<p>定高，设置上下的坐标为 0（top:0, bottom:0），将上下 margin 设置为 auto</p>
<h3 id="display-块和内联元素" tabindex="-1"><a class="header-anchor" href="#display-块和内联元素" aria-hidden="true">#</a> Display - 块和内联元素</h3>
<p>块元素是一个元素，占用了全部宽度，在前后都是换行符。</p>
<p>块元素的例子：<code>&lt;h1&gt; &lt;p&gt; &lt;div&gt;</code></p>
<p>内联元素只需要必要的宽度，不强制换行。
内联元素的例子：<code>&lt;span&gt; &lt;a&gt;</code></p>
<h3 id="position-定位" tabindex="-1"><a class="header-anchor" href="#position-定位" aria-hidden="true">#</a> Position(定位)</h3>
<table>
<thead>
<tr>
<th>属性</th>
<th>描述</th>
</tr>
</thead>
<tbody>
<tr>
<td>static</td>
<td>HTML 元素的默认值，即没有定位，遵循正常的文档流对象。静态定位的元素不会受到 top, bottom, left, right 影响。</td>
</tr>
<tr>
<td>relative</td>
<td>相对定位元素的定位是相对其正常位置。</td>
</tr>
<tr>
<td>fixed</td>
<td>元素的位置相对于浏览器窗口是固定位置。即使窗口是滚动的它也不会移动。</td>
</tr>
<tr>
<td>absolute</td>
<td>绝对定位的元素的位置相对于最近的已定位父元素，如果元素没有已定位的父元素，那么它的位置相对于<code>&lt;html&gt;</code>。</td>
</tr>
<tr>
<td>sticky</td>
<td>基于用户的滚动位置来定位。</td>
</tr>
<tr>
<td>z-index</td>
<td>属性指定了一个元素的堆叠顺序。</td>
</tr>
</tbody>
</table>
<h3 id="overflow" tabindex="-1"><a class="header-anchor" href="#overflow" aria-hidden="true">#</a> Overflow</h3>
<table>
<thead>
<tr>
<th>属性</th>
<th>描述</th>
</tr>
</thead>
<tbody>
<tr>
<td>visible</td>
<td>默认值。内容不会被修剪，会呈现在元素框之外。</td>
</tr>
<tr>
<td>hidden</td>
<td>内容会被修剪，并且其余内容是不可见的。</td>
</tr>
<tr>
<td>scroll</td>
<td>内容会被修剪，但是浏览器会显示滚动条以便查看其余的内容。</td>
</tr>
<tr>
<td>auto</td>
<td>如果内容被修剪，则浏览器会显示滚动条以便查看其余的内容。</td>
</tr>
<tr>
<td>inherit</td>
<td>规定应该从父元素继承 overflow 属性的值。</td>
</tr>
</tbody>
</table>
<h3 id="float-浮动" tabindex="-1"><a class="header-anchor" href="#float-浮动" aria-hidden="true">#</a> Float(浮动)</h3>
<p>CSS 的 Float（浮动），会使元素向左或向右移动，其周围的元素也会重新排列。</p>
<h3 id="布局-水平-垂直对齐" tabindex="-1"><a class="header-anchor" href="#布局-水平-垂直对齐" aria-hidden="true">#</a> 布局 - 水平 &amp; 垂直对齐</h3>
<p>direction 属性</p>
<ul>
<li>ltr：默认。文本方向从左到右。</li>
<li>rtl：文本方向从右到左。</li>
<li>inherit：规定应该从父元素继承 direction 属性的值。</li>
</ul>
<p>width(宽) + padding(内边距) + border(边框) = 元素实际宽度
height(高) + padding(内边距) + border(边框) = 元素实际高度</p>
<p>元素居中对齐，要水平居中对齐一个元素(如 <code>&lt;div&gt;</code>), 可以使用 <code>margin: auto;</code>。</p>
<blockquote>
<p>当使用 <code>position</code> 来对齐元素时, 通常 <code>&lt;body&gt;</code> 元素会设置 margin 和 padding 。 这样可以避免在不同的浏览器中出现可见的差异。</p>
<p>如果子元素的高度大于父元素，且子元素设置了浮动，那么子元素将溢出，这时候你可以使用 &quot;<code>clearfix</code>(清除浮动)&quot; 来解决该问题。</p>
</blockquote>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">.clearfix::after</span> <span class="token punctuation">{</span>
  <span class="token property">content</span><span class="token punctuation">:</span> <span class="token string">""</span><span class="token punctuation">;</span>
  <span class="token property">display</span><span class="token punctuation">:</span> block<span class="token punctuation">;</span>
  <span class="token property">clear</span><span class="token punctuation">:</span> both<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h3 id="图像" tabindex="-1"><a class="header-anchor" href="#图像" aria-hidden="true">#</a> 图像</h3>
<p>图像透明度：<code>opacity:0.4;</code></p>
<h3 id="important-规则" tabindex="-1"><a class="header-anchor" href="#important-规则" aria-hidden="true">#</a> !important 规则</h3>
<p>使用一个 !important 规则时，此声明将覆盖任何其他声明。</p>
<h3 id="实例" tabindex="-1"><a class="header-anchor" href="#实例" aria-hidden="true">#</a> 实例</h3>
<p><a href="https://www.runoob.com/css/css-examples.html" target="_blank" rel="noopener noreferrer">https://www.runoob.com/css/css-examples.html<ExternalLinkIcon/></a></p>
<h2 id="css3" tabindex="-1"><a class="header-anchor" href="#css3" aria-hidden="true">#</a> CSS3</h2>
<h3 id="布局" tabindex="-1"><a class="header-anchor" href="#布局" aria-hidden="true">#</a> 布局</h3>
<p><img src="http://mdrs.yuanjin.tech/img/20210511102802.png" alt="image-20210511102549096"></p>
<p><strong>浮动</strong>：做文字环绕效果</p>
<p><strong>弹性盒</strong>：单行或单列布局</p>
<p><strong>网格</strong>：多行多列布局</p>
<h4 id="弹性盒" tabindex="-1"><a class="header-anchor" href="#弹性盒" aria-hidden="true">#</a> 弹性盒</h4>
<blockquote>
<p>详细文档见<a href="https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Flexible_Box_Layout" target="_blank" rel="noopener noreferrer">MDN<ExternalLinkIcon/></a></p>
<p><a href="https://flexboxfroggy.com/" target="_blank" rel="noopener noreferrer">弹性盒小游戏<ExternalLinkIcon/></a></p>
</blockquote>
<h5 id="生成弹性容器和弹性项目" tabindex="-1"><a class="header-anchor" href="#生成弹性容器和弹性项目" aria-hidden="true">#</a> 生成弹性容器和弹性项目</h5>
<p><img src="http://mdrs.yuanjin.tech/img/20210511112624.png" alt="image-20210511112624876"></p>
<p>**默认情况下，**弹性项目沿着主轴依次排列，侧轴拉伸</p>
<h5 id="更改方向" tabindex="-1"><a class="header-anchor" href="#更改方向" aria-hidden="true">#</a> 更改方向</h5>
<p>通过<code>flex-direction</code>可更改主轴方向</p>
<p><img src="http://mdrs.yuanjin.tech/img/20210511112510.png" alt="image-20210511112510632"></p>
<h5 id="主轴排列" tabindex="-1"><a class="header-anchor" href="#主轴排列" aria-hidden="true">#</a> 主轴排列</h5>
<p>通过<code>justify-content</code>属性，可以影响主轴的排列方式</p>
<p><img src="http://mdrs.yuanjin.tech/img/20210511113617.png" alt="image-20210511113617325"></p>
<h5 id="侧轴排列" tabindex="-1"><a class="header-anchor" href="#侧轴排列" aria-hidden="true">#</a> 侧轴排列</h5>
<p>通过<code>align-items</code>属性，可以影响侧轴的排列方式</p>
<p><img src="http://mdrs.yuanjin.tech/img/20210511114016.png" alt="image-20210511114016304"></p>
<h5 id="弹性项目伸缩" tabindex="-1"><a class="header-anchor" href="#弹性项目伸缩" aria-hidden="true">#</a> 弹性项目伸缩</h5>
<p>所谓伸缩，是指在<strong>主轴方向</strong>上，当<strong>弹性容器</strong>有<strong>额外空间</strong>时，是否需要拉伸，当<strong>空间不足</strong>时，是否需要<strong>压缩</strong></p>
<p>在<strong>弹性项目</strong>上使用<code>flex</code>属性，可设置拉伸和压缩比例：<code>flex: 拉伸比例 压缩比例 初始尺寸</code></p>
<p>拉伸示例：</p>
<p><img src="http://mdrs.yuanjin.tech/img/20210511120916.png" alt="image-20210511120916571"></p>
<p>压缩示例：</p>
<p><img src="http://mdrs.yuanjin.tech/img/20210511121459.png" alt="image-20210511121459341"></p>
<p>默认情况下，<code>flex: 0 1 auto</code></p>
<h5 id="主轴换行" tabindex="-1"><a class="header-anchor" href="#主轴换行" aria-hidden="true">#</a> 主轴换行</h5>
<p>默认情况，当主轴剩余空间不足时，按照压缩比例进行压缩，但如果设置了主轴换行，则不会压缩，直接换行显示</p>
<p>给<strong>弹性容器</strong>设置<code>flex-wrap: wrap</code>，即可主轴换行</p>
<img src="http://mdrs.yuanjin.tech/img/20210511123310.png" alt="image-20210511123310673" style="zoom:50%;" />
<blockquote>
<p>尽管如此，多行多列仍然推荐使用网格布局</p>
</blockquote>
<h4 id="网格" tabindex="-1"><a class="header-anchor" href="#网格" aria-hidden="true">#</a> 网格</h4>
<blockquote>
<p><a href="https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Grid_Layout" target="_blank" rel="noopener noreferrer">MDN 详细文档<ExternalLinkIcon/></a></p>
<p><a href="http://www.ruanyifeng.com/blog/2019/03/grid-layout-tutorial.html" target="_blank" rel="noopener noreferrer">阮一峰网格布局教程<ExternalLinkIcon/></a></p>
<p><a href="https://cssgridgarden.com/" target="_blank" rel="noopener noreferrer">网格布局小游戏<ExternalLinkIcon/></a></p>
</blockquote>
<p><strong>网格布局是多行多列布局的终极解决方案</strong></p>
<h5 id="生成网格布局" tabindex="-1"><a class="header-anchor" href="#生成网格布局" aria-hidden="true">#</a> 生成网格布局</h5>
<img src="http://mdrs.yuanjin.tech/img/20210511165317.png" alt="image-20210511165317363" style="zoom:50%;" />
<p>容器生成网格布局后，其所有子元素为<strong>网格项目</strong></p>
<h5 id="定义行和列" tabindex="-1"><a class="header-anchor" href="#定义行和列" aria-hidden="true">#</a> 定义行和列</h5>
<p><code>grid-template-rows</code>：定义行</p>
<p><code>grid-template-columns</code>：定义列</p>
<p><strong>它们的语法是相同的</strong></p>
<p><img src="http://mdrs.yuanjin.tech/img/20210511172305.png" alt="image-20210511172305100"></p>
<h5 id="改变排列方向" tabindex="-1"><a class="header-anchor" href="#改变排列方向" aria-hidden="true">#</a> 改变排列方向</h5>
<p>使用属性<code>grid-auto-flow: column</code>，可使子元素按列排放</p>
<img src="http://mdrs.yuanjin.tech/img/20210511173447.png" alt="image-20210511173447321" style="zoom:50%;" />
<h5 id="单元格之间的间隙" tabindex="-1"><a class="header-anchor" href="#单元格之间的间隙" aria-hidden="true">#</a> 单元格之间的间隙</h5>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token property">row-gap</span><span class="token punctuation">:</span> 10px<span class="token punctuation">;</span> <span class="token comment">/* 行间隙为10px */</span>
<span class="token property">column-gap</span><span class="token punctuation">:</span> 20px<span class="token punctuation">;</span> <span class="token comment">/* 列间隙为20px */</span>
<span class="token property">gap</span><span class="token punctuation">:</span> 10px 20px<span class="token punctuation">;</span> <span class="token comment">/* 行间隙为10px，列间隙为20px */</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p><img src="http://mdrs.yuanjin.tech/img/20210512132025.png" alt="image-20210512132025687"></p>
<h5 id="单元格内部的对齐" tabindex="-1"><a class="header-anchor" href="#单元格内部的对齐" aria-hidden="true">#</a> 单元格内部的对齐</h5>
<p>默认情况下，网格项目在单元格内部水平和垂直拉伸，以撑满单元格</p>
<p>可以使用属性<code>justify-items</code>设置<strong>水平方向</strong>的排列方式</p>
<p>可以使用属性<code>align-items</code>设置<strong>垂直方向</strong>的排列方式</p>
<p>它们的可取值是相同的：</p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token property">justify-items</span><span class="token punctuation">:</span> start 左 | end 右 | center 中 | stretch 拉伸<span class="token punctuation">;</span>
<span class="token property">align-items</span><span class="token punctuation">:</span> start 上 | end 下 | center 中 | stretch 拉伸<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><img src="http://mdrs.yuanjin.tech/img/20210511174450.png" alt="image-20210511174450356" style="zoom:50%;" />
<p>可以使用速写属性<code>place-items: 垂直对齐方式 水平对齐方式</code>同时设置这两个值</p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token property">place-items</span><span class="token punctuation">:</span> start center<span class="token punctuation">;</span> <span class="token comment">/* 垂直靠上，水平居中 */</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><h5 id="网格项目定位" tabindex="-1"><a class="header-anchor" href="#网格项目定位" aria-hidden="true">#</a> 网格项目定位</h5>
<p>默认情况下，网格项目依次排列到单元格中，每个网格占据一个单元格</p>
<p>但可以对网格项目设置<code>grid-area</code>属性来改变这一行为</p>
<p>使用方式为：</p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token property">grid-area</span><span class="token punctuation">:</span> 起始行线编号/起始列线编号/结束行线编号/结束列线编号<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><img src="http://mdrs.yuanjin.tech/img/20210511180028.png" alt="image-20210511180027983" style="zoom:50%;" />
<h3 id="视觉" tabindex="-1"><a class="header-anchor" href="#视觉" aria-hidden="true">#</a> 视觉</h3>
<blockquote>
<p>所谓视觉类样式，是指不影响盒子位置、尺寸的样式，例如文字颜色、背景颜色、背景图片等</p>
</blockquote>
<h4 id="阴影" tabindex="-1"><a class="header-anchor" href="#阴影" aria-hidden="true">#</a> 阴影</h4>
<h5 id="盒子阴影" tabindex="-1"><a class="header-anchor" href="#盒子阴影" aria-hidden="true">#</a> 盒子阴影</h5>
<blockquote>
<p><a href="https://developer.mozilla.org/zh-CN/docs/Web/CSS/box-shadow" target="_blank" rel="noopener noreferrer">MDN 详细文档<ExternalLinkIcon/></a></p>
</blockquote>
<p>通过<code>box-shadow</code>属性可以设置整个盒子的阴影</p>
<p>下面是一些示例</p>
<div class="language-iframe ext-iframe line-numbers-mode"><pre v-pre class="language-iframe"><code>height=&quot;900&quot;
width=&quot;100%&quot;
scrolling=&quot;no&quot;
title=&quot;box-shadow&quot;
src=&quot;http://mdrs.yuanjin.tech/html/css-manual/box-shadow.html?v=2&quot;
frameborder=&quot;no&quot;
loading=&quot;lazy&quot;
allowtransparency=&quot;true&quot;
allowfullscreen=&quot;true&quot;
textContent=&quot;See the Pen&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><!-- <iframe src="http://mdrs.yuanjin.tech/html/css-manual/box-shadow.html?v=2" style="height:900px;"> -->
<h5 id="文字阴影" tabindex="-1"><a class="header-anchor" href="#文字阴影" aria-hidden="true">#</a> 文字阴影</h5>
<blockquote>
<p><a href="https://developer.mozilla.org/zh-CN/docs/Web/CSS/text-shadow" target="_blank" rel="noopener noreferrer">MDN 详细文档<ExternalLinkIcon/></a></p>
</blockquote>
<p>通过<code>text-shadow</code>可以设置文字阴影</p>
<p>下面是一些示例</p>
<div class="language-iframe ext-iframe line-numbers-mode"><pre v-pre class="language-iframe"><code>height=&quot;500&quot;
width=&quot;100%&quot;
scrolling=&quot;no&quot;
title=&quot;text-shadow&quot;
src=&quot;http://mdrs.yuanjin.tech/html/css-manual/text-shadow.html?v=3&quot;
frameborder=&quot;no&quot;
loading=&quot;lazy&quot;
allowtransparency=&quot;true&quot;
allowfullscreen=&quot;true&quot;
textContent=&quot;See the Pen&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><!-- <iframe src="http://mdrs.yuanjin.tech/html/css-manual/text-shadow.html?v=3" style="height:500px;"> -->
<h4 id="圆角" tabindex="-1"><a class="header-anchor" href="#圆角" aria-hidden="true">#</a> 圆角</h4>
<blockquote>
<p><a href="https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-radius" target="_blank" rel="noopener noreferrer">MDN 详细文档<ExternalLinkIcon/></a></p>
</blockquote>
<p>通过设置<code>border-radius</code>，可以设置盒子的圆角</p>
<p><img src="http://mdrs.yuanjin.tech/img/20210512131026.png" alt="image-20210512131026084"></p>
<p><code>border-radius</code>可以有很多灵活的用法，将下面的代码依次粘贴到页面中测试一下</p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token property">border-radius</span><span class="token punctuation">:</span> 10px<span class="token punctuation">;</span> <span class="token comment">/* 同时设置4个角的圆角，半径为10px */</span>
<span class="token property">border-radius</span><span class="token punctuation">:</span> 50%<span class="token punctuation">;</span> <span class="token comment">/* 同时设置4个角的圆角，圆的横向半径为宽度一半，纵向半径为高度一半 */</span>
<span class="token property">border-radius</span><span class="token punctuation">:</span> 10px 20px 30px 40px<span class="token punctuation">;</span> <span class="token comment">/* 分别设置左上、右上、右下、左下的圆角 */</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><div class="language-iframe ext-iframe line-numbers-mode"><pre v-pre class="language-iframe"><code>height=&quot;550&quot;
width=&quot;100%&quot;
scrolling=&quot;no&quot;
title=&quot;border-radius&quot;
src=&quot;http://mdrs.yuanjin.tech/html/css-manual/border-raduis.html?v=5&quot;
frameborder=&quot;no&quot;
loading=&quot;lazy&quot;
allowtransparency=&quot;true&quot;
allowfullscreen=&quot;true&quot;
textContent=&quot;See the Pen&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><!-- <iframe src="http://mdrs.yuanjin.tech/html/css-manual/border-raduis.html?v=5" style="height:550px;"> -->
<h4 id="背景渐变" tabindex="-1"><a class="header-anchor" href="#背景渐变" aria-hidden="true">#</a> 背景渐变</h4>
<blockquote>
<p><a href="https://developer.mozilla.org/zh-CN/docs/Web/CSS/linear-gradient()" target="_blank" rel="noopener noreferrer">MDN 详细文档<ExternalLinkIcon/></a></p>
</blockquote>
<p>在设置<strong>背景图片</strong>时，除了可以使用<code>url()</code>加载一张背景图，还可以使用<code>linear-gradient()</code>函数设置背景渐变</p>
<p><code>linear-gradient()</code>用于创建一张渐变的图片，语法为：</p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token comment">/* 设置渐变背景，方向：从上到下，颜色：从#e66465渐变到#9198e5 */</span>
<span class="token property">background</span><span class="token punctuation">:</span> <span class="token function">linear-gradient</span><span class="token punctuation">(</span>to bottom<span class="token punctuation">,</span> #e66465<span class="token punctuation">,</span> #9198e5<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p><img src="http://mdrs.yuanjin.tech/img/20210512135028.png" alt="image-20210512135024676"></p>
<h4 id="变形" tabindex="-1"><a class="header-anchor" href="#变形" aria-hidden="true">#</a> 变形</h4>
<blockquote>
<p><a href="https://developer.mozilla.org/zh-CN/docs/Web/CSS/transform" target="_blank" rel="noopener noreferrer">MDN 详细文档<ExternalLinkIcon/></a></p>
</blockquote>
<p>通过<code>transform</code>属性，可以使盒子的形态发生变化</p>
<p>该属性支持多种变形方案，常见的有:</p>
<ul>
<li>translate，平移</li>
<li>scale，缩放</li>
<li>rotate，旋转</li>
</ul>
<p><strong>无论是哪一种 transform，都只是视觉效果的变化，不会影响盒子的布局</strong></p>
<p><strong>transform 不会导致浏览器 reflow 和 rerender，因此效率极高</strong></p>
<h5 id="translate-平移" tabindex="-1"><a class="header-anchor" href="#translate-平移" aria-hidden="true">#</a> translate 平移</h5>
<p>使用<code>translate</code>可以让盒子在原来位置上产生位移，类似于相对定位</p>
<p><img src="http://mdrs.yuanjin.tech/img/20210512140643.png" alt="image-20210512140622630"></p>
<h5 id="scale-缩放" tabindex="-1"><a class="header-anchor" href="#scale-缩放" aria-hidden="true">#</a> scale 缩放</h5>
<p>使用<code>translate</code>可以让盒子在基于原来的尺寸发生缩放</p>
<p><img src="http://mdrs.yuanjin.tech/img/20210512141500.png" alt="image-20210512141500499"></p>
<h5 id="rotate-旋转" tabindex="-1"><a class="header-anchor" href="#rotate-旋转" aria-hidden="true">#</a> rotate 旋转</h5>
<p>使用<code>rotate</code>属性可以在原图基础上进行旋转</p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token comment">/* 在原图的基础上，顺时针旋转45度角 */</span>
<span class="token property">transform</span><span class="token punctuation">:</span> <span class="token function">rotate</span><span class="token punctuation">(</span>45deg<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">/* 在原图的基础上，顺时针旋转半圈 */</span>
<span class="token property">transform</span><span class="token punctuation">:</span> <span class="token function">rotate</span><span class="token punctuation">(</span>0.5turn<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>可以点击下面的按钮试一下旋转效果</p>
<div class="language-iframe ext-iframe line-numbers-mode"><pre v-pre class="language-iframe"><code>height=&quot;400&quot;
width=&quot;100%&quot;
scrolling=&quot;no&quot;
title=&quot;transform&quot;
src=&quot;http://mdrs.yuanjin.tech/html/css-manual/rotate.html&quot;
frameborder=&quot;no&quot;
loading=&quot;lazy&quot;
allowtransparency=&quot;true&quot;
allowfullscreen=&quot;true&quot;
textContent=&quot;See the Pen&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><!-- <iframe src="http://mdrs.yuanjin.tech/html/css-manual/rotate.html" style="height:400px;"> -->
<h5 id="改变变形原点" tabindex="-1"><a class="header-anchor" href="#改变变形原点" aria-hidden="true">#</a> 改变变形原点</h5>
<blockquote>
<p><a href="https://developer.mozilla.org/zh-CN/docs/Web/CSS/transform-origin" target="_blank" rel="noopener noreferrer">MDN 详细文档<ExternalLinkIcon/></a></p>
</blockquote>
<p>变形原点的位置，会影响到具体的变形行为</p>
<p>默认情况下，变形的原点在盒子中心，你可以通过<code>transform-origin</code>来改变它</p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token property">transform-origin</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span> <span class="token comment">/* 设置原点在盒子中心 */</span>
<span class="token property">transform-origin</span><span class="token punctuation">:</span> left top<span class="token punctuation">;</span> <span class="token comment">/* 设置原点在盒子左上角 */</span>
<span class="token property">transform-origin</span><span class="token punctuation">:</span> right bottom<span class="token punctuation">;</span> <span class="token comment">/* 设置原点在盒子右下角 */</span>
<span class="token property">transform-origin</span><span class="token punctuation">:</span> 30px 60px<span class="token punctuation">;</span> <span class="token comment">/* 设置原点在盒子坐标 (30, 60) 位置 */</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>试一试，先点击设置原点的按钮来设置原点(已在图片中使用红色小点标记)，然后点击变形按钮进行变形</p>
<div class="language-iframe ext-iframe line-numbers-mode"><pre v-pre class="language-iframe"><code>height=&quot;600&quot;
width=&quot;100%&quot;
scrolling=&quot;no&quot;
title=&quot;transform-origin&quot;
src=&quot;http://mdrs.yuanjin.tech/html/css-manual/transform-origin.html?v2&quot;
frameborder=&quot;no&quot;
loading=&quot;lazy&quot;
allowtransparency=&quot;true&quot;
allowfullscreen=&quot;true&quot;
textContent=&quot;See the Pen&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><!-- <iframe src="http://mdrs.yuanjin.tech/html/css-manual/transform-origin.html?v2" style="height:600px;"> -->
<h5 id="多种变形叠加" tabindex="-1"><a class="header-anchor" href="#多种变形叠加" aria-hidden="true">#</a> 多种变形叠加</h5>
<p>可以一次性设置多种变形效果</p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token comment">/* 先旋转45度，再平移(100,100) */</span>
<span class="token property">transform</span><span class="token punctuation">:</span> <span class="token function">rotate</span><span class="token punctuation">(</span>45deg<span class="token punctuation">)</span> <span class="token function">translate</span><span class="token punctuation">(</span>100px<span class="token punctuation">,</span> 100px<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">/* 先平移(100, 100)，再旋转45度 */</span>
<span class="token property">transform</span><span class="token punctuation">:</span> <span class="token function">translate</span><span class="token punctuation">(</span>100px<span class="token punctuation">,</span> 100px<span class="token punctuation">)</span> <span class="token function">rotate</span><span class="token punctuation">(</span>45deg<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>注意：旋转会导致坐标系也跟着旋转，从而可能影响到后续的变形效果</p>
<p>下面的例子可以很好的说明这一点</p>
<p>http://mdrs.yuanjin.tech/html/css-manual/multi-transform.html</p>
<blockquote>
<p>本来打算把这个效果嵌入到 markdown，但由于嵌入后出现一些未知的 bug，因此只能粘贴效果地址了</p>
</blockquote>
<h3 id="过渡和动画" tabindex="-1"><a class="header-anchor" href="#过渡和动画" aria-hidden="true">#</a> 过渡和动画</h3>
<p>使用过渡和动画，可以让 css 属性变化更加丝滑</p>
<p><strong>过渡和动画无法对所有的 CSS 属性产生影响，能够产生影响的只有数值类属性</strong>，例如：颜色、宽高、字体大小等等</p>
<h4 id="过渡" tabindex="-1"><a class="header-anchor" href="#过渡" aria-hidden="true">#</a> 过渡</h4>
<blockquote>
<p><a href="https://developer.mozilla.org/zh-CN/docs/Web/CSS/transition" target="_blank" rel="noopener noreferrer">MDN 详细文档<ExternalLinkIcon/></a></p>
</blockquote>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token property">transition</span><span class="token punctuation">:</span> 过渡属性 持续时间 过渡函数 过渡延迟<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><ul>
<li>
<p><strong>过渡属性</strong></p>
<p>针对哪个 css 属性应用过渡。例如填写<code>transform</code>，则表示仅针对<strong>transform</strong>属性应用过渡。</p>
<p>若填写<code>all</code>或不填写，则表示针对所有 css 属性都应用过渡</p>
</li>
<li>
<p><strong>持续时间</strong></p>
<p>css 属性变化所持续的时间，需要带上单位。例如<code>3s</code>表示 3 秒，<code>0.5s</code>或<code>500ms</code>均表示 500 毫秒</p>
</li>
<li>
<p><strong>过渡函数</strong></p>
<p>本质是 css 属性变化的贝塞尔曲线函数，通常直接使用预设值：</p>
<p><code>ease-in-out</code>：平滑开始，平滑结束</p>
<p><code>linear</code>：线性变化</p>
<p><code>ease-in</code>：仅平滑开始</p>
<p><code>ease-out</code>：仅平滑结束</p>
</li>
<li>
<p><strong>过渡延迟</strong></p>
<p>书写规则和持续时间一样，表示过渡效果延迟多久后触发，不填则无延迟</p>
</li>
</ul>
<p><strong>在 JS 中，可以监听元素的<code>transitionstart</code>和<code>transitionend</code>事件，从而在过渡开始和过渡结束时做一些别的事情</strong></p>
<h4 id="动画" tabindex="-1"><a class="header-anchor" href="#动画" aria-hidden="true">#</a> 动画</h4>
<blockquote>
<p><a href="https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Animations" target="_blank" rel="noopener noreferrer">MDN 详细文档<ExternalLinkIcon/></a></p>
</blockquote>
<p><strong>动画的本质是预先定义的一套 css 变化规则，然后给该规则取个名字</strong></p>
<p><img src="http://mdrs.yuanjin.tech/img/20210513172902.png" alt="image-20210513172902413"></p>
<p>然后，其他元素即可使用这样的规则：</p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token property">animation</span><span class="token punctuation">:</span> 规则名 持续时间<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>在应用规则时，还可以指定更多的信息</p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token property">animation</span><span class="token punctuation">:</span> 规则名 持续时间 重复次数 时间函数 动画方向 延迟时间<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>一些细节：</p>
<ul>
<li>定义规则时，<code>0%</code>可以书写为<code>from</code></li>
<li>定义规则时，<code>100%</code>可以书写为<code>to</code></li>
<li>重复次数为<code>infinite</code>时，表示无限重复</li>
<li>动画方向为<code>alternate</code>时，表示交替反向，第 1 次正向，第 2 次反向，第 3 次正向，第 4 次方向，以此类推</li>
</ul>
<p><strong>在 JS 中，可以监听元素的<code>animationstart</code>和<code>animationnend</code>事件，从而在过渡开始和过渡结束时做一些别的事情</strong></p>
<h3 id="其他" tabindex="-1"><a class="header-anchor" href="#其他" aria-hidden="true">#</a> 其他</h3>
<h4 id="box-sizing" tabindex="-1"><a class="header-anchor" href="#box-sizing" aria-hidden="true">#</a> box-sizing</h4>
<p>一图胜千言</p>
<p><img src="http://mdrs.yuanjin.tech/img/20210514150015.png" alt="image-20210514150015660"></p>
<p>使用<code>border-box</code>控制尺寸更加直观，因此，很多网站都会加入下面的代码</p>
<div class="language-css ext-css line-numbers-mode"><pre v-pre class="language-css"><code><span class="token selector">*</span> <span class="token punctuation">{</span>
  <span class="token property">margin</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">padding</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
  <span class="token property">box-sizing</span><span class="token punctuation">:</span> border-box<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h4 id="字体图标" tabindex="-1"><a class="header-anchor" href="#字体图标" aria-hidden="true">#</a> 字体图标</h4>
<blockquote>
<p><a href="https://developer.mozilla.org/zh-CN/docs/Web/CSS/@font-face" target="_blank" rel="noopener noreferrer">MDN font-face 指令<ExternalLinkIcon/></a></p>
</blockquote>
<p>css3 新增了<code>font-face</code>指令，该指令可以让我们加载网络字体</p>
<p>其最常见的应用就是字体图标</p>
<p><strong>字体图标本质上是文字，即通过<code>color</code>设置颜色，通过<code>font-size</code>设置尺寸</strong></p>
<p>国内使用最多的字体图标平台是<a href="https://www.iconfont.cn/" target="_blank" rel="noopener noreferrer">阿里巴巴矢量图标库<ExternalLinkIcon/></a></p>
<p>登录平台后即可免费使用其所有字体图标</p>
<h4 id="图像内容适应" tabindex="-1"><a class="header-anchor" href="#图像内容适应" aria-hidden="true">#</a> 图像内容适应</h4>
<blockquote>
<p><a href="https://developer.mozilla.org/zh-CN/docs/Web/CSS/object-fit" target="_blank" rel="noopener noreferrer">MDN 详细文档<ExternalLinkIcon/></a></p>
</blockquote>
<p>css3 属性<code>object-fit</code>可以控制<strong>多媒体内容和与元素</strong>的适应方式，通常应用在<code>img</code>或<code>video</code>元素中</p>
<p>一图胜千言</p>
<p>下图中的所有<code>img</code>元素均被固定了宽高，溢出 img 的部分实际上均不会显示</p>
<p><img src="http://mdrs.yuanjin.tech/img/20210514134908.png" alt="image-20210514134908778"></p>
<h4 id="视口单位" tabindex="-1"><a class="header-anchor" href="#视口单位" aria-hidden="true">#</a> 视口单位</h4>
<p>css3 支持使用<code>vw</code>和<code>vh</code>作为单位，分别表示<code>视口宽度</code>和<code>视口高度</code></p>
<p>例如<code>1vh</code>表示视口高度的<code>1%</code>，<code>100vw</code>表示视口宽度的<code>100%</code></p>
<h4 id="伪元素选择器" tabindex="-1"><a class="header-anchor" href="#伪元素选择器" aria-hidden="true">#</a> 伪元素选择器</h4>
<p>通过<code>::before</code>和<code>::after</code>选择器，可以通过 css 给元素生成两个子元素</p>
<img src="http://mdrs.yuanjin.tech/img/20210514140049.png" alt="image-20210514140049244" style="zoom:50%;" />
<p>使用伪元素可以避免在 HTML 中使用过多的空元素</p>
<p><strong>伪元素必须要有<code>content</code>属性，否则不能生效，如果不需要有元素内容，设置<code>content:''</code></strong></p>
<h4 id="平滑滚动" tabindex="-1"><a class="header-anchor" href="#平滑滚动" aria-hidden="true">#</a> 平滑滚动</h4>
<blockquote>
<p><a href="https://developer.mozilla.org/zh-CN/docs/Web/CSS/scroll-behavior" target="_blank" rel="noopener noreferrer">MDN 详细文档<ExternalLinkIcon/></a></p>
</blockquote>
<p>使用<code>scroll-behavior: smooth</code>，可以让滚动更加丝滑</p>
<p>参见 MDN 效果即可</p>
</template>
