import React, { ReactNode } from 'react'
import { BannerTag } from '@/components'
import classnames from 'classnames'
import './style.less'

type Props = {
  title: string
  children: ReactNode
  className?: string
}
interface MeCard {
  (props: Props): JSX.Element | null
}

const MeCard: MeCard = ({ children, title, className }) => {
  return (
    <div className={classnames('me-card', className)}>
      <div className="meta">
        <h2 className="title">{title}</h2>
      </div>
      <div className="main">{children}</div>
    </div>
  )
}

export default MeCard
