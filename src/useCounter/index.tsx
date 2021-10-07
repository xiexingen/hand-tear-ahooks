import React, { useMemo, useState } from 'react';
import useCreation from '../useCreation';

export interface Options {
  min?: number;
  max?: number;
}

export interface Actions {
  inc: (delta?: number) => void;
  dec: (delta?: number) => void;
  set: (value: number | ((c: number) => number)) => void;
  reset: () => void;
}

export type ValuePrams = number | ((c: number) => number);

function getTargetValue(val: number, options: Options = {}) {
  const { min, max } = options;
  let target = val;
  if (typeof max === 'number') {
    target = Math.min(max, target);
  }
  if (typeof min === 'number') {
    target = Math.max(min, target);
  }
  return target;
}

export default function useCounter(
  initialValue: number = 0,
  options: Options = {},
) {
  const { min, max } = options;

  // get init value
  const init = useCreation(() => {
    return getTargetValue(initialValue, {
      min,
      max,
    });
  }, []);

  const [current, setCurrent] = useState(init);

  // 操作方法
  const actions = useMemo(() => {
    // 设置指定值
    const setValue = (value: ValuePrams) => {
      setCurrent((c) => {
        // get target value
        let target = typeof value === 'number' ? value : value(c);
        return getTargetValue(target, {
          min,
          max,
        });
      });
    };

    // 值增加
    const inc = (delta: number = 1) => {
      setValue((c) => c + delta);
    };

    // 值减少
    const dec = (delta: number = 1) => {
      setValue((c) => (c = c - delta));
    };

    // 设置值(不会带之前的值)
    const set = (value: ValuePrams) => {
      setValue(value);
    };

    const reset = () => {
      setValue(init);
    };

    return {
      inc,
      dec,
      set,
      reset,
    };
  }, [init, max, min]);
  return [current, actions] as [number, Actions];
}
