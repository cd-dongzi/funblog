import { useEffect } from 'react';
import useHash from './useHash';
export default function useAutoScrollAnchor() {
  const hash = useHash();
  useEffect(() => {
    if (hash) {
      const target = document.getElementById(hash);
      if (target) {
        requestAnimationFrame(() => {
          target.scrollIntoView({ behavior: 'smooth' });
        });
      }
    }
  }, [hash]);
}
