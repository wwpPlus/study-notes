# ES6

ES6， 全称 ECMAScript 6.0 ，是 JavaScript 的下一个版本标准，2015.06 发版。

## ES6基础

### 零碎的改动

#### 严格模式

此为ES5新增语法

参考：https://www.runoob.com/js/js-strict.html

参考：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Strict_mode

#### let 和 const

ES6建议不再使用`var`定义变量，而使用`let`定义变量，`const`定义常量

```js
let a = 1; // 使用 let 定义变量
a = 2; // 变量的值是可修改的

const b = 1; // 使用 const 定义常量
b = 2; // ❌ 报错，常量的值不可修改
```

**对于开发的影响：均使用const，实在需要修改变量，再改为let**

无论是let还是const，它们均解决了长久以来变量定义的问题，使用它们定义变量，具有以下特点：

- 全局定义的变量不再作为属性添加到全局对象中

- 在变量定义之前使用它会报错

- 不可重复定义同名变量

- 使用`const`定义变量时，必须初始化

- 变量具有块级作用域，在代码块之外不可使用

  注意，在for循环中使用let定义变量，变量所在的作用域是循环体，因此在循环外不能使用。另外，for循环会对该变量做特殊处理，让每次循环使用的都是一个独立的循环变量，这可以解决JS由来已久的问题。

  ```js
  // 过去的问题
  for(var i = 0; i < 3; i++){
    setTimeout(function(){
      console.log(i)
    }, 1000)
  }
  // 输出：3 3 3
  
  // 过去的解决办法：IIFE
  for(var i = 0; i < 3; i++){
    (function(i){
      setTimeout(function(){
        console.log(i)
      }, 1000)
    })(i)
  }
  // 输出：0 1 2
  
  // 现在的做法
  for(let i = 0; i < 3; i++){
    setTimeout(function(){
      console.log(i)
    }, 1000)
  }
  // 输出：0 1 2
  ```

#### 幂运算

```js
2 ** 3  // 8
2 ** 4  // 16
```

#### 字符串新增API

| API                                                                                                                                     | 含义                         |
| --------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| [String.prototype.includes(s)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/includes)        | 字符串中是否包含某个子串     |
| [String.prototype.trim()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/trim)                 | 去掉字符串首尾空白字符       |
| [String.prototype.trimStart()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/trimstart)       | 去掉字符串开始的空白字符     |
| [String.prototype.trimEnd()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/trimend)           | 去掉字符串末尾的空白字符     |
| [String.prototype.replaceAll(s, t)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/replaceall) | 将字符串中**所有**的s替换为t |
| [String.prototype.startsWith(s)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/startswith)    | 判断字符串是否以s开头        |
| [String.prototype.endsWith(s)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/endswith)        | 判断字符串是否以s结尾        |
|                                                                                                                                         |                              |

#### 模板字符串

ES6提供了一种新的字符串字面量的书写方式，即模板字符串，写法为

```js
`字符串内容`
```

模板字符串可以轻松的实现换行和拼接

```js
const user = { name: 'monica', age: 17 }
const s1 = `姓名：${user.name}，年龄：${user.age}
my name is ${user.name}`;
// 等同于
const s2 = '姓名：' + user.name + '，年龄：' + user.age + '\nmy name is ' + user.name

/* 
 * s1和s2均为：
 * 姓名：monica，年龄：17
 * my name is monica
 */
```

在需要换行或拼接时，模板字符串远胜于普通字符串

通常，我们可以使用模板字符串拼接html

```js
const user = { name: 'monica', age: 17 }
const html = `
<div>
	<p><span class="k">姓名</span><span class="v">${user.name}</span></p>
	<p><span class="k">年龄</span><span class="v">${user.age}</span></p>
</div>
`;
/* 
 * <div>
 *  <p><span class="k">姓名</span><span class="v">monica</span></p>
 *  <p><span class="k">年龄</span><span class="v">17</span></p>
 * </div>
 */
```

### 数组

#### for-of 循环

ES6提供了一种爽翻天的方式遍历各种数组和伪数组

示例1：

```js
const arr = ['a', 'b', 'c']
// 过去的方式——垃圾
for(let i = 0; i < arr.length; i++){
  const item = arr[i]
  console.log(item)
}

// for of 的方式，结果一样
for(const item of arr){
  console.log(item)
}
```

示例2:

```js
const elements = document.querySelectorAll('.item');
// for of 的方式
for(const elem of elements){
  // elem 为获取到的每一个元素
}
```

#### 新增API

