import { BlogTag } from '@root/src/models/blogTag'
import { IStoreState } from '@/store'
import React, { useRef } from 'react'
import { useSelector } from 'react-redux'
import classnames from 'classnames'
import { BubbleCover } from '@/appComponents'
import AppBannerPC from './pc'
import AppBannerMobile from './mobile'
import './style.less'

type Props = {
  cover?: string
  title?: string
  desc?: string
  tags?: BlogTag[]
  showCover?: boolean
  custom?: boolean
  children?: any
  direction?: 'vertical' | 'horizontal'
  interval?: number[]
}
interface AppBanner {
  (props: Props): JSX.Element | null
}

const AppBanner: AppBanner = ({ children, cover, showCover = false, custom = false, direction, interval, ...props }) => {
  const ref = useRef<HTMLDivElement>(null)
  const bubbleRef = useRef<any>({})
  const app = useSelector((state: IStoreState) => state.app)
  // 因为transition的动画计算问题
  const onTransitionEnd = () => {
    bubbleRef.current.setCanvasSize()
  }
  const hasSmall = app.layoutSize === 'small'
  return (
    <div
      ref={ref}
      className={classnames('app-banner', {
        small: !showCover
      })}
      onTransitionEnd={onTransitionEnd}
    >
      {custom ? (
        children
      ) : !hasSmall ? (
        <AppBannerPC {...props} cover={cover} showCover={showCover}>
          {children}
        </AppBannerPC>
      ) : (
        <AppBannerMobile {...props} cover={cover} showCover={showCover}>
          {children}
        </AppBannerMobile>
      )}
      <BubbleCover refs={bubbleRef} isBlur={showCover} cover={cover} radius={!hasSmall} interval={interval} direction={direction} />
    </div>
  )
}

export default AppBanner
