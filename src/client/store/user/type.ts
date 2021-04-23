import { User } from '@root/src/models/user'
export const SET_USER_STATE = 'SET_USER_STATE'
export const RESET_USER_STATE = 'RESET_USER_STATE'

export type UserState = {
  _id?: string
  token?: string
  name?: string
  email?: string
  url?: string
  role?: string[]
  ip?: string
  userAgent?: string
  system?: any
  location?: any
}
