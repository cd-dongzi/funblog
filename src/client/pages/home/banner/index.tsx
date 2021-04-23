import React, { useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useSelector } from 'react-redux'
import { IStoreState } from '@/store'
import { AppBanner } from '@/appComponents'
import SwiperCore, { EffectCoverflow, Pagination } from 'swiper'
import BoxPC from './pc'
import BoxMobile from './mobile'
import ImageSwiper from './imageSwiper'
import 'swiper/swiper.less'
import './style.less'

SwiperCore.use([EffectCoverflow, Pagination])

type Props = unknown
interface HomeBanner {
  (props: Props): JSX.Element | null
}

const HomeBanner: HomeBanner = () => {
  const ref = useRef<HTMLDivElement | null>(null)
  const swiper = useRef<SwiperCore>()
  const swiperRef = useRef<SwiperCore>()
  const app = useSelector((state: IStoreState) => state.app)
  const blog = useSelector((state: IStoreState) => state.blog)
  const [index, setIndex] = useState(0)
  useEffect(() => {
    swiper.current && swiper.current.update()
  }, [app.layoutSize])

  const onSlideNextTransitionStart = (swiper: SwiperCore) => {
    setIndex(swiper.realIndex)
    swiperRef.current && swiperRef.current.slideNext()
  }
  const onSlidePrevTransitionStart = (swiper: SwiperCore) => {
    setIndex(swiper.realIndex)
    swiperRef.current && swiperRef.current.slidePrev()
  }
  const current = blog.hotBlogSubList[index]
  // 小屏幕
  const isSmall = app.layoutSize === 'small'
  return (
    <div id="home-banner" className="home-banner-container" ref={ref}>
      <AppBanner custom showCover cover={current && current.cover}>
        <Swiper
          className="home-banner-swiper"
          pagination={{
            el: '.banner-swiper-pagination'
          }}
          onSwiper={(swipe) => (swiper.current = swipe)}
          onSlideNextTransitionStart={(swiper) => onSlideNextTransitionStart(swiper)}
          onSlidePrevTransitionStart={(swiper) => onSlidePrevTransitionStart(swiper)}
          loop
          longSwipesRatio={0.2}
          followFinger={false}
        >
          {blog.hotBlogSubList.map((item) => (
            <SwiperSlide key={item.title}>{!isSmall ? <BoxPC item={item} /> : <BoxMobile item={item} />}</SwiperSlide>
          ))}
        </Swiper>
        {isSmall && <ImageSwiper list={blog.hotBlogSubList} onSwiper={(swiper) => (swiperRef.current = swiper)} />}
      </AppBanner>
    </div>
  )
}

export default HomeBanner
