import config from '@/config'
import { Session } from '@/utils/cache'
import { NavigationState, UPDATE_NAVIGATION, CLEAR_NAVIGATIONS, SET_NAVIGATION_STATE } from './type'
import { NavigationAction } from './action'

const navigationKey = config.keys.navigationKey

const INIT_STATE: NavigationState = {
  navigations: []
}

const navigation = (state = INIT_STATE, action: NavigationAction): NavigationState => {
  switch (action.type) {
    case SET_NAVIGATION_STATE: {
      return {
        ...state,
        ...action.payload
      }
    }
    case UPDATE_NAVIGATION: {
      const payload = action.payload
      let navigations = [...state.navigations]
      const index = navigations.findIndex((p) => p.key === payload.key)
      // 存在相同路径,删除并push
      if (index > -1) {
        navigations = navigations.slice(0, index + 1)
      } else {
        navigations.push(payload)
      }
      Session.set(navigationKey, navigations)
      return {
        ...state,
        navigations
      }
    }
    case CLEAR_NAVIGATIONS: {
      return {
        ...state,
        navigations: []
      }
    }
    default:
      return state
  }
}

export default navigation
