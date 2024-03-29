/**00
 * title: 缓存 & SWR
 * desc: 如果设置了 `options.cacheKey` ， useRequest 会将当前请求结束数据缓存起来。下次组件初始化时，如果有缓存数据，我们会优先返回缓存数据，然后在背后发送新请求，也就是 SWR 的能力。你可以通过 `cacheTime` 设置缓存数据回收时间，也可以通过 `staleTime` 设置数据保持新鲜时间。
 */

import useRequest from '..';
import Mock from 'mockjs';
import React from 'react';
import useBoolean from '../../useBoolean';
import { Button } from 'antd';

async function getArticle(): Promise<{ data: string; time: number }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: Mock.mock('@paragraph'),
        time: new Date().getTime(),
      });
    }, 1000);
  });
}

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

export default () => {
  const [state, { toggle }] = useBoolean();
  return (
    <div>
      <p>
        You can click the button multiple times, the article component will show
        the cached data first.
      </p>
      <p>
        <Button onClick={() => toggle()}>show/hidden</Button>
      </p>
      {state && <Article />}
    </div>
  );
};
