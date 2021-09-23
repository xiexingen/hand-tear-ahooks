---
title: useDebounceFn
nav:
  title: Hooks
  path: /hooks
group:
  title: SideEffect
  path: /side-effect
---

# useDebounceFn

用来处理防抖函数的 Hook。

# 实现原理

通过 lodash 的 debounce 方法包裹方法实现，其实也可以自己实现通过 setTimeout 下一次调用的时候判断是否有，有则先 clearTimeout 再 setTimeout；不过 lodash 的 debounce 提供了更健全的配置项，比如:cancel、flush、leading、trailing

## 代码演示

### 基础用法

<code src="./demo/demo1.tsx" />

## API

```javascript
const {
  run,
  cancel
} = useDebounceFn(
  fn: (...args: any[]) => any,
  options?: Options
);
```

### Params

| 参数    | 说明                               | 类型                      | 默认值 |
| ------- | ---------------------------------- | ------------------------- | ------ |
| fn      | 需要防抖执行的函数                 | `(...args: any[]) => any` | -      |
| options | 配置防抖的行为，详见下面的 Options | `Options`                 | `{}`   |

### Options

| 参数     | 说明                       | 类型      | 默认值  |
| -------- | -------------------------- | --------- | ------- |
| wait     | 超时时间，单位为毫秒       | `number`  | `1000`  |
| leading  | 是否在上升沿触发副作用函数 | `boolean` | `false` |
| trailing | 是否在下降沿触发副作用函数 | `boolean` | `true`  |

### Result

| 参数   | 说明                               | 类型                      |
| ------ | ---------------------------------- | ------------------------- |
| run    | 触发执行 fn，函数参数将会传递给 fn | `(...args: any[]) => any` |
| cancel | 取消当前防抖                       | `() => void`              |
| flush  | 当前防抖立即调用                   | `() => void`              |
