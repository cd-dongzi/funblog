import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Underline from './underline'
import Raised from './raised'
import classnames from 'classnames'
import './style.less'

export interface ButtonItem {
  name: string
  icon?: string
  url?: string
  disabledActive?: boolean
}
type Mode = 'horizontal' | 'vertical'
type Type = 'underline' | 'raised'
type Props = {
  list: ButtonItem[]
  mode?: Mode
  type?: Type
  current?: number
  onClick?: (current: number) => void
}
interface MenuButton {
  (props: Props): JSX.Element | null
}

const getMenu = ({
  type,
  active,
  ...item
}: ButtonItem & {
  type: Type
  active: boolean
}) => {
  if (type === 'underline') {
    return <Underline active={active} {...item} />
  }
  if (type === 'raised') {
    return <Raised active={active} {...item} />
  }
}

type MenuReact = {
  width: number
  height: number
  left: number
  top: number
}

export const MenuButton: MenuButton = ({ list, type = 'underline', mode = 'horizontal', current = 0, onClick }) => {
  const [hoverIndex, setHoverIndex] = useState(current)
  const menuRefs = useRef<HTMLDivElement[]>([])
  const [menuOffsets, setMenuOffsets] = useState<MenuReact[]>([])

  useEffect(() => {
    setMenuOffsets(
      menuRefs.current.map((ref) => {
        const o = ref.getBoundingClientRect()
        return {
          width: o.width,
          height: o.height,
          left: o.left,
          top: o.top
        }
      })
    )
  }, [])
  useEffect(() => {
    setHoverIndex(current)
  }, [current])

  const onMenuClick = (index: number) => {
    if (list[index].disabledActive) {
      return
    }
    setHoverIndex(index)
    onClick && onClick(index)
  }
  const onMouseEnter = (index: number) => {
    setHoverIndex(index)
  }
  const onMouseLeave = () => {
    setHoverIndex(current)
  }
  const obj = menuOffsets[hoverIndex]
  const varStyle: AnyObject = {
    '--menu_width': menuOffsets.length > 0 ? (obj ? `${obj.width}px` : 0) : 0
  }
  if (mode === 'horizontal') {
    varStyle['--menu_transform_left'] = menuOffsets.length > 0 ? (obj ? `${obj.left - menuOffsets[0].left}px` : 0) : 0
  } else {
    varStyle['--menu_transform_top'] = menuOffsets.length > 0 ? (obj ? `${obj.top - menuOffsets[0].top}px` : 0) : 0
  }
  return (
    <div className={classnames('menu-button-container', `menu-button-container-${mode}`)}>
      <ul className={classnames('menu-button__menus', `menu-button__menus-${mode}`)} style={varStyle}>
        {list.map((item, index) => {
          const active = current === index
          const menu = getMenu({
            type,
            active,
            ...item
          })
          return (
            <li
              key={item.name}
              className={classnames('menu-button__item', {
                'menu-button__item-active': active
              })}
              onMouseEnter={() => onMouseEnter(index)}
              onMouseLeave={() => onMouseLeave()}
              onClick={() => onMenuClick(index)}
            >
              <div
                ref={(ref) => {
                  menuRefs.current[index] = ref as HTMLDivElement
                }}
                className="menu-button__item-content"
              >
                {item.url ? <Link to={item.url}>{menu}</Link> : menu}
              </div>
            </li>
          )
        })}
        <li className={classnames('menu-button__anchor', `menu-button__anchor-${type}`)}></li>
      </ul>
    </div>
  )
}

// export default MenuButton
