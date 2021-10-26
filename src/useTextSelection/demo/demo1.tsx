/**
 * title: 基础用法
 * desc: 实时获取页面上选择的文本
 */

import React from 'react';
import useTextSelection from '..';

export default () => {
  const { text } = useTextSelection();
  return (
    <div>
      <p>You can select text all page.</p>
      <p>Result：{text}</p>
    </div>
  );
};
