import React, {
  MutableRefObject,
  useRef,
  useState,
  useEffect,
  useMemo,
} from 'react';
import useSize from '../useSize';

export interface OptionType {
  itemHeight: number | ((index: number) => number);
  overscan?: number;
}

export interface VirtualListResult<T> {
  list: {
    index: number;
    data: T;
  }[];
  scrollTo: (index: number) => void;
  containerProps: any;
  wrapperProps: any;
}

export default function useVirtualList<T>(
  list: T[],
  options: OptionType,
): VirtualListResult<T> {
  // 存储容器的ref
  const containerRef = useRef<HTMLElement | null>();
  // 容器的宽高
  const size = useSize(containerRef as MutableRefObject<HTMLElement>);
  // 可视数据下标范围
  const [state, setState] = useState({ start: 0, end: 10 });
  const { itemHeight, overscan = 5 } = options;

  // 由于数据是根据容器高度以及每条的高度去计算的，所以必须要有itemHeight
  if (!itemHeight) {
    console.warn('please enter a valid itemHeight');
  }

  // 根据容器高度计算出可以容纳的数据条数
  const getViewCapacity = (containerHeight: number) => {
    // 如果itemHeight是固定的，则直接用容器高度/itemHeight得到可以容纳的数据条数
    if (typeof itemHeight === 'number') {
      return Math.ceil(containerHeight / itemHeight);
    }
    // itemHeight是需要计算的情况，遍历然后求和计算出可以容纳的数据条数
    const { start = 0 } = state;
    let sum = 0;
    let capacity = 0;
    for (let i = start; i < list.length; i++) {
      const height = (itemHeight as (index: number) => number)(i);
      sum += height;
      if (sum >= containerHeight) {
        capacity = i;
        break;
      }
    }
    return capacity - start;
  };

  // 获取需要跳过的条数(根据滚动的高度以及每一条的高度计算跳过的数据条数)
  const getOffset = (scrollTo: number) => {
    if (typeof itemHeight === 'number') {
      return Math.floor(scrollTo / itemHeight) + 1;
    }
    let sum = 0;
    let offset = 0;
    for (let i = 0; i < list.length; i++) {
      const height = (itemHeight as (index: number) => number)(i);
      sum += height;
      if (sum >= scrollTo) {
        offset = i;
        break;
      }
    }
    return offset + 1;
  };

  // 根据滚动条数以及容纳量从原始数据中拿出当前实际渲染的数据列表
  const calculateRange = () => {
    const element = containerRef.current;
    if (element) {
      const offset = getOffset(element.scrollTop);
      const viewCapacity = getViewCapacity(element.clientHeight);
      // 这里需要多渲染几条无用数据，用来处理极端情况
      const from = offset - overscan;
      const to = offset + viewCapacity + overscan;
      setState({
        start: from < 0 ? 0 : from,
        end: to > list.length ? list.length : to,
      });
    }
  };

  // 容器大小以及数据源变化的时候，重新计算渲染数据
  useEffect(() => {
    calculateRange();
  }, [size.width, size.height, list.length]);

  // 计算所有数据的总高度之和
  const totalHeight = useMemo(() => {
    if (typeof itemHeight === 'number') {
      return list.length * itemHeight;
    }
    return list.reduce((sum, _, index) => sum + itemHeight(index), 0);
  }, [list.length]);

  // 获取指定下标的数据距容器顶部的距离
  const getDistanceTop = (index: number) => {
    if (typeof itemHeight === 'number') {
      return index * itemHeight;
    }
    return list
      .slice(0, index)
      .reduce((sum, _, index) => sum + itemHeight(index), 0);
  };

  // 滚动到特定的数据(滚动后重新计算渲染区域数据)
  const scrollTo = (index: number) => {
    if (containerRef.current) {
      containerRef.current.scrollTop = getDistanceTop(index);
      calculateRange();
    }
  };

  // 当前滚动的距离
  const offsetTop = useMemo(() => getDistanceTop(state.start), [state.start]);

  return {
    list: list.slice(state.start, state.end).map((ele, index) => ({
      data: ele,
      index: index + state.start,
    })),
    scrollTo,
    containerProps: {
      ref: (ele: any) => {
        containerRef.current = ele;
      },
      // 滚动的时候需要重新计算渲染数据
      onScroll: (e: any) => {
        e.preventDefault();
        calculateRange();
      },
      style: {
        overflowY: 'auto' as const,
      },
    },
    wrapperProps: {
      style: {
        width: '100%',
        height: totalHeight - offsetTop,
        marginTop: offsetTop,
      },
    },
  };
}
