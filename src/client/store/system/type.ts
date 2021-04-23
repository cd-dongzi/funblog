export const SET_SYSTEM_STATE = 'SET_SYSTEM_STATE'
export type Browser = 'IE7以下' | 'IE7' | 'IE8' | 'IE9' | 'IE10' | 'IE11' | 'Edge' | 'FF' | 'Opera' | 'Safari' | 'Chrome'
export type Mobile = 'Android' | 'iPhone' | 'iPad' | 'Windows Phone' | 'none'
export interface SystemState {
  browserType: Browser
  mobileType: Mobile
  isPC: boolean
  appHost: string
}
