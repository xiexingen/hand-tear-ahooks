/**
 * title: Nesting forms
 * desc: nesting dynamic forms in a set of form groups.
 *
 * title.zh-CN: 嵌套表单
 * desc.zh-CN: 动态表单内部嵌套动态表单
 */

import React, { useState } from 'react';
import { Form, Input, Button, FormInstance } from 'antd';
import useDynamicList from '../index';

interface ListItem {
  name: string;
  list: Array<{ name: string; value: number }>;
}

interface CardProps extends ListItem {
  index: number;
}

const Card = (props: CardProps) => {
  const { list, getKey, push } = useDynamicList(props.list || [1]);
  return (
    <div style={{ border: '1px solid #e8e8e8', padding: 16, marginBottom: 16 }}>
      <Form.Item
        label="Group Name"
        name={['params', props.index, 'groupName']}
        initialValue={props.name}
      >
        <Input placeholder="Please enter group name" />
      </Form.Item>
      <Form.Item label="frequency">
        {list.map((ele, index) => (
          <div style={{ marginBottom: 16 }} key={getKey(index)}>
            <Form.Item
              name={['params', props.index, 'ad', getKey(index), 'name']}
              initialValue={ele.name}
            >
              <Input
                placeholder="Please enter the advertisement name"
                addonBefore="name："
              />
            </Form.Item>
            <Form.Item
              name={['params', props.index, 'ad', getKey(index), 'frequency']}
              initialValue={ele.value}
            >
              <Input
                placeholder="Please entery the frequency"
                addonAfter="times/day"
              />
            </Form.Item>
          </div>
        ))}
      </Form.Item>
      <Button
        block
        onClick={() => {
          push({ name: '', value: 1 });
        }}
      >
        Add advertisement
      </Button>
    </div>
  );
};

export default () => {
  const [form] = Form.useForm();
  const [result, setResult] = useState('');
  const { list, push, getKey, sortForm } = useDynamicList<ListItem>([
    {
      name: 'Group 1',
      list: [
        { name: 'ad1', value: 1 },
        { name: 'ad2', value: 2 },
      ],
    },
  ]);
  return (
    <div style={{ width: 800, margin: 'auto', display: 'flex' }}>
      <Form form={form} style={{ width: 400, marginRight: 16 }}>
        {list.map((ele, index) => (
          <Card
            key={getKey(index)}
            list={ele.list}
            name={ele.name}
            index={getKey(index)}
          />
        ))}
        <Button
          style={{ marginTop: 16 }}
          block
          onClick={() => push({} as ListItem)}
        >
          Add Group
        </Button>
      </Form>
      <div>
        <Button
          onClick={() => {
            const res = form.getFieldsValue().params;
            const sortedResult = sortForm(res);
            setResult(JSON.stringify(sortedResult, null, 2));
          }}
        >
          Retrieve form data
        </Button>
        <div>
          <pre>{result}</pre>
        </div>
      </div>
    </div>
  );
};
