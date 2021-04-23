import TWEEN from '@tweenjs/tween.js'

interface AnimateParams<T> {
  start: T
  end: T
  duration?: number
  onUpdate: (data: T) => void
}
const animate = <T>({ start, end, duration = 500, onUpdate }: AnimateParams<T>) => {
  let bol = false
  const tween = new TWEEN.Tween(start)
  tween
    .to(end, duration)
    .easing(TWEEN.Easing.Cubic.Out)
    .onUpdate(onUpdate)
    .onComplete(() => {
      bol = true
    })
    .start()

  const anima = () => {
    if (bol) {
      return
    }
    requestAnimationFrame(anima)
    tween.update()
  }

  anima()
}

export default animate
