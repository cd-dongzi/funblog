'use client';
import { EditOutlined } from '@ant-design/icons';
import { ActionType, ProTable } from '@ant-design/pro-components';
import { Page } from '@funblog/types';
import { Button } from 'antd';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import { deletePage, getPageList } from '@/api';
import ButtonTableConfirm from '@/components/Button/ButtonTableConfirm';
import ButtonTableText from '@/components/Button/ButtonTableText';
import { message } from '@/lib/EscapeAntd';
import { getClientUrl } from '@/utils';

const PageList = () => {
  const router = useRouter();
  const tableActionRef = useRef<ActionType>();
  return (
    <ProTable<Page>
      rowKey="id"
      actionRef={tableActionRef}
      options={false}
      search={false}
      request={async () => {
        const res = await getPageList();
        return { data: res, success: true };
      }}
      columns={[
        {
          title: '标题',
          align: 'center',
          render(dom, entity) {
            return (
              <Button type="link" target="_blank" href={getClientUrl('/' + entity.alias)}>
                {entity.title}
              </Button>
            );
          },
        },
        {
          title: '创建人',
          align: 'center',
          dataIndex: 'user',
          renderText(text, record) {
            return record.user?.username;
          },
        },
        {
          title: '操作',
          align: 'center',
          valueType: 'option',
          render: (text, record) => (
            <div className="flex items-center justify-center">
              <ButtonTableText className="mr-3" onClick={() => router.push('/page/editor?id=' + record.id)}>
                编辑
              </ButtonTableText>
              <ButtonTableConfirm
                title="是否删除？"
                onConfirm={async () => {
                  await deletePage(record.id);
                  message.info('删除成功');
                  tableActionRef.current?.reload();
                }}
              >
                删除
              </ButtonTableConfirm>
            </div>
          ),
        },
      ]}
      toolbar={{
        actions: [
          <Button type="primary" key="primary" onClick={() => router.push('/page/editor')}>
            <EditOutlined />
            创建页面
          </Button>,
        ],
      }}
    />
  );
};
export default PageList;
