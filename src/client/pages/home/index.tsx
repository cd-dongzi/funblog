import React, { useCallback, useRef, useState } from 'react'
import { Pagination, ViewLoading, ButtonItem } from '@/components'
import { MobileContainer, SidebarRef, HelmetBox } from '@/appComponents'
import { useDispatch, useSelector } from 'react-redux'
import { IStore, IStoreState } from '@/store'
import api from '@/api'
import { setBlogState } from '@/store/blog/action'
import { BlogState } from '@/store/blog/type'
import config from '@/config'
import Banner from './banner'
import PcSidebar from './pcSidebar'
import Content from './content'
import './style.less'

const Home = () => {
  const sidebarRef = useRef<SidebarRef>(null)
  const { app, blog } = useSelector((state: IStoreState) => state)
  const ref = useRef({
    page: 1,
    tagEQ: blog.blogTag
  })
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  // 获取数据
  const loadData = useCallback(async () => {
    setLoading(true)
    try {
      const blogTag = ref.current.tagEQ
      const params = {
        page: ref.current.page
      }
      let req
      if (blogTag === '最新') {
        req = api.blog.getLatestBlogSubPage(params)
      } else if (blogTag === '热门') {
        req = api.blog.getHotBlogSubPage(params)
      } else {
        req = api.blog.getBlogSubPage({
          ...params,
          tagEQ: blogTag
        })
      }
      const res = await req
      const blogState: Partial<BlogState> = {
        blogSubList: res.data.list,
        blogTotal: res.data.total
      }
      if (blogTag === '最新') {
        blogState.latestBlogSubList = res.data.list
      } else if (blogTag === '热门') {
        blogState.hotBlogSubList = res.data.list
      }
      dispatch(setBlogState(blogState))
      return
    } finally {
      setLoading(false)
    }
  }, [dispatch])
  // 切换页数
  const onPaginationChange = async (page: number) => {
    ref.current.page = page
    setCurrentPage(page)
    await loadData()
    sidebarRef.current?.onReset()
  }
  // 切换导航
  const onMenuClick = async (item: ButtonItem) => {
    if (ref.current.tagEQ === item.name) {
      return
    }
    ref.current.page = 1
    setCurrentPage(1)
    ref.current.tagEQ = item.name
    dispatch(
      setBlogState({
        blogTag: item.name
      })
    )
    await loadData()
    sidebarRef.current?.onReset()
  }
  return (
    <MobileContainer>
      <div className="home-page">
        <HelmetBox />
        <Banner />
        <div className="home-container">
          {app.layoutSize === 'large' && <PcSidebar onClick={onMenuClick} sidebarRef={sidebarRef} />}
          <Content />
        </div>
        {loading && <ViewLoading />}
        <Pagination total={blog.blogTotal} onChange={onPaginationChange} className="page-pagination" currentPage={currentPage} />
      </div>
    </MobileContainer>
  )
}

Home._init = async (store: IStore) => {
  const { blog } = store.getState()
  if (config.blogMenuList.every((item) => item.name !== blog.blogTag)) {
    const { data } = await api.blog.getBlogSubPage({
      tagEQ: blog.blogTag
    })
    store.dispatch(
      setBlogState({
        blogSubList: data.list,
        blogTotal: data.total
      })
    )
  } else {
    store.dispatch(
      setBlogState({
        blogSubList: blog.blogTag === '最新' ? blog.latestBlogSubList : blog.hotBlogSubList
      })
    )
  }
  return
}

export default Home
