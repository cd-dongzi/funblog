import React, { useEffect, useState } from 'react'
import { PageContainer } from '@/components'
import api from '@/api'
import { List, Card } from 'antd'
import { useParams } from 'react-router'

const GithubRepo = () => {
  const { id } = useParams<{ id: string }>()
  const [loading, setLoading] = useState(true)
  const [list, setList] = useState<AnyObject[]>([])
  useEffect(() => {
    async function load() {
      setLoading(true)
      const { data } = await api.github.getRepoInfoByGithub(id)
      setList([
        { label: '项目名称', value: data.name },
        { label: '项目Starts', value: data.stargazers_count },
        { label: '项目Forks', value: data.forks_count },
        { label: '项目Watchs', value: data.subscribers_count }
      ])
      setLoading(false)
    }
    load()
  }, [id])
  return (
    <PageContainer className="github-repo-page" title="Github项目详情" hasLoading loading={loading}>
      <List
        grid={{ gutter: 16, xl: 4, xs: 2 }}
        dataSource={list}
        renderItem={(item) => (
          <List.Item>
            <Card title={item.label}>{item.value}</Card>
          </List.Item>
        )}
      />
    </PageContainer>
  )
}

export default GithubRepo
