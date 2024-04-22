'use client';
import { Category } from '@funblog/types';
import {
  createCategory,
  deleteCategory,
  deleteMoreCategory,
  getCategory,
  getCategoryList,
  updateCategory,
} from '@/api';
import TableForm from '@/components/TableForm';
import { formRules } from '@/config/formRules';

const CategoryPage = () => {
  return (
    <TableForm<Category>
      name="文章分类"
      tableProps={{
        headerTitle: '文章分类',
        addButtonName: '新增分类',
        pagination: false,
        columns: [
          { title: '名称', dataIndex: 'name' },
          { title: '别名', dataIndex: 'alias' },
        ],
        request: async () => {
          const res = await getCategoryList();
          return Promise.resolve({
            data: res,
            success: true,
          });
        },
        deleteRequest: deleteCategory,
        deleteMoreRequest: deleteMoreCategory,
        infoRequest: getCategory,
      }}
      formProps={{
        updateRequest: updateCategory,
        createRequest: createCategory,
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
export default CategoryPage;
