import { useRef } from 'react';

export default function useCreation<T>(factory: () => T, deps: any[]) {
  const { current } = useRef({
    deps, // 存储依赖项
    obj: undefined as undefined | T, // 工厂函数产生的对象
    initialized: false, // 是否已经初始化，只会初始化一次
  });
  // 没有初始化或者依赖变化才执行工厂函数产生对象
  if (current.initialized === false || !depsAreSome(current.deps, deps)) {
    current.initialized = true;
    current.deps = deps;
    current.obj = factory();
  }
  return current.obj as T;
}

/**
 * 比对数组中的值是否没变化，变化返回false 没变化返回true
 * @param oldDeps
 * @param deps
 * @returns boolean
 */
function depsAreSome(oldDeps: any[], deps: any[]): boolean {
  if (oldDeps === deps) return true;
  // 此处有个漏洞，比如新deps在老的deps上增加了数据,已向官方pull request
  if (oldDeps.length !== deps.length) return false;
  for (let i = 0; i < oldDeps.length; i++) {
    if (oldDeps[i] !== deps[i]) return false;
  }
  return true;
}
