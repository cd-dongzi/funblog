'use client';
import { ActionType } from '@ant-design/pro-components';
import { Permission } from '@funblog/types';
import { useRef } from 'react';
import { deletePermission, getPermissionPage, updatePermission } from '@/api';
import Table from '@/components/Table';
import AddPermission from './AddPermission';

const RolePermission = () => {
  const ref = useRef<ActionType>();
  return (
    <>
      <Table<Permission>
        actionRef={ref}
        columns={[
          {
            title: '权限名称',
            dataIndex: 'name',
          },
          {
            title: 'code',
            dataIndex: 'code',
          },
          {
            title: '创建时间',
            dataIndex: 'createdAt',
            valueType: 'dateTime',
            editable: false,
            sorter: true,
          },
          {
            title: '操作',
            valueType: 'option',
            key: 'option',
            width: 200,
            align: 'center',
            render: (text, record, _, action) => (
              <div className="flex items-center justify-center">
                <a
                  onClick={() => {
                    action?.startEditable?.(record.id);
                  }}
                >
                  编辑
                </a>
              </div>
            ),
          },
        ]}
        request={async (params) => {
          // 表单搜索项会从 params 传入，传递给后端接口。
          const res = await getPermissionPage({
            page: params.current,
            pageSize: params.pageSize,
          });
          return Promise.resolve({
            data: res.list,
            total: res.total,
            success: true,
          });
        }}
        editable={{
          type: 'single',
          onSave: async (key, row) => {
            await updatePermission(row.id, { name: row.name, code: row.code });
          },
          onDelete: async (key, row) => {
            await deletePermission(row.id);
          },
        }}
        search={false}
        headerTitle="权限列表"
        toolbar={{
          actions: [<AddPermission key="add" onFinish={() => ref.current?.reload()} />],
        }}
      />
    </>
  );
};
export default RolePermission;
