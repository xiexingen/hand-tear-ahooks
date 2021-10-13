---
title: useSetState
nav:
  title: Hooks
  path: /hooks
group:
  title: State
  path: /state
---

# useSetState

管理 object 类型 state 的 Hooks，用法与 class 组件的 `this.setState` 基本一致。

# 实现原理

在 useState 的基础上对值进行了合并

## 代码演示

### 基础用法

<code src="./demo/demo1.tsx" />

## API

```typescript
const [state, setState] = useSetState<T extends object>(
  initialState: T = {} as T
): [T, (patch: Partial<T> | ((prevState: T) => Partial<T>)) => void]
```
