/**
 * title 自定义 DOM
 * desc 支持直接传入 DOM 对象或通过 function 返回一个对象的方式引入。
 */

import React, { useState } from 'react';
import useClickAway from '..';

export default () => {
  const [counter, setCounter] = useState(0);

  useClickAway(
    () => {
      setCounter((s) => s + 1);
    },
    () => document.getElementById('box2'),
  );

  return (
    <div>
      <button type="button" id="box2">
        box2
      </button>
      <p>counter: {counter}</p>
    </div>
  );
};
