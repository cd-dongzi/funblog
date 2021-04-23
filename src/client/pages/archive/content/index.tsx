import React, { useState } from 'react'
import { Empty } from '@/components'
import classnames from 'classnames'
import { CardStrip } from '@/appComponents'
import { useSelector } from 'react-redux'
import { IStoreState } from '@/store'

type Props = {
  className?: string
}
interface ArchiveContent {
  (props: Props): JSX.Element | null
}

const ArchiveContent: ArchiveContent = ({ className }) => {
  const blog = useSelector((state: IStoreState) => state.blog)
  return (
    <div className={classnames('archive-content card-strip-container', className)}>
      {blog.archive.list.map((item) => (
        <CardStrip item={item} key={item._id} />
      ))}
      {blog.archive.list.length === 0 && <Empty text="文章都去哪了" />}
    </div>
  )
}

export default ArchiveContent
