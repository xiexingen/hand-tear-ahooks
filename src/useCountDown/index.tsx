import React, { useEffect, useMemo, useState } from 'react';
import dayjs from 'dayjs';
import usePersisFn from '../usePersisFn';

export type TDate = Date | number | string | undefined;

export type Options = {
  targetDate?: TDate;
  interval?: number;
  onEnd?: () => void;
};

export interface FormattedRes {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
}

// 计算指定日期在当前日期后多长毫秒
const calcLeft = (t?: TDate) => {
  if (!t) {
    return 0;
  }
  // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
  const left = dayjs(t).valueOf() - new Date().getTime();
  if (left < 0) {
    return 0;
  }
  return left;
};

// 获取指定毫秒转换成N天N时N分N秒N毫秒
const parseMs = (milliseconds: number): FormattedRes => {
  return {
    days: Math.floor(milliseconds / 86400000), // 1000*60*60*24
    hours: Math.floor(milliseconds / 3600000) % 24,
    minutes: Math.floor(milliseconds / 60000) % 60,
    seconds: Math.floor(milliseconds / 1000) % 60,
    milliseconds: Math.floor(milliseconds) % 1000,
  };
};

export default function useCountDown(
  options?: Options,
): [number, React.Dispatch<React.SetStateAction<TDate>>, FormattedRes] {
  const { targetDate, interval = 1000, onEnd } = options || {};
  // 存储目标时间
  const [target, setTargetDate] = useState<TDate>(targetDate);
  // 计算目标时间距离当前时间的毫秒数
  const [timeLeft, setTimeLeft] = useState(() => calcLeft(target));
  const onEndPersisFn = usePersisFn(() => {
    if (onEnd) {
      onEnd();
    }
  });
  useEffect(() => {
    if (!target) {
      // for stop
      setTimeLeft(0);
      return;
    }

    // 立即执行一次
    setTimeLeft(calcLeft(target));

    // 通过setInterval倒计时
    const timer = setInterval(() => {
      const targetleft = calcLeft(target);
      setTimeLeft(targetleft);
      if (targetleft === 0) {
        clearInterval(timer);
        onEndPersisFn();
      }
    }, interval);

    return () => {
      timer && clearInterval(timer);
    };
  }, [interval, target]);

  const formattedRes = useMemo(() => {
    return parseMs(timeLeft);
  }, [timeLeft]);

  return [timeLeft, setTargetDate, formattedRes];
}
