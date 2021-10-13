import { isFunction } from '../utils';
import React, { useState, useCallback } from 'react';

export default function useSetState<T extends object>(
  initialState: T = {} as T,
): [T, (patch: Partial<T> | ((prevState: T) => Partial<T>)) => void] {
  const [state, setState] = useState<T>(initialState);

  // 包装一层，对state的值进行了一个合并，并支持了传入函数或者对象形式
  const setMergeState = useCallback((patch) => {
    setState((prevState) => ({
      ...prevState,
      ...(isFunction(patch) ? patch(prevState) : patch),
    }));
  }, []);
  return [state, setMergeState];
}
