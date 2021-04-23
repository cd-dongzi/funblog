import React, { useRef } from 'react'
import { LineLoading } from '@/components'
import classnames from 'classnames'
import { useDisabledScrollByMask } from '@/hooks'
import './style.less'

export type Props = {
  isBox?: boolean
  isBg?: boolean
  className?: string
}
export interface ViewLoadingProps {
  (porps: Props): JSX.Element | null
  [k: string]: any
}
const ViewLoading: ViewLoadingProps = ({ isBox = false, isBg = false, className }) => {
  const ref = useRef(null)
  useDisabledScrollByMask({
    show: true,
    maskEl: ref.current
  })
  return (
    <div
      ref={ref}
      className={classnames(
        'view-loading df-c',
        {
          'view-loading__box': !!isBox,
          'view-loading__bg': !!isBg
        },
        className
      )}
    >
      <LineLoading />
    </div>
  )
}
export default ViewLoading
