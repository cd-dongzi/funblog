import { NavigationState, UPDATE_NAVIGATION, CLEAR_NAVIGATIONS, SET_NAVIGATION_STATE } from './type'

type PathObj = {
  path: string
  key: string
}

type IUpdateNavigation = IAction<typeof UPDATE_NAVIGATION, PathObj>
type IClearNavigations = IAction<typeof CLEAR_NAVIGATIONS>
type ISetNavigationState = IAction<typeof SET_NAVIGATION_STATE>

// 更新state
export const setNavigationState = (state: Partial<NavigationState>): ISetNavigationState => {
  return {
    type: SET_NAVIGATION_STATE,
    payload: state
  }
}

// 更新导航
export const updateNaviagtion = (pathObj: PathObj): IUpdateNavigation => {
  return {
    type: UPDATE_NAVIGATION,
    payload: pathObj
  }
}

// 清除导航记录
export const clearNaviagtions = (): IClearNavigations => {
  return {
    type: CLEAR_NAVIGATIONS,
    payload: null
  }
}

export type NavigationAction = IUpdateNavigation | IClearNavigations | ISetNavigationState
