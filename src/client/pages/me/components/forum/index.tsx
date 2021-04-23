import React from 'react'
import config from '@/config'
import { ALink } from '@/components'
import Card from '../card'
import './style.less'

type Props = unknown
interface MeForum {
  (props: Props): JSX.Element | null
}

const MeForum: MeForum = () => {
  return (
    <Card title="站点" className="me-forum">
      <ul>
        {config.forumList.map((item) => (
          <li key={item.name}>
            <ALink href={item.link} target="_blank">
              {item.name}
            </ALink>
            <ALink href={item.link} target="_blank">
              {item.link}
            </ALink>
          </li>
        ))}
      </ul>
    </Card>
  )
}

export default MeForum
