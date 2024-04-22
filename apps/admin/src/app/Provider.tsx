'use client';
import { App, ConfigProvider } from 'antd';
import { HelperContextProps, HelperProvider } from '@/context';
function Provider({ children, ...props }: { children: React.ReactNode } & Partial<HelperContextProps>) {
  return (
    <HelperProvider {...props}>
      <ConfigProvider theme={{ cssVar: true }}>
        <App>{children}</App>
      </ConfigProvider>
    </HelperProvider>
  );
}

export default Provider;
