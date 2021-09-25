/**
 * title: 基础用法
 * desc: 在组件首次渲染时，执行方法。
 */

import React from 'react';
import { message, Button } from 'antd';
import useToggle from '../../useToggle';
import useMount from '..';

const MyComponent = () => {
  useMount(() => {
    message.info('mount');
  });

  return <div>Hello World</div>;
};

export default () => {
  const [state, { toggle }] = useToggle(false);

  return (
    <>
      <Button onClick={() => toggle()}>{state ? 'unmount' : 'mount'}</Button>
      {state && <MyComponent />}
    </>
  );
};
