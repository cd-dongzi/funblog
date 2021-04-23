import ClipboardJS from 'clipboard'
import rootConfig from '@root/src/shared/config'

// 是否能使用dom
export const canUseDom = () => {
  return !!(typeof window !== 'undefined' && window.document && window.document.createElement)
}
// 设置标题
export const setTitle = (val?: string) => {
  return val || rootConfig.head.title
}

// 设置标题
export const setKeywords = (val?: string) => {
  return val || rootConfig.head.meta.keywords
}
// 设置标题
export const setDescription = (val?: string) => {
  return val || rootConfig.head.meta.description
}
// 设置head
export const headCore = {
  setTitle,
  setKeywords,
  setDescription
}

// 复制文本
export const copyTextByDom = (
  selector: string,
  {
    success,
    deep = false,
    error
  }: {
    success: (e: ClipboardJS.Event) => void
    deep?: boolean
    error?: (e: ClipboardJS.Event) => void
  }
) => {
  let clipboard
  if (deep) {
    clipboard = new ClipboardJS(`.${selector}`, {
      text: (el: any) => {
        let div = el.parentNode.cloneNode(true)
        div.style.display = 'none'
        div.style.opacity = 0
        div.style.whiteSpace = 'pre-wrap'
        div.children.forEach((node: any) => {
          if (node.className === selector) {
            div.removeChild(node)
          }
        })
        const text = div.innerText
        div = null
        return text
      }
    })
  } else {
    clipboard = new ClipboardJS(`.${selector}`, {
      text: (el: any) => {
        return el.innerText
      }
    })
  }
  clipboard.on('success', success)
  clipboard.on('error', (e) => {
    error && error(e)
  })
}
