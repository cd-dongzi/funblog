import React, { ReactNode } from 'react'
import { Empty } from '@/components'
import classnames from 'classnames'
import './style.less'

type Props<T> = {
  list?: T[]
  child?: (item: T) => ReactNode
  className?: string
  emptyText?: string
}
interface ListContainere {
  <T extends AnyObject>(props: Props<T>): JSX.Element | null
}

const ListContainere: ListContainere = ({ list = [], child, emptyText, className }) => {
  return (
    <>
      {list.length > 0 && (
        <div className={classnames('list-container', className)}>
          {list.map((item) => {
            if (!child) return null
            return child(item)
          })}
        </div>
      )}
      {list.length === 0 && <Empty text={emptyText} />}
    </>
  )
}

export default ListContainere
