import React, { useEffect, useRef, useState } from 'react'
import { IStoreState } from '@/store'
import { Icon, InputLabel, Modal, notification } from '@/components'
import { setUserState } from '@/store/user/action'
import { checkStr } from '@/utils/string'
import api from '@/api'
import classnames from 'classnames'
import { useDispatch, useSelector } from 'react-redux'
import { filterObjByValue } from '@root/src/shared/utils'
import { User } from '@root/src/models/user'
import ThirdParty from './thirdParty'
import './style.less'

type Props = {
  show: boolean
  disabled?: boolean
  onClose: () => void
  onLogout?: () => void
}

const IButton = ({ text, onClick }: { text: string; onClick: () => void }) => {
  const [loading, setLoading] = useState(false)
  const ummount = useRef(false)
  useEffect(() => {
    return () => {
      ummount.current = true
    }
  }, [])
  const handleClick = async () => {
    try {
      setLoading(true)
      await onClick()
    } finally {
      if (!ummount.current) {
        setLoading(false)
      }
    }
  }
  return (
    <button
      className={classnames('btn-clear modal-login__btn', {
        loading
      })}
      onClick={handleClick}
    >
      {loading ? <Icon name="loading" /> : text}
    </button>
  )
}

const ModalLogin = ({ show, onClose, disabled = false, onLogout }: Props) => {
  const [iDisabled, setIDisabled] = useState(!!disabled)
  const storeUser = useSelector((state: IStoreState) => state.user)
  const [user, setUser] = useState<User>(storeUser as User)
  const dispatch = useDispatch()

  useEffect(() => {
    if (show) {
      setUser(storeUser as User)
    }
  }, [show, storeUser])

  // 设置disabled
  useEffect(() => {
    setIDisabled(disabled)
  }, [disabled])
  const setVal = (val: string, attr: string) => {
    setUser((prev) => ({
      ...prev,
      [attr]: val
    }))
  }

  const check = () => {
    let msg = ''
    if (!user.email) {
      msg = '请输入邮箱'
    }
    if (!checkStr(user.email, 'email')) {
      msg = '请输入正确的邮箱'
    }
    if (user.url && !checkStr(user.url, 'URL')) {
      msg = '请输入正确的网址'
    }
    if (msg) {
      notification.error(msg)
      return true
    }
    return false
  }
  const onLogin = async (params: AnyObject) => {
    const { data } = await api.user.login(
      filterObjByValue({
        ...params
      })
    )
    dispatch(setUserState(data))
    onClose()
  }
  // 登录
  const onSubmit = async () => {
    if (check()) {
      return
    }
    onLogin(user)
  }

  // 保存
  const onSave = async () => {
    if (check()) {
      return
    }
    const { data } = await api.user.updateUser(user._id, {
      name: user.name,
      email: user.email,
      url: user.url
    })
    dispatch(setUserState(data))
    onClose()
  }

  // 第三方本地授权
  const onThirdPartySubmit = (info: Partial<User>) => {
    onLogin(info)
  }
  return (
    <Modal
      show={show}
      onClose={onClose}
      mode="wave"
      backgroundColor="rgba(0, 0, 0, 0.5)"
      rootName="modal-login__container"
      className="modal-login"
    >
      <Icon name="close" className="modal-login__close" onClick={onClose} />
      <div className="modal-login__nav">LOGIN</div>
      <div className="modal-login__main">
        <InputLabel
          required
          className="modal-login__input"
          value={user.email}
          onChange={(val) => setVal(val, 'email')}
          prefixIcon="email"
          placeholder="邮箱"
          type="email"
          disabled={iDisabled}
        />
        <InputLabel
          className="modal-login__input"
          value={user.name}
          onChange={(val) => setVal(val, 'name')}
          prefixIcon="yonghu"
          placeholder="昵称"
          disabled={iDisabled}
        />
        <InputLabel
          className="modal-login__input"
          value={user.url}
          onChange={(val) => setVal(val, 'url')}
          prefixIcon="link"
          placeholder="网址"
          type="url"
          disabled={iDisabled}
        />
        {disabled ? (
          <>
            <div className="modal-login__update">
              {iDisabled ? (
                <button className="btn-clear modal-login__btn" onClick={() => setIDisabled(false)}>
                  编辑
                </button>
              ) : (
                <IButton text="保存" onClick={onSave} />
              )}
            </div>
            <button className="btn-clear modal-login__logout" onClick={onLogout}>
              退出
            </button>
          </>
        ) : (
          <div className="modal-login__registered">
            <IButton text="登录" onClick={onSubmit} />
            <em className="modal-login__tip">已注册可直接邮箱登录, 未注册请输入邮箱昵称进行登录</em>
            <ThirdParty onSubmit={onThirdPartySubmit} />
          </div>
        )}
      </div>
    </Modal>
  )
}

export default ModalLogin
