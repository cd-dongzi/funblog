import React from 'react'
import LineLoading from '../Line'
import './style.less'

type Props = any
interface PageLoading {
  (porps: Props): JSX.Element | null
}
const PageLoading: PageLoading = () => {
  return (
    <div className="page-loading df-c">
      <LineLoading />
    </div>
  )
}
export default PageLoading
