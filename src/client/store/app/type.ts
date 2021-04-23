export const SET_IS_SERVER_RENDER = 'SET_IS_SERVER_RENDER'
export const SERVER_RENDER_PAGE_NAME = 'SERVER_RENDER_PAGE_NAME'
export const SET_SCREEN_SIZE = 'SET_SCREEN_SIZE'
export const SET_APP_STATE = 'SET_APP_STATE'

export interface AppState {
  layoutPageLoaded: boolean
  pageLoaded: boolean
  // 初始数据获取
  loadedInitData: boolean
  isServerRender: boolean
  serverRenderPageName: string
  screenSize: string
  layoutSize: string
  viewSize: string
  showLoginBox: boolean
  // 游客数量
  visitorsCount: number
}
