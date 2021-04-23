import React from 'react'
import config from '@/config'
import { Icon } from '@/components'
import { Link, useLocation } from 'react-router-dom'
import classnames from 'classnames'
import './style.less'

type Props = {
  onClick: () => void
}
interface MobileNavigation {
  (props: Props): JSX.Element | null
}

const MobileNavigation: MobileNavigation = ({ onClick }) => {
  const location = useLocation()
  return (
    <div className="mobile-navigation">
      <ul>
        {config.navigation.map((item, index) => (
          <li key={item.name}>
            <Link
              to={item.url}
              className={classnames({
                active: item.url === location.pathname
              })}
              onClick={onClick}
            >
              <Icon name={item.icon} />
              <span>{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default MobileNavigation
