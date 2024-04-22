'use client';
import { PageMenuType } from '@funblog/types';
import { Tabs } from 'antd';
import cls from 'classnames';
import React, { useState } from 'react';
import PageSetting from '@/components/PageSetting';
import Content, { ContentRef } from './components/Content';
import Setting from './components/Setting';
import styles from './style.module.css';

const refs = [React.createRef<ContentRef>(), React.createRef<ContentRef>()];

function MenuPage() {
  const items = [
    {
      key: PageMenuType.NAVIGATION_NAV,
      label: '顶部菜单',
      children: <Content type={PageMenuType.NAVIGATION_NAV} />,
    },
    {
      key: PageMenuType.SUB_NAV,
      label: '分类菜单',
      children: <Content type={PageMenuType.SUB_NAV} />,
    },
  ].map((v, i) => ({ ...v, ref: refs[i], children: React.cloneElement(v.children, { ref: refs[i] }) }));
  const [key, setKey] = useState(items[0].key);
  return (
    <PageSetting
      className={cls('px-4', styles.menu)}
      drawerProps={{
        width: 250,
      }}
      renderSidebar={({ isLarge }) => (
        <div
          className={cls('w-[250px]', {
            'shrink-0 [border-left:1px_solid_theme(colors.gray7)]': isLarge,
          })}
        >
          <Setting
            onChange={(values) => {
              items.find((v) => v.key === key)?.ref.current?.onChange(values);
            }}
          />
        </div>
      )}
    >
      <Tabs
        defaultActiveKey={key}
        onChange={(key) => {
          setKey(key as PageMenuType);
        }}
        items={items}
      />
    </PageSetting>
  );
}

export default MenuPage;
