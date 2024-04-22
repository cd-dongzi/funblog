'use client';
import { Col, Row } from 'antd';
import { useEffect, useState } from 'react';
import { getVisitorLocation, getVisitorSystem } from '@/api';
import Card from './Card';
import Pie from './echarts/Pie';
import PieFull from './echarts/PieFull';

function StatisticList() {
  const [list, setList] = useState(
    [] as {
      name: string;
      data: Record<string, any>;
      scroll?: boolean;
    }[],
  );
  useEffect(() => {
    async function load() {
      const [systemData, locationData] = await Promise.all([getVisitorSystem(), getVisitorLocation()]);
      setList([
        { name: '浏览器', data: systemData.browser },
        { name: '设备', data: systemData.device },
        { name: '系统', data: systemData.os },
        { name: '内核', data: systemData.engine },
        { name: '城市', data: locationData.city, scroll: true },
        { name: '省份', data: locationData.province, scroll: true },
        { name: '国家', data: locationData.country, scroll: true },
      ]);
      console.log(111, systemData, locationData);
    }
    load();
  }, []);
  return (
    <Row
      justify="center"
      gutter={[
        { xs: 24, sm: 16, lg: 16, xl: 24 },
        { xs: 24, sm: 16, lg: 16, xl: 24 },
      ]}
    >
      {list.map((item) => {
        const gap = item.scroll
          ? {
              span: 24,
            }
          : {
              xs: 24,
              xl: 12,
            };
        return (
          <Col key={item.name} {...gap}>
            <Card className="flex items-center justify-center">
              {item.scroll ? <PieFull name={item.name} data={item.data} /> : <Pie name={item.name} data={item.data} />}
            </Card>
          </Col>
        );
      })}
    </Row>
  );
}

export default StatisticList;
