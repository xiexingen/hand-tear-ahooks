import React, { useEffect } from 'react';
import usePersisFn from '../usePersisFn';

export default function useTimeout(
  fn: () => void,
  delay: number | undefined | null,
): void {
  const timerFn = usePersisFn(fn);
  useEffect(() => {
    if (delay === undefined || delay === null) return;
    const timer = setTimeout(() => {
      timerFn();
    }, delay);
    return () => {
      clearTimeout(timer);
    };
  }, [delay, timerFn]);
}
