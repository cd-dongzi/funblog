import React from 'react'
import { Icon } from '@/components'
import './style.less'

type Props = {
  onClick: () => void
}
interface MainHeaderSearchBtn {
  (props: Props): JSX.Element | null
}

const MainHeaderSearchBtn: MainHeaderSearchBtn = ({ onClick }) => {
  return (
    <div className="main-header__search-btn df-c" onClick={onClick}>
      <Icon name="search" />
    </div>
  )
}

export default MainHeaderSearchBtn
