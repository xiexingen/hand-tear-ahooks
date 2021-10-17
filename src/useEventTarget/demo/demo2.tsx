/**
 * title: 自定义转换函数
 * desc: 只能输入数字的受控Input组件
 */

import React, { Fragment } from 'react';
import { Input, Button } from 'antd';
import useEventTarget from '..';

export default () => {
  const [value, { onChange, reset }] = useEventTarget({
    transformer: (val: string) => val.replace(/[^\d]/g, ''),
  });

  return (
    <Fragment>
      <Input
        value={value || ''}
        onChange={onChange}
        style={{ width: 200, marginRight: 20 }}
        placeholder="Please type here"
      />
      <Button onClick={reset}>reset</Button>
    </Fragment>
  );
};
