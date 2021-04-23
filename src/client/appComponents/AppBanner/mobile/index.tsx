import React from 'react'
import { Link } from 'react-router-dom'
import { BlogTag } from '@root/src/models/blogTag'
import './style.less'

type Props = {
  cover?: string
  title?: string
  desc?: string
  tags?: BlogTag[]
  showCover?: boolean
  children?: any
}
interface AppBannerMobile {
  (props: Props): JSX.Element | null
}

const AppBannerMobile: AppBannerMobile = ({ cover, showCover, title, desc, tags, children }) => {
  return (
    <div className="app-banner-m df-col-c">
      {children}
      {showCover && <img src={cover} className="app-banner-m__cover" />}
      <h1 className="app-banner-m__title">{title}</h1>
      {desc && <small className="app-banner-m__desc">{desc}</small>}
      {tags && (
        <div className="app-banner-m__tags">
          {tags.map((tag) => (
            <Link className="app-banner-m__tag" key={tag.name} to={`/blog/${tag.name}`}>
              {tag.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default AppBannerMobile
