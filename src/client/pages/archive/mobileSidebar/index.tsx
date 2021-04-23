import React, { useContext } from 'react'
import { Portal, Panel } from '@/components'
import { TransformBoxContext, setShowTransformBox } from '@/contexts/transformBox'
import { useClientPortal } from '@/hooks'
import Sidebar from '../components/sidebar'

type Props = {
  onChange: (query: AnyObject) => void
}
interface ArchiveSidebar {
  (props: Props): JSX.Element | null
}
const ArchiveSidebar: ArchiveSidebar = ({ onChange }) => {
  const transformBoxCtx = useContext(TransformBoxContext)
  const handleChange = (query: AnyObject) => {
    transformBoxCtx.dispatch(setShowTransformBox(false))
    onChange(query)
  }
  const [container] = useClientPortal('#mobile-sidebar-content')
  if (!container) {
    return null
  }
  return (
    <Portal container={container}>
      <Panel title="时间轴">
        <Sidebar onChange={handleChange} />
      </Panel>
    </Portal>
  )
}

export default ArchiveSidebar
