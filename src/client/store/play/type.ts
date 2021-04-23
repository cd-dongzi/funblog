import { Play } from '@root/src/models/play'
export const SET_PLAY_STATE = 'SET_PLAY_STATE'

export interface PlayState {
  list: Play[]
  total: number
}
