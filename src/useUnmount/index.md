---
title: useUnmount
nav:
  title: Hooks
  path: /hooks
group:
  title: LifeCycle
  path: /life-cycle
  order: 9
---

# useUnmount

只在组件 unmount 时执行的 hook。

# 实现原理

实际上就是在 useEffect 中 return 的匿名函数中调用用户自定义的方法

## 代码演示

### 基础用法

<code src="./demo/demo1.tsx" />

## API

```typescript
useUnmount(fn: () => void);
```

### 参数

| 参数 | 说明                 | 类型         | 默认值 |
| ---- | -------------------- | ------------ | ------ |
| fn   | unmount 时执行的函数 | `() => void` | -      |
