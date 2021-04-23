import React from 'react'
import classnames from 'classnames'
import { BlogSub } from '@root/src/models/blog'
import CardContainer from '../container'
import Summary from '../components/summary'
import './style.less'

type Props = {
  item: BlogSub
  className?: string
  onClick?: () => void
}
interface CardThumb {
  (props: Props): JSX.Element | null
}

const CardThumb: CardThumb = ({ item, className, onClick }) => {
  return (
    <CardContainer to={`/article/${item._id}`} className={classnames('card-thumb df-sb', className)} item={item} onClick={onClick}>
      <img src={item.cover} className="card-thumb__cover df-fixed" />
      <div className="card-thumb__content df-col-c">
        <h3 className="card-thumb__title wes-2">{item.title}</h3>
        <Summary item={item} />
      </div>
    </CardContainer>
  )
}

export default CardThumb
