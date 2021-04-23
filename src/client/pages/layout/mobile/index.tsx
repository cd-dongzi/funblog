import React, { useContext } from 'react'
// import { TransformBox } from '@/components'
import { TransformBoxContext, setShowTransformBox } from '@/contexts/transformBox'
import LayoutNav from './nav'
// import Sidebar from './sidebar'

type Props = {
  children?: any
}
interface LayoutMobile {
  (props: Props): JSX.Element | null
}

const LayoutMobile: LayoutMobile = ({ children }) => {
  const transformBoxCtx = useContext(TransformBoxContext)
  return (
    <>
      <LayoutNav showSidebar={transformBoxCtx.show} onSidebar={() => transformBoxCtx.dispatch(setShowTransformBox(true))} />
    </>
  )
}

export default LayoutMobile
