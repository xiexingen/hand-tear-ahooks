---
title: useReactive
nav:
  title: Hooks
  path: /hooks
group:
  title: Advanced
  path: /advanced
---

## useReactive

提供一种数据响应式的操作体验,定义数据状态不需要写`useState` , 直接修改属性即可刷新视图。

其实就是通过 Proxy 配合 Reflect 来拦截修改，然后修改一个空状态的 state 让组件重新渲染

## 代码演示

### 基本用法

<code src="./demo/demo1.tsx" />

### 数组操作

<code src="./demo/demo2.tsx"  />

### 计算属性

<code src="./demo/demo3.tsx"  />

### 注意

<code  src="./demo/demo4.tsx" desc="`useReactive`产生可操作的代理对象一直都是同一个引用，`useEffect` , `useMemo` ,`useCallback` ,`子组件属性传递` 等如果依赖的是这个代理对象是**不会**引起重新执行。"  />

### Issue

<code src="./demo/demo5.tsx" desc="直接用展开运算符覆盖的写法"  />

## API

```js
const state = useReactive(initialState: object);
```

## 参数

| 参数         | 说明           | 类型     | 默认值 |
| ------------ | -------------- | -------- | ------ |
| initialState | 当前的数据对象 | `object` | -      |
