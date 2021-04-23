import config from '@/config'
// rem适配
export default (doc = document) => {
  const widthScale = config.app.widthScale
  const docEl = doc.documentElement
  const refresh = function () {
    let w = docEl.clientWidth
    const bodyW = document.getElementsByTagName('body')[0].clientWidth
    w = w > bodyW ? bodyW : w
    const rem = 100 * (w / widthScale) + 'px'
    docEl.style.fontSize = rem
    function setBodyFontSize() {
      if (doc.body) {
        doc.body.style.fontSize = '14px'
      } else {
        doc.addEventListener('DOMContentLoaded', refresh)
      }
    }
    function correctPx() {
      if (!w || w > 768) return
      const div = document.createElement('div')
      div.style.width = '1rem'
      div.style.height = '0'
      document.body.appendChild(div)
      const ideal = (100 * w) / widthScale
      const rmd = div.clientWidth / ideal
      if (rmd > 1.2 || rmd < 0.8) {
        docEl.style.fontSize = parseInt(rem) / rmd + 'px'
      }
      document.body.removeChild(div)
    }
    setBodyFontSize()
    correctPx()
  }
  refresh()
}
