import React, { useRef } from 'react';

export type compareFunction<T> = (prev: T | undefined, next: T) => boolean;

export default function usePrevious<T>(state: T, compare?: compareFunction<T>) {
  // 存储上一个的值
  const prevRef = useRef<T>();
  // 存储当前值
  const curRef = useRef<T>();
  // 比对方法
  const needUpdate =
    typeof compare === 'function' ? compare(prevRef.current, state) : true;
  if (needUpdate) {
    prevRef.current = curRef.current;
    curRef.current = state;
  }

  return prevRef.current;
}
