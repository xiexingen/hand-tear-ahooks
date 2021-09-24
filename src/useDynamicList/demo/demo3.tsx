/**
 * title: 动态表格(可拖拽)
 * desc: 使用 antd table 构建动态表格
 */

import React, { useState } from 'react';
import { Form, Button, Input, Table } from 'antd';
import Icon, { DragOutlined } from '@ant-design/icons';
import ReactDragListView from 'react-drag-listview';
import useDynamicList from '..';

interface Item {
  name?: string;
  age?: string;
  memo?: string;
}

export default () => {
  const [form] = Form.useForm();
  const { list, remove, getKey, move, push, sortForm } = useDynamicList<Item>([
    { name: 'my bro', age: '23', memo: "he's my bro" },
    { name: 'my sis', age: '21', memo: "she's my sis" },
    {},
  ]);
  const [result, setResult] = useState('');

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, row: Item, index: number) => (
        <Form.Item>
          <DragOutlined style={{ cursor: 'move', marginRight: 8 }} />
          <Form.Item
            noStyle
            name={['params', getKey(index), 'name']}
            initialValue={text}
          >
            <Input style={{ width: 120, marginRight: 16 }} placeholder="name" />
          </Form.Item>
        </Form.Item>
      ),
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      render: (text: string, row: Item, index: number) => (
        <>
          <Form.Item
            name={['params', getKey(index), 'age']}
            initialValue={text}
          >
            <Input style={{ width: 120, marginRight: 16 }} placeholder="age" />
          </Form.Item>
        </>
      ),
    },
    {
      key: 'memo',
      title: 'Memo',
      dataIndex: 'memo',
      render: (text: string, row: Item, index: number) => (
        <Form.Item>
          <Form.Item
            noStyle
            name={['params', getKey(index), 'memo']}
            initialValue={text}
          >
            <Input
              style={{ width: 200, marginRight: 16 }}
              placeholder="please input the memo"
            />
          </Form.Item>
          <Button size="small" danger onClick={() => remove(index)}>
            Delete
          </Button>
        </Form.Item>
      ),
    },
  ];

  return (
    <>
      <ReactDragListView
        onDragEnd={(oldIndex: number, newIndex: number) =>
          move(oldIndex, newIndex)
        }
        handleSelector={'span.anticon.anticon-drag'}
      >
        <Form form={form}>
          <Table
            columns={columns}
            // @ts-ignore
            rowKey={(item, index) => getKey(index)}
            dataSource={list}
            pagination={false}
          />
        </Form>
      </ReactDragListView>
      <Button
        style={{ marginTop: 8 }}
        block
        type="dashed"
        onClick={() => push({ name: 'new row', age: '25' })}
      >
        + Add row
      </Button>
      <Button
        type="primary"
        style={{ marginTop: 16 }}
        onClick={() =>
          setResult(
            JSON.stringify(sortForm(form.getFieldsValue().params), null, 2),
          )
        }
      >
        Submit
      </Button>
      <div style={{ whiteSpace: 'pre' }}>{result && `content: ${result}`}</div>
    </>
  );
};
