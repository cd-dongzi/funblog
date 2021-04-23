import React, { useState } from 'react'
import classnames from 'classnames'
import { useDispatch, useSelector } from 'react-redux'
import { IStoreState } from '@/store'
import { UserState } from '@/store/user/type'
import { setUserState } from '@/store/user/action'
import { notification } from '@/components'
import './style.less'

type Props = unknown
interface IdentityFill {
  (props: Props): JSX.Element | null
}

type ListItem = {
  label: keyof UserState
  alias: string
  placeholder: string
  type: string
  required?: boolean
}

const list: ListItem[] = [
  {
    label: 'name',
    alias: '昵称',
    placeholder: '昵称...',
    type: 'text',
    required: true
  },
  {
    label: 'email',
    alias: '邮箱',
    placeholder: 'Email不会被公开显示...',
    type: 'email',
    required: true
  },
  {
    label: 'url',
    alias: '外链',
    placeholder: '个人链接...',
    type: 'url'
  },
  {
    label: 'city',
    alias: '城市',
    placeholder: '所在城市...',
    type: 'text'
  },
  {
    label: 'qq',
    alias: 'Q Q',
    placeholder: 'QQ不会被公开显示...',
    type: 'text'
  }
]

const IdentityFill: IdentityFill = () => {
  const [user] = useSelector((state: IStoreState) => [state.user as UserState])
  const [form, setForm] = useState<UserState>(user)
  const dispatch = useDispatch()

  // 输入
  const onChange = (label: keyof UserState, value: string) => {
    setForm((prevForm) => {
      return {
        ...prevForm,
        [label]: value
      }
    })
  }

  // 保存
  const onSave = () => {
    if (!form.name) {
      return notification.error('请输入昵称~')
    }
    if (!form.email) {
      return notification.error('请输入邮箱~')
    }
    dispatch(setUserState(form))
  }
  return (
    <div className="identity-fill">
      {list.map((item) => (
        <div
          key={item.label}
          className={classnames('identity-fill__item', {
            'identity-fill__required': item.required
          })}
        >
          <div className="identity-fill__label">{item.alias}</div>
          <div className="identity-fill__content">
            <input
              className="identity-fill__input"
              value={form[item.label]}
              placeholder={item.placeholder}
              type={item.type}
              onChange={(e) => onChange(item.label, e.target.value)}
            />
          </div>
        </div>
      ))}
      <button className="btn-clear identity-fill__save" onClick={onSave}>
        保存
      </button>
    </div>
  )
}

export default IdentityFill
