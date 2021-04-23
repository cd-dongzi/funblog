import remSetting from './rem'
import { IStore } from '@/store'
import config from '@/config'
import { setScreenSize } from '@/store/app/action'

export const setScreen = (store: IStore) => {
  const doc = document.documentElement || document.body
  const width = doc.clientWidth
  const sizes = config.screen.sizes
  const size = sizes.find((item) => width >= item.width)?.size as string
  store.dispatch(setScreenSize(size))
}

export default (store: IStore) => {
  function init() {
    remSetting()
    setScreen(store)
  }

  init()
  // 窗口宽度变化
  const resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
  window.addEventListener(resizeEvt, init, false)
}
