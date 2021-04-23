import { useRef } from 'react'

interface Options {
  el: HTMLElement
  rotationAngle?: number
  onSwipeLeft?: (e: React.TouchEvent) => void
  onSwipeRight?: (e: React.TouchEvent) => void
  // on: {
  //   swipeLeft?: (e: React.TouchEvent) => void
  //   swipeRight?: (e: React.TouchEvent) => void
  //   [k: string]: any
  // }
}

type Pos = {
  x: number
  y: number
}

function rotateXYByAngle(pos: Pos, angle = 0) {
  if (angle === 0) return pos
  const angleInRadians = (Math.PI / 180) * angle
  const x = pos.x * Math.cos(angleInRadians) + pos.y * Math.sin(angleInRadians)
  const y = pos.y * Math.cos(angleInRadians) - pos.x * Math.sin(angleInRadians)
  return {
    x,
    y
  }
}

export const useTouch = (options: Options) => {
  const state = useRef<{
    pos: Pos
  }>({
    pos: {
      x: 0,
      y: 0
    }
  })
  if (!options.el) {
    return
  }
  const attactEvent = (eventName: string, eventFn: any) => {
    options.el.addEventListener(eventName, eventFn)
  }

  const checkTouch = (e: React.TouchEvent) => {
    if (e.touches && e.touches.length > 1) {
      return false
    }
    return true
  }

  const onStart = (e: React.TouchEvent) => {
    if (!checkTouch(e)) return
    const { clientX, clientY } = e.touches[0]
    state.current.pos.x = clientX
    state.current.pos.y = clientY
    e.preventDefault()
  }
  const onMove = (e: React.TouchEvent) => {
    if (!checkTouch(e)) return
    const { clientX, clientY } = e.touches[0]
    e.preventDefault()
  }
  const onEnd = (e: React.TouchEvent) => {
    e.preventDefault()
  }

  attactEvent('touchstart', onStart)
  attactEvent('touchmove', onMove)
  attactEvent('touchend', onEnd)
}
