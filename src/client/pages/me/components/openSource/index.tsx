import React from 'react'
import { ALink, Icon } from '@/components'
import { Github } from '@root/src/models/github'
import { formatDate } from '@/utils/date'
import Card from '../card'
import './style.less'

type Props = {
  list: Github[]
}
interface MeeOpenSource {
  (props: Props): JSX.Element | null
}

const MeeOpenSource: MeeOpenSource = ({ list }) => {
  return (
    <Card title="瞎鼓捣" className="me-open-source">
      <div className="content">
        {list.map((item) => (
          <ALink key={item.name} className="card" href={item.html_url} target="_blank">
            <h2 className="card-name" data-text={item.name}>
              {item.name}
            </h2>
            <time>{formatDate(item.created_at)}</time>
            <div className="card-controls">
              <div className="card-item card-start">
                <Icon name="xingxing" /> {item.stargazers_count}
              </div>
              <div className="card-item card-fork">
                <Icon name="fork" /> {item.forks_count}
              </div>
              <div className="card-item card-watch">
                <Icon name="eye" /> {item.subscribers_count}
              </div>
            </div>
            {/* <div className="card-desc">{item.description}</div> */}
          </ALink>
        ))}
      </div>
    </Card>
  )
}

export default MeeOpenSource
