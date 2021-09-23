/**
 * title: 基础用法
 * desc: 频繁调用 run，但只会在所有点击完成 500ms 后执行一次相关函数
 */

import React, { useState } from 'react';
import useDebounceFn from '..';

export default () => {
  const [value, setValue] = useState(0);
  const { run } = useDebounceFn(
    () => {
      setValue(value + 1);
    },
    {
      wait: 500,
      // 官方的解释是 是否在上升沿触发副作用函数，反正我是比较难理解这句话(其实就是刚点击的时候是否立即执行一次)
      leading: false,
      // 官方的解释是 是否在下降沿触发副作用函数(其实就是是否最后一次有效) 跟leading一个控制是第一次，一个控制是最后一次
      trailing: true,
    },
  );

  return (
    <div>
      <p style={{ marginTop: 16 }}> Clicked count: {value} </p>
      <button type="button" onClick={run}>
        Click fast!
      </button>
    </div>
  );
};
