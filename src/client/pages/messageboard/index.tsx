import React, { useState } from 'react'
import { IStore, IStoreState } from '@/store'
import api from '@/api'
import { AppBanner, MobileContainer, PaginationContainer, HelmetBox } from '@/appComponents'
import { setCommentState } from '@/store/comment/action'
import { useSelector, useStore } from 'react-redux'
import Content from './content'
import './style.less'

const load = async (store: any, params?: AnyObject) => {
  const res = await api.comment.getCommentsPage(params)
  store.dispatch(
    setCommentState({
      commentList: res.data.list,
      commentTotal: res.data.total
    })
  )
  return
}

type Props = unknown
interface Messageboard {
  (props: Props): JSX.Element | null
  _init: (store: IStore, routeParams?: RouterParams, options?: PageInitOptions) => Promise<any>
}

const Messageboard: Messageboard = () => {
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const comment = useSelector((state: IStoreState) => state.comment)
  const store = useStore()
  const loadData = () => {
    load(store, {
      page: currentPage
    })
  }
  const onPage = async (page: number) => {
    setLoading(true)
    await load(store, {
      page
    })
    setCurrentPage(page)
    setLoading(false)
  }
  return (
    <MobileContainer>
      <PaginationContainer loading={loading} total={comment.commentTotal} currentPage={currentPage} onAction={onPage}>
        <div className="messageboard-page">
          <HelmetBox title="留言板" keywords="留言板" description="同道中人，理性留言..." />
          <AppBanner cover="https://img.dzblog.cn/images/comment.jpg" title="留言板" desc="同道中人，理性留言" />
          <div className="messageboard-main">
            <Content loadData={loadData} />
          </div>
        </div>
      </PaginationContainer>
    </MobileContainer>
  )
}

Messageboard._init = (store: IStore) => {
  return load(store)
}

export default Messageboard
