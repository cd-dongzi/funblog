import React, { useState } from 'react'
import api from '@/api'
import Tpl, { TplProps } from '../tpl'

type Props = Omit<TplProps, 'title' | 'onAction' | 'loading'>
interface BlogTagsAdd {
  (props: Props): JSX.Element | null
}

const BlogTagsAdd: BlogTagsAdd = (props) => {
  const [loading, setLoading] = useState(false)
  const onAction = async (value: any) => {
    try {
      setLoading(true)
      await api.blogTag.addBlogTag(value)
    } finally {
      setLoading(false)
    }
  }
  return <Tpl title="新增标签" loading={loading} onAction={onAction} {...props} />
}

export default BlogTagsAdd
