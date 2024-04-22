'use client';
import { LINK_LIST } from '@funblog/constants';
import { SiteLink } from '@funblog/types';
import cls from 'classnames';
import React from 'react';
import { createLink } from '@/api';
import PanelArrow from '@/components/PanelArrow';
import Box, { LinkRegisterData } from './box';
import styles from './style.module.css';

const LinkRegistered = ({ siteLink }: { siteLink?: SiteLink }) => {
  const [showApply, setShowApply] = React.useState(false);
  const onApply = () => {
    setShowApply(true);
  };

  const onSuccess = async (link: LinkRegisterData) => {
    await createLink(link);
  };
  return (
    <>
      <PanelArrow title="关于申请友情链接" className={styles.box}>
        <section className="mb-7.5">
          <h3>友链要求</h3>
          <ol className="ol">
            <li>1. 您的网站已稳定运行</li>
            <li>2. 全站部署HTTPS</li>
            <li>3. 原创、技术的个人博客优先</li>
            <li>4. 请在您的网站友情链接中增加本站信息，然后在下方点击申请友链</li>
            <li>
              <button className={cls('btn-clear', styles.apply)} onClick={onApply}>
                申请友链
              </button>
            </li>
          </ol>
        </section>
        <section>
          <h3>申请友链时请按照如下格式：</h3>
          <blockquote>
            <ol>
              <li>网站名称：{siteLink?.title}</li>
              <li>网站地址：{siteLink?.url}</li>
              <li>网站描述：{siteLink?.desc}</li>
              <li>网站分类：{LINK_LIST.find((v) => v.value === siteLink?.type)?.label}</li>
              <li>网站LOGO：{siteLink?.logo}</li>
            </ol>
          </blockquote>
          <p>以上也是我的站点概况</p>
        </section>
        <Box show={showApply} onClose={() => setShowApply(false)} onSuccess={onSuccess} />
      </PanelArrow>
    </>
  );
};
export default LinkRegistered;
