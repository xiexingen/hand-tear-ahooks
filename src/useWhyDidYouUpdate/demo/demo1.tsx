/**
 * title: 基础用法
 * desc: 更新 state 或 props，可以在控制台看到输出
 */

import React, { useState } from 'react';
import { Button } from 'antd';
import useWhyDidYouUpdate from '..';

const Demo: React.FC<{ count: number }> = (props) => {
  const [randomNum, setRandomNum] = useState(Math.random());

  useWhyDidYouUpdate('useWhyDidYouUpdateComponent', { ...props, randomNum });

  return (
    <div>
      <div>
        <span>number: {props.count}</span>
      </div>
      <div>
        randomNum: {randomNum}
        <Button
          onClick={() => setRandomNum(Math.random)}
          style={{ marginLeft: 8 }}
        >
          🎲
        </Button>
      </div>
    </div>
  );
};

export default () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Demo count={count} />
      <div>
        <Button onClick={() => setCount((prevCount) => prevCount - 1)}>
          count -
        </Button>
        <Button
          onClick={() => setCount((prevCount) => prevCount + 1)}
          style={{ marginLeft: 8 }}
        >
          count +
        </Button>
      </div>
      <p>Please open the browser console to view the output!</p>
    </div>
  );
};
