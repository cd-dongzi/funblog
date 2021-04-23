import { UserState, SET_USER_STATE, CLEAR_USER_STATE } from './type'
import { UserAction } from './action'

const INIT_STATE: UserState = {
  username: '',
  roles: [],
  github: '',
  _id: ''
}
const user = (state = { ...INIT_STATE }, action: UserAction): UserState => {
  switch (action.type) {
    case SET_USER_STATE: {
      return {
        ...state,
        ...action.payload
      }
    }
    case CLEAR_USER_STATE: {
      return { ...INIT_STATE }
    }
    default:
      return state
  }
}

export default user
