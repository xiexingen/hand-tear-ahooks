import React, { useState, useEffect } from 'react';
import useDebounceFn from '../useDebounceFn';
import { DebounceOptions } from './debounceOptions';

export default function useDebounce<T>(value: T, options?: DebounceOptions) {
  // 初始化值
  const [debounced, setDebounced] = useState(value);

  // 通过useDebounceFn来延迟修改返回的值
  const { run } = useDebounceFn(() => {
    setDebounced(value);
  }, options);

  // 依赖项value改变的时候运行debounceFn函数
  useEffect(() => {
    run();
  }, [value]);

  return debounced;
}
