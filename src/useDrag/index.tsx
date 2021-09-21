import React from 'react';

type getDragPropsFn = (data: any) => {
  draggable: 'true';
  key?: string;
  onDragStart: (e: React.DragEvent) => void;
  onDragEnd: (e: React.DragEvent) => void;
};

interface IConfig {
  onDragStart?: (data: any, e: React.DragEvent) => void;
  onDragEnd?: (data: any, e: React.DragEvent) => void;
  /**
   * 是否在getProps方法返回的对象中包含默认的key
   */
  getPropsWithKey?: boolean;
}

/**
 * 其实就是往节点上设置draggable="true" 以及监听了事件 onDragStart、onDragEnd
 * @param config
 * @returns
 */
export default function (config?: IConfig): getDragPropsFn {
  return (data: any) => {
    return {
      key:
        config && config.getPropsWithKey === false
          ? undefined
          : JSON.stringify(data),
      draggable: 'true' as const,
      onDragStart: (e: React.DragEvent) => {
        if (config && config.onDragStart) {
          config.onDragStart(data, e);
        }
        e.dataTransfer.setData('custom', JSON.stringify(data));
      },
      onDragEnd: (e: React.DragEvent) => {
        if (config && config.onDragEnd) {
          config.onDragEnd(data, e);
        }
      },
    };
  };
}
