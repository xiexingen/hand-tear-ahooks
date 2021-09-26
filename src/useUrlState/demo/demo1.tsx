/**
 * title: 基础用法
 * desc: 将状态同步到 url query 中
 */

import React from 'react';
import { Button } from 'antd';
import useUrlState from '..';

export default () => {
  const [state, setState] = useUrlState({ count: '1' });

  return (
    <>
      <Button
        style={{ marginRight: 8 }}
        onClick={() => setState({ count: Number(state.count || 0) + 1 })}
      >
        add
      </Button>
      <Button onClick={() => setState({ count: undefined })}>clear</Button>
      <div>state: {JSON.stringify(state)}</div>
    </>
  );
};
