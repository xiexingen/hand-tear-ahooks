import React, { useEffect, useRef, useState } from 'react';
import usePersisFn from '../usePersisFn';
import useUnmount from '../useUnmount';

export enum ReadyState {
  Connecting = 0,
  Open = 1,
  Closing = 2,
  Closed = 3,
}

export interface Options {
  reconnectLimit?: number;
  reconnectInterval?: number;
  manual?: boolean;
  onOpen?: (event: WebSocketEventMap['open']) => void;
  onClose?: (event: WebSocketEventMap['close']) => void;
  onMessage?: (message: WebSocketEventMap['message']) => void;
  onError?: (event: WebSocketEventMap['error']) => void;
}

export interface Result {
  latestMessage?: WebSocketEventMap['message'];
  sendMessage?: WebSocket['send'];
  disconnect?: () => void;
  connect?: () => void;
  readyState: ReadyState;
  websocketIns?: WebSocket;
}

export default function useWebSocket(
  socketUrl: string,
  options: Options = {},
): Result {
  const {
    reconnectLimit = 3,
    reconnectInterval = 3 * 1000,
    manual = false,
    onOpen,
    onClose,
    onMessage,
    onError,
  } = options;
  const reconnectTimesRef = useRef(0);
  const reconnectTimerRef = useRef<NodeJS.Timeout>();
  const websocketRef = useRef<WebSocket>();

  const [latestMessage, setLatestMessage] =
    useState<WebSocketEventMap['message']>();
  const [readyState, setReadyState] = useState<ReadyState>(ReadyState.Closed);

  /**
   * 重连
   */
  const reconnect = usePersisFn(() => {
    if (
      reconnectTimesRef.current < reconnectLimit &&
      websocketRef.current?.readyState !== ReadyState.Open
    ) {
      reconnectTimerRef.current && clearTimeout(reconnectTimerRef.current);
      reconnectTimerRef.current = setTimeout(() => {
        connectWs();
        reconnectTimesRef.current++;
      }, reconnectInterval);
    }
  });

  const connectWs = usePersisFn(() => {
    reconnectTimerRef.current && clearTimeout(reconnectTimerRef.current);

    if (websocketRef.current) {
      websocketRef.current.close();
    }

    try {
      websocketRef.current = new WebSocket(socketUrl);
      websocketRef.current.onerror = (event) => {
        reconnect();
        onError && onError(event);
        setReadyState(websocketRef.current?.readyState || ReadyState.Closed);
      };

      websocketRef.current.onopen = (event) => {
        onOpen && onOpen(event);
        reconnectTimesRef.current = 0;
        setReadyState(websocketRef.current?.readyState || ReadyState.Closed);
      };

      websocketRef.current.onmessage = (
        message: WebSocketEventMap['message'],
      ) => {
        onMessage && onMessage(message);
        setLatestMessage(message);
      };
      websocketRef.current.onclose = (event) => {
        reconnect();
        onClose && onClose(event);
        setReadyState(websocketRef.current?.readyState || ReadyState.Closed);
      };
    } catch (error) {
      throw error;
    }
  });

  /**
   * 发送消息
   * @param message
   */
  const sendMessage: WebSocket['send'] = usePersisFn((message) => {
    if (readyState === ReadyState.Open) {
      websocketRef.current?.send(message);
    } else {
      throw new Error('WebSocket disconnected');
    }
  });

  /**
   * 手动连接
   */
  const connect = usePersisFn(() => {
    reconnectTimesRef.current = 0;
    connectWs();
  });

  /**
   * 断开连接
   */
  const disconnect = usePersisFn(() => {
    reconnectTimerRef.current && clearTimeout(reconnectTimerRef.current);
    reconnectTimesRef.current = reconnectLimit;
    websocketRef.current?.close();
  });

  useEffect(() => {
    // 初始连接
    if (!manual) {
      connect();
    }
  }, [socketUrl, manual]);

  useUnmount(() => {
    disconnect();
  });

  return {
    latestMessage,
    sendMessage,
    connect,
    disconnect,
    readyState,
    websocketIns: websocketRef.current,
  };
}
