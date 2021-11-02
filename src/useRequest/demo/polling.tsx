/**
 * title: 轮询
 * desc: |
 *  通过设置 `options.pollingInterval` ，进入轮询模式，定时触发函数执行。
 *
 *  - 通过设置 `options.pollingWhenHidden=false` ，在屏幕不可见时，暂时暂停定时任务。
 *  - 通过 `run` / `cancel` 来 开启/停止 轮询。
 *  - 在 `options.manual=true` 时，需要第一次执行 `run` 后，才开始轮询。
 */

import useRequest from '..';
import React from 'react';
import Mock from 'mockjs';
import { Button } from 'antd';

function getUsername(): Promise<string> {
  console.log('execute getUsername');
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Mock.mock('@name'));
    }, 1000);
  });
}

export default () => {
  const { data, loading, run, cancel } = useRequest(getUsername, {
    pollingInterval: 1000,
    pollingWhenHidden: false,
  });

  return (
    <>
      <p>Username: {loading ? 'loading' : data}</p>
      <Button onClick={run}>start</Button>
      <Button onClick={cancel} style={{ marginLeft: 8 }}>
        stop
      </Button>
    </>
  );
};
