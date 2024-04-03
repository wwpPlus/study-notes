---
title: Promise
date: 2023-11-16 17:26:40
permalink: /pages/f9216a/
---
# Promise

![promise](https://wwp-study-notes.oss-cn-nanjing.aliyuncs.com/imgs/promise.jpg)

> Promise 的面试题基本都是代码题，不提供参考答案，否则容易干扰思考
>
> 若需知道正确答案，请自行运行

## 1. 下面代码的输出结果是什么

```js
const promise = new Promise((resolve, reject) => {
  console.log(1);
  resolve();
  console.log(2);
});

promise.then(() => {
  console.log(3);
});

console.log(4);
// 1 2 4 3
```

## 2. 下面代码的输出结果是什么

```js
const promise = new Promise((resolve, reject) => {
  console.log(1);
  setTimeout(() => {
    console.log(2);
    resolve();
    console.log(3);
  });
});

promise.then(() => {
  console.log(4);
});

console.log(5);
// 1 5 2 3 4
```

## 3. 下面代码的输出结果是什么

```js
const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve();
  }, 1000);
});
const promise2 = promise1.catch(() => {
  return 2;
});

console.log("promise1", promise1);
console.log("promise2", promise2);

setTimeout(() => {
  console.log("promise1", promise1);
  console.log("promise2", promise2);
}, 2000);
/**
    * promise1 Promise {<pending>}
      promise2 Promise {<pending>}
      promise1 Promise {<fulfilled>: undefined}
      promise2 Promise {<fulfilled>: undefined}
    */
```

## 4. 下面代码的输出结果是什么

```js
async function m() {
  console.log(0);
  const n = await 1;
  console.log(n);
}

m();
console.log(2);
// 0 2 1
```

## 5. 下面代码的输出结果是什么

```js
async function m() {
  console.log(0);
  const n = await 1;
  console.log(n);
}

(async () => {
  await m();
  console.log(2);
})();

console.log(3);
// 0 3 1 2
```

## 6. 下面代码的输出结果是什么

```js
async function m1() {
  return 1;
}

async function m2() {
  const n = await m1();
  console.log(n);
  return 2;
}

async function m3() {
  const n = m2();
  console.log(n);
  return 3;
}

m3().then((n) => {
  console.log(n);
});

m3();

console.log(4);
/**
    * Promise { <pending> }
      Promise { <pending> }
      4 1 3 1
    */
```

## 7. 下面代码的输出结果是什么

```js
Promise.resolve(1).then(2).then(Promise.resolve(3)).then(console.log);
// 1
```

## 8. 下面代码的输出结果是什么

```js
var a;
var b = new Promise((resolve, reject) => {
  console.log("promise1");
  setTimeout(() => {
    resolve();
  }, 1000);
})
  .then(() => {
    console.log("promise2");
  })
  .then(() => {
    console.log("promise3");
  })
  .then(() => {
    console.log("promise4");
  });

a = new Promise(async (resolve, reject) => {
  console.log(a);
  await b;
  console.log(a);
  console.log("after1");
  await a;
  resolve(true); // 无效
  console.log("after2"); // 无效
});

console.log("end");
/**
    * promise1
      undefined
      end
      promise2
      promise3
      promise4
      Promise { <pending> }
      after1
    */
```

## 9. 下面代码的输出结果是什么

```js
async function async1() {
  console.log("async1 start");
  await async2();
  console.log("async1 end");
}
async function async2() {
  console.log("async2");
}

console.log("script start");

setTimeout(function () {
  console.log("setTimeout");
}, 0);

async1();

new Promise(function (resolve) {
  console.log("promise1");
  resolve();
}).then(function () {
  console.log("promise2");
});
console.log("script end");
/**
    * script start
      async1 start
      async2
      promise1
      script end
      async1 end
      promise2
      setTimeout
    */
```
