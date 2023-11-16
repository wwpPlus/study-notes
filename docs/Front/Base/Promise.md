# Promise

> Promise 的面试题基本都是代码题，不提供参考答案，否则容易干扰思考
>
> 若需知道正确答案，请自行运行

![image-20210618161125894](http://mdrs.yuanjin.tech/img/20210618161125.png)

## 链式调用规则

![image-20210621103501094](http://mdrs.yuanjin.tech/img/20210621103501.png)

1. then 方法必定会返回一个新的 Promise

   可理解为`后续处理也是一个任务`

2. 新任务的状态取决于后续处理：

   - 若没有相关的后续处理，新任务的状态和前任务一致，数据为前任务的数据

   - 若有后续处理但还未执行，新任务挂起。
   - 若后续处理执行了，则根据后续处理的情况确定新任务的状态
     - 后续处理执行无错，新任务的状态为完成，数据为后续处理的返回值
     - 后续处理执行有错，新任务的状态为失败，数据为异常对象
     - 后续执行后返回的是一个任务对象，新任务的状态和数据与该任务对象一致

## Promise 的静态方法

| 方法名                       | 含义                                                             |
| ---------------------------- | ---------------------------------------------------------------- |
| Promise.resolve(data)        | 直接返回一个完成状态的任务                                       |
| Promise.reject(reason)       | 直接返回一个拒绝状态的任务                                       |
| Promise.all(任务数组)        | 返回一个任务<br />任务数组全部成功则成功<br />任何一个失败则失败 |
| Promise.any(任务数组)        | 返回一个任务<br />任务数组任一成功则成功<br />任务全部失败则失败 |
| Promise.allSettled(任务数组) | 返回一个任务<br />任务数组全部已决则成功<br />该任务不会失败     |
| Promise.race(任务数组)       | 返回一个任务<br />任务数组任一已决则已决，状态和其一致           |
|                              |                                                                  |

## async 和 await

有了 Promise，异步任务就有了一种统一的处理方式

有了统一的处理方式，ES 官方就可以对其进一步优化

ES7 推出了两个关键字`async`和`await`，用于更加优雅的表达 Promise

### async

async 关键字用于修饰函数，被它修饰的函数，一定返回 Promise

```js
async function method1() {
  return 1; // 该函数的返回值是Promise完成后的数据
}

method1(); // Promise { 1 }

async function method2() {
  return Promise.resolve(1); // 若返回的是Promise，则method得到的Promise状态和其一致
}

method2(); // Promise { 1 }

async function method3() {
  throw new Error(1); // 若执行过程报错，则任务是rejected
}

method3(); // Promise { <rejected> Error(1) }
```

### await

`await`关键字表示等待某个 Promise 完成，**它必须用于`async`函数中**

```js
async function method() {
  const n = await Promise.resolve(1);
  console.log(n); // 1
}

// 上面的函数等同于
function method() {
  return new Promise((resolve, reject) => {
    Promise.resolve(1).then((n) => {
      console.log(n);
      resolve(1);
    });
  });
}
```

`await`也可以等待其他数据

```js
async function method() {
  const n = await 1; // 等同于 await Promise.resolve(1)
}
```

如果需要针对失败的任务进行处理，可以使用`try-catch`语法

```js
async function method() {
  try {
    const n = await Promise.reject(123); // 这句代码将抛出异常
    console.log("成功", n);
  } catch (err) {
    console.log("失败", err);
  }
}

method(); // 输出： 失败 123
```

## 事件循环

根据目前所学，进入事件队列的函数有以下几种：

- `setTimeout`的回调，宏任务（macro task）
- `setInterval`的回调，宏任务（macro task）
- Promise 的`then`函数回调，**微任务**（micro task）
- `requestAnimationFrame`的回调，宏任务（macro task）
- 事件处理函数，宏任务(macro task)
