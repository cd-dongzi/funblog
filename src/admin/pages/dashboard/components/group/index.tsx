import React, { ReactNode, useEffect, useState } from 'react'
import { Row, Col } from 'antd'
import api from '@/api'
import { UserOutlined, UserAddOutlined, ReadOutlined, MessageOutlined } from '@ant-design/icons'
import Card from '../card'
import './style.less'

type Props = unknown
interface DashboardGroup {
  (props: Props): JSX.Element | null
}

type Icon = {
  title: string
  icon: any
  total: number
}
const DashboardGroup: DashboardGroup = () => {
  const [list, setList] = useState<Icon[]>([])
  useEffect(() => {
    async function load() {
      const [{ data: visitorsCount }, { data: blogsCount }, { data: usersCount }, { data: commentsCount }] = await Promise.all([
        api.common.getVisitorsCount(),
        api.common.getBlogsCount(),
        api.common.getUsersCount(),
        api.common.getCommentsCount()
      ])
      setList([
        { title: '游客人数', icon: UserOutlined, total: visitorsCount },
        { title: '登录人数', icon: UserAddOutlined, total: usersCount },
        { title: '文章数', icon: ReadOutlined, total: blogsCount },
        { title: '留言数', icon: MessageOutlined, total: commentsCount }
      ])
    }
    load()
  }, [])
  return (
    <div className="dashboard-group">
      <Row
        align="middle"
        justify="center"
        gutter={[
          { xs: 24, sm: 16, md: 16, xl: 24 },
          { xs: 12, sm: 16, md: 16, xl: 24 }
        ]}
      >
        {list.map((item, index) => (
          <Col xs={24} sm={12} lg={12} xl={6} key={item.title}>
            <Card className="dashboard-group-item df-sb">
              <item.icon className="dashboard-group-item__icon" />
              <div className="dashboard-group-item__meta">
                <div className="dashboard-group-item__title">{item.title}</div>
                <div className="dashboard-group-item__total">{item.total}</div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default DashboardGroup
