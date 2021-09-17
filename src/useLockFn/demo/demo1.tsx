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
  return (
    <>
      <p>Submit count:{count}</p>
      <Button type="primary" onClick={submit}>
        Submit
      </Button>
    </>
  );
}
