import React from 'react'
import classnames from 'classnames'

type Props = {
  children: any
  className?: string
  type?: 'primary' | 'red'
  mode?: 'left' | 'right'
}
interface BannerTag {
  (props: Props): JSX.Element | null
}

const BannerTag: BannerTag = ({ children, className, type = 'primary', mode = 'left' }) => {
  return (
    <div className={classnames('banner-tag', className, type, `banner-tag__${mode}`)}>
      <div className="banner-tag__content">
        <div className="banner-tag__wrap">{children}</div>
      </div>
    </div>
  )
}

export default BannerTag
