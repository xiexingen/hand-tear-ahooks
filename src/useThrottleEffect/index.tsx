import useThrottleFn from '../useThrottleFn';
import React, {
  EffectCallback,
  DependencyList,
  useState,
  useEffect,
} from 'react';
import { ThrottleOptions } from '../useThrottle/throttleOptions';
import useUnmount from '../useUnmount';
import useUpdateEffect from '../useUpdateEffect';

export default function useThrottleEffect(
  effect: EffectCallback,
  deps?: DependencyList,
  options?: ThrottleOptions,
) {
  const [flag, setFlag] = useState({});

  const { run, cancel } = useThrottleFn(() => {
    setFlag({});
  }, options);

  useEffect(() => {
    return run();
  }, deps);

  useUnmount(cancel);

  useUpdateEffect(effect, [flag]);
}
