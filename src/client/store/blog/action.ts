import { SET_BLOG_STATE, BlogState } from './type'

type ISetBlogStateAction = IAction<typeof SET_BLOG_STATE, Partial<BlogState>>

// 设置blog state
export const setBlogState = (state: Partial<BlogState>): ISetBlogStateAction => {
  return {
    type: SET_BLOG_STATE,
    payload: state
  }
}

export type BlogAction = ISetBlogStateAction
