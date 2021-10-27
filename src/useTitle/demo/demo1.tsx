/**
 * title: 基础用法
 * desc: 设置页面标题
 */

import React from 'react';
import useTitle from '..';

export default () => {
  useTitle('Page Title');

  return (
    <div>
      <p>sets title of the page.</p>
    </div>
  );
};
