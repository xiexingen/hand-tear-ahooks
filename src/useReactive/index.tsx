import React, { useRef, useState } from 'react';
import useCreation from '../useCreation';

// 存储值到代理的映射
const proxyMap = new WeakMap();
// 存储代理到值的映射(有可能传递进来的值本身就已经是个代理对象了)
const rawMap = new WeakMap();

// 判断是否是对象，null也是object类型
function isObject(val: object): boolean {
  return typeof val === 'object' && val !== null;
}

function observer<T extends object>(initialVal: T, cb: () => void): T {
  const existingProxy = proxyMap.get(initialVal);
  // 添加缓存 防止重新构建proxy
  if (existingProxy) {
    return existingProxy;
  }
  // 防止代理已代理过的对象,比如state.list=[...state.list],这样list会产生一个新代理，但是数组中的项(如果是对象)本身就是一个代理项，这种情况加个判断，如果是代理则直接返回
  // 个人考虑(这是否可以不用增加一个rawMap来存储，直接判断initialVal是否是Proxy实例，如果是直接返回)
  // https://github.com/alibaba/hooks/issues/839
  if (rawMap.has(initialVal)) {
    return initialVal;
  }

  // 为传入的值增加代理属性后返回代理后的值对象(vue3的响应式也是这样实现的)
  const proxy = new Proxy<T>(initialVal, {
    get(target, key, receiver) {
      const res = Reflect.get(target, key, receiver);
      return isObject(res) ? observer(res, cb) : Reflect.get(target, key);
    },
    // 主要就是通过这个，修改属性值的时候会进入set，通过cb函数修改一个state的空状态来让组件重新渲染
    set(target, key, val) {
      const ret = Reflect.set(target, key, val);
      cb();
      return ret;
    },
    deleteProperty(target, key) {
      const ret = Reflect.deleteProperty(target, key);
      cb();
      return ret;
    },
  });

  proxyMap.set(initialVal, proxy);
  rawMap.set(proxy, initialVal);
  return proxy;
}

// 接受一个对象，处理响应式然后返回处理后的对象
export default function <S extends object>(initialState: S): S {
  const [, setFlat] = useState({});
  const stateRef = useRef<S>(initialState);

  const state = useCreation(() => {
    return observer(stateRef.current, () => {
      setFlat({});
    });
  }, []);

  return state;
}
