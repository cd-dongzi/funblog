import React, { useEffect, useRef, useState } from 'react'
import { TableProps } from 'antd'
import Sortable from 'sortablejs'
import { ITable } from '@/components'
import { DragOutlined } from '@ant-design/icons'
import './style.less'

type Props<T> = TableProps<T> & {
  disabled?: boolean
  onSort: (data: T[], oldData?: T[]) => void
  isHandle?: boolean
}
interface DragTable {
  <T extends AnyObject>(props: Props<T>): JSX.Element | null
}

const swap = (arr: any[], newIndex: number, oldIndex: number) => {
  const temp = arr.splice(oldIndex, 1)[0]
  arr.splice(newIndex, 0, temp)
  return [...arr]
}

const dragClass = 'drag-visible'
const DragTable: DragTable = ({ dataSource, columns, isHandle, disabled, onSort, ...props }) => {
  const state = useRef({
    dataSource
  })
  const [data, setData] = useState(dataSource)
  const [cols, setCols] = useState(columns)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    setData(dataSource)
    state.current.dataSource = dataSource
  }, [dataSource])
  useEffect(() => {
    let sortable: Sortable
    if (ref.current) {
      const tbody = ref.current.querySelector('table')?.querySelector('tbody')
      if (tbody) {
        sortable = Sortable.create(tbody, {
          animation: 500,
          disabled,
          handle: isHandle ? `.${dragClass}` : undefined,
          onEnd: ({ newIndex, oldIndex, ...props }) => {
            if (state.current.dataSource) {
              onSort(
                swap([...(state.current.dataSource as any[])], newIndex as number, oldIndex as number),
                state.current.dataSource as any[]
              )
            }
          }
        })
      }
    }
    return () => {
      if (sortable) {
        sortable.destroy()
      }
    }
  }, [onSort, disabled, isHandle, data])
  // 拖拽手柄
  useEffect(() => {
    if (isHandle) {
      setCols([
        {
          title: 'Sort',
          dataIndex: 'sort',
          width: 30,
          className: dragClass,
          render: () => <DragOutlined />
        },
        ...(columns as any[])
      ])
    }
  }, [isHandle, columns])
  return (
    <div className="drag-table" ref={ref}>
      <ITable bordered {...props} columns={cols} dataSource={data} />
    </div>
  )
}
export default DragTable
