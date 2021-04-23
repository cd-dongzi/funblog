import React, { useEffect, useRef, useState } from 'react'
import { useSelector, useStore } from 'react-redux'
import { AppBanner, CardPanel, MobileContainer, PaginationContainer, HelmetBox } from '@/appComponents'
import { useQuery } from '@/hooks'
import { IStore, IStoreState } from '@/store'
import { setBlogState } from '@/store/blog/action'
import api from '@/api'

const loadData = async (store: any, query: AnyObject) => {
  const { data } = await api.blog.getBlogSubPageBySearch(query)
  store.dispatch(
    setBlogState({
      search: {
        list: data.list,
        total: data.total
      }
    })
  )
  return
}

const Search = () => {
  const query = useQuery()
  const keyword = query.keyword
  const ref = useRef({
    keyword
  })
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const blog = useSelector((state: IStoreState) => state.blog)
  const store = useStore()
  const onAction = async (page: number) => {
    setCurrentPage(page)
    return await loadData(store, {
      keyword,
      page
    })
  }
  useEffect(() => {
    async function load() {
      if (ref.current.keyword !== query.keyword) {
        ref.current.keyword = query.keyword
        setCurrentPage(1)
        setLoading(true)
        await loadData(store, query)
        setLoading(false)
      }
    }
    load()
  }, [query, store])
  return (
    <MobileContainer>
      <PaginationContainer
        loading={loading}
        total={blog.search.total}
        onAction={onAction}
        list={blog.search.list}
        child={(item) => <CardPanel key={item._id} item={item} />}
        className="card-panel-container"
        currentPage={currentPage}
      >
        <HelmetBox title={`${keyword} - 搜索`} keywords={keyword} />
        <AppBanner
          cover="https://img.dzblog.cn/images/search-bg.jpg"
          title={`搜索：${keyword}`}
          desc={`找到 ${blog.search.total} 个结果`}
          interval={[180, 240]}
          direction="horizontal"
        />
      </PaginationContainer>
    </MobileContainer>
  )
}

Search._init = async (store: IStore, routerParams: RouterParams) => {
  await loadData(store, {
    keyword: routerParams.query.keyword
  })
  return
}
export default Search
