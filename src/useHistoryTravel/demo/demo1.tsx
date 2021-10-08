/**
 * title: 基础用法
 * desc: 撤销跟重做操作，输入内容后，点击 back 和 forward。
 */

import React from 'react';
import { Button, Input } from 'antd';
import useHistoryTravel from '..';

export default () => {
  const { value, setValue, backLength, forwardLength, back, forward } =
    useHistoryTravel<string>();

  return (
    <Input.Group compact>
      <Input
        style={{ width: '60%' }}
        value={value || ''}
        onChange={(e) => setValue(e.target.value)}
      />
      <Button disabled={backLength <= 0} onClick={back}>
        back
      </Button>
      <Button disabled={forwardLength <= 0} onClick={forward}>
        forward
      </Button>
    </Input.Group>
  );
};
