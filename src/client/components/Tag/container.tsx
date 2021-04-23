import React from 'react'
import { Link } from 'react-router-dom'
import classnames from 'classnames'
import './style.less'

export type Props = {
  children: any
  to?: string
  url?: string
  target?: string
  className?: string
  style?: AnyObject
  onClick?: () => void
}
interface TagContainer {
  (props: Props): JSX.Element | null
}

const TagContainer: TagContainer = ({ className, to, url, children, target, style, onClick }) => {
  const cls = classnames('tag-btn-container', className)
  if (to) {
    return (
      <Link className={cls} to={to} style={style} onClick={onClick}>
        {children}
      </Link>
    )
  }
  if (url) {
    return (
      <a className={cls} href={url} target={target} style={style} onClick={onClick}>
        {children}
      </a>
    )
  }
  return (
    <button className={cls} style={style} onClick={onClick}>
      {children}
    </button>
  )
}

export default TagContainer
