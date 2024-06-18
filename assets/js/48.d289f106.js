(window.webpackJsonp=window.webpackJsonp||[]).push([[48],{375:function(t,s,a){"use strict";a.r(s);var o=a(8),v=Object(o.a)({},(function(){var t=this,s=t._self._c;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"yolo系列算法"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#yolo系列算法"}},[t._v("#")]),t._v(" YOLO系列算法")]),t._v(" "),s("h2",{attrs:{id:"深度学习经典检测方法"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#深度学习经典检测方法"}},[t._v("#")]),t._v(" 深度学习经典检测方法")]),t._v(" "),s("h3",{attrs:{id:"one-stage"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#one-stage"}},[t._v("#")]),t._v(" one-stage")]),t._v(" "),s("ul",[s("li",[s("p",[t._v("核心优势：速度快，适合做实时检测任务")])]),t._v(" "),s("li",[s("p",[t._v("缺点：效果通常不会太好")])]),t._v(" "),s("li",[s("p",[t._v("常见算法：YOLO系列")])])]),t._v(" "),s("h3",{attrs:{id:"two-stage"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#two-stage"}},[t._v("#")]),t._v(" two-stage")]),t._v(" "),s("ul",[s("li",[s("p",[t._v("速度通常较慢，效果通常比one-stage好一点")])]),t._v(" "),s("li",[s("p",[t._v("常见算法：Fast-rcnn MaskRcnn系列")])])]),t._v(" "),s("p",[t._v("一阶段与两阶段的区别")]),t._v(" "),s("ul",[s("li",[s("p",[t._v("一阶段：对于检测任务只利用一个cnn网络提取特征做回归")])]),t._v(" "),s("li",[s("p",[t._v("二阶段：相较于一阶段增加了一个rpn区域建议网络，为了得到最终的结果增加一个预选框，实现算法精度的提升")])])]),t._v(" "),s("h2",{attrs:{id:"指标分析"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#指标分析"}},[t._v("#")]),t._v(" 指标分析")]),t._v(" "),s("p",[t._v("precision、recall、map、iou")]),t._v(" "),s("h3",{attrs:{id:"precision计算"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#precision计算"}},[t._v("#")]),t._v(" precision计算")]),t._v(" "),s("p",[s("img",{attrs:{src:"https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/yolo/precision.jpg",alt:"图片"}})]),t._v(" "),s("h3",{attrs:{id:"recall计算"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#recall计算"}},[t._v("#")]),t._v(" recall计算")]),t._v(" "),s("p",[s("img",{attrs:{src:"https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/yolo/recall.jpg",alt:"图片"}})]),t._v(" "),s("h3",{attrs:{id:"计算指标"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#计算指标"}},[t._v("#")]),t._v(" 计算指标")]),t._v(" "),s("p",[s("img",{attrs:{src:"https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/yolo/TP_TF_FP_FN.jpg",alt:"图片"}})]),t._v(" "),s("h3",{attrs:{id:"iou-交并比-计算"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#iou-交并比-计算"}},[t._v("#")]),t._v(" iou(交并比)计算")]),t._v(" "),s("ul",[s("li",[s("p",[t._v("置信度：在检测任务中置信度用来判断边界框内的物体是正样本还是负样本，大于置信度阈值的判定为正样本，小于置信度阈值的判定为负样本即背景")])]),t._v(" "),s("li",[s("p",[t._v("当通过iou判断是正样本的情况属于P，当通过confidence阈值判断的正样本属于T，所以如果iou判断是正样本且confidence也判断是正样本时属于TP，这时剩下的实际的GT(ground truth)但置信度却小于confidence阈值的被认为是FN。")])])]),t._v(" "),s("p",[s("img",{attrs:{src:"https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/yolo/iou.jpg",alt:"图片"}})]),t._v(" "),s("h3",{attrs:{id:"map计算"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#map计算"}},[t._v("#")]),t._v(" mAP计算")]),t._v(" "),s("ul",[s("li",[s("p",[t._v("在不同的阈值中综合的p-r的情况得出一个指标")])]),t._v(" "),s("li",[s("p",[t._v("mAP值是p-r图中取p最大值与横坐标r所围成的阴影的面积，mAP值越接近于1说明效果越好")])])]),t._v(" "),s("p",[s("img",{attrs:{src:"https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/yolo/map.jpg",alt:"图片"}})]),t._v(" "),s("h3",{attrs:{id:"感受野"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#感受野"}},[t._v("#")]),t._v(" 感受野")]),t._v(" "),s("ul",[s("li",[s("p",[t._v("最后一个特征图中的点对应原始图像区域的大小称为感受野")])]),t._v(" "),s("li",[s("p",[t._v("越大的感受野能关注原始图像的信息就越多，可以检测更大的物体")])])]),t._v(" "),s("p",[s("img",{attrs:{src:"https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/yolo/receptive_field.jpg",alt:"图片"}})]),t._v(" "),s("h2",{attrs:{id:"yolov1"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#yolov1"}},[t._v("#")]),t._v(" YOLOv1")]),t._v(" "),s("h3",{attrs:{id:"核心思想"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#核心思想"}},[t._v("#")]),t._v(" 核心思想")]),t._v(" "),s("ul",[s("li",[s("p",[t._v("YOLOv1的核心思想就是利用整张图作为网络的输入，直接在输出层回归bounding box的位置和bounding box所属的类别。")])]),t._v(" "),s("li",[s("p",[t._v("实现步骤")]),t._v(" "),s("ol",[s("li",[s("p",[t._v("把图片分为不同的格子，预测每一个格子的confidence，根据置信度阈值选择格子")])]),t._v(" "),s("li",[s("p",[t._v("对选中的格子产生两种候选框\n并且计算与真实值的iou(即得到候选框的x，y，w，h)进行微调，最终得到iou值高的候选框")])])])])]),t._v(" "),s("h3",{attrs:{id:"yolov1网络架构"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#yolov1网络架构"}},[t._v("#")]),t._v(" YOLOv1网络架构")]),t._v(" "),s("p",[t._v("YOLOv1 有一个全连接fc层，限制了输入图像的大小必须是448*448*3")]),t._v(" "),s("p",[s("img",{attrs:{src:"https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/yolo/yolov1.jpg",alt:"图片"}})]),t._v(" "),s("h3",{attrs:{id:"损失函数"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#损失函数"}},[t._v("#")]),t._v(" 损失函数")]),t._v(" "),s("p",[s("code",[t._v("loss = 位置误差 + 含有object的置信度误差 + 不含有object的置信度误差 + 分类误差")])]),t._v(" "),s("p",[s("img",{attrs:{src:"https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/yolo/yolov1_loss.jpg",alt:"图片"}})]),t._v(" "),s("h3",{attrs:{id:"nms-非极大值抑制"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#nms-非极大值抑制"}},[t._v("#")]),t._v(" NMS(非极大值抑制)")]),t._v(" "),s("p",[t._v("非极大值抑制用在最后阶段，即所有边界框都已经回归调整过后，对图片每一类使用NMS防止一个目标出现多个边界框")]),t._v(" "),s("ol",[s("li",[s("p",[t._v("非极大值抑制需要设置一个阈值")])]),t._v(" "),s("li",[s("p",[t._v("使用时间是最后调整完预测框位置后")])]),t._v(" "),s("li",[s("p",[t._v("多少个类就使用多少次非极大值抑制")])]),t._v(" "),s("li",[s("p",[t._v("每一类使用非极大值抑制后找到所有这类的边界框")])])]),t._v(" "),s("h3",{attrs:{id:"yolov1中存在的问题"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#yolov1中存在的问题"}},[t._v("#")]),t._v(" YOLOv1中存在的问题")]),t._v(" "),s("ul",[s("li",[s("p",[t._v("每一个格子cell只预测一个类别，这就导致了两个重叠在一起的物体很难检测")])]),t._v(" "),s("li",[s("p",[t._v("小物体检测效果一般，长宽比可选，但太过单一")])])]),t._v(" "),s("h2",{attrs:{id:"yolov2"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#yolov2"}},[t._v("#")]),t._v(" YOLOv2")]),t._v(" "),s("p",[s("img",{attrs:{src:"https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/yolo/yolov2vsv1.jpg",alt:"图片"}})]),t._v(" "),s("h3",{attrs:{id:"yolov2改进"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#yolov2改进"}},[t._v("#")]),t._v(" YOLOv2改进")]),t._v(" "),s("ul",[s("li",[s("p",[t._v("Batch Normalization")]),t._v(" "),s("ul",[s("li",[s("p",[t._v("v2版本舍弃dropout，卷积后全部加入Batch Normalization(conv-BN)")])]),t._v(" "),s("li",[s("p",[t._v("网络的每一层的输入都做了归一化，收敛相对更容易")])]),t._v(" "),s("li",[s("p",[t._v("通过Batch Normalization处理后的网络会提升2%的mAP")])])])]),t._v(" "),s("li",[s("p",[t._v("更大的分辨率")]),t._v(" "),s("ul",[s("li",[s("p",[t._v("v1训练时用的是224*224，测试时使用448*448")])]),t._v(" "),s("li",[s("p",[t._v("可能导致模型水土不服，v2训练时额外又进行了10次448*448的微调")])]),t._v(" "),s("li",[s("p",[t._v("使用高分辨率分类器后，YOLOv2的mAP提升了约4%")])])])]),t._v(" "),s("li",[s("p",[t._v("聚类提取先验框")]),t._v(" "),s("ul",[s("li",[s("p",[t._v("v1采用2种先验框，相较于faster-rcnn采用9种先验框数量太少")])]),t._v(" "),s("li",[s("p",[t._v("聚类提取，将真实数据集中的标注框聚类分成k类作为先验框")])]),t._v(" "),s("li",[s("p",[t._v("K-means聚类中的距离："),s("code",[t._v("d(box,centroids) = 1-IOU(box,centroids)")]),t._v("，其中k = 5")])])])]),t._v(" "),s("li",[s("p",[t._v("Anchor Box")]),t._v(" "),s("ul",[s("li",[t._v("通过anchor boxes，使得预测的box数量更多(13*13*n)，提升recall")])])]),t._v(" "),s("li",[s("p",[t._v("Directed Location Prediction")]),t._v(" "),s("ul",[s("li",[s("p",[t._v("v1中使用偏移量调整先验框")]),t._v(" "),s("ul",[s("li",[s("p",[t._v("bbox：中心为(xp，yp)；宽和高为(wp，hp)，则："),s("code",[t._v("x = xp + wp * tx")]),t._v("、"),s("code",[t._v("y = yp + hp * ty")])])]),t._v(" "),s("li",[s("p",[t._v("tx=1，则将bbox在x轴向右移动wp；")])]),t._v(" "),s("li",[s("p",[t._v("这样会导致收敛问题，模型不稳定，尤其是刚开始训练的时候")])])])]),t._v(" "),s("li",[s("p",[t._v("相对位置偏移"),s("img",{attrs:{src:"https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/yolo/yolov2_directed_location_prediction.jpg",alt:"图片"}})])])])]),t._v(" "),s("li",[s("p",[t._v("Fine-Grained Features")]),t._v(" "),s("ul",[s("li",[s("p",[t._v("最后一层感受野太大，小目标可能会丢失，需要融合之前的特征")])]),t._v(" "),s("li",[s("p",[t._v("融合过程\n"),s("img",{attrs:{src:"https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/yolo/Fine-Grained%20Features.jpg",alt:"图片"}})])])])]),t._v(" "),s("li",[s("p",[t._v("Multi-Scale")]),t._v(" "),s("ul",[s("li",[t._v("都是卷积操作，对输入数据每经过几次迭代之后改变图像的大小")])])])]),t._v(" "),s("h3",{attrs:{id:"yolov2网络结构"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#yolov2网络结构"}},[t._v("#")]),t._v(" YOLOv2网络结构")]),t._v(" "),s("ul",[s("li",[s("p",[t._v("DarkNet，实际输入416*416")])]),t._v(" "),s("li",[s("p",[t._v("没有FC层，5次降采样，(12*13)")])]),t._v(" "),s("li",[s("p",[t._v("1*1卷积节省很多参数")])])]),t._v(" "),s("p",[t._v("DarkNet19\n"),s("img",{attrs:{src:"https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/yolo/yolov2.jpg",alt:"图片"}})]),t._v(" "),s("h2",{attrs:{id:"yolov3"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#yolov3"}},[t._v("#")]),t._v(" YOLOv3")]),t._v(" "),s("h3",{attrs:{id:"yolov3改进"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#yolov3改进"}},[t._v("#")]),t._v(" YOLOv3改进")]),t._v(" "),s("ul",[s("li",[s("p",[t._v("v3最大的改进就是网络结构，使其更适合小目标检测")])]),t._v(" "),s("li",[s("p",[t._v("特征做的更细致，融入多持续特征图信息来检测不同规格的物体")])]),t._v(" "),s("li",[s("p",[t._v("先验框更丰富，3种scale，每种3个规格，一共9种，根据感受野大小划分scale")]),t._v(" "),s("ul",[s("li",[s("p",[t._v("不同的特征图融合后进行预测")])]),t._v(" "),s("li",[s("p",[t._v("特征图大小不一致时经过上采样后融合"),s("img",{attrs:{src:"https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/yolo/yolov3_feature_fusion.jpg",alt:"图片"}})])])])]),t._v(" "),s("li",[s("p",[t._v("softmax层改进，预测多标签任务")]),t._v(" "),s("ul",[s("li",[s("p",[t._v("使用logistic激活函数，对每一个类别做二分类"),s("img",{attrs:{src:"https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/yolo/sigmoid.png",alt:"图片"}})])]),t._v(" "),s("li",[s("p",[t._v("设定阈值进行判断")])])])]),t._v(" "),s("li",[s("p",[t._v("v3中也应用了resnet的思想，利用残差连接堆叠更多层来进行特征提取"),s("img",{attrs:{src:"https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/yolo/resnet.jpg",alt:"图片"}})])])]),t._v(" "),s("h3",{attrs:{id:"yolov3网络架构"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#yolov3网络架构"}},[t._v("#")]),t._v(" YOLOv3网络架构")]),t._v(" "),s("ul",[s("li",[s("p",[t._v("网络架构\n"),s("img",{attrs:{src:"https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/yolo/yolov3.jpg",alt:"图片"}})])]),t._v(" "),s("li",[s("p",[t._v("conv\n"),s("img",{attrs:{src:"https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/yolo/yolov3(2).jpg",alt:"图片"}})])])]),t._v(" "),s("h2",{attrs:{id:"yolov4"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#yolov4"}},[t._v("#")]),t._v(" YOLOv4")]),t._v(" "),s("ul",[s("li",[s("p",[t._v("单GPU就能训练的非常好")])]),t._v(" "),s("li",[s("p",[t._v("两大核心方法，从数据层面和网络层面来进行改善")])]),t._v(" "),s("li",[s("p",[t._v("消融实验")])])]),t._v(" "),s("h3",{attrs:{id:"bag-of-freebies-bof"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#bag-of-freebies-bof"}},[t._v("#")]),t._v(" Bag of freebies(BOF)")]),t._v(" "),s("ol",[s("li",[s("p",[t._v("数据层面的改进")])]),t._v(" "),s("li",[s("p",[t._v("只增加训练成本，但是能显著提高精度，并不影响推理速度")])])]),t._v(" "),s("h4",{attrs:{id:"数据增强"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#数据增强"}},[t._v("#")]),t._v(" 数据增强")]),t._v(" "),s("ul",[s("li",[s("p",[t._v("调整亮度、对比度、色调、随即缩放、剪切、翻转、旋转")])]),t._v(" "),s("li",[s("p",[t._v("Mosaic data augmentation：参考CutMix然后四张图像拼接成一张进行训练，间接增加batch_size")])]),t._v(" "),s("li",[s("p",[t._v("Random Erase：用随机值或训练集的平均像素值替换图像的区域")])]),t._v(" "),s("li",[s("p",[t._v("Hide and Seek：根据概率设置随机隐藏一些补丁")])]),t._v(" "),s("li",[s("p",[t._v("Self-adversarial-training(SAT)：通过引入噪音点来增加网络学习难度")])])]),t._v(" "),s("h4",{attrs:{id:"网络正则化的方法"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#网络正则化的方法"}},[t._v("#")]),t._v(" 网络正则化的方法")]),t._v(" "),s("ul",[s("li",[t._v("DropBlock：之前的dropout是随机选择点drop掉，现在是drop掉一块区域，使得网络泛化能力更强，过拟合风险更低")])]),t._v(" "),s("h4",{attrs:{id:"类别不平衡-损失函数设计"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#类别不平衡-损失函数设计"}},[t._v("#")]),t._v(" 类别不平衡，损失函数设计")]),t._v(" "),s("ul",[s("li",[s("p",[t._v("Label Smoothing：使得标签不再绝对化，降低过拟合风险，"),s("code",[t._v("例如原来的标签为(0,1):[0,1] * (1-0.1) + 0.1/2 = [0.05,0.95]")]),t._v("，使得簇间更分离")])]),t._v(" "),s("li",[s("p",[t._v("IOU损失的缺点：没有相交则IOU=0无法梯度计算，相同的IOU反映不出实际情况")])]),t._v(" "),s("li",[s("p",[t._v("GIOU")]),t._v(" "),s("ul",[s("li",[s("p",[t._v("公式："),s("img",{attrs:{src:"https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/yolo/GIOU.jpg",alt:"图片"}})])]),t._v(" "),s("li",[s("p",[t._v("引入了最小封闭形状C(C可以把A，B包含在内)")])]),t._v(" "),s("li",[s("p",[t._v("在不重叠情况下能让预测框尽可能朝着真实框前进")])]),t._v(" "),s("li",[s("p",[t._v("重叠情况下无法进行判断")])])])]),t._v(" "),s("li",[s("p",[t._v("DIOU\n"),s("img",{attrs:{src:"https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/yolo/DIOU.jpg",alt:"图片"}})])]),t._v(" "),s("li",[s("p",[t._v("CIOU(YOLOv4使用的损失函数)\n"),s("img",{attrs:{src:"https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/yolo/CIOU.jpg",alt:"图片"}})])]),t._v(" "),s("li",[s("p",[t._v("DIOU-NMS\n"),s("img",{attrs:{src:"https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/yolo/DIOU-NMS.jpg",alt:"图片"}})])]),t._v(" "),s("li",[s("p",[t._v("SOFT-NMS\n更改分数再判断是否剔除\n"),s("img",{attrs:{src:"https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/yolo/SOFT-NMS.jpg",alt:"图片"}})])])]),t._v(" "),s("h3",{attrs:{id:"bag-of-specials-bos"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#bag-of-specials-bos"}},[t._v("#")]),t._v(" Bag of specials(BOS)")]),t._v(" "),s("ol",[s("li",[s("p",[t._v("网络层面的改进")])]),t._v(" "),s("li",[s("p",[t._v("增加稍许推断代价，但是可以提高模型精度的方法")])]),t._v(" "),s("li",[s("p",[t._v("网络细节引入了各种能让特征提取更好的方法")])]),t._v(" "),s("li",[s("p",[t._v("注意力机制，网络细节设计，特征金字塔等")])])]),t._v(" "),s("h4",{attrs:{id:"sppnet-spatial-pyramid-pooling"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#sppnet-spatial-pyramid-pooling"}},[t._v("#")]),t._v(" SPPNet(Spatial Pyramid Pooling)")]),t._v(" "),s("p",[t._v("用最大池化来满足最终输入特征一致")]),t._v(" "),s("h4",{attrs:{id:"cspnet-cross-stage-partial-network-yolov4使用"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#cspnet-cross-stage-partial-network-yolov4使用"}},[t._v("#")]),t._v(" CSPNet(Cross Stage Partial Network)YOLOv4使用")]),t._v(" "),s("ol",[s("li",[s("p",[t._v("每一个block按照特征图的channel维度拆分成两部分")])]),t._v(" "),s("li",[s("p",[t._v("一部分正常走网络，另一部分直接concat到这个block的输出")])])]),t._v(" "),s("p",[s("img",{attrs:{src:"https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/yolo/CSPNet.jpg",alt:"图片"}})]),t._v(" "),s("h4",{attrs:{id:"cbam-convolutional-block-attention-module"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#cbam-convolutional-block-attention-module"}},[t._v("#")]),t._v(" CBAM(Convolutional Block Attention Module)")]),t._v(" "),s("p",[t._v("加入注意力机制\n"),s("img",{attrs:{src:"https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/yolo/CBAM.jpg",alt:"图片"}})]),t._v(" "),s("h4",{attrs:{id:"sam-spatial-attention-module-yolov4使用"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#sam-spatial-attention-module-yolov4使用"}},[t._v("#")]),t._v(" SAM(Spatial Attention Module)YOLOv4使用")]),t._v(" "),s("p",[t._v("YOLOv4采用自定义的SAM\n"),s("img",{attrs:{src:"https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/yolo/yolov4_SAM.jpg",alt:"图片"}})]),t._v(" "),s("h4",{attrs:{id:"fpn"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#fpn"}},[t._v("#")]),t._v(" FPN")]),t._v(" "),s("p",[t._v("自顶向下的模式，将高层特征传下来，单向\n"),s("img",{attrs:{src:"https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/yolo/FPN.jpg",alt:"图片"}})]),t._v(" "),s("h4",{attrs:{id:"pan-path-aggregation-network-yolov4使用"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#pan-path-aggregation-network-yolov4使用"}},[t._v("#")]),t._v(" PAN(Path Aggregation Network)YOLOv4使用")]),t._v(" "),s("p",[t._v("引入了自底向上的路径，使得底层信息更容易传到顶部")]),t._v(" "),s("p",[s("img",{attrs:{src:"https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/yolo/PAN.jpg",alt:"图片"}})]),t._v(" "),s("p",[t._v("YOLOv4中并不是加法，是特征拼接的方式\n"),s("img",{attrs:{src:"https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/yolo/yolov4_PAN.jpg",alt:"图片"}})]),t._v(" "),s("h4",{attrs:{id:"mish-yolov4使用的激活函数"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#mish-yolov4使用的激活函数"}},[t._v("#")]),t._v(" Mish(YOLOv4使用的激活函数)")]),t._v(" "),s("p",[t._v("Mish激活函数，Relu太绝对\n"),s("img",{attrs:{src:"https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/yolo/Mish.jpg",alt:"图片"}})]),t._v(" "),s("h4",{attrs:{id:"eliminate-grid-sensitivity-后处理方法"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#eliminate-grid-sensitivity-后处理方法"}},[t._v("#")]),t._v(" eliminate grid sensitivity(后处理方法)")]),t._v(" "),s("p",[t._v("坐标回归预测值都在0-1之间，需要非常大的数值才可以达到边界，为了缓解这种情况可以在激活函数前加上一个系数："),s("img",{attrs:{src:"https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/yolo/eliminate%20grid%20sensitivity.jpg",alt:"图片"}})]),t._v(" "),s("h3",{attrs:{id:"网络架构"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#网络架构"}},[t._v("#")]),t._v(" 网络架构")]),t._v(" "),s("p",[s("img",{attrs:{src:"https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/yolo/yolov4.jpg",alt:"图片"}})]),t._v(" "),s("h2",{attrs:{id:"yolov5"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#yolov5"}},[t._v("#")]),t._v(" YOLOv5")]),t._v(" "),s("p",[t._v("v5是v4的工程实现")]),t._v(" "),s("p",[t._v("项目地址："),s("a",{attrs:{href:"https://github.com/ultralytics/yolov5",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://github.com/ultralytics/yolov5"),s("OutboundLink")],1)]),t._v(" "),s("p",[t._v("数据集网站："),s("a",{attrs:{href:"https://public.roboflow.com/",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://public.roboflow.com/"),s("OutboundLink")],1)]),t._v(" "),s("p",[t._v("模型可视化工具："),s("a",{attrs:{href:"https://lutzroeder.github.io/netron/",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://lutzroeder.github.io/netron/"),s("OutboundLink")],1)]),t._v(" "),s("blockquote",[s("p",[t._v("建议使用onnx文件，使用v5项目中的model文件夹下export.py脚本文件可以进行模型格式转换")])]),t._v(" "),s("h3",{attrs:{id:"focus模块"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#focus模块"}},[t._v("#")]),t._v(" Focus模块")]),t._v(" "),s("p",[t._v("先分块，后拼接，再卷积，间隔的来完成分块任务，目的是为了加速")])])}),[],!1,null,null,null);s.default=v.exports}}]);