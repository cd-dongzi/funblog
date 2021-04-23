import { BlogTag } from '@root/src/models/blogTag'
import React from 'react'
import { Link } from 'react-router-dom'
import './style.less'

type Props = {
  cover?: string
  title?: string
  desc?: string
  tags?: BlogTag[]
  showCover?: boolean
  children?: any
}
interface AppBannerPC {
  (props: Props): JSX.Element | null
}

const AppBannerPC: AppBannerPC = ({ cover, title, desc, tags, showCover, children }) => {
  return (
    <div className="app-banner-p df-sb">
      <div className="app-banner-p__box df-col-c">
        <h1 className="app-banner-p__title">{title}</h1>
        {desc && <small className="app-banner-p__desc">{desc}</small>}
        {tags && (
          <ul className="app-banner-p__tags">
            {tags.map((tag) => (
              <Link className="app-banner-m__tag" key={tag.name} to={`/blog/${tag.name}`}>
                {tag.name}
              </Link>
            ))}
          </ul>
        )}
      </div>
      {showCover && cover && (
        <div className="app-banner-p__cover df-fixed">
          <img src={cover} />
        </div>
      )}
    </div>
  )
}

export default AppBannerPC
