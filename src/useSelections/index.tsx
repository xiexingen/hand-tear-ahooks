import React, { useState, useMemo } from 'react';

export default function useSelections<T>(
  items: T[],
  defaultSelected: T[] = [],
) {
  // 存储选择的项
  const [selected, setSelected] = useState(defaultSelected);
  // 以选择对象作为key存储到Set中，方便快捷访问
  const selectedSet = useMemo(() => new Set(selected), [selected]);

  // 定义单选相关方法，是否选中、选择、取消选择、切换
  const singleActions = useMemo(() => {
    // 判断某个元素是否选中
    const isSelected = (item: T) => selectedSet.has(item);
    // 选中某个元素
    const select = (item: T) => {
      selectedSet.add(item);
      setSelected(Array.from(selectedSet));
    };

    // 取消选中某个元素
    const unSelect = (item: T) => {
      selectedSet.delete(item);
      setSelected(Array.from(selectedSet));
    };

    // 切换选择状态
    const toggle = (item: T) => {
      if (isSelected(item)) {
        unSelect(item);
      } else {
        select(item);
      }
    };
    return {
      isSelected,
      select,
      unSelect,
      toggle,
    };
  }, [selectedSet]);

  // 定义多选相关方法，全选、取消全选、部分选择
  const allActions = useMemo(() => {
    // 全选
    const selectAll = () => {
      items.forEach((item) => {
        selectedSet.add(item);
      });
      setSelected(Array.from(selectedSet));
    };

    // 取消全选
    const unSelectAll = () => {
      items.forEach((item) => {
        selectedSet.delete(item);
      });
      setSelected(Array.from(selectedSet));
    };

    // 是否没有任何项选中
    const noneSelected = items.every((item) => !selectedSet.has(item));
    // 是否全部选中状态,官方后面加了个!noneSelected 感觉无意义，
    const allSelected = items.every((item) => selectedSet.has(item)); // &&!noneSelected
    // 是否部分选择
    const partiallySelected = !noneSelected && !allSelected;
    // 全选/全不选
    const toggleAll = () => {
      allSelected ? unSelectAll() : selectAll();
    };
    return {
      selectAll,
      unSelectAll,
      noneSelected,
      allSelected,
      partiallySelected,
      toggleAll,
    };
  }, [selectedSet, items]);

  return {
    selected,
    setSelected,
    ...singleActions,
    ...allActions,
  };
}
