// TODO 等useRequest完成
// /**
//  * title: 划词翻译
//  * desc: 配合 Popover 做划词翻译
//  */

//  import useTextSelection from '..';
//  import { Popover, Spin } from 'antd';
//  import useRequest from '../useRequest'
//  import React, { useEffect, useState } from 'react';

//  const getResult = (keyword: string): Promise<string> => {
//    const trimedText = keyword.trim() !== '';
//    if (!trimedText) {
//      return Promise.resolve('');
//    }
//    return new Promise((resolve) => {
//      setTimeout(() => resolve(`[translate result] ${keyword}`), 2000);
//    });
//  };

//  export default () => {
//    const { text = '', left = 0, top = 0, height = 0, width = 0 } = useTextSelection(() =>
//      document.querySelector('#translate-dom'),
//    );

//    const [visible, setVisible] = useState(false);

//    const { data, run, loading } = useRequest(getResult, {
//      manual: true,
//    });

//    useEffect(() => {
//      if (text.trim() === '') {
//        setVisible(false);
//        return;
//      }
//      setVisible(true);
//      run(text);
//    }, [text]);

//    return (
//      <div>
//        <p id="translate-dom" style={{ padding: 20, border: '1px solid' }}>
//          Translation of this paragraph;Translation of this paragraph;Translation of this paragraph;
//        </p>
//        <Popover
//          content={<Spin spinning={loading}>{loading ? 'Translating……' : data}</Spin>}
//          visible={visible}
//        >
//          <span
//            style={{
//              position: 'fixed',
//              top: `${top}px`,
//              left: `${left}px`,
//              height: `${height}px`,
//              width: `${width}px`,
//              pointerEvents: 'none',
//            }}
//          />
//        </Popover>
//      </div>
//    );
//  };
