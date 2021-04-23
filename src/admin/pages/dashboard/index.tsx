import React, { useEffect, useState } from 'react'
import { Row, Col } from 'antd'
import api from '@/api'
import Group from './components/group'
import Card from './components/card'
import Browser from './components/browser'
import Device from './components/device'
import Engine from './components/engine'
import Os from './components/os'
import City from './components/city'
import './style.less'
const Dashboard = () => {
  const [list, setList] = useState<AnyObject[]>([])
  const [info, setInfo] = useState<AnyObject>()
  useEffect(() => {
    async function load() {
      const { data } = await api.common.getsystemParams()
      setInfo(data)
      setList([
        { name: '浏览器', component: Browser, data: data.browser },
        { name: '设备', component: Device, data: data.device },
        { name: '系统', component: Os, data: data.os },
        { name: '内核', component: Engine, data: data.engine }
      ])
    }
    load()
  }, [])
  return (
    <div className="dashboard">
      <Group />
      <Row
        justify="center"
        gutter={[
          { xs: 24, sm: 16, lg: 16, xl: 24 },
          { xs: 24, sm: 16, lg: 16, xl: 24 }
        ]}
      >
        {list.map((item) => (
          <Col key={item.name} xs={24} xl={12}>
            <Card className="df-c">
              <item.component data={item.data} name={item.name} />
            </Card>
          </Col>
        ))}
      </Row>
      {info && (
        <Card className="dashboard-row">
          <Row justify="center" gutter={[24, 24]}>
            <Col xs={24} xl={16}>
              <City name="城市" data={info.location.city} />
            </Col>
          </Row>
        </Card>
      )}
    </div>
  )
}

export default Dashboard
