/**
 * title: 基础用法
 * desc: 带初始化值跟重置的受控 Input 组件
 */

import React, { Fragment } from 'react';
import { Input, Button } from 'antd';
import useEventTarget from '..';

export default () => {
  const [value, { reset, onChange }] = useEventTarget({
    initialValue: 'this is initial value',
  });

  return (
    <Fragment>
      <Input
        value={value}
        onChange={onChange}
        style={{ width: 200, marginRight: 20 }}
      />
      <Button onClick={reset}>reset</Button>
    </Fragment>
  );
};
