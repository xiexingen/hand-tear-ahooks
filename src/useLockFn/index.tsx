import React, { useCallback, useRef } from 'react';

export default function <P extends any[], V extends any = any>(
  fn: (...args: P) => Promise<V>,
) {
  // 定义一个ref存储执行状态，若方法未完成则直接返回
  const lockRef = useRef(false);
  // 返回一个useCallback包裹的函数，当fn变化的时候返回新的函数
  return useCallback(
    async (...args: P) => {
      if (lockRef.current) return;
      lockRef.current = true;
      try {
        return await fn(...args);
      } finally {
        // 源代码中是try catch形式的，感觉没必要多写一道，所以直接finall里面处理
        lockRef.current = false;
      }
    },
    [fn],
  );
}
