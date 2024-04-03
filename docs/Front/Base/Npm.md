---
title: Npm
date: 2023-11-16 17:26:40
permalink: /pages/5326c5/
---
# Npm

npm官网：https://www.npmjs.com/

npm全命令：https://docs.npmjs.com/cli/v7/commands

## 概念

1. 什么是**包**？

   包（package）是一个或多个js模块的集合，它们共同完成某一类功能

   可以简单的认为每一个工程就是一个包

   有些包是为了给别人用的，这种包也叫第三方库

2. 什么是**包管理器**？

   包管理器是一个管理包的工具，前端常见的包管理器有npm、yarn、cnpm、pnpm等

   包管理器具备以下能力：

   - 让开发者可以轻松的下载包
   - 让开发者可以轻松的升级和卸载包
   - 能够自动管理包的依赖

3. 什么是**cli**

   cli是一个命令行工具，它提供一个终端命令，通过该命令可以完成一些功能

## node查找包的顺序

```js
require("a")
```

1. 查找是否有内置模块a
2. 查找当前目录的node_modules中是否有a
3. 依次查找上级目录的node_modules中是否有a，直到根目录

## 配置源

### 查看源

```shell
npm config get registry
```

### 配置淘宝镜像源

```shell
npm config set registry https://registry.npm.taobao.org
```

### 配置官方源

```shell
	npm config set registry https://registry.npmjs.org/
```

## 初始化

```shell
npm init # 初始化工程，帮助生成 package.json 文件
npm init -y # 初始化工程，全部使用默认配置生成 package.json 文件
```

## package.json

```json
{
  "dependencies": { // 本地普通依赖
    "qrcode": "^1.4.4" // 依赖包qrcode，版本1.4.4，主版本号不变，此版本号和补丁版本可增
  },
  "devDenpendencies": { // 开发依赖
    "webpack": "^5.0.0" 
  }
}
```

## 安装

### 本地安装

会将包下载到当前命令行所在目录的node_modules中

绝大部分安装都使用本地安装

```shell
# 下面的 install 可以替换为 i
npm install 包名
npm install --save 包名
npm install 包名@版本号
```

若仅作为开发依赖，则添加参数`-D`

```shell
# 下面的 install 可以替换为 i
npm install -D 包名
npm install -D 包名@版本号
```

若要还原安装

```shell
# 下面的 install 可以替换为 i
npm install
npm install --production # 仅还原dependencies中的依赖
```

### 全局安装

会将包下载到一个全局的位置

只有需要使用某个全局命令时，才需要进行全局安装

```shell
# 下面的 install 可以替换为 i
npm install -g 包名
npm install -g 包名@版本号
```

## 卸载

### 本地卸载

卸载本地的安装包

```shell
# 下面的 uninstall 均可替换为 un
npm uninstall 包名
```

### 全局卸载

卸载全局的安装包

```shell
# 下面的 uninstall 均可替换为 un
npm uninstall -g 包名
```

## 查看包信息

### 查看包所有的版本

```shell
# view 可以替换为 v
npm view 包名 versions
```

## 练习1：全局安装练习

1. 全局安装`moeda`
2. 运行命令`moeda 1 cny`，查看当前人民币汇率

## 练习2：开发流程练习

1. 创建一个工程，名为`qr-shower`

2. 使用git初始化

3. 使用npm初始化

4. 添加.gitignore文件，内容如下：

   ```
   node_modules
   .DS_Store
   ```

5. git提交：init proj

6. 关联并推送到gitee

7. 新建`index.js`

8. 设置`package.json`的脚本`start`，用于运行`index.js`命令

9. 安装`qrcode`

10. 编写下面的代码

    ```js
    var QRCode = require('qrcode');
    
    QRCode.toString('I am a pony!', { type: 'terminal' }, function (err, data) {
      console.log(data);
    });
    ```

11. 运行脚本`npm start`，查看效果

12. 开发完成，提交，然后推送到gitee

13. 删除本地工程

14. 从gitee拉取工程

15. 还原依赖

16. 重新运行

## Windows系统下安装 nvm

nvm 全称为 node version manger，顾名思义就是管理 node 版本的一个工具，通过这个工具，我们可以在一台计算机上安装多个版本的 node，并且随时进行无缝的切换。

**1.  卸载原本的 node.js**

如果之前有安装过 node.js，那么首先我们需要卸载掉之前的安装

**2. 下载安装nvm**

链接:https://pan.baidu.com/s/1uoxlk8CVNHV2KTCwIGbQMQ?pwd=yi5m 

提取码: yi5m

**3. 修改nvm源**

如果直接用 nvm 命令下载 node 的话，因为源在国外，所以会导致下载失败，所以我们最好修改 nvm 的源

打开 nvm 的下载路径，如果你是一路 next 的，那么一般就在：C:\Users\你现在用的用户名\AppData\Roaming\nvm

打开 setting.txt 文件，在末尾写入：

```shell
node_mirror: https://npm.taobao.org/mirrors/node/
npm_mirror: https://npm.taobao.org/mirrors/npm/
```

**4. nvm常用命令**

```shell
# 查看当前安装和使用的 node 版本
nvm list

# 安装某个 node 版本
nvm install 版本号

# 切换 node 版本
nvm use 版本号

# 设置默认版本
nvm alias v12.22.12
```

**5. 配置 npm 源**

安装 node 之后，一般对应的 npm 也会被安装好，但是默认 npm 的源是指向 npm 官网的，这就导致我们在下载包的时候会很慢。

我们需要修改 npm 的源

```js
npm config set registry=https://registry.npm.taobao.org
npm config get registry
```
