export interface Comment {
  _id: string
  userId: string
  content: string
  replyList: Partial<Comment>[]
  name: string
  url: string
  avatar: string
  floor: number
  createTime: string
  role: string[]
  questioner: Pick<Comment, 'name' | 'url' | 'avatar' | 'createTime' | 'role'>
}
