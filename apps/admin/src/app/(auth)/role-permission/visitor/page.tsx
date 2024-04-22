'use client';
import { ActionType, ProTable } from '@ant-design/pro-components';
import { Visitor } from '@funblog/types';
import { useRef } from 'react';
import { getVisitorPage } from '@/api';

const VisitorListPage = () => {
  const tableActionRef = useRef<ActionType>();
  return (
    <ProTable<Visitor>
      rowKey="id"
      headerTitle="游客列表"
      actionRef={tableActionRef}
      options={false}
      search={false}
      request={async (params) => {
        const res = await getVisitorPage({
          page: params.current,
          pageSize: params.pageSize,
        });
        return { data: res.list, success: true };
      }}
      columns={[
        { title: 'ip', align: 'center', dataIndex: 'ip' },
        {
          title: 'userAgent',
          align: 'center',
          width: 200,
          ellipsis: true,
          dataIndex: 'userAgent',
        },
        {
          title: '国家',
          align: 'center',
          dataIndex: 'country',
        },
        {
          title: '省份',
          align: 'center',
          dataIndex: 'province',
        },
        {
          title: '城市',
          align: 'center',
          dataIndex: 'city',
        },
        {
          title: '创建时间',
          align: 'center',
          dataIndex: 'createdAt',
          valueType: 'dateTime',
        },
      ]}
    />
  );
};
export default VisitorListPage;
