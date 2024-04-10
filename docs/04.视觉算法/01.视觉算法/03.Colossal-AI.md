---
title: Colossal-AI
date: 2023-11-16 17:26:39
permalink: /pages/a2ac81/
---
# Colossal简介

## 分布式训练

### 为什么需要分布式训练

- 模型规模迅速增加：与较小的模型相比，超大型模型通常能提供更优越的性能。

![模型与参数量](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/colossalai/model_parameters.jpg)

- 数据集规模迅速增加

- 计算能力越来越强：GPU是深度学习最常见的算力资源，GPU计算能力的提升使得我们能够更快地执行计算密
集型任务。

### 分布式训练的基本概念

分布式训练需要多台机器/GPU。在训练期间，这些设备之间会有通信。

- host: 主机(host)是通信网络中的主要设备。在初始化分布式环境时，经常需要它作为一个参数。

- port: 这里的端口(port)主要是指主机上用于通信的主端口。

- rank: 在网络中赋予设备的唯一ID。

- world size: 网络中设备的数量。

- process group: 进程组(process group)是一个通信网络，包括设备的一个子集。总是有一个默认的进程组，它包含所有的设备。一个子集的设备可以形成一个进程组，以便它们只在组内的设备之间进行通信。

假设有2台机器（也称为节点），每台机器有4个GPU。当在这两台机器上初始化分布式环境时，基本上启动了8个进程（每台机器上有4个进程），每个进程被绑定到一个 GPU 上。

![分布式系统](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/colossalai/distributed%20systems.jpg)

可以创建一个新的进程组。这个新的进程组可以包含任何进程的子集。

在进程组中，各进程可以通过两种方式进行通信。

- peer-to-peer: 一个进程向另一个进程发送数据。
- collective: 一组进程一起执行分散、聚集、all-reduce、广播等操作。

![Collective communication](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/colossalai/Collective%20communication.jpg)

## 关键技术：异构训练再升级

使用单张消费级显卡训练 AI 大模型的最大困难在于显存容量极其有限，严重限制了可容纳的模型参数量。

- 微软 DeepSpeed 提出的 ZeRO-offload 方法，ZeRO-Offload 是一种通过将数据和计算从 GPU 卸载到 CPU，以此减少神经网络训练期间 GPU 内存占用的方法，该方法提供了更高的训练吞吐量，并避免了移动数据和在 CPU 上执行计算导致的减速问题。

- 但如下图左边所示，当 GPU 内存不足以满足其相应的模型数据要求时，即使当时 CPU 上仍有可用内存，系统也会崩溃。

![ZeRO-offload](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/colossalai/ZeRO-offload.jpg)

- Colossal-AI 团队从头搭建了如 ZeRO 等核心关键技术，并针对 DeepSpeed 在 CPU 和 GPU 内存之间仅使用静态划分模型数据、对不同训练配置使用固定内存布局等问题做了诸多改进，进一步挖掘高效的 GPU 与 CPU 内存高效协同方案

- Colossal-AI 设计的 Gemini，就像双子星一样，高效管理和利用 GPU 与 CPU 的异构内存，让张量在训练过程中动态分布在 CPU-GPU 的存储空间内，从而让模型训练突破 GPU 的内存墙。

- 利用深度学习网络训练过程的迭代特性，按迭代次数将训练分为 warmup 和 non-warmup 两个阶段。在初期 warmup 阶段，监测内存信息；在 non-warmup 阶段利用已收集的信息来高效移动张量，以达到最小化 CPU-GPU 数据移动的目的。
  
  - 在大型网络训练初期，我们需要用较小的学习率先学n个step，能够防止一开始的时候模型对遇到的新数据过拟合，以改善后面的收敛效果，这个过程就是warmup（模型预热策略）
  
  - warmup：有助于减缓模型在初始阶段对mini-batch的提前过拟合现象，保持分布的平稳,有助于保持模型深层的稳定性

![warmup_to_non-warmup](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/colossalai/warmup_to_non-warmup.jpg)

