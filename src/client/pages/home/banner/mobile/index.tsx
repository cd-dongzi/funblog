import React from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '@/components'
import { BlogSub } from '@root/src/models/blog'
import 'swiper/swiper.less'
import './style.less'

type Props = {
  item: BlogSub
}
interface HomeBannerBoxMobile {
  (props: Props): JSX.Element | null
}

const HomeBannerBoxMobile: HomeBannerBoxMobile = ({ item }) => {
  return (
    <div className="banner-slide-m df-col-c">
      <h2 className="banner-slide-m__title">{item.title}</h2>
      <div className="banner-slide-m__tags df-c">
        {item.tags.map((tag) => (
          <Link key={tag.name} className="banner-slide-m__tag" to={`/blog/${tag.name}`}>
            {tag.name}
          </Link>
        ))}
      </div>
      <Link className="banner-slide-m__read-more df-c" to={`/article/${item._id}`}>
        <Icon name="rightarrow" />
        <span>阅读全文</span>
      </Link>
    </div>
  )
}

export default HomeBannerBoxMobile
