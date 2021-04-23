import React from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '@/components'
import { BlogSub } from '@root/src/models/blog'
import 'swiper/swiper.less'
import './style.less'

type Props = {
  item: BlogSub
}
interface HomeBannerBoxPC {
  (props: Props): JSX.Element | null
}

const HomeBannerBoxPC: HomeBannerBoxPC = ({ item }) => {
  return (
    <div className="banner-slide df-col-c">
      <h2 className="banner-slide__title">{item.title}</h2>
      <div className="banner-slide__tags df-c">
        {item.tags.map((tag, index) => (
          <Link key={tag.name} className="banner-slide__tag" to={`/blog/${tag.name}`}>
            {tag.name}
          </Link>
        ))}
      </div>
      <Link className="banner-slide__read-more df-c" to={`/article/${item._id}`}>
        <Icon name="rightarrow" />
        <span>阅读全文</span>
      </Link>
      <Link
        className="bg-cover banner-slide__cover"
        to="/"
        style={{
          backgroundImage: `url(${item.cover})`
        }}
      ></Link>
    </div>
  )
}

export default HomeBannerBoxPC
