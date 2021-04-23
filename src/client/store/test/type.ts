export const SET_LIST = 'SET_LIST'
export const SET_DELAY_LIST = 'SET_DELAY_LIST'
export const SET_PAGELOADING = 'SET_PAGELOADING'

export type List = AnyObject[]
export type DelayList = AnyObject[]
export interface TestState {
  list: List
  delayList: DelayList
  pageLoading: boolean
}
