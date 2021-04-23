import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Button, Switch } from 'antd'
import { DragTable, PageContainer, ALink } from '@/components'
import { DelButton } from '@/appComponents'
import { Github } from '@root/src/models/github'
import { formatTime } from '@/utils/date'
import api from '@/api'
import { useHistory } from 'react-router'
import Tpl from '../components/tpl'
import './style.less'

const GithubList = () => {
  const query = useRef({
    page: 1,
    isVisibleEQ: true
  })
  const [title, setTitle] = useState('')
  const [currentItem, setCurrentItem] = useState<Github>()
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false)
  const [data, setData] = useState<{ total: number; dataSource: Github[] }>({
    total: 0,
    dataSource: []
  })
  const history = useHistory()
  // 加载
  const loadData = useCallback(async () => {
    setLoading(true)
    const { data } = await api.github.getGithubs(query.current)
    setData({
      total: data.total,
      dataSource: data.list
    })
    setLoading(false)
  }, [])
  // 新增 Or 编辑
  const onAction = async (value: Github, type: string) => {
    if (type === 'add') {
      await api.github.addGithub(value)
    }
    if (type === 'edit') {
      await api.github.updateGithub((currentItem as Github)._id, value)
    }
    return
  }
  // 新增
  const onAdd = () => {
    setVisible(true)
    setTitle('新增项目')
  }
  // 编辑
  const onEdit = (item: Github) => {
    setVisible(true)
    setTitle('编辑项目')
    setCurrentItem(item)
  }
  // 删除
  const onDel = async (item: Github) => {
    setLoading(true)
    await api.github.deleteGithub(item._id)
    await loadData()
    setLoading(false)
  }
  // 取消
  const onCancel = () => {
    setVisible(false)
    setCurrentItem(undefined)
  }
  // 页码切换
  const onPageChange = (page: number) => {
    query.current.page = page
    loadData()
  }
  // 拖拽排序
  const onSort = useCallback(
    async (data: Github[], oldDData) => {
      const arr = data.filter((item, index) => {
        const bol = item.seq !== oldDData[index].seq
        return bol
      })
      if (arr.length <= 0) return
      const nums = arr.map((item) => item.seq as number).sort((a, b) => b - a)
      setLoading(true)
      await api.github.sortGithubs(
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

  // 是否可见
  const onVisible = (val: boolean) => {
    query.current.isVisibleEQ = val
    query.current.page = 1
    loadData()
  }
  useEffect(() => {
    loadData()
  }, [loadData])
  return (
    <PageContainer className="github-list-page" title="Github项目列表">
      <div>
        <Button className="filter-item" type="primary" style={{ marginBottom: '20px' }} onClick={onAdd}>
          新增项目
        </Button>
        <div className="filter-item">
          <span className="tip">是否可见</span>
          <Switch defaultChecked onChange={onVisible} />
        </div>
      </div>
      <DragTable
        columns={[
          {
            title: '名称',
            dataIndex: 'name',
            render: (text: string, item) => {
              return <ALink href={item.html_url}>{text}</ALink>
            }
          },
          {
            title: 'Start',
            dataIndex: 'stargazers_count'
          },
          {
            title: 'Fork',
            dataIndex: 'forks_count'
          },
          {
            title: 'Watch',
            dataIndex: 'subscribers_count'
          },
          {
            title: '发布时间',
            dataIndex: 'createTime',
            render: (text: string) => formatTime(text),
            width: 200
          },
          {
            title: '操作',
            width: '180px',
            key: 'action',
            fixed: 'right',
            render: (item) => {
              return (
                <>
                  <Button type="link" size="small" onClick={() => history.push(`/github/repo/${item._id}`)}>
                    详情
                  </Button>
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
        isHandle
        onSort={onSort}
        loading={loading}
        rowKey="_id"
        dataSource={data.dataSource}
        bordered
        pagination={{
          showTotal: (total) => `共 ${total} 条`,
          total: data.total,
          current: query.current.page,
          onChange: onPageChange
        }}
      />
      <Tpl visible={visible} title={title} onAction={onAction} onCancel={onCancel} onReload={loadData} currentItem={currentItem} />
    </PageContainer>
  )
}

export default GithubList
