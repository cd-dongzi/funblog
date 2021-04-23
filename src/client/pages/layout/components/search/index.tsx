import React from 'react'
import { useHistory } from 'react-router'
import { Icon } from '@/components'
import classnames from 'classnames'
import './style.less'

type Props = {
  onClose?: () => void
  className?: string
}
interface MainSearch {
  (props: Props): JSX.Element | null
}

const MainSearch: MainSearch = ({ onClose, className }) => {
  const history = useHistory()
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement
    let val = target.value
    val = val.trim()
    if (e.keyCode === 13 && val) {
      onClose && onClose()
      history.push(`/search?keyword=${val}`)
      target.value = ''
    }
  }
  return (
    <div className={classnames('main-search df-c', className)}>
      <Icon name="search" />
      <input type="text" className="input" placeholder="搜索您想看的..." onKeyDown={onKeyDown} />
      <Icon className="close" name="close" onClick={onClose} />
    </div>
  )
}

export default MainSearch
