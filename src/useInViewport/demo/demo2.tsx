/**
 * title: 传入 DOM 元素
 * desc: 传入 function 并返回一个 dom 元素
 */

import React from 'react';
import useInViewport from '..';

export default () => {
  const inViewPort = useInViewport(() => document.querySelector('#demo2'));
  return (
    <div>
      <div id="demo2">observer dom</div>
      <div style={{ marginTop: 70, color: inViewPort ? '#87d068' : '#f50' }}>
        {inViewPort ? 'visible' : 'hidden'}
      </div>
    </div>
  );
};
