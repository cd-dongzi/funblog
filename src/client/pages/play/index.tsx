import React, { useState } from 'react'
import { AppBanner, CardStretch, MobileContainer, PaginationContainer, HelmetBox } from '@/appComponents'
import api from '@/api'
import { useSelector, useStore } from 'react-redux'
import { IStore, IStoreState } from '@/store'
import { setPlayState } from '@/store/play/action'
import './style.less'

const loadData = async (store: any, query?: AnyObject) => {
  const { data } = await api.play.getPlays(query)
  store.dispatch(
    setPlayState({
      list: data.list,
      total: data.total
    })
  )
  return
}

const Play = () => {
  const play = useSelector((state: IStoreState) => state.play)
  const store = useStore()
  const [loading, setLoading] = useState(false)
  const onAction = async (page: number) => {
    setLoading(true)
    await loadData(store, {
      page
    })
    setLoading(false)
    return
  }
  const onDownload = async (id: string) => {
    const url = api.play.downloadPlay(id)
    window.open(url, '_self')
    // window.open(url)
  }
  return (
    <MobileContainer>
      <PaginationContainer
        loading={loading}
        total={play.total}
        onAction={onAction}
        list={play.list}
        child={(item) => <CardStretch key={item._id} item={item} onDownload={onDownload} />}
        className="card-stretch-container"
      >
        <HelmetBox title="大杂烩" />
        <AppBanner cover="https://img.dzblog.cn/images/play.jpg" title="大杂烩" desc="乱七八糟 & 东拼西凑" />
      </PaginationContainer>
    </MobileContainer>
  )
}

Play._init = async (store: IStore) => {
  await loadData(store)
  return
}
export default Play
