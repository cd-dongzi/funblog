import request from '@/utils/request'
import { Comment } from '@root/src/models/comment'

// 获取留言板数据分页
export const getCommentsPage = (params?: ApiParamsList<AnyObject>) => {
  return request.get<ResponseList<Comment>>('/comments', params)
}

// 新增留言
export const addComment = (params?: AnyObject) => {
  return request.post<ResponseData>('/comment', params)
}

// 回复留言
export const replyComment = (params?: AnyObject) => {
  return request.put<ResponseData>('/comment/reply', params)
}