| API                                                                                                                               | 作用                                                     | 图示                                                                                                          |
| --------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| [Array.isArray(target)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray)           | 判断target是否为一个数组                                 |                                                                                                               |
| [Array.from(source)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/from)                 | 将某个伪数组source转换为一个真数组返回                   |                                                                                                               |
| [Array.prototype.fill(n)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/fill)            | 将数组的某些项设置为n                                    | <img src="http://mdrs.yuanjin.tech/img/20210602165516.png" alt="image-20210602165515908" style="zoom:50%;" /> |
| [Array.prototype.forEach(fn)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)     | 遍历数组，传入一个函数，每次遍历会运行该函数             | <img src="http://mdrs.yuanjin.tech/img/20210602165832.png" alt="image-20210602165832725" style="zoom:50%;" /> |
| [Array.prototype.map(fn)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/map)             | 数组映射，传入一个函数，映射数组中的每一项               | <img src="http://mdrs.yuanjin.tech/img/20210602170025.png" alt="image-20210602170025141" style="zoom:50%;" /> |
| [Array.prototype.filter(fn)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)       | 数组筛选，传入一个函数，仅保留满足条件的项               | <img src="http://mdrs.yuanjin.tech/img/20210602170149.png" alt="image-20210602170149489" style="zoom:50%;" /> |
| [Array.prototype.reduce(fn)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)       | 数组聚合，传入一个函数，对数组每一项按照该函数的返回聚合 | <img src="http://mdrs.yuanjin.tech/img/20210602170451.png" alt="image-20210602170451299" style="zoom:50%;" /> |
| [Array.prototype.some(fn)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/some)           | 传入一个函数，判断数组中是否有至少一个通过该函数测试的项 | <img src="http://mdrs.yuanjin.tech/img/20210602171403.png" alt="image-20210602171403455" style="zoom:50%;" /> |
| [Array.prototype.every(fn)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/every)         | 传入一个函数，判断数组中是否所有项都能通过该函数的测试   | <img src="http://mdrs.yuanjin.tech/img/20210602171441.png" alt="image-20210602171441468" style="zoom:50%;" /> |
| [Array.prototype.find(fn)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/find)           | 传入一个函数，找到数组中第一个能通过该函数测试的项       | <img src="http://mdrs.yuanjin.tech/img/20210602171510.png" alt="image-20210602171510075" style="zoom:50%;" /> |
| [Array.prototype.includes(item)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/includes) | 判断数组中是否存在item，判定规则使用的是`Object.is`      | <img src="http://mdrs.yuanjin.tech/img/20210602170615.png" alt="image-20210602170615564" style="zoom:50%;" /> |
|                                                                                                                                   |                                                          |                                                                                                               |

### 对象

#### 对象成员速写

在某些场景下，ES6提供了一种更加简洁的方式书写对象成员

示例1：

```js
const name = 'monica', age = 17;
const sayHello = function(){
  console.log(`my name is ${this.name}`);
}
// 过去的方式
const user = {
  name: name,
  age: age,
  sayHello: sayHello
}

// 速写
const user = {
  name,
  age,
  sayHello
}
```

示例2：

```js
// 过去的方式
const MyMath = {
  sum: function(a, b){
    //...
  },
  random: function(min, max){
    //...
  }
}

// 速写
const MyMath = {
  sum(a, b){
    // ...
  },
  random(min, max){
    // ...
  }
}
```

#### 解构

ES6提供了一种特殊的语法，通过该语法，可以轻松的从数组或对象中取出想要的部分

示例1：

```js
const user = {
  name: 'monica',
  age: 17,
  addr: {
    province: '黑龙江',
    city: '哈尔滨'
  }
}

// 取出 user 中的 name 和 age
const { name, age } = user;
console.log(name, age); //  monica 17

// 取出 user 中的 city
const { addr: { city } } = user
console.log(city); //  哈尔滨
```

示例2：

```js
const arr = [1, 2, 3, 4]
// 取出数组每一项的值，分别放到变量a、b、c、d中
const [a, b, c, d] = arr;
// 仅取出数组下标1、2的值
const [, a, b] = arr; 
// 仅取出数组下标1、3的值
const [, a, , b] = arr;
// 取出数组前两位的值，放到变量a和b中，剩下的值放到一个新数组arr2中
const [a, b, ...arr2] = arr;
```

示例3：

```js
let a = 1, b = 2;
// 交换两个变量
[b, a] = [a, b]
```

示例4：

```js
// 在参数位置对传入的对象进行解构
function method({a, b}){
  console.log(a, b)
}
const obj = {
  a:1,
  b:2,
  c:3
}
method(obj); // 1 2
```

示例5：

```js
// 箭头函数也可以在参数位置进行解构
const method = ({a, b}) => {
  console.log(a, b)
}
const obj = {
  a:1,
  b:2,
  c:3
}
method(obj); // 1 2
```

示例6：

```js
const users = [
  {name:'monica', age:17},
  {name:'邓哥', age:70}
]
// 在遍历时进行解构
for(const {name, age} of users){
  console.log(name, age)
}
```

#### 展开运算符

示例1：

```js
const arr = [3, 6, 1, 7, 2];
// 对数组的展开
Math.max(...arr); // 相当于：Math.max(3, 6, 1, 7, 2)
```

示例2：

```js
const o1 = {
  a: 1, 
  b: 2,
}
const o2 = {
  a: 3, 
  c: 4,
}
// 对对象的展开
const o3 = {
  ...o1,
  ...o2
}
/*
	o3：{
		a: 3,
		b: 2,
		c: 4
	}
*/
```

