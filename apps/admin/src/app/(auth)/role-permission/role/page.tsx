'use client';
import { PlusOutlined } from '@ant-design/icons';
import { ActionType } from '@ant-design/pro-components';
import { Role } from '@funblog/types';
import { Button } from 'antd';
import { useRef, useState } from 'react';
import { createRole, deleteRole, getRolePage, updateRole } from '@/api';
import ButtonTableConfirm from '@/components/Button/ButtonTableConfirm';
import ButtonTableText from '@/components/Button/ButtonTableText';
import Table from '@/components/Table';
import { message } from '@/lib/EscapeAntd';
import RolePanel, { FromRole } from './RolePanel';
import { IRole } from './types';

const RolePage = () => {
  const ref = useRef<ActionType>();
  const [panelParams, setPanelParams] = useState<{
    open: boolean;
    title: string;
    item?: IRole;
    disabled?: boolean;
    callback?: (values: FromRole) => void;
  }>({
    open: false,
    title: '新增角色',
    item: {} as IRole,
    disabled: false,
    callback: () => {},
  });
  return (
    <>
      <Table<Role>
        actionRef={ref}
        columns={[
          {
            title: '角色名称',
            dataIndex: 'name',
          },
          {
            title: '角色code',
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
            title: '更新时间',
            dataIndex: 'updatedAt',
            valueType: 'dateTime',
            editable: false,
            sorter: true,
          },
          {
            title: '操作',
            valueType: 'option',
            key: 'option',
            width: 180,
            align: 'center',
            render: (text, record) => (
              <div className="flex items-center justify-center">
                <ButtonTableText
                  className="mr-3"
                  onClick={() =>
                    setPanelParams({
                      open: true,
                      title: '角色详情',
                      disabled: true,
                      item: { ...record, permissions: record.rolePermissions?.map((item) => item.permission.id) || [] },
                    })
                  }
                >
                  详情
                </ButtonTableText>
                <ButtonTableText
                  className="mr-3"
                  onClick={() =>
                    setPanelParams({
                      open: true,
                      title: '编辑角色',
                      item: { ...record, permissions: record.rolePermissions?.map((item) => item.permission.id) || [] },
                      callback: async (values) => {
                        await updateRole(record.id, values);
                        message.success('更新成功');
                        ref.current?.reload();
                      },
                    })
                  }
                >
                  编辑
                </ButtonTableText>
                <ButtonTableConfirm
                  title="是否删除？"
                  onConfirm={async () => {
                    await deleteRole(record.id);
                    message.success('删除成功');
                    ref.current?.reload();
                  }}
                >
                  删除
                </ButtonTableConfirm>
              </div>
            ),
          },
        ]}
        request={async (params) => {
          // 表单搜索项会从 params 传入，传递给后端接口。
          const res = await getRolePage({
            page: params.current,
            pageSize: params.pageSize,
          });
          return Promise.resolve({
            data: res.list,
            total: res.total,
            success: true,
          });
        }}
        search={false}
        headerTitle="角色列表"
        toolbar={{
          actions: [
            <Button
              key="add"
              type="primary"
              onClick={() =>
                setPanelParams({
                  open: true,
                  title: '新增角色',
                  callback: async (values) => {
                    await createRole(values);
                    message.success('新增成功');
                    ref.current?.reload();
                  },
                })
              }
            >
              <PlusOutlined />
              新增权限
            </Button>,
          ],
        }}
      />
      {panelParams.open && (
        <RolePanel
          disabled={panelParams.disabled}
          open={panelParams.open}
          title={panelParams.title}
          initState={panelParams.item}
          onFinish={panelParams.callback}
          onOpenChange={(visible) => setPanelParams((prev) => ({ ...prev, open: visible }))}
        />
      )}
    </>
  );
};
export default RolePage;
