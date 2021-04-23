import { AppState, TagView, SET_APP_STATE, SET_APP_TAGVIEWS } from './type'

type TagViewParams = Partial<TagView> & {
  type?: 'add' | 'del'
}
type ISetAppState = IAction<typeof SET_APP_STATE, Partial<AppState>>
type ISetAppTagViews = IAction<typeof SET_APP_TAGVIEWS, TagViewParams>

export const setAppState = (state: Partial<AppState>): ISetAppState => {
  return {
    type: SET_APP_STATE,
    payload: state
  }
}

export const setAppTagViews = (tag: TagViewParams): ISetAppTagViews => {
  return {
    type: SET_APP_TAGVIEWS,
    payload: tag
  }
}

export type AppAction = ISetAppState | ISetAppTagViews
