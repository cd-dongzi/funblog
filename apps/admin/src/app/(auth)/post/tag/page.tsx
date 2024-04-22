'use client';
import { Tag } from '@funblog/types';
import { createTag, deleteTag, deleteMoreTag, getTag, getTagList, updateTag } from '@/api';
import TableForm from '@/components/TableForm';
import { formRules } from '@/config/formRules';

const TagPage = () => {
  return (
    <TableForm<Tag>
      name="文章标签"
      tableProps={{
        headerTitle: '文章标签',
        addButtonName: '新增标签',
        pagination: false,
        columns: [
          { title: '名称', dataIndex: 'name' },
          { title: '别名', dataIndex: 'alias' },
        ],
        request: async () => {
          const res = await getTagList();
          return Promise.resolve({
            data: res,
            success: true,
          });
        },
        deleteRequest: deleteTag,
        deleteMoreRequest: deleteMoreTag,
        infoRequest: getTag,
      }}
      formProps={{
        updateRequest: updateTag,
        createRequest: createTag,
        list: [
          { type: 'text', label: '名称', name: 'name', tooltip: '这将是它在站点上显示的名字' },
          {
            type: 'text',
            label: '别名',
            name: 'alias',
            tooltip: '在URL中使用的别称，包含小写字母，数字和连字符（-）',
            rules: [formRules.required, formRules.alias],
          },
        ],
      }}
    />
  );
};
export default TagPage;
