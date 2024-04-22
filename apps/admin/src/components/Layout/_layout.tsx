'use client';
import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { PageContainer, ProLayout } from '@ant-design/pro-components';
import { Icon } from '@funblog/components';
import { Breadcrumb, BreadcrumbProps, Dropdown } from 'antd';
import cls from 'classnames';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { logout } from '@/api';
import { PAGE_HEADER_EXTRA } from '@/constants';
import { useStore } from '@/context';
import { getResourceUrl } from '@/utils';
import { routes, Route } from './routes';
import styles from './style.module.css';

export interface LayoutProps {
  children: React.ReactNode;
}

const fullScreenPaths = ['/post/editor', '/page/editor'];
function formatRoute(route: Route): Record<string, any> {
  return {
    ...route,
    icon: route.icon ? <Icon name={route.icon} /> : undefined,
    routes: route.routes?.map(formatRoute),
  };
}

function Layout({ children }: LayoutProps) {
  const { userInfo } = useStore();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const _routes = useMemo(() => routes.map(formatRoute), []);
  const pathname = usePathname();
  const isFullScreen = fullScreenPaths.some((v) => v === pathname);
  return (
    <ProLayout
      collapsed={collapsed}
      onCollapse={() => {
        setCollapsed(!collapsed);
      }}
      location={{
        pathname,
      }}
      token={{
        bgLayout: '#f0f2f5',
        sider: {
          colorMenuBackground: '#fff',
        },
      }}
      logo="/favicon.png"
      title="FunBlog"
      siderWidth={208}
      avatarProps={{
        icon: <UserOutlined />,
        src: getResourceUrl(userInfo?.avatar),
        size: 'small',
        title: userInfo?.username,
        render(props, dom) {
          return (
            <Dropdown
              trigger={['click']}
              menu={{
                items: [
                  {
                    key: 'logout',
                    icon: <LogoutOutlined />,
                    label: '退出登录',
                    onClick: async () => {
                      await logout();
                      router.push('/login');
                    },
                  },
                ],
              }}
            >
              {dom}
            </Dropdown>
          );
        },
      }}
      route={{
        path: '/',
        routes: _routes,
      }}
      actionsRender={() => {
        return [<SettingOutlined key="SettingOutlined" onClick={() => router.push('/setting-profile')} />];
      }}
      menuItemRender={(item, dom) => {
        if (!item.path) return dom;
        return <Link href={item.path}>{dom}</Link>;
      }}
    >
      <PageContainer
        className={cls(styles.page, {
          [styles.full]: isFullScreen,
        })}
        header={{
          extra: <div id={PAGE_HEADER_EXTRA}></div>,
          breadcrumbRender: (params, dom) => {
            const list = (params.breadcrumb as BreadcrumbProps).items;
            if (!list?.length) return dom;
            return (
              <Breadcrumb
                items={list.map((item: Record<string, any>, index) => ({
                  title: index === list.length - 1 ? item.title : <Link href={item.linkPath}>{item.title}</Link>,
                }))}
              />
            );
          },
        }}
      >
        {children}
      </PageContainer>
    </ProLayout>
  );
}

export default Layout;
