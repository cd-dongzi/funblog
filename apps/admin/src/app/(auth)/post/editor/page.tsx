'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { createPost, getPost, updatePost, getCategoryList, getTagList } from '@/api';
import PostEditor from '@/components/PostEditor';
import { formRules } from '@/config/formRules';
import { message } from '@/lib/EscapeAntd';

function PostEditorPage() {
  const searchParams = useSearchParams();
  const postId = searchParams.get('id');
  const router = useRouter();
  return (
    <PostEditor
      request={async () => {
        if (postId) {
          const res = await getPost(+postId);
          return res;
        } else {
          return true;
        }
      }}
      onSubmit={async (values) => {
        try {
          if (postId) {
            await updatePost(+postId, values);
            message.info('保存成功');
          } else {
            const { id } = await createPost(values);
            message.info('创建成功');
            router.replace(`/post/editor?id=${id}`);
          }
        } catch (err) {}
      }}
      fields={[
        {
          label: '文章别名',
          name: 'alias',
          tooltip: '在URL中显示的名称',
          type: 'text',
          required: false,
          rules: [formRules.required, formRules.alias],
        },
        {
          label: '文章标签',
          name: 'tags',
          mode: 'multiple',
          type: 'select',
          required: false,
          request: async () => {
            const res = await getTagList();
            return res.map((v) => ({ label: v.name, value: v.id }));
          },
        },
        {
          label: '文章分类',
          name: 'categories',
          type: 'select',
          mode: 'multiple',
          required: false,
          request: async () => {
            const res = await getCategoryList();
            return res.map((v) => ({ label: v.name, value: v.id }));
          },
        },
        {
          label: '文章摘要',
          name: 'summary',
          type: 'text',
          required: false,
        },
        {
          label: '文章封面',
          name: 'cover',
          type: 'imageList',
          fieldProps: {
            cardContainerClassName: '!block',
            cardClassName: '!h-[150px]',
          },
        },
        {
          label: '文章优先级',
          name: 'priority',
          tooltip: '数字越大，权重越高，新发布的文章越靠前',
          type: 'digit',
          required: false,
        },
        {
          label: '启用评论',
          name: 'enableComment',
          type: 'switch',
          required: false,
        },
        {
          label: '是否加密',
          name: 'encrypted',
          type: 'switch',
          required: false,
          fields: [
            {
              label: '密码',
              name: 'password',
              type: 'password',
              parentValue: true,
            },
          ],
        },
        {
          label: '是否可见',
          name: 'visible',
          type: 'switch',
          required: false,
        },
        {
          label: 'Github',
          name: 'github',
          type: 'text',
          required: false,
        },
      ]}
    />
  );
}

export default PostEditorPage;
