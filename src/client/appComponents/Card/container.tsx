import React from 'react'
import classnames from 'classnames'
import { Link } from 'react-router-dom'
import { BlogSub } from '@root/src/models/blog'
import './style.less'

export type ContainerProps = {
  children: any
  item?: BlogSub
  className?: string
  to?: string
  onClick?: (item?: BlogSub) => void
}
interface CardContainer {
  (props: ContainerProps): JSX.Element | null
}

const CardContainer: CardContainer = ({ item, className, to, children, onClick }) => {
  const handleClick = () => {
    onClick && onClick(item)
  }
  if (to) {
    return (
      <Link to={to} className={classnames('card-container', className)} onClick={() => handleClick()}>
        {children}
      </Link>
    )
  }
  return (
    <div className={classnames('card-container', className)} onClick={() => handleClick()}>
      {children}
    </div>
  )
}

export default CardContainer
