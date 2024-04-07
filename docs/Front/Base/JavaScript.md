---
title: JavaScript
date: 2023-11-16 17:26:40
permalink: /pages/8d6d1a/
---
# JavaScript

## JavaScript基础

### JavaScript数据类型

在 JavaScript 中有 6 种不同的数据类型：

- string
- number
- boolean
- object
- function
- symbol

3 种对象类型：

- Object
- Date
- Array

2 个不包含任何值的数据类型：

- null
- undefined

### JavaScript变量的生存期

- 局部变量会在函数运行以后被删除。
- 全局变量会在页面关闭后被删除。

### JavaScript声明提升

声明提升：函数声明和变量声明总是会被解释器悄悄地被"提升"到方法体的最顶部。
JavaScript 只有声明的变量会提升，初始化的不会。

### this关键字

- 在方法中，this 表示该方法所属的对象。
- 如果单独使用，this 表示全局对象。
- 在函数中，this 表示全局对象。
- 在函数中，在严格模式下，this 是未定义的(undefined)。
- 在事件中，this 表示接收事件的元素。
- 类似 call() 和 apply() 方法可以将 this 引用到任何对象。

在下面实例中，当我们使用 person2 作为参数来调用 person1.fullName 方法时, this 将指向 person2, 即便它是 person1 的方法：

```js
var person1 = {
    fullName: function() {
        return this.firstName + " " + this.lastName;
    }
}
var person2 = {
    firstName:"John",
    lastName: "Doe",
}
person1.fullName.call(person2);  // 返回 "John Doe"
```

### let和const关键字

- 使用 `var` 关键字重新声明变量可能会带来问题。
在块中重新声明变量也会重新声明块外的变量, `let` 关键字就可以解决这个问题，因为它只在 `let` 命令所在的代码块 `{}` 内有效。

> `let` 关键字定义的变量则不可以在使用后声明，也就是变量需要先声明再使用。

- `const` 用于声明一个或多个常量，声明时必须进行初始化，且初始化后值不可再修改。

> `const` 的本质: `const` 定义的变量并非常量，并非不可变，它定义了一个常量引用一个值。使用 const 定义的对象或者数组，其实是可变的，但是不能对常量对象、数组重新赋值。

### 函数

箭头函数

有的箭头函数都没有自己的 this。 不适合定义一个 对象的方法。
当我们使用箭头函数的时候，箭头函数会默认帮我们绑定外层 this 的值，所以在箭头函数中 this 的值和外层的 this 是一样的。
箭头函数是不能提升的，所以需要在使用之前定义。

函数参数

- 显式参数在函数定义时列出。显式参数时没有指定数据类型。
- 隐式参数在函数调用时传递给函数真正的值。隐式参数没有进行类型检测、参数的个数也没有进行检测。

函数有个内置的对象 arguments 对象包含了函数调用的参数数组。

- 通过值传递参数：在函数中调用的参数是函数的隐式参数。函数仅仅只是获取值。如果函数修改参数的值，不会修改显式参数的初始值（在函数外定义）。隐式参数的改变在函数外是不可见的。

- 通过对象传递参数：可以引用对象的值。因此我们在函数内部修改对象的属性就会修改其初始的值。修改对象属性可作用于函数外部（全局变量）。修改对象属性在函数外是可见的。

- 严格模式(strict mode)下, 在调用函数时第一个参数会成为 this 的值， 即使该参数不是一个对象。

- 非严格模式(non-strict mode)下, 如果第一个参数的值是 null 或 undefined, 它将使用全局对象替代。

闭包
在 `JavaScript` 中，所有函数都能访问它们上一层的作用域。
`JavaScript` 支持嵌套函数。嵌套函数可以访问上一层的函数变量。

```js
var add = (function () {
    var counter = 0;
    return function () {return counter += 1;}
})();
add();
add();
add();
// 计数器为 3
```

实例解析

计数器受匿名函数的作用域保护，只能通过 add 方法修改。

1. 变量 add 指定了函数自我调用的返回字值。

2. 自我调用函数只执行一次。设置计数器为 0。并返回函数表达式。

3. add变量可以作为一个函数使用。非常棒的部分是它可以访问函数上一层作用域的计数器。

4. 这个叫作 JavaScript 闭包。它使得函数拥有私有变量变成可能。

> 闭包是一种保护私有变量的机制，在函数执行时形成私有的作用域，保护里面的私有变量不受外界干扰。直观的说就是形成一个不销毁的栈环境。

### JavaScript prototype（原型对象）

所有的 JavaScript 对象都会从一个 prototype（原型对象）中继承属性和方法。

所有 JavaScript 中的对象都是位于原型链顶端的 Object 的实例。

JavaScript 对象有一个指向一个原型对象的链。当试图访问一个对象的属性时，它不仅仅在该对象上搜寻，还会搜寻该对象的原型，以及该对象的原型的原型，依次层层向上搜索，直到找到一个名字匹配的属性或到达原型链的末尾。

### 原型链

#### 什么是原型链

**所有的对象都是通过`new 函数`的方式创建的**

```js
var u1 = new User('邓', '旭明'); // 对象 u1 通过 new User 创建
var u2 = { // 对象 u2 通过 new Object 创建
  firstName: '莫',
  lastName: '妮卡'
}
// 等效于
var u2 = new Object(); 
u2.firstName = '莫';
u2.lastName = '妮卡';
```

上面的代码形成的原型图如下

