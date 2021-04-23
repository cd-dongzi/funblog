import { IStoreState } from '@/store'
import React, { ReactNode } from 'react'
import { useSelector } from 'react-redux'
import MobileSidebar from './mobileSidebar'

type Props = {
  children: ReactNode
}
interface MobileContainer {
  (props: Props): JSX.Element | null
}

const MobileContainer: MobileContainer = ({ children }) => {
  const app = useSelector((state: IStoreState) => state.app)
  return (
    <>
      {/* 放到上面，页面切换需要过渡到这个元素上面 */}
      {children}
      {app.layoutSize === 'small' && <MobileSidebar />}
    </>
  )
}

export default MobileContainer
