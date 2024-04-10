---
title: YOLO
date: 2023-11-16 17:26:39
permalink: /pages/d067ec/
---

# YOLO系列算法

## 深度学习经典检测方法

### one-stage

- 核心优势：速度快，适合做实时检测任务

- 缺点：效果通常不会太好

- 常见算法：YOLO系列

### two-stage

- 速度通常较慢，效果通常比one-stage好一点

- 常见算法：Fast-rcnn MaskRcnn系列

一阶段与两阶段的区别

- 一阶段：对于检测任务只利用一个cnn网络提取特征做回归

- 二阶段：相较于一阶段增加了一个rpn区域建议网络，为了得到最终的结果增加一个预选框，实现算法精度的提升

## 指标分析

precision、recall、map、iou

### precision计算

![图片](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/yolo/precision.jpg)

### recall计算

![图片](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/yolo/recall.jpg)

### 计算指标

![图片](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/yolo/TP_TF_FP_FN.jpg)

### iou(交并比)计算

- 置信度：在检测任务中置信度用来判断边界框内的物体是正样本还是负样本，大于置信度阈值的判定为正样本，小于置信度阈值的判定为负样本即背景

- 当通过iou判断是正样本的情况属于P，当通过confidence阈值判断的正样本属于T，所以如果iou判断是正样本且confidence也判断是正样本时属于TP，这时剩下的实际的GT(ground truth)但置信度却小于confidence阈值的被认为是FN。

![图片](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/yolo/iou.jpg)
  
### mAP计算

- 在不同的阈值中综合的p-r的情况得出一个指标

- mAP值是p-r图中取p最大值与横坐标r所围成的阴影的面积，mAP值越接近于1说明效果越好

![图片](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/yolo/map.jpg)

### 感受野

- 最后一个特征图中的点对应原始图像区域的大小称为感受野

- 越大的感受野能关注原始图像的信息就越多，可以检测更大的物体

![图片](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/yolo/receptive_field.jpg)

## YOLOv1

### 核心思想

- YOLOv1的核心思想就是利用整张图作为网络的输入，直接在输出层回归bounding box的位置和bounding box所属的类别。

- 实现步骤
  1. 把图片分为不同的格子，预测每一个格子的confidence，根据置信度阈值选择格子
  
  2. 对选中的格子产生两种候选框
  并且计算与真实值的iou(即得到候选框的x，y，w，h)进行微调，最终得到iou值高的候选框

### YOLOv1网络架构

YOLOv1 有一个全连接fc层，限制了输入图像的大小必须是448\*448\*3

![图片](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/yolo/yolov1.jpg)

### 损失函数

`loss = 位置误差 + 含有object的置信度误差 + 不含有object的置信度误差 + 分类误差`

![图片](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/yolo/yolov1_loss.jpg)

### NMS(非极大值抑制)

非极大值抑制用在最后阶段，即所有边界框都已经回归调整过后，对图片每一类使用NMS防止一个目标出现多个边界框

1. 非极大值抑制需要设置一个阈值

2. 使用时间是最后调整完预测框位置后

3. 多少个类就使用多少次非极大值抑制

4. 每一类使用非极大值抑制后找到所有这类的边界框

### YOLOv1中存在的问题

- 每一个格子cell只预测一个类别，这就导致了两个重叠在一起的物体很难检测

- 小物体检测效果一般，长宽比可选，但太过单一

## YOLOv2

![图片](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/yolo/yolov2vsv1.jpg)

### YOLOv2改进

- Batch Normalization
  - v2版本舍弃dropout，卷积后全部加入Batch Normalization(conv-BN)
  
  - 网络的每一层的输入都做了归一化，收敛相对更容易
  
  - 通过Batch Normalization处理后的网络会提升2%的mAP

- 更大的分辨率
  - v1训练时用的是224*224，测试时使用448\*448
  
  - 可能导致模型水土不服，v2训练时额外又进行了10次448\*448的微调
  
  - 使用高分辨率分类器后，YOLOv2的mAP提升了约4%

- 聚类提取先验框
  - v1采用2种先验框，相较于faster-rcnn采用9种先验框数量太少
  
  - 聚类提取，将真实数据集中的标注框聚类分成k类作为先验框
  
  - K-means聚类中的距离：`d(box,centroids) = 1-IOU(box,centroids)`，其中k = 5

- Anchor Box
  - 通过anchor boxes，使得预测的box数量更多(13\*13\*n)，提升recall

- Directed Location Prediction
  - v1中使用偏移量调整先验框
    - bbox：中心为(xp，yp)；宽和高为(wp，hp)，则：`x = xp + wp * tx`、`y = yp + hp * ty`

    - tx=1，则将bbox在x轴向右移动wp；

    - 这样会导致收敛问题，模型不稳定，尤其是刚开始训练的时候
  
  - 相对位置偏移![图片](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/yolo/yolov2_directed_location_prediction.jpg)

- Fine-Grained Features
  - 最后一层感受野太大，小目标可能会丢失，需要融合之前的特征
  
  - 融合过程
![图片](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/yolo/Fine-Grained%20Features.jpg)

- Multi-Scale
  - 都是卷积操作，对输入数据每经过几次迭代之后改变图像的大小

### YOLOv2网络结构