示例3：

```js
const arr = [2,3,4];
const arr2 = [1, ...arr, 5]; // [1,2,3,4,5]
```

示例4：

```js
const user = {
  name: 'monica',
  age: 17
}
const user2 = {
  ...user,
  name: '邓哥'
}
// user2: { name:'邓哥', age: 17 }
```

#### 属性描述符

对于对象中的每个成员，JS使用属性描述符来描述它们

```js
const user = {
  name: 'monica',
  age: 17
}
```

上面的对象，在JS内部被描述为

```js
{
  // 属性 name 的描述符
  name: {
    value: 'monica',
    configurable: true, // 该属性的描述符是否可以被重新定义
    enumerable: true, // 该属性是否允许被遍历，会影响for-in循环
    writable: true // 该属性是否允许被修改
  },
  // 属性 age 的描述符
  age: {
    value: 'monica',
    configurable: true, // 该属性的描述符是否可以被重新定义
    enumerable: true, // 该属性是否允许被遍历，会影响for-in循环
    writable: true // 该属性是否允许被修改
  },
}
```

ES5提供了一系列的API，针对属性描述符进行操作

1. `Object.getOwnPropertyDescriptor(obj, propertyName)`

   该方法用于获取一个属性的描述符

   ```js
   const user = {
     name: 'monica',
     age: 17
   }
   
   Object.getOwnPropertyDescriptor(user, 'name');
   /*
   {
       value: 'monica',
       configurable: true, // 该属性的描述符是否可以被重新定义
       enumerable: true, // 该属性是否允许被遍历，会影响for-in循环
       writable: true // 该属性是否允许被修改
   }
   */
   ```

2. `Object.defineProperty(obj, propertyName, descriptor)`

   该方法用于定义某个属性的描述符

   ```js
   const user = {
     name: 'monica',
     age: 17
   };
   
   Object.defineProperty(obj, 'name', {
     value: '邓哥', // 将其值进行修改
     enumerable: false, // 让该属性不能被遍历
     writable: false // 让该属性无法被重新赋值
   })
   ```

##### getter 和 setter

属性描述符中有两个特殊的配置，分别为`get`和`set`，通过它们，可以把属性的取值和赋值变为方法调用

```js
const obj = {};
Object.defineProperty(obj, 'a', {
  get(){ // 读取属性a时，得到的是该方法的返回值
    return 1;
  },
  set(val){ // 设置属性a时，会把值传入val，调用该方法
    console.log(val)
  }
})

console.log(obj.a); // 输出：1
obj.a = 3; // 输出：3
console.log(obj.a); // 输出：1
```

#### 键值对

`Object.keys(obj)`：获取对象的属性名组成的数组

`Object.values(obj)`：获取对象的值组成的数组

`Object.entries(obj)`：获取对象属性名和属性值组成的数组

`Object.fromEntries(entries)`：将属性名和属性值的数组转换为对象

示例：

```js
const user = {
  name: 'monica',
  age: 17
}
Object.keys(user); // ["name", "age"]
Object.values(user); // ["monica", 17]
Object.entries(user); // [ ["name", "monica"], ["age", 17] ]
Object.fromEntries([ ["name", "monica"], ["age", 17] ]); // {name:'monica', age:17}
```

#### 冻结

使用`Object.freeze(obj)`可以冻结一个对象，该对象的所有属性均不可更改

```js
const obj = {
  a: 1,
  b: {
    c: 3,
  },
};

Object.freeze(obj); //  冻结对象obj

obj.a = 2; // 不报错，代码无效
obj.k = 4; // 不报错，代码无效
delete obj.a; // 不报错，代码无效
obj.b = 5; // 不报错，代码无效

obj.b.c = 5; // b对象没有被冻结，有效

console.log(obj); // {a:1, b:{ c: 5 } }
```

可以使用`Object.isFrozen`来判断一个对象是否被冻结

#### 相同性判定

`Object.is`方法，可以判断两个值是否相同，它和`===`的功能基本一致，区别在于：

- NaN和NaN相等
- +0和-0不相等

```js
Object.is(1, 2); // false
Object.is("1", 1); // false
Object.is(NaN, NaN); // true
Object.is(+0, -0); // false
```

#### Set

[Set MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Set)

ES6新增了Set结构，用于保存唯一值的序列

#### Map

[Map MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map)

ES6新增了Map结构，用于保存键值对的映射，它和对象的最大区别在于：对象的键只能是字符串，而Map的键可以是任何类型

### 函数

#### 箭头函数

所有使用**函数表达式**的位置，均可以替换为箭头函数

箭头函数语法：

```js
// 完整语法
(参数列表) => { 函数体 }
// 若有且仅有一个参数
参数 => { 函数体 }
// 若函数体有且仅有一条返回语句
(参数列表) => 返回语句
```

示例1：

```js
const sum = function(a, b) {
  return a + b;
}

// 箭头函数写法
const sum = (a, b) => a + b
```

