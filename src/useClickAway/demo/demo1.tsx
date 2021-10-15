/**
 * title: 基础用法
 * desc: 请点击按钮或按钮外查看效果。
 */

import React, { useState, useRef } from 'react';
import useClickAway from '..';

export default () => {
  const [counter, setCounter] = useState(0);
  const ref = useRef<any>();
  useClickAway(() => {
    setCounter((s) => s + 1);
  }, ref);

  return (
    <div>
      <span ref={ref}>
        <button type="button">box1</button>
      </span>
      <p>counter: {counter}</p>
    </div>
  );
};
