import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore from 'swiper'
import classnames from 'classnames'
import { BlogSub } from '@root/src/models/blog'
import './style.less'

type Props = {
  list: BlogSub[]
  onSwiper: (swiper: SwiperCore) => void
  className?: string
}
interface ImageSwiper {
  (props: Props): JSX.Element | null
}

const ImageSwiper: ImageSwiper = ({ list, onSwiper, className }) => {
  const onInit = (swiper: SwiperCore) => {
    const slides = swiper.slides
    for (let i = 0; i < slides.length; i++) {
      const slide = slides.eq(i)
      slide.css('zIndex', 100 - i)
    }
  }
  const onSetTranslate = (swiper: SwiperCore) => {
    const slides = swiper.slides
    const offsetAfter = swiper.width * 0.92 //每个slide的位移值
    for (let i = 0; i < slides.length; i++) {
      const slide = slides.eq(i)
      const progress = (slides[i] as any).progress

      if (progress <= 0) {
        //右边slide位移
        slide.transform('translate3d(' + progress * offsetAfter + 'px, 0, 0) scale(' + (1 - Math.abs(progress) / 20) + ')')
        slide.css('opacity', progress + 3) //最右边slide透明
      }

      if (progress > 0) {
        slide.transform('rotate(' + -progress * 5 + 'deg)') //左边slide旋转
        slide.css('opacity', 1 - progress) //左边slide透明
      }
    }
  }
  const onSetTransition = (swiper: SwiperCore, transition: number) => {
    for (let i = 0; i < swiper.slides.length; i++) {
      const slide = swiper.slides.eq(i)
      slide.transition(transition)
    }
  }
  return (
    <Swiper
      className={classnames('banner-images', className)}
      watchSlidesProgress
      resistanceRatio={0}
      onInit={onInit}
      onResize={(swiper) => swiper.update()}
      onSetTranslate={onSetTranslate}
      onSetTransition={onSetTransition}
      onSwiper={onSwiper}
      loop
    >
      {list.map((item, index) => (
        <SwiperSlide key={index} className="banner-image">
          <img src={item.cover} className="img" />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default ImageSwiper
