'use client';
import { GlobalProvider, GlobalContextProps } from '@/context';

function GlobalData({ children, ...props }: { children: React.ReactNode } & Partial<GlobalContextProps>) {
  return <GlobalProvider {...props}>{children}</GlobalProvider>;
}

export default GlobalData;
