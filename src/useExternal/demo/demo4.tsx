/**
 * title: 传入一个变量
 * desc: 随机生成 url 地址并传入 useExternal
 */

import React from 'react';
import { Button } from 'antd';
import useExternal from '..';

export default () => {
  const ref = React.useRef<HTMLDivElement>(null);

  const [path, setPath] = React.useState('https://picsum.photos/200/100');

  const [status] = useExternal(path, {
    type: 'img',
    target: ref,
  });

  return (
    <>
      <p>
        Status: <b>{status}</b>
      </p>
      <Button
        style={{ marginRight: 8 }}
        onClick={() =>
          setPath(
            `https://picsum.photos/200/100?random=${Math.floor(
              Math.random() * 100,
            )}`,
          )
        }
      >
        random a path
      </Button>
      <br />
      <br />
      <a href={path} target="_blank">
        {path}
      </a>
      <br />
      <div ref={ref}></div>
    </>
  );
};
