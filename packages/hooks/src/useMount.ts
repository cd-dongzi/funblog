import { useState, useEffect, useRef } from 'react';

export default function useMount(isRender?: boolean) {
  const ref = useRef({
    mounted: false,
  });
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    if (isRender) {
      setMounted(true);
    }
    ref.current.mounted = true;
  }, [isRender]);
  return isRender ? mounted : ref.current.mounted;
}
