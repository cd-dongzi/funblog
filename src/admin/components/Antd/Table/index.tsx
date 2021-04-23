import React, { useState, useEffect, useRef } from 'react'
import { TablePaginationConfig, Table, TableProps } from 'antd'

type Props = TableProps<any> & {
  hasIndex?: boolean
  align?: 'center' | 'left' | 'right' | undefined
  pagination?: false | TablePaginationConfig | undefined
}
interface ITable {
  (props: Props): JSX.Element | null
}

const ITable: ITable = ({ className, columns, dataSource, hasIndex, pagination, bordered = true, align = 'center', ...props }) => {
  const [cols, setCols] = useState(columns)
  const [data, setData] = useState(dataSource)
  // columns设置
  useEffect(() => {
    if (columns && columns.length > 0) {
      let arr: any[] = columns
      if (hasIndex) {
        arr = [
          {
            title: '#',
            dataIndex: 'index',
            render: (index: number) => index
          },
          ...arr
        ]
      }
      arr = arr.map((item) => {
        item.align = align
        return item
      })
      setCols(arr)
    }
  }, [columns, align, hasIndex])
  // dataSource设置
  useEffect(() => {
    if (dataSource) {
      let arr: any[] = dataSource as any[]
      if (pagination && pagination.current) {
        arr = dataSource.map((item, index) => {
          item.index = index + 1 + ((pagination.current || 1) - 1) * (pagination.pageSize || 10)
          return item
        })
      }
      setData(arr)
    }
  }, [dataSource, hasIndex, pagination])
  return <Table bordered className={className} pagination={pagination} columns={cols} dataSource={data} {...props} />
}

export default ITable
