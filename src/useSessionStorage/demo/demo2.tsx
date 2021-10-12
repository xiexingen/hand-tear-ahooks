/**
 * title: 存储对象
 * desc: useSessionStorageState 会自动处理序列化和反序列化的操作。
 */

import React from 'react';
import { Button } from 'antd';
import useSessionStorageState from '..';

const defaultArray = ['a', 'e', 'i', 'o', 'u'];

export default function () {
  const [value, setValue] = useSessionStorageState('cascader', defaultArray);

  return (
    <>
      <p>{value.join('-')}</p>
      <Button
        style={{ marginRight: 8 }}
        onClick={() =>
          setValue([...value, Math.random().toString(36).slice(-1)])
        }
      >
        push random
      </Button>
      <Button onClick={() => setValue(defaultArray)}>reset</Button>
    </>
  );
}
