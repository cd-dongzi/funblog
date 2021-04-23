import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle, useCallback } from 'react'
import classnames from 'classnames'
import { useScroll } from '@/hooks'
import { getOffsetTop } from '@/utils/dom'
import './style.less'

type Props = {
  className?: string
  contentClass?: string
  children: any
}
interface SidebarRef {
  onReset: () => void
}

const SidebarContainer = forwardRef<SidebarRef, Props>(({ className, contentClass, children }, ref) => {
  const sideRef = useRef<HTMLElement | null>(null)
  const stateRef = useRef({
    maxHeight: '',
    fixed: false
  })
  const [width, setWidth] = useState(0)
  const onReset = useCallback(() => {
    if (contentClass) {
      const contentObj = document.querySelector(`.${contentClass}`) as HTMLDivElement
      contentObj.style.minHeight = `auto`
      const contentH = contentObj?.clientHeight || 0
      const sidebarH = document.querySelector('.sidebar-wrapper')?.clientHeight || 0
      if (contentH < sidebarH && contentObj) {
        contentObj.style.minHeight = `${sidebarH}px`
      }
    }
  }, [contentClass])
  useImperativeHandle(ref, () => ({
    onReset
  }))

  // 定位
  useScroll((scrollTop) => {
    if (!sideRef.current) return
    const sidebarTop = getOffsetTop(sideRef.current)
    const sidebarChild = sideRef.current.querySelector('.sidebar-wrapper') as HTMLElement
    const headerH = document.querySelector('#main-header')?.getBoundingClientRect().height as number
    const footerH = document.querySelector('.main-footer')?.getBoundingClientRect().height as number
    const isFixed = scrollTop >= sidebarTop - headerH
    const distance = document.body.scrollHeight - (document.documentElement.clientHeight + scrollTop + footerH)
    let maxHeight = ''
    if (distance < 0) {
      maxHeight = `calc(100% - var(--large_header_height) - ${Math.abs(distance)}px)`
    } else {
      maxHeight = `calc(100% - var(--large_header_height))`
    }
    if (stateRef.current.maxHeight !== maxHeight) {
      sidebarChild.style.maxHeight = stateRef.current.maxHeight = maxHeight
    }
    if (isFixed === stateRef.current.fixed) return
    stateRef.current.fixed = isFixed
    if (isFixed) {
      sideRef.current.querySelector('.sidebar-wrapper')?.classList.add('fixed')
    } else {
      sideRef.current.querySelector('.sidebar-wrapper')?.classList.remove('fixed')
    }
  })
  useEffect(() => {
    onReset()
  }, [onReset])
  useEffect(() => {
    setWidth(sideRef.current?.clientWidth || 0)
  }, [])
  let style = {}
  if (width) {
    style = {
      width: `${width}px`
    }
  }
  return (
    <aside className={classnames('sidebar-container', className)} ref={sideRef}>
      <div className={classnames('sidebar-wrapper')} style={style}>
        {children}
      </div>
    </aside>
  )
})

export { SidebarContainer, SidebarRef }
