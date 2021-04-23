import { IStore } from '@/store'
import { notification, previewImg } from '@/components'
import { copyTextByDom } from '@/utils/app'
import hidden from './windowHidden'
import resize from './windowrResize'
import initStoreState from './initStoreState'
// import './errorMonitoring'

// 设置live2d默认值
// function setLive2d(store) {
//   store.state.live2d.showLive2d = Session.get(config.keys.live2dShowStatus) !== 'hidden'
//   // 获取模型id
//   const val = Session.get(config.keys.live2DKey)
//   if (val) {
//     const arr = val.split('-') || []
//     store.commit('SET_MODELID_AND_TEXTURESID', {
//       modelId: arr[0],
//       texturesId: arr[1]
//     })
//   }
// }

// 复制代码
const copyCode = () => {
  copyTextByDom('copy-code-btn', {
    deep: true,
    success: () => {
      notification.stack.show('代码复制成功~')
    },
    error: () => {
      notification.stack.show('代码复制失败~')
    }
  })
}

// 预览markdown图片
const previewImageByMd = () => {
  document.body.addEventListener('click', (e) => {
    const target = e.target as HTMLImageElement
    if (target.className === 'preview-image') {
      const src = target.src
      previewImg.show({
        src
      })
    }
  })
}
export const globalFn = () => {
  // hidden()
  copyCode()
  previewImageByMd()
}

export const globalFnByStore = (store: IStore) => {
  resize(store)
  initStoreState(store)
}
