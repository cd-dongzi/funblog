import React from 'react'
import './style.less'

type Props = {
  title: string
  children: any
}
interface Panel {
  (props: Props): JSX.Element | null
}

const Panel: Panel = ({ title, children }) => {
  return (
    <div className="panel-container">
      <h3 className="panel-title">
        <div className="panel-title__text">{title}</div>
      </h3>
      <div className="panel-content">{children}</div>
    </div>
  )
}

export default Panel
