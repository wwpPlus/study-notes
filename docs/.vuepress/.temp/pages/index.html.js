export const data = {
  "key": "v-8daa1a0e",
  "path": "/",
  "title": "首页",
  "lang": "zh-CN",
  "frontmatter": {
    "home": true,
    "title": "首页",
    "heroImage": "/imgs/logo.svg",
    "actions": [
      {
        "text": "前端",
        "link": "/Front/Base/",
        "type": "secondary"
      },
      {
        "text": "后端 →",
        "link": "/Back/",
        "type": "primary"
      }
    ],
    "features": [
      {
        "title": "💡 记录学习到的技术",
        "details": "包括前后端、实战项目"
      },
      {
        "title": "📚 记录遇到的问题",
        "details": "包括日常项目遇到的问题、面试题"
      },
      {
        "title": "📦 总结案例",
        "details": "包括实验室项目、学习项目"
      }
    ],
    "footer": "小牛马笔记"
  },
  "excerpt": "",
  "headers": [],
  "git": {
    "contributors": []
  },
  "filePathRelative": "README.md"
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