- DarkNet，实际输入416\*416

- 没有FC层，5次降采样，(12\*13)

- 1\*1卷积节省很多参数

DarkNet19
![图片](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/yolo/yolov2.jpg)

## YOLOv3

### YOLOv3改进

- v3最大的改进就是网络结构，使其更适合小目标检测

- 特征做的更细致，融入多持续特征图信息来检测不同规格的物体

- 先验框更丰富，3种scale，每种3个规格，一共9种，根据感受野大小划分scale
  - 不同的特征图融合后进行预测
  
  - 特征图大小不一致时经过上采样后融合![图片](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/yolo/yolov3_feature_fusion.jpg)

- softmax层改进，预测多标签任务
  - 使用logistic激活函数，对每一个类别做二分类![图片](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/yolo/sigmoid.png)
  
  - 设定阈值进行判断

- v3中也应用了resnet的思想，利用残差连接堆叠更多层来进行特征提取![图片](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/yolo/resnet.jpg)

### YOLOv3网络架构

- 网络架构
![图片](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/yolo/yolov3.jpg)

- conv
![图片](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/yolo/yolov3(2).jpg)

## YOLOv4

- 单GPU就能训练的非常好

- 两大核心方法，从数据层面和网络层面来进行改善

- 消融实验

### Bag of freebies(BOF)

1. 数据层面的改进

2. 只增加训练成本，但是能显著提高精度，并不影响推理速度

#### 数据增强

- 调整亮度、对比度、色调、随即缩放、剪切、翻转、旋转

- Mosaic data augmentation：参考CutMix然后四张图像拼接成一张进行训练，间接增加batch_size

- Random Erase：用随机值或训练集的平均像素值替换图像的区域

- Hide and Seek：根据概率设置随机隐藏一些补丁

- Self-adversarial-training(SAT)：通过引入噪音点来增加网络学习难度

#### 网络正则化的方法

- DropBlock：之前的dropout是随机选择点drop掉，现在是drop掉一块区域，使得网络泛化能力更强，过拟合风险更低

#### 类别不平衡，损失函数设计

- Label Smoothing：使得标签不再绝对化，降低过拟合风险，`例如原来的标签为(0,1):[0,1] * (1-0.1) + 0.1/2 = [0.05,0.95]`，使得簇间更分离
  
- IOU损失的缺点：没有相交则IOU=0无法梯度计算，相同的IOU反映不出实际情况

- GIOU
  - 公式：![图片](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/yolo/GIOU.jpg)
  
  - 引入了最小封闭形状C(C可以把A，B包含在内)
  
  - 在不重叠情况下能让预测框尽可能朝着真实框前进
  
  - 重叠情况下无法进行判断

- DIOU
![图片](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/yolo/DIOU.jpg)

- CIOU(YOLOv4使用的损失函数)
![图片](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/yolo/CIOU.jpg)

- DIOU-NMS
![图片](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/yolo/DIOU-NMS.jpg)

- SOFT-NMS
更改分数再判断是否剔除
![图片](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/yolo/SOFT-NMS.jpg)

### Bag of specials(BOS)

1. 网络层面的改进

2. 增加稍许推断代价，但是可以提高模型精度的方法

3. 网络细节引入了各种能让特征提取更好的方法

4. 注意力机制，网络细节设计，特征金字塔等

#### SPPNet(Spatial Pyramid Pooling)

用最大池化来满足最终输入特征一致

#### CSPNet(Cross Stage Partial Network)YOLOv4使用

1. 每一个block按照特征图的channel维度拆分成两部分

2. 一部分正常走网络，另一部分直接concat到这个block的输出

![图片](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/yolo/CSPNet.jpg)

#### CBAM(Convolutional Block Attention Module)

加入注意力机制
![图片](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/yolo/CBAM.jpg)

#### SAM(Spatial Attention Module)YOLOv4使用

YOLOv4采用自定义的SAM
![图片](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/yolo/yolov4_SAM.jpg)

#### FPN

自顶向下的模式，将高层特征传下来，单向
![图片](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/yolo/FPN.jpg)

#### PAN(Path Aggregation Network)YOLOv4使用

引入了自底向上的路径，使得底层信息更容易传到顶部

![图片](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/yolo/PAN.jpg)

YOLOv4中并不是加法，是特征拼接的方式
![图片](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/yolo/yolov4_PAN.jpg)

#### Mish(YOLOv4使用的激活函数)

Mish激活函数，Relu太绝对
![图片](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/yolo/Mish.jpg)

#### eliminate grid sensitivity(后处理方法)

坐标回归预测值都在0-1之间，需要非常大的数值才可以达到边界，为了缓解这种情况可以在激活函数前加上一个系数：![图片](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/yolo/eliminate%20grid%20sensitivity.jpg)

### 网络架构

![图片](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/yolo/yolov4.jpg)

## YOLOv5

v5是v4的工程实现

项目地址：<https://github.com/ultralytics/yolov5>

数据集网站：<https://public.roboflow.com/>

模型可视化工具：<https://lutzroeder.github.io/netron/>

> 建议使用onnx文件，使用v5项目中的model文件夹下export.py脚本文件可以进行模型格式转换

### Focus模块

先分块，后拼接，再卷积，间隔的来完成分块任务，目的是为了加速