示例2：

```js
dom.onclick = function(e){
  // ....
}

// 箭头函数写法
dom.onclick = e => {
  // ...
}
```

示例3：

```js
setTimeout(function(){
  // ...
}, 1000)

// 箭头函数写法
setTimeout(() => {
  // ...
}, 1000)
```

箭头函数有以下特点：

1. 不能使用`new`调用

2. 没有原型，即没有`prototype`属性

3. 没有`arugments`

4. 没有`this`

   > 有些教程中会说：箭头函数的`this`永远指向箭头函数定义位置的`this`，因为箭头函数会绑定`this`。
   >
   > 这个说法没错，根本原因是它没有`this`，它里面的`this`使用的是外层的`this`

   ```js
   const counter = {
     count: 0,
     start: function(){
       // 这里的 this 指向 counter
       setInterval(() => {
         // 这里的 this 实际上是 start 函数的 this
         this.count++;
       }, 1000)
     }
   }
   ```

箭头函数的这些特点，都足以说明：**箭头函数特别适用于那些临时需要函数的位置**

> 我们将来会在面试指导阶段对this指向进行总结

#### 剩余参数

ES6不建议再使用`arguments`来获取参数列表，它推荐使用剩余参数来收集未知数量的参数

```js
// ...args为剩余参数
function method(a, b, ...args){
  console.log(a, b, args)
}

method(1, 2, 3, 4, 5, 6, 7); // 1 2 [3, 4, 5, 6, 7]
method(1, 2); // 1 2 []
```

**注意，剩余参数只能声明为最后一个参数**

#### 参数默认值

ES6提供了参数默认值，当参数没有传递或传递为`undefined`时，会使用默认值

示例1：

```js
// 对参数 b 使用了默认值1
function method(a, b = 1){
  console.log(a, b)
}
method(1, 2); // 1  2
method(1); // 1 1
method(1, undefined); // 1 1
```

示例2：

```js
// 对参数 b 使用了默认值1， 对参数 c 使用默认值2
const method = (a, b = 1, c = 2, d) => {
  console.log(a, b, c, d)
}
method(1, 2); // 1 2 2 undefined
method(1); // 1 1 2 undefined
method(1, undefined, undefined, 4); // 1 1 2 4
```

#### 类语法

过去，函数有着两种调用方式：

```js
function A(){}

A(); // 直接调用
new A(); // 作为构造函数调用
```

这种做法无法从定义上明确函数的用途，因此，ES6推出了一种全新的语法来书写构造函数

示例1：

```js
// 旧的写法
function User(firstName, lastName){
  this.firstName = firstName;
  this.lastName = lastName;
  this.fullName = `${firstName} ${lastName}`;
}
User.isUser = function(u){
  return !!u && !!u.fullName
}
User.prototype.sayHello = function(){
  console.log(`Hello, my name is ${this.fullName}`);
}

// 新的等效写法
class User{
  constructor(firstName, lastName){
    this.firstName = firstName;
    this.lastName = lastName;
    this.fullName = `${firstName} ${lastName}`;
  }
  
  static isUser(u){
  	 return !!u && !!u.fullName
  }
  
  sayHello(){
    console.log(`Hello, my name is ${this.fullName}`);
  }
}
```

示例2：

```js
function Animal(type, name){
  this.type = type;
  this.name = name;
}

Animal.prototype.intro = function(){
  console.log(`I am ${this.type}, my name is ${this.name}`)
}

function Dog(name){
  Animal.call(this, '狗', name);
}

Dog.prototype = Object.create(Animal.prototype); // 设置继承关系

// 新的方式

class Animal{
  constructor(type, name){
    this.type = type;
    this.name = name;
  }
  
  intro(){
    console.log(`I am ${this.type}, my name is ${this.name}`)
  }
}

class Dog extends Animal{
 	constructor(name){
    super('狗', name);
  }
}
```

#### 函数API

| API                                                                                                                                     | 含义                                                                      |
| --------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| [Function.prototype.call(obj, ...args)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/call) | 调用函数，绑定this为obj<br />后续以列表的形式提供参数                     |
| [Function.prototype.apply(obj, args)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/apply)  | 调用函数，绑定this为obj<br />args以数组的形式提供参数                     |
| [Function.prototype.bind(obj, ...args)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind) | 返回一个函数的拷贝<br />新函数的this被绑定为obj<br />起始参数被绑定为args |
|                                                                                                                                         |                                                                           |

## ES6模块

### 概述

ES6 引入了模块化，其设计思想是在编译时就能确定模块的依赖关系，以及输入和输出的变量。

ES6 的模块化分为导出（export） @与导入（import）两个模块。

### 特点

ES6 的模块自动开启严格模式，不管你有没有在模块头部加上 use strict;。

模块中可以导入和导出各种类型的变量，如函数，对象，字符串，数字，布尔值，类等。

每个模块都有自己的上下文，每一个模块内声明的变量都是局部变量，不会污染全局作用域。

每一个模块只加载一次（是单例的）， 若再去加载同目录下同文件，直接从内存中读取。

