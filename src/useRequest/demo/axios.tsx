/**
 * title: 使用 axios
 * desc: 通过设置 `requestMethod`, 可以使用自己的请求库。
 */

import useRequest from '..';
import React from 'react';
import axios from 'axios';

export default () => {
  const { data, error, loading } = useRequest(
    'https://helloacm.com/api/random/?n=8&x=4',
    {
      requestMethod: (param: any) => axios(param),
    },
  );
  if (error) {
    return <div>failed to load</div>;
  }
  if (loading) {
    return <div>loading...</div>;
  }
  return <div>Number: {data?.data}</div>;
};
