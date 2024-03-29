/**
 * title: 并行请求
 * desc: 通过 `options.fetchKey` ，可以将请求进行分类，每一类的请求都有独立的状态，你可以在 `fetches` 中找到所有的请求。
 */

import useRequest from '..';
import { message, Button } from 'antd';
import React from 'react';

export function deleteUser(userId: string): Promise<{ success: boolean }> {
  console.log(userId);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true });
    }, 1000);
  });
}

export default () => {
  const { run, fetches } = useRequest(deleteUser, {
    manual: true,
    fetchKey: (id) => id,
    onSuccess: (result, params) => {
      if (result.success) {
        message.success(`Disabled user ${params[0]}`);
      }
    },
  });

  const users = [
    { id: '1', username: 'A' },
    { id: '2', username: 'B' },
    { id: '3', username: 'C' },
  ];

  return (
    <div>
      <div>You can click all buttons, each request has its own status.</div>
      <ul>
        {users.map((user) => (
          <li key={user.id} style={{ marginTop: 8 }}>
            <Button
              onClick={() => {
                run(user.id);
              }}
              disabled={fetches[user.id]?.loading}
            >
              {fetches[user.id]?.loading
                ? 'loading'
                : `delete ${user.username}`}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};
