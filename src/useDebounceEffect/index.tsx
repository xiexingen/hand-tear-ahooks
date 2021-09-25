import useDebounceFn from '../useDebounceFn';
import React, {
  useEffect,
  EffectCallback,
  DependencyList,
  useState,
} from 'react';
import { DebounceOptions } from '../useDebounce/debounceOptions';
import useUpdateEffect from '../useUpdateEffect';
import useUnmount from '../useUnmount';

export default function useDebounceEffect(
  effect: EffectCallback,
  deps?: DependencyList,
  options?: DebounceOptions,
) {
  const [flat, setFlat] = useState({});
  // 通过useDebounceFn得到一个具有防抖功能的触发页面渲染的函数
  const { run, cancel } = useDebounceFn(() => {
    setFlat({});
  }, options);

  // 依赖项更改触发flag更新
  useEffect(() => {
    return run();
  }, deps);

  useUnmount(cancel);

  // flag更新的时候执行effect(flag的更新会有防抖功能，以此来让effect具有防抖功能)
  useUpdateEffect(effect, [flat]);
}
