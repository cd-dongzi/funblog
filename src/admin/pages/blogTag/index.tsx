import React, { useCallback, useEffect, useState } from 'react'
import { Button, Tag, Modal } from 'antd'
import { DragTable, Icon } from '@/components'
import { BlogTag } from '@root/src/models/blogTag'
import { PageContainer } from '@/components'
import { DelButton } from '@/appComponents'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import api from '@/api'
import Add from './components/add'
import Edit from './components/edit'
import './style.less'

const BlogTags = () => {
  const [loading, setLoading] = useState(false)
  const [visibleAdd, setVisibleAdd] = useState(false)
  const [visibleEdit, setVisibleEdit] = useState(false)
  const [current, setCurrent] = useState<BlogTag>()
  const [dataSource, setDataSource] = useState<BlogTag[]>([])
  const loadData = useCallback(async () => {
    setLoading(true)
    const res = await api.blogTag.getBlogTags()
    setLoading(false)
    setDataSource(res.data)
  }, [])
  // 拖拽排序
  const onSort = useCallback(
    (data: BlogTag[], oldDData) => {
      const arr = data.filter((item, index) => {
        const bol = item.seq !== oldDData[index].seq
        return bol
      })
      if (arr.length <= 0) return
      const nums = arr.map((item) => item.seq as number).sort((a, b) => b - a)
      setLoading(true)
      api.blogTag.sortBlogTags(
        arr.map((item, index) => ({
          _id: item._id,
          seq: nums[index]
        }))
      )
      setLoading(false)
      loadData()
    },
    [loadData]
  )
  // 编辑
  const onEdit = (item: BlogTag) => {
    setCurrent(item)
    setVisibleEdit(true)
  }
  // 删除
  const onDel = async (item: BlogTag) => {
    setLoading(true)
    await api.blogTag.deleteBlogTag(item._id)
    await loadData()
    setLoading(false)
  }
  // 加载数据
  useEffect(() => {
    loadData()
  }, [loadData])
  return (
    <PageContainer className="blog-tags-page" title="博客标签列表">
      <Button type="primary" style={{ marginBottom: '20px' }} onClick={() => setVisibleAdd(true)}>
        新增标签
      </Button>
      <DragTable
        isHandle
        loading={loading}
        columns={[
          { title: '标签名', dataIndex: 'name' },
          {
            title: 'Icon',
            dataIndex: 'icon',
            render: (iconName, item) => {
              return <Icon name={iconName} className="table-icon" color={item.color} />
            }
          },
          { title: '颜色', dataIndex: 'color', render: (color) => <Tag color={color}>{color}</Tag> },
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
                  <DelButton type="link" size="small" danger content={`确认删除：${item.name}`} onOk={() => onDel(item)}>
                    删除
                  </DelButton>
                </>
              )
            }
          }
        ]}
        dataSource={dataSource}
        rowKey="_id"
        onSort={onSort}
        pagination={false}
      />
      <Add visible={visibleAdd} onCancel={() => setVisibleAdd(false)} onSuccess={loadData} />
      <Edit visible={visibleEdit} id={current?._id} onCancel={() => setVisibleEdit(false)} onSuccess={loadData} />
    </PageContainer>
  )
}

export default BlogTags