![image-20210903081220607](http://mdrs.yuanjin.tech/img/20210903081220.png)

原型对象本身也是一个对象，默认情况下，是通过`new Object`创建的，因此，上面的两幅原型图是可以发生关联的

<img src="http://mdrs.yuanjin.tech/img/20210903082540.png" alt="image-20210903082540379" style="zoom:50%;" />

> `Object.prototype.__proto__`比较特殊，它固定指向null

可以看出，u1的隐式原型形成了一个链条，称之为**原型链**

当读取对象成员时，会先看对象自身是否有该成员，如果没有，就依次在其原型链上查找

#### 完整的链条

![image-20210903152359095](http://mdrs.yuanjin.tech/img/20210903152359.png)

#### 对开发的影响

##### 在原型上更改会产生多大影响

更改构造函数的原型会对所有原型链上有该构造函数的原型的对象产生影响

##### 学会利用原型链判断类型

1. `instanceof`关键字【常用】

   ```js
   object instanceof constructor
   // 判断object的原型链中，是否存在constructor的原型
   ```

2. `Object.getPrototypeOf()`【不常用】

   ```js
   Object.getPrototypeOf(object);
   // 返回object的隐式原型
   ```

##### 学会创建空原型的对象

1. 利用`Object.create()`

   ```js
   Object.create(target);
   // 返回一个新对象，新对象以target作为隐式原型
   ```

2. 利用`Object.setPrototypeOf()`

   ```js
   Object.setPrototypeOf(obj, prototype);
   // 设置obj的隐式原型为prototype
   ```

### 继承

#### 会员系统

视频网站有两种会员：

- 普通会员
  - 属性：用户名、密码
  - 方法：观看免费视频
- VIP会员
  - 属性：普通会员的所有属性、会员到期时间
  - 方法：普通会员的所有方法、观看付费视频

如果我们需要使用构造函数来创建会员，如何书写构造函数才能实现上面的需求？

```js
// 普通会员的构造函数
function User(username, password){
  this.username = username;
  this.password = password;
}
User.prototype.playFreeVideo = function(){
  console.log('观看免费视频')
}

// VIP会员的构造函数
function VIPUser(username, password, expires){
  this.username = username;
  this.password = password;
  this.expires = expires;
}
VIPUser.prototype.playFreeVideo = function(){
  console.log('观看免费视频')
}
VIPUser.prototype.playPayVideo = function(){
  console.log('观看付费视频')
}
```

上面的代码出现了两处重复代码：

1. VIPUser的构造函数中包含重复代码

   ```js
   this.username = username;
   this.password = password;
   ```

   这段代码和User构造函数并没有区别，可以想象得到，将来也不会有区别，即**：普通用户该有的属性，VIP用户一定有**

2. VIPUser的原型上包含了重复代码

   ```js
   VIPUser.prototype.playFreeVideo = function(){
     console.log('观看免费视频')
   }
   ```

   这个方法和User上的同名方法逻辑完全一致，可以想象得到，将来也不会有区别，即**：普通用户该有的方法，VIP用户一定有**

> 如何解决上述两处重复？

#### 处理构造器内部的重复

可以将VIPUser构造器改写为

```js
function VIPUser(username, password, expires){
  User.call(this, username, password);
  this.expires = expires;
}
```

#### 处理原型上的重复

只需要将原型链设置为下面的结构即可

<img src="http://mdrs.yuanjin.tech/img/20211214155347.png" alt="image-20211214155342118" style="zoom:50%;" />

仅需一句代码即可

```js
Object.setPrototypeOf(VIPUser.prototype, User.prototype)
```

至此，完美的解决了之前提到的两处重复代码的问题

#### 这和继承有什么关系

继承是面向对象的概念，它描述了两个对象类型（类，构造函数）之间的关系

如果在逻辑上可以描述为：A不一定是B，但B一定是A，则：B继承A、A派生B、A是B的父类、B是A的子类

**子类的实例应该自动拥有父类的所有成员**

继承具有两个特性：

- 单根性：子类最多只有一个父类
- 传递性：间接父类的成员会传递到子类中

#### 如何在JS中封装继承

```js
function inherit(Child, Parent){
  // 在原型链上完成继承 
  Object.setPrototypeOf(Child.prototype, Parent.prototype);
}
```

### 异常

> 重点是**异常的分类**
>
> 剩余两部分的知识，绝大部分情况下都用不到，除非你要写一些 *高端* 的代码

![image-20211222175234095](http://mdrs.yuanjin.tech/img/20211222175234.png)

**异常并非坏事，它可以让开发人员及时发现错误、定位错误，甚至在某些时候，我们还需要故意的抛出异常**

#### 异常的分类

在JS中，异常表现为一个对象，不同的对象表达了不同的异常类型，不同类型的异常对应到不同的错误

| 异常类型           | 含义                                         |
| ------------------ | -------------------------------------------- |
| **SyntaxError**    | 语法错误                                     |
| **ReferenceError** | 引用错误，往往是使用了未定义的变量或函数     |
| **TypeError**      | 类型错误，往往是使用了一个对象中不存在的成员 |

**每个异常都是一个对象，通过对应的构造函数创建**

> 所有的异常构造器都继承自Error，更多信息参见[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Error)

当代码运行过程中出现错误时，JS会：

1. 自动创建对应的异常对象，抛出错误
2. 程序终止运行
3. 控制台中会显示异常对象

每个异常对象都至少记录了**两个关键信息**：

1. 错误消息描述：描述异常出现的原因
2. 调用堆栈信息：描述异常出现的位置

#### 捕获异常

捕获异常就是处理错误，当错误发生后，我们对错误进行相应的处理，让程序不至于终止

```js
try{
  // 代码1
}
catch(err){
  // 代码2：当代码1出现异常后，会执行这里的代码，异常对象会传递给err
}
finally{
  // 代码3：可省略。无论是否有异常，都会执行
}

// 无异常的执行顺序：代码1 --> 代码3
// 有异常的执行顺序：代码1 --> 出现异常，中断代码1的执行 --> 代码2 --> 代码3
```

**在绝大部分时候，我们都无须捕获异常，除非满足以下要求**：

1. 我们能够预知某段代码会出现异常
2. 我们知道出现异常后要做什么

上面的条件任意一个不满足，都不应该处理异常

**永远不能为了不报错而捕获异常！**

下面是一段可能使用异常捕获的伪代码

```js
try {
  var heros = network.getHeros(); // 从网络获取王者荣耀英雄数据，得到英雄数组
  createHTML(heros); // 将数组生成HTML
}
catch(err) {
  // 出现网络故障，给用户显示一个提示框
  showErrorDialog('网络故障，请检查您的网络是否连接正常。故障原因：' + err.message);
}
```

#### 手动抛出异常

不仅浏览器会自动给我们抛出异常，我们还可以手动的抛出异常

```js
throw 异常对象; // 当代码运行到这里，会终止执行，抛出异常对象，效果和浏览器抛出的错误完全一样
```

当编写函数时，如果满足下面三个条件，就可以选择抛出异常：

1. 预知执行过程中可能会出现某种错误
2. 浏览器不会抛出这个错误
3. 该函数无法处理这个错误

下面展现了一个需要抛出异常的例子

```js
/**
 * 得到两个数字之和
 * 若传递的不是数字，则会抛出TypeError
 * @param {number} a 数字1
 * @param {number} b 数字2
 * @return {number} 两数之和
 */
function sum(a, b){
  if(typeof a !== 'number' || typeof b !== 'number'){
    throw new TypeError('必须传入两个数字才能求和')
  }
  return a + b;
}
```

**规范：如果某个函数需要抛出异常，一定要在函数的文档注释中阐述清楚**

## 浏览器的渲染流程

### 解析HTML

浏览器从网络或本地文件中获取到HTML源代码，然后从上到下的解析源代码

若解析过程中，读取到CSS或JS，**停止解析（阻塞）**，转而解析CSS或执行JS

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <link rel="stylesheet" href="./css/index.css">
</head>
<body>
  <h1>Hello World!</h1>
  <script src="./js/index.js"></script>
  <p>Lorem</p>
</body>
</html>
```

<img src="http://mdrs.yuanjin.tech/img/20211222115309.png" alt="image-20211222115303832" style="zoom:50%;" />

> **为什么要将CSS写到页面的开头，而JS写到页面的最后？**
>
> 将CSS写到页面开头，是为了让浏览器尽快读取并解析样式，避免给用户看到丑陋的页面，也是为了避免页面闪烁
>
> 将JS代码写到最后，是为了让浏览器尽快呈现页面给用户，然后再执行JS完成交互功能

### 生成DOM树

**浏览器会一边解析HTML，一边生成DOM树**，我们在JS中获取到的DOM就是DOM树中的DOM

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-11-20-091428.png" alt="image-20211120171428854" style="zoom:50%;" />

> 当DOM树完全生成好后，会触发`DOMContentLoaded`事件
>
> ```js
> document.addEventListener("DOMContentLoaded", function() {
>   console.log("DOM树已全部生成完毕");
> });
> ```
>
> 当页面中的所有外部资源全部加载完毕后，会触发`load`事件
>
> ```js
> window.onload = function(){
>   console.log("所有资源已加载完成");
> }
> ```
>
> `load`事件也可以针对单个外部资源使用，资源加载完成后触发

### 生成渲染树

**浏览器一边生成DOM树，一边计算DOM树中每个节点的样式规则，最终形成渲染树**。

CSS属性的计算过程，发生在这一个步骤

<img src="https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-11-20-091551.png" alt="image-20211120171550663" style="zoom:50%;" />

### 布局 layout / 重排 reflow

这个步骤又称之为**reflow（回流、重排）**，是指浏览器一边生成渲染树，一边计算每个元素最终的尺寸和位置

完成后，页面中的所有元素的位置和尺寸就确定下来了，即将被渲染到页面。

这个步骤会在页面之后的运行过程中不断的重复，**下面的JS操作均会导致reflow**：

- 获取元素的尺寸和位置
- 直接或间接改变元素的尺寸和位置

> reflow非常耗时，浏览器为了提升性能，对JS中**连续**导致reflow的代码，把reflow的时间点延迟到结束后进行，但在此过程中，如果遇到了获取尺寸和位置的代码，浏览器会迫不得已立即reflow
>
> ```js
> dom.style.width = '100px'
> dom.style.height = '200px'
> dom.style.left = '10px'
> dom.style.top = '10px'
> ```
>
> <img src="http://mdrs.yuanjin.tech/img/20211222145016.png" alt="image-20211222145016258" style="zoom:50%;" />
>
> ```js
> dom.style.width = '100px'
> dom.style.height = '200px'
> dom.clientHeight; // 读取高度，导致强行reflow
> dom.style.left = '10px'
> dom.style.top = '10px'
> ```
>
> <img src="http://mdrs.yuanjin.tech/img/20211222145207.png" alt="image-20211222145207563" style="zoom:50%;" />

### 重绘 repaint

浏览器一边reflow，一边进行生成对应的图形绘制到页面，绘制的过程称之为repaint

**所有会导致reflow的代码，均会导致repaint**

绘制的过程是靠GPU完成的，速度非常快，因此，**相对于导致reflow的代码，仅会导致repaint的代码效率会高出很多**

凡是不会影响盒子排列，仅影响盒子外观的代码都不会导致reflow，仅导致repaint，例如：

- 改变背景颜色
- 改变字体颜色
- 圆角边框
- 背景图
- ......

## 技巧

### 在循环中注册事件

```js
for (var i = 0; i < 3; i++) {
  setTimeout(function () {
    console.log(i);
  }, 1000);
}
// 输出：3 3 3

for (var i = 0; i < 3; i++) {
  // 产生一个新的作用域，作用域中有一个变量，值和这一次循环的i相同
  (function (i) {
    setTimeout(function () {
      console.log(i);
    }, 1000);
  })(i);
}
// 输出：0 1 2
// 使用let 定义i 效果类似，块级作用域（代码块内有效）
```

### 回调函数

```js
function filter(arr, callback) {
  var res = [];
  for (var i = 0; i < arr.length; i++) {
    if (callback(arr[i])) {
      res.push(arr[i]);
    }
  }
  return res;
}
var res = filter(arr, function (item) {
  return item.age > 20;
})
```

### 函数防抖

使用条件

1. 函数频繁被触发
2. 以最后一次结果为准

```js
function debounce(fn, duration) {
  var timerId;
  return function () {
    clearTimeout(timerId);
    // 将该函数的this传递到fn
    var curThis = this;
    // 将该函数的参数全部传递给fn
    var args = Array.prototype.slice.call(arguments, 0);

    timerId = setTimeout(function () {
    fn.apply(curThis, args);
  }, duration);
}};

var newHandler = debounce(function (e) {
  console.log('用户有按键', e, this.value, '耗时操作');
}, 2000);

var inp = document.querySelector('input');
inp.addEventListener('input', newHandler);

var mouseMoveHandler = debounce(function () {
  console.log('move');
}, 1000);

window.addEventListener('mousemove', mouseMoveHandler);
```

### 断点调试

**debugger**

## 标准库

### 包装类

如果尝试着把原始类型（number、string、boolean）当做对象使用，JS会自动将其转换为对应包装类的实例

#### Number

https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number

| API                                                                                                                             | 含义                             | 备注                         |
| ------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- | ---------------------------- |
| [Number.NaN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/NaN)                       | 表示一个数学上并不存在的数字     | 可以直接书写为`NaN`          |
| [Number.isNaN()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/isNaN)                 | 判断传入的值是否是NaN            | 可以直接书写为`isNaN`        |
| [Number.isInteger()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger)         | 判断传入的值是否是整数           |                              |
| [Number.parseInt()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/parseInt)           | 把传入的值转换为整数形式返回     | 可以直接书写为`parseInt()`   |
| [Number.parseFloat()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/parseFloat)       | 把传入的值转换为小数形式返回     | 可以直接书写为`parseFloat()` |
| [Number.prototype.toFixed()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed)   | 将当前数字保留指定位数的小数返回 | 传入小数位数                 |
| [Number.prototype.toString()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/tostring) | 将当前数字转换为字符串返回       | 传入进制2-36                 |

#### String

https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String

| API                                                                                                                                   | 含义                                                                                     | 备注                   |
| ------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ---------------------- |
| [String.fromCharCode()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/fromCharCode)         | 根据编码值得到一个字符                                                                   | 传入一个或多个编码值   |
| [String.prototype.length](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/length)             | 得到字符串的长度                                                                         |                        |
| [String.prototype.charCodeAt()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/charCodeAt)   | 得到某个下标的字符编码                                                                   | 传入下标               |
| [String.prototype.includes()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/includes)       | 判断当前字符串是否包含某个子串                                                           | 传入子串               |
| [String.prototype.indexOf()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf)         | 判断某个字符串在当前字符串中的第一个下标位置                                             | 如果没有，返回-1       |
| [String.prototype.lastIndexOf()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/lastIndexOf) | 判断某个字符串在当前字符串中的最后一个下标位置                                           | 如果没有，返回-1       |
| [String.prototype.endsWith()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith)       | 判断某个字符串是否以指定的字符串结束                                                     | 传入一个字符串         |
| [String.prototype.startsWith()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith)   | 判断某个字符串是否以指定的字符串开始                                                     | 传入一个字符串         |
| [String.prototype.padStart()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/padStart)       | 将当前的字符串按照指定的字符在字符串开始位置填充到指定的位数，返回填充后的字符串         | 传入位数、填充字符     |
| [String.prototype.padEnd()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/padEnd)           | 将当前的字符串按照指定的字符在字符串结束位置填充到指定的位数，返回填充后的字符串         | 传入位数、填充字符     |
| [String.prototype.split()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/split)             | 把当前字符串按照某个字符串分割成一个字符串数组返回                                       | 传入分隔符             |
| [String.prototype.substring()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/substring)     | 返回一个字符串在开始索引到结束索引之间的一个子集, 或从开始索引直到字符串的末尾的一个子集 | 传入开始字符、结束字符 |
| [String.prototype.trim()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/Trim)               | 从字符串的两端删除空白字符，返回新字符串                                                 | 无参数                 |
| [String.prototype.trimStart()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/trimStart)     | 从字符串的开头删除空白字符，返回新字符串                                                 | 无参数                 |
| [String.prototype.trimEnd()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/trimEnd)         | 从字符串的末端删除空白字符，返回新字符串                                                 | 无参数                 |
| [String.prototype.toUpperCase()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/toUpperCase) | 将调用该方法的字符串转为大写形式并返回                                                   | 无参数                 |
| [String.prototype.toLowerCase()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/toLowerCase) | 将调用该方法的字符串转为小写形式并返回                                                   | 无参数                 |
| [String.prototype.replace()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/replace)         | 替换字符串中的第一个对应字符为新字符                                                     |                        |
| [String.prototype.replaceAll()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/replaceall)   | 替换字符串中的所有对应字符为新字符                                                       |                        |

### 数学

https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math

| API                                                                                                           | 含义                      | 备注            |
| ------------------------------------------------------------------------------------------------------------- | ------------------------- | --------------- |
| [Math.PI](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/PI)           | 得到圆周率π               |                 |
| [Math.abs()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/abs)       | 求某个数绝对值            | 传入一个数      |
| [Math.ceil()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/ceil)     | 向上取整                  | 传入一个数      |
| [Math.floor()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/floor)   | 向下取整                  | 传入一个数      |
| [Math.max()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/max)       | 求一个数列中的最大值      | 把数列依次传入  |
| [Math.min()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/min)       | 求一个数列中的最小值      | 把数列依次传入  |
| [Math.random()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/random) | 得到一个0-1之间的随机小数 | 无参；无法取到1 |
| [Math.round()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/round)   | 返回四舍五入的结果        | 传入一个数      |

### 日期

#### 时间基础知识

##### 单位

| 单位               | 名称 | 换算                  |
| ------------------ | ---- | --------------------- |
| hour               | 小时 | 1 day = 24 hours      |
| minute             | 分钟 | 1 hour = 60 minutes   |
| second             | 秒   | 1 minute = 60 seconds |
| millisecond （ms） | 毫秒 | 1 second = 1000 ms    |
| nanosecond （ns）  | 纳秒 | 1 ms = 1000 ns        |

##### GMT和UTC

世界划分为24个时区，北京在东8区，格林威治在0时区。

![时区](https://gblobscdn.gitbook.com/assets%2F-LQcTxgqTqhC05ckLpLr%2F-LikgRi0I4q8Q0a3kFgz%2F-LikgSk-E-e8AcD50vHu%2F2019-07-02-11-14-46.png?alt=media)

**GMT**：Greenwish Mean Time 格林威治世界时。太阳时，精确到毫秒。

**UTC**：Universal Time Coodinated 世界协调时。以原子时间为计时标准，精确到纳秒。

> 国际标准中，已全面使用UTC时间，而不再使用GMT时间

GMT和UTC时间在文本表示格式上是一致的，均为`星期缩写, 日期 月份 年份 时间 GMT`，例如：

```
Thu, 27 Aug 2020 08:01:44 GMT
```

另外，ISO 8601标准规定，建议使用以下方式表示时间：

```
YYYY-MM-DDTHH:mm:ss.msZ
例如：
2020-08-27T08:01:44.000Z
```

**GMT、UTC、ISO 8601都表示的是零时区的时间**

##### Unix 时间戳

> Unix 时间戳（Unix Timestamp）是Unix系统最早提出的概念

它将UTC时间1970年1月1日凌晨作为起始时间，到指定时间经过的秒数（毫秒数）

### 程序中的时间处理

**程序对时间的计算、存储务必使用UTC时间，或者时间戳**

**在和用户交互时，将UTC时间或时间戳转换为更加友好的文本**

<img src="http://mdrs.yuanjin.tech/img/20200827163636.png" alt="image-20200827163636508" style="zoom:50%;" />

思考下面的问题：

1. 用户的生日是本地时间还是UTC时间？
2. 如果要比较两个日期的大小，是比较本地时间还是比较UTC时间？
3. 如果要显示文章的发布日期，是显示本地时间还是显示UTC时间？
4. `北京时间2020-8-28 10:00:00`和`格林威治2020-8-28 02:00:00`，两个时间哪个大，哪个小？
5. `北京的时间戳为0`和`格林威治的时间戳为0`，它们的时间一样吗？
6. 一个中国用户注册时填写的生日是`1970-1-1`，它出生的UTC时间是多少？时间戳是多少？

#### 日期API

https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date

构造函数：

```js
new Date(); // 得到一个当前日期对象
new Date(value); // 根据时间戳得到一个日期对象
new Date(dateString); // 根据一个标准日期字符串得到一个日期对象
new Date(year, monthIndex [, day [, hours [, minutes [, seconds [, milliseconds]]]]]); // 根据年、月、日、小时、分钟、秒、毫秒得到一个日期对象
```

| API                                                                                                                                       | 含义                   | 备注                     |
| ----------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- | ------------------------ |
| [Date.now()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/now)                                   | 得到当前时间戳         | 无参                     |
| [Date.prototype.getFullYear()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/getFullYear)         | 得到年                 | 无参；本地时间；         |
| [Date.prototype.getMonth()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/getMonth)               | 得到月                 | 无参；本地时间；范围0-11 |
| [Date.prototype.getDate()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/getDate)                 | 得到日                 | 无参；本地时间；         |
| [Date.prototype.getHours()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/getHours)               | 得到小时               | 无参；本地时间；         |
| [Date.prototype.getMinutes()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/getMinutes)           | 得到分钟               | 无参；本地时间；         |
| [Date.prototype.getSeconds()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/getSeconds)           | 得到秒                 | 无参；本地时间；         |
| [Date.prototype.getMilliseconds()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/getMilliseconds) | 得到毫秒               | 无参；本地时间；         |
| [Date.prototype.toLocaleString()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString)   | 得到日期本地的表示方式 |                          |

### 对象

https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object

| API                                                                                                                               | 含义                                     | 备注         |
| --------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- | ------------ |
| [Object.assign()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)                 | 将多个对象的属性混合到一起               | 后面覆盖前面 |
| [Object.getPrototypeOf()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/getPrototypeOf) | 获取一个对象的隐式原型                   |              |
| [Object.setPrototypeOf()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf) | 设置一个对象的隐式原型                   |              |
| [Object.create()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/create)                 | 创建一个新对象，同时设置新对象的隐式原型 |              |

### 数组

https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array

| API                                                                                                                                 | 含义                                                   | 备注                                               |
| ----------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ | -------------------------------------------------- |
| [Array.prototype.concat()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/concat)           | 把多个数组拼接成一个                                   |                                                    |
| [Array.prototype.includes()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/includes)       | 判断数组中是否包含某个值                               |                                                    |
| [Array.prototype.indexOf()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf)         | 得到数组中某个值的第一个下标                           | 若不存在则返回-1                                   |
| [Array.prototype.lastIndexOf()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/lastIndexOf) | 得到数组中某个值的最后一个下标                         | 若不存在则返回-1                                   |
| [Array.prototype.join()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/join)               | 把数组中每一项使用某个字符连接起来，形成一个字符串返回 |                                                    |
| [Array.prototype.push()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/push)               | 向数组的末尾添加一项                                   |                                                    |
| [Array.prototype.unshift()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift)         | 向数组的开头添加一项                                   |                                                    |
| [Array.prototype.pop()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/pop)                 | 删除数组最后一项                                       | 返回被删除的值                                     |
| [Array.prototype.shift()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/shift)             | 删除数组第一项                                         | 返回被删除的值                                     |
| [Array.prototype.splice()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/splice)           | 删除、修改、插入任何位置的值                           |                                                    |
| [Array.prototype.reverse()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse)         | 将数组中的元素顺序颠倒                                 |                                                    |
| [Array.prototype.sort()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)               | 对数组进行排序                                         | 传入比较函数：0-位置不变，<0-前者在前，>0-前者在后 |
| [Array.prototype.slice()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)             | 对数组进行切割                                         |                                                    |

### 函数

https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function

| API                                                                                                                           | 含义               | 备注                     |
| ----------------------------------------------------------------------------------------------------------------------------- | ------------------ | ------------------------ |
| [Function.prototype.apply()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/apply) | 执行函数，绑定this | 参数列表以数组的形式传递 |
| [Function.prototype.call()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/call)   | 执行函数，绑定this | 参数列表依次传递         |

### 正则表达式

#### 创建正则对象

```js
// 构造函数
new RegExp('规则', '标识')
// 字面量书写
/规则/标识
```

#### 正则常用方法

```js
// reg是正则对象
reg.test('字符串'); // 验证字符串是否满足规则
```

```js
// reg是正则对象，str是字符串
str.replace(reg, '替换目标'); // 将字符串中匹配正则的部分替换为目标

// 将字符串中匹配正则的部分传入到回调函数的参数中，将函数的返回结果进行替换
str.replace(reg, function(s){
  return '替换目标'
})
```

#### 标识

| 标识字符 | 含义                                     |
| -------- | ---------------------------------------- |
| i        | 不区分大小写                             |
| g        | 全局匹配，如果没有此标识，只会匹配第一个 |
| m        | 多行匹配                                 |

#### 规则

详见：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_Expressions

##### 字符匹配规则

| 规则书写               | 含义                                     |
| ---------------------- | ---------------------------------------- |
| `直接书写一个普通字符` | 匹配书写的字符                           |
| `[字符规则]`           | 匹配[]中出现的所有字符规则               |
| `[^字符串规则]`        | 匹配[]中**没有**出现的字符规则           |
| `.`                    | 匹配任意字符                             |
| `\d`                   | 匹配数字，等价于 `[0-9]`                 |
| `\D`                   | 匹配非数字                               |
| `\s`                   | 匹配空白字符，包括空格、回车、换行、制表 |
| `\S`                   | 匹配所有非空白字符                       |
| `\w`                   | 匹配单词字符，等价于 `[A-Za-z0-9_]`      |
| `\W`                   | 匹配非单词字符，等价于 `[^A-Za-z0-9_]`   |
| `^`                    | 匹配字符串开始，写到规则开始位置         |
| `$`                    | 匹配字符串结束，写到规则结束位置         |
| `\\`                   | 匹配`\`                                  |

##### 连续的规则

多个规则可以连续书写，用以匹配多个字符，例如：

```js
/\d[a-zA-Z]/  // 匹配以1个数字紧跟一个字母
```

若多个规则是一个或者的关系，使用`|`分割

```js
/\d[a-zA-Z]|[a-zA-Z]\d/ // 匹配以1个数字紧跟一个字母，或者一个字母紧跟一个数字
```

##### 规则的重复（量词）

一个或一段规则之后，可以紧跟一个量词，表示前面的规则出现的次数

```js
/[a-zA-Z]\d{3}/  // 匹配1个字母，后面跟上连续的3个数字，{3}是量词，应用的规则是\d
```

```js
/([a-zA-Z]\d){3}/  // {3}是量词，应用的规则是 [a-zA-Z]\d
```

| 量词     | 含义                         |
| -------- | ---------------------------- |
| `{n}`    | 出现n次                      |
| `{n, m}` | 出现n-m次                    |
| `{n,}`   | 至少出现n次                  |
| `*`      | 出现0次或多次，等价于`{0,}`  |
| `?`      | 出现0次或一次，等价于`{0,1}` |
| `+`      | 出现1次或多次，等价于`{1,}`  |

## WebAPI

和标准库不同，WebAPI 是**浏览器**提供的一套 API，用于操作浏览器窗口和界面

WebAPI 中包含两个部分：

- BOM：Browser Object Model，浏览器模型，提供和浏览器相关的操作
- DOM：Document Object Model，文档模型，提供和页面相关的操作

<img src="http://mdrs.yuanjin.tech/img/20211215154644.png" alt="image-20211215154639275" style="zoom:50%;" />

### BOM

BOM 提供了一系列的对象和函数，提供和浏览器本身相关的操作

#### window

全局对象

https://developer.mozilla.org/zh-CN/docs/Web/API/Window/window

| API                                                                                          | 含义                                             | 备注                                                                                |
| -------------------------------------------------------------------------------------------- | ------------------------------------------------ | ----------------------------------------------------------------------------------- |
| [`open()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/open)                     | 打开一个新的浏览器窗口                           | 返回新窗口的 window 对象                                                            |
| [`close()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/close)                   | 关闭浏览器窗口                                   | 只能关闭使用 open 打开的浏览器窗口                                                  |
| [==setTimeout()==](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/setTimeout)       | 设置一个计时器<br />在一段时间后自动执行某个函数 | 参数 1：函数，无参，this 指向 window<br />参数 2：时间，毫秒<br />返回：计时器的 ID |
| [==clearTimeout()==](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/clearTimeout)   | 清除指定 ID 的计时器                             | 传入计时器的 ID                                                                     |
| [==setInterval()==](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/setInterval)     | 设置一个计时器<br />每隔一段时间自动执行某个函数 | 参数 1：函数，无参，this 指向 window<br />参数 2：时间，毫秒<br />返回：计时器的 ID |
| [==clearInterval()==](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/clearInterval) | 清除指定 ID 的计时器                             | 传入计时器的 ID                                                                     |
| [`alert()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/alert)                   | 弹出提示框                                       | 不同的操作系统外观有差异                                                            |
| [`confirm()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/confirm)               | 弹出确认框                                       | 不同的操作系统外观有差异                                                            |

#### window.location

https://developer.mozilla.org/zh-CN/docs/Web/API/Location

提供地址栏的相关操作

| API                                                                                        | 含义                             | 备注                   |
| ------------------------------------------------------------------------------------------ | -------------------------------- | ---------------------- |
| [==Location.href==](https://developer.mozilla.org/zh-CN/docs/Web/API/Location/href)        | 获取或设置页面当前地址           | 设置地址回导致页面跳转 |
| [`Location.protocol`](https://developer.mozilla.org/en-US/docs/Web/API/Location/protocol)  | 获取或设置地址中的协议部分       |                        |
| [`Location.host`](https://developer.mozilla.org/zh-CN/docs/Web/API/Location/host)          | 获取或设置地址中的主机名和端口号 |                        |
| [`Location.hostname`](https://developer.mozilla.org/zh-CN/docs/Web/API/Location/hostname)  | 获取或设置地址中的主机名         |                        |
| [`Location.port` ](https://developer.mozilla.org/en-US/docs/Web/API/Location/port)         | 获取或设置地址中的端口号         |                        |
| [`Location.pathname` ](https://developer.mozilla.org/en-US/docs/Web/API/Location/pathname) | 获取或设置地址中的路径部分       |                        |
| [`Location.search`](https://developer.mozilla.org/zh-CN/docs/Web/API/Location/search)      | 获取或设置地址中的参数部分       |                        |
| [`Location.hash`](https://developer.mozilla.org/zh-CN/docs/Web/API/Location/hash)          | 获取或设置地址中的 hash 部分     |                        |
| [`Location.reload()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Location/reload)    | 刷新页面                         |                        |

#### window.history

https://developer.mozilla.org/zh-CN/docs/Web/API/History

提供当前窗口历史记录的操作

| API                                                                                               | 含义                                             | 备注       |
| ------------------------------------------------------------------------------------------------- | ------------------------------------------------ | ---------- |
| [`History.back()`](https://developer.mozilla.org/zh-CN/docs/Web/API/History/back)                 | 后退                                             |            |
| [`History.forward()`](https://developer.mozilla.org/zh-CN/docs/Web/API/History/forward)           | 前进                                             |            |
| [`History.go()`](https://developer.mozilla.org/zh-CN/docs/Web/API/History/go)                     | 根据相对当前页面的偏移量，<br />进入指定的记录页 |            |
| [`History.pushState()`](https://developer.mozilla.org/zh-CN/docs/Web/API/History/pushState)       | 在历史记录中添加一条记录                         | 页面不刷新 |
| [`History.replaceState()`](https://developer.mozilla.org/zh-CN/docs/Web/API/History/replaceState) | 替换当前记录                                     | 页面不刷新 |

### DOM

DOM 是一个对象，它对应到 HTML 中的节点

<img src="http://mdrs.yuanjin.tech/img/20211215164209.png" alt="image-20211215164209559" style="zoom:50%;" />

#### 获取 dom

| API                                                                 | 含义                    | 备注                                                                                                   |
| ------------------------------------------------------------------- | ----------------------- | ------------------------------------------------------------------------------------------------------ |
| document.getElementById()                                           | 根据元素 id 获取 dom    | 得到单个 dom                                                                                           |
| document.getElementsByTagName()<br />dom.getElementsByTagName()     | 根据元素名称获取 dom    | 得到 dom 的伪数组                                                                                      |
| document.getElementsByClassName()<br />dom.getElementsByClassName() | 根据元素类样式获取 dom  | 得到 dom 的伪数组                                                                                      |
| ==document.querySelector()==<br />==dom.querySelector()==           | 根据 CSS 选择器获取 dom | 得到第一个匹配的 dom                                                                                   |
| ==document.querySelectorAll()==<br />==dom.querySelectorAll()==     | 根据 CSS 选择器获取 dom | 得到所有匹配的 dom<br />伪数组                                                                         |
| ==document.documentElement==                                        | 获取 html 元素          |                                                                                                        |
| document.body                                                       | 获取 body               |                                                                                                        |
| document.head                                                       | 获取 head               |                                                                                                        |
| ==dom.children==                                                    | 获取 dom 的子元素       | 得到 dom 的伪数组                                                                                      |
| dom.childNodes                                                      | 获取 dom 的子节点       | 得到 dom 节点的伪数组<br />关于节点对象点[这里](https://developer.mozilla.org/zh-CN/docs/Web/API/Node) |
| dom.previousElementSibling                                          | 得到 dom 前一个兄弟元素 |                                                                                                        |
| dom.nextElementSibling                                              | 得到 dom 后一个兄弟元素 |                                                                                                        |
| ==dom.parentElement==                                               | 得到 dom 的父元素       |                                                                                                        |

#### 创建 dom

| API                          | 含义                | 备注         |
| ---------------------------- | ------------------- | ------------ |
| ==document.createElement()== | 创建一个 dom 并返回 | 传入元素名称 |

#### 更改 dom 结构

这里是指更改文档树（DOM 树）

| API                                                                                        | 含义                                              | 备注          |
| ------------------------------------------------------------------------------------------ | ------------------------------------------------- | ------------- |
| ==dom.remove()==                                                                           | 从文档树中删除 dom                                | 不是删除对象  |
| dom.removeChild()                                                                          | 删除 dom 的某个子节点                             | 传入 dom 对象 |
| [`dom.insertBefore()`](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/insertBefore) | 在 dom 的子节点中，添加一个新节点到另一个节点之前 |               |
| ==dom.appendChild()==                                                                      | 添加一个新节点到 dom 的子节点末尾                 | 传入 dom 对象 |

#### dom 属性

本节的「属性」，是指 HTML 元素的「属性」

属性有两种：

- 标准属性：HTML 元素本身拥有的属性，例如：
  - a 元素的 href、title
  - input 的 value
  - img 的 src
  - ......
- 自定义属性：HTML 元素标准中未定义的属性

**所有标准属性均可通过 `dom.属性名` 得到，其中**：

- 布尔属性会被自动转换为 boolean

- 路径类的属性会被转换为绝对路径

- 标准属性始终都是存在的，不管你是否有在元素中属性该属性

- class 由于和关键字重名，因此需要使用 className

**所有的自定义属性均可通过下面的方式操作**：

- `dom.setAttribute(name, value)`，设置属性键值对
- `dom.getAttribute(name)`，获取属性值

自定义属性和元素源码书写是对应的，可以尝试获取 a 元素的 href 属性对比标准属性，看看有什么不同。

#### dom 内容

| API               | 含义                       | 备注                           |
| ----------------- | -------------------------- | ------------------------------ |
| ==dom.innerText== | 获取或设置元素文本内容     | 设置时会自动进行 HTML 实体编码 |
| ==dom.innerHTML== | 获取或设置元素的 HTML 内容 |                                |

#### dom 样式

在 JS 中，有两种样式：

- 内联样式：元素的 style 属性中书写的样式
- 计算样式（最终样式）：元素最终计算出来的样式

**JS 可以获取内联样式和计算样式，但只能设置内联样式**

下面罗列了样式的常见操作：

- `dom.style`：获取元素的内联样式，得到样式对象
  - 对象中的所有样式属性均可以被赋值，赋值后即可应用样式到元素的 style 中
- `getComputedStyle(dom)`：获取元素的计算样式，得到一个样式对象
  - 该样式对象中的属性是只读的，无法被重新赋值

关于**样式对象**，注意：

- 当给样式赋值为空字符串时，相当于删除内联样式
- 当给样式的赋值不合法时，赋值语句无效，不会报错
- CSS 的短横线命名法，在属性名中表现为驼峰命名法

#### 监听 dom 事件

监听事件可以描述为一句话：

**某个 DOM**发生了**某件事**之后，我需要做**某些处理**

- 某个 DOM：监听谁？
- 某件事（事件类型）：它发生了什么？
- 某些处理（处理函数）：我要做什么？

下面是一段事件监听代码：

```js
// 为dom注册点击事件，当被点击时，自动运行事件处理函数
dom.onclick = function () {
  console.log('dom 被点击了');
};
```

##### 事件类型

https://developer.mozilla.org/zh-CN/docs/Web/Events

###### 表单类事件

| 事件名称   | 触发时机                                                                 | 备注                              |
| ---------- | ------------------------------------------------------------------------ | --------------------------------- |
| ==submit== | 表单被提交时触发                                                         | 注册到 form 元素上                |
| ==input==  | 文本框改变后立即出发                                                     | 注册到 input、textarea 上         |
| ==change== | 文本框改变后、失去焦点时触发<br />下拉列表、多选框、单选框改变后立即触发 | 注册到 input、select、textarea 上 |
| reset      | 表单被重置时触发                                                         | 注册到 form 元素上                |
| focus      | 元素聚焦时触发                                                           |                                   |
| blur       | 元素失去焦点时触发                                                       |                                   |

###### 鼠标类事件

| 事件名称       | 触发时机                     | 备注 |
| -------------- | ---------------------------- | ---- |
| ==click==      | 鼠标按下抬起后触发           |      |
| contextmenu    | 右键菜单显示前触发           |      |
| ==mousedown==  | 鼠标按下时触发               |      |
| ==mouseup==    | 鼠标抬起时触发               |      |
| ==mousemove==  | 鼠标在元素上移动时触发       |      |
| ==mouseenter== | 鼠标进入元素时触发（不冒泡） |      |
| ==mouseleave== | 鼠标离开元素时触发（不冒泡） |      |
| mouseover      | 鼠标进入元素时触发（冒泡）   |      |
| mouseout       | 鼠标离开元素时触发（冒泡）   |      |
| wheel          | 鼠标滚轮滚动时触发           |      |

###### 键盘事件

| 事件名称 | 触发时机           | 备注 |
| -------- | ------------------ | ---- |
| keydown  | 某个键被按下时触发 |      |
| keyup    | 某个键被抬起时触发 |      |

##### 注册事件

JS 提供了三种方式注册事件

方式 1：将事件注册写到元素上，这种方式基本被弃用

```html
<button onclick="js代码">按钮</button>
```

==方式 2：使用 dom 属性注册事件==

属性名为`on+事件类型`

```js
// 监听事件
dom.onclick = function () {
  // 处理函数
};
// 移除监听事件
dom.onclick = null;
```

这种方式的特点是：

- 优点：易于监听、覆盖、移除
- 缺点：只能注册一个处理函数
- 缺点：某些事件不支持用这种方式注册

==方式 3：使用 addEventListener 方法注册事件==

```js
dom.addEventListener('click', function () {
  // 处理函数1
});
dom.addEventListener('click', function () {
  // 处理函数2
});
```

这是最完美的事件注册方式，如果要移除用这种方式注册的事件，需要改写代码

```js
function handler1() {
  // 处理函数1
}
function handler2() {
  // 处理函数2
}

dom.addEventListener('click', handler1);
dom.addEventListener('click', handler2);

dom.removeEventListener('click', handler1); // 移除监听函数1
```

##### 事件处理函数

当事件发生时，会自动调用事件处理函数，并向函数传递一个参数，该参数称之为事件对象，里面包含了事件发生的相关信息，比如鼠标位置、键盘按键等等

```js
dom.addEventListener('click', function (e) {
  console.log(e.clientX); //打印鼠标的横坐标
});
```

常见的事件对象有：[鼠标事件对象](https://developer.mozilla.org/zh-CN/docs/Web/API/MouseEvent)、[键盘事件对象](https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent/KeyboardEvent)

另外，在事件处理函数中，`this`始终指向注册事件的 dom

#### dom 进阶

##### 事件默认行为

某些元素的某些事件，浏览器会有自己的默认行为

比如：

- a 元素的 click 事件，浏览器会跳转页面
- form 元素的 submit 事件，浏览器会提交表单，最终导致页面刷新
- 文本框的 keydown 事件，浏览器会将按键文本显示到文本框中
- ......

如果我们要阻止浏览器的默认行为，就需要在对应时间中加入以下代码：

```js
// e为事件对象
e.preventDefault();
```

##### dom 尺寸和位置

<img src="http://mdrs.yuanjin.tech/img/20211216104505.png" alt="尺寸1" style="zoom:50%;" />

![尺寸2](http://mdrs.yuanjin.tech/img/20220406223123.png)

![尺寸3](http://mdrs.yuanjin.tech/img/20220213212313.png)

<img src="http://mdrs.yuanjin.tech/img/20211216104405.jpg" alt="尺寸4" style="zoom:50%;" />

> 调用`dom.scrollTo(x, y)`可以设置元素的滚动位置，x 和 y 分别表示 scrollLeft 和 scrollTop
>
> 该方法通用元素回到元素顶部`dom.scrollTo(0, 0)`
>
> 如果要监听元素的滚动，可以监听事件类型：==scroll==

[Element.getBoundingClientRect()](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect)

![element-box-diagram](http://mdrs.yuanjin.tech/img/202210151248555.png)

> 上图中的 top、left、right、bottom 均相对于视口

**页面便签拖动**

`index.html`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>可拖动的便笺</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        .note {
            box-shadow: 0 0 5px #00000080;
            width: 300px;
            color: #333;
            background: #fdf3a7;
            position: fixed;
            left: 100px;
            top: 100px;
        }
        .move-bar {
            background: #fbe961;
            height: 10px;
            cursor: move;
        }
        .content p {
            margin: 1em 0;
            padding: 0.5em;
        }
        .content {
            outline: none;
        }
    </style>
  </head>
  <body>
    <div class="note">
      <div class="move-bar"></div>
      <div class="content" contenteditable="">
        <p>这是一个便笺</p>
        <p>里面的文字可以更改</p>
        <p>用鼠标按住顶部的移动条即可拖动便笺</p>
      </div>
    </div>
    <script src="./js/index.js"></script>
  </body>
</html>
```

`index.js`

```js
// 让便签可被拖动，但不能超出视口
var note = document.querySelector('.note');
var moveBar = document.querySelector('.move-bar');

moveBar.onmousedown = function (e) {
  // 鼠标坐标
  var x = e.clientX, y = e.clientY;
  var rect = moveBar.getBoundingClientRect();

  // 元素坐标
  var ex = rect.left, ey = rect.top;

  // 获取视口宽高、元素宽高
  var viewWidth = document.documentElement.clientWidth, viewHeight = document.documentElement.clientHeight;
  var noteWidth = note.offsetWidth, noteHeight = note.offsetHeight;

  var maxLeft = viewWidth - noteWidth, maxTop = viewHeight - noteHeight;

  window.onmousemove = function (e) {
    var disx = e.clientX - x, disy = e.clientY - y;
    var left = disx + ex, top = disy + ey;


    // 边界判断
    if (left < 0) {
      left = 0;
    }
    if (left > maxLeft) {
      left = maxLeft;
    }
    if (top < 0) {
      top = 0;
    }
    if (top > maxTop) {
      top = maxTop;
    }
    note.style.left = left + 'px';
    note.style.top = top + 'px';
  };

  window.onmouseup = function () {
    window.onmousemove = null;
    window.onmouseup = null;
  };
};
```

运行结果

![可拖动的便笺](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/javascript/可拖动的便笺.jpg)

##### 事件传播机制

<img src="http://mdrs.yuanjin.tech/img/20211216105521.jpg" alt="事件流" style="zoom: 50%;" />

```js
// 在冒泡阶段触发
div.onclick = function () {};

// 在捕获阶段触发事件
div.addEventListener('click', function () {}, true);

// 在冒泡阶段触发事件（默认）
div.addEventListener('click', function () {}, false);
```

```js
// 事件处理函数
function handler(e) {
  e.target; // 获取事件源（目标阶段的dom）
  e.stopPropagation(); // 阻止事件继续冒泡
}
```

**事件委托示例**

代办事项

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>待办事项</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font: 300 14px / 1.4em 'Helvetica Neue', Helvetica, Arial, sans-serif;
      background: rgb(245, 245, 245);
      color: rgb(17, 17, 17);
      min-width: 230px;
      max-width: 550px;
      margin: 0px auto;
      letter-spacing: 1px;
    }

    .container {
      width: 500px;
      margin: 0 auto;
      padding: 2em;
      margin-bottom: 2em;
    }

    .title {
      font-size: 80px;
      font-weight: 200;
      text-align: center;
      color: #b83f45;
      text-rendering: optimizelegibility;
      margin: 1em;
    }

    .section {
      background: #fff;
      box-shadow: rgb(0 0 0 / 20%) 0px 2px 4px 0px,
        rgb(0 0 0 / 10%) 0px 25px 50px 0px;
    }

    .txt {
      padding: 16px 16px 16px 60px;
      border: none;
      outline: none;
      margin: 0px;
      width: 100%;
      font-size: 24px;
      font-family: inherit;
      font-weight: inherit;
      line-height: 1.4em;
      color: inherit;
      letter-spacing: inherit;
      border-bottom: 1px solid rgb(230, 230, 230);
    }

    .txt::placeholder {
      font-style: italic;
    }

    .todo-list {
      list-style: none;
    }

    .todo-list li {
      overflow: hidden;
      padding: 1em;
    }

    .todo-list li span {
      float: left;
    }

    .todo-list li button {
      float: right;
      /* visibility: hidden; */
      color: #b83f45;
      border: none;
      outline: none;
      background: transparent;
      cursor: pointer;
    }

    .todo-list li:hover button {
      visibility: visible;
    }
  </style>
</head>

<body>
  <div class="container">
    <h1 class="title">Things</h1>
    <div class="section">
      <input class="txt" type="text" placeholder="what needs to be done？" />
      <ul class="todo-list"></ul>
    </div>
  </div>
  <script lang="javascript">
    // 输入待办事项，按下回车后，添加事项到列表
    // 使用事件委托的方式完成删除事件
    var txt = document.querySelector('.txt');
    var ul = document.querySelector('.todo-list');
    function createLi(content) {
      ul.innerHTML += `<li><span>${content}</span><button>删除</button></li>`
    }
    txt.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        if (!this.value.trim()) {
          return;
        }
        createLi(this.value.trim());
        this.value = '';
      }
    });

    ul.addEventListener('click', function (e) {
      if (e.target.tagName.toLowerCase() === 'button') {
        e.target.parentNode.remove();
      }
    });
  </script>
</body>

</html>
```

运行结果

![代办事项](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/javascript/代办事项.jpg)

## 案例

### 瀑布流

#### 什么是瀑布流

瀑布流，又称瀑布流式布局。是比较流行的一种网站页面布局，视觉表现为参差不齐的多栏布局，随着页面滚动条向下滚动，这种布局还会不断加载数据块并附加至当前尾部。

![image-20210729113939747](https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-07-29-033940.png)

#### 制作思路

首先第一步，我们仔细观察上面的瀑布流图片，你会发现他们都是定宽不定高的。
既然定宽，那么一共显示几列，我们也就能够计算出来。如下图所示：

![image-20210729132058407](https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-07-29-052059.png)

列数出来之后，我们拿一个数组来保存一行的高度。什么意思？看下图：
我们按照 4 列来算，一开始一张图片都没有放，每一列的高度都为 0，所以数组里面是 4 个 0

![image-20210729132605594](https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-07-29-052605.png)

接下来放入第一张图片，找数组里面最小的，目前都是 0，就放在第一列，放完之后需要更新数组里面的最小值

![image-20210729132846593](https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-07-29-052847.png)

然后依此类推，找数组最小的，会找到第二个 0，往第二列放入图片，更新数组，找到第三个 0，往第三列放入图片，更新数组...

![image-20210729133210534](https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-07-29-053211.png)

目前第一行满了，该放在第二行了，但是放在第二行的第几列呢？
实际上和上面的算法是一样的，找数组的最小值即可，哪个最小就放在哪一列，放完之后更新数组

![image-20210729134002131](https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-07-29-054002.png)

新的高度的计算公式：

```js
这一列新的高度 = 这一列高度（数组里面存储的有） + 间隙 + 新的图片高度
```

然而这只是计算了 top 值，还有 left 值我们需要计算。每张图片的 left 值只和该图片所在的列有关。

![image-20210729135724717](https://xiejie-typora.oss-cn-chengdu.aliyuncs.com/2021-07-29-055725.png)

#### 重新布局（函数防抖）

目前为止，图片已经按照瀑布流的形式布局出来了。但是当我们改变窗体大小的时候，图片是要重新进行布局的。
这就涉及到了要监听 widnow 的 resize 事件，每当此事件触发时，就需要重新排列。
重新排列倒是很简单，只需要把前面的制作思路封装成一个函数，重新调用这个函数即可。但是这里涉及到一个函数发抖的知识。

具体的代码片段如下：

```js
var timeId = null; // 一个计时器的 id
// 主要就是绑定窗口尺寸改变的监听事件
window.onresize = function(){
  if(timeId){
    clearTimeout(timeId);
  }
  timeId = setTimeout(function(){
    setPositions(); // 重新排列
  }, 500);
}
```


