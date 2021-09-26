import { parse, stringify } from 'query-string';
import React, { useRef, useState, useMemo } from 'react';
import { useHistory, useLocation } from 'react-router';

export interface Options {
  navigateMode?: 'push' | 'replace';
}

const parseConfig = {
  skipNull: true,
  skipEmptyString: true,
  parseNumbers: false,
  parseBooleans: false,
};

interface UrlState {
  [key: string]: any;
}

export default function useUrlState<S extends UrlState = UrlState>(
  initialState?: S | (() => S),
  options?: Options,
) {
  type state = Partial<{ [key in keyof S]: any }>;
  // 默认为push
  const { navigateMode = 'push' } = options || {};
  // 使用react-route中的useLocation、useHistory
  const location = useLocation();
  const history = useHistory();
  const [, update] = useState(false);
  // 初始值
  const initialStateRef = useRef(
    typeof initialState === 'function'
      ? (initialState as () => S)()
      : initialState || {},
  );
  // 使用query-string解析url上的query参数
  const queryFromUrl = useMemo(() => {
    return parse(location.search, parseConfig);
  }, [location.search]);
  // 得到最新的url query 对象
  const targetQuery: state = useMemo(() => {
    return {
      ...initialStateRef.current,
      ...queryFromUrl,
    };
  }, [queryFromUrl]);

  const setState = (s: React.SetStateAction<state>) => {
    const newQuery = typeof s === 'function' ? (s as Function)(targetQuery) : s;
    // 1. 如果setState后，search没变化，就需要update来触发一次更新，比如 demo1直接点击clear，就需要update来触发更新
    // 2. update喝history的更新会合并，不会造成多次更新
    update((v) => !v);
    history[navigateMode]({
      hash: location.hash,
      search: stringify({ ...queryFromUrl, ...newQuery }),
    });
  };

  return [targetQuery, setState] as const;
}
