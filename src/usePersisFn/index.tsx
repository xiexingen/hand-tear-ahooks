import React, { useRef } from 'react';

export type noop = (...args: any[]) => any;

export default function <T extends noop>(fn: T) {
  // 定义一个ref存储传入进入的fn
  const fnRef = useRef<T>(fn);
  // 为了让fn保持最新的，将最新的fn更新到ref(如果不这么做，current将永远是第一次的)
  fnRef.current = fn;

  const persisFn = useRef<T>();
  if (!persisFn.current) {
    // 将current给一个匿名函数，这样persisFn的current将永远是这个匿名函数，然后匿名函数里面调用最新的fn(也就是fnRef.current)，内部this指向调用方
    persisFn.current = function (...args) {
      // @ts-ignore
      return fnRef.current!.apply(this, args);
    } as T;
  }
  return persisFn.current;
}
