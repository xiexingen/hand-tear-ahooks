/**
 * title: 使用 option 配置 cookie
 * desc: 可配置属性：默认值、有效时间、路径、域名、协议、跨域等，详见 Options
 */

import * as React from 'react';
import useCookieState from '..';

export default function App() {
  const [value, setValue] = useCookieState('useCookieStateOptions', {
    defaultValue: '0',
    path: '/',
    expires: (() => new Date(+new Date() + 1000 * 60))(),
  });

  return (
    <>
      <p>{value}</p>
      <button
        type="button"
        style={{ marginRight: '16px' }}
        onClick={() =>
          setValue((v) => String(Number(v) + 1), {
            expires: (() => new Date(+new Date() + 1000 * 60))(),
          })
        }
      >
        inc + (10s expires)
      </button>
      <button
        type="button"
        style={{ marginRight: '16px' }}
        onClick={() =>
          setValue((v) => String(Number(v) - 1), {
            expires: (() => new Date(+new Date() + 1000 * 60))(),
          })
        }
      >
        dec - (10s expires)
      </button>
      <button type="button" onClick={() => setValue('0')}>
        reset
      </button>
    </>
  );
}