### export 与 import

#### 基本用法

模块导入导出各种类型的变量，如字符串，数值，函数，类。

- 导出的函数声明与类声明必须要有名称（export default 命令另外考虑）。
- 不仅能导出声明还能导出引用（例如函数）。
- export 命令可以出现在模块的任何位置，但必需处于模块顶层。
- import 命令会提升到整个模块的头部，首先执行。

```js
/*-----export [test.js]-----*/
let myName = "Tom";
let myAge = 20;
let myfn = function(){
    return "My name is" + myName + "! I'm '" + myAge + "years old."
}
let myClass =  class myClass {
    static a = "yeah!";
}
export { myName, myAge, myfn, myClass }
 
/*-----import [xxx.js]-----*/
import { myName, myAge, myfn, myClass } from "./test.js";
console.log(myfn());// My name is Tom! I'm 20 years old.
console.log(myAge);// 20
console.log(myName);// Tom
console.log(myClass.a );// yeah!
```

export 命令导出的接口名称，须和模块内部的变量有一一对应关系。

- 导入的变量名，须和导出的接口名称相同，即顺序可以不一致。
- 不同模块导出接口名称命名重复， 使用 as 重新定义变量名。

#### import 命令的特点

**只读属性**：不允许在加载模块的脚本里面，改写接口的引用指向，即可以改写 import 变量类型为对象的属性值，不能改写 import 变量类型为基本类型的值。

```js
import {a} from "./xxx.js"
a = {}; // error
 
import {a} from "./xxx.js"
a.foo = "hello"; // a = { foo : 'hello' }
```

#### export default 命令

- 在一个文件或模块中，export、import 可以有多个，export default 仅有一个。
- export default 中的 default 是对应的导出接口变量。
- 通过 export 方式导出，在导入时要加{ }，export default 则不需要。
- export default 向外暴露的成员，可以使用任意变量来接收。

```js
var a = "My name is Tom!";
export default a; // 仅有一个
export default var c = "error"; 
// error，default 已经是对应的导出变量，不能跟着变量声明语句
 
import b from "./xxx.js"; // 不需要加{}， 使用任意变量接收
```

复合使用

export 与 import 可以在同一模块使用，使用特点：

- 可以将导出接口改名，包括 default。
- 复合使用 export 与 import ，也可以导出全部，当前模块导出的接口会覆盖继承导出的。

```js
export { foo, bar } from "methods";
 
// 约等于下面两段语句，不过上面导入导出方式该模块没有导入 foo 与 bar
import { foo, bar } from "methods";
export { foo, bar };
 
/* ------- 特点 1 --------*/
// 普通改名
export { foo as bar } from "methods";
// 将 foo 转导成 default
export { foo as default } from "methods";
// 将 default 转导成 foo
export { default as foo } from "methods";
 
/* ------- 特点 2 --------*/
export * from "methods";
```

## Promise 对象

> 本节课的任务：
>
> 1. 理解Promise A+规范的基本概念
> 2. 学会创建Promise
> 3. 学会针对Promise进行后续处理

### 邓哥的烦恼

邓哥心中有很多女神，他今天下定决心，要向这些女神表白，他认为，只要女神够多，根据概率学原理，总有一个会接收他

稳妥起见，邓哥决定使用**串行**的方式进行表白：先给第1位女神发送短信，然后等待女神的回应，如果成功了，就结束，如果失败了，则再给第2位女神发送短信，依次类推

