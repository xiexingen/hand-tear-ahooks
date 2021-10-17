import React, { useState } from 'react';
import useEventListener from '../useEventListener';
import canUseDom from '../utils/canUseDom';

type VisiblityState = 'hidden' | 'visible' | 'prerender' | undefined;

const getVisibility = (): VisiblityState => {
  if (!canUseDom()) return 'visible';
  return document.visibilityState;
};

export default function useDocumentVisibility(): VisiblityState {
  const [documentVisibility, setDocumentVisibility] = useState(() =>
    getVisibility(),
  );
  useEventListener(
    'visibilitychange',
    () => {
      setDocumentVisibility(getVisibility());
    },
    {
      target: () => document,
    },
  );
  return documentVisibility;
}
