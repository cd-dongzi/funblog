import React, { useRef, useState } from 'react'
import { AppBanner, SidebarRef, PaginationContainer, HelmetBox } from '@/appComponents'
import { ViewLoading } from '@/components'
import { setBlogState } from '@/store/blog/action'
import { IStore, IStoreState } from '@/store'
import api from '@/api'
import PcSidebar from './pcSidebar'
import MobileSidebar from './mobileSidebar'
import Content from './content'
import './style.less'
import { useSelector, useStore } from 'react-redux'

const loadData = async (store: any, query?: AnyObject) => {
  const load = async (que: AnyObject) => {
    const { data } = await api.blog.getArchiveBlogs(que)
    return data
  }
  const blog = store.getState().blog
  let archive = {
    ...blog.archive
  }
  if (!query) {
    const { data: times } = await api.blog.getArchiveTimes()
    archive = {
      ...archive,
      times
    }
    const year = 0
    const month = 0
    const blogs = await load({ year, month })
    archive = {
      ...archive,
      list: blogs.list,
      total: blogs.total,
      year,
      month
    }
  } else {
    const blogs = await load(query)
    archive = {
      ...archive,
      list: blogs.list,
      total: blogs.total,
      year: query.year,
      month: query.month
    }
  }
  store.dispatch(
    setBlogState({
      archive
    })
  )
  return
}

const Archive = () => {
  const blog = useSelector((state: IStoreState) => state.blog)
  const app = useSelector((state: IStoreState) => state.app)
  const store = useStore()
  const stateRef = useRef<AnyObject>({
    query: {
      year: 0,
      month: 0
    }
  })
  const sidebarRef = useRef<SidebarRef>(null)
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  const onChange = async (query: AnyObject) => {
    stateRef.current.query = query
    setLoading(true)
    await loadData(store, query)
    setLoading(false)
    setCurrentPage(1)
    sidebarRef.current?.onReset()
    return
  }
  const onResetContent = () => {
    sidebarRef.current?.onReset()
  }
  // 页码切换
  const onPaginationChange = async (page: number) => {
    await loadData(store, { ...stateRef.current.query, page })
    setCurrentPage(page)
    sidebarRef.current?.onReset()
  }
  const isLarge = app.layoutSize === 'large'
  return (
    <PaginationContainer total={blog.archive.total} onAction={onPaginationChange} loading={loading} currentPage={currentPage}>
      <div className="archive-page">
        <HelmetBox title="博客归档" keywords="归档,博客归档" />
        <AppBanner cover="https://img.dzblog.cn/images/write.jpg" title="博客归档" />
        {loading && <ViewLoading />}
        <div className="archive-main">
          {isLarge && <PcSidebar onChange={onChange} onResetContent={onResetContent} sidebarRef={sidebarRef} />}
          {!isLarge && <MobileSidebar onChange={onChange} />}
          <Content className={isLarge ? 'archive-pc-content' : 'archive-mobile-content'} />
        </div>
      </div>
    </PaginationContainer>
  )
}

Archive._init = async (store: IStore, routerParams: RouterParams) => {
  await loadData(store)
  return
}
export default Archive
