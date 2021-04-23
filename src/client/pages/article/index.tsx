import React, { useCallback, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { AppBanner, PaginationContainer, HelmetBox } from '@/appComponents'
import { notification, Modal, Empty } from '@/components'
import { setBlogState } from '@/store/blog/action'
import { IStore, IStoreState } from '@/store'
import classnames from 'classnames'
import api from '@/api'
import { Blog } from '@root/src/models/blog'
import { BlogComment } from '@root/src/models/blogComment'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { headCore } from '@/utils/app'
import { setAppState } from '@/store/app/action'
import { Local } from '@/utils/cache'
import config from '@/config'
import Type from '@root/src/shared/type'
import Content from './components/content'
import PcSidebar from './pc/sidebar'
import MobileSidebar from './mobile/sidebar'
import { getMdTitleList, MdTitle } from './utils'
import './style.less'

const Article = () => {
  const blog = useSelector((state: IStoreState) => state.blog)
  const app = useSelector((state: IStoreState) => state.app)
  const user = useSelector((state: IStoreState) => state.user)
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [openSidebar, setOpenSidebar] = useState(true)
  const { id } = useParams<{ id: string }>()
  const [mdTitleList, setMdTitleList] = useState<MdTitle[]>([])
  const onLoadContent = useCallback((el) => {
    setMdTitleList(getMdTitleList(el))
  }, [])
  const dispatch = useDispatch()
  // load
  const loadData = async (page = 1) => {
    setLoading(true)
    const { data } = await api.blogComment.getBlogCommentsPage({ articleIdEQ: id, page })
    dispatch(
      setBlogState({
        blogComment: {
          list: data.list,
          total: data.total
        }
      })
    )
    setLoading(false)
  }
  // 侧边栏状态
  useEffect(() => {
    const bol = Local.get(config.keys.toggleArticleSide)
    if (Type.isBoolean(bol)) {
      setOpenSidebar(bol)
    }
  }, [])

  // 隐藏侧边栏
  const onHideSidebar = () => {
    setOpenSidebar((prev) => {
      const bol = !prev
      Local.set(config.keys.toggleArticleSide, bol)
      return bol
    })
  }

  // 分页
  const onPage = async (page: number) => {
    setCurrentPage(page)
    loadData(page)
  }
  // 提交留言
  const onSubmit = async (val: string, replyItem?: BlogComment) => {
    if (!val || !val.trim()) {
      return notification.error('说点啥吧~')
    }
    if (!user._id) {
      return Modal.show({
        content: '请先进行登录',
        onConfirm: () => {
          dispatch(
            setAppState({
              showLoginBox: true
            })
          )
        }
      })
    }
    if (replyItem) {
      const params: AnyObject = {
        replayContent: val,
        _id: replyItem._id
      }
      if (!replyItem.floor) {
        params.questioner = {
          avatar: replyItem.avatar,
          name: replyItem.name,
          url: replyItem.url,
          role: replyItem.role
        }
      }
      await api.blogComment.replyBlogComment(params)
    } else {
      await api.blogComment.addBlogComment({
        articleId: id,
        content: val
      })
    }
    loadData(currentPage)
    return null
  }

  const isLarge = app.layoutSize === 'large'
  return (
    <PaginationContainer loading={loading} total={blog.blogComment.total} onAction={onPage} currentPage={currentPage}>
      <div className="article-page">
        <HelmetBox
          title={blog.currentBlogInfo.title}
          keywords={blog.currentBlogInfo.tags && blog.currentBlogInfo.tags.map((tag) => tag.name).join(',')}
          description={blog.currentBlogInfo.desc}
        />
        <AppBanner cover={blog.currentBlogInfo.cover} title={blog.currentBlogInfo.title} tags={blog.currentBlogInfo.tags} showCover />
        {blog.currentBlogInfo.html && (
          <div
            className={classnames('article-main', {
              'hidden-side': mdTitleList.length <= 0 || !openSidebar
            })}
          >
            {isLarge && <PcSidebar list={mdTitleList} />}
            {!isLarge && <MobileSidebar list={mdTitleList} />}
            <Content
              openSidebar={openSidebar}
              className={isLarge ? 'article-pc-content' : 'article-mobile-content'}
              onLoad={onLoadContent}
              info={blog.currentBlogInfo}
              onSubmit={onSubmit}
              onHideSidebar={onHideSidebar}
            />
          </div>
        )}
        {!blog.currentBlogInfo.html && <Empty text="未找到此博客信息" />}
      </div>
    </PaginationContainer>
  )
}

Article._init = async (store: IStore, routeParams: RouterParams, options?: PageInitOptions) => {
  const { data: blogData } = await api.blog.getBlogInfo(routeParams.params.id)
  if (!blogData) return
  const { data: blogCommentData } = await api.blogComment.getBlogCommentsPage({ articleIdEQ: blogData._id })
  if (!options?.disabled) {
    store.dispatch(
      setBlogState({
        currentBlogInfo: {
          ...blogData,
          comment_nums: blogCommentData.total
        },
        blogComment: {
          list: blogCommentData.list,
          total: blogCommentData.total
        }
      })
    )
  }
  return
}
export default Article
