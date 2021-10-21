import React from 'react';
import useBoolean from '../useBoolean';
import useEventListener from '../useEventListener';
import { BasicTarget } from '../utils/dom';

export interface Options {
  onEnter?: () => void;
  onLeave?: () => void;
}

export default function useHover(
  target: BasicTarget,
  options?: Options,
): boolean {
  const { onEnter, onLeave } = options || {};

  const [state, { setTrue, setFalse }] = useBoolean(false);

  useEventListener(
    'mouseenter',
    () => {
      onEnter?.();
      setTrue();
    },
    { target },
  );

  useEventListener(
    'mouseleave',
    () => {
      onLeave?.();
      setFalse();
    },
    { target },
  );

  return state;
}
