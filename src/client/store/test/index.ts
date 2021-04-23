import { SET_LIST, SET_DELAY_LIST, SET_PAGELOADING, TestState } from './type'
import { TestAction } from './action'

const INIT_STATE: TestState = {
  list: [],
  delayList: [],
  pageLoading: false
}
const test = (state = INIT_STATE, action: TestAction): TestState => {
  switch (action.type) {
    case SET_LIST:
      return {
        ...state,
        list: action.payload
      }
    case SET_DELAY_LIST:
      return {
        ...state,
        delayList: action.payload
      }
    case SET_PAGELOADING:
      return {
        ...state,
        pageLoading: action.payload
      }
    default:
      return state
  }
}

export default test
