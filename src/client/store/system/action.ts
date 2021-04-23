import { SET_SYSTEM_STATE, SystemState } from './type'

type ISetSystemState = IAction<typeof SET_SYSTEM_STATE, Partial<SystemState>>

export const setSystemState = (state: Partial<SystemState>): ISetSystemState => {
  return {
    type: SET_SYSTEM_STATE,
    payload: state
  }
}

export type SystemAction = ISetSystemState
