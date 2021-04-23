import React, { useState } from 'react'
import { Input, Button, message } from 'antd'
import { Icon } from '@/components'
import api from '@/api'
import { Cookie } from '@/utils/cache'
import rootConfig from '@root/src/shared/config'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import { setUserState } from '@/store/user/action'
import './style.less'

const Login = () => {
  const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState({
    username: '',
    password: ''
  })
  const dispatch = useDispatch()
  const history = useHistory()
  const onSubmit = async () => {
    if (!query.username) {
      return message.error('请输入用户名')
    }
    if (!query.password) {
      return message.error('请输入密码')
    }
    try {
      setLoading(true)
      const { data } = await api.user.login(query)
      // 暂时在前端做
      // Cookie.set(rootConfig.adminTokenKey, (data as any).token, 3)
      dispatch(
        setUserState({
          username: data.username,
          _id: data._id,
          roles: data.roles,
          github: data.github
        })
      )
      history.push('/')
    } catch (e) {
      setLoading(false)
    }
  }
  const onInput = (key: string, val: string) => {
    setQuery((prev) => ({
      ...prev,
      [key]: val
    }))
  }
  return (
    <div className="login">
      <div className="login-form">
        <h1 className="login-title">系统登录</h1>
        <Input
          prefix={<Icon name="a-user" />}
          placeholder="请输入用户名"
          onInput={(e) => onInput('username', (e.target as any).value)}
          onPressEnter={onSubmit}
        />
        <Input
          prefix={<Icon name="a-password" />}
          type="password"
          placeholder="请输入密码"
          onInput={(e) => onInput('password', (e.target as any).value)}
          onPressEnter={onSubmit}
        />
        <Button onClick={onSubmit} loading={loading} type="primary" size="large" className="login-submit">
          登录
        </Button>
      </div>
    </div>
  )
}

export default Login
