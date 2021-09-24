/**
 * title: 基础用法
 * desc: 每1000ms，执行一次
 */

import React, { useState } from 'react';
import useInterval from '..';

export default () => {
  const [count, setCount] = useState(0);

  useInterval(() => {
    setCount(count + 1);
  }, 1000);

  return <div>count: {count}</div>;
};
