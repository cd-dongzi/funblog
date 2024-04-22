import { Post } from '@funblog/types';
import { isEqual } from 'lodash';
import { getCategoryList, getTagList } from '@/api';
import { FormItemProps } from '@/components/FormItem';
import { formRules } from '@/config/formRules';

export const fields = [
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
] as FormItemProps[];

export function changedFields(newObj: Partial<Post>, oldObj?: Partial<Post>) {
  const obj = {} as Partial<Post>;
  for (const _key in newObj) {
    const key = _key as keyof Post;
    if (!isEqual(newObj[key], oldObj?.[key])) {
      obj[key] = newObj[key] as any;
    }
  }
  return obj;
}
