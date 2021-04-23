import React from 'react'
import ReactDom from 'react-dom'
import View from './view'

interface PreviewImgOption {
  src: string
}

let container: Element | null = null
const hide = () => {
  if (container) {
    container.parentNode?.removeChild(container)
    container = null
  }
}

const show = ({ src }: PreviewImgOption) => {
  container = document.createElement('div')
  document.body.appendChild(container)
  ReactDom.render(<View src={src} onClose={hide} />, container)
}

export default {
  show,
  hide
}
