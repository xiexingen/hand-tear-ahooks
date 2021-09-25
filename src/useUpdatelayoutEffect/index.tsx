import React, { useLayoutEffect, useRef } from 'react';

const useUpdateLayoutEffect: typeof useLayoutEffect = (effect, deps) => {
  const isMouted = useRef(false);

  useLayoutEffect(() => {
    if (!isMouted.current) {
      isMouted.current = true;
    } else {
      return effect();
    }
  }, deps);
};

export default useUpdateLayoutEffect;
