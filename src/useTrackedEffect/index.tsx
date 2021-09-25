import React, { useEffect, useRef, DependencyList } from 'react';

export default function (
  effect: (...args: any[]) => void,
  deps?: DependencyList,
) {
  const previousDepsRef = useRef<DependencyList>();
  // 比较两次依赖
  const diffTwoDeps = (deps1, deps2) => {
    //Let's do a reference equality check on 2 dependency list.
    //If deps1 is defined, we iterate over deps1 and do comparison on each element with equivalent element from deps2
    //As this func is used only in this hook, we assume 2 deps always have same length.
    return deps1
      ? deps1
          .map((_ele, idx) => (deps1[idx] !== deps2[idx] ? idx : -1))
          .filter((ele) => ele >= 0)
      : deps2
      ? deps2.map((_ele, idx) => idx)
      : [];
  };

  useEffect(() => {
    let changes = diffTwoDeps(previousDepsRef.current, deps);
    const previousDeps = previousDepsRef.current;
    previousDepsRef.current = deps;
    // 这里开始没理解，以为useEffect里面return的是组件销毁的时候才会执行，
    // ps 仔细看，这里是调用方法，那么其实是以这个方法的返回值作为useEffect的return
    return effect(changes, previousDeps, deps);
  }, deps);
}
