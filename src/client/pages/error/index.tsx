import React, { useEffect, useState } from 'react'
import { imageLoad } from '@/utils/media'
import { HelmetBox } from '@/appComponents'
import errorImg from '@/assets/images/error.png'
import { useHistory } from 'react-router'
import { useSelector } from 'react-redux'
import { IStoreState } from '@/store'
import classnames from 'classnames'
import './style.less'

const Error = () => {
  const [show, setShow] = useState(false)
  const [isHome, setIsHome] = useState(false)
  const { app, navigation } = useSelector((state: IStoreState) => state)
  useEffect(() => {
    imageLoad([errorImg]).then(() => {
      setShow(true)
    })
  }, [])
  useEffect(() => {
    const len = navigation.navigations.length
    setIsHome(len === 0)
  }, [navigation.navigations])

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
        'error-small': app.layoutSize === 'small'
      })}
    >
      <HelmetBox title="Error" keywords="error, 500" />
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
