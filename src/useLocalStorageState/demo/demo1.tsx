/**
 * title: 将 state 持久化在 localStorage 中
 * desc: 刷新页面后，可以看到输入框中的内容被从 localStorage 中恢复了。
 */

import React from 'react';
import useLocalStorageState from '..';

export default function () {
  const [message, setMessage] = useLocalStorageState('user-message', 'Hello~');
  return (
    <>
      <input
        value={message || ''}
        placeholder="Please enter some words..."
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        style={{ margin: '0 8px' }}
        type="button"
        onClick={() => setMessage('Hello~')}
      >
        Reset
      </button>
      {/* @ts-ignore */}
      <button type="button" onClick={() => setMessage()}>
        Clear
      </button>
    </>
  );
}
