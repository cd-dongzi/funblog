import { SystemState, SET_SYSTEM_STATE } from './type'
import { SystemAction } from './action'

const INIT_STATE: SystemState = {
  browserType: 'Chrome',
  mobileType: 'none',
  isPC: true,
  appHost: ''
}

const system = (state = INIT_STATE, action: SystemAction): SystemState => {
  switch (action.type) {
    case SET_SYSTEM_STATE: {
      return {
        ...state,
        ...action.payload
      }
    }
    default:
      return state
  }
}

export default system
