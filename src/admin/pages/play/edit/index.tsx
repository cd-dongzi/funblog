import React, { useEffect, useState } from 'react'
import { Blog } from '@root/src/models/blog'
import api from '@/api'
import { useHistory } from 'react-router'
import { useQuery } from '@/hooks'
import Tpl from '../components/tpl'
const BlogAdd = () => {
  const [initState, setInitState] = useState<Partial<Blog>>()
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const query = useQuery()
  useEffect(() => {
    if (!query.id) return
    async function load() {
      const { data } = await api.play.getPlay(query.id)
      data.fileType
      setInitState({
        ...data,
        [data.fileType]: data.fileType === 'folder' ? [data.url] : data.url
      })
    }
    load()
  }, [query.id])
  const onAction = async (value: FormData) => {
    if (query.id) {
      try {
        setLoading(true)
        await api.play.updatePlay(query.id, value)
        setLoading(false)
      } catch (e) {
        setLoading(false)
        throw e
      }
    }
  }
  return <Tpl title="编辑实例" confirmBtnText="保存" initState={initState} loading={loading} onAction={onAction} />
}

export default BlogAdd
