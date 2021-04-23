import React from 'react'
import { SidebarContainer } from '@/appComponents'
import Sidebar from '../components/sidebar'

type Props = {
  sidebarRef: any
  onChange: (query: AnyObject) => void
  onResetContent: () => void
}
interface ArchiveSidebar {
  (props: Props): JSX.Element | null
}
const ArchiveSidebar: ArchiveSidebar = ({ sidebarRef, onChange, onResetContent }) => {
  return (
    <SidebarContainer className="archive-pc-sidebar" contentClass="archive-content" ref={sidebarRef}>
      <Sidebar onChange={onChange} onResetContent={onResetContent} />
    </SidebarContainer>
  )
}

export default ArchiveSidebar
