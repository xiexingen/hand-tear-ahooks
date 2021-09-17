---
title: useLockFn
nav:
  title: Hooks
  path: /hooks
group:
  title: Advanced
  path: /advanced
---

# useLockFn

- 保存按钮，防止用户多次点击

用于给一个异步函数增加竞态锁，防止并发执行。
其实就是内部加了个状态记录方法是否已经执行完毕，如果未执行完毕再次调用会直接返回

## 代码演示

### 避免重复提交

<code src="./demo/demo1.tsx" />

## API

```typescript
function useLockFn<P extends any[] = any[], V extends any = any>(
  fn: (...args: P) => Promise<V>
): fn: (...args: P) => Promise<V | undefined>
```

### Result

| 参数 | 说明               | 类型                      |
| ---- | ------------------ | ------------------------- |
| fn   | 增加了竞态锁的函数 | `(...args: any[]) => any` |

### Params

| 参数 | 说明                 | 类型                      | 默认值 |
| ---- | -------------------- | ------------------------- | ------ |
| fn   | 需要增加竞态锁的函数 | `(...args: any[]) => any` | -      |
