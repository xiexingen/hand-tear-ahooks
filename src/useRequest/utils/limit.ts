/**
 * 限制指定函数多长时间才可以允许执行一次
 * @param fn
 * @param timespan
 * @returns
 */
export default function limit(fn: any, timespan: number) {
  let pending = false;
  return (...args: any[]) => {
    if (pending) {
      return;
    }
    pending = true;
    fn(...args);
    setTimeout(() => {
      pending = false;
    }, timespan);
  };
}
