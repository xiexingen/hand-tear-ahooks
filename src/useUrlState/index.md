---
title: useUrlState
nav:
  title: Hooks
  path: /hooks
  order: 1
group:
  title: State
  path: /state
  order: 1
---

# useUrlState

一个同步组件内部状态和 query 参数的 hook。

> 该 Hooks 基于 `react-router` 的 useLocation & useHistory 进行 query 管理，所以使用该 Hooks 之前，你需要保证
>
> 1\. 你项目正在使用 `react-router` 5.0 以上版本来管理路由
>
> 2\. 你项目安装了 `query-string`

## 代码演示

### 基础用法

<code src="./demo/demo1.tsx" hideActions='["CSB"]' />

### 多状态管理

<code src="./demo/demo2.tsx" hideActions='["CSB"]' />

## API

```typescript
const [state, setState] = useUrlState(initialState, options);
```

### 参数

| 参数         | 说明     | 类型         | 默认值 |
| ------------ | -------- | ------------ | ------ |
| initialState | 初始状态 | S \| () => S | -      |
| options      | url 配置 | Options      | -      |

### Options

| 参数         | 说明                          | 类型                | 默认值 |
| ------------ | ----------------------------- | ------------------- | ------ |
| navigateMode | 状态变更时切换 history 的方式 | 'push' \| 'replace' | 'push' |

### 结果

| 参数     | 说明                                    | 类型                                            |
| -------- | --------------------------------------- | ----------------------------------------------- |
| state    | url query 对象                          | object                                          |
| setState | 用法同 useState，但 state 需要是 object | (state: S) => void \| (() => ((state: S) => S)) |
