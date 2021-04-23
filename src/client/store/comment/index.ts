import { CommentAction } from './action'
import { CommentState, SET_COMMENT_STATE } from './type'

const INIT_STATE: CommentState = {
  commentList: [],
  commentTotal: 0
}
const blog = (state = INIT_STATE, action: CommentAction): CommentState => {
  switch (action.type) {
    case SET_COMMENT_STATE: {
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
