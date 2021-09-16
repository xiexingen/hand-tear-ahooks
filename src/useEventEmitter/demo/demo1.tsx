import React, { useState, useRef, FC } from 'react';
import { Button, Input } from 'antd';
import useEventEmitter, { EventEmitter } from '../index';
import { BorderOuterOutlined } from '@ant-design/icons';

const MessageBox: FC<{ focus$: EventEmitter<void> }> = function (props) {
  return (
    <div style={{ paddingBottom: 24 }}>
      <p>You received a message</p>
      <Button onClick={() => props.focus$.emit()}>Reply</Button>
    </div>
  );
};

const InputBox: FC<{ focus$: EventEmitter<void> }> = function (props) {
  const inputRef = useRef<any>();
  const [count, setCount] = useState(0);
  props.focus$.useSubscription(() => {
    inputRef.current?.focus();
  });
  return (
    <Input
      autoComplete="false"
      ref={inputRef}
      placeholder="Enter Replay"
      style={{ width: '100%', padding: 4 }}
      addonAfter={
        <span
          style={{ cursor: 'pointer' }}
          onClick={() => setCount((pre) => pre + 1)}
        >
          <BorderOuterOutlined />
          click {count}
        </span>
      }
    />
  );
};

export default function () {
  const focus$ = useEventEmitter();
  return (
    <>
      <MessageBox focus$={focus$} />
      <InputBox focus$={focus$} />
    </>
  );
}
