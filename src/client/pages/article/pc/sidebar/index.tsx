import React from 'react'
import { SidebarContainer } from '@/appComponents'
import { SideTitle } from '@/components'
import { MdTitle, useSidebar } from '../../utils'
// import './style.less'

type Props = {
  list: MdTitle[]
}
interface ArticleSidebar {
  (props: Props): JSX.Element | null
}
const ArticleSidebar: ArticleSidebar = ({ list }) => {
  const [sideList, activeIndex, onChange] = useSidebar(list)
  return (
    <SidebarContainer className="article-sidebar">
      <div className="container">
        <SideTitle list={sideList} onChange={onChange} activeIndex={activeIndex} />
      </div>
    </SidebarContainer>
  )
}

export default ArticleSidebar
