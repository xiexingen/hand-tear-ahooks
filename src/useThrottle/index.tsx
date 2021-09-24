import React, { useState, useEffect } from 'react';
import useThrottleFn from '../useThrottleFn';
import { ThrottleOptions } from './throttleOptions';

export default function useThrottle<T>(value: T, options?: ThrottleOptions) {
  const [throttled, setThrottled] = useState(value);

  const { run } = useThrottleFn(() => {
    setThrottled(value);
  }, options);

  useEffect(() => {
    run();
  }, [value]);

  return throttled;
}
