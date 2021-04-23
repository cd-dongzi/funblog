import { UserState, SET_USER_STATE, RESET_USER_STATE } from './type'
import { UserAction } from './action'

const INIT_STATE: UserState = {
  _id: '',
  name: '',
  email: '',
  url: '',
  token: ''
}

const user = (state = INIT_STATE, action: UserAction): UserState => {
  switch (action.type) {
    case SET_USER_STATE: {
      return {
        ...state,
        ...action.payload
      }
    }
    case RESET_USER_STATE: {
      return {
        ...INIT_STATE
      }
    }
    default:
      return state
  }
}

export default user
