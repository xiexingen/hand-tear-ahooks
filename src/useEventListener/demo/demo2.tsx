/**
 * title: 监听 keydown 事件
 * desc: 按下键盘查看效果。
 */

import React, { useState } from 'react';
import useEventListener from '..';

export default () => {
  const [value, setValue] = useState('');

  const keyDownHandler = (ev: KeyboardEvent) => {
    setValue(ev.code);
  };
  useEventListener('keydown', keyDownHandler);

  return <p>Your press key is : {value}</p>;
};
