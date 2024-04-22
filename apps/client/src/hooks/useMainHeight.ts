import { useState, useEffect } from 'react';
import { FOOTER_ID, HEADER_ID } from '@/constants';

export default function useMainHeight() {
  const [height, setHeight] = useState('calc(100vh - 56px - 144px)');
  useEffect(() => {
    const headerH = document.getElementById(HEADER_ID)?.offsetHeight || 0;
    const footerH = document.getElementById(FOOTER_ID)?.offsetHeight || 0;
    const height = window.innerHeight - headerH - footerH;
    setHeight(`${height}px`);
  }, []);
  return {
    height,
  };
}
