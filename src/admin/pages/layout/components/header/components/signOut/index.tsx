import React from 'react'
import { Dropdown, Menu } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { ALink } from '@/components'
import avatarImg from '@/assets/images/avatar.gif'
import { signOut } from '@/utils/app'
import { IStoreState } from '@/store'
import './style.less'

type Props = unknown
interface SignOut {
  (props: Props): JSX.Element | null
}

const SignOut: SignOut = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const user = useSelector((state: IStoreState) => state.user)
  const onSignOut = () => {
    signOut()
  }
  const menu = (
    <Menu className="sign-out__menu" triggerSubMenuAction="click">
      <Menu.Item disabled>{user.name}</Menu.Item>
      {user.github && (
        <Menu.Item>
          <ALink href={user.github}>Github</ALink>
        </Menu.Item>
      )}
      <Menu.Item>
        <ALink href="https://github.com/cd-dongzi">项目地址</ALink>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item onClick={onSignOut}>退出</Menu.Item>
    </Menu>
  )
  return (
    <Dropdown overlay={menu}>
      <div className="sign-out">
        <img src={avatarImg} />
      </div>
    </Dropdown>
  )
}

export default SignOut
