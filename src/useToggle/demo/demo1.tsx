/**
 * title: Default usage
 * desc: use boolean value as default，use it as same as useBoolean.
 *
 * title.zh-CN: 基础用法
 * desc.zh-CN: 默认为 boolean 切换，基础用法与 useBoolean 一致。
 */

import React from 'react';
import { Button } from 'antd';
import useToggle from '..';

export default () => {
  const [state, { toggle }] = useToggle();

  return (
    <div>
      <p>Effects：{`${state}`}</p>
      <p>
        <Button onClick={() => toggle()}>Toggle</Button>
        <Button onClick={() => toggle(false)} style={{ margin: '0 8px' }}>
          Toggle False
        </Button>
        <Button onClick={() => toggle(true)}>Toggle True</Button>
      </p>
    </div>
  );
};
