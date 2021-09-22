---
title: useSafeState
nav:
  title: Hooks
  path: /hooks
group:
  title: Advanced
  path: /advanced
---

# useSafeState

用法与 React.useState 完全一样，但是在组件卸载后异步回调内的 setState 不再执行，避免因组件卸载后更新状态而导致的内存泄漏

# 实现原理

其实就是配合 useUnmoutedRef 来判断是否已经卸载了，卸载了就不执行

## 代码演示

### 基础用法，与 React.useState 完全一样

<code src="./demo/demo1.tsx" desc="子组件渲染后会有5s的请求时间，这段时间内可以销毁组件试试" />

## API

```typescript
const [state, setState] = useSafeState(initialState);
```
