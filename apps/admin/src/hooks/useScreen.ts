import { useState, useEffect } from 'react';
const screens = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1600,
};
const arr = ['xxl', 'xl', 'lg', 'md', 'sm', 'xs'];
type Size = 'small' | 'large';

const changeSize = (): Size => {
  if (window.innerWidth < screens.md) {
    return 'small';
  }
  return 'large';
};
type Key = keyof typeof screens;
export default function useScreen() {
  const [screen, setScreen] = useState<Key>('lg');
  const [width, setWidth] = useState(0);
  const [size, setSize] = useState(changeSize());

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const screenKey = arr.find((key) => width >= screens[key as Key]);
      setWidth(width);
      setSize(changeSize());
      if (screenKey) {
        setScreen(screenKey as Key);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return {
    width,
    size,
    screen,
    screens,
  };
}
