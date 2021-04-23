import request from '@/utils/request'
import { Github } from '@root/src/models/github'
// 新增Github
export const addGithub = (params: Partial<Github>) => {
  return request.post<ResponseData<Github>>('/github', params)
}

// 获取Github项目详情
export const getRepoInfoByGithub = (id: string) => {
  return request.get<ResponseData<AnyObject>>(`/github/repo/${id}`)
}

// 获取Github分页
export const getGithubs = (params: AnyObject = {}) => {
  return request.get<ResponseList<Github>>('/githubs', params)
}

// 编辑Github
export const updateGithub = (id: string, params: Partial<Github>) => {
  return request.put<ResponseData<Github>>(`/github/${id}`, params)
}

// 删除Github
export const deleteGithub = (id: string) => {
  return request.delete<ResponseData<Github>>(`/github/${id}`)
}

// 排序
export const sortGithubs = (params: AnyObject[]) => {
  return request.put<ResponseData<Github>>(`/githubs/sort`, params)
}
