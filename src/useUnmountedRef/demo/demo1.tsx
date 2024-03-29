/**
 * title: 基础用法
 * desc: 在组件首次渲染时执行方法，返回一个含有current属性的ref对象，current表示当前组件是否已被卸载
 */
import React, { useState } from 'react';
import { Button } from 'antd';
import useUnmountedRef from '../';

const MyButton = ({ setVisible }: { setVisible: () => Promise<void> }) => {
  const unMountRef = useUnmountedRef();
  const [text, setText] = useState('I am mounted');

  const handleClick = async () => {
    await setVisible();
    // 如果当前组件尚未卸载，则设置state
    !unMountRef.current && setText('I am unmounted');
  };

  return <Button onClick={handleClick}>{text}</Button>;
};

export default () => {
  const [visible, setVisible] = useState(true);
  return (
    <div>
      click the button to unmount it
      <br />
      {visible ? (
        <MyButton
          setVisible={() => {
            return new Promise((resolve) => {
              setTimeout(() => {
                setVisible(false);
                resolve();
              }, 1000);
            });
          }}
        />
      ) : (
        'nothing'
      )}
    </div>
  );
};
