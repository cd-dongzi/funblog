import { useEffect } from 'react'

type ResizeFn = (width: number) => void
export const useResize = (fn: ResizeFn) => {
  useEffect(() => {
    const onResize = () => {
      const doc = document.documentElement || document.body
      const width = doc.clientWidth
      fn && fn(width)
    }
    window.addEventListener('resize', onResize, false)
    return () => {
      window.removeEventListener('resize', onResize, false)
    }
  }, [fn])
}
