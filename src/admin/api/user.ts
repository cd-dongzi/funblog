import request from '@/utils/request'
import { UserSystem } from '@root/src/models/userSystem'

// 获取用户详情
export const getUserInfoByToken = () => {
  return request.get<ResponseData<UserSystem>>('/user/token')
}

// 登录
export const login = (params: Partial<UserSystem>) => {
  return request.post<ResponseData<UserSystem>>('/login', params)
}
