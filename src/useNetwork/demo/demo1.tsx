/**
 * title: 基础用法
 * desc: 返回网络状态信息
 */

import React from 'react';
import useNetwork from '..';

export default () => {
  const networkState = useNetwork();

  return (
    <div>
      <p>Effects：{JSON.stringify(networkState)}</p>
    </div>
  );
};
