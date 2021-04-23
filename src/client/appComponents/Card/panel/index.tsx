import React from 'react'
import { Link } from 'react-router-dom'
import { TagStrip } from '@/components'
import { BlogSub } from '@root/src/models/blog'
import { formatDate } from '@/utils/date'
import CardContainer from '../container'
import Summary from '../components/summary'
import './style.less'

type Props = {
  item: BlogSub
}
interface CardPanel {
  (props: Props): JSX.Element | null
}
const CardPanel: CardPanel = ({ item }) => {
  const url = `/article/${item._id}`
  return (
    <CardContainer className="card-panel">
      <Link to={url} className="cover">
        <img src={item.cover} />
      </Link>
      <div className="box">
        <h2>
          <Link className="title wes" to={url}>
            {item.title}
          </Link>
        </h2>
        <div className="meta">
          <Summary item={item} isHover />
          <time className="time">{formatDate(item.createTime)}</time>
        </div>
        <div className="tags">
          <div className="tags-scroll">
            {item.tags.map((tag) => (
              <TagStrip
                key={tag.name}
                className="tag"
                to={`/blog/${tag.name}`}
                style={{
                  color: tag.color
                }}
              >
                {tag.name}
              </TagStrip>
            ))}
          </div>
        </div>
      </div>
    </CardContainer>
  )
}

export default CardPanel
