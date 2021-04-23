import React from 'react'
import { Icon } from '@/components'
import classnames from 'classnames'
import './style.less'

type Props = {
  name: string
  icon?: string
  active?: boolean
}
interface MenuButtonUnderlineItem {
  (props: Props): JSX.Element | null
}

const MenuButtonUnderlineItem: MenuButtonUnderlineItem = ({ name, icon, active }) => {
  return (
    <div
      className={classnames('df-c mb-underline__item', {
        active
      })}
    >
      {icon && <Icon className="mb-underline__item-icon" name={icon} />}
      <span>{name}</span>
    </div>
  )
}

export default MenuButtonUnderlineItem
