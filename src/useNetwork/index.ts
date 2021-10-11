import React, { useState, useEffect } from 'react';

export interface NetworkState {
  /**
   * 上一次改动的时间(online-offline-online)
   */
  since?: Date;
  /**
   * 是否在线
   */
  online?: boolean;
  rtt?: number;
  /**
   * 网络类型
   */
  type?: string;
  downlink?: number;
  saveData?: boolean;
  downlinkMax?: number;
  effectiveType?: string;
}

function getConnection() {
  const nav = navigator as any;
  if (typeof nav !== 'object') return null;
  // 处理浏览器兼容
  return nav.connection || nav.mozConnection || nav.webkitConnection;
}

function getConnectionProperty(): NetworkState {
  const c = getConnection();
  if (!c) return {};
  return {
    rtt: c.rtt,
    type: c.type,
    saveData: c.saveData,
    downlink: c.downlink,
    downlinkMax: c.downlinkMax,
    effectiveType: c.effectiveType,
  };
}

export default function useNetwork(): NetworkState {
  const [state, setState] = useState(() => {
    return {
      since: undefined,
      online: navigator.onLine,
      ...getConnectionProperty(),
    };
  });

  useEffect(() => {
    const onOnline = () => {
      setState((prevState) => {
        return {
          ...prevState,
          online: true,
          since: new Date(),
        };
      });
    };
    const onOffline = () => {
      setState((prevState) => {
        return {
          ...prevState,
          online: false,
          since: new Date(),
        };
      });
    };
    const onConnectionChange = () => {
      setState((prevState) => {
        return {
          ...prevState,
          ...getConnectionProperty(),
        };
      });
    };

    window.addEventListener('online', onOnline);
    window.addEventListener('offline', onOffline);

    const connection = getConnection();
    connection?.addEventListener('change', onConnectionChange);

    return () => {
      window.removeEventListener('online', onOnline);
      window.removeEventListener('offline', onOffline);
      connection?.removeEventListener('change', onConnectionChange);
    };
  }, []);
  return state;
}
