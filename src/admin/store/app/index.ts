import { Session } from '@/utils/cache'
import config from '@/config'
import { AppState, SET_APP_STATE, SET_APP_TAGVIEWS } from './type'
import { AppAction } from './action'

const INIT_STATE: AppState = {
  collapsed: false,
  layoutSize: 'large',
  tagViews: Session.get(config.cacheKeyMap.tabViews) || []
}
const app = (state = INIT_STATE, action: AppAction): AppState => {
  switch (action.type) {
    case SET_APP_STATE: {
      return {
        ...state,
        ...action.payload
      }
    }
    case SET_APP_TAGVIEWS: {
      const { type, path, name } = action.payload
      if (!path) {
        return { ...state }
      }
      let list = state.tagViews
      if (type === 'add' && name && list.every((tag) => tag.path !== path)) {
        list.push({
          path,
          name
        })
      }
      if (type === 'del') {
        list = list.filter((tag) => tag.path !== path)
      }
      Session.set(config.cacheKeyMap.tabViews, list)
      return {
        ...state,
        tagViews: [...list]
      }
    }
    default:
      return state
  }
}

export default app
