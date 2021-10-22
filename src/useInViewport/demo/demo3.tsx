/**
 * title: 延迟渲染
 * desc: 当组件出现在可视区域的时候再渲染组件
 */

import React, { useState, useRef, useEffect } from 'react';
import { Skeleton, Card } from 'antd';
import useInViewport from '..';

const LazyComponent = ({ children }) => {
  const ref = useRef(null);
  const [loading, setLoading] = useState(true);
  const inViewPort = useInViewport(ref);
  useEffect(() => {
    if (loading && inViewPort) {
      setLoading(false);
    }
  }, [inViewPort]);
  return (
    <span ref={ref}>
      <Skeleton loading={loading}>{loading ? null : children}</Skeleton>
    </span>
  );
};

const UserInfo = () => {
  const [cover, setCover] = useState<string>();
  useEffect(() => {
    setTimeout(() => {
      setCover('https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png');
    }, 1000);
  }, []);
  return (
    <Card
      hoverable
      style={{ width: 240 }}
      cover={<img alt="example" src={cover} />}
    >
      <Card.Meta title="Europe Street beat" description="www.instagram.com" />
    </Card>
  );
};

export default () => {
  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <hr />
      <LazyComponent>
        <UserInfo />
      </LazyComponent>
    </div>
  );
};
