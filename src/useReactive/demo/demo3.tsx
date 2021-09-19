import React from 'react';
import { Button, Input, Form, Space } from 'antd';
import useReactive from '..';

export default () => {
  const state = useReactive({
    bug: '',
    bugs: ['feat', 'fix', 'chore'],
    addBug(bug: string) {
      this.bugs.push(bug);
    },
    get bugsCount() {
      return this.bugs.length;
    },
  });

  return (
    <div>
      <p>state.bugsCount: {state.bugsCount}</p>

      <Form
        onFinish={(e) => {
          state.addBug(state.bug);
          state.bug = '';
          e.preventDefault();
        }}
      >
        <Form.Item>
          <Space>
            <Form.Item noStyle required>
              <Input
                value={state.bug}
                onChange={(e) => (state.bug = e.target.value)}
              />
            </Form.Item>
          </Space>
          <Button.Group>
            <Button htmlType="submit" type="primary">
              +
            </Button>
            <Button onClick={() => state.bugs.pop()}>-</Button>
          </Button.Group>
        </Form.Item>
      </Form>
      <br />
      <ul>
        {state.bugs.map((bug) => (
          <li key={bug}>{bug}</li>
        ))}
      </ul>
    </div>
  );
};
