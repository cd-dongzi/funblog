import { clearUserState } from '@/store/user/action'
import store from '@/store'
import { Cookie } from '@/utils/cache'
import rootConfig from '@root/src/shared/config'
import { history } from '@/router'

// 登出
export const signOut = () => {
  Cookie.remove(rootConfig.adminTokenKey)
  store.dispatch(clearUserState())
  history.push('/login')
}

// 获取base64
export const getBase64ByFile = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (error) => reject(error)
  })
}
