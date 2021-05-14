import { IStore } from '@client/store'
import api from '@client/api'
import config from '@client/config'
import { setBlogState } from '@client/store/blog/action'
import { setAppState } from '@client/store/app/action'
import { setUserState } from '@client/store/user/action'

// 获取博客数据
const getBlogData = async (store: IStore) => {
  const { app, blog } = store.getState()
  const [{ data: blogTagsList }, { data: latestBlogSubData }, { data: hotBlogSubData }, { data: visitorsCount }] = await Promise.all([
    api.blogTag.getBlogTags(),
    api.blog.getLatestBlogSubPage(),
    api.blog.getHotBlogSubPage(),
    api.common.getVisitorsCount()
  ])
  // 热门跟最新
  const list = [latestBlogSubData, hotBlogSubData]
  const index = config.blogMenuList.findIndex((item) => item.name === blog.blogTag)
  let total = 0
  if (index >= 0) {
    total = list[index].total
  }
  // 博客标签
  store.dispatch(
    setBlogState({
      blogTags: blogTagsList,
      hotBlogSubList: hotBlogSubData.list,
      latestBlogSubList: latestBlogSubData.list,
      blogTotal: total
    })
  )
  store.dispatch(
    setAppState({
      visitorsCount
    })
  )
  return
}

// 获取用户信息
const getUserInfo = async (store: IStore) => {
  const { data } = await api.user.getUserInfo()
  if (data) {
    store.dispatch(setUserState(data))
  }
  return
}

export default (store: IStore) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { app } = store.getState()
      if (app.loadedInitData) {
        return resolve(null)
      }
      await Promise.all([getBlogData(store), getUserInfo(store)])
      store.dispatch(
        setAppState({
          loadedInitData: true
        })
      )
      resolve(null)
    } catch (e) {
      store.dispatch(
        setAppState({
          loadedInitData: false
        })
      )
      reject(e)
    }
  })
}
