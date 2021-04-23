import React, { useEffect } from 'react'
import { Tag } from 'antd'
import classnames from 'classnames'
import { setAppTagViews } from '@/store/app/action'
import { TagView } from '@/store/app/type'
import { useDispatch, useSelector } from 'react-redux'
import { IStoreState } from '@/store'
import { useHistory, useLocation } from 'react-router'
import { getRouteByRoutes } from '@/utils/router'
import './style.less'

type Props = unknown
interface TagViews {
  (props: Props): JSX.Element | null
}

const TagViews: TagViews = () => {
  const app = useSelector((state: IStoreState) => state.app)
  const location = useLocation()
  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    const route = getRouteByRoutes(location.pathname)
    if (route && !route.hiddenTabView) {
      dispatch(
        setAppTagViews({
          name: route.title,
          path: route.path,
          type: 'add'
        })
      )
    }
  }, [location, dispatch])

  const onChange = (tag: TagView) => {
    history.push(tag.path)
  }
  const onClose = (tag: TagView) => {
    dispatch(
      setAppTagViews({
        path: tag.path,
        type: 'del'
      })
    )
  }
  return (
    <div className="tag-views">
      {app.tagViews.map((tag) => (
        <Tag
          key={tag.path}
          closable
          onClose={() => onClose(tag)}
          onClick={() => onChange(tag)}
          className={classnames({
            active: tag.path === location.pathname
          })}
        >
          {tag.name}
        </Tag>
      ))}
    </div>
  )
}
export default TagViews
