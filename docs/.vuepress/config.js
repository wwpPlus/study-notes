// const { copyCode } = require('vuepress-plugin-copy-code2');
const baiduCode = require('./config/baiduCode.js'); // 百度统计hm码
const htmlModules = require('./config/htmlModules.js');

module.exports = {

  theme: 'vdoing', // 使用依赖包主题
  // theme: require.resolve('../../vdoing'), // 使用本地主题 (先将vdoing主题文件下载到本地：https://github.com/xugaoyi/vuepress-theme-vdoing)

  title: 'PZ文档',
  description: 'Java技术文档',

  base: '/study-notes/', // 默认'/'。如果你想将你的网站部署到如 https://foo.github.io/bar/，那么 base 应该被设置成 '/bar/',（否则页面将失去样式等文件）
  // base: './', // 默认'/'。如果你想将你的网站部署到如 https://foo.github.io/bar/，那么 base 应该被设置成 '/bar/',（否则页面将失去样式等文件）
  head: [ // 注入到页面<head> 中的标签，格式[tagName, { attrName: attrValue }, innerHTML?]
    ['link', { rel: 'icon', href: '/img/logo.png' }], //favicons，资源放在public文件夹
    ['meta', { name: 'keywords', content: 'vuepress,theme,blog,vdoing' }],
    ['meta', { name: 'theme-color', content: '#11a8cd' }], // 移动浏览器主题颜色

    ['meta', { name: 'wwads-cn-verify', content: '6c4b761a28b734fe93831e3fb400ce87' }], // 广告相关，你可以去掉
    ['script', { src: 'https://cdn.wwads.cn/js/makemoney.js', type: 'text/javascript' }], // 广告相关，你可以去掉
  ],

  // 主题配置
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      // {
      //   text: '指南', link: '/pages/a2f161/', items: [
      //     { text: '主题初衷与诞生', link: '/pages/52d5c3/' },
      //     { text: '介绍', link: '/pages/a2f161/' },
      //     { text: '快速上手', link: '/pages/793dcb/' },
      //     { text: '目录结构', link: '/pages/2f674a/' },
      //     { text: '核心配置和约定', link: '/pages/33d574/' },
      //     { text: '自动生成front matter', link: '/pages/088c16/' },
      //     { text: 'Markdown 容器', link: '/pages/d0d7eb/' },
      //     { text: 'Markdown 中使用组件', link: '/pages/197691/' },
      //     {
      //       text: '相关文章', items: [
      //         { text: '使目录栏支持h2~h6标题', link: '/pages/8dfab5/' },
      //         { text: '如何让你的笔记更有表现力', link: '/pages/dd027d/' },
      //         { text: '批量操作front matter工具', link: '/pages/2b8e22/' },
      //         { text: '部署', link: '/pages/0fc1d2/' },
      //         { text: '关于写文章和H1标题', link: '/pages/9ae0bd/' },
      //         { text: '关于博客搭建与管理', link: '/pages/26997d/' },
      //         { text: '在线编辑和新增文章的方法', link: '/pages/c5a54d/' },
      //       ]
      //     }
      //   ]
      // },
      {
        text: '前端',
        link: '/pages/d2f50e/',
        items: [
          {
            text: '前端基础',
            items: [
              { text: 'HTML', link: '/pages/d2f50e/' },
              { text: 'CSS', link: '/pages/fea2d7/' },
              { text: 'JavaScript', link: '/pages/8d6d1a/' },
              { text: 'ES6', link: '/pages/3aa5d6/' },
              { text: 'Npm', link: '/pages/5326c5/' },
              { text: '网络', link: '/pages/b8acc7/' },
              { text: '第三方库', link: '/pages/5332ff/' },
              { text: 'Promise', link: '/pages/e2ab93/' }
            ]
          },
          {
            text: '前端进阶',
            items: [
              { text: 'Nodejs', link: '/pages/8b6af1/' },
              { text: 'Webpack', link: '/pages/b5d3e4/' },
              { text: 'Vue', link: '/pages/26c58d/' },
              { text: 'Vue3', link: '/pages/f5fa28/' },
              { text: 'Threejs', link: '/pages/5f0e92/' },
              { text: 'TypeScript', link: '/pages/351a94/' },
              { text: '浏览器', link: '/pages/6a7c67/' },
              { text: '工程化', link: '/pages/46afd7/' }
            ]
          },
          {
            text: '前端面试题',
            items: [
              { text: 'HTML', link: '/pages/e3260c/' },
              { text: 'CSS', link: '/pages/478903/' },
              { text: 'JavaScript', link: '/pages/77bb95/' },
              { text: 'Promise', link: '/pages/f9216a/' },
              { text: '网络', link: '/pages/4b8e23/' },
              { text: '工程化', link: '/pages/bca98d/' },
              { text: 'Vue', link: '/pages/678074/' },
              { text: '浏览器', link: '/pages/70f2f1/' }
            ]
          }
        ]
      },
      {
        text: 'Java基础',
        link: '/pages/7419ce/',
        items: [
          { text: 'Linux', link: '/pages/00ce2a/' },
          { text: '设计模式', link: '/pages/c81b2a/' },
          { text: '并发编程', link: '/pages/7419ce/' },
          { text: 'Spring', link: '/pages/fba387/' },
          { text: 'MySQL', link: '/pages/236603/' },
          { text: 'JVM', link: '/pages/d0b82f/' },
        ]
      },
      {
        text: '分布式',
        link: '/pages/6e924b/',
        items: [
          { text: 'Redis', link: '/pages/6e924b/' },
          { text: 'Zookeeper', link: '/pages/6a436f/' },
          { text: 'RabbitMQ', link: '/pages/6c832f/' },
          { text: 'RocketMQ', link: '/pages/a01b22/' },
          { text: 'Dubbo', link: '/pages/3634f1/' },
          { text: 'Netty', link: '/pages/e06812/' },
        ]
      },
      {
        text: '微服务',
        link: '/pages/debdbe/',
        items: [
          { text: 'SpringBoot', link: '/pages/debdbe/' }
        ]
      },
      {
        text: '运维',
        link: '/pages/28c483/',
        items: [
          { text: 'Docker', link: '/pages/28c483/' }
        ]
      },
      {
        text: '算法笔试',
        link: '/pages/4b7495/',
        items: [
          { text: 'LeetCode', link: '/pages/4dde8d/' },
          { text: 'Acwing', link: '/pages/b9c7ad/' },
          { text: '剑指Offer1', link: '/pages/4b7495/' },
          { text: '剑指Offer2', link: '/pages/0a5a03/' }
        ]
      },
      {
        text: 'AI',
        link: '/pages/a2ac81/',
        items: [
          { text: 'Colossal-AI', link: '/pages/a2ac81/' },
          { text: 'YOLO', link: '/pages/d067ec/' },
          { text: 'EfficientNet', link: '/pages/c3610e/' }
        ]
      },
      {
        text: '项目经历',
        link: '/pages/1e0b40/',
        items: [
          { text: '简历', link: '/pages/1e0b40/' },
          { text: '软件杯', link: '/pages/13921d/' },
          { text: '科研创新实践平台', link: '/pages/ef3306/' },
          { text: '微应用设计平台', link: '/pages/5c0bdb/' },
          { text: '微服务房屋租赁系统', link: '/pages/6e6f76/' },
          { text: '分布式抽奖系统', link: '/pages/a33dfc/' }
        ]
      },
      {
        text: '工具',
        link: '/pages/6d4d7f/',
        items: [
          { text: 'git', link: '/pages/6d4d7f/' },
          { text: '快捷键', link: '/pages/be1cd8/' }
        ]
      }
    ],
    sidebarDepth: 2, // 侧边栏显示深度，默认1，最大2（显示到h3标题）
    logo: '/img/logo.png', // 导航栏logo
    repo: 'wwpPlus', // 导航栏右侧生成Github链接
    searchMaxSuggestions: 10, // 搜索结果显示最大数
    lastUpdated: '上次更新', // 更新的时间，及前缀文字   string | boolean (取值为git提交时间)

    // docsDir: 'docs', // 编辑的文件夹
    // editLinks: true, // 编辑链接
    // editLinkText: '编辑',

    // 以下配置是Vdoing主题改动的和新增的配置
    sidebar: { mode: 'structuring', collapsable: false }, // 侧边栏  'structuring' | { mode: 'structuring', collapsable: Boolean} | 'auto' | 自定义    温馨提示：目录页数据依赖于结构化的侧边栏数据，如果你不设置为'structuring',将无法使用目录页

    // sidebarOpen: false, // 初始状态是否打开侧边栏，默认true
    updateBar: { // 最近更新栏
      showToArticle: false, // 显示到文章页底部，默认true
      // moreArticle: '/archives' // “更多文章”跳转的页面，默认'/archives'
    },
    // titleBadge: false, // 文章标题前的图标是否显示，默认true
    // titleBadgeIcons: [ // 文章标题前图标的地址，默认主题内置图标
    //   '图标地址1',
    //   '图标地址2'
    // ],

    pageStyle: 'line', // 页面风格，可选值：'card'卡片 | 'line' 线（未设置bodyBgImg时才生效）， 默认'card'。 说明：card时背景显示灰色衬托出卡片样式，line时背景显示纯色，并且部分模块带线条边框

    // contentBgStyle: 1,

    category: false, // 是否打开分类功能，默认true。 如打开，会做的事情有：1. 自动生成的frontmatter包含分类字段 2.页面中显示与分类相关的信息和模块 3.自动生成分类页面（在@pages文件夹）。如关闭，则反之。
    tag: false, // 是否打开标签功能，默认true。 如打开，会做的事情有：1. 自动生成的frontmatter包含标签字段 2.页面中显示与标签相关的信息和模块 3.自动生成标签页面（在@pages文件夹）。如关闭，则反之。
    // archive: false, // 是否打开归档功能，默认true。 如打开，会做的事情有：1.自动生成归档页面（在@pages文件夹）。如关闭，则反之。

    author: { // 文章默认的作者信息，可在md文件中单独配置此信息 String | {name: String, href: String}
      name: 'wwp', // 必需
      href: 'https://gitee.com/star_wwp' // 可选的
    },
    social: { // 社交图标，显示于博主信息栏和页脚栏
      // iconfontCssFile: '//at.alicdn.com/t/font_1678482_u4nrnp8xp6g.css', // 可选，阿里图标库在线css文件地址，对于主题没有的图标可自由添加
      icons: [
        {
          iconClass: 'icon-youjian',
          title: '发邮件',
          link: '3249364788@qq.com'
        },
        {
          iconClass: 'icon-gitee',
          title: 'Gitee',
          link: 'https://gitee.com/star_wwp'
        },
        {
          iconClass: 'icon-erji',
          title: '听音乐',
          link: 'https://music.163.com/#/playlist?id=755597173'
        }
      ]
    },
    footer: { // 页脚信息
      createYear: 2024, // 博客创建年份
      copyrightInfo: 'MIT License', // 博客版权信息，支持a标签
    },
    htmlModules,
  },

  // 插件
  plugins: [
    // [require('./plugins/love-me'), { // 鼠标点击爱心特效
    //   color: '#11a8cd', // 爱心颜色，默认随机色
    //   excludeClassName: 'theme-vdoing-content' // 要排除元素的class, 默认空''
    // }],
    // copyCode({
    //   // 插件选项
    //   pure: true,
    // }),
    [
      '@vuepress/plugin-external-link-icon',
      {
        locales: {
          '/': {
            openInNewWindow: 'open in new window',
          },
          '/zh/': {
            openInNewWindow: '在新窗口打开',
          },
        },
      },
    ],
    ['fulltext-search'], // 全文搜索

    // ['thirdparty-search', { // 可以添加第三方搜索链接的搜索框（原官方搜索框的参数仍可用）
    //   thirdparty: [ // 可选，默认 []
    //     {
    //       title: '在GitHub中搜索',
    //       frontUrl: 'https://github.com/search?q=', // 搜索链接的前面部分
    //       behindUrl: '' // 搜索链接的后面部分，可选，默认 ''
    //     },
    //     {
    //       title: '在npm中搜索',
    //       frontUrl: 'https://www.npmjs.com/search?q=',
    //     },
    //     {
    //       title: '在Bing中搜索',
    //       frontUrl: 'https://cn.bing.com/search?q='
    //     }
    //   ]
    // }],

    [
      'vuepress-plugin-baidu-tongji', // 百度统计
      {
        hm: baiduCode || '01293bffa6c3962016c08ba685c79d78'
      }
    ],

    ['one-click-copy', { // 代码块复制按钮
      copySelector: ['div[class*="language-"] pre', 'div[class*="aside-code"] aside'], // String or Array
      copyMessage: '复制成功', // default is 'Copy successfully and then paste it for use.'
      duration: 1000, // prompt message display time.
      showInMobile: false // whether to display on the mobile side, default: false.
    }],
    ['demo-block', { // demo演示模块 https://github.com/xiguaxigua/vuepress-plugin-demo-block
      settings: {
        // jsLib: ['http://xxx'], // 在线示例(jsfiddle, codepen)中的js依赖
        // cssLib: ['http://xxx'], // 在线示例中的css依赖
        // vue: 'https://jsd.cdn.zzko.cn/npm/vue/dist/vue.min.js', // 在线示例中的vue依赖
        jsfiddle: false, // 是否显示 jsfiddle 链接
        codepen: true, // 是否显示 codepen 链接
        horizontal: false // 是否展示为横向样式
      }
    }],
    [
      'vuepress-plugin-zooming', // 放大图片
      {
        selector: '.theme-vdoing-content img:not(.no-zoom)',
        options: {
          bgColor: 'rgba(0,0,0,0.6)'
        },
      },
    ],
    [
      '@vuepress/last-updated', // '上次更新'时间格式
      {
        transformer: (timestamp, lang) => {
          const dayjs = require('dayjs') // https://day.js.org/
          return dayjs(timestamp).format('YYYY/MM/DD, HH:mm:ss')
        },
      }
    ]
  ],

  markdown: {
    // lineNumbers: true,
    extractHeaders: ['h2', 'h3', 'h4', 'h5', 'h6'], // 提取标题到侧边栏的级别，默认['h2', 'h3']
  },

  // 监听文件变化并重新构建
  extraWatchFiles: [
    '.vuepress/config.js',
    '.vuepress/config/htmlModules.js',
  ]
}
