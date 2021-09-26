/**
 * title: 多状态管理
 * desc: useUrlState 可以同时管理多个状态
 */

import React from 'react';
import { Button } from 'antd';
import useUrlState from '..';

export default () => {
  const [state, setState] = useUrlState(
    { page: '1', pageSize: '10' },
    {
      navigateMode: 'push',
    },
  );

  return (
    <>
      <div>
        page: {state.page}
        <span style={{ paddingLeft: 8 }}>
          <Button
            onClick={() => {
              setState((s) => ({ page: Number(s.page) + 1 }));
            }}
          >
            +
          </Button>
          <Button
            onClick={() => {
              setState((s) => ({ page: Number(s.page) - 1 }));
            }}
            style={{ margin: '0 8px' }}
          >
            -
          </Button>
          <Button
            onClick={() => {
              setState({ page: 1 });
            }}
          >
            reset
          </Button>
        </span>
      </div>
      <br />
      <div>
        pageSize: {state.pageSize}
        <span style={{ paddingLeft: 8 }}>
          <Button
            onClick={() => {
              setState((s) => ({ pageSize: Number(s.pageSize) + 1 }));
            }}
          >
            +
          </Button>
          <Button
            onClick={() => {
              setState((s) => ({ pageSize: Number(s.pageSize) - 1 }));
            }}
            style={{ margin: '0 8px' }}
          >
            -
          </Button>
          <Button
            onClick={() => {
              setState({ pageSize: 10 });
            }}
          >
            reset
          </Button>
        </span>
      </div>
    </>
  );
};
