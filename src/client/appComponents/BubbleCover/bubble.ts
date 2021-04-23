import { createBubble } from './utils'

export interface Option {
  x: number
  y: number
  r: number
  alpha: number
  y_speed: number
  x_speed: number
  alpha_speed: number
}

export interface Base {
  width: number
  height: number
  direction?: 'vertical' | 'horizontal'
  interval?: number[]
}

export default class Bubble {
  maxWidth: number
  maxHeight: number
  x = 0
  y = 0
  r = 0
  alpha = 0
  y_speed = 0
  x_speed = 0
  alpha_speed = 0
  direction: 'vertical' | 'horizontal'
  interval?: number[]
  constructor({ width, height, direction = 'vertical', interval }: Base) {
    this.maxWidth = width
    this.maxHeight = height
    this.direction = direction
    this.interval = interval
    this.init(
      createBubble({
        width: this.maxWidth,
        height: this.maxHeight,
        direction,
        interval
      })
    )
  }

  init({ x, y, r, alpha, y_speed, x_speed, alpha_speed }: Option) {
    this.x = x
    this.y = y
    this.r = r
    this.alpha = alpha
    this.y_speed = y_speed
    this.x_speed = x_speed
    this.alpha_speed = alpha_speed
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`
    ctx.fill()
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.alpha <= 0) {
      this.init(
        createBubble({
          width: this.maxWidth,
          height: this.maxHeight,
          direction: this.direction,
          interval: this.interval
        })
      )
    }
    if (this.direction === 'vertical') {
      this.y -= this.y_speed
    }
    if (this.direction === 'horizontal') {
      this.x += this.x_speed
    }
    this.alpha -= this.alpha_speed
    this.render(ctx)
  }
}
