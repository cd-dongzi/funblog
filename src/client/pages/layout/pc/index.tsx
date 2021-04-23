import React, { useState, useEffect, useRef } from 'react'
import { useScroll } from '@/hooks'
import { getOffsetTop } from '@/utils/dom'
import MainHeader from './header'

type Props = {
  children?: any
}
interface LayoutPC {
  (props: Props): JSX.Element | null
}

const LayoutPC: LayoutPC = ({ children }) => {
  const state = useRef({
    headerFixed: false
  })
  const [distanceHeight, setDistanceHeight] = useState(0)
  useScroll((scroll) => {
    let bol
    if (scroll > distanceHeight) {
      bol = true
    } else {
      bol = false
    }
    if (state.current.headerFixed !== bol) {
      state.current.headerFixed = bol
      if (bol) {
        document.querySelector('#main-header')?.classList.add('fixed')
      } else {
        document.querySelector('#main-header')?.classList.remove('fixed')
      }
    }
  })
  useEffect(() => {
    const child = document.querySelector('#main')?.firstElementChild
    if (!child) {
      return
    }
    const n = getOffsetTop(child) - (document.querySelector('#main-header') as Element).getBoundingClientRect().height
    setDistanceHeight(n)
  }, [])
  return (
    <>
      <MainHeader />
      {children}
    </>
  )
}

export default LayoutPC
