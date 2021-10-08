/**
 * title: 可撤销恢复的 Todo List
 * desc: 可以实现撤销恢复等操作。
 */

import React, { useState } from 'react';
import { Input, Button, InputNumber, Space } from 'antd';
import useHistoryTravel from '..';

export default () => {
  const {
    value,
    setValue,
    backLength,
    forwardLength,
    back,
    forward,
    go,
    reset,
  } = useHistoryTravel(['do homework']);

  const [inputValue, setInputValue] = useState('');
  const [step, setStep] = useState(0);

  const onAdd = () => {
    // @ts-ignore
    setValue([...value, inputValue]);
    setInputValue('');
  };

  const onGo = () => {
    go(step);
    setStep(0);
  };

  const onReset = () => {
    reset();
    setStep(0);
    setInputValue('');
  };

  return (
    <div>
      <div
        style={{ border: '1px solid #ebedf1', padding: 16, marginBottom: 16 }}
      >
        <h3>TODO List</h3>
        <ul>
          {value?.map((it, index) => (
            <li key={index}>{it}</li>
          ))}
        </ul>
      </div>
      <Input.Group compact style={{ marginTop: 16, marginBottom: 16 }}>
        <Input
          style={{ width: '60%' }}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Please enter TODO name"
        />
        <Button onClick={onAdd}>Add TODO</Button>
        <Button
          disabled={backLength <= 0}
          onClick={back}
          style={{ marginRight: 8 }}
        >
          Undo
        </Button>
        <Button
          disabled={forwardLength <= 0}
          onClick={forward}
          style={{ marginRight: 8 }}
        >
          Redo
        </Button>
        <Button disabled={!backLength && !forwardLength} onClick={onReset}>
          Reset
        </Button>
      </Input.Group>
      <div>
        <Space>
          <InputNumber
            value={step}
            onChange={(e) => setStep(e)}
            max={forwardLength}
            min={backLength * -1}
          />
          <Button type="primary" onClick={onGo}>
            Go
          </Button>
        </Space>
      </div>
    </div>
  );
};
