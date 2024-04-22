'use client';
import { EditOutlined } from '@ant-design/icons';
import { ActionType, ProTable } from '@ant-design/pro-components';
import { Post } from '@funblog/types';
import { Button, Switch, Tag } from 'antd';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import { deletePost, getPostPage, updatePost } from '@/api';
import ButtonTableConfirm from '@/components/Button/ButtonTableConfirm';
import ButtonTableText from '@/components/Button/ButtonTableText';
import { message } from '@/lib/EscapeAntd';
import { getClientUrl } from '@/utils';

const PostListPage = () => {
  const router = useRouter();
  const tableActionRef = useRef<ActionType>();
  return (
    <ProTable<Post>
      rowKey="id"
      actionRef={tableActionRef}
      options={false}
      search={false}
      request={async (params) => {
        const res = await getPostPage({
          page: params.current,
          pageSize: params.pageSize,
        });
        return { data: res.list, success: true };
      }}
      columns={[
        {
          title: '标题',
          align: 'center',
          render(dom, entity) {
            return (
              <Button type="link" target="_blank" href={getClientUrl('/post/' + entity.id)}>
                {entity.title}
              </Button>
            );
          },
        },
        {
          title: '分类',
          align: 'center',
          dataIndex: 'categories',
          render(dom, entity) {
            return entity.categories.map((v) => <Tag key={v.id}>{v.name}</Tag>);
          },
        },
        {
          title: '标签',
          align: 'center',
          dataIndex: 'tags',
          render(dom, entity) {
            return entity.tags.map((v) => <Tag key={v.id}>{v.name}</Tag>);
          },
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
                  await updatePost(entity.id, { visible: value });
                  tableActionRef.current?.reload();
                }}
              />
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
              <ButtonTableText className="mr-3" onClick={() => router.push('/post/editor?id=' + record.id)}>
                编辑
              </ButtonTableText>
              <ButtonTableConfirm
                title="是否删除？"
                onConfirm={async () => {
                  await deletePost(record.id);
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
          <Button type="primary" key="primary" onClick={() => router.push('/post/editor')}>
            <EditOutlined />
            写文章
          </Button>,
        ],
      }}
    />
  );
};
export default PostListPage;
