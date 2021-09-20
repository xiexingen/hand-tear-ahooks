import React, { Dispatch, SetStateAction, useState, useCallback } from 'react';
import useUnmountedRef from '../useUnmountedRef';

/**
 * ts中的重载，如果学过后端语言，比如 C# 这个很容易理解
 * @example
 *  useSafeState()
 *  useSafeState(true)
 *  useSafeState(()=>true)
 */
function useSafeState<S>(
  initialState: S | (() => S),
): [S, Dispatch<SetStateAction<S>>];
function useSafeState<S = undefined>(): [
  S | undefined,
  Dispatch<SetStateAction<S | undefined>>,
];
function useSafeState(initialState?) {
  // 使用useUnmountedRef存储组件状态(卸载current为true)
  const unmountedRef = useUnmountedRef();
  // 原始的useState
  const [state, setState] = useState(initialState);

  // 通过useCallback返回一个记忆函数，不需要每次创建
  const setCurrentState = useCallback((currentState) => {
    // 如果组件已经卸载则不再更新
    if (unmountedRef.current) return;
    setState(currentState);
  }, []);

  return [state, setCurrentState] as const;
}
export default useSafeState;
