import React, { useRef, useEffect } from 'react';

/**
 * 其实就是通过useRef定义一个常量值，再配合useEffect在卸载时，给ref赋值为true来标识这个组件已经卸载了
 * @returns
 */
export default function () {
  const unmountedRef = useRef(false);
  useEffect(() => {
    unmountedRef.current = false;
    return () => {
      unmountedRef.current = true;
    };
  }, []);
  return unmountedRef;
}
