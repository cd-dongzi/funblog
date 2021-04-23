import React, { useEffect, useState } from 'react'
import classnames from 'classnames'
import { MenuButton } from '@/components'
import { useLocation } from 'react-router'
import config from '@/config'
import Logo from '../../components/logo'
import SearchBtn from './searchBtn'
import SearchBox from './searchBox'
import './style.less'

type Props = unknown
interface MainHeader {
  (props: Props): JSX.Element | null
}

const MainHeader: MainHeader = () => {
  const [list] = useState(config.navigation)
  const location = useLocation()
  const [current, setCurrent] = useState(0)
  const [isSearch, setIsSearch] = useState(false)
  useEffect(() => {
    const index = list.findIndex((item) => item.url === location.pathname) || 0
    setCurrent(index)
  }, [location, list])
  return (
    <div id="main-header" className="main-header layout-header df-sb">
      <Logo />
      <div
        className={classnames('layout-header__box', {
          search: isSearch
        })}
      >
        <div className="df-c layout-header__controls">
          <MenuButton type="underline" list={list} current={current} />
          <SearchBtn onClick={() => setIsSearch(true)} />
        </div>
        <SearchBox onClose={() => setIsSearch(false)} />
      </div>
    </div>
  )
}

export default MainHeader
