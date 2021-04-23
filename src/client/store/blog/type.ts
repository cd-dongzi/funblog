import { BlogSub, Blog } from '@root/src/models/blog'
import { BlogTag } from '@root/src/models/blogTag'
import { Comment } from '@root/src/models/comment'
export const SET_BLOG_STATE = 'SET_BLOG_STATE'

export type BlogSubList = BlogSub[]
export interface BlogState {
  blogTag: string
  blogTotal: number
  blogTags: BlogTag[]
  blogSubList: BlogSubList
  hotBlogSubList: BlogSubList
  latestBlogSubList: BlogSubList
  currentBlogInfo: Blog
  search: {
    list: BlogSubList
    total: number
  }
  blogClassify: {
    list: BlogSubList
    total: number
  }
  archive: {
    times: Record<number | string, number[]>
    list: BlogSub[]
    total: number
    year: number | string
    month: number | string
  }
  blogComment: {
    list: Comment[]
    total: number
  }
}
