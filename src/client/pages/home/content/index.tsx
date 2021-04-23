import React, { useEffect, useState } from 'react'
import { CardPanel } from '@/appComponents'
import { Empty } from '@/components'
import { useSelector } from 'react-redux'
import { IStoreState } from '@/store'
import './index.less'

type Props = unknown
interface HomeContent {
  (props: Props): JSX.Element | null
}

const HomeContent: HomeContent = () => {
  const [blog] = useSelector((state: IStoreState) => [state.blog])
  return (
    <div className="home-content">
      {blog.blogSubList.length > 0 && (
        <div className="card-panel-container">
          {blog.blogSubList.map((item) => (
            <div key={item._id} className="home-content__item">
              <CardPanel item={item} />
            </div>
          ))}
        </div>
      )}
      {blog.blogSubList.length === 0 && <Empty text="文章都去哪了" />}
    </div>
  )
}

export default HomeContent
