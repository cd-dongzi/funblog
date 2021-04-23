import { useCallback, useEffect, useRef } from 'react'
import { getScrollTop } from '@/utils/dom'

type Callback = (scroll: number) => void
interface UseScrollParams {
  maxThreshold?: number
}
export const useScroll = (callback: Callback, { maxThreshold }: UseScrollParams = {}) => {
  const ref = useRef({
    scroll: 0
  })
  const onScroll = useCallback(() => {
    let top = getScrollTop()
    if (maxThreshold && top > maxThreshold) {
      top = maxThreshold
    }
    if (ref.current.scroll != top) {
      ref.current.scroll = top
      callback && callback(top)
    }
  }, [maxThreshold, callback])
  useEffect(() => {
    onScroll()
    window.addEventListener('scroll', onScroll, false)
    return () => {
      return window.removeEventListener('scroll', onScroll, false)
    }
  }, [onScroll])
}
