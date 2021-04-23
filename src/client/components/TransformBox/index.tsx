import React, { useEffect, useState } from 'react'
import classnames from 'classnames'
import { useDisabledScrollByMask } from '@/hooks'
import { getScrollTop } from '@/utils/dom'
import { useSelector } from 'react-redux'
import { IStoreState } from '@/store'
import './style.less'

type Props = {
  children: any
  sidebar: any
  show: boolean
  onClose: () => void
  hide?: boolean
  className?: string
  mainClassName?: string
}
interface TransformBox {
  (props: Props): JSX.Element | null
}

const offset = 450
const TransformBox: TransformBox = ({ show, children, sidebar, onClose, hide = false, className, mainClassName }) => {
  const [originY, steOriginY] = useState(offset)
  const app = useSelector((state: IStoreState) => state.app)
  useDisabledScrollByMask({
    show
  })
  useEffect(() => {
    steOriginY(getScrollTop() + offset)
  }, [show])

  useEffect(() => {
    onClose()
  }, [app.layoutSize])

  return (
    <div
      className={classnames('transform-box', className, {
        active: show
      })}
    >
      {!hide && (
        <div
          className={classnames('transform-box__mask', {
            show
          })}
          onClick={onClose}
        ></div>
      )}
      {!hide && <aside className="transform-box__sidebar">{sidebar}</aside>}
      <div
        className={classnames('transform-box__main', mainClassName)}
        style={{
          transformOrigin: `left ${originY}px`
        }}
      >
        {children}
      </div>
    </div>
  )
}

export default TransformBox
