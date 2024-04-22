'use client';
import { PlusOutlined, UserOutlined } from '@ant-design/icons';
import { ActionType } from '@ant-design/pro-components';
import { User } from '@funblog/types';
import { Avatar, Button, Tag } from 'antd';
import { useRef, useState } from 'react';
import { deleteUser, disableUser, enableUser, getUserPage, updateUserRoles } from '@/api';
import ButtonTableConfirm from '@/components/Button/ButtonTableConfirm';
import ButtonTableText from '@/components/Button/ButtonTableText';
import Table from '@/components/Table';
import { message } from '@/lib/EscapeAntd';
import { getResourceUrl } from '@/utils';
import Panel, { FormValues } from './Panel';

const RolePage = () => {
  const ref = useRef<ActionType>();
  const [panelParams, setPanelParams] = useState<{
    open: boolean;
    title: string;
    item?: User;
    disabled?: boolean;
    callback?: (values: FormValues) => void;
  }>({
    open: false,
    title: '新增角色',
    item: {} as User,
    disabled: false,
    callback: () => {},
  });
  return (
    <>
      <Table<User>
        actionRef={ref}
        columns={[
          {
            title: '用户名',
            dataIndex: 'username',
          },
          {
            title: '用户邮箱',
            dataIndex: 'email',
          },
          {
            title: '用户头像',
            dataIndex: 'avatar',
            render: (_, record) => {
              if (!record.avatar) {
                return <Avatar icon={<UserOutlined />} />;
              }
              return <Avatar src={getResourceUrl(_ as string)} />;
            },
          },
          {
            title: '用户状态',
            dataIndex: 'status',
            initialValue: 1,
            valueEnum: {
              1: { text: '正常', status: 'Processing' },
              2: { text: '停用', status: 'Default' },
            },
          },
          {
            title: '创建时间',
            dataIndex: 'createdAt',
            valueType: 'dateTime',
            sorter: true,
          },
          {
            title: '权限',
            dataIndex: 'userRoles',
            render: (_, record) => {
              return record.userRoles?.map(({ role }) => <Tag key={role?.code}>{role?.name}</Tag>);
            },
          },
          {
            title: '操作',
            valueType: 'option',
            key: 'option',
            width: 180,
            align: 'center',
            render: (_, record, i, action) => (
              <div className="flex items-center justify-center">
                {record.status === 1 ? (
                  <ButtonTableConfirm
                    type="info"
                    className="mr-3"
                    onClick={async () => {
                      await disableUser(record.id);
                      action?.reload();
                    }}
                  >
                    停用
                  </ButtonTableConfirm>
                ) : (
                  <ButtonTableConfirm
                    type="info"
                    className="mr-3"
                    onClick={async () => {
                      await enableUser(record.id);
                      action?.reload();
                    }}
                  >
                    启用
                  </ButtonTableConfirm>
                )}
                <ButtonTableText
                  className="mr-3"
                  onClick={() =>
                    setPanelParams({
                      open: true,
                      title: '更改权限',
                      item: { ...record },
                      callback: async (values) => {
                        updateUserRoles(record.id, values.userRoles!);
                        message.success('权限更新成功');
                        ref.current?.reload();
                      },
                    })
                  }
                >
                  更改权限
                </ButtonTableText>
                <ButtonTableConfirm
                  title="是否删除？"
                  onConfirm={async () => {
                    await deleteUser(record.id);
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
          const res = await getUserPage({
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
        headerTitle="用户列表"
        toolbar={{
          actions: [
            <Button key="add" type="primary" href="/register" target="_blank">
              <PlusOutlined />
              注册用户
            </Button>,
          ],
        }}
      />
      <Panel
        disabled={panelParams.disabled}
        open={panelParams.open}
        title={panelParams.title}
        initState={panelParams.item}
        onFinish={panelParams.callback}
        onOpenChange={(visible) => setPanelParams((prev) => ({ ...prev, open: visible }))}
      />
    </>
  );
};
export default RolePage;
