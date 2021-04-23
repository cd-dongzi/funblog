import React from 'react'
import classnames from 'classnames'
import './style.less'

type Props = {
  children: any
  className?: string
}
interface Center {
  (props: Props): JSX.Element | null
}

const Center: Center = ({ children, className }) => {
  return <div className={classnames('center-container df-c', className)}>{children}</div>
}

export default Center
