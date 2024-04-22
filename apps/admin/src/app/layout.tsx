import '@/styles/index.css';
import cls from 'classnames';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import React from 'react';
import StyledComponentsRegistry from '@/lib/AntdRegistry';
import EscapeAntd from '@/lib/EscapeAntd';
import Motion from './Motion';
import Provider from './Provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Funblog',
  description: 'blog, next, nest, react',
  icons: {
    icon: '/favicon.ico',
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={cls(inter.className, 'min-w-[1000px] text-text')}>
        <Provider serverUrl={process.env.SERVER_URL}>
          <StyledComponentsRegistry>
            <EscapeAntd />
            <Motion>{children}</Motion>
          </StyledComponentsRegistry>
        </Provider>
      </body>
    </html>
  );
}
