export const UPDATE_NAVIGATION = 'UPDATE_NAVIGATION'
export const CLEAR_NAVIGATIONS = 'CLEAR_NAVIGATIONS'
export const SET_NAVIGATION_STATE = 'SET_NAVIGATION_STATE'

export interface NavigationState {
  navigations: { path: string; key: string }[]
}
