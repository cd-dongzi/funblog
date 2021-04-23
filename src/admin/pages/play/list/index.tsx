import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Button, Tag } from 'antd'
import { ALink, ITable, PageContainer } from '@/components'
import { DelButton } from '@/appComponents'
import { useHistory } from 'react-router'
import { Play } from '@root/src/models/play'
import { BlogTag } from '@root/src/models/blogTag'
import { formatTime } from '@/utils/date'
import api from '@/api'

const PlayList = () => {
  const query = useRef({
    page: 1
  })
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<{ total: number; dataSource: Play[] }>({
    total: 0,
    dataSource: []
  })
  const history = useHistory()
  // 加载
  const loadData = useCallback(async () => {
    setLoading(true)
    const { data } = await api.play.getPlays(query.current)
    setData({
      total: data.total,
      dataSource: data.list
    })
    setLoading(false)
  }, [])
  // 新增
  const onAdd = () => {
    history.push('/play/add')
  }
  // 编辑
  const onEdit = (item: Play) => {
    history.push('/play/edit?id=' + item._id)
  }
  // 删除
  const onDel = async (item: Play) => {
    setLoading(true)
    api.play.deletePlay(item._id)
    await loadData()
    setLoading(false)
  }
  // 页码切换
  const onPageChange = (page: number) => {
    query.current.page = page
    loadData()
  }
  useEffect(() => {
    loadData()
  }, [loadData])
  return (
    <PageContainer className="play-list-page" title="实例列表">
      <Button type="primary" style={{ marginBottom: '20px' }} onClick={onAdd}>
        新增实例
      </Button>
      <ITable
        columns={[
          {
            title: '标题',
            dataIndex: 'title'
          },
          {
            title: '标签',
            dataIndex: 'tags',
            render: (val: BlogTag[]) => {
              return (
                <>
                  {val.map((v) => (
                    <Tag color={v.color} key={v.name}>
                      {v.name}
                    </Tag>
                  ))}
                </>
              )
            }
          },
          {
            title: '文件地址',
            dataIndex: 'url',
            render: (url: string) => (
              <ALink href={url} target="_blank">
                {url}
              </ALink>
            ),
            width: 100
          },
          {
            title: '发布时间',
            dataIndex: 'createTime',
            render: (text: string) => formatTime(text),
            width: 200
          },
          {
            title: '操作',
            width: '140px',
            key: 'action',
            fixed: 'right',
            render: (item) => {
              return (
                <>
                  <Button type="link" size="small" onClick={() => onEdit(item)}>
                    编辑
                  </Button>
                  <DelButton type="link" size="small" danger content={`确认删除：${item.title}`} onOk={() => onDel(item)}>
                    删除
                  </DelButton>
                </>
              )
            }
          }
        ]}
        hasIndex
        loading={loading}
        rowKey="_id"
        dataSource={data.dataSource}
        bordered
        scroll={{ x: true }}
        pagination={{
          showTotal: (total) => `共 ${total} 条`,
          total: data.total,
          current: query.current.page,
          onChange: onPageChange
        }}
      />
    </PageContainer>
  )
}

export default PlayList
