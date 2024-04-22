'use client';
import { UserOutlined, UserAddOutlined, ReadOutlined, MessageOutlined } from '@ant-design/icons';
import { Row, Col } from 'antd';
import React, { useEffect, useState } from 'react';
import { getCommentCount, getPostCount, getUserCount, getVisitorCount } from '@/api';
import Card from './Card';

type Icon = {
  title: string;
  icon: any;
  total: number;
};
const colors = ['#40c9c6', '#36a3f7', '#f4516c', '#837adc'];
const Indicators = () => {
  const [list, setList] = useState<Icon[]>([]);
  useEffect(() => {
    async function load() {
      const list = await Promise.all([getVisitorCount(), getUserCount(), getPostCount(), getCommentCount()]);
      setList([
        { title: '总访客数', icon: UserOutlined, total: list[0] },
        { title: '注册人数', icon: UserAddOutlined, total: list[1] },
        { title: '文章数', icon: ReadOutlined, total: list[2] },
        { title: '留言数', icon: MessageOutlined, total: list[3] },
      ]);
    }
    load();
  }, []);
  return (
    <Row
      className="my-5"
      align="middle"
      justify="center"
      gutter={[
        { xs: 24, sm: 16, md: 16, xl: 24 },
        { xs: 12, sm: 16, md: 16, xl: 24 },
      ]}
    >
      {list.map((item, i) => (
        <Col xs={24} sm={12} lg={12} xl={6} key={item.title}>
          <Card>
            <div className="h-15 flex w-full items-center justify-between px-[30px]">
              <item.icon
                className="text-[50px]"
                style={{
                  color: colors[i],
                }}
              />
              <div className="text-right">
                <div className="text-xl text-black/60">{item.title}</div>
                <div className="text-[30px] text-[#666]">{item.total}</div>
              </div>
            </div>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default Indicators;
