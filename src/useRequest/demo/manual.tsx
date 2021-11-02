/**
 * title: 手动触发
 * desc: 通过设置 `options.manual = true` , 则需要手动调用 `run` 时才会触发执行异步函数。
 */

import React, { useState } from 'react';
import { message, Input, Button } from 'antd';
import useRequest from '..';

function changeUsername(username: string): Promise<{ success: boolean }> {
  console.log(username);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true });
    }, 1000);
  });
}

export default () => {
  const [state, setState] = useState('');
  const { loading, run } = useRequest(changeUsername, {
    manual: true,
    onSuccess: (result, params) => {
      if (result.success) {
        setState('');
        message.success(`The username was changed to "${params[0]}" !`);
      }
    },
  });

  return (
    <div>
      <Input
        onChange={(e) => setState(e.target.value)}
        value={state}
        placeholder="Please enter username"
        style={{ width: 240, marginRight: 16 }}
      />
      <Button disabled={loading} onClick={() => run(state)}>
        {loading ? 'loading' : 'Edit'}
      </Button>
    </div>
  );
};
