---
title: useVirtualList
nav:
  title: Hooks
  path: /hooks
group:
  title: UI
  path: /ui
---

# useVirtualList

提供虚拟化列表能力的 Hook，用于解决展示海量数据渲染时首屏渲染缓慢和滚动卡顿问题。

# 实现原理

所有的虚拟渲染都类型，基本上就是同理；有个可视容器，一般固定的高度，有个实际内容容器，高度为总数据高度；然后根据可视容器高度以及用户设置的条数去截取显示的数据，监听滚动事件，滚动的时候重新截取显示数据；

## 代码演示

### 基础用法

<code src="./demo/demo1.tsx" />

### 动态元素高度

<code src="./demo/demo2.tsx" />

## API

```typescript
const result:Result = useVirtualList(originalList: any[], options: Options);
```

### Params

| 参数         | 说明                   | 类型  | 默认值 |
| ------------ | ---------------------- | ----- | ------ |
| originalList | 包含大量数据的列表     | `T[]` | `[]`   |
| options      | 可选配置项，见 Options | -     | -      |

### Options

| 参数       | 说明                                                   | 类型                                      | 默认值 |
| ---------- | ------------------------------------------------------ | ----------------------------------------- | ------ |
| itemHeight | 行高度，静态高度可以直接写入像素值，动态高度可传入函数 | `number` \| `((index: number) => number)` | -      |
| overscan   | 视区上、下额外展示的 dom 节点数量                      | `number`                                  | `5`    |

### Result

| 参数           | 说明                      | 类型                         |
| -------------- | ------------------------- | ---------------------------- |
| list           | 当前需要展示的列表内容    | `{data: T, index: number}[]` |
| containerProps | 滚动容器的 props          | `object`                     |
| wrapperProps   | children 外层包裹器 props | `object`                     |
| scrollTo       | 快速滚动到指定 index      | `(index: number) => void`    |
