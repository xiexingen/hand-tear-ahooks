/**
 * title: 基础用法
 * desc: 在组件卸载时，执行方法。
 */

import { message } from 'antd';
import React from 'react';
import useUnmount from '..';
import useToggle from '../../useToggle';

const MyComponent = () => {
  useUnmount(() => {
    message.info('unmount');
  });

  return <div>Hello World</div>;
};

export default () => {
  const [state, { toggle }] = useToggle(true);

  return (
    <>
      <button type="button" onClick={() => toggle()}>
        {state ? 'unmount' : 'mount'}
      </button>
      {state && <MyComponent />}
    </>
  );
};