其中非模型的内存使用量其实难以获取，因为非模型数据的生存周期并不归用户管理，现有的深度学习框架没有暴露非模型数据的追踪接口给用户。其次，CUDA context 等非框架开销也需要统计。

Colossal-AI 通过采样方式在 warmup 阶段获得 CPU 和 GPU 内存的使用情况。非模型数据的使用可以通过统计两个时刻之间系统最大内存使用 - 模型内存使用获得。模型的内存使用情况可以通过查询内存管理器得知，如下图黑色实线所示。

![sampling_warmup_cpu_gpu](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/colossalai/sampling_warmup_cpu_gpu.jpg)

而所有模型数据张量则交给内存管理器管理，每个张量标记一个状态信息，包括 HOLD，COMPUTE，FREE 等。并根据动态查询到的内存使用情况，不断动态转换张量状态，调整张量位置，最终实现对 GPU 显存和 CPU 内存的高效利用，实现在硬件极其有限的情况下，最大化模型容量和平衡训练速度，对于 AI 民主化和低成本微调大模型下游任务等意义巨大。

## 模型训练优化方案

### 便捷高效并行扩展（多GPU）

Colossal-AI 通过高效多维并行和异构并行等技术，让用户仅需极少量修改，即可高效快速部署 AI 大模型训练。

例如对于 GPT-3 这样的超大 AI 模型，相比英伟达方案，Colossal-AI 仅需一半的计算资源，即可启动训练；若使用相同计算资源，则能提速 11%，可降低 GPT-3 训练成本超百万美元。

1. 数据并行：将数据集分割成几个碎片，每个碎片被分配到一个设备上。这相当于沿批次维度对训练过程进行并行化。每个设备将持有一个完整的模型副本，并在分配的数据集碎片上进行训练。在反向传播之后，模型的梯度将被全部减少，以便在不同设备上的模型参数能够保持同步。

2. 模型并行：在数据并行训练中，由于每个 GPU 持有整个模型权重的副本。这就会出现冗余问题。另一种并行模式是模型并行，即模型被分割并分布在一个设备阵列上。通常有两种类型的并行：张量并行和流水线并行。

   - 张量并行训练是将一个张量沿特定维度分成 N 块，每个设备只持有整个张量的 1/N，同时不影响计算图的正确性。这需要额外的通信来确保结果的正确性。

   - 流水线并行是在各层之间进行并行计算。模型按层分割成若干块，每块都交给一个设备。在前向传递过程中，每个设备将中间的激活传递给下一个阶段。在后向传递过程中，每个设备将输入张量的梯度传回给前一个流水线阶段。这允许设备同时进行计算，并增加了训练的吞吐量。流水线并行训练的一个缺点是，会有一些设备参与计算的冒泡时间，导致计算资源的浪费。

3. 优化器相关的并行：目前这种并行最流行的方法是 ZeRO，即零冗余优化器。 ZeRO 在三个层面上工作，以消除内存冗余（ZeRO需要进行fp16训练）。

   - 优化器状态在各进程中被划分。

   - 用于更新模型权重的32位梯度也被划分，因此每个进程只存储与其优化器状态划分相对应的梯度。

   - 16位模型参数在各进程中被划分。

4. 异构系统的并行：依靠 CPU 甚至是 NVMe 磁盘来训练大型模型。主要的想法是，在不使用张量时，将其卸载回 CPU 内存或 NVMe 磁盘。通过使用异构系统架构，有可能在一台机器上容纳一个巨大的模型。

![Parallelism of heterogeneous systems](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/colossalai/Parallelism%20of%20heterogeneous%20systems.jpg)

### 其他优化方案

- 自动混合精度训练 (AMP)：自动混合精度训练是混合 FP16 和 FP32 训练。

  - 半精度浮点格式（FP16）具有较低的算法复杂度和较高的计算效率。此外，FP16 仅需要 FP32 所需的一半存储空间，并节省了内存和网络带宽，从而为大 batch size 和大模型提供了更多内存。然而，还有其他操作，如缩减，需要 FP32 的动态范围，以避免数值溢出/下溢。因此，引入自动混合精度，尝试将每个操作与其相应的数据类型相匹配，这可以减少内存占用并提高训练效率。

