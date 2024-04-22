'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { createPage, getPage, updatePage } from '@/api';
import PostEditor from '@/components/PostEditor';
import { formRules } from '@/config/formRules';
import { message } from '@/lib/EscapeAntd';

function PageEditorPage() {
  const searchParams = useSearchParams();
  const postId = searchParams.get('id');
  const router = useRouter();
  return (
    <PostEditor
      request={async () => {
        if (postId) {
          const res = await getPage(+postId);
          return res;
        } else {
          return true;
        }
      }}
      onSubmit={async (values) => {
        try {
          if (postId) {
            await updatePage(+postId, values);
            message.info('保存成功');
          } else {
            const { id } = await createPage(values);
            message.info('创建成功');
            router.replace(`/page/editor?id=${id}`);
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
      ]}
    />
  );
}

export default PageEditorPage;
