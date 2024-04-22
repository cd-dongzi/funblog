import { useResize } from '@funblog/hooks';
import { isDocument } from '@funblog/utils';
import { useCallback, useState } from 'react';

const getWidth = () => (isDocument() ? document.documentElement.clientWidth : 0);
export default function useResizeValue() {
  const [value, setValue] = useState(getWidth());
  const callback = useCallback(() => {
    setValue(getWidth());
  }, []);
  useResize({
    callback,
  });
  return value;
}
