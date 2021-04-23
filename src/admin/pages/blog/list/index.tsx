import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Button, Tag } from 'antd'
import { ITable, PageContainer } from '@/components'
import { DelButton } from '@/appComponents'
import { useHistory } from 'react-router'
import { Blog } from '@root/src/models/blog'
import { BlogTag } from '@root/src/models/blogTag'
import { formatTime } from '@/utils/date'
import api from '@/api'

const BlogList = () => {
  const query = useRef({
    page: 1
  })
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<{ total: number; dataSource: Blog[] }>({
    total: 0,
    dataSource: []
  })
  const history = useHistory()
  // 加载
  const loadData = useCallback(async () => {
    setLoading(true)
    const { data } = await api.blog.getBlogs(query.current)
    setData({
      total: data.total,
      dataSource: data.list
    })
    setLoading(false)
  }, [])
  // 新增
  const onAdd = () => {
    history.push('/blog/add')
  }
  // 编辑
  const onEdit = (item: Blog) => {
    history.push('/blog/edit?id=' + item._id)
  }
  // 删除
  const onDel = async (item: Blog) => {
    setLoading(true)
    api.blog.deleteBlog(item._id)
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
    <PageContainer className="blog-list-page" title="博客列表">
      <Button type="primary" style={{ marginBottom: '20px' }} onClick={onAdd}>
        新增博客
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
            title: '是否可见',
            dataIndex: 'isVisible',
            render: (isVisible: boolean) => (isVisible ? '是' : '否'),
            width: 100
          },
          {
            title: '更新时间',
            dataIndex: 'updateTime',
            render: (text: string) => formatTime(text),
            width: 200
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

export default BlogList
