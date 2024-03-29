/**
 * title: 图片全屏
 * desc: 全屏图片
 */

import React from 'react';
import { Button } from 'antd';
import useFullscreen from '..';
import img from './react-hooks.jpg';

export default () => {
  const [, { setFull }] = useFullscreen(() =>
    document.getElementById('fullscreen-img'),
  );
  return (
    <div style={{ background: 'white' }}>
      <div style={{ marginBottom: 16 }}>
        <img id="fullscreen-img" src={img} style={{ width: 320 }} alt="" />
      </div>
      <Button onClick={setFull}>setFull</Button>
    </div>
  );
};
