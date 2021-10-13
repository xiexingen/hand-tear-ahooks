/**
 * title: 基础用法
 * desc: webSocket hooks 使用
 */

import React, { useRef, useMemo } from 'react';
import { Button } from 'antd';
import useWebSocket from '..';

enum ReadyState {
  Connecting = 0,
  Open = 1,
  Closing = 2,
  Closed = 3,
}

export default () => {
  const messageHistory = useRef<any[]>([]);

  const { readyState, sendMessage, latestMessage, disconnect, connect } =
    useWebSocket('wss://echo.websocket.org');

  messageHistory.current = useMemo(
    () => messageHistory.current.concat(latestMessage as any),
    [latestMessage],
  );

  return (
    <div>
      {/* send message */}
      <Button
        onClick={() => sendMessage && sendMessage(`${Date.now()}`)}
        disabled={readyState !== ReadyState.Open}
        style={{ marginRight: 8 }}
      >
        ✉️ send
      </Button>
      {/* disconnect */}
      <Button
        onClick={() => disconnect && disconnect()}
        disabled={readyState !== ReadyState.Open}
        style={{ marginRight: 8 }}
      >
        ❌ disconnect
      </Button>
      {/* connect */}
      <Button
        onClick={() => connect && connect()}
        disabled={readyState === ReadyState.Open}
      >
        📞 connect
      </Button>
      <div style={{ marginTop: 8 }}>readyState: {readyState}</div>
      <div style={{ marginTop: 8 }}>
        <p>received message: </p>
        {messageHistory.current.map((message, index) => (
          <p key={index}>{message?.data}</p>
        ))}
      </div>
    </div>
  );
};
