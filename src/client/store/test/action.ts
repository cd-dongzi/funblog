import { List, DelayList, SET_DELAY_LIST, SET_LIST, SET_PAGELOADING } from './type'

type ISetListAction = IAction<typeof SET_LIST, List>
type ISetDelayListAction = IAction<typeof SET_DELAY_LIST, DelayList>
type ISetPageLoadingAction = IAction<typeof SET_PAGELOADING, boolean>

export const setList = (list: List): ISetListAction => {
  return {
    type: SET_LIST,
    payload: list
  }
}
export const setDelayList = (delayList: DelayList): ISetDelayListAction => {
  return {
    type: SET_DELAY_LIST,
    payload: delayList
  }
}
export const setPageLoading = (pageLoading: boolean): ISetPageLoadingAction => {
  return {
    type: SET_PAGELOADING,
    payload: pageLoading
  }
}

export type TestAction = ISetListAction | ISetDelayListAction | ISetPageLoadingAction
