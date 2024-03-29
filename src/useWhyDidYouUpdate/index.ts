import React, { useEffect, useRef } from 'react';

export type IProps = {
  [key: string]: any;
};

export default function useWhyDidYouUpdate(
  componentName: string,
  props: IProps,
) {
  const prevProps = useRef<IProps>({});

  useEffect(() => {
    if (prevProps.current) {
      // 获取到所有的属性，包括新增的
      const allKeys = Object.keys({ ...prevProps.current, ...props });
      const changedProps: IProps = {};
      allKeys.forEach((key) => {
        if (prevProps.current![key] !== props[key]) {
          changedProps[key] = {
            from: prevProps.current![key],
            to: props[key],
          };
        }
      });

      if (Object.keys(changedProps).length) {
        console.log('[why-did-you-update]', componentName, changedProps);
      }
    }
    prevProps.current = props;
  });
}
