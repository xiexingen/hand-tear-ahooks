import React from 'react';
import { Button, Input } from 'antd';
import useReactive from '..';

export default function () {
  const state = useReactive({
    count: 1,
    inputVal: '',
    obj: {
      value: '',
    },
  });
  return (
    <div>
      <p>state.count: {state.count}</p>
      <Button onClick={() => state.count++}>state.count++</Button>
      <Button onClick={() => state.count--}>state.count--</Button>
      <p style={{ marginTop: 20 }}>state.inputVal:{state.inputVal}</p>
      <Input onChange={(e) => (state.inputVal = e.target.value)} />
      <p style={{ marginTop: 20 }}>state.obj.val:{state.obj.value}</p>
      <Input onChange={(e) => (state.obj.value = e.target.value)} />
    </div>
  );
}
