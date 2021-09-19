import React from 'react';
import { Button, Input } from 'antd';
import useReactive from '..';

export default () => {
  const state = useReactive<{ arr: Array<number> }>({
    arr: [],
  });

  return (
    <div>
      <p>
        state.arr: <span role="test-array">{JSON.stringify(state.arr)}</span>
      </p>
      <Button
        style={{ marginRight: '10px' }}
        onClick={() => state.arr.push(Math.floor(Math.random() * 100))}
        role="pushbtn"
      >
        push
      </Button>
      <Button
        style={{ marginRight: '10px' }}
        onClick={() => state.arr.pop()}
        role="popbtn"
      >
        pop
      </Button>
      <Button
        style={{ marginRight: '10px' }}
        onClick={() => state.arr.shift()}
        role="shiftbtn"
      >
        shift
      </Button>
      <Button
        style={{ marginRight: '10px' }}
        onClick={() => state.arr.splice(0, 1)}
        role="shiftbtn"
      >
        splice(0,1)
      </Button>
      <Button
        style={{ marginRight: '10px' }}
        onClick={() => (state.arr = [1, 2])}
        role="shiftbtn"
      >
        replace[1,2]
      </Button>
      <Button
        style={{ marginRight: '10px' }}
        onClick={() => (state.arr = [...state.arr])}
        role="shiftbtn"
      >
        recover by clone
      </Button>
      <Button
        style={{ marginRight: '10px' }}
        role="unshiftbtn"
        onClick={() => state.arr.unshift(Math.floor(Math.random() * 100))}
      >
        unshift
      </Button>
      <Button
        style={{ marginRight: '10px' }}
        role="reverse"
        onClick={() => state.arr.reverse()}
      >
        reverse
      </Button>
      <Button
        style={{ marginRight: '10px' }}
        role="sort"
        onClick={() => state.arr.sort()}
      >
        sort
      </Button>
    </div>
  );
};
