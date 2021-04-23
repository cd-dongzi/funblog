import React from 'react'
import { Comment } from '@root/src/models/comment'
import { MessageWrap } from '@/appComponents'
import { Modal, notification } from '@/components'
import { useDispatch, useSelector } from 'react-redux'
import { setAppState } from '@/store/app/action'
import { IStoreState } from '@/store'
import api from '@/api'
import './style.less'

type Props = {
  loadData: () => void
}
interface MessageboardContent {
  (props: Props): JSX.Element | null
}

const MessageboardContent: MessageboardContent = ({ loadData }) => {
  const comment = useSelector((state: IStoreState) => state.comment)
  const user = useSelector((state: IStoreState) => state.user)
  const dispatch = useDispatch()
  const onSubmit = async (val: string, replyItem?: Comment) => {
    if (!val || !val.trim()) {
      return notification.error('说点啥吧~')
    }
    if (!user._id) {
      return Modal.show({
        content: '请先进行登录',
        onConfirm: () => {
          dispatch(
            setAppState({
              showLoginBox: true
            })
          )
        }
      })
    }
    if (replyItem) {
      const params: AnyObject = {
        replayContent: val,
        _id: replyItem._id
      }
      if (!replyItem.floor) {
        params.questioner = {
          avatar: replyItem.avatar,
          name: replyItem.name,
          url: replyItem.url,
          role: replyItem.role
        }
      }
      await api.comment.replyComment(params)
    } else {
      await api.comment.addComment({
        content: val
      })
    }
    loadData()
    return null
  }
  return (
    <MessageWrap showFloor total={comment.commentTotal} list={comment.commentList} className="messageboard-content" onSubmit={onSubmit} />
  )
}

export default MessageboardContent
