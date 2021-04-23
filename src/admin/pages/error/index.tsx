import React, { useEffect, useState } from 'react'
import { imageLoad } from '@/utils/media'
import errorImg from '@/assets/images/error.png'
import { useHistory } from 'react-router'
import classnames from 'classnames'
import './style.less'

const Error = () => {
  const [show, setShow] = useState(false)
  const [isHome, setIsHome] = useState(false)
  useEffect(() => {
    imageLoad([errorImg]).then(() => {
      setShow(true)
    })
  }, [])

  const history = useHistory()
  const onBack = () => {
    history.goBack()
  }
  const onHome = () => {
    history.replace('/')
  }
  return (
    <div
      className={classnames('error-page', {
        'error-small': false
      })}
    >
      {show && (
        <div className="error-box">
          <img src={errorImg} className="error-logo" />
          <div className="error-code">500</div>
          <p className="error-message">抱歉，出错了</p>
          {isHome ? (
            <button className="error-btn" onClick={onHome}>
              返回首页
            </button>
          ) : (
            <button className="error-btn" onClick={onBack}>
              返回
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default Error
