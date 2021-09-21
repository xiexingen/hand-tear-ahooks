/**
 * title: Default usage
 * desc: The drop area can accept files, uri, text or one of the boxes below.
 *
 * title.zh-CN: 基础用法
 * desc.zh-CN: 拖拽区域可以接受文件，链接，文字，和下方的 box 节点。
 */
import React, { useState } from 'react';
import useDrop from '..';
import useDrag from '../../useDrag';

export default function () {
  // 记录拖拽时候的数据
  const [draging, setDraging] = useState<string | null>(null);
  // 通过hooks获取拖拽节点需要的属性、监听的事件
  const getDragProps = useDrag({
    onDragStart: (data) => {
      setDraging(data);
    },
    onDragEnd: () => {
      setDraging(null);
    },
  });
  // 通过hooks获取拖拽接受元素需要的属性，监听的事件
  const [props, { isHovering }] = useDrop({
    onText: (text, e) => {
      console.log(e);
      alert(`text:'${text}' dropped`);
    },
    onFiles: (files, e) => {
      console.log(e, files);
      alert(`${files.length} file dropped`);
    },
    onUri: (uri, e) => {
      console.log(e);
      alert(`uri:${uri} dropped`);
    },
    onDom: (content: string, e) => {
      alert(`custom:${content} dropped`);
    },
  });

  return (
    <div>
      <div
        style={{
          border: '1px dashed #e8e8e8',
          padding: 16,
          textAlign: 'center',
        }}
        {...props}
      >
        {isHovering ? 'release here' : 'drop here'}
      </div>
      <div style={{ display: 'flex', marginTop: 8 }}>
        {Array.from({ length: 5 }, (v, i) => i).map((i) => (
          <div
            {...getDragProps(`box${i}`)}
            style={{
              border: '1px solid #e8e8e8',
              padding: 16,
              width: 80,
              textAlign: 'center',
              marginRight: 16,
            }}
          >
            box{i}
          </div>
        ))}
      </div>
      <div style={{ marginTop: 8 }}>
        {draging ? <>dragging{draging}</> : 'not dragging'}
      </div>
    </div>
  );
}