![AMP](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/colossalai/AMP.jpg)

- 梯度累积：梯度累积是一种常见的增大训练 batch size 的方式。 在训练大模型时，内存经常会成为瓶颈，并且 batch size 通常会很小（如2），这导致收敛性无法保证。梯度累积将多次迭代的梯度累加，并仅在达到预设迭代次数时更新参数。
  
  - 在 Colossal-AI 中使用梯度累积，仅需在 config中配置期望梯度累积的次数。`gradient_accumulation = 8`

- 梯度裁剪：为了加快训练过程和寻求全局最优以获得更好的性能，通过控制学习率来调整训练中的下降速度。这使得梯度向量在每一步都能更好地统一。在这种情况下，下降速度可以按预期被控制。 因此，梯度裁剪，一种可以将梯度向量归一化，以将其限制在统一长度的技术。
  
  - 要使用梯度裁剪，只需在配置文件中添加梯度裁剪范数即可。`clip_grad_norm = 1.0`

  - 每个 GPU 只拥有线性层中权重的一部分参数。为了得到线性层权重的梯度向量的正确范数，每个 GPU 中的每个梯度向量的范数应该相加。更复杂的是，偏置的分布不同于权重的分布。通信组在求和运算中有所不同。

![Parameter distribution](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/colossalai/parameter%20distribution.jpg)

- 基于Chunk内存管理的零冗余优化器 (ZeRO)：零冗余优化器 (ZeRO) 通过对三个模型状态（优化器状态、梯度和参数）进行划分而不是复制他们，消除了数据并行进程中的内存冗余。该方法与传统的数据并行相比，内存效率得到了极大的提高，而计算粒度和通信效率得到了保留。

  1. 分片优化器状态: 优化器状态 (如 Adam optimizer, 32位的权重, 以及一二阶动量估计) 被划分到各个进程中, 因此每个进程只更新其分区。
  
  2. 分片梯度: 在梯度在数据并行进程组内进行 reduction 后, 梯度张量也被划分，这样每个进程只存储与其划分的优化器状态对应的梯度。 注意, Colossal-AI 将梯度转换为 FP32 格式以参与更新参数。

  3. 分片参数: 16位的模型参数被划分到一个数据并行组的进程中。

  4. Gemini: 对于参数、梯度、优化器状态的动态异构内存空间管理器。

在使用零冗余优化器 (ZeRO)时，通过切分参数的方式对模型进行分布式存储，这种方法的优点是每个节点的内存负载是完全均衡的。但是这种方式有很多缺点。首先，通信时需要申请一块临时内存用来通信，通信完毕释放，这回导致存在内存碎片化的问题。其次，以Tensor为粒度进行通信，会导致网络带宽无法充分利用。通常来说传输的消息长度越长带宽利用率越高。

利用Colossal-AI v0.1.8引入了Chunk机制，可以提升ZeRO的性能。通过将运算顺序上连续的一组参数存入一个Chunk中（Chunk即一段连续的内存空间），每个Chunk的大小相同。Chunk方式组织内存可以保证PCI-e和GPU-GPU之间网络带宽的高效利用，减小了通信次数，同时避免潜在的内存碎片。

Colossal-AI提供了轻量级的Chunk搜索机制，帮助用户自动找到内存碎片最小的Chunk尺寸。

- NVMe offload：GPU显存限制了我们可以训练的模型规模，这称为GPU显存墙。如果我们将优化器状态 offload 到磁盘，就可以突破 GPU 内存墙。
  
  - NVMe的全称是Non-Volatile Memory Express，翻译过来就是非易失性内存主机控制器接口规范

  - Colossal-AI 实现了一个用户友好且高效的异步 Tensor I/O 库：TensorNVMe。有了这个库，我们可以简单地实现 NVMe offload。

