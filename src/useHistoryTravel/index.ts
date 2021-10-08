import React, { useState, useCallback, useRef } from 'react';

interface IData<T> {
  /**
   * 当前值
   */
  present?: T;
  /**
   * 当前值 前面的值列表
   */
  past: T[];
  /**
   * 当前值 后面的值列表
   */
  future: T[];
}

/**
 * 根据step获取移动后的下标
 * @param step 要移动的步频，>0 往后移动，<0 往前移
 * @param arr 要移动的数组
 * @returns number 移动后的下标
 */
const dumpIndex = <T>(step: number, arr: T[]) => {
  // step大于0往后移，小于0 往前移
  let index = step > 0 ? step - 1 : arr.length + step;
  if (index >= arr.length - 1) {
    index = arr.length - 1;
  }
  if (index < 0) {
    index = 0;
  }
  return index;
};

/**
 * 将数组按指定step分割成对象
 * @param step 步频
 * @param targetArr 要分割在数组
 * @returns {
 *  _current:T, // 当前值
 *  _before:T[], // 当前值前面的值列表
 *  _after:T[] , // 当前值后面的值列表
 * }
 */
const split = <T>(step: number, targetArr: T[]) => {
  const index = dumpIndex(step, targetArr);
  return {
    _current: targetArr[index],
    _before: targetArr.slice(0, index),
    _after: targetArr.slice(index + 1),
  };
};

export default function useHistoryTravel<T>(initialValue?: T) {
  const [history, setHistory] = useState<IData<T | undefined>>({
    present: initialValue,
    past: [],
    future: [],
  });
  const { present, past, future } = history;

  const initialValueRef = useRef(initialValue);

  const reset = useCallback(
    (...params: any[]) => {
      const _initial = params.length > 0 ? params[0] : initialValueRef.current;
      initialValueRef.current = _initial;

      setHistory({
        present: _initial,
        future: [],
        past: [],
      });
    },
    [history, setHistory],
  );

  // 设置当前值以及当前值前面的值列表，将当前值后面的值列表置空
  const updateValue = useCallback(
    (val: T) => {
      setHistory({
        present: val,
        future: [],
        past: [...past, present],
      });
    },
    [history, setHistory],
  );

  // 前进
  const _forward = useCallback(
    (step: number = 1) => {
      if (future.length === 0) {
        return;
      }
      const { _before, _current, _after } = split(step, future);
      setHistory({
        past: [...past, present, ..._before],
        present: _current,
        future: _after,
      });
    },
    [history, setHistory],
  );

  // 回退到上一个值
  const _backward = useCallback(
    (step: number = -1) => {
      if (past.length === 0) {
        return;
      }
      const { _before, _current, _after } = split(step, past);
      setHistory({
        past: _before,
        present: _current,
        future: [..._after, present, ...future],
      });
    },
    [history, setHistory],
  );

  // 快捷方式到指定位置
  const go = useCallback(
    (step: number) => {
      const stepNum = typeof step === 'number' ? step : Number(step);
      if (stepNum === 0) {
        return;
      }
      if (stepNum > 0) {
        return _forward(stepNum);
      } else {
        return _backward(stepNum);
      }
    },
    [history, setHistory],
  );

  return {
    value: present,
    setValue: updateValue,
    backLength: past.length,
    forwardLength: future.length,
    go,
    back: useCallback(() => {
      go(-1);
    }, [go]),
    forward: useCallback(() => {
      go(1);
    }, [go]),
    reset,
  };
}
