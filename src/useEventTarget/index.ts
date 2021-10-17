import React, { useCallback, useRef, useState } from 'react';

interface EventTarget<U> {
  target: {
    value: U;
  };
}

export interface Options<T, U> {
  initialValue?: T;
  transformer?: (value: U) => T;
}

export default function useEventTarget<T, U = T>(options?: Options<T, U>) {
  const { initialValue, transformer } = options || {};
  const [value, setValue] = useState(initialValue);

  const reset = useCallback(() => {
    setValue(initialValue);
  }, []);

  const transformerRef = useRef(transformer);
  transformerRef.current = transformer;

  const onChange = useCallback((e: EventTarget<U>) => {
    const _value = e.target.value;
    if (typeof transformerRef.current === 'function') {
      return setValue(transformerRef.current(_value));
    }
    return setValue(_value as unknown as T);
  }, []);

  return [value, { reset, onChange }] as const;
}
