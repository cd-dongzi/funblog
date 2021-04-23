import React, { useRef, useEffect, useState } from 'react'
import { Icon, Github } from '@/components'
import { Blog } from '@root/src/models/blog'
import { Link } from 'react-router-dom'
import { formatDate } from '@/utils/date'
import classnames from 'classnames'
import Controls from '../controls'
import './style.less'

type Props = {
  info: Blog
  onLoad: (el: HTMLDivElement) => void
  onHideSidebar: () => void
  openSidebar: boolean
}
interface ArticleMDContent {
  (props: Props): JSX.Element | null
}

const ArticleMDContent: ArticleMDContent = ({ info, onLoad, openSidebar, onHideSidebar }) => {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!info.html) return
    onLoad(ref.current as HTMLDivElement)
  }, [onLoad, info.html])
  if (!info.html) {
    return null
  }
  return (
    <div
      className={classnames('article-md-content', {
        'has-github': !!info.github
      })}
    >
      {info.github && (
        <div className="github">
          <Github path={info.github} />
        </div>
      )}
      <div className="meta">
        <div className="read">
          <Icon name="read" />
          <span>{info.read_nums}</span>
        </div>
        <div className="tags">
          <Icon name="tag" />
          {info.tags.map((tag) => (
            <Link to={`/blog/${tag.name}`} key={tag.name} className="tag">
              {tag.name}
            </Link>
          ))}
        </div>
        <div className="time">
          <Icon name="time" />
          <span>{formatDate(info.createTime)}</span>
        </div>
      </div>
      <Controls info={info} onHideSidebar={onHideSidebar} openSidebar={openSidebar} />
      <div
        className="md-container"
        dangerouslySetInnerHTML={{
          __html: info.html
        }}
        ref={ref}
      ></div>
    </div>
  )
}

export default ArticleMDContent
