import { BlogTag } from './blogTag'
export interface BlogSub {
  desc: string
  github: string
  cover: string
  source: string
  title: string
  tags: BlogTag[]
  isVisible: boolean
  like_nums: number
  comment_nums: number
  read_nums: number
  updateTime: string
  createTime: string
  _id: string
}

export interface Blog extends BlogSub {
  md: string
  html: string
  hasLike?: boolean
}
