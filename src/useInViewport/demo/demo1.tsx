/**
 * title: 基础用法
 * desc: 使用 ref 监听节点在视图变化或者滚动时是否在可视范围之内
 */

import React, { useRef } from 'react';
import useInViewport from '..';

export default () => {
  const ref = useRef(null);
  const inViewPort = useInViewport(ref);
  return (
    <div>
      <div ref={ref}>observer dom</div>
      <div style={{ marginTop: 70, color: inViewPort ? '#87d068' : '#f50' }}>
        {inViewPort ? 'visible' : 'hidden'}
      </div>
    </div>
  );
};
