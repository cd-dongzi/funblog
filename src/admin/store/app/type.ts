export const SET_APP_STATE = 'SET_APP_STATE'
export const SET_APP_TAGVIEWS = 'SET_APP_TAGVIEWS'

export type TagView = {
  name: string
  path: string
}
export interface AppState {
  collapsed: boolean
  layoutSize: string
  tagViews: TagView[]
}
