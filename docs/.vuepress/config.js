const { copyCode } = require("vuepress-plugin-copy-code2");

module.exports = {
  // 站点配置
  base: "/my-docs/",
  lang: "zh-CN",
  head: [["link", { rel: "icon", href: "/imgs/favicon.ico" }]],
  title: "小白学习文档",
  description: "从小小白到小白",
  // 主题和它的配置
  theme: "@vuepress/theme-default",
  themeConfig: {
    logo: "/imgs/favicon.ico",
    lastUpdated: false,
    navbar: [
      {
        text: "前端",
        ariaLabel: "前端菜单",
        children: [
          { text: "前端基础", link: "/Front/Base/CSS.md" },
          { text: "前端进阶", link: "/Front/Advanced/Vue.md" },
          { text: "前端面试题", link: "/Front/Interview/HTML.md" }
        ]
      },
      {
        text: "Java",
        link: "/Back/Docker.md",
      },
      {
        text: "算法",
        link: "/Algorithm/Acwing.md",
      },
      {
        text: "AI",
        link: "/AI/YOLO.md",
      },
      {
        text: "项目经历",
        children: [
          { text: "简历", link: "/Project/Resume.md" },
          { text: "软件杯", link: "/Project/软件杯.md" },
          { text: "科研创新实践平台", link: "/Project/experimental-platform.md" },
          { text: "微应用设计平台", link: "/Project/web-app.md" },
          { text: "微服务房屋租赁系统", link: "/Project/house-rent.md" }
        ]
      },
      { 
        text: "工具", 
        link: "/Tools/git.md" 
      }
    ],
    sidebar: {
      "/Front/Base/": [
        {
          text: "前端基础",
          children: ["/Front/Base/README.md", "/Front/Base/HTML.md", "/Front/Base/CSS.md", "/Front/Base/JavaScript.md", "/Front/Base/ES6.md", "/Front/Base/Npm.md", "/Front/Base/Network.md", "/Front/Base/Libraries.md", "/Front/Base/Promise.md"],
        },
      ],
      "/Front/Advanced": [
        {
          text: "前端进阶",
          children: ["/Front/Advanced/Nodejs.md", "/Front/Advanced/Webpack.md", "/Front/Advanced/Vue.md", "/Front/Advanced/Vue3.md", "/Front/Advanced/Threejs.md", "/Front/Advanced/TypeScript.md", "/Front/Advanced/Browser.md", "/Front/Advanced/Engineering.md"],
        },
      ],
      "/Front/Interview": [
        {
          text: "前端面试题",
          children: ["/Front/Interview/HTML.md", "/Front/Interview/CSS.md", "/Front/Interview/JavaScript.md", "/Front/Interview/Promise.md", "/Front/Interview/Vue.md", "/Front/Interview/网络.md", "/Front/Interview/工程化.md", "/Front/Interview/浏览器.md"],
        },
      ],
      "/Back/": [
        {
          text: "Java",
          children: ["/Back/README.md", "/Back/Spring.md", "/Back/Linux.md", "/Back/Docker.md", "/Back/Redis.md", "/Back/RocketMQ.md", "/Back/Design-Pattern.md"],
        },
      ],
      "/Algorithm/": [
        {
          text: "数据结构与算法",
          children: ["/Algorithm/Acwing.md", "/Algorithm/LeetCode.md", "/Algorithm/Offer1.md", "/Algorithm/Offer2.md"],
        },
      ],
      "/AI/": [
        {
          text: "CV",
          children: ["/AI/YOLO.md", "/AI/EfficientNet.md", "/AI/Colossal-AI.md"],
        },
      ],
      "/Project/": [
        {
          text: "项目经历",
          children: ["/Project/Resume.md", "/Project/软件杯.md", "/Project/experimental-platform.md", "/Project/web-app.md", "/Project/house-rent.md"],
        },
      ],
      "/Tools/": [
        {
          text: "常用工具",
          children: ["/Tools/git.md", "/Tools/Shortcut.md"],
        },
      ],
    },
  },
  plugins: [
    // https://vuepress-theme-hope.github.io/v2/copy-code/zh/
    copyCode({
      // 插件选项
      pure: true,
    }),
    [
      "@vuepress/plugin-external-link-icon",
      {
        locales: {
          "/": {
            openInNewWindow: "open in new window",
          },
          "/zh/": {
            openInNewWindow: "在新窗口打开",
          },
        },
      },
    ],
    [
      "@vuepress/plugin-search",
      {
        locales: {
          "/": {
            placeholder: "Search",
          },
          "/zh/": {
            placeholder: "搜索",
          },
        },
      },
    ],
  ],
};