<template><h1 id="colossal简介" tabindex="-1"><a class="header-anchor" href="#colossal简介" aria-hidden="true">#</a> Colossal简介</h1>
<h2 id="分布式训练" tabindex="-1"><a class="header-anchor" href="#分布式训练" aria-hidden="true">#</a> 分布式训练</h2>
<h3 id="为什么需要分布式训练" tabindex="-1"><a class="header-anchor" href="#为什么需要分布式训练" aria-hidden="true">#</a> 为什么需要分布式训练</h3>
<ul>
<li>模型规模迅速增加：与较小的模型相比，超大型模型通常能提供更优越的性能。</li>
</ul>
<p><img src="imgs/model_parameters.jpg" alt="模型与参数量"></p>
<ul>
<li>
<p>数据集规模迅速增加</p>
</li>
<li>
<p>计算能力越来越强：GPU是深度学习最常见的算力资源，GPU计算能力的提升使得我们能够更快地执行计算密
集型任务。</p>
</li>
</ul>
<h3 id="分布式训练的基本概念" tabindex="-1"><a class="header-anchor" href="#分布式训练的基本概念" aria-hidden="true">#</a> 分布式训练的基本概念</h3>
<p>分布式训练需要多台机器/GPU。在训练期间，这些设备之间会有通信。</p>
<ul>
<li>
<p>host: 主机(host)是通信网络中的主要设备。在初始化分布式环境时，经常需要它作为一个参数。</p>
</li>
<li>
<p>port: 这里的端口(port)主要是指主机上用于通信的主端口。</p>
</li>
<li>
<p>rank: 在网络中赋予设备的唯一ID。</p>
</li>
<li>
<p>world size: 网络中设备的数量。</p>
</li>
<li>
<p>process group: 进程组(process group)是一个通信网络，包括设备的一个子集。总是有一个默认的进程组，它包含所有的设备。一个子集的设备可以形成一个进程组，以便它们只在组内的设备之间进行通信。</p>
</li>
</ul>
<p>假设有2台机器（也称为节点），每台机器有4个GPU。当在这两台机器上初始化分布式环境时，基本上启动了8个进程（每台机器上有4个进程），每个进程被绑定到一个 GPU 上。</p>
<p><img src="imgs/distributed systems.jpg" alt="分布式系统"></p>
<p>可以创建一个新的进程组。这个新的进程组可以包含任何进程的子集。</p>
<p>在进程组中，各进程可以通过两种方式进行通信。</p>
<ul>
<li>peer-to-peer: 一个进程向另一个进程发送数据。</li>
<li>collective: 一组进程一起执行分散、聚集、all-reduce、广播等操作。</li>
</ul>
<p><img src="imgs/Collective communication.jpg" alt="Collective communication"></p>
<h2 id="关键技术-异构训练再升级" tabindex="-1"><a class="header-anchor" href="#关键技术-异构训练再升级" aria-hidden="true">#</a> 关键技术：异构训练再升级</h2>
<p>使用单张消费级显卡训练 AI 大模型的最大困难在于显存容量极其有限，严重限制了可容纳的模型参数量。</p>
<ul>
<li>
<p>微软 DeepSpeed 提出的 ZeRO-offload 方法，ZeRO-Offload 是一种通过将数据和计算从 GPU 卸载到 CPU，以此减少神经网络训练期间 GPU 内存占用的方法，该方法提供了更高的训练吞吐量，并避免了移动数据和在 CPU 上执行计算导致的减速问题。</p>
</li>
<li>
<p>但如下图左边所示，当 GPU 内存不足以满足其相应的模型数据要求时，即使当时 CPU 上仍有可用内存，系统也会崩溃。</p>
</li>
</ul>
<p><img src="imgs/ZeRO-offload.jpg" alt="ZeRO-offload"></p>
<ul>
<li>
<p>Colossal-AI 团队从头搭建了如 ZeRO 等核心关键技术，并针对 DeepSpeed 在 CPU 和 GPU 内存之间仅使用静态划分模型数据、对不同训练配置使用固定内存布局等问题做了诸多改进，进一步挖掘高效的 GPU 与 CPU 内存高效协同方案</p>
</li>
<li>
<p>Colossal-AI 设计的 Gemini，就像双子星一样，高效管理和利用 GPU 与 CPU 的异构内存，让张量在训练过程中动态分布在 CPU-GPU 的存储空间内，从而让模型训练突破 GPU 的内存墙。</p>
</li>
<li>
<p>利用深度学习网络训练过程的迭代特性，按迭代次数将训练分为 warmup 和 non-warmup 两个阶段。在初期 warmup 阶段，监测内存信息；在 non-warmup 阶段利用已收集的信息来高效移动张量，以达到最小化 CPU-GPU 数据移动的目的。</p>
<ul>
<li>
<p>在大型网络训练初期，我们需要用较小的学习率先学n个step，能够防止一开始的时候模型对遇到的新数据过拟合，以改善后面的收敛效果，这个过程就是warmup（模型预热策略）</p>
</li>
<li>
<p>warmup：有助于减缓模型在初始阶段对mini-batch的提前过拟合现象，保持分布的平稳,有助于保持模型深层的稳定性</p>
</li>
</ul>
</li>
</ul>
<p><img src="imgs/warmup_to_non-warmup.jpg" alt="warmup_to_non-warmup"></p>
<p>其中非模型的内存使用量其实难以获取，因为非模型数据的生存周期并不归用户管理，现有的深度学习框架没有暴露非模型数据的追踪接口给用户。其次，CUDA context 等非框架开销也需要统计。</p>
<p>Colossal-AI 通过采样方式在 warmup 阶段获得 CPU 和 GPU 内存的使用情况。非模型数据的使用可以通过统计两个时刻之间系统最大内存使用 - 模型内存使用获得。模型的内存使用情况可以通过查询内存管理器得知，如下图黑色实线所示。</p>
<p><img src="imgs/sampling_warmup_cpu_gpu.jpg" alt="sampling_warmup_cpu_gpu"></p>
<p>而所有模型数据张量则交给内存管理器管理，每个张量标记一个状态信息，包括 HOLD，COMPUTE，FREE 等。并根据动态查询到的内存使用情况，不断动态转换张量状态，调整张量位置，最终实现对 GPU 显存和 CPU 内存的高效利用，实现在硬件极其有限的情况下，最大化模型容量和平衡训练速度，对于 AI 民主化和低成本微调大模型下游任务等意义巨大。</p>
<h2 id="模型训练优化方案" tabindex="-1"><a class="header-anchor" href="#模型训练优化方案" aria-hidden="true">#</a> 模型训练优化方案</h2>
<h3 id="便捷高效并行扩展-多gpu" tabindex="-1"><a class="header-anchor" href="#便捷高效并行扩展-多gpu" aria-hidden="true">#</a> 便捷高效并行扩展（多GPU）</h3>
<p>Colossal-AI 通过高效多维并行和异构并行等技术，让用户仅需极少量修改，即可高效快速部署 AI 大模型训练。</p>
<p>例如对于 GPT-3 这样的超大 AI 模型，相比英伟达方案，Colossal-AI 仅需一半的计算资源，即可启动训练；若使用相同计算资源，则能提速 11%，可降低 GPT-3 训练成本超百万美元。</p>
<ol>
<li>
<p>数据并行：将数据集分割成几个碎片，每个碎片被分配到一个设备上。这相当于沿批次维度对训练过程进行并行化。每个设备将持有一个完整的模型副本，并在分配的数据集碎片上进行训练。在反向传播之后，模型的梯度将被全部减少，以便在不同设备上的模型参数能够保持同步。</p>
</li>
<li>
<p>模型并行：在数据并行训练中，由于每个 GPU 持有整个模型权重的副本。这就会出现冗余问题。另一种并行模式是模型并行，即模型被分割并分布在一个设备阵列上。通常有两种类型的并行：张量并行和流水线并行。</p>
<ul>
<li>
<p>张量并行训练是将一个张量沿特定维度分成 N 块，每个设备只持有整个张量的 1/N，同时不影响计算图的正确性。这需要额外的通信来确保结果的正确性。</p>
</li>
<li>
<p>流水线并行是在各层之间进行并行计算。模型按层分割成若干块，每块都交给一个设备。在前向传递过程中，每个设备将中间的激活传递给下一个阶段。在后向传递过程中，每个设备将输入张量的梯度传回给前一个流水线阶段。这允许设备同时进行计算，并增加了训练的吞吐量。流水线并行训练的一个缺点是，会有一些设备参与计算的冒泡时间，导致计算资源的浪费。</p>
</li>
</ul>
</li>
<li>
<p>优化器相关的并行：目前这种并行最流行的方法是 ZeRO，即零冗余优化器。 ZeRO 在三个层面上工作，以消除内存冗余（ZeRO需要进行fp16训练）。</p>
<ul>
<li>
<p>优化器状态在各进程中被划分。</p>
</li>
<li>
<p>用于更新模型权重的32位梯度也被划分，因此每个进程只存储与其优化器状态划分相对应的梯度。</p>
</li>
<li>
<p>16位模型参数在各进程中被划分。</p>
</li>
</ul>
</li>
<li>
<p>异构系统的并行：依靠 CPU 甚至是 NVMe 磁盘来训练大型模型。主要的想法是，在不使用张量时，将其卸载回 CPU 内存或 NVMe 磁盘。通过使用异构系统架构，有可能在一台机器上容纳一个巨大的模型。</p>
</li>
</ol>
<p><img src="imgs/Parallelism of heterogeneous systems.jpg" alt="Parallelism of heterogeneous systems"></p>
<h3 id="其他优化方案" tabindex="-1"><a class="header-anchor" href="#其他优化方案" aria-hidden="true">#</a> 其他优化方案</h3>
<ul>
<li>
<p>自动混合精度训练 (AMP)：自动混合精度训练是混合 FP16 和 FP32 训练。</p>
<ul>
<li>半精度浮点格式（FP16）具有较低的算法复杂度和较高的计算效率。此外，FP16 仅需要 FP32 所需的一半存储空间，并节省了内存和网络带宽，从而为大 batch size 和大模型提供了更多内存。然而，还有其他操作，如缩减，需要 FP32 的动态范围，以避免数值溢出/下溢。因此，引入自动混合精度，尝试将每个操作与其相应的数据类型相匹配，这可以减少内存占用并提高训练效率。</li>
</ul>
</li>
</ul>
<p><img src="imgs/AMP.jpg" alt="AMP"></p>
<ul>
<li>
<p>梯度累积：梯度累积是一种常见的增大训练 batch size 的方式。 在训练大模型时，内存经常会成为瓶颈，并且 batch size 通常会很小（如2），这导致收敛性无法保证。梯度累积将多次迭代的梯度累加，并仅在达到预设迭代次数时更新参数。</p>
<ul>
<li>在 Colossal-AI 中使用梯度累积，仅需在 config中配置期望梯度累积的次数。<code>gradient_accumulation = 8</code></li>
</ul>
</li>
<li>
<p>梯度裁剪：为了加快训练过程和寻求全局最优以获得更好的性能，通过控制学习率来调整训练中的下降速度。这使得梯度向量在每一步都能更好地统一。在这种情况下，下降速度可以按预期被控制。 因此，梯度裁剪，一种可以将梯度向量归一化，以将其限制在统一长度的技术。</p>
<ul>
<li>
<p>要使用梯度裁剪，只需在配置文件中添加梯度裁剪范数即可。<code>clip_grad_norm = 1.0</code></p>
</li>
<li>
<p>每个 GPU 只拥有线性层中权重的一部分参数。为了得到线性层权重的梯度向量的正确范数，每个 GPU 中的每个梯度向量的范数应该相加。更复杂的是，偏置的分布不同于权重的分布。通信组在求和运算中有所不同。</p>
</li>
</ul>
</li>
</ul>
<p><img src="imgs/parameter distribution.jpg" alt="Parameter distribution"></p>
<ul>
<li>
<p>基于Chunk内存管理的零冗余优化器 (ZeRO)：零冗余优化器 (ZeRO) 通过对三个模型状态（优化器状态、梯度和参数）进行划分而不是复制他们，消除了数据并行进程中的内存冗余。该方法与传统的数据并行相比，内存效率得到了极大的提高，而计算粒度和通信效率得到了保留。</p>
<ol>
<li>
<p>分片优化器状态: 优化器状态 (如 Adam optimizer, 32位的权重, 以及一二阶动量估计) 被划分到各个进程中, 因此每个进程只更新其分区。</p>
</li>
<li>
<p>分片梯度: 在梯度在数据并行进程组内进行 reduction 后, 梯度张量也被划分，这样每个进程只存储与其划分的优化器状态对应的梯度。 注意, Colossal-AI 将梯度转换为 FP32 格式以参与更新参数。</p>
</li>
<li>
<p>分片参数: 16位的模型参数被划分到一个数据并行组的进程中。</p>
</li>
<li>
<p>Gemini: 对于参数、梯度、优化器状态的动态异构内存空间管理器。</p>
</li>
</ol>
</li>
</ul>
<p>在使用零冗余优化器 (ZeRO)时，通过切分参数的方式对模型进行分布式存储，这种方法的优点是每个节点的内存负载是完全均衡的。但是这种方式有很多缺点。首先，通信时需要申请一块临时内存用来通信，通信完毕释放，这回导致存在内存碎片化的问题。其次，以Tensor为粒度进行通信，会导致网络带宽无法充分利用。通常来说传输的消息长度越长带宽利用率越高。</p>
<p>利用Colossal-AI v0.1.8引入了Chunk机制，可以提升ZeRO的性能。通过将运算顺序上连续的一组参数存入一个Chunk中（Chunk即一段连续的内存空间），每个Chunk的大小相同。Chunk方式组织内存可以保证PCI-e和GPU-GPU之间网络带宽的高效利用，减小了通信次数，同时避免潜在的内存碎片。</p>
<p>Colossal-AI提供了轻量级的Chunk搜索机制，帮助用户自动找到内存碎片最小的Chunk尺寸。</p>
<ul>
<li>
<p>NVMe offload：GPU显存限制了我们可以训练的模型规模，这称为GPU显存墙。如果我们将优化器状态 offload 到磁盘，就可以突破 GPU 内存墙。</p>
<ul>
<li>
<p>NVMe的全称是Non-Volatile Memory Express，翻译过来就是非易失性内存主机控制器接口规范</p>
</li>
<li>
<p>Colossal-AI 实现了一个用户友好且高效的异步 Tensor I/O 库：TensorNVMe。有了这个库，我们可以简单地实现 NVMe offload。</p>
</li>
</ul>
</li>
</ul>
<blockquote>
<p>该库与各种磁盘（HDD、SATA SSD 和 NVMe SSD）兼容。由于 HDD 或 SATA SSD 的 I/O 带宽较低，建议仅在 NVMe 磁盘上使用此库。</p>
<p>NVMe协议本质是上建立了多个计算机与存储设备的通路，从而提高读写数据的速度。在NVMe协议中，多个通路其实就是多个队列。在SATA中计算机与存储设备只能有一个队列，即使是多CPU情况下，所有请求只能经过这样一个狭窄的道路。而NVMe协议可以最多有64K个队列，每个CPU或者核心都可以有一个队列，这样并发程度大大提升，性能也就更高了。</p>
</blockquote>
<ul>
<li>
<p>ColoTensor是 ColossalAI 中张量的基本数据结构。 它是 torch.Tensor 的子类，可以当做 PyTorch Tensor使用，ColoTensor 包含额外的属性ColoTensorSpec 来描述张量的payload分布和计算模式</p>
<ul>
<li>
<p>ProcessGroup：如何将进程组织为通信组。</p>
<ul>
<li>ProcessGroup 类的一个实例描述了如何在进程组中组织进程。进程组内的进程可以一起参与同一个集合通信，比如allgather, allreduce等。进程组组织方式被张量的并行策略支配。</li>
<li>ColoTensor 的一个进程组由 tp_degree 和 dp_degree 两种配置定义</li>
</ul>
</li>
<li>
<p>Distributed Spec：张量如何在进程组之间分布。</p>
<ul>
<li>张量在 DP 进程组之间的分布方式是自动导出的，不需要用户手动指定</li>
<li>在使用 Distributed Spec 时，只需要描述张量在 TP 进程组之间的分布方式即可。TP 进程组目前有两种分布式规范，即 ShardSpec和ReplicaSpec
<ul>
<li>ShardSpec 需要指定分区的维度索引 dim 和分区个数 num_partitions</li>
<li>TP进程组上不同的dist spec可以通过set_dist_spec()接口相互转换</li>
</ul>
</li>
</ul>
</li>
<li>
<p>Compute Spec：计算过程中如何使用张量。</p>
<ul>
<li>将作为module parameter的ColoTensor设置正确的Compute Pattern。可以触发正取的计算模式</li>
</ul>
</li>
</ul>
</li>
</ul>
<h2 id="colossal-ai-的使用" tabindex="-1"><a class="header-anchor" href="#colossal-ai-的使用" aria-hidden="true">#</a> Colossal-AI 的使用</h2>
<h3 id="colossal-ai-的工作流" tabindex="-1"><a class="header-anchor" href="#colossal-ai-的工作流" aria-hidden="true">#</a> Colossal-AI 的工作流</h3>
<p><img src="imgs/Colossal-AI workflow.jpg" alt="Colossal-AI workflow"></p>
<ol>
<li>
<p>准备一个配置文件，指定您要使用的功能和参数。</p>
</li>
<li>
<p>用 colossalai.launch 初始化分布式后端。</p>
</li>
<li>
<p>用 colossalai.initialize 将训练特征注入您的训练组件（如模型、优化器）中。</p>
</li>
<li>
<p>进行训练和测试。</p>
</li>
</ol>
<h3 id="构建配置文件" tabindex="-1"><a class="header-anchor" href="#构建配置文件" aria-hidden="true">#</a> 构建配置文件</h3>
<p>配置文件中指定参数</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token comment"># config.py 文件中设置 BATCH_SIZE超参数</span>
<span class="token keyword">import</span> colossalai
<span class="token keyword">from</span> colossalai<span class="token punctuation">.</span>core <span class="token keyword">import</span> global_context <span class="token keyword">as</span> gpc

