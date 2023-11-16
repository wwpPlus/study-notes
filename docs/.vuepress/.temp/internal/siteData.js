export const siteData = {
  "base": "/my-docs/",
  "lang": "zh-CN",
  "title": "小白学习文档",
  "description": "从小小白到小白",
  "head": [
    [
      "link",
      {
        "rel": "icon",
        "href": "/imgs/favicon.ico"
      }
    ]
  ],
  "locales": {}
}

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateSiteData) {
    __VUE_HMR_RUNTIME__.updateSiteData(siteData)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ siteData }) => {
    __VUE_HMR_RUNTIME__.updateSiteData(siteData)
  })
}
