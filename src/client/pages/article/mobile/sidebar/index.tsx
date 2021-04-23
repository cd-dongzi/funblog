import React, { useContext } from 'react'
import { SideTitle, Portal, Panel } from '@/components'
import { TransformBoxContext, setShowTransformBox } from '@/contexts/transformBox'
import { useClientPortal } from '@/hooks'
import { MdTitle, useSidebar } from '../../utils'

type Props = {
  list: MdTitle[]
}
interface ArticleSidebar {
  (props: Props): JSX.Element | null
}
const ArticleSidebar: ArticleSidebar = ({ list }) => {
  const transformBoxCtx = useContext(TransformBoxContext)
  const [sideList, activeIndex, onChange] = useSidebar(list, () => {
    transformBoxCtx.dispatch(setShowTransformBox(false))
  })
  const [container] = useClientPortal('#mobile-sidebar-content')
  if (!container) {
    return null
  }
  return (
    <Portal container={container}>
      <div className="container">
        <Panel title="目录">
          <SideTitle list={sideList} onChange={onChange} activeIndex={activeIndex} />
        </Panel>
      </div>
    </Portal>
  )
}

export default ArticleSidebar
