import { SET_PLAY_STATE, PlayState } from './type'
import { Play } from '@root/src/models/play'
import config from '@/config'
import { PlayAction } from './action'

const INIT_STATE: PlayState = {
  list: [],
  total: 0
}
const blog = (state = INIT_STATE, action: PlayAction): PlayState => {
  switch (action.type) {
    case SET_PLAY_STATE: {
      return {
        ...state,
        ...action.payload
      }
    }
    default:
      return state
  }
}

export default blog
