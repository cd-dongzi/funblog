import React, { useContext } from 'react'
import { TransformBox } from '@/components'
import { TransformBoxContext, setShowTransformBox } from '@/contexts/transformBox'
import LayoutMobileSidebar from './mobile/sidebar'
import { useSelector } from 'react-redux'
import { IStoreState } from '@/store'
import './style.less'

type Props = {
  children: any
}
interface LayoutMain {
  (props: Props): JSX.Element | null
}

const LayoutMain: LayoutMain = ({ children }) => {
  const app = useSelector((state: IStoreState) => state.app)
  const transformBoxCtx = useContext(TransformBoxContext)
  const isLarge = app.layoutSize === 'large'
  return (
    <main id="main">
      <TransformBox
        hide={isLarge}
        sidebar={<LayoutMobileSidebar onClick={() => transformBoxCtx.dispatch(setShowTransformBox(false))} />}
        show={transformBoxCtx.show}
        onClose={() => transformBoxCtx.dispatch(setShowTransformBox(false))}
        mainClassName="main-box"
      >
        {children}
      </TransformBox>
    </main>
  )
}

export default LayoutMain
