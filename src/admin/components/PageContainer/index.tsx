import React, { ReactNode } from 'react'
import classnames from 'classnames'
import { Spin } from 'antd'
import './style.less'

type Props = {
  children: ReactNode
  title?: string
  className?: string
  hasLoading?: boolean
  loading?: boolean
}
interface PageContainer {
  (props: Props): JSX.Element | null
}

const PageContainer: PageContainer = ({ title, children, className, hasLoading = false, loading = false }) => {
  const content = <div className="page-container-content">{children}</div>
  return (
    <div className={classnames('page-container', className)}>
      {title && <div className="page-container-nav">{title}</div>}
      {hasLoading ? (
        <Spin spinning={loading} tip="Loading...">
          {content}
        </Spin>
      ) : (
        content
      )}
    </div>
  )
}

export default PageContainer
