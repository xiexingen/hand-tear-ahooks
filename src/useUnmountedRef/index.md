---
title: useUnmountedRef
nav:
  title: Hooks
  path: /hooks
group:
  title: LifeCycle
  path: /life-cycle
---

# useUnmountedRef

获取当前组件是否已经卸载的 hook，用于避免因组件卸载后更新状态而导致的内存泄漏

其实就是通过 useRef 定义一个常量值，再配合 useEffect 在卸载时，给 ref 赋值为 true 来标识这个组件已经卸载了

## 代码演示

### 基础用法

<code src="./demo/demo1.tsx" />

## API

```typescript
const unmountRef: { current: boolean } = useUnmountedRef;
```

### Result

| 参数       | 说明                                          | 类型                   |
| ---------- | --------------------------------------------- | ---------------------- |
| unmountRef | 对象的 current 属性可返回当前组件是否已经卸载 | `{ current: boolean }` |
