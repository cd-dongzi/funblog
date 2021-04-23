import React from 'react'
import { ALink } from '@/components'
import classnames from 'classnames'
import logo from '@/assets/images/logo.png'
import { useSelector } from 'react-redux'
import { IStoreState } from '@/store'
import './style.less'

const MainHeaderLogo = ({ className }: { className?: string }) => {
  const system = useSelector((state: IStoreState) => state.system)
  return (
    <ALink href={system.appHost}>
      <img className={classnames('main-header__logo', className)} src={logo} alt="wintermelon" />
    </ALink>
  )
}

export default MainHeaderLogo
