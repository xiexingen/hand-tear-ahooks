/**
 * title: 动态加载样式
 * desc: 页面上加载外部 css 文件，例如引入 [bootstrap-badge.css](/useExternal/bootstrap-badge.css)
 */

import React from 'react';
import { Button } from 'antd';
import useExternal from '..';

export default () => {
  const [status, { toggle, load, unload }] = useExternal(
    '/useExternal/bootstrap-badge.css',
    {
      media: 'all',
    },
  );

  return (
    <>
      <p>
        Status: <b>{status}</b>
      </p>
      <div className="bd-example">
        <span className="badge badge-pill badge-primary">Primary</span>
        <span className="badge badge-pill badge-secondary">Secondary</span>
        <span className="badge badge-pill badge-success">Success</span>
        <span className="badge badge-pill badge-danger">Danger</span>
        <span className="badge badge-pill badge-warning">Warning</span>
        <span className="badge badge-pill badge-info">Info</span>
        <span className="badge badge-pill badge-light">Light</span>
        <span className="badge badge-pill badge-dark">Dark</span>
      </div>
      <br />
      <Button style={{ marginRight: 8 }} onClick={() => toggle()}>
        toggle
      </Button>
      <Button style={{ marginRight: 8 }} onClick={() => unload()}>
        unload
      </Button>
      <Button style={{ marginRight: 8 }} onClick={() => load()}>
        load
      </Button>
    </>
  );
};
