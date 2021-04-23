import { SET_PLAY_STATE, PlayState } from './type'

type ISetPlayStateAction = IAction<typeof SET_PLAY_STATE, Partial<PlayState>>

// 设置blog state
export const setPlayState = (state: Partial<PlayState>): ISetPlayStateAction => {
  return {
    type: SET_PLAY_STATE,
    payload: state
  }
}

export type PlayAction = ISetPlayStateAction
