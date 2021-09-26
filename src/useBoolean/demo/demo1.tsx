/**
 * title: 基础用法
 * desc: 默认切换布尔值状态，也可以接收一个参数作为新的值。
 */

import { Button } from 'antd';
import React from 'react';
import useBoolean from '..';

export default () => {
  const [state, { toggle, setTrue, setFalse }] = useBoolean(true);

  return (
    <div>
      <p>Effects：{JSON.stringify(state)}</p>
      <p>
        <Button onClick={() => toggle()}>Toggle</Button>
        <Button onClick={setFalse} style={{ margin: '0 16px' }}>
          Set false
        </Button>
        <Button onClick={setTrue}>Set true</Button>
      </p>
    </div>
  );
};
