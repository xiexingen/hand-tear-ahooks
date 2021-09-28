/**
 * title: 非受控组件
 * desc: 如果 props 中没有 value，则组件内部自理 state
 */

import { Button, Input } from 'antd';
import React from 'react';
import useControllableValue from '..';

export default (props: any) => {
  const [state, setState] = useControllableValue<string>(props, {
    defaultValue: 'default value',
  });
  return (
    <>
      <Input
        value={state}
        onChange={(e) => setState(e.target.value)}
        addonAfter={<Button onClick={() => setState('')}>Clear</Button>}
      />
    </>
  );
};
