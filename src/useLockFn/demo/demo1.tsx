import React, { useState } from 'react';
import { Button, message } from 'antd';
import useLockFn from '../index';

// 模拟一个后端请求，两秒后返回
function mockApiRequest() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 2000);
  });
}

export default function () {
  const [count, setCount] = useState(0);

  /**
   * submit的处理函数使用useLockFn包裹的返回的函数
   * 注:count值的改变会让useLockFn每次返回的function都会改变，所以内部可以访问到最新的val
   */
  const submit = useLockFn(async () => {
    message.info('Start to submit');
    await mockApiRequest();
    setCount((val) => val + 1);
    message.success('Submit finished');
  });

  /**
   * 题外话
   * 如果此处这么调用，['a','b','c'].forEach(item=>submit().then(function2)) 这样执行的步骤是什么？
   * 分析：
   *  1.数组遍历 第一次执行'a'进入submit方法，内部标记状态为执行中，等待mockApiRequest执行完成
   *  2.执行'b'进入submit方法，发现状态为执行中，直接return(也就相当于Promise.resolve(undefined))然后执行then里面的function2
   *  3.执行'c'进入submit方法，发现状态为执行中，直接return(也就相当于Promise.resolve(undefined))然后执行then里面的function2
   *  4.mockApiRequest执行完成 继续后面的逻辑，然后执行then里面的function2
   * 所以then里面的执行顺序应该是:b、c、a
   * useLockFn虽然返回的是个Promise，但是不建议吧其他逻辑放到then里面，业务逻辑建议全在useLockFn里面实现
   */

  return (
    <>
      <p>Submit count:{count}</p>
      <Button type="primary" onClick={submit}>
        Submit
      </Button>
    </>
  );
}
