import { useState, useRef } from 'react'
import { SideTitleItem } from '@/components'
import { setScrollTop } from '@/utils/dom'
import { useScroll } from '@/hooks'
import { getOffsetTop } from '@/utils/dom'

export const formatTagByHtml = (html: string) => {
  return html
    .replace(/<(h[1-2])(([\s\S])*?)<\/h[1-2]>/g, (el) => {
      return `
    <div class="banner-tag primary banner-tag__left">
      <div class="banner-tag__content">
        <div class="banner-tag__wrap">${el}</div>
      </div>
    </div>
    `
    })
    .replace(/<h3(([\s\S])*?)<\/h3>/g, (el) => {
      return `
    <div class="md-h3-container">
    ${el}
    </div>
    `
    })
}

export interface MdTitle {
  nodeName: string
  text: string
  id: string
  scrollTop: number
}
export const getMdTitleList = (container: Element, tags = 'h1, h2, h3'): MdTitle[] => {
  const nodeList = Array.from(container.querySelectorAll(tags))
  const headerH = (document.querySelector('.main-header')?.getBoundingClientRect().height || 0) + 15
  return nodeList.map((node: any) => ({
    nodeName: node.nodeName.toLocaleLowerCase(),
    text: node.innerText,
    id: node.id,
    scrollTop: getOffsetTop(document.getElementById(node.id) as Element) - headerH
  }))
}

// 获取渲染的标签list
export const getSideList = (list: MdTitle[]) => {
  return list.map((item) => {
    return {
      id: item.id,
      title: item.text,
      isSub: item.nodeName === 'h3'
    }
  })
}

// sidebar hook
export const useSidebar = (
  list: MdTitle[],
  fallback?: () => void
): [
  {
    id: string
    title: string
    isSub: boolean
  }[],
  number,
  (item: SideTitleItem) => void
] => {
  const state = useRef({
    isAnimate: false
  })
  const [activeIndex, setActiveIndex] = useState(0)
  const sideList = getSideList(list)
  const onChange = (item: SideTitleItem) => {
    const obj = list.find((v) => v.id === item.id) as MdTitle
    fallback && fallback()
    state.current.isAnimate = true
    setScrollTop(obj.scrollTop, {
      animate: true,
      complete: () => {
        state.current.isAnimate = false
      }
    })
  }
  useScroll((scrollTop) => {
    if (state.current.isAnimate) {
      return
    }
    const oldArr = list.map((item) => item.scrollTop)
    const arr = [...oldArr].reverse()
    const top = arr.find((top) => scrollTop > top)
    let index = oldArr.findIndex((t) => top === t) + 1
    index = index < 0 ? 0 : index
    index = index > oldArr.length - 1 ? oldArr.length - 1 : index
    setActiveIndex(index)
  })
  return [sideList, activeIndex, onChange]
}