> 该库与各种磁盘（HDD、SATA SSD 和 NVMe SSD）兼容。由于 HDD 或 SATA SSD 的 I/O 带宽较低，建议仅在 NVMe 磁盘上使用此库。
>
> NVMe协议本质是上建立了多个计算机与存储设备的通路，从而提高读写数据的速度。在NVMe协议中，多个通路其实就是多个队列。在SATA中计算机与存储设备只能有一个队列，即使是多CPU情况下，所有请求只能经过这样一个狭窄的道路。而NVMe协议可以最多有64K个队列，每个CPU或者核心都可以有一个队列，这样并发程度大大提升，性能也就更高了。

- ColoTensor是 ColossalAI 中张量的基本数据结构。 它是 torch.Tensor 的子类，可以当做 PyTorch Tensor使用，ColoTensor 包含额外的属性ColoTensorSpec 来描述张量的payload分布和计算模式
  
  - ProcessGroup：如何将进程组织为通信组。
    - ProcessGroup 类的一个实例描述了如何在进程组中组织进程。进程组内的进程可以一起参与同一个集合通信，比如allgather, allreduce等。进程组组织方式被张量的并行策略支配。
    - ColoTensor 的一个进程组由 tp_degree 和 dp_degree 两种配置定义
  
  - Distributed Spec：张量如何在进程组之间分布。
    - 张量在 DP 进程组之间的分布方式是自动导出的，不需要用户手动指定
    - 在使用 Distributed Spec 时，只需要描述张量在 TP 进程组之间的分布方式即可。TP 进程组目前有两种分布式规范，即 ShardSpec和ReplicaSpec
      - ShardSpec 需要指定分区的维度索引 dim 和分区个数 num_partitions
      - TP进程组上不同的dist spec可以通过set_dist_spec()接口相互转换
  
  - Compute Spec：计算过程中如何使用张量。
    - 将作为module parameter的ColoTensor设置正确的Compute Pattern。可以触发正取的计算模式

## Colossal-AI 的使用

### Colossal-AI 的工作流

![Colossal-AI workflow](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/colossalai/Colossal-AI%20workflow.jpg)

1. 准备一个配置文件，指定您要使用的功能和参数。

2. 用 colossalai.launch 初始化分布式后端。

3. 用 colossalai.initialize 将训练特征注入您的训练组件（如模型、优化器）中。

4. 进行训练和测试。

### 构建配置文件

配置文件中指定参数

```python
# config.py 文件中设置 BATCH_SIZE超参数
import colossalai
from colossalai.core import global_context as gpc

colossalai.launch(config='./config.py')

# access your parameter
print(gpc.config.BATCH_SIZE)
```

### 初始化

```python
# initialize features
engine, train_dataloader, test_dataloader, _ = colossalai.initialize(model,
                                                                     optimizer,
                                                                     criterion,
                                                                     train_dataloader,
                                                                     test_dataloader)
```

### 自动混合精度训练 (AMP)

```python
# 使用 Torch AMP 可选参数如init_scale(float, optional, default=2.**16): 初始缩放因子
fp16=dict(
    mode = AMP_TYPE.TORCH 
)
```

### 并行配置

```python
parallel = dict(
   pipeline=dict("size": int),
   tensor=dict("size": int, "mode": '1d' or '2d' or '2.5d' or '3d', "kwargs": Any)
)
```

### 基于Chunk内存管理的零冗余优化器 (ZeRO)

运用GeminiDDP的方式来使用基于Chunk内存管理的ZeRO，它使用 ZeRO-DP 和 Gemini，其中ZeRO 用于并行，Gemini 用于内存管理

```python
# 确保模型是在 ColoInitContext 的上下文中初始化的
with ColoInitContext(device='cpu', default_dist_spec=default_dist_spec, default_pg=default_pg):
  model = gpt2_medium(checkpoint=True)
''' 模型参数如下 
      hidden dim是DNN的隐藏维度。用户可以提供这个参数来加快搜索速度。 默认值 1024；
      min_chunk_size_mb是以兆字节为单位的最小块大小。如果参数的总大小仍然小于最小块大小，则所有参数将被压缩为一个小块
'''
chunk_manager = init_chunk_manager(model=module,
                                   init_device=device,
                                   hidden_dim=hidden_dim,
                                   search_range_mb=search_range_mb,
                                   min_chunk_size_mb=min_chunk_size_mb)
gemini_manager = GeminiManager(placement_policy, chunk_manager)
model = ZeroDDP(model, gemini_manager)
```

