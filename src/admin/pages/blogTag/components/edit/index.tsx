import React, { useEffect, useState } from 'react'
import api from '@/api'
import { BlogTag } from '@root/src/models/blogTag'
import Tpl, { TplProps } from '../tpl'

type Props = Omit<TplProps, 'title' | 'onAction' | 'loading'> & {
  id?: string
}
interface BlogTagsEEdit {
  (props: Props): JSX.Element | null
}

const BlogTagsEEdit: BlogTagsEEdit = ({ visible, id, ...props }) => {
  const [initState, setInitState] = useState<Omit<BlogTag, '_id'>>()
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    if (!visible || !id) {
      return
    }
    async function load() {
      try {
        setLoading(true)
        const { data } = await api.blogTag.getBlogTag(id as string)
        setInitState({
          color: data.color,
          icon: data.icon,
          name: data.name
        })
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [visible, id])
  const onAction = async (value: any) => {
    if (id) {
      setLoading(true)
      await api.blogTag.updateBlogTag(id, value)
      setLoading(false)
    }
  }
  return <Tpl title="编辑标签" initState={initState} loading={loading} visible={visible} onAction={onAction} {...props} />
}

export default BlogTagsEEdit
