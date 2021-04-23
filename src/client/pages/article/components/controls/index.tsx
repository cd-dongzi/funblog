import React from 'react'
import api from '@/api'
import { Icon, BannerTag, Tooltip, notification, ViewLoading } from '@/components'
import { setScrollTop, getOffsetTop } from '@/utils/dom'
import { Blog } from '@root/src/models/blog'
import classnames from 'classnames'
import { useDispatch, useSelector } from 'react-redux'
import { setBlogState } from '@/store/blog/action'
import { IStoreState } from '@/store'
import './style.less'

type Props = {
  info: Blog
  onHideSidebar: () => void
  openSidebar: boolean
}
interface ArticleControls {
  (props: Props): JSX.Element | null
}

const ArticleControls: ArticleControls = ({ info, onHideSidebar, openSidebar }) => {
  const dispatch = useDispatch()
  const blog = useSelector((state: IStoreState) => state.blog)
  const app = useSelector((state: IStoreState) => state.app)
  // 跳转留言
  const onMessage = () => {
    const obj = document.querySelector('.article-content__message')
    if (obj) {
      let top = getOffsetTop(obj)
      top = top - 80 > 0 ? top - 80 : top
      setScrollTop(top, { animate: true })
    }
  }
  // 点赞
  const onLike = async () => {
    if (info.hasLike) {
      return notification.info('您已经点过赞了')
    }
    const { data } = await ViewLoading.action(api.blog.updateLikeByBlog(info._id))
    dispatch(
      setBlogState({
        currentBlogInfo: {
          ...blog.currentBlogInfo,
          like_nums: data,
          hasLike: true
        }
      })
    )
  }
  return (
    <BannerTag type="red" mode="right" className="article-controls df-c">
      <Tooltip content="点赞" color="#ff7849">
        <div className={classnames('item df-c', { has: info.hasLike })} onClick={onLike}>
          <Icon name="dianzan" />
          <span>{info.like_nums || 0}</span>
        </div>
      </Tooltip>
      <Tooltip content="留言" color="#ff7849">
        <div className="item df-c" onClick={onMessage}>
          <Icon name="message" />
          <span>{info.comment_nums}</span>
        </div>
      </Tooltip>
      {app.layoutSize === 'large' && (
        <Tooltip content={`${openSidebar ? '隐藏' : '显示'}侧边栏`} color="#ff7849">
          <div className="item df-c" onClick={onHideSidebar}>
            <Icon name={openSidebar ? 'zhankai' : 'shousuo'} />
          </div>
        </Tooltip>
      )}
    </BannerTag>
  )
}

export default ArticleControls
