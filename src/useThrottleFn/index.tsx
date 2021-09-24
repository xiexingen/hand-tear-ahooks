import React, { useRef } from 'react';
import throttle from 'lodash/throttle';
import useCreation from '../useCreation';
import { ThrottleOptions } from '../useThrottle/throttleOptions';
import useUnmount from '../useUnmount';

type Fn = (...args: any[]) => any;

export default function useThrottleFn<T extends Fn>(
  fn: T,
  options?: ThrottleOptions,
) {
  const fnRef = useRef<T>();
  fnRef.current = fn;
  const wait = options?.wait ?? 1000;
  // 通过useCreation创建一个匿名函数，内部调用lodash的throttle包裹的函数
  const throtted = useCreation(() => {
    return throttle<T>(
      ((...args: any[]) => {
        return fnRef.current?.(...args);
      }) as T,
      wait,
      options,
    );
  }, []);

  // 在卸载的时候取消throttle
  useUnmount(() => {
    throtted.cancel();
  });

  return {
    run: throtted as unknown as T,
    cancel: throtted.cancel,
    flush: throtted.flush,
  };
}
