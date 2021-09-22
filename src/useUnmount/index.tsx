import React, { useEffect } from 'react';
import usePersisFn from '../usePersisFn';
import { isFunction } from '../utils';

export default function useUnmount(fn: () => void) {
  // 通过usePersisFn存传入进来的函数
  const fnPersist = usePersisFn(fn);
  // 通过useEffect 在组件卸载的时候
  useEffect(() => {
    return () => {
      if (isFunction(fnPersist)) {
        fnPersist();
      }
    };
  }, []);
}
