'use client';
import { theme } from '@funblog/utils';
import localFont from 'next/font/local';
import { useEffect } from 'react';

const myFont = localFont({
  src: [
    {
      path: '../../public/fonts/Play-regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Play-bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  display: 'swap',
});

function Html({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const _theme = theme.getTheme();
    theme.setTheme(_theme);
  }, []);
  return (
    <html lang="en" className={myFont.className}>
      {children}
    </html>
  );
}

export default Html;
