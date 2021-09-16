import React, { useState, useRef } from 'react';
import { Button } from 'antd';
import useCreation from '../index';
import { User } from './assets';

// 打开浏览器，可以看到通过useRef的虽然ref的值不会变，但是每次还是执行了构造函数
// 而通过useCreator的则不会
export default () => {
  const [count, setCount] = useState(0);
  const user1 = useRef<User>(new User('useRef'));
  const user2 = useCreation<User>(() => new User('useCreation'), []);

  const handleRender = () => {
    setCount((pre) => {
      return pre + 1;
    });
  };

  return (
    <>
      <p>useRef-user-{user1.current.timespan}</p>
      <p>useCreation-user-{user2.timespan}</p>
      <Button onClick={handleRender}>reRender-{count}</Button>
    </>
  );
};
