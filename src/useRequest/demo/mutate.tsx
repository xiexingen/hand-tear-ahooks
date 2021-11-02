/**
 * title: 突变
 * desc: 你可以通过 `mutate` ，直接修改 `data` 。 `mutate` 函数参数可以为 `newData` 或 `(oldData) => newData` 。
 */
import React, { useState } from 'react';
import Mock from 'mockjs';
import useRequest from '..';
import { Button, Input } from 'antd';

function getUsername(): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Mock.mock('@name'));
    }, 1000);
  });
}

export default () => {
  const [state, setState] = useState('');
  const { data, mutate } = useRequest(getUsername, {
    onSuccess: (result) => {
      setState(result);
    },
  });

  return (
    <div>
      <p>username: {data}</p>
      <Input
        onChange={(e) => setState(e.target.value)}
        value={state}
        placeholder="Please enter username"
        style={{ width: 240, marginRight: 16 }}
      />
      <Button onClick={() => mutate(state)}>Edit</Button>
    </div>
  );
};
