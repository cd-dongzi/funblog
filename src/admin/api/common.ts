import request from '@/utils/request'

// 获取游客数量
export const getVisitorsCount = () => {
  return request.get<ResponseData<number>>('/common/visitors/count')
}

// 获取游客数量
export const getUsersCount = () => {
  return request.get<ResponseData<number>>('/common/users/count')
}

// 获取游客数量
export const getBlogsCount = () => {
  return request.get<ResponseData<number>>('/common/blogs/count')
}

// 获取游客数量
export const getCommentsCount = () => {
  return request.get<ResponseData<number>>('/common/comments/count')
}

// 获取游客数量
export const getsystemParams = () => {
  return request.get<ResponseData<AnyObject>>('/common/systemParams')
}
