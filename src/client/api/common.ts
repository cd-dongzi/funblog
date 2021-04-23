import request from '@/utils/request'
import { Github } from '@root/src/models/github'

// 获取游客数量
export const getVisitorsCount = () => {
  return request.get<ResponseData<number>>('/common/visitors/count')
}

// 获取github项目
export const getReposByGithub = () => {
  return request.get<ResponseData<Github[]>>('/github/repos')
}
