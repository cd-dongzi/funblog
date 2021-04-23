import request from '@/utils/request'

// google oauth
export const getUrlByGoogleOAuth = () => {
  return request.get<ResponseData>('/user/oauth/google/url')
}
