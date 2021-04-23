import React from 'react'
import classnames from 'classnames'
import './style.less'

type Props = {
  children: any
  content: any
  direction?: 'top' | 'right' | 'bottom' | 'left'
  color?: string
}
interface Tooltip {
  (props: Props): JSX.Element | null
}

const Tooltip: Tooltip = ({ children, direction = 'top', content, color }) => {
  const style = {
    '--tooltip_color': color || 'var(--primary)'
  }
  return (
    <div className="tooltip-box" style={style}>
      {children}
      <div className={classnames('tooltip-arrow', `tooltip-arrow__${direction}`)}>{content}</div>
    </div>
  )
}

export default Tooltip
