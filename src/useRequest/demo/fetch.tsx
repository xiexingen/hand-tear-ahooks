/**
 * title: 使用默认的 fetch
 * desc: 如果 useRequest 第一个参数是 `string`、`object` 或 `() => string|object`，则默认使用 fetch 发送网络请求
 */

import useRequest from '..';
import React from 'react';

export default () => {
  const { data, error, loading } = useRequest(
    'https://helloacm.com/api/random/?n=8&x=4',
  );

  if (error) {
    return <div>failed to load</div>;
  }
  if (loading) {
    return <div>loading...</div>;
  }
  return <div>Number: {data}</div>;
};
