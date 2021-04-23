import { Comment } from '@root/src/models/comment'
export const SET_COMMENT_STATE = 'SET_COMMENT_STATE'

export interface CommentState {
  commentList: Comment[]
  commentTotal: number
}
