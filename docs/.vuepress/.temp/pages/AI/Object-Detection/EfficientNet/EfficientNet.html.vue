<template><h1 id="efficientnet" tabindex="-1"><a class="header-anchor" href="#efficientnet" aria-hidden="true">#</a> EfficientNet</h1>
<h2 id="名词解释" tabindex="-1"><a class="header-anchor" href="#名词解释" aria-hidden="true">#</a> 名词解释</h2>
<h3 id="backbone" tabindex="-1"><a class="header-anchor" href="#backbone" aria-hidden="true">#</a> backbone</h3>
<ol>
<li>
<p>主干网络:
这个主干网络大多时候指的是提取特征的网络，其作用就是提取图片中的信息，供后面的网络使用</p>
</li>
<li>
<p>这些网络经常使用的是resnet VGG等，而不是我们自己设计的网络，因为这些网络已经证明了在分类等问题上的特征提取能力是很强的。在用这些网络作为backbone的时候，都是直接加载官方已经训练好的模型参数，后面接着我们自己的网络。让网络的这两个部分同时进行训练，因为加载的backbone模型已经具有提取特征的能力了，在我们的训练过程中，会对他进行微调，使得其更适合于我们自己的任务。</p>
</li>
</ol>
<h3 id="head" tabindex="-1"><a class="header-anchor" href="#head" aria-hidden="true">#</a> head</h3>
<p>head是获取网络输出内容的网络，利用之前提取的特征，head利用这些特征，做出预测。</p>
<h3 id="neck" tabindex="-1"><a class="header-anchor" href="#neck" aria-hidden="true">#</a> neck</h3>
<p>neck是放在backbone和head之间的，是为了更好的利用backbone提取的特征</p>
<h3 id="bottleneck" tabindex="-1"><a class="header-anchor" href="#bottleneck" aria-hidden="true">#</a> bottleneck</h3>
<p>瓶颈的意思，通常指的是网络输入的数据维度和输出的维度不同，输出的维度比输入的小了许多，就像脖子一样，变细了。经常设置的参数bottle_num=256，指的是网络输出的数据的维度是256 ，可是输入进来的可能是1024维度的。</p>
<h3 id="gap" tabindex="-1"><a class="header-anchor" href="#gap" aria-hidden="true">#</a> GAP</h3>
<p>Global Average Pool全局平均池化，就是将某个通道的特征取平均值，经常使用AdaptativeAvgpoold(1)，在pytorch中，这个代表自适应性全局平均池化</p>
<h3 id="embedding" tabindex="-1"><a class="header-anchor" href="#embedding" aria-hidden="true">#</a> Embedding</h3>
<p>深度学习方法都是利用使用线性和非线性转换对复杂的数据进行自动特征抽取，并将特征表示为“向量”（vector），这一过程一般也称为“嵌入”（embedding）</p>
<h3 id="pretext-downstream-task" tabindex="-1"><a class="header-anchor" href="#pretext-downstream-task" aria-hidden="true">#</a> pretext/downstream task</h3>
<ul>
<li>pretext task：用于预训练的任务被称为前置/代理任务</li>
<li>downstream task：用于微调的任务被称为下游任务</li>
</ul>
<h3 id="temperature-parameters" tabindex="-1"><a class="header-anchor" href="#temperature-parameters" aria-hidden="true">#</a> temperature parameters</h3>
<p>在论文中经常能看到这个温度参数的身影，那么他都有什么用处呢？比如经常看到下面这样的式子：</p>
<p>里面的beta就是temperature parameter，它可以起到平滑softmax输出结果的作用，举例子如下：
<img src="imgs/beta.jpg" alt="beta"></p>
<blockquote>
<p>当beta&gt;1的时候，可以将输出结果变得平滑，当beta&lt;1的时候，可以让输出结果变得差异更大一下，更尖锐一些。如果beta比较大，则分类的crossentropy损失会很大，可以在不同的迭代次数里，使用不同的beta数值，有点类似于学习率的效果。</p>
</blockquote>
<h3 id="end-to-end" tabindex="-1"><a class="header-anchor" href="#end-to-end" aria-hidden="true">#</a> end to end</h3>
<p>端到端：给定一个输入，就能得到一个输出</p>
<h2 id="efficientnet介绍" tabindex="-1"><a class="header-anchor" href="#efficientnet介绍" aria-hidden="true">#</a> EfficientNet介绍</h2>
<h3 id="基本网络架构" tabindex="-1"><a class="header-anchor" href="#基本网络架构" aria-hidden="true">#</a> 基本网络架构</h3>
<p><img src="imgs/efficientNet.jpg" alt="EfficientNet"></p>
<h3 id="流程图" tabindex="-1"><a class="header-anchor" href="#流程图" aria-hidden="true">#</a> 流程图</h3>
<p><img src="imgs/efficient_process.jpg" alt="Efficient Process"></p>
<h3 id="depthwise卷积" tabindex="-1"><a class="header-anchor" href="#depthwise卷积" aria-hidden="true">#</a> Depthwise卷积</h3>
<p>深度可分离卷积：</p>
<h3 id="se模块" tabindex="-1"><a class="header-anchor" href="#se模块" aria-hidden="true">#</a> SE模块</h3>
<p>对每个特征图计算其权重（注意力机制）</p>
<h2 id="efficientdet" tabindex="-1"><a class="header-anchor" href="#efficientdet" aria-hidden="true">#</a> EfficientDet</h2>
<p>整体=EfficientNet + BiFPN</p>
<h3 id="bifpn" tabindex="-1"><a class="header-anchor" href="#bifpn" aria-hidden="true">#</a> BiFPN</h3>
<p><img src="imgs/FPN PAN NAS-FPN BiFPN.jpg" alt="BiFPN"></p>
<h2 id="centernet" tabindex="-1"><a class="header-anchor" href="#centernet" aria-hidden="true">#</a> CenterNet</h2>
<p>物体检测，关键点定位任务都能完成，而且速度很快</p>
<h3 id="与其他经典算法的区别" tabindex="-1"><a class="header-anchor" href="#与其他经典算法的区别" aria-hidden="true">#</a> 与其他经典算法的区别</h3>
<ul>
<li>
<p>一般检测算法都需要预先设置好anchor（框大的大小，长宽比）</p>
</li>
<li>
<p>需要通过比较候选框与GT的IOU来设置正负样本</p>
</li>
<li>
<p>CenterNet可以当作不需要anchor或者单anchor的方法</p>
</li>
</ul>
<ol>
<li>先通过下采样倍率将GT分布到下采样特征图上（512-&gt;128）</li>
<li>利用干死分布将GT分布到特征图中各个点上，如果重叠则取大值</li>
</ol>
<h3 id="反卷积" tabindex="-1"><a class="header-anchor" href="#反卷积" aria-hidden="true">#</a> 反卷积</h3>
<p>上采样常用的两种方法</p>
<ul>
<li>
<p>线性插值</p>
</li>
<li>
<p>反卷积：相当于卷积的逆过程，<code>Y=CX-&gt;X=C^TY</code></p>
</li>
</ul>
</template>
