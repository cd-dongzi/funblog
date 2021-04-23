import React from 'react'
import classnames from 'classnames'

type Props = {
  name: string
  mode?: 'symbol' | 'fontClass'
  color?: string
  className?: string
  onClick?: () => void
}
interface Icon {
  (props: Props): JSX.Element | null
}

const Icon: Icon = ({ name, mode = 'symbol', color, className, onClick }) => {
  if (mode === 'fontClass') {
    return <span className={classnames(`icon iconfont icon${name}`, className)} style={{ color }} onClick={onClick}></span>
  }
  return (
    <svg className={classnames('icon', className)} aria-hidden="true" style={{ color }} onClick={onClick}>
      <use xlinkHref={`#icon${name}`}></use>
    </svg>
  )
}

export default Icon
