/**
 * title: 受控组件
 * desc: 如果 props 有 value 字段，则由父级接管控制 state
 */

import React, { useState } from 'react';
import { Input, Button } from 'antd';
import useControllableValue from '..';

const ControllableComponent = (props: any) => {
  debugger;
  const [state, setState] = useControllableValue<string>(props);

  return (
    <Input
      value={state}
      onChange={(e) => setState(e.target.value)}
      style={{ width: 300 }}
    />
  );
};

export default () => {
  const [state, setState] = useState<string>('');
  const clear = () => {
    setState('');
  };
  debugger;
  return (
    <>
      <ControllableComponent value={state} onChange={setState} />
      <Button onClick={clear} style={{ margin: '0 4px' }}>
        Clear
      </Button>
    </>
  );
};
