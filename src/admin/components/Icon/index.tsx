import React from 'react'
import classnames from 'classnames'

type Props = {
  name: string
  color?: string
  className?: string
  onClick?: () => void
}
interface Icon {
  (props: Props): JSX.Element | null
}

const Icon: Icon = ({ name, color, className, onClick }) => {
  return (
    <svg className={classnames('icon', className)} aria-hidden="true" style={{ color }} onClick={onClick}>
      <use xlinkHref={`#icon${name}`}></use>
    </svg>
  )
}

export default Icon
