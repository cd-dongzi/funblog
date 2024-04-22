'use client';
import { InvitationCode } from '@funblog/types';
import { Tag } from 'antd';
import dayjs from 'dayjs';
import Link from 'next/link';
import {
  createInvitationCode,
  deleteInvitationCode,
  deleteMoreInvitationCode,
  getInvitationCode,
  getInvitationCodeList,
  getRoleList,
  updateInvitationCode,
} from '@/api';
import TableForm from '@/components/TableForm';

const InvitationCodePage = () => {
  return (
    <TableForm<InvitationCode>
      name="邀请码"
      tableProps={{
        headerTitle: '邀请码',
        pagination: false,
        columns: [
          {
            title: '邀请码code',
            dataIndex: 'code',
            copyable: true,
            width: 350,
            render(dom) {
              return <Tag>{dom}</Tag>;
            },
          },
          { title: '过期时间', width: 150, dataIndex: 'expiredAt', valueType: 'dateTime' },
          {
            title: '状态',
            dataIndex: 'status',
            width: 100,
            valueEnum: {
              1: { text: '失效', status: 'Error' },
              2: { text: '正常', status: 'Success' },
            },
          },
          {
            title: '角色',
            dataIndex: 'roles',
            render: (_, record) => {
              return record.roles?.map((v) => <Tag key={v.code}>{v.name}</Tag>);
            },
          },
          {
            key: 'action',
            width: 250,
            render: (doms, entity) => {
              return (
                <>
                  <Link className="mr-3" href={'/register?code=' + entity.code} target="_blank">
                    注册链接
                  </Link>
                  {doms}
                </>
              );
            },
          },
        ],
        request: async () => {
          const res = await getInvitationCodeList();
          return Promise.resolve({
            data: res.map((item) => {
              return {
                ...item,
                status: dayjs(item.expiredAt).isBefore(dayjs()) ? 1 : 2,
              };
            }),
            success: true,
          });
        },
        deleteRequest: deleteInvitationCode,
        deleteMoreRequest: deleteMoreInvitationCode,
        infoRequest: getInvitationCode,
      }}
      formProps={{
        updateRequest: updateInvitationCode,
        createRequest: createInvitationCode,
        list: [
          {
            type: 'select',
            label: '角色设置',
            name: 'roles',
            request: async () => {
              const list = await getRoleList();
              return list.map((item) => ({
                label: item.name,
                value: item.id,
              }));
            },
            mode: 'multiple',
          },
          {
            type: 'dateTime',
            label: '过期时间',
            name: 'expiredAt',
          },
        ],
      }}
    />
  );
};
export default InvitationCodePage;
