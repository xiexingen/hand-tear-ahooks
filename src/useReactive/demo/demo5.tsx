import React from 'react';
import { Button } from 'antd';
import useReactive from '..';
import usePersisFn from '../../usePersisFn';

export default () => {
  const result = useReactive({
    list: [{ name: '张三' }, { name: '刘德华' }],
  });

  // 浅拷贝覆盖原数组
  const shallowRecover = usePersisFn(() => {
    result.list = [...result.list];
  });

  // 深拷贝覆盖原数组
  const deepRecover = usePersisFn(() => {
    result.list = result.list.map((item) => ({
      ...item,
    }));
  });

  const changeName = usePersisFn(() => {
    result.list[0].name = `随机${Math.ceil(Math.random() * 1000)}`;
  });

  return (
    <div>
      <ul>
        {result.list.map((item) => {
          return <li>{item.name}</li>;
        })}
      </ul>
      <Button onClick={shallowRecover}>浅拷贝覆盖</Button>
      <Button onClick={deepRecover}>深度拷贝覆盖</Button>
      <Button onClick={changeName}>随机改值</Button>
    </div>
  );
};
