import { useEffect, useState } from 'react';

import useResizeValue from '@/hooks/useResizeValue';

const pcScreenSize = 768;
/*  */
export default function usePc() {
  const [pc, setPc] = useState(true);
  const width = useResizeValue();
  useEffect(() => {
    setPc(width > pcScreenSize);
  }, [width]);
  return {
    pc,
  };
}