colossalai<span class="token punctuation">.</span>launch<span class="token punctuation">(</span>config<span class="token operator">=</span><span class="token string">'./config.py'</span><span class="token punctuation">)</span>

<span class="token comment"># access your parameter</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>gpc<span class="token punctuation">.</span>config<span class="token punctuation">.</span>BATCH_SIZE<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><h3 id="初始化" tabindex="-1"><a class="header-anchor" href="#初始化" aria-hidden="true">#</a> 初始化</h3>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token comment"># initialize features</span>
engine<span class="token punctuation">,</span> train_dataloader<span class="token punctuation">,</span> test_dataloader<span class="token punctuation">,</span> _ <span class="token operator">=</span> colossalai<span class="token punctuation">.</span>initialize<span class="token punctuation">(</span>model<span class="token punctuation">,</span>
                                                                     optimizer<span class="token punctuation">,</span>
                                                                     criterion<span class="token punctuation">,</span>
                                                                     train_dataloader<span class="token punctuation">,</span>
                                                                     test_dataloader<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h3 id="自动混合精度训练-amp" tabindex="-1"><a class="header-anchor" href="#自动混合精度训练-amp" aria-hidden="true">#</a> 自动混合精度训练 (AMP)</h3>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token comment"># 使用 Torch AMP 可选参数如init_scale(float, optional, default=2.**16): 初始缩放因子</span>
fp16<span class="token operator">=</span><span class="token builtin">dict</span><span class="token punctuation">(</span>
    mode <span class="token operator">=</span> AMP_TYPE<span class="token punctuation">.</span>TORCH 
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h3 id="并行配置" tabindex="-1"><a class="header-anchor" href="#并行配置" aria-hidden="true">#</a> 并行配置</h3>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code>parallel <span class="token operator">=</span> <span class="token builtin">dict</span><span class="token punctuation">(</span>
   pipeline<span class="token operator">=</span><span class="token builtin">dict</span><span class="token punctuation">(</span><span class="token string">"size"</span><span class="token punctuation">:</span> <span class="token builtin">int</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
   tensor<span class="token operator">=</span><span class="token builtin">dict</span><span class="token punctuation">(</span><span class="token string">"size"</span><span class="token punctuation">:</span> <span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token string">"mode"</span><span class="token punctuation">:</span> <span class="token string">'1d'</span> <span class="token keyword">or</span> <span class="token string">'2d'</span> <span class="token keyword">or</span> <span class="token string">'2.5d'</span> <span class="token keyword">or</span> <span class="token string">'3d'</span><span class="token punctuation">,</span> <span class="token string">"kwargs"</span><span class="token punctuation">:</span> Any<span class="token punctuation">)</span>
<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h3 id="基于chunk内存管理的零冗余优化器-zero" tabindex="-1"><a class="header-anchor" href="#基于chunk内存管理的零冗余优化器-zero" aria-hidden="true">#</a> 基于Chunk内存管理的零冗余优化器 (ZeRO)</h3>
<p>运用GeminiDDP的方式来使用基于Chunk内存管理的ZeRO，它使用 ZeRO-DP 和 Gemini，其中ZeRO 用于并行，Gemini 用于内存管理</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token comment"># 确保模型是在 ColoInitContext 的上下文中初始化的</span>
<span class="token keyword">with</span> ColoInitContext<span class="token punctuation">(</span>device<span class="token operator">=</span><span class="token string">'cpu'</span><span class="token punctuation">,</span> default_dist_spec<span class="token operator">=</span>default_dist_spec<span class="token punctuation">,</span> default_pg<span class="token operator">=</span>default_pg<span class="token punctuation">)</span><span class="token punctuation">:</span>
  model <span class="token operator">=</span> gpt2_medium<span class="token punctuation">(</span>checkpoint<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">)</span>
<span class="token triple-quoted-string string">''' 模型参数如下 
      hidden dim是DNN的隐藏维度。用户可以提供这个参数来加快搜索速度。 默认值 1024；
      min_chunk_size_mb是以兆字节为单位的最小块大小。如果参数的总大小仍然小于最小块大小，则所有参数将被压缩为一个小块
'''</span>
chunk_manager <span class="token operator">=</span> init_chunk_manager<span class="token punctuation">(</span>model<span class="token operator">=</span>module<span class="token punctuation">,</span>
                                   init_device<span class="token operator">=</span>device<span class="token punctuation">,</span>
                                   hidden_dim<span class="token operator">=</span>hidden_dim<span class="token punctuation">,</span>
                                   search_range_mb<span class="token operator">=</span>search_range_mb<span class="token punctuation">,</span>
                                   min_chunk_size_mb<span class="token operator">=</span>min_chunk_size_mb<span class="token punctuation">)</span>
gemini_manager <span class="token operator">=</span> GeminiManager<span class="token punctuation">(</span>placement_policy<span class="token punctuation">,</span> chunk_manager<span class="token punctuation">)</span>
model <span class="token operator">=</span> ZeroDDP<span class="token punctuation">(</span>model<span class="token punctuation">,</span> gemini_manager<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><p>定义一个使用 Gemini + ZeRO DDP 的模型：</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">def</span> <span class="token function">gemini_zero_dpp</span><span class="token punctuation">(</span>model<span class="token punctuation">:</span> torch<span class="token punctuation">.</span>nn<span class="token punctuation">.</span>Module<span class="token punctuation">,</span> pg<span class="token punctuation">:</span> ProcessGroup<span class="token punctuation">,</span> placememt_policy<span class="token punctuation">:</span> <span class="token builtin">str</span> <span class="token operator">=</span> <span class="token string">"auto"</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    cai_version <span class="token operator">=</span> colossalai<span class="token punctuation">.</span>__version__
    <span class="token keyword">if</span> version<span class="token punctuation">.</span>parse<span class="token punctuation">(</span>cai_version<span class="token punctuation">)</span> <span class="token operator">></span> version<span class="token punctuation">.</span>parse<span class="token punctuation">(</span><span class="token string">"0.1.10"</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">from</span> colossalai<span class="token punctuation">.</span>nn<span class="token punctuation">.</span>parallel <span class="token keyword">import</span> GeminiDDP
        model <span class="token operator">=</span> GeminiDDP<span class="token punctuation">(</span>model<span class="token punctuation">,</span>
                          device<span class="token operator">=</span>get_current_device<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
                          placement_policy<span class="token operator">=</span>placememt_policy<span class="token punctuation">,</span>
                          pin_memory<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">,</span>
                          search_range_mb<span class="token operator">=</span><span class="token number">32</span><span class="token punctuation">)</span>
    <span class="token keyword">elif</span> version<span class="token punctuation">.</span>parse<span class="token punctuation">(</span>cai_version<span class="token punctuation">)</span> <span class="token operator">&lt;=</span> version<span class="token punctuation">.</span>parse<span class="token punctuation">(</span><span class="token string">"0.1.10"</span><span class="token punctuation">)</span> <span class="token keyword">and</span> version<span class="token punctuation">.</span>parse<span class="token punctuation">(</span>cai_version<span class="token punctuation">)</span> <span class="token operator">>=</span> version<span class="token punctuation">.</span>parse<span class="token punctuation">(</span><span class="token string">"0.1.9"</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">from</span> colossalai<span class="token punctuation">.</span>gemini <span class="token keyword">import</span> ChunkManager<span class="token punctuation">,</span> GeminiManager
        chunk_size <span class="token operator">=</span> ChunkManager<span class="token punctuation">.</span>search_chunk_size<span class="token punctuation">(</span>model<span class="token punctuation">,</span> <span class="token number">64</span> <span class="token operator">*</span> <span class="token number">1024</span><span class="token operator">**</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">32</span><span class="token punctuation">)</span>
        gemini_manager <span class="token operator">=</span> GeminiManager<span class="token punctuation">(</span>placememt_policy<span class="token punctuation">,</span> chunk_manager<span class="token punctuation">)</span>
        chunk_manager <span class="token operator">=</span> ChunkManager<span class="token punctuation">(</span>chunk_size<span class="token punctuation">,</span>
                                     pg<span class="token punctuation">,</span>
                                     enable_distributed_storage<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">,</span>
                                            init_device<span class="token operator">=</span>GeminiManager<span class="token punctuation">.</span>get_default_device<span class="token punctuation">(</span>placememt_policy<span class="token punctuation">)</span><span class="token punctuation">)</span>
        model <span class="token operator">=</span> ZeroDDP<span class="token punctuation">(</span>model<span class="token punctuation">,</span> gemini_manager<span class="token punctuation">)</span>
    <span class="token keyword">else</span><span class="token punctuation">:</span>
        <span class="token keyword">raise</span> NotImplemented<span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f"CAI version </span><span class="token interpolation"><span class="token punctuation">{</span>cai_version<span class="token punctuation">}</span></span><span class="token string"> is not supported"</span></span><span class="token punctuation">)</span>
    <span class="token keyword">return</span> model
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><h3 id="nvme-offload-异步-tensor-i-o-库" tabindex="-1"><a class="header-anchor" href="#nvme-offload-异步-tensor-i-o-库" aria-hidden="true">#</a> NVMe offload（异步 Tensor I/O 库）</h3>
<p>使用前安装：</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token comment"># 目前实验平台装不上</span>
pip install packaging
pip install tensornvme
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>Adam (CPUAdam 和 HybridAdam) 实现了优化器状态的 NVMe offload</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">from</span> colossalai<span class="token punctuation">.</span>nn<span class="token punctuation">.</span>optimizer <span class="token keyword">import</span> CPUAdam<span class="token punctuation">,</span> HybridAdam
<span class="token triple-quoted-string string">'''
    nvme_offload_fraction 是要 offload 到 NVMe 的优化器状态的比例。
    nvme_offload_dir 是保存 NVMe offload 文件的目录。如果 nvme_offload_dir 为 None，将使用随机临时目录
'''</span>
optimizer <span class="token operator">=</span> HybridAdam<span class="token punctuation">(</span>model<span class="token punctuation">.</span>parameters<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> lr<span class="token operator">=</span><span class="token number">1e-3</span><span class="token punctuation">,</span> nvme_offload_fraction<span class="token operator">=</span><span class="token number">1.0</span><span class="token punctuation">,</span> nvme_offload_dir<span class="token operator">=</span><span class="token string">'./'</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><blockquote>
<p>它只会卸载在 CPU 上的优化器状态。这意味着它只会影响 CPU 训练或者使用卸载的 Zero/Gemini</p>
</blockquote>
<h3 id="colotensor" tabindex="-1"><a class="header-anchor" href="#colotensor" aria-hidden="true">#</a> ColoTensor</h3>
<p>使用 tp_degree=4, dp_dgree=2 在 8 个 GPU 上初始化并Shard一个ColoTensor。 然后tensor被沿着 TP 进程组中的最后一个维度进行分片。 最后，我们沿着 TP 进程组中的第一个维度（dim 0）对其进行重新Shard。 注意观察每个张量的形状。</p>
<div class="language-python ext-py line-numbers-mode"><pre v-pre class="language-python"><code><span class="token keyword">import</span> torch
<span class="token keyword">import</span> torch<span class="token punctuation">.</span>multiprocessing <span class="token keyword">as</span> mp
<span class="token keyword">from</span> colossalai<span class="token punctuation">.</span>utils <span class="token keyword">import</span> free_port<span class="token punctuation">,</span> print_rank_0
<span class="token keyword">from</span> functools <span class="token keyword">import</span> partial

<span class="token keyword">import</span> colossalai
<span class="token keyword">from</span> colossalai<span class="token punctuation">.</span>tensor <span class="token keyword">import</span> ProcessGroup<span class="token punctuation">,</span> ColoTensor<span class="token punctuation">,</span> ColoTensorSpec<span class="token punctuation">,</span> ShardSpec<span class="token punctuation">,</span> ComputeSpec<span class="token punctuation">,</span> ComputePattern
<span class="token keyword">from</span> colossalai<span class="token punctuation">.</span>utils <span class="token keyword">import</span> free_port

<span class="token keyword">import</span> torch

<span class="token keyword">def</span> <span class="token function">run_dist_tests</span><span class="token punctuation">(</span>rank<span class="token punctuation">,</span> world_size<span class="token punctuation">,</span> port<span class="token punctuation">)</span><span class="token punctuation">:</span>
    colossalai<span class="token punctuation">.</span>launch<span class="token punctuation">(</span>config<span class="token operator">=</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">,</span> rank<span class="token operator">=</span>rank<span class="token punctuation">,</span> world_size<span class="token operator">=</span>world_size<span class="token punctuation">,</span> host<span class="token operator">=</span><span class="token string">'localhost'</span><span class="token punctuation">,</span> port<span class="token operator">=</span>port<span class="token punctuation">,</span> backend<span class="token operator">=</span><span class="token string">'nccl'</span><span class="token punctuation">)</span>
    pg <span class="token operator">=</span> ProcessGroup<span class="token punctuation">(</span>tp_degree<span class="token operator">=</span><span class="token number">2</span><span class="token punctuation">,</span> dp_degree<span class="token operator">=</span><span class="token number">2</span><span class="token punctuation">)</span>

    torch<span class="token punctuation">.</span>manual_seed<span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span>
    local_tensor <span class="token operator">=</span> torch<span class="token punctuation">.</span>randn<span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">.</span>cuda<span class="token punctuation">(</span><span class="token punctuation">)</span>
    print_rank_0<span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f"shape </span><span class="token interpolation"><span class="token punctuation">{</span>local_tensor<span class="token punctuation">.</span>shape<span class="token punctuation">}</span></span><span class="token string">, </span><span class="token interpolation"><span class="token punctuation">{</span>local_tensor<span class="token punctuation">.</span>data<span class="token punctuation">}</span></span><span class="token string">"</span></span><span class="token punctuation">)</span>

    spec <span class="token operator">=</span> ColoTensorSpec<span class="token punctuation">(</span>pg<span class="token punctuation">,</span> ShardSpec<span class="token punctuation">(</span>dims<span class="token operator">=</span><span class="token punctuation">[</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">,</span> num_partitions<span class="token operator">=</span><span class="token punctuation">[</span>pg<span class="token punctuation">.</span>tp_world_size<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">,</span> ComputeSpec<span class="token punctuation">(</span>ComputePattern<span class="token punctuation">.</span>TP1D<span class="token punctuation">)</span><span class="token punctuation">)</span>
    t1 <span class="token operator">=</span> ColoTensor<span class="token punctuation">.</span>from_torch_tensor<span class="token punctuation">(</span>local_tensor<span class="token punctuation">,</span> spec<span class="token punctuation">)</span>
    t1 <span class="token operator">=</span> t1<span class="token punctuation">.</span>to_replicate<span class="token punctuation">(</span><span class="token punctuation">)</span>
    print_rank_0<span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f"shape </span><span class="token interpolation"><span class="token punctuation">{</span>t1<span class="token punctuation">.</span>shape<span class="token punctuation">}</span></span><span class="token string">, </span><span class="token interpolation"><span class="token punctuation">{</span>t1<span class="token punctuation">.</span>data<span class="token punctuation">}</span></span><span class="token string">"</span></span><span class="token punctuation">)</span>

    spec2 <span class="token operator">=</span> ShardSpec<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token punctuation">[</span>pg<span class="token punctuation">.</span>tp_world_size<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
    t1<span class="token punctuation">.</span>set_dist_spec<span class="token punctuation">(</span>spec2<span class="token punctuation">)</span>
    print_rank_0<span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f"shape </span><span class="token interpolation"><span class="token punctuation">{</span>t1<span class="token punctuation">.</span>shape<span class="token punctuation">}</span></span><span class="token string">, </span><span class="token interpolation"><span class="token punctuation">{</span>t1<span class="token punctuation">.</span>data<span class="token punctuation">}</span></span><span class="token string">"</span></span><span class="token punctuation">)</span>

<span class="token keyword">def</span> <span class="token function">test_dist_cases</span><span class="token punctuation">(</span>world_size<span class="token punctuation">)</span><span class="token punctuation">:</span>
    run_func <span class="token operator">=</span> partial<span class="token punctuation">(</span>run_dist_tests<span class="token punctuation">,</span> world_size<span class="token operator">=</span>world_size<span class="token punctuation">,</span> port<span class="token operator">=</span>free_port<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    mp<span class="token punctuation">.</span>spawn<span class="token punctuation">(</span>run_func<span class="token punctuation">,</span> nprocs<span class="token operator">=</span>world_size<span class="token punctuation">)</span>

<span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">'__main__'</span><span class="token punctuation">:</span>
    test_dist_cases<span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br></div></div></template>
