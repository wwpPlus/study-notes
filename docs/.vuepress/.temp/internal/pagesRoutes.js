import { Vuepress } from '@vuepress/client/lib/components/Vuepress'

const routeItems = [
  ["v-8daa1a0e","/",{"title":"首页"},["/index.html","/README.md"]],
  ["v-6c1df2da","/Algorithm/Acwing.html",{"title":"AcWing 算法学习"},["/Algorithm/Acwing","/Algorithm/Acwing.md"]],
  ["v-41fc89ea","/Algorithm/LeetCode.html",{"title":"LeetCode 刷题"},["/Algorithm/LeetCode","/Algorithm/LeetCode.md"]],
  ["v-6a9b6d2a","/Algorithm/Offer1.html",{"title":"剑指Offer Ⅰ"},["/Algorithm/Offer1","/Algorithm/Offer1.md"]],
  ["v-30e3f50e","/Algorithm/",{"title":"前言"},["/Algorithm/index.html","/Algorithm/README.md"]],
  ["v-ee18bf28","/AI/Colossal-AI.html",{"title":"Colossal简介"},["/AI/Colossal-AI","/AI/Colossal-AI.md"]],
  ["v-e793e262","/AI/EfficientNet.html",{"title":"EfficientNet"},["/AI/EfficientNet","/AI/EfficientNet.md"]],
  ["v-3eb821b2","/AI/YOLO.html",{"title":"YOLO系列算法"},["/AI/YOLO","/AI/YOLO.md"]],
  ["v-ed64942e","/Back/Design-Pattern.html",{"title":"设计模式"},["/Back/Design-Pattern","/Back/Design-Pattern.md"]],
  ["v-99309aec","/Back/Docker.html",{"title":"Docker"},["/Back/Docker","/Back/Docker.md"]],
  ["v-570f1e74","/Back/Linux.html",{"title":"Linux"},["/Back/Linux","/Back/Linux.md"]],
  ["v-1292a8af","/Back/",{"title":"前言"},["/Back/index.html","/Back/README.md"]],
  ["v-2d97464d","/Back/Redis.html",{"title":"Redis"},["/Back/Redis","/Back/Redis.md"]],
  ["v-e011c81c","/Back/RocketMQ.html",{"title":"RocketMQ"},["/Back/RocketMQ","/Back/RocketMQ.md"]],
  ["v-0aaa8abd","/Back/Spring.html",{"title":"Spring"},["/Back/Spring","/Back/Spring.md"]],
  ["v-46e45ca0","/Project/experimental-platform.html",{"title":"科研实践创新平台"},["/Project/experimental-platform","/Project/experimental-platform.md"]],
  ["v-4010d6b8","/Project/house-rent.html",{"title":"微服务房屋租赁系统"},["/Project/house-rent","/Project/house-rent.md"]],
  ["v-2193d206","/Project/Resume.html",{"title":"简历"},["/Project/Resume","/Project/Resume.md"]],
  ["v-0d16b4b8","/Project/Resume1.html",{"title":"简历"},["/Project/Resume1","/Project/Resume1.md"]],
  ["v-064cdd00","/Project/web-app.html",{"title":"微应用平台"},["/Project/web-app","/Project/web-app.md"]],
  ["v-3846f925","/Project/%E8%BD%AF%E4%BB%B6%E6%9D%AF.html",{"title":"软件杯"},["/Project/软件杯.html","/Project/%E8%BD%AF%E4%BB%B6%E6%9D%AF","/Project/软件杯.md","/Project/%E8%BD%AF%E4%BB%B6%E6%9D%AF.md"]],
  ["v-22ded954","/Tools/git.html",{"title":"git 常用命令"},["/Tools/git","/Tools/git.md"]],
  ["v-2e714974","/Tools/Shortcut.html",{"title":"快捷键"},["/Tools/Shortcut","/Tools/Shortcut.md"]],
  ["v-46f9dd42","/Front/Advanced/Browser.html",{"title":"浏览器"},["/Front/Advanced/Browser","/Front/Advanced/Browser.md"]],
  ["v-2805bd58","/Front/Advanced/Engineering.html",{"title":"工程化"},["/Front/Advanced/Engineering","/Front/Advanced/Engineering.md"]],
  ["v-1b289700","/Front/Advanced/Nodejs.html",{"title":"Nodejs"},["/Front/Advanced/Nodejs","/Front/Advanced/Nodejs.md"]],
  ["v-6201c880","/Front/Advanced/Threejs.html",{"title":"Three.js"},["/Front/Advanced/Threejs","/Front/Advanced/Threejs.md"]],
  ["v-2a7bfde6","/Front/Advanced/TypeScript.html",{"title":"TypeScript"},["/Front/Advanced/TypeScript","/Front/Advanced/TypeScript.md"]],
  ["v-4e59767e","/Front/Advanced/Vue.html",{"title":"Vue"},["/Front/Advanced/Vue","/Front/Advanced/Vue.md"]],
  ["v-46e6e19e","/Front/Advanced/Vue3.html",{"title":"Vue3"},["/Front/Advanced/Vue3","/Front/Advanced/Vue3.md"]],
  ["v-9569878c","/Front/Advanced/Webpack.html",{"title":"webpack"},["/Front/Advanced/Webpack","/Front/Advanced/Webpack.md"]],
  ["v-7c0ed5d6","/Front/Base/CSS.html",{"title":"CSS"},["/Front/Base/CSS","/Front/Base/CSS.md"]],
  ["v-603e64d0","/Front/Base/ES6.html",{"title":"ES6"},["/Front/Base/ES6","/Front/Base/ES6.md"]],
  ["v-863290a2","/Front/Base/HTML.html",{"title":"HTML"},["/Front/Base/HTML","/Front/Base/HTML.md"]],
  ["v-4a820a2d","/Front/Base/JavaScript.html",{"title":"JavaScript"},["/Front/Base/JavaScript","/Front/Base/JavaScript.md"]],
  ["v-0e29caff","/Front/Base/Libraries.html",{"title":"第三方库"},["/Front/Base/Libraries","/Front/Base/Libraries.md"]],
  ["v-3339544a","/Front/Base/Network.html",{"title":"网络"},["/Front/Base/Network","/Front/Base/Network.md"]],
  ["v-6318392d","/Front/Base/Npm.html",{"title":"Npm"},["/Front/Base/Npm","/Front/Base/Npm.md"]],
  ["v-04ff7d06","/Front/Base/Promise.html",{"title":"Promise"},["/Front/Base/Promise","/Front/Base/Promise.md"]],
  ["v-2a965982","/Front/Base/",{"title":"前言"},["/Front/Base/index.html","/Front/Base/README.md"]],
  ["v-77e98383","/Front/Interview/CSS.html",{"title":"CSS"},["/Front/Interview/CSS","/Front/Interview/CSS.md"]],
  ["v-75d8d1fe","/Front/Interview/HTML.html",{"title":"HTML"},["/Front/Interview/HTML","/Front/Interview/HTML.md"]],
  ["v-010aa3ff","/Front/Interview/JavaScript.html",{"title":"JavaScript"},["/Front/Interview/JavaScript","/Front/Interview/JavaScript.md"]],
  ["v-5b5848eb","/Front/Interview/Promise.html",{"title":"Promise"},["/Front/Interview/Promise","/Front/Interview/Promise.md"]],
  ["v-52eaf1e0","/Front/Interview/Vue.html",{"title":"Vue"},["/Front/Interview/Vue","/Front/Interview/Vue.md"]],
  ["v-52de6175","/Front/Interview/%E5%B7%A5%E7%A8%8B%E5%8C%96.html",{"title":"工程化"},["/Front/Interview/工程化.html","/Front/Interview/%E5%B7%A5%E7%A8%8B%E5%8C%96","/Front/Interview/工程化.md","/Front/Interview/%E5%B7%A5%E7%A8%8B%E5%8C%96.md"]],
  ["v-de0372ea","/Front/Interview/%E6%B5%8F%E8%A7%88%E5%99%A8.html",{"title":"浏览器"},["/Front/Interview/浏览器.html","/Front/Interview/%E6%B5%8F%E8%A7%88%E5%99%A8","/Front/Interview/浏览器.md","/Front/Interview/%E6%B5%8F%E8%A7%88%E5%99%A8.md"]],
  ["v-4fb4e5d0","/Front/Interview/%E7%BD%91%E7%BB%9C.html",{"title":"网络"},["/Front/Interview/网络.html","/Front/Interview/%E7%BD%91%E7%BB%9C","/Front/Interview/网络.md","/Front/Interview/%E7%BD%91%E7%BB%9C.md"]],
  ["v-3706649a","/404.html",{"title":""},["/404"]],
]

export const pagesRoutes = routeItems.reduce(
  (result, [name, path, meta, redirects]) => {
    result.push(
      {
        name,
        path,
        component: Vuepress,
        meta,
      },
      ...redirects.map((item) => ({
        path: item,
        redirect: path,
      }))
    )
    return result
  },
  [
    {
      name: "404",
      path: "/:catchAll(.*)",
      component: Vuepress,
    }
  ]
)
