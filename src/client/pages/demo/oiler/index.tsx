import React, { useState } from 'react'
import classnames from 'classnames'

const Demo = () => {
  const [show, setShow] = useState(true)
  const [show1, setShow1] = useState(false)
  const onClick = () => {
    setShow(false)
  }
  const onTransitionEnd = () => {
    setShow1(true)
  }
  const arr = [1, 2, 3, 4, 5, 6]
  const rate = (item: number) => {
    return Math.floor(item / 2)
  }
  return (
    <div className="Demo">
      <div className="page">
        <img
          className={classnames('img', {
            hide: !show
          })}
          src="http://www.sanki.com.cn/upfiles/201308367433599.png"
          onClick={onClick}
          onTransitionEnd={onTransitionEnd}
        />
        <div
          className={classnames('box', {
            show: show1
          })}
        >
          {arr.map((item) => {
            const isLeft = item % 2 === 1
            const num = Math.ceil(item / 2) - 1
            let style: any = {}
            if (show1) {
              if (isLeft) {
                style = {
                  left: '10vw',
                  top: `${10 + 40 * num}vw`,
                  transform: `translate(0, 0) scale(1)`
                }
              } else {
                style = {
                  right: '10vw',
                  top: `${10 + 40 * num}vw`,
                  transform: `translate(0, 0) scale(1)`
                }
              }
            }
            return <div key={item} className={classnames('slide', `slide${item}`)} style={style}></div>
          })}
        </div>
      </div>
    </div>
  )
}

export default Demo
