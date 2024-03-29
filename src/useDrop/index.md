---
title: useDrag & useDrop
nav:
  title: Hooks
  path: /hooks
group:
  title: UI
  path: /ui
  order: 9
---

# useDrop & useDrag

一对帮助你处理在拖拽中进行数据转移的 hooks

# 实现原理

useDrag 利用浏览器的特性设置 draggable 并监听 onDragStart、onDragEnd 事件，在 onDragStart 中为 dataTransfer 设置值
useDrop 利用浏览器的特性监听 onDragOver、onDragEnter、onDragLeave、onDrop、onPaste 来处理不同的拖拽，配合 useDrag 使用获取拖拽元素的值

> useDrop 可以单独使用来接收文件、文字和网址的拖拽。
>
> useDrag 允许一个 dom 节点被拖拽，需要配合 useDrop 使用。
>
> 向节点内触发粘贴时也会被视为拖拽的内容

## 代码演示

### 基础用法

<code src="./demo/demo1.tsx" />

## API

```typescript
const getDragProps = useDrag({ onDragStart, onDragEnd });

<div {...getDragProps(id)}>draggable</div>

const [ props, { isHovering } ] = useDrop({
  onText: (text: string, e: Event) => void,
  onFiles: (files: File[], e: Event) => void,
  onUri: (uri: string, e: Event) => void,
  onDom: (content: any, e: Event) => void
});
```

### useDrag Result

| 参数         | 说明                                                                                             | 类型                      |
| ------------ | ------------------------------------------------------------------------------------------------ | ------------------------- |
| getDragProps | 一个接收拖拽的值，并返回需要透传给被拖拽节点 props 的方法， 默认包含一个由 data 序列化得到的 key | `(content: any) => props` |

### useDrop Result

| 参数       | 说明                                    | 类型      |
| ---------- | --------------------------------------- | --------- |
| props      | 需要透传给接受拖拽区域 dom 节点的 props | -         |
| isHovering | 是否是拖拽中，且光标处于释放区域内      | `boolean` |

### useDrag Params

| 参数            | 说明                                                     | 类型                            | 默认值 |
| --------------- | -------------------------------------------------------- | ------------------------------- | ------ |
| onDragStart     | 开始拖拽的回调                                           | `(data: any, e: Event) => void` | -      |
| onDragEnd       | 结束拖拽的回调                                           | `(data: any, e: Event) => void` | -      |
| getPropsWithKey | 是否在 getProps 方法返回的对象中包含默认的 key，默认包含 | `boolean`                       | -      |

### useDrop Params

| 参数    | 说明                      | 类型                                | 默认值 |
| ------- | ------------------------- | ----------------------------------- | ------ |
| onText  | 拖拽文字的回调            | `(text: string, e: Event) => void`  | -      |
| onFiles | 拖拽文件的回调            | `(files: File[], e: Event) => void` | -      |
| onUri   | 拖拽链接的回调            | `(text: string, e: Event) => void`  | -      |
| onDom   | 拖拽自定义 dom 节点的回调 | `(content: any, e: Event) => void`  | -      |
