import React, { useRef } from 'react';
import debounce from 'lodash/debounce';
import { DebounceOptions } from '../useDebounce/debounceOptions';
import useCreation from '../useCreation';
import useUnmount from '../useUnmount';

type Fn = (...args: any[]) => any;

export default function useDebounceFn<T extends Fn>(
  fn: T,
  options?: DebounceOptions,
) {
  const fnRef = useRef<T>(fn);
  fnRef.current = fn;

  const wait = options?.wait ?? 1000;

  // 使用前面定义的useCreation创建一个引用地址不会变的函数，函数里面返回debounce包裹的实际函数
  const debounced = useCreation(
    () =>
      debounce<T>(
        ((...args: any[]) => {
          return fnRef.current(...args);
        }) as T,
        wait,
        options,
      ),
    [],
  );

  // 组件卸载的时候调用debouncde包裹的函数的cancel方法
  useUnmount(() => {
    debounced.cancel();
  });

  return {
    run: debounced as unknown as T,
    cancel: debounced.cancel,
    flush: debounced.flush,
  };
}
