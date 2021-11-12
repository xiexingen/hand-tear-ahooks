/**
 * title: 基础用法
 * desc: 查看每次 effect 执行时发生变化的依赖项
 */

import { Button, Checkbox } from 'antd';
import React, { useLayoutEffect, useState } from 'react';
import useTrackedEffect from '..';

export default () => {
  const [dep1, setDep1] = useState(0);
  const [dep2, setDep2] = useState(0);
  const [dep3, setDep3] = useState(0);
  const [depActiveList, setDepActiveList] = useState([false, false, false]);
  const [text, setText] = useState('Hi there...');

  // 将指定下标的值反向
  const toggleDep = (idx) => {
    const newList = [...depActiveList];
    newList[idx] = !newList[idx];
    setDepActiveList(newList);
  };

  const mutateDep = () => {
    setText('');
    depActiveList[0] && setDep1((c) => c + 1);
    depActiveList[1] && setDep2((c) => c + 1);
    depActiveList[2] && setDep3((c) => c + 1);
  };

  useTrackedEffect(
    (changes) => {
      setText(`Index of changed dependencies:${changes}`);
      return () => {
        // do something
      };
    },
    [dep1, dep2, dep3],
  );

  return (
    <div>
      <p>
        <Checkbox checked={depActiveList[0]} onChange={() => toggleDep(0)}>
          Dependency 0
        </Checkbox>
      </p>
      <p>
        <Checkbox checked={depActiveList[1]} onChange={() => toggleDep(1)}>
          Dependency 1
        </Checkbox>
      </p>
      <p>
        <Checkbox checked={depActiveList[2]} onChange={() => toggleDep(2)}>
          Dependency 2
        </Checkbox>
      </p>
      <p>
        <Button onClick={mutateDep}>Increase count</Button>
      </p>
      <p>{text}</p>
    </div>
  );
};
