/**
 * title: 节流
 * desc: 通过设置 `options.throttleInterval` ，则进入节流模式。此时如果频繁触发 `run` ，则会以节流策略进行请求。
 */

import useRequest from '..';
import Mock from 'mockjs';
import React from 'react';
import { Input } from 'antd';

async function getEmail(search: string): Promise<string[]> {
  console.log(search);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Mock.mock({ 'data|5': ['@email'] }).data);
    }, 100);
  });
}

export default () => {
  const { data, loading, run } = useRequest(getEmail, {
    throttleInterval: 500,
    manual: true,
  });

  return (
    <div>
      <p>Enter quickly to see the effect</p>
      <Input
        placeholder="Select Emails"
        onChange={(e) => run(e.target.value)}
      />
      {loading ? (
        <p>loading</p>
      ) : (
        <ul style={{ marginTop: 8 }}>
          {data?.map((i) => (
            <li key={i}>{i}</li>
          ))}
        </ul>
      )}
    </div>
  );
};
