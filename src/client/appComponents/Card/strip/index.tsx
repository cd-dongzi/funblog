import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Icon, TagStrip } from '@/components'
import { formatDate } from '@/utils/date'
import { BlogSub } from '@root/src/models/blog'
import CardContainer from '../container'
import Summary from '../components/summary'
import './style.less'

type Props = {
  item: BlogSub
}
interface CardStrip {
  (props: Props): JSX.Element | null
}

const CardStrip: CardStrip = ({ item }) => {
  const [controls] = useState([
    { icon: 'read', total: item.read_nums },
    { icon: 'like', total: item.like_nums },
    { icon: 'message', total: item.comment_nums }
  ])
  const url = `/article/${item._id}`
  return (
    <CardContainer className="card-strip">
      <Link
        className="bg-cover cover"
        to={url}
        style={{
          backgroundImage: `url(${item.cover})`
        }}
      ></Link>
      <div className="content">
        <div className="meta">
          <h2>
            <Link className="title wes" to={url}>
              {item.title}
            </Link>
          </h2>
          <time className="time">{formatDate(item.createTime)}</time>
          <div className="tags">
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
        <div className="foot">
          <div className="controls">
            <Summary item={item} isHover />
          </div>
          <div className="desc wes-2">{item.desc}</div>
        </div>
      </div>
    </CardContainer>
  )
}

export default CardStrip
