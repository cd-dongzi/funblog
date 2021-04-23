import React, { useContext } from 'react'
import { Panel, TagButton } from '@/components'
import { useSelector } from 'react-redux'
import { IStoreState } from '@/store'
import { TransformBoxContext, setShowTransformBox } from '@/contexts/transformBox'
import { BlogTag } from '@root/src/models/blogTag'
import { useHistory } from 'react-router'
import Navigation from '../navigation'
import './style.less'

type Props = {
  onClick: () => void
}
interface MobileSidebar {
  (props: Props): JSX.Element | null
}

const MobileSidebar: MobileSidebar = ({ onClick }) => {
  const blog = useSelector((state: IStoreState) => state.blog)
  const transformBoxCtx = useContext(TransformBoxContext)
  const history = useHistory()
  const onTag = (item: BlogTag) => {
    transformBoxCtx.dispatch(setShowTransformBox(false))
    history.push('/blog/' + item.name)
  }
  return (
    <div id="mobile-sidebar" className="mobile-sidebar">
      <Navigation onClick={onClick} />
      <div className="mobile-sidebar-container">
        <Panel title="标签">
          {blog.blogTags.map((item) => (
            <TagButton key={item.name} className="tag-btn" onClick={() => onTag(item)}>
              {item.name}
            </TagButton>
          ))}
        </Panel>
        <div id="mobile-sidebar-content" className="mobile-sidebar-content"></div>
      </div>
    </div>
  )
}

export default MobileSidebar
