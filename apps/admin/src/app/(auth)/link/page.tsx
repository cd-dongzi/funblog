'use client';
import { CheckOutlined, CloseOutlined, StopOutlined } from '@ant-design/icons';
import { ActionType } from '@ant-design/pro-components';
import { LINK_LIST } from '@funblog/constants';
import { Link, LinkStatus } from '@funblog/types';
import { Button, Image, Switch, Tag, Tooltip } from 'antd';
import { useRef } from 'react';
import { createLink, deleteLink, getLink, getLinkList, updateLink } from '@/api';
import TableForm from '@/components/TableForm';
import { formRules } from '@/config/formRules';

const STATUS = {
  [LinkStatus.APPROVED]: '已批准',
  [LinkStatus.PENDING]: '待审核',
  [LinkStatus.REJECTED]: '已拒绝',
};
const LinkPage = () => {
  const tableActionRef = useRef<ActionType>();
  return (
    <TableForm<Link>
      name="友链列表"
      tableActionRef={tableActionRef}
      tableProps={{
        headerTitle: '友链列表',
        addButtonName: '新增友链',
        pagination: false,
        hiddenSelection: true,
        scroll: { x: 1000 },
        columns: [
          {
            title: '网站标题',
            width: 150,
            align: 'center',
            ellipsis: true,
            dataIndex: 'title',
            render: (value, record) => (
              <Button type="link" target="_blank" href={record.url}>
                {record.title}
              </Button>
            ),
          },
          {
            title: '网站描述',
            align: 'center',
            width: 200,
            ellipsis: true,
            dataIndex: 'desc',
          },
          {
            title: '网站logo',
            align: 'center',
            render: (value, record) => <Image width={80} src={record.logo} />,
          },
          {
            title: '状态',
            align: 'center',
            width: 200,
            render: (value, record) => (
              <div className="flex items-center justify-center">
                <Tag
                  color={
                    record.status === LinkStatus.APPROVED
                      ? 'success'
                      : record.status === LinkStatus.REJECTED
                      ? 'error'
                      : 'blue'
                  }
                >
                  {STATUS[record.status]}
                </Tag>
                <div className="flex">
                  {record.status !== LinkStatus.APPROVED && (
                    <Tooltip title="审核通过">
                      <Button
                        type="link"
                        className="text-[--ant-color-success]"
                        icon={<CheckOutlined />}
                        onClick={async () => {
                          await updateLink(record.id, { status: LinkStatus.APPROVED });
                          tableActionRef.current?.reload();
                        }}
                      ></Button>
                    </Tooltip>
                  )}
                  {record.status !== LinkStatus.PENDING && (
                    <Tooltip title="待审核">
                      <Button
                        type="link"
                        className="text-[--ant-color-warning]"
                        icon={<CloseOutlined />}
                        onClick={async () => {
                          await updateLink(record.id, { status: LinkStatus.PENDING });
                          tableActionRef.current?.reload();
                        }}
                      ></Button>
                    </Tooltip>
                  )}
                  {record.status !== LinkStatus.REJECTED && (
                    <Tooltip title="拒绝该友链">
                      <Button
                        type="link"
                        className="text-[--ant-color-warning]"
                        icon={<StopOutlined />}
                        onClick={async () => {
                          await updateLink(record.id, { status: LinkStatus.REJECTED });
                          tableActionRef.current?.reload();
                        }}
                      ></Button>
                    </Tooltip>
                  )}
                </div>
              </div>
            ),
          },
          {
            title: '是否显示',
            align: 'center',
            dataIndex: 'visible',
            render(dom, entity) {
              return (
                <Switch
                  checked={entity.visible}
                  onChange={async (value) => {
                    await updateLink(entity.id, { visible: value });
                    tableActionRef.current?.reload();
                  }}
                />
              );
            },
          },
        ],
        request: async () => {
          const res = await getLinkList();
          return Promise.resolve({
            data: res,
            success: true,
          });
        },
        deleteRequest: deleteLink,
        infoRequest: getLink,
      }}
      formProps={{
        updateRequest: updateLink,
        createRequest: createLink,
        list: [
          { type: 'text', label: '网站名称', name: 'title' },
          {
            type: 'text',
            label: '网站地址',
            name: 'url',
            rules: [formRules.url],
          },
          { type: 'text', label: '网站描述', name: 'desc' },
          { type: 'text', label: '网站LOGO', name: 'logo', rules: [formRules.url] },
          {
            type: 'select',
            label: '网站分类',
            name: 'type',
            options: LINK_LIST,
          },
        ],
      }}
    />
  );
};
export default LinkPage;
