import React, { useState, ReactNode } from 'react'
import { Pagination, ViewLoading } from '@/components'
import { ListContainer } from '@/appComponents'

type Props<T> = {
  total: number
  onAction: (page: number) => Promise<any>
  className?: string
  children: ReactNode
  list?: T[]
  child?: (item: T) => ReactNode
  emptyText?: string
  loading?: boolean
  currentPage?: number
}
interface PaginationContainer {
  <T extends AnyObject>(props: Props<T>): JSX.Element | null
}

const PaginationContainer: PaginationContainer = ({
  total,
  loading,
  onAction,
  className,
  currentPage,
  list,
  child,
  emptyText,
  children
}) => {
  const [dataLoading, setDataLoading] = useState(false)
  const onPaginationChange = async (page: number) => {
    try {
      setDataLoading(true)
      await onAction(page)
    } finally {
      setDataLoading(false)
    }
  }
  return (
    <div>
      {children}
      {(loading || dataLoading) && <ViewLoading />}
      {child && <ListContainer list={list} child={child} className={className} emptyText={emptyText} />}
      <Pagination total={total} onChange={onPaginationChange} className="page-pagination" currentPage={currentPage} />
    </div>
  )
}

export default PaginationContainer
