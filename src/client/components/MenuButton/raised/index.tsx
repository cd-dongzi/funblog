import React from 'react'
import { Icon } from '@/components'
import classnames from 'classnames'
import './style.less'

type Props = {
  name: string
  icon?: string
  active?: boolean
}
interface MenuButtonRaisedItem {
  (props: Props): JSX.Element | null
}

const MenuButtonRaisedItem: MenuButtonRaisedItem = ({ name, icon, active }) => {
  return (
    <div
      className={classnames('df-c mb-raised__item', {
        active
      })}
    >
      {icon && <Icon className="mb-raised__item-icon" name={icon} />}
      <span>{name}</span>
    </div>
  )
}

export default MenuButtonRaisedItem
