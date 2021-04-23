export const SET_USER_STATE = 'SET_USER_STATE'
export const CLEAR_USER_STATE = 'CLEAR_USER_STATE'

export interface UserState {
  name: string
  username: string
  roles: string[]
  _id: string
  github: string
}
