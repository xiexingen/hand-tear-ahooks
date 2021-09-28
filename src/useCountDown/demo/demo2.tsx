/**
 * title: 进阶使用
 * desc: 手动启用并控制计时器状态, 适用于验证码或类似场景; 时间结束后触发onEnd回调
 */

import React from 'react';
import { Button } from 'antd';
import useCountDown from '..';

export default () => {
  const onEnd = () => {
    alert('End of the time');
    console.log('onEnd of the time');
  };
  const [countdown, setTargetDate] = useCountDown({ onEnd: onEnd });

  return (
    <>
      <Button
        onClick={() => {
          setTargetDate(Date.now() + 5000);
        }}
        disabled={countdown !== 0}
      >
        {countdown === 0
          ? 'Start Interval'
          : `Reset After ${Math.round(countdown / 1000)}s`}
      </Button>
      <Button
        onClick={() => {
          setTargetDate(undefined);
        }}
        style={{ marginLeft: 8 }}
      >
        stop
      </Button>
    </>
  );
};
