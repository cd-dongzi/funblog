import React, { useState } from 'react'
import { Icon, Modal } from '@/components'
import { ModalLogin } from '@/appComponents'
import { useDispatch, useSelector } from 'react-redux'
import { setAppState } from '@/store/app/action'
import { IStoreState } from '@/store'
import { resetUserState } from '@/store/user/action'
import { Cookie } from '@/utils/cache'
import rootConfig from '@root/src/shared/config'
import './style.less'
import api from '@/api'

const LoginBtn = () => {
  const user = useSelector((state: IStoreState) => state.user)
  const app = useSelector((state: IStoreState) => state.app)
  const dispatch = useDispatch()

  const onClose = () => {
    dispatch(
      setAppState({
        showLoginBox: false
      })
    )
  }
  const onLogout = () => {
    Modal.show({
      content: '确定要登出吗？',
      onConfirm: async () => {
        await api.user.logout()
        dispatch(resetUserState())
        onClose()
      }
    })
  }
  const onLogin = () => {
    dispatch(
      setAppState({
        showLoginBox: true
      })
    )
  }
  const isLogin = !user.name
  return (
    <>
      <div className="login-btn">
        <div className="login-btn-item df-c" onClick={onLogin}>
          {isLogin ? <Icon name="me" /> : <Icon name="yonghu" />}
        </div>
      </div>
      <ModalLogin onClose={onClose} show={app.showLoginBox} disabled={!isLogin} onLogout={onLogout} />
    </>
  )
}

export default LoginBtn
