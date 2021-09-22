import React, { useState, useRef, useCallback } from 'react';

export default function <T>(initialValue: T[]) {
  // 自增的key
  const counterRef = useRef(-1);
  //key列表存储
  const keyList = useRef<Array<number>>([]);
  // 内部方法，设置key，会自动生成不重复的key
  const setKey = useCallback((index: number) => {
    counterRef.current += 1;
    keyList.current.splice(index, 0, counterRef.current);
  }, []);

  // 为默认数据设置key
  const [list, setList] = useState(() => {
    (initialValue || []).forEach((_, index) => {
      setKey(index);
    });
    return initialValue || [];
  });

  // 重置列表
  const resetList = useCallback((newList: T[] = []) => {
    keyList.current = [];
    setList(() => {
      (newList || []).forEach((_, index) => {
        setKey(index);
      });
      return newList || [];
    });
  }, []);

  // 插入
  const insert = useCallback((index: number, obj: T) => {
    setList((l) => {
      const temp = [...l];
      temp.splice(index, 0, obj);
      setKey(index);
      return temp;
    });
  }, []);

  // 根据下标获取下标对应的key值
  const getKey = useCallback((index: number) => keyList.current[index], []);

  // 根据key获取下标
  const getIndex = useCallback(
    (key: number) => keyList.current.findIndex((ele) => ele === key),
    [],
  );

  // 将数据合并到当前列表
  const merge = useCallback((index: number, obj: T[]) => {
    setList((l) => {
      const temp = [...l];
      obj.forEach((_, i) => {
        setKey(index + i);
      });
      temp.splice(index, 0, ...obj);
      return temp;
    });
  }, []);

  // 替换某一项
  const replace = useCallback((index: number, obj: T) => {
    setList((l) => {
      const temp = [...l];
      temp[index] = obj;
      return temp;
    });
  }, []);

  // 移除某一项
  const remove = useCallback((index: number) => {
    setList((l) => {
      const temp = [...l];
      temp.splice(index, 1);
      // remove keys if necessary
      try {
        keyList.current.splice(index, 1);
      } catch (e) {
        console.error(e);
      }
      return temp;
    });
  }, []);

  // 移位置
  const move = useCallback((oldIndex: number, newIndex: number) => {
    if (oldIndex === newIndex) return;
    setList((l) => {
      const newList = [...l];
      const temp = newList.filter((_: {}, index: number) => index !== oldIndex);
      temp.splice(newIndex, 0, newList[oldIndex]);

      // move keys if necessary
      try {
        const keyTemp = keyList.current.filter(
          (_: {}, index: number) => index !== oldIndex,
        );
        keyTemp.splice(newIndex, 0, keyList.current[oldIndex]);
        keyList.current = keyTemp;
      } catch (e) {
        console.error(e);
      }

      return temp;
    });
  }, []);

  // 追加到最后面
  const push = useCallback((obj: T) => {
    setList((l) => {
      setKey(l.length);
      return l.concat([obj]);
    });
  }, []);

  // 移除最后一项
  const pop = useCallback(() => {
    try {
      keyList.current = keyList.current.slice(0, keyList.current.length - 1);
    } catch (e) {
      console.error(e);
    }
    setList((l) => l.slice(0, l.length - 1));
  }, []);

  // 往最前面插入元素
  const unshift = useCallback((obj: T) => {
    setList((l) => {
      setKey(0);
      return [obj].concat(l);
    });
  }, []);

  // 移除最前面的元素
  const shift = useCallback(() => {
    // remove keys if necessary
    try {
      keyList.current = keyList.current.slice(1, keyList.current.length);
    } catch (e) {
      console.error(e);
    }
    setList((l) => l.slice(1, l.length));
  }, []);

  // 表单排序
  const sortForm = useCallback(
    (result: unknown[]) =>
      result
        .map((item, index) => ({ key: index, item })) // add index into obj
        .sort((a, b) => getIndex(a.key) - getIndex(b.key)) // sort based on the index of table
        .filter((item) => !!item.item) // remove undefined(s)
        .map((item) => item.item), // retrive the data
    [],
  );

  return {
    list,
    insert,
    merge,
    replace,
    remove,
    getKey,
    getIndex,
    move,
    push,
    pop,
    unshift,
    shift,
    sortForm,
    resetList,
  };
}
