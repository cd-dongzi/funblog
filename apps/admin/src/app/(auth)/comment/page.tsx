'use client';
import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
  StopOutlined,
  UndoOutlined,
} from '@ant-design/icons';
import { ActionType, ProTable } from '@ant-design/pro-components';
import { Comment, CommentStatus } from '@funblog/types';
import { formatDate } from '@funblog/utils';
import { Button, Radio, Tooltip, Popconfirm, Typography, Tag, Avatar } from 'antd';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { deleteComment, getCommentPage, updateComment } from '@/api';
import { message } from '@/lib/EscapeAntd';
import { getClientUrl, getResourceUrl } from '@/utils';

const COMMENT_STATUS = {
  [CommentStatus.APPROVED]: '已批准',
  [CommentStatus.PENDING]: '待审核',
  [CommentStatus.SPAM]: '垃圾评论',
};

const CommentPage = () => {
  const [listType, setListType] = useState(1);
  const router = useRouter();
  const tableActionRef = useRef<ActionType>();

  const renderTag = (record: Comment) => {
    return (
      <Tag
        color={
          record.status === CommentStatus.APPROVED ? 'success' : record.status === CommentStatus.SPAM ? 'error' : 'blue'
        }
      >
        {COMMENT_STATUS[record.status]}
      </Tag>
    );
  };
  const actions = (record: Comment) => {
    return (
      <div className="flex items-center justify-center">
        {record.status !== CommentStatus.APPROVED && (
          <Tooltip title="批准">
            <Button
              type="link"
              className="text-[--ant-color-success]"
              icon={<CheckOutlined />}
              onClick={async () => {
                await updateComment(record.id, { status: CommentStatus.APPROVED });
                tableActionRef.current?.reload();
              }}
            ></Button>
          </Tooltip>
        )}
        {record.status === CommentStatus.APPROVED && (
          <Tooltip title="驳回">
            <Button
              type="link"
              className="text-[--ant-color-warning]"
              icon={<CloseOutlined />}
              onClick={async () => {
                await updateComment(record.id, { status: CommentStatus.PENDING });
                tableActionRef.current?.reload();
              }}
            ></Button>
          </Tooltip>
        )}
        {record.status === CommentStatus.SPAM && (
          <Tooltip title="不是垃圾">
            <Button
              type="link"
              className="text-[--ant-color-warning]"
              icon={<UndoOutlined />}
              onClick={async () => {
                await updateComment(record.id, { status: CommentStatus.PENDING });
                tableActionRef.current?.reload();
              }}
            ></Button>
          </Tooltip>
        )}
        {record.status !== CommentStatus.SPAM && (
          <Tooltip title="垃圾评论">
            <Button
              type="link"
              className="text-[--ant-color-warning]"
              icon={<StopOutlined />}
              onClick={async () => {
                await updateComment(record.id, { status: CommentStatus.SPAM });
                tableActionRef.current?.reload();
              }}
            ></Button>
          </Tooltip>
        )}
        <Tooltip title="删除">
          <Popconfirm
            title="确认删除?"
            onConfirm={async () => {
              await deleteComment(record.id);
              message.info('删除成功');
              tableActionRef.current?.reload();
            }}
          >
            <Button type="link" danger icon={<DeleteOutlined />}></Button>
          </Popconfirm>
        </Tooltip>
      </div>
    );
  };

  return (
    <ProTable<Comment>
      rowKey="id"
      actionRef={tableActionRef}
      options={false}
      search={false}
      params={{
        listType,
      }}
      expandable={{
        showExpandColumn: listType === 2,
        rowExpandable: (record) => {
          return (record.children?.length || 0) > 0;
        },
        childrenColumnName: 'newChildren', // 默认children 会展示多条数据，这里改成新的不存在字段
        expandedRowRender: (record) => {
          return (
            <div className="ml-20">
              {record.children?.map((item) => {
                return (
                  <div
                    key={item.id}
                    className="flex py-1 [&:not(:last-child)]:[border-bottom:1px_solid_theme(colors.gray/0.1)]"
                  >
                    <Avatar src={getResourceUrl(item.user?.avatar)} />
                    <div className="ml-4 flex-1">
                      <div className="relative">
                        <Button type="link" className="!h-5 !p-0" href={item.user?.url} target="_blank">
                          {item.user?.username}
                        </Button>
                        {item.replierUser && (
                          <>
                            <span className="ml-2 mr-1">回复给：</span>
                            <Button type="link" className="!h-5 !p-0" href={item.replierUser?.url} target="_blank">
                              {item.replierUser?.username}
                            </Button>
                          </>
                        )}
                        <div className="absolute right-0 top-0">{renderTag(item)}</div>
                      </div>
                      <p>{item.content}</p>
                    </div>
                    <div>{actions(item)}</div>
                  </div>
                );
              })}
            </div>
          );
        },
      }}
      headerTitle={
        <Radio.Group
          value={listType}
          options={[
            {
              label: '所有留言',
              value: 1,
            },
            {
              label: '评论树',
              value: 2,
            },
          ]}
          optionType="button"
          buttonStyle="solid"
          onChange={(e) => setListType(e.target.value)}
        />
      }
      request={async (params) => {
        const res = await getCommentPage({
          page: params.current,
          pageSize: params.pageSize,
          ...(listType === 2
            ? {
                parentId: null,
              }
            : {}),
        });
        console.log(111, res.list);
        return {
          data: res.list,
          success: true,
        };
      }}
      columns={[
        {
          title: '用户',
          align: 'center',
          render: (text, record) => {
            return (
              <div className="flex items-center justify-start">
                <Avatar className="mr-2" src={getResourceUrl(record.user?.avatar)} />
                <div className="text-left">
                  <div className="text-gray2">{record.user.username}</div>
                  <div className="text-xs text-primary [text-shadow:2px_2px_2px_theme(colors.primary/0.3),-1px_-1px_theme(colors.white)]">
                    {record.user.email}
                  </div>
                </div>
              </div>
            );
          },
        },
        {
          title: '评论内容',
          align: 'center',
          render: (text, record) => {
            return (
              <div style={{ width: 200 }} className="mx-auto">
                {record.replierUser && (
                  <div className="pb-1 text-xs text-primary [text-shadow:2px_2px_2px_theme(colors.primary/0.3),-1px_-1px_theme(colors.white)]">
                    回复给：{record.replierUser.username}
                  </div>
                )}
                <Typography.Paragraph
                  className="!mb-0"
                  ellipsis={{
                    tooltip: record.content,
                  }}
                >
                  {record.content}
                </Typography.Paragraph>
              </div>
            );
          },
        },
        {
          title: '页面',
          align: 'center',
          render: (text, record) => (
            <Button type="link" href={getClientUrl(record.path)} target="_blank">
              {record.post ? record.post.title : record.page ? record.page.title : record.path}
            </Button>
          ),
        },
        {
          title: '日期',
          align: 'center',
          render: (text, record) => {
            return (
              <>
                <time className="mb-1 block text-xs text-text">
                  {formatDate(record.createdAt, 'YYYY-MM-DD HH:mm:ss')}
                </time>
                {renderTag(record)}
              </>
            );
          },
        },
        {
          title: '操作',
          align: 'center',
          valueType: 'option',
          render: (text, record) => actions(record),
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
export default CommentPage;
