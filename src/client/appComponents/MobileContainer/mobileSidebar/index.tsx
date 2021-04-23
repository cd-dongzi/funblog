import React, { useContext, useEffect, useState } from 'react'
import { Panel, Portal } from '@/components'
import { CardThumb } from '@/appComponents'
import { TransformBoxContext, setShowTransformBox } from '@/contexts/transformBox'
import { useSelector } from 'react-redux'
import { IStoreState } from '@/store'
import { useHistory } from 'react-router'

type Props = unknown
interface MobileSidebar {
  (props: Props): JSX.Element | null
}

const MobileSidebar: MobileSidebar = () => {
  const [show, setShow] = useState(false)
  const transformBoxCtx = useContext(TransformBoxContext)
  const history = useHistory()
  const { blog } = useSelector((state: IStoreState) => state)
  useEffect(() => {
    setShow(true)
    return () => {
      setShow(false)
    }
  }, [])
  const onClose = () => {
    transformBoxCtx.dispatch(setShowTransformBox(false))
  }
  if (!show) {
    return null
  }
  return (
    <Portal container={document.getElementById('mobile-sidebar-content')}>
      <Panel title="最新博客">
        {blog.latestBlogSubList.slice(0, 5).map((item) => (
          <CardThumb key={item._id} item={item} onClick={onClose} />
        ))}
      </Panel>
      <Panel title="热门博客">
        {blog.hotBlogSubList.slice(0, 5).map((item) => (
          <CardThumb key={item._id} item={item} onClick={onClose} />
        ))}
      </Panel>
    </Portal>
  )
}

export default MobileSidebar
