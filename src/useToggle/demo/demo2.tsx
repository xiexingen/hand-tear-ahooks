/**
 * title: 在任意两个值之间切换
 * desc: 接受两个参数，在参数间进行切换。
 */

import React from 'react';
import { Button } from 'antd';
import useToggle from '..';

export default () => {
  const [state, { toggle, setLeft, setRight }] = useToggle('Hello', 'World');

  return (
    <div>
      <p>Effects：{state}</p>
      <p>
        <Button onClick={() => toggle()}>Toggle</Button>
        <Button onClick={() => toggle('Hello')} style={{ margin: '0 8px' }}>
          Toggle Hello
        </Button>
        <Button onClick={() => toggle('World')}>Toggle World</Button>
        <Button onClick={setLeft} style={{ margin: '0 8px' }}>
          Set Left
        </Button>
        <Button onClick={setRight}>Set Right</Button>
      </p>
    </div>
  );
};
