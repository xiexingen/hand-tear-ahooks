---
title: useInterval
nav:
  title: Hooks
  path: /hooks
group:
  title: SideEffect
  path: /side-effect
---

# useInterval

一个可以处理 setInterval 的 Hook。

# 实现原理

通过 useEffect 配合 setInterval 实现，会在 useEffect 自动销毁

## 代码演示

### 基础用法

<code src="./demo/demo1.tsx" />

### 进阶使用

<code src="./demo/demo2.tsx" />

## API

```typescript
useInterval(fn: () => void, interval: number, options?: Options);
```

### Params

| 参数    | 说明                                                    | 类型                              |
| ------- | ------------------------------------------------------- | --------------------------------- |
| fn      | 要重复调用的函数                                        | `() => void`                      |
| delay   | 间隔时间，当取值为 `null` 或 `undefined` 时会停止计时器 | `number` \| `undefined` \| `null` |
| options | 配置计时器的行为，详见下面的 Options                    | `Options`                         |

### Options

| 参数      | 说明                                     | 类型      | 默认值  |
| --------- | ---------------------------------------- | --------- | ------- |
| immediate | 参数可以用来控制是否在首次渲染时立即执行 | `boolean` | `false` |
