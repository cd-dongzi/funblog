import { SET_COMMENT_STATE, CommentState } from './type'

type ISetCommentStateAction = IAction<typeof SET_COMMENT_STATE, Partial<CommentState>>

// 设置comment state
export const setCommentState = (state: Partial<CommentState>): ISetCommentStateAction => {
  return {
    type: SET_COMMENT_STATE,
    payload: state
  }
}

export type CommentAction = ISetCommentStateAction
