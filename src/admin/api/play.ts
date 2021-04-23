import request from '@/utils/request'
import { Play } from '@root/src/models/play'

// 新增实例
export const addPlay = (params: FormData) => {
  return request.post<ResponseData<Play>>('/play', params, {
    'Content-Type': 'multipart/form-data'
  })
}

// 获取实例详情
export const getPlay = (id: string) => {
  return request.get<ResponseData<Play>>(`/play/${id}`)
}

// 获取实例分页
export const getPlays = (params: AnyObject = {}) => {
  return request.get<ResponseList<Play>>('/plays', params)
}

// 编辑实例
export const updatePlay = (id: string, params: FormData) => {
  return request.put<ResponseData<Play>>(`/play/${id}`, params, {
    'Content-Type': 'multipart/form-data'
  })
}

// 删除实例
export const deletePlay = (id: string) => {
  return request.delete<ResponseData<Play>>(`/play/${id}`)
}
