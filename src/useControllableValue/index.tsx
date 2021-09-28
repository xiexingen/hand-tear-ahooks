import useUpdateEffect from '../useUpdateEffect';
import React, { useState, useCallback } from 'react';

export interface Options<T> {
  defaultValue?: T;
  defaultValuePropName?: string;
  valuePropName?: string;
  trigger?: string;
}

export interface Props {
  [key: string]: any;
}

interface StandardProps<T> {
  value: T;
  defaultValue?: T;
  onChange: (val: T) => void;
}

function useControllableValue<T = any>(
  props: StandardProps<T>,
): [T, (val: T) => void];
function useControllableValue<T = any>(
  props?: Props,
  options?: Options<T>,
): [T, (v: T, ...args: any[]) => void];
function useControllableValue<T = any>(
  props: Props = {},
  options: Options<T> = {},
) {
  const {
    defaultValue,
    defaultValuePropName = 'defaultValue',
    valuePropName = 'value',
    trigger = 'onChange',
  } = options;

  // 获取值
  const value = props[valuePropName] as T;

  debugger;
  // 当前值，默认为props中的valuePropName 没有的情况取defaultValuePropName 否则取option中的defaultValue
  const [state, setState] = useState<T>(() => {
    debugger;
    if (valuePropName in props) {
      return value;
    }
    if (defaultValuePropName in props) {
      return props[defaultValuePropName];
    }
    return defaultValue;
  });

  // init的时候不用执行了
  useUpdateEffect(() => {
    debugger;
    if (valuePropName in props) {
      setState(value);
    }
  }, [value, valuePropName]);

  // 外部调用设置值
  const handleSetState = useCallback(
    (v: T, ...args: any[]) => {
      debugger;
      if (!(valuePropName in props)) {
        setState(v);
      }
      if (props[trigger]) {
        props[trigger](v, ...args);
      }
    },
    [props, valuePropName, trigger],
  );

  return [valuePropName in props ? value : state, handleSetState] as const;
}

export default useControllableValue;
