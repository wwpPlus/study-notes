export const data = {
  "key": "v-ee18bf28",
  "path": "/AI/Colossal-AI.html",
  "title": "Colossal简介",
  "lang": "zh-CN",
  "frontmatter": {},
  "excerpt": "",
  "headers": [
    {
      "level": 2,
      "title": "分布式训练",
      "slug": "分布式训练",
      "children": [
        {
          "level": 3,
          "title": "为什么需要分布式训练",
          "slug": "为什么需要分布式训练",
          "children": []
        },
        {
          "level": 3,
          "title": "分布式训练的基本概念",
          "slug": "分布式训练的基本概念",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "关键技术：异构训练再升级",
      "slug": "关键技术-异构训练再升级",
      "children": []
    },
    {
      "level": 2,
      "title": "模型训练优化方案",
      "slug": "模型训练优化方案",
      "children": [
        {
          "level": 3,
          "title": "便捷高效并行扩展（多GPU）",
          "slug": "便捷高效并行扩展-多gpu",
          "children": []
        },
        {
          "level": 3,
          "title": "其他优化方案",
          "slug": "其他优化方案",
          "children": []
        }
      ]
    },
    {
      "level": 2,
      "title": "Colossal-AI 的使用",
      "slug": "colossal-ai-的使用",
      "children": [
        {
          "level": 3,
          "title": "Colossal-AI 的工作流",
          "slug": "colossal-ai-的工作流",
          "children": []
        },
        {
          "level": 3,
          "title": "构建配置文件",
          "slug": "构建配置文件",
          "children": []
        },
        {
          "level": 3,
          "title": "初始化",
          "slug": "初始化",
          "children": []
        },
        {
          "level": 3,
          "title": "自动混合精度训练 (AMP)",
          "slug": "自动混合精度训练-amp",
          "children": []
        },
        {
          "level": 3,
          "title": "并行配置",
          "slug": "并行配置",
          "children": []
        },
        {
          "level": 3,
          "title": "基于Chunk内存管理的零冗余优化器 (ZeRO)",
          "slug": "基于chunk内存管理的零冗余优化器-zero",
          "children": []
        },
        {
          "level": 3,
          "title": "NVMe offload（异步 Tensor I/O 库）",
          "slug": "nvme-offload-异步-tensor-i-o-库",
          "children": []
        },
        {
          "level": 3,
          "title": "ColoTensor",
          "slug": "colotensor",
          "children": []
        }
      ]
    }
  ],
  "git": {
    "contributors": []
  },
  "filePathRelative": "AI/Colossal-AI.md"
}

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
