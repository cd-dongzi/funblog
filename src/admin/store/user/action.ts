import { UserState, SET_USER_STATE, CLEAR_USER_STATE } from './type'

type ISetUserState = IAction<typeof SET_USER_STATE, Partial<UserState>>
type IClearUserState = IAction<typeof CLEAR_USER_STATE, null>

export const setUserState = (state: Partial<UserState>): ISetUserState => {
  return {
    type: SET_USER_STATE,
    payload: state
  }
}

export const clearUserState = (): IClearUserState => {
  return {
    type: CLEAR_USER_STATE,
    payload: null
  }
}

export type UserAction = ISetUserState | IClearUserState
