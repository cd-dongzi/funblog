import React, { ReactNode } from 'react'
import './style.less'

type Props = {
  children: ReactNode
}
interface LayoutMain {
  (props: Props): JSX.Element | null
}

const LayoutMain: LayoutMain = ({ children }) => {
  return <div className="layout-main">{children}</div>
}

export default LayoutMain
