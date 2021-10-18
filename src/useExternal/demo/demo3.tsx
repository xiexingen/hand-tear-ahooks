/**
 * title: 加载图片文件
 * desc: 加载一个静态图片作为外部资源引入页面
 */

import React from 'react';
import { Button } from 'antd';
import useExternal from '..';

export default () => {
  const ref = React.useRef<HTMLDivElement>(null);

  const [status, { toggle, load, unload }] = useExternal('/logo.svg', {
    target: ref,
    // target: document.querySelector('body')
  });

  return (
    <>
      <p>
        Status: <b>{status}</b>
      </p>
      <Button style={{ marginRight: 8 }} onClick={() => toggle()}>
        toggle
      </Button>
      <Button style={{ marginRight: 8 }} onClick={() => unload()}>
        unload
      </Button>
      <Button style={{ marginRight: 8 }} onClick={() => load()}>
        load
      </Button>
      <br />
      <br />
      <div ref={ref}></div>
    </>
  );
};
