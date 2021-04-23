import React, { useState } from 'react'
import api from '@/api'
import Tpl from '../components/tpl'
const BlogAdd = () => {
  const [loading, setLoading] = useState(false)
  const onAction = async (value: FormData) => {
    setLoading(true)
    try {
      await api.play.addPlay(value)
      setLoading(false)
    } catch (e) {
      setLoading(false)
      throw e
    }
    return
  }
  return <Tpl title="添加实例" confirmBtnText="创建" loading={loading} onAction={onAction} />
}

export default BlogAdd
