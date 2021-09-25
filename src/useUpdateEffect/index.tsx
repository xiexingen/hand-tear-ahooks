import React, { useRef, useEffect } from 'react';

const useUpdateEffect: typeof useEffect = (effect, deps) => {
  // 存储当前是渲染过
  const isMounted = useRef(false);
  // 渲染过才执行effect
  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
    } else {
      return effect();
    }
  }, deps);
};

export default useUpdateEffect;
