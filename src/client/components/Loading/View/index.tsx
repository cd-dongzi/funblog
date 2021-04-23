import React from 'react'
import ReactDom from 'react-dom'
import ViewLoading, { ViewLoadingProps, Props } from './main'

let container: Element | null = null

ViewLoading.show = (props: Props) => {
  container = document.createElement('div')
  document.body.appendChild(container)
  ReactDom.render(<ViewLoading {...props} />, container)
}
ViewLoading.hide = () => {
  if (container) {
    container.parentNode?.removeChild(container)
    container = null
  }
}
ViewLoading.action = (action: Promise<any>, props: Props) => {
  return new Promise(async (resolve, reject) => {
    try {
      ViewLoading.show(props)
      const data = await action
      resolve(data)
      ViewLoading.hide()
    } catch (e) {
      ViewLoading.hide()
      reject(e)
    }
  })
}
export default ViewLoading as ViewLoadingProps & { action: any }
