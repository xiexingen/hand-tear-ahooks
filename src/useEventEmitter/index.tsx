// import useCreation from '@/useCreation';
import { useRef, useEffect } from 'react';

type Subscription<T> = (val: T) => void;

export class EventEmitter<T> {
  // 存放所有的监听
  private subscripts = new Set<Subscription<T>>();

  /**
   * 广播事件，会通知到所有订阅的端
   * @param val 事件传递的值
   */
  emit(val: T) {
    for (const subscription of this.subscripts) {
      subscription(val);
    }
  }

  /**
   * 订阅某个事件
   * @param callback 监听到事件执行的回调
   */
  useSubscription(callback: Subscription<T>) {
    // 此处使用了闭包，采用ref形式保存最新的callback函数以保证订阅到事件的时候执行的是最新的回调函数
    const callbackRef = useRef<Subscription<T>>();
    callbackRef.current = callback;
    useEffect(() => {
      function subscription(val: T) {
        if (callbackRef.current) {
          callbackRef.current(val);
        }
      }

      this.subscripts.add(subscription);

      return () => {
        this.subscripts.delete(subscription);
        callbackRef.current = undefined;
      };
    }, []);
  }
}

export default function useEventEmitter<T = void>() {
  // 此处可以使用useCreation代替(useCreation不就是干这个事情的吗)
  // return useCreation(()=>new EventEmitter<T>(),[])
  const ref = useRef<EventEmitter<T>>();
  if (!ref.current) {
    ref.current = new EventEmitter();
  }
  return ref.current;
}
