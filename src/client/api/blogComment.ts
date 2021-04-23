import request from '@/utils/request'
import { Comment } from '@root/src/models/comment'

// 获取留言板数据分页
export const getBlogCommentsPage = (params?: ApiParamsList<AnyObject>) => {
  return request.get<ResponseList<Comment>>('/blogComments', params)
}

// 新增留言
export const addBlogComment = (params?: AnyObject) => {
  return request.post<ResponseData>('/blogComment', params)
}

// 回复留言
export const replyBlogComment = (params?: AnyObject) => {
  return request.put<ResponseData>('/blogComment/reply', params)
}
