/**
 * title: 基础用法
 * desc: 通过 usePersistFn，函数引用永远不会变化，示例中 `showCountPersistFn` 是不会变化的，`showCountCommon` 在 count 变化时变化。
 */

import React, { useState, useCallback, useRef } from 'react';
import { message, Button } from 'antd';
import usePersisFn from '..';

export default function () {
  const [count, setCount] = useState(1);
  // 定义一个引用地址永远不会变的函数(不会随着count的改版而改版)
  const showCountPersistFn = usePersisFn(() => {
    message.info(`Current count is ${count}`);
  });
  // 通过useCallback返回的会随着依赖项count的改版而变化
  const showCountCommon = useCallback(() => {
    message.info(`Current count is ${count}`);
  }, [count]);
  return (
    <>
      <Button
        onClick={() => {
          setCount((c) => c + 1);
        }}
      >
        Add Count
      </Button>
      <p>
        You can click the button to see the number of sub-component renderings
      </p>
      <div style={{ marginTop: 32 }}>
        <h4>Component with persist function:</h4>
        {/* use persist function, ExpensiveTree component will only render once */}
        <ExpensiveTree showCount={showCountPersistFn} />
      </div>
      <div style={{ marginTop: 32 }}>
        <h4>Component without persist function:</h4>
        {/* without persist function, ExpensiveTree component will re-render on state change */}
        <ExpensiveTree showCount={showCountCommon} />
      </div>
    </>
  );
}

// 使用React.memo缓存的组件
const ExpensiveTree = React.memo<{ [key: string]: any }>(({ showCount }) => {
  // 定义一个ref存储当前函数渲染的次数
  const renderCountRef = useRef(0);
  renderCountRef.current += 1;
  return (
    <div style={{ backgroundColor: 'grey', padding: 4 }}>
      <p>Render count:{renderCountRef.current}</p>
      {/* 点击执行父组件出传递过来的方法 */}
      <Button type="primary" onClick={showCount}>
        showParentCount
      </Button>
    </div>
  );
});
