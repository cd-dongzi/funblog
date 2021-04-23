import React, { useState } from 'react'
import { Blog } from '@root/src/models/blog'
import api from '@/api'
import Tpl from '../components/tpl'
const BlogAdd = () => {
  const [loading, setLoading] = useState(false)
  const onAction = async (value: FormData) => {
    try {
      setLoading(true)
      await api.blog.addBlog(value)
      setLoading(false)
      return
    } catch (e) {
      setLoading(false)
      throw e
    }
  }
  return <Tpl title="添加博客" confirmBtnText="创建" loading={loading} onAction={onAction} />
}

export default BlogAdd
