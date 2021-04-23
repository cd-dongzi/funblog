import React, { useEffect, useRef, useState } from 'react'
import { MessageWrap } from '@/appComponents'
import classnames from 'classnames'
import { useSelector } from 'react-redux'
import { IStoreState } from '@/store'
import { Blog } from '@root/src/models/blog'
import MDContent from '../../components/mdContent'

type Props = {
  info: Blog
  onLoad: (el: HTMLDivElement) => void
  onSubmit: (val: string) => Promise<any>
  className?: string
  onHideSidebar: () => void
  openSidebar: boolean
}
interface ArticleContent {
  (props: Props): JSX.Element | null
}

const ArticleContent: ArticleContent = ({ onSubmit, className, ...props }) => {
  const blog = useSelector((state: IStoreState) => state.blog)
  return (
    <div className={classnames('article-content', className)}>
      <MDContent {...props} />
      <MessageWrap total={blog.blogComment.total} list={blog.blogComment.list} className="article-content__message" onSubmit={onSubmit} />
    </div>
  )
}

export default ArticleContent
