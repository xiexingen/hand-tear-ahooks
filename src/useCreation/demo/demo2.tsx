import React, { useState, useRef } from 'react';
import { Button } from 'antd';
import useCreation from '../index';
import { User } from './assets';

// 通过修改依赖项来更新对象
export default () => {
  const [deps, setDeps] = useState<Array<number>>([]);
  const user2 = useCreation<User>(() => new User('useCreation'), deps);

  return (
    <>
      <p>useCreation-user-{user2.timespan}</p>
      <Button
        onClick={() => {
          setDeps((pres) => [...pres, Math.ceil(Math.random() * 10)]);
        }}
      >
        add deps
      </Button>
      {deps.join(',')}
    </>
  );
};
