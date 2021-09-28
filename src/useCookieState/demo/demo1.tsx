/**
 * title: 将 state 存储在 cookie 中
 * desc: 刷新页面后，可以看到输入框中的内容被从 cookie 中恢复了。
 */

import * as React from 'react';
import { Input } from 'antd';
import useCookieState from '..';

export default () => {
  const [message, setMessage] = useCookieState('useCookieStateString');
  return (
    <Input
      value={message as string}
      placeholder="Please enter some words..."
      onChange={(e) => setMessage(e.target.value)}
      style={{ width: 300 }}
    />
  );
};