![image-20210618150543263](http://mdrs.yuanjin.tech/img/20210618150543.png)

邓哥的女神一共有4位，名字分别是：李建国、王富贵、周聚财、刘人勇

发短信是一个重复性的劳动，邓哥是个程序员，因此决定用函数封装这个动作

```js
// 向某位女生发送一则表白短信
// name: 女神的姓名
// onFulffiled: 成功后的回调
// onRejected: 失败后的回调
function sendMessage(name, onFulffiled, onRejected) {
  // 模拟 发送表白短信
  console.log(
    `邓哥 -> ${name}：最近有谣言说我喜欢你，我要澄清一下，那不是谣言😘`
  );
  console.log(`等待${name}回复......`);
  // 模拟 女神回复需要一段时间
  setTimeout(() => {
    // 模拟 有10%的几率成功
    if (Math.random() <= 0.1) {
      // 成功，调用 onFuffiled，并传递女神的回复
      onFulffiled(`${name} -> 邓哥：我是九，你是三，除了你还是你😘`);
    } else {
      // 失败，调用 onRejected，并传递女神的回复
      onRejected(`${name} -> 邓哥：你是个好人😜`);
    }
  }, 1000);
}
```

有了这个函数后，邓哥于是开始编写程序发送短信了

```js
// 首先向 李建国 发送消息
sendMessage(
  '李建国',
  (reply) => {
    // 如果成功了，输出回复的消息后，结束
    console.log(reply);
  },
  (reply) => {
    // 如果失败了，输出回复的消息后，向 王富贵 发送消息
    console.log(reply);
    sendMessage(
      '王富贵',
      (reply) => {
        // 如果成功了，输出回复的消息后，结束
        console.log(reply);
      },
      (reply) => {
        // 如果失败了，输出回复的消息后，向 周聚财 发送消息
        console.log(reply);
        sendMessage(
          '周聚财',
          (reply) => {
            // 如果成功了，输出回复的消息后，结束
            console.log(reply);
          },
          (reply) => {
            // 如果失败了，输出回复的消息后，向 刘人勇 发送消息
            console.log(reply);
            sendMessage(
              '刘人勇',
              (reply) => {
                // 如果成功了，输出回复的消息后，结束
                console.log(reply);
              },
              (reply) => {
                // 如果失败了，就彻底没戏了
                console.log(reply);
                console.log('邓哥命犯天煞孤星，注定孤独终老！！');
              }
            );
          }
        );
      }
    );
  }
);
```

该程序完成后，邓哥内心是崩溃的

这一层一层的回调嵌套，形成了传说中的「**回调地狱 callback hell**」

邓哥是个完美主义者，怎么能忍受这样的代码呢？

要解决这样的问题，需要Promise出马

### Promise规范

Promise是一套专门处理异步场景的规范，它能有效的避免回调地狱的产生，使异步代码更加清晰、简洁、统一

这套规范最早诞生于前端社区，规范名称为[Promise A+](https://promisesaplus.com/)

该规范出现后，立即得到了很多开发者的响应

Promise A+ 规定：

1. 所有的异步场景，都可以看作是一个异步任务，每个异步任务，在JS中应该表现为一个**对象**，该对象称之为**Promise对象**，也叫做任务对象

   <img src="http://mdrs.yuanjin.tech/img/20210618154556.png" alt="image-20210618154556558" style="zoom:50%;" />

2. 每个任务对象，都应该有两个阶段、三个状态

   <img src="http://mdrs.yuanjin.tech/img/20210618155145.png" alt="image-20210618155145355" style="zoom:50%;" />

   根据常理，它们之间存在以下逻辑：

   - 任务总是从未决阶段变到已决阶段，无法逆行
   - 任务总是从挂起状态变到完成或失败状态，无法逆行
   - 时间不能倒流，历史不可改写，任务一旦完成或失败，状态就固定下来，永远无法改变

3. `挂起->完成`，称之为`resolve`；`挂起->失败`称之为`reject`。任务完成时，可能有一个相关数据；任务失败时，可能有一个失败原因。

   ![image-20210618160538875](http://mdrs.yuanjin.tech/img/20210618160538.png)

4. 可以针对任务进行后续处理，针对完成状态的后续处理称之为onFulfilled，针对失败的后续处理称之为onRejected

   ![image-20210618161125894](http://mdrs.yuanjin.tech/img/20210618161125.png)

### Promise API

ES6提供了一套API，实现了Promise A+规范

基本使用如下：

```js
// 创建一个任务对象，该任务立即进入 pending 状态
const pro = new Promise((resolve, reject) => {
  // 任务的具体执行流程，该函数会立即被执行
  // 调用 resolve(data)，可将任务变为 fulfilled 状态， data 为需要传递的相关数据
  // 调用 reject(reason)，可将任务变为 rejected 状态，reason 为需要传递的失败原因
});

pro.then(
  (data) => {
    // onFulfilled 函数，当任务完成后，会自动运行该函数，data为任务完成的相关数据
  },
  (reason) => {
    // onRejected 函数，当任务失败后，会自动运行该函数，reason为任务失败的相关原因
  }
);
```

### 邓哥的解决方案

学习了ES6的Promise后，邓哥决定对`sendMessage`函数进行改造，改造结果如下：

```js
// 向某位女生发送一则表白短信
// name: 女神的姓名
// 该函数返回一个任务对象
function sendMessage(name) {
  return new Promise((resolve, reject) => {
    // 模拟 发送表白短信
    console.log(
      `邓哥 -> ${name}：最近有谣言说我喜欢你，我要澄清一下，那不是谣言😘`
    );
    console.log(`等待${name}回复......`);
    // 模拟 女神回复需要一段时间
    setTimeout(() => {
      // 模拟 有10%的几率成功
      if (Math.random() <= 0.1) {
        // 成功，调用 resolve，并传递女神的回复
        resolve(`${name} -> 邓哥：我是九，你是三，除了你还是你😘`);
      } else {
        // 失败，调用 reject，并传递女神的回复
        reject(`${name} -> 邓哥：你是个好人😜`);
      }
    }, 1000);
  });
}
```

之后，就可以使用该函数来发送消息了

```js
sendMessage('李建国').then(
  (reply) => {
    // 女神答应了，输出女神的回复
    console.log(reply);
  },
  (reason) => {
    // 女神拒绝了，输出女神的回复
    console.log(reason);
  }
);
```

> 至此，回调地狱的问题仍然没能解决
>
> 要解决回调地狱，还需要进一步学习Promise的知识

![image-20210618161125894](http://mdrs.yuanjin.tech/img/20210618161125.png)

### catch方法

`.catch(onRejected)` = `.then(null, onRejected)`

### 链式调用

![image-20210621103501094](http://mdrs.yuanjin.tech/img/20210621103501.png)

1. then方法必定会返回一个新的Promise

   可理解为`后续处理也是一个任务`

2. 新任务的状态取决于后续处理：

   - 若没有相关的后续处理，新任务的状态和前任务一致，数据为前任务的数据

   - 若有后续处理但还未执行，新任务挂起。
   - 若后续处理执行了，则根据后续处理的情况确定新任务的状态
     - 后续处理执行无错，新任务的状态为完成，数据为后续处理的返回值
     - 后续处理执行有错，新任务的状态为失败，数据为异常对象
     - 后续执行后返回的是一个任务对象，新任务的状态和数据与该任务对象一致

由于链式任务的存在，异步代码拥有了更强的表达力

```js
// 常见任务处理代码

/*
 * 任务成功后，执行处理1，失败则执行处理2
 */
pro.then(处理1).catch(处理2)

/*
 * 任务成功后，依次执行处理1、处理2
 */
pro.then(处理1).then(处理2)

/*
 * 任务成功后，依次执行处理1、处理2，若任务失败或前面的处理有错，执行处理3
 */
pro.then(处理1).then(处理2).catch(处理3)
```

### 邓哥的解决方案

```js
// 向某位女生发送一则表白短信
// name: 女神的姓名
// onFulffiled: 成功后的回调
// onRejected: 失败后的回调
function sendMessage(name) {
  return new Promise((resolve, reject) => {
    // 模拟 发送表白短信
    console.log(
      `邓哥 -> ${name}：最近有谣言说我喜欢你，我要澄清一下，那不是谣言😘`
    );
    console.log(`等待${name}回复......`);
    // 模拟 女神回复需要一段时间
    setTimeout(() => {
      // 模拟 有10%的几率成功
      if (Math.random() <= 0.1) {
        // 成功，调用 onFuffiled，并传递女神的回复
        resolve(`${name} -> 邓哥：我是九，你是三，除了你还是你😘`);
      } else {
        // 失败，调用 onRejected，并传递女神的回复
        reject(`${name} -> 邓哥：你是个好人😜`);
      }
    }, 1000);
  });
}

sendMessage('李建国')
  .catch((reply) => {
    // 失败，继续
    console.log(reply);
    return sendMessage('王富贵');
  })
  .catch((reply) => {
    // 失败，继续
    console.log(reply);
    return sendMessage('周聚财');
  })
  .catch((reply) => {
    // 失败，继续
    console.log(reply);
    return sendMessage('刘人勇');
  })
  .then(
    (reply) => {
      // 成功，结束
      console.log(reply);
      console.log('邓哥终于找到了自己的伴侣');
    },
    (reply) => {
      // 最后一个也失败了
      console.log(reply);
      console.log('邓哥命犯天煞孤星，无伴终老，孤独一生');
    }
  );
```

### 邓哥的新问题

邓嫂出门时，给邓哥交待了几个任务：

1. 做饭

   可交给电饭煲完成

2. 洗衣服

   可交给洗衣机完成

3. 打扫卫生

   可交给扫地机器人完成

邓哥需要在所有任务结束后给邓嫂汇报工作，哪些成功了，哪些失败了

为了最大程度的节约时间，邓哥希望这些任务同时进行，最终汇总结果统一处理

<img src="http://mdrs.yuanjin.tech/img/20210621142519.png" alt="image-20210621142519937" style="zoom:50%;" />

每个任务可以看做是一个返回Promise的函数

```js
// 做饭
function cook() {
  return new Promise((resolve, reject) => {
    console.log('邓哥打开了电饭煲');
    setTimeout(() => {
      if (Math.random() < 0.5) {
        resolve('饭已ok');
      } else {
        reject('做饭却忘了加水，米饭变成了爆米花');
      }
    }, 2000);
  });
}

// 洗衣服
function wash() {
  return new Promise((resolve, reject) => {
    console.log('邓哥打开了洗衣机');
    setTimeout(() => {
      if (Math.random() < 0.5) {
        resolve('衣服已经洗好');
      } else {
        reject('洗衣服时停水了，洗了个寂寞');
      }
    }, 2500);
  });
}

// 打扫卫生
function sweep() {
  return new Promise((resolve, reject) => {
    console.log('邓哥打开了扫地机器人');
    setTimeout(() => {
      if (Math.random() < 0.5) {
        resolve('地板扫的非常干净');
      } else {
        reject('扫地机器人被哈士奇一爪掀翻了');
      }
    }, 3000);
  });
}

```

如何利用这三个函数实现邓哥的要求呢？

### Promise的静态方法

| 方法名                       | 含义                                                         |
| ---------------------------- | ------------------------------------------------------------ |
| Promise.resolve(data)        | 直接返回一个完成状态的任务                                   |
| Promise.reject(reason)       | 直接返回一个拒绝状态的任务                                   |
| Promise.all(任务数组)        | 返回一个任务<br />任务数组全部成功则成功<br />任何一个失败则失败 |
| Promise.any(任务数组)        | 返回一个任务<br />任务数组任一成功则成功<br />任务全部失败则失败 |
| Promise.allSettled(任务数组) | 返回一个任务<br />任务数组全部已决则成功<br />该任务不会失败 |
| Promise.race(任务数组)       | 返回一个任务<br />任务数组任一已决则已决，状态和其一致       |
|                              |                                                              |

### 邓哥的解决方案

```js
Promise.allSettled([cook(), wash(), sweep()]).then((result) => {
  // 处理汇总结果
  const report = result
    .map((r) => (r.status === 'fulfilled' ? r.value : r.reason))
    .join(';');
  console.log(report);
});
```

![image-20210618161125894](http://mdrs.yuanjin.tech/img/20210618161125.png)

### 消除回调

有了Promise，异步任务就有了一种统一的处理方式

有了统一的处理方式，ES官方就可以对其进一步优化

ES7推出了两个关键字`async`和`await`，用于更加优雅的表达Promise

#### async

async关键字用于修饰函数，被它修饰的函数，一定返回Promise

```js
async function method1(){
  return 1; // 该函数的返回值是Promise完成后的数据
}

method1(); // Promise { 1 }

async function method2(){
  return Promise.resolve(1); // 若返回的是Promise，则method得到的Promise状态和其一致
}

method2(); // Promise { 1 }

async function method3(){
  throw new Error(1); // 若执行过程报错，则任务是rejected
}

method3(); // Promise { <rejected> Error(1) }
```

#### await

`await`关键字表示等待某个Promise完成，**它必须用于`async`函数中**

```js
async function method(){
  const n = await Promise.resolve(1);
  console.log(n); // 1
}

// 上面的函数等同于
function method(){
  return new Promise((resolve, reject)=>{
    Promise.resolve(1).then(n=>{
      console.log(n);
      resolve(1)
    })
  })
}
```

`await`也可以等待其他数据

```js
async function method(){
  const n = await 1; // 等同于 await Promise.resolve(1)
}
```

如果需要针对失败的任务进行处理，可以使用`try-catch`语法

```js
async function method(){
  try{
    const n = await Promise.reject(123); // 这句代码将抛出异常
    console.log('成功', n)
  }
  catch(err){
    console.log('失败', err)
  }
}

method(); // 输出： 失败 123
```



### 邓哥表白的完美解决方案

邓哥的女神可不是只有4位，而是40位！

为了更加方便的编写表白代码，邓哥决定把这40位女神放到一个数组中，然后利用async和await轻松完成代码

```js
// 女神的名字数组
const beautyGirls = [
  '梁平',
  '邱杰',
  '王超'
];

// 向某位女生发送一则表白短信
// name: 女神的姓名
function sendMessage(name) {
  return new Promise((resolve, reject) => {
    // 模拟 发送表白短信
    console.log(
      `邓哥 -> ${name}：最近有谣言说我喜欢你，我要澄清一下，那不是谣言😘`
    );
    console.log(`等待${name}回复......`);
    // 模拟 女神回复需要一段时间
    setTimeout(() => {
      // 模拟 有10%的几率成功
      if (Math.random() <= 0.1) {
        // 成功，调用 onFuffiled，并传递女神的回复
        resolve(`${name} -> 邓哥：我是九，你是三，除了你还是你😘`);
      } else {
        // 失败，调用 onRejected，并传递女神的回复
        reject(`${name} -> 邓哥：你是个好人😜`);
      }
    }, 1000);
  });
}

// 批量表白的程序
async function proposal() {
  let isSuccess = false;
  for (const girl of beautyGirls) {
    try {
      const reply = await sendMessage(girl);
      console.log(reply);
      console.log('表白成功!');
      isSuccess = true;
      break;
    } catch (reply) {
      console.log(reply);
      console.log('表白失败');
    }
  }
  if (!isSuccess) {
    console.log('邓哥注定孤独一生');
  }
}
proposal();
```

## Generator函数

ES6 新引入了 Generator 函数，可以通过 yield 关键字，把函数的执行流挂起，为改变执行流程提供了可能，从而为异步编程提供解决方案。

```js
function* sendParameter(){
    console.log("start");
    var x = yield '2';
    console.log("one:" + x);
    var y = yield '3';
    console.log("two:" + y);
    console.log("total:" + (x + y));
}
// next不传参
var sendp1 = sendParameter();
sendp1.next();
// start
// {value: "2", done: false}
sendp1.next();
// one:undefined
// {value: "3", done: false}
sendp1.next();
// two:undefined
// total:NaN
// {value: undefined, done: true}
// next传参
var sendp2 = sendParameter();
sendp2.next(10);
// start
// {value: "2", done: false}
sendp2.next(20);
// one:20
// {value: "3", done: false}
sendp2.next(30);
// two:30
// total:50
// {value: undefined, done: true}
```
