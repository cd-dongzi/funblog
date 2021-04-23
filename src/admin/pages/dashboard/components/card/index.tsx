import React, { ReactNode } from 'react'
import classnames from 'classnames'
import './style.less'

type Props = {
  className?: string
  children: ReactNode
}
interface DashboardCard {
  (props: Props): JSX.Element | null
}

const DashboardCard: DashboardCard = ({ children, className }) => {
  return <div className={classnames('dashboard-card', className)}>{children}</div>
}

export default DashboardCard