定义一个使用 Gemini + ZeRO DDP 的模型：

```python
def gemini_zero_dpp(model: torch.nn.Module, pg: ProcessGroup, placememt_policy: str = "auto"):
    cai_version = colossalai.__version__
    if version.parse(cai_version) > version.parse("0.1.10"):
        from colossalai.nn.parallel import GeminiDDP
        model = GeminiDDP(model,
                          device=get_current_device(),
                          placement_policy=placememt_policy,
                          pin_memory=True,
                          search_range_mb=32)
    elif version.parse(cai_version) <= version.parse("0.1.10") and version.parse(cai_version) >= version.parse("0.1.9"):
        from colossalai.gemini import ChunkManager, GeminiManager
        chunk_size = ChunkManager.search_chunk_size(model, 64 * 1024**2, 32)
        gemini_manager = GeminiManager(placememt_policy, chunk_manager)
        chunk_manager = ChunkManager(chunk_size,
                                     pg,
                                     enable_distributed_storage=True,
                                            init_device=GeminiManager.get_default_device(placememt_policy))
        model = ZeroDDP(model, gemini_manager)
    else:
        raise NotImplemented(f"CAI version {cai_version} is not supported")
    return model
```

### NVMe offload（异步 Tensor I/O 库）

使用前安装：

```python
# 目前实验平台装不上
pip install packaging
pip install tensornvme
```

Adam (CPUAdam 和 HybridAdam) 实现了优化器状态的 NVMe offload

```python
from colossalai.nn.optimizer import CPUAdam, HybridAdam
'''
    nvme_offload_fraction 是要 offload 到 NVMe 的优化器状态的比例。
    nvme_offload_dir 是保存 NVMe offload 文件的目录。如果 nvme_offload_dir 为 None，将使用随机临时目录
'''
optimizer = HybridAdam(model.parameters(), lr=1e-3, nvme_offload_fraction=1.0, nvme_offload_dir='./')
```

> 它只会卸载在 CPU 上的优化器状态。这意味着它只会影响 CPU 训练或者使用卸载的 Zero/Gemini

### ColoTensor

使用 tp_degree=4, dp_dgree=2 在 8 个 GPU 上初始化并Shard一个ColoTensor。 然后tensor被沿着 TP 进程组中的最后一个维度进行分片。 最后，我们沿着 TP 进程组中的第一个维度（dim 0）对其进行重新Shard。 注意观察每个张量的形状。

```python
import torch
import torch.multiprocessing as mp
from colossalai.utils import free_port, print_rank_0
from functools import partial

import colossalai
from colossalai.tensor import ProcessGroup, ColoTensor, ColoTensorSpec, ShardSpec, ComputeSpec, ComputePattern
from colossalai.utils import free_port

import torch

def run_dist_tests(rank, world_size, port):
    colossalai.launch(config={}, rank=rank, world_size=world_size, host='localhost', port=port, backend='nccl')
    pg = ProcessGroup(tp_degree=2, dp_degree=2)

    torch.manual_seed(0)
    local_tensor = torch.randn(2, 3, 1).cuda()
    print_rank_0(f"shape {local_tensor.shape}, {local_tensor.data}")

    spec = ColoTensorSpec(pg, ShardSpec(dims=[-1], num_partitions=[pg.tp_world_size()]), ComputeSpec(ComputePattern.TP1D))
    t1 = ColoTensor.from_torch_tensor(local_tensor, spec)
    t1 = t1.to_replicate()
    print_rank_0(f"shape {t1.shape}, {t1.data}")

    spec2 = ShardSpec([0], [pg.tp_world_size()])
    t1.set_dist_spec(spec2)
    print_rank_0(f"shape {t1.shape}, {t1.data}")

def test_dist_cases(world_size):
    run_func = partial(run_dist_tests, world_size=world_size, port=free_port())
    mp.spawn(run_func, nprocs=world_size)

if __name__ == '__main__':
    test_dist_cases(4)
```