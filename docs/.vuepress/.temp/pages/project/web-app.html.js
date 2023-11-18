export const data = {
  "key": "v-064cdd00",
  "path": "/Project/web-app.html",
  "title": "微应用平台",
  "lang": "zh-CN",
  "frontmatter": {},
  "excerpt": "",
  "headers": [],
  "git": {
    "contributors": [
      {
        "name": "wwp",
        "email": "3249364788@qq.com",
        "commits": 1
      }
    ]
  },
  "filePathRelative": "Project/web-app.md"
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
