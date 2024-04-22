import { ParamsType, ProTable, ProTableProps } from '@ant-design/pro-components';

function Table<DataType extends Record<string, any>, Params extends ParamsType = ParamsType, ValueType = 'text'>(
  props: ProTableProps<DataType, Params, ValueType>,
) {
  return (
    <ProTable
      rowKey="id"
      pagination={{
        showQuickJumper: true,
        pageSize: 10,
      }}
      cardBordered
      bordered
      options={false}
      {...props}
    >
      Table
    </ProTable>
  );
}

export default Table;
