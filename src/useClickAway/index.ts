import React, { useEffect, useRef } from 'react';
import { BasicTarget, getTargetElement } from '../utils/dom';

// 鼠标点击事件，click不会监听右键
const defaultEvent = 'click';

type EventType = MouseEvent | TouchEvent;

export default function useClickAway(
  onclickAway: (event: EventType) => void,
  target: BasicTarget | BasicTarget[],
  eventName: string = defaultEvent,
) {
  const onClickAwayRef = useRef(onclickAway);
  onClickAwayRef.current = onclickAway;

  useEffect(() => {
    const handler = (event: any) => {
      const targets = Array.isArray(target) ? target : [target];
      if (
        targets.some((targetItem) => {
          const targetElement = getTargetElement(targetItem) as HTMLElement;
          return !targetElement || targetElement?.contains(event.target);
        })
      ) {
        return;
      }
      onClickAwayRef.current(event);
    };

    document.addEventListener(eventName, handler);

    return () => {
      document.removeEventListener(eventName, handler);
    };
  }, [target, eventName]);
}
