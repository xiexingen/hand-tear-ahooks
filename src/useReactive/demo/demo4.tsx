import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import useReactive from '..';

export default () => {
  const state = useReactive({ count: 0 });
  const [stateCount, setStateCount] = useState(0);

  const state2 = useReactive({ count: 0 });
  const [stateCount2, setStateCount2] = useState(0);

  // 依赖的是对象，因为始终同一个引用，所以不会执行
  useEffect(() => {
    setStateCount(stateCount + 1);
  }, [state]);

  // 依赖的基础数据类型，所以只要改变就会重新执行
  useEffect(() => {
    setStateCount2(stateCount2 + 1);
  }, [state2.count]);

  return (
    <div>
      <Button style={{ marginTop: 20 }} onClick={() => (state.count += 1)}>
        stateCount + 1
      </Button>
      <p>stateCount:{stateCount}</p>

      <Button style={{ marginTop: 20 }} onClick={() => (state2.count += 1)}>
        stateCount2 + 1
      </Button>
      <p>stateCount2:{stateCount2}</p>
    </div>
  );
};
