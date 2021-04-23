import { isPC, mobileType, browserType } from '@root/src/shared/utils'

const system = (isClient: boolean) => {
  if (isClient) {
    return {
      browserType: browserType(navigator.userAgent),
      mobileType: mobileType(navigator.userAgent),
      isPC: isPC(navigator.userAgent),
      appHost: `${document.location.protocol}//${document.location.host}`
    }
  }
  return {
    browserType: '',
    mobileType: '',
    isPC: true,
    appHost: ''
  }
}
export type System = ReturnType<typeof system>
export default system
