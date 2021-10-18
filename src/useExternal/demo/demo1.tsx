/**
 * title: 基础用法
 * desc: 页面上加载外部 javascript 文件，例如引入 [test-external-script.js](/useExternal/test-external-script.js)
 */

import React from 'react';
import { Button } from 'antd';
import useExternal from '..';

export default () => {
  const [status, { toggle, load, unload }] = useExternal(
    '/useExternal/test-external-script.js',
    {
      async: false,
    },
  );

  return (
    <>
      <p>
        Status: <b>{status}</b>
      </p>
      <p>
        Response: <i>{status}</i>
      </p>
      <Button style={{ marginRight: 8 }} onClick={() => toggle()}>
        toggle
      </Button>
      <Button
        style={{ marginRight: 8 }}
        onClick={() => {
          unload();
        }}
      >
        unload
      </Button>
      <Button style={{ marginRight: 8 }} onClick={() => load()}>
        load
      </Button>
    </>
  );
};
