import { ProList } from '@ant-design/pro-components';
import { ComponentProps, Key, useState } from 'react';
import styles from './style.module.css';

export type ListProps = ComponentProps<typeof ProList> & { selectedRow?: boolean };

function List({ selectedRow, rowSelection, ...props }: ListProps) {
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([]);
  return (
    <ProList
      {...props}
      className={selectedRow ? styles.proList : undefined}
      rowSelection={
        selectedRow
          ? {
              selectedRowKeys,
              hideSelectAll: true,
              onChange: (keys) => {
                setSelectedRowKeys(keys);
              },
            }
          : rowSelection
      }
    />
  );
}

export default List;
