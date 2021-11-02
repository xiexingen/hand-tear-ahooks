/**
 * title: 预加载
 * desc: 同一个 `cacheKey` 的请求，是全局共享的，也就是你可以提前加载数据。利用该特性，可以很方便的实现预加载。
 */

import useRequest from '..';
import useBoolean from '../../useBoolean';
import Mock from 'mockjs';
import React from 'react';
import { Button } from 'antd';

async function getArticle(
  type?: string,
): Promise<{ data: string; time: number }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: Mock.mock('@paragraph'),
        time: new Date().getTime(),
      });
    }, 1000);
  });
}

export default () => {
  const [state, { toggle }] = useBoolean();
  const { run } = useRequest(getArticle, {
    cacheKey: 'article',
    manual: true,
  });
  return (
    <div>
      <p>
        When the mouse hovers over the button, the article data is preloaded.
      </p>
      <p>
        <Button onMouseEnter={() => run()} onClick={() => toggle()}>
          show/hidden
        </Button>
      </p>
      {state && <Article />}
    </div>
  );
};

const Article = () => {
  const { data, loading } = useRequest(getArticle, {
    cacheKey: 'article',
  });

  if (!data && loading) {
    return <p>loading</p>;
  }

  return (
    <>
      <p>Latest request time: {data?.time}</p>
      <p>{data?.data}</p>
    </>
  );
};
