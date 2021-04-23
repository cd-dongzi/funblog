import { UserState, SET_USER_STATE, RESET_USER_STATE } from './type'

type ISetUserState = IAction<typeof SET_USER_STATE, Partial<UserState>>
type IResetUserState = IAction<typeof RESET_USER_STATE>

// 更新用户信息
export const setUserState = (payload: Partial<UserState>): ISetUserState => {
  return {
    type: SET_USER_STATE,
    payload: payload
  }
}
// 重置用户信息
export const resetUserState = (): IResetUserState => {
  return {
    type: RESET_USER_STATE,
    payload: null
  }
}
export type UserAction = ISetUserState | IResetUserState
