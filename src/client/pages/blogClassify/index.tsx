import React from 'react'
import { useParams } from 'react-router-dom'
import { AppBanner, CardPanel, MobileContainer, PaginationContainer, HelmetBox } from '@/appComponents'
import { IStore, IStoreState } from '@/store'
import { useSelector, useStore } from 'react-redux'
import { setBlogState } from '@/store/blog/action'
import api from '@/api'

const loadData = async (store: any, query: AnyObject) => {
  const { data } = await api.blog.getBlogSubPage(query)
  store.dispatch(
    setBlogState({
      blogClassify: {
        list: data.list,
        total: data.total
      }
    })
  )
  return
}
const BlogClassify = () => {
  const blog = useSelector((state: IStoreState) => state.blog)
  const store = useStore()
  const params = useParams<{ tag: string }>()
  const onAction = async (page: number) => {
    return await loadData(store, {
      tagEQ: params.tag,
      page
    })
  }
  return (
    <MobileContainer>
      <PaginationContainer
        total={blog.blogClassify.total}
        onAction={onAction}
        list={blog.blogClassify.list}
        child={(item) => <CardPanel key={item._id} item={item} />}
        className="card-panel-container"
      >
        <HelmetBox title={params.tag} keywords={params.tag} />
        <AppBanner
          cover="https://img.dzblog.cn/images/search-bg.jpg"
          title={params.tag}
          desc={`找到 ${blog.blogClassify.total} 个结果`}
          interval={[180, 240]}
          direction="horizontal"
        />
      </PaginationContainer>
    </MobileContainer>
  )
}

BlogClassify._init = async (store: IStore, routerParams: RouterParams) => {
  await loadData(store, {
    tagEQ: routerParams.params.tag
  })
  return
}
export default BlogClassify
