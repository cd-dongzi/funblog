import React, { useEffect, useState } from 'react'
import { Icon } from '@/components'
import classnames from 'classnames'
import Logo from '../../components/logo'
import Search from '../../components/search'
import './style.less'

type Props = {
  onSidebar: () => void
  showSidebar: boolean
}
interface LayoutNav {
  (props: Props): JSX.Element | null
}

const LayoutNav: LayoutNav = ({ onSidebar, showSidebar }) => {
  const [isSearch, setIsSearch] = useState(false)
  const [showTransform, setShowTransform] = useState(false)
  // 因TransformBox组件导致 main那块的元素建造了新图层，
  // 所以，让nav组件也是用transform来弄出更高的层级，避免nav闪烁
  const onTransitionEnd = () => {
    if (!showSidebar) {
      setShowTransform(showSidebar)
    }
  }
  useEffect(() => {
    if (showSidebar) {
      setShowTransform(showSidebar)
    }
  }, [showSidebar])
  return (
    <nav
      className={classnames('main-header layout-nav', {
        hidden: showSidebar,
        tranform: showTransform
      })}
      onTransitionEnd={onTransitionEnd}
    >
      <div
        className={classnames('layout-nav__container df-sb', {
          search: isSearch
        })}
      >
        <div className="layout-nav__icon df-c" onClick={onSidebar}>
          <Icon name="menu" />
        </div>
        <Logo className="layout-nav__logo" />
        <div className="layout-nav__icon df-c" onClick={() => setIsSearch(true)}>
          <Icon name="search" />
        </div>
        <Search className="layout-nav__search" onClose={() => setIsSearch(false)} />
      </div>
    </nav>
  )
}

export default LayoutNav
