import React, { useCallback, useEffect, useRef, useState } from 'react'
import classnames from 'classnames'
import { useResize } from '@/hooks'
import { IStoreState } from '@/store'
import { useSelector } from 'react-redux'
import Bubble from './bubble'
import './style.less'

type Props = {
  width?: number
  height?: number
  cover?: string
  className?: string
  isBlur?: boolean
  direction?: 'vertical' | 'horizontal'
  interval?: number[]
  radius?: boolean
  shadow?: boolean
  refs?: any
}
interface BubbleCover {
  (props: Props): JSX.Element | null
}

const BubbleCover: BubbleCover = ({
  cover,
  className,
  isBlur = true,
  direction = 'vertical',
  interval,
  radius = true,
  shadow = true,
  refs
}) => {
  const containerRef = useRef<HTMLDivElement | null>()
  const ref = useRef<HTMLCanvasElement>(null)
  const app = useSelector((state: IStoreState) => state.app)
  const [ctx, setCtx] = useState<CanvasRenderingContext2D>()
  const [bubbles, setBubbles] = useState<Bubble[]>([])
  const [total, setTotal] = useState(0)
  const [canvas, setCanvas] = useState({
    width: 0,
    height: 0
  })
  // 画笔
  useEffect(() => {
    setCtx(ref.current?.getContext('2d') as CanvasRenderingContext2D)
  }, [])

  const setCanvasSize = useCallback(() => {
    const set = () => {
      if (containerRef.current) {
        const o = containerRef.current.getBoundingClientRect()
        setCanvas({
          width: o.width,
          height: o.height
        })
      }
    }
    // 手机端，旋转侧边栏动画完 500ms 在计算。因为perspective会导致高度变化
    if (app.layoutSize === 'small') {
      setTimeout(() => {
        set()
      }, 500)
    } else {
      set()
    }
  }, [app.layoutSize])

  // 赋值尺寸函数
  useEffect(() => {
    if (refs) {
      refs.current.setCanvasSize = setCanvasSize
    }
  }, [refs, setCanvasSize])
  useResize(setCanvasSize)
  useEffect(() => {
    setCanvasSize()
  }, [setCanvasSize])
  // 设置小球总数
  useEffect(() => {
    if (canvas.width > 0) {
      setTotal(Math.ceil(canvas.width * 0.04))
    }
  }, [canvas])
  // 实例化小球
  useEffect(() => {
    const arr: Bubble[] = []
    for (let i = 0; i < total; i++) {
      const b = new Bubble({
        width: canvas.width,
        height: canvas.height,
        direction,
        interval
      })
      arr.push(b)
    }
    setBubbles(arr)
  }, [canvas, total, direction, interval])
  const render = useCallback(() => {
    if (bubbles.length === 0 || !ctx) {
      return
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    bubbles.forEach((bubble) => {
      bubble.draw(ctx)
    })
    requestAnimationFrame(render)
  }, [ctx, bubbles, canvas])
  // 设置小球渲染
  useEffect(() => {
    render()
  }, [render])
  return (
    <div
      className={classnames([
        'bubble-cover',
        className,
        {
          'bubble-cover__radius': radius,
          'bubble-cover__shadow': shadow
        }
      ])}
      ref={(node) => (containerRef.current = node)}
    >
      <div
        className={classnames('bubble-cover__bg', {
          'bubble-cover__bg-blur': isBlur
        })}
      >
        {cover && (
          <div
            className="bubble-cover__bg-img"
            style={{
              backgroundImage: `url(${cover})`
            }}
          ></div>
        )}
      </div>
      <canvas className="bubble-cover__canvas" ref={ref} width={canvas.width} height={canvas.height}></canvas>
    </div>
  )
}

export default BubbleCover
