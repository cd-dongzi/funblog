'use client';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Space } from 'antd';

type GithubIssueItem = {
  key: number;
  name: string;
  createdAt: number;
};
const columns: ProColumns<GithubIssueItem>[] = [
  {
    title: 'index',
    dataIndex: 'index',
    valueType: 'indexBorder',
  },
  {
    title: 'Title',
    dataIndex: 'name',
  },
  {
    title: 'Money',
    dataIndex: 'title',
    width: 100,
    order: 1,
    valueType: 'money',
    renderText: () => (Math.random() * 100).toFixed(2),
  },
];
function Draft() {
  return (
    <div>
      <ProTable
        bordered
        columns={columns}
        // actionRef={actionRef}
        // request={async () => {
        //   return {
        //     data: [
        //       {
        //         key: 1,
        //         name: `TradeCode ${1}`,
        //         createdAt: 1602572994055,
        //       },
        //     ],
        //     success: true,
        //   };
        // }}
        // rowKey="key"
        // rowSelection={{}}
        // search={{
        //   labelWidth: 'auto',
        // }}
        // dateFormatter="string"
        headerTitle={<Space>草稿管理</Space>}
        toolBarRender={() => [
          <Button type="primary" key={1}>
            primary
          </Button>,
        ]}
      />
    </div>
  );
}

export default Draft;
