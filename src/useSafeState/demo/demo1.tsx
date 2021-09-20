/**
 * title: Default usage
 *
 * title.zh-CN: 基础用法
 */
import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import useSafeState from '..';

const Child = () => {
  const [value, setValue] = useSafeState<string>();
  useEffect(() => {
    setTimeout(() => {
      setValue('从服务端获取的数据');
    }, 5000);
  }, []);
  const text = value || '正在获取数据。。。';
  return <div>{text}</div>;
};

export default function () {
  const [visible, setVisible] = useState(true);
  return (
    <div>
      <Button onClick={() => setVisible(false)}>卸载</Button>
      {visible && <Child />}
    </div>
  );
}
