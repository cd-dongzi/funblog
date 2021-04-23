import React from 'react'
import Search from '../../../components/search'
import './style.less'
type Props = {
  onClose?: () => void
}
interface MainHeaderSearchBox {
  (props: Props): JSX.Element | null
}

const MainHeaderSearchBox: MainHeaderSearchBox = ({ onClose }) => {
  return <Search className="main-header__search-box" onClose={onClose} />
}

export default MainHeaderSearchBox
