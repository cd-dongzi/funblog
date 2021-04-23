import { useEffect } from 'react'

export type Options = {
  show: boolean
  disabledScroll?: boolean
  maskEl?: HTMLElement | null
  contentEl?: HTMLElement | null
}
export const useDisabledScrollByMask = ({ show, disabledScroll = true, maskEl, contentEl }: Options = {} as Options) => {
  // document.body 滚动禁止
  useEffect(() => {
    if (disabledScroll) {
      if (show) {
        document.body.classList.add('disabled-scroll')
      } else {
        document.body.classList.remove('disabled-scroll')
      }
    }
    return () => {
      if (disabledScroll) {
        document.body.classList.remove('disabled-scroll')
      }
    }
  }, [disabledScroll, show])

  // 遮罩层禁止滚动
  useEffect(() => {
    if (disabledScroll && maskEl) {
      maskEl.addEventListener('touchmove', (e) => {
        e.preventDefault()
      })
    }
  }, [disabledScroll, maskEl])
  // 内容禁止滚动
  useEffect(() => {
    if (disabledScroll && contentEl) {
      const children = contentEl.children
      const target = (children.length === 1 ? children[0] : contentEl) as HTMLElement
      let targetY = 0
      let hasScroll = false
      target.addEventListener('touchstart', (e) => {
        targetY = e.targetTouches[0].clientY
        const scrollH = target.scrollHeight
        const clientH = target.clientHeight
        hasScroll = scrollH - clientH > 0
      })
      target.addEventListener('touchmove', (e) => {
        if (!hasScroll) {
          return e.cancelable && e.preventDefault()
        }
        const newTargetY = e.targetTouches[0].clientY
        const distanceY = newTargetY - targetY
        const scrollTop = target.scrollTop
        const scrollH = target.scrollHeight
        const clientH = target.clientHeight
        if (distanceY > 0 && scrollTop <= 0) {
          // 下拉到顶
          return e.cancelable && e.preventDefault()
        }
        if (distanceY < 0 && scrollTop >= scrollH - clientH) {
          // 上拉到底
          return e.cancelable && e.preventDefault()
        }
      })
    }
  }, [disabledScroll, contentEl])
}
