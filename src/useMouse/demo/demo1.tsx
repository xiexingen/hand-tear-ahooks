/**
 * title: 基础用法
 * desc: 获取鼠标位置。
 */

import useMouse from '..';
import React from 'react';

export default () => {
  const mouse = useMouse();

  return <div>Mouse Pos: {JSON.stringify(mouse)}</div>;
};
