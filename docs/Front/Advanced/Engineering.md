---
title: Engineering
date: 2023-11-16 17:26:40
permalink: /pages/46afd7/
---
# 工程化

## 为什么需要模块化

当前端工程到达一定规模后，就会出现下面的问题：

- 全局变量污染

- 依赖混乱

上面的问题，共同导致了**代码文件难以细分**

模块化就是为了解决上面两个问题出现的

模块化出现后，我们就可以把臃肿的代码细分到各个小文件中，便于后期维护管理

## 前端模块化标准

前端主要有两大模块化标准：

- CommonJS，简称CMJ，这是一个**社区**规范，出现时间较早，目前仅node环境支持
- ES Module，简称ESM，这是随着ES6发布的**官方**模块化标准，目前浏览器和新版本node环境均支持

> node环境
>
> 下载地址：https://nodejs.org/zh-cn/
>
> ![image-20210423130904669](http://mdrs.yuanjin.tech/img/20210423130904.png)

## CommonJS如何实现模块化

node天生支持CommonJS模块化标准

node规定：

1. node中的每个js文件都是一个CMJ模块，通过node命令运行的模块，叫做入口模块

2. 模块中的所有全局定义的变量、函数，都不会污染到其他模块

3. 模块可以暴露（导出）一些内容给其他模块使用，需要暴露什么内容，就在模块中给`module.exports`赋值

4. 一个模块可以导入其他模块，使用函数`require("要导入的模块路径")`即可完成，该函数返回目标模块的导出结果

   1. 导入模块时，可以省略`.js`
   2. 导入模块时，必须以`./`或`../`开头

5. 一个模块在被导入时会运行一次，然后它的导出结果会被node缓存起来，后续对该模块导入时，不会重新运行，直接使用缓存结果

   
## CommonJS

> 标准类型：社区规范
>
> 支持环境：node
>
> 依赖类型：动态依赖

### 如何导出

```js
module.exports = 导出的值
```

### 如何导入

```js
require("模块路径") // 函数返回模块导出的值
```

## ES Module

> 标准类型：官方标准
>
> 支持环境：node，浏览器
>
> 依赖类型：静态依赖，动态依赖

### 如何导出

**ES Module**的导出

ES Module分为两种导出方式：

- 具名导出（普通导出），可以导出多个
- 默认导出，只能导出一个

一个模块可以同时存在两种导出方式，最终会合并为一个「对象」导出

```js
export const a = 1; // 具名，常用
export function b() {} // 具名，常用
export const c = () => {}  // 具名，常用
const d = 2;
export { d } // 具名
const k = 10
export { k as temp } // 具名

// export default 3 // 默认，常用
// export default function() {} // 默认，常用
// const e = 4;
// export { e as default } // 默认

const f = 4, g = 5, h = 6
export { f, g, h as default} // 基本 + 默认

// 以上代码将导出下面的对象
/*
{
	a: 1,
	b: fn,
	c: fn,
	d: 2,
	temp: 10,
	f: 4,
	g: 5,
	default: 6
}
*/
```

**注意：导出代码必须为顶级代码，即不可放到代码块中**

### 如何导入

针对具名导出和默认导出，有不同的导入语法

```js
// 仅运行一次该模块，不导入任何内容
import "模块路径"
// 常用，导入属性 a、b，放到变量a、b中。a->a, b->b
import { a, b } from "模块路径"   
// 常用，导入属性 default，放入变量c中。default->c
import c from "模块路径"  
// 常用，default->c，a->a, b->b
import c, { a, b } from "模块路径" 
// 常用，将模块对象放入到变量obj中
import * as obj from "模块路径" 


// 导入属性a、b，放到变量temp1、temp2 中
import {a as temp1, b as temp2} from "模块路径" 
// 导入属性default，放入变量a中，default是关键字，不能作为变量名，必须定义别名
import {default as a} from "模块路径" 
//导入属性default、b，放入变量a、b中
import {default as a, b} from "模块路径" 
// 以上均为静态导入

import("模块路径") // 动态导入，返回一个Promise，完成时的数据为模块对象
```

**注意：静态导入的代码必须为在代码顶端，也不可放入代码块中**

**另外，静态导入的代码绑定的符号是常量，不可更改**

## 什么是Less？

**Less**是一种更加简洁的样式代码，它非常像CSS，但又不太一样，它让编写样式变得更容易

下面是css代码和Less代码的对比，它们都表达了一样的含义

![image-20210507125034131](http://mdrs.yuanjin.tech/img/20210507125034.png)

**Less代码虽好，但它无法被浏览器识别**，因此需要一个工具将其转换为血统纯正的css代码

由于**node环境具有读写文件的能力**，于是在node环境中可以轻松的完成文件的转换

`npm`上有一个包叫做`less`，它运行在node环境中，通过它可以完成对Less代码的转换

<img src="http://mdrs.yuanjin.tech/img/20210507105107.png" alt="image-20210507105107556" style="zoom:50%;" />

**可以看出，node环境在前端工程化中，充当了一个辅助的角色，它并不直接运行前端代码，而是让我们编写前端代码更加舒适便利，在后续的课程中，你还会不断的体会到这一点**

**转换代码，称之为编译(compile)，转换代码的工具，称之为编译器(compiler)**

### 体验Less

1. 新建`index.less`文件，编写下面的`less`代码

   ```less
   @green: #008c8c;
   .list {
     display: flex;
     flex-wrap: wrap;
     color: @green;
     li {
       margin: 1em;
       &:hover {
         background: @green;
         color: #fff;
       }
     }
   }
   ```

2. 使用`npm`下载`less`

   `less`包提供了一个`cli`工具`lessc`，你可以有两种方案使用它

   **方案一：全局安装less**

   这种方案可以让你在任何终端目录使用`lessc`命令，但不利于版本控制

   **方案二：本地安装less**

   这种方案会把`less`安装到工程目录的`node_modules`中，你无法全局使用`lessc`命令，但可以在当前工程目录中使用`npx lessc`运行该命令

   > npx是npm提供的一个小工具，它可以运行当前项目中安装到node_modules的cli命令
   >
   > 如果配置`package.json`脚本，无须使用`npx`
   >
   > 如果可以，应该尽量使用本地安装，而非全局安装

   如果可以，应该尽量使用本地安装，而非全局安装

3. 使用`lessc`命令，对编写的`less`文件进行编译

   ```shell
   # 将 index.less 编译成为 index.css
   lessc index.less index.css
   ```

4. 新建一个页面，引用编译结果`index.css`

> 目前，编写less代码会遇到一点小麻烦，就是每次编写后，都需要运行命令进行编译
>
> 这个麻烦只是暂时的，将来很快就可以解决

### Less的核心语法

>Less官网：https://lesscss.org/
>
>Less民间中文网：https://less.bootcss.com/

Less提供了非常多的功能，帮助我们更加轻松的编写css代码

其中，我们最常用的功能有下面3个：

- [变量](https://less.bootcss.com/#%E5%8F%98%E9%87%8F%EF%BC%88variables%EF%BC%89)
- [嵌套](https://less.bootcss.com/#%E5%B5%8C%E5%A5%97%EF%BC%88nesting%EF%BC%89)
- [混合](https://less.bootcss.com/#%E6%B7%B7%E5%90%88%EF%BC%88mixins%EF%BC%89)

另外，你需要关注Less的特殊[注释](https://less.bootcss.com/#%E6%B3%A8%E9%87%8A%EF%BC%88comments%EF%BC%89)

> **工程化，为复杂应用而生**
>
> 本文为保持简单，牺牲了某些语言的准确性

## 工程化工具

**webpack是用来搭建前端工程的**

它运行在node环境中，它所做的事情，简单来说，就是**打包**

<img src="http://mdrs.yuanjin.tech/img/20210508172954.png" alt="image-20210508172953979" style="zoom:50%;" />

具体来说，就是以某个模块作为入口，根据入口分析出所有模块的依赖关系，然后对各种模块进行合并、压缩，形成最终的打包结果

**在webpack的世界中，一切皆是模块**

### 体验

> 老师提供的工程，以`src/main.js`作为入口文件
>
> 按照习惯，所有的模块均放置在`src`目录中

1. 安装依赖

2. 编写多个模块

   随意编写一些模块，可以是js、图片、音视频，以入口模块为起点，形成依赖关系

3. 运行`npm run build`命令，进行打包

4. 查看打包结果

   打包结果放置在dist目录中

通过上面的体验，可以发现，webpack给我们带来了至少以下好处：

- 可以大胆的使用任意模块化标准

  无须担心兼容性问题，因为webpack完成打包后，已经没有了任何模块化语句

- 可以将一些非JS代码也视为模块

  这样可以对css、图片等资源进行更加细粒度的划分

- 在前端开发中，也可以使用npm

  webpack不会运行你的源代码，无论是你自己写的模块，还是通过npm安装的模块，webpack一视同仁，统统视为依赖，最终合并到打包结果中

- 非常适合开发单页应用

  单页应用是前端用户体验最好的web应用

  所谓单页应用，是指只有一个html页面，页面中没有任何内容，所有的内容均靠js生成

  要优雅的实现单页应用，最好依托于前端框架，比如vue、react

webpack给我们开发带来的变化远不止于此，接下来一一体验

### 页面模板

对于单页应用而言，只有一个空白的页面，所有内容都靠JS代码创建

webpack会自动生成一个页面，并且在页面中会自动加入对js和css的引用

它生成页面时，参考的是`public/index.html`，其称之为页面模板

### public目录

webpack会非常暴力的将public目录中的所有文件（除页面模板外），复制到打包结果中

### 开发服务器

如果每次修改完代码，都要经过`打包->运行`，未免太过麻烦

在开发阶段，我们可以运行`npm run serve`命令获得更好的打包体验

该命令会让`webpack`启动一个**开发服务器**。

在这个阶段，webpack并不会形成打包结果文件，而是把打包的内容放到内存中，当我们请求服务器时，服务器从内存中给予我们打包结果

与此同时，当源码发生变动时，webpack会自动重新打包，同时刷新页面以访问到最新的打包结果

![image-20210508194442940](http://mdrs.yuanjin.tech/img/20210508194443.png)

### 文件缓存

可以看到，除了页面外，其他的资源在打包完成后，文件名多了一些奇奇怪怪的字符

例如：`js/app-9ea93.js`

其中，`9ea93`这样的字符称之为`hash`，它会随着模块内容的变化而变化

**源码内容不变，hash不变；源码内容变化，hash变化**

之所以这样做，是因为生产环境中，浏览器会对除页面外的静态资源进行缓存

如果不设置hash值，一旦代码更新，浏览器还会使用之前缓存的结果，无法使用最新的代码

<img src="http://mdrs.yuanjin.tech/img/20210508183135.png" alt="image-20210508183135487" style="zoom:50%;" />

有了hash值之后，即可解决此问题

![image-20210508183454385](http://mdrs.yuanjin.tech/img/20210508183454.png)

webpack会在打包时自动处理hash值，并不会对我们写代码造成任何影响，但作为一个前端开发者，有必要了解这一点

### 资源路径

**除代码和样式模块外，其他模块被视为资源模块**

值得特别注意的是，**资源模块在源代码中的路径和打包后的路径是不一样的**，这就导致我们在编写代码的时候，根本无法知晓最终的路径

最常见的例子，就是在css中使用背景图片

```css
.container{
  /* 背景图使用了源码中的路径 */
  backgroud: url('../assets/1.png'); 
}
```

它能正常工作吗？

它能！

因为webpack非常智能的发现了这一点，对于css中的路径，webpack在打包时，会将其自动转换为打包结果的路径，比如，上面的代码在打包完成后，可能被转换为下面的格式

```css
.container{
  /* css中的资源路径会被自动替换，我们无须关心 */
  background: url(/img/1492ea.png);
}
```

但如果我们要通过js动态的使用路径，webpack是无法识别的

```js
// 打包前
const url = './assets/1.png'; // 该路径无法被转换
img.src = url;

// 打包后
const url = './assets/1.png'; // ❌
img.src = url;
```

正确的做法是，通过模块化的方式导入资源，并获取资源路径

```js
// 打包前
import url from './assets/1.png'; // 打包后，url得到的将是真实的路径
img.src = url;

// 打包后
const url = '/img/1492ea.png'; // ✅
img.src = url;
```

### 缺省的文件和后缀名

导入模块时，所有js模块均可省略`.js`，若导入的模块文件名为`index.js`，可省略文件名

```js
import './home'; // 若存在home.js，可省略js
import './movie'; // 若movie是一个目录，此次导入的是 ./movie/index.js
```

### 路径别名

随着体量的增长，不可避免的，会形成层级极深的目录

```shell
root
	|- src
		|- a
				|- a1
						|- a2
							 |- index.js
		|- b
				|- b1
						|- index.js
```

如果需要在`./src/a/a1/a2/index.js`中导入`./src/b/b1/index.js`，则可能产生下面特别恶心的代码

```js
import '../../../b/b1/index.js';
```

webpack提供了别名供我们快速定位到`./src`目录，通常，该别名为`@`

上面的导入代码可简化为

```js
import '@/b/b1'; // @表示src目录，同时省略了index.js
```

### js兼容性

当webpack读取到js代码时，会自动对其进行兼容性处理

具体的处理方案涉及到两个配置文件：

- `babel.config.js`：通过配置该文件，可以设置对哪些js代码进行降级处理
- `.browserslistrc`：通过配置该文件，可以设置在降级时，要兼容哪些浏览器，兼容的范围越光，降级产生的代码就越多，自然，打包后的体积就越大

你无须知晓具体的配置方式

### 打包压缩

webpack在打包时，会对所有js和css代码进行压缩

对于js，除了压缩之外，还会对其中的各种名称进行混淆

```js
(self.webpackChunkmovie_list=self.webpackChunkmovie_list||[]).push([[587],{3587:(r,t,n)=>{"use strict";n.r(t),n(5666),n(1539),n(8674),n(9600),n(1249),n(2222);var e=n(9755),a=n.n(e);var o;function i(r){o.html(r.map((function(r){return'<li>\n  <a href="'.concat(r.url,'" target="_blank">\n    <img src="').concat(r.cover,'" title="').concat(r.title,'">\n  </a>\n  <a href="').concat(r.url,'" target="_blank" class="').concat("qmUYQv1xlJhGMQKz-kfAp",'">').concat(r.title,'</a>\n  <p class="').concat("_3yV5wC-URYTUP0sPvaE0ZR",'">').concat(r.rate,"</p>\n  </li>")})).join(""))}o=a()("<ul>").addClass("_1fsrc5VinfYHBXCF1s58qS").appendTo("#app");var c=n(8138);const u=
```

混淆的作用一方面是为了进一步压缩包体积，另一方面是为了让我们的代码更难被其他人理解利用

### 源码地图 source map

我们运行的是webpack打包后的结果，而打包后的结果是很难阅读的

但这样一来会带来新的问题，如果代码报错，我们就难以知道到底是那一行代码写的有问题

此时源码地图就发挥了作用

可以发现，js代码打包后都会跟上一个同名的、后缀为`.map`的文件，该文件就保存了原始代码的内容

请放心，这个内容人类是看不懂的，但浏览器可以看懂

当代码报错时，浏览器会定位到源码地图中的对应代码，而不是把真实报错的代码展示给我们

你无须关心这一点，但可以自然的从其中获得巨大的便利

### css工程化

webpack能够识别**所有**的样式代码，包括`css`、`less`、`sass`、`stylus`

在打包时，会将它们转换成纯正的`css`

除此之外，它还具备以下的神奇能力

### 自动厂商前缀

css有很多兼容性问题，解决这些兼容性问题的最常见办法，就是加上厂商前缀。

比如：

```css
/* 兼容性不好的代码 */
.container{
	display: flex;
  transition: 1s;
}

/* 兼容性好的代码 */
.container {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-transition: 1s;
  transition: 1s;
}
```

webpack会根据`.browserlistrc`中指定的浏览器范围，**按需、自动**加上厂商前缀

我们开发无须关心

### css module

css文件多了后，你怎么保证它们里面没有冲突的类样式？

靠层级选择器？就不担心效率？

靠命名规范？就不担心脑袋爆炸？

要靠就靠css module

当样式文件以`xxx.mdoule.xxx`的方式命名时，webpack会将该文件当成一个开启了`css module`的文件

比如：`index.module.less`、`movie.module.css`，都是开启了`css module`的文件

**文件中的所有类名都会被hash化**

```less
// 源码
.container{}
.list{}
.item{}

// 打包结果，绝无可能重名
._2GFVidHvoHtfgtrdifua24{}
._1fsrc5VinfYHBXCF1s58qS{}
.urPUKUukdS_UTSuWRI5-5{}
```

现在就一个问题，我们在使用类名时，如何知道它打包结果的类名呢？

```js
import './index.module.less';
dom.classList.add('container'); // ❌ 最终的类名可不是这个
```

正确的方式如下：

```js
// styles 是一个对象，里面映射了源码类名和打包类名的关系
import styles from './index.module.less';
dom.classList.add(styles.container); // ✅ 属性container中记录的就是container转换后的类名
```

### 真正的webpack没有那么神奇

实际上，webpack没有做这么多事，我们不能把功劳（怨念）全归结于它

它只是站在巨人（其他流氓）肩膀上而已

下图可以看个热闹

![image-20210508203658298](http://mdrs.yuanjin.tech/img/20210508203658.png)

webpack通过插件（plugin）和加载器（loader）将这些技术整合在一起

`上图的技术 + 乱七八糟一大堆其他技术 + 老师的配置 = 呈现给你的工程`

目前，你无须理解这一些，保持敬畏即可

最后，说明一下工程中看不懂的文件：

- `.browserslistrc`，表达适配的浏览器范围，会被工程化中的其他技术所使用
- `babel.config.js`，`babel`的配置文件，做js降级处理
- `postcss.config.js`，`postcss`的配置文件，做css代码转换
- `webpack.config.js`，`webpack`的配置文件，整合其他工程化技术，以及配置打包细节、开发服务器、路径别名等等

### 对我们开发的影响

1. 学会访问开发服务器查看效果

2. 学会动态获取资源文件路径

   ```js
   import url from './assets/1.png'; 
   img.src = url;
   ```

3. 学会省略文件和后缀名

   ```js
   import './home'; // 若存在home.js，可省略js
   import './movie'; // 若movie是一个目录，此次导入的是 ./movie/index.js
   ```

4. 学会使用别名简化导入代码

   ```js
   import '@/b/b1'; // 实际导入： src/b/b1/index.js  (若b1是目录)
   ```

5. 学会使用css module

   ```js
   // styles 是一个对象，里面映射了源码类名和打包类名的关系
   import styles from './index.module.less';
   dom.classList.add(styles.container); 
   ```
