import { PlusOutlined, RightOutlined } from '@ant-design/icons';
import { ProForm, ProFormInstance } from '@ant-design/pro-components';
import { PageMenuButton, PageMenuButtonType } from '@funblog/types';
import { Button, Collapse } from 'antd';
import { useRef } from 'react';
import { getCategoryList, getPageList, getTagList } from '@/api';
import FormItem, { FormItemProps } from '@/components/FormItem';
import { formRules } from '@/config/formRules';
import { MENU_BUTTON_TYPE } from '../../constants';

const data = {} as Record<string, any>;
const list = [
  {
    title: MENU_BUTTON_TYPE.url,
    fields: [
      {
        type: 'text',
        label: 'URL',
        name: 'url',
        placeholder: 'http://',
        colon: false,
        rules: [formRules.urlOrPath],
      },
      { type: 'text', label: '名称', name: 'name', placeholder: '请输入', colon: false, rules: [formRules.required] },
    ],
    format: (values) => {
      return [{ buttonType: PageMenuButtonType.URL, name: values.name || '', url: values.url || '' }];
    },
  },
  {
    title: MENU_BUTTON_TYPE.category,
    fields: [
      {
        type: 'list',
        name: 'category',
        layout: 'vertical',
        request: async (query) => {
          const res = await getCategoryList({
            keyword: query.keyword,
          });
          data.category = res.map((v, index) => ({
            ...v,
            label: v.name,
            value: v.alias,
            style: index < res.length - 1 ? { margin: '10px 0' } : {},
          }));
          return data.category;
        },
      },
    ],
    format: (values) => {
      return values.category.map((value: string) => ({
        buttonType: PageMenuButtonType.CATEGORY,
        value,
        name: data.category.find((v: Record<string, any>) => v.value === value)?.label,
      }));
    },
  },
  {
    title: MENU_BUTTON_TYPE.tag,
    fields: [
      {
        type: 'list',
        name: 'tag',
        request: async (query) => {
          const res = await getTagList({
            keyword: query.keyword,
          });
          data.tag = res.map((v) => ({
            ...v,
            label: v.name,
            value: v.alias,
          }));
          return data.tag;
        },
      },
    ],
    format: (values) => {
      return values.tag.map((value: string) => ({
        buttonType: PageMenuButtonType.TAG,
        value,
        name: data.tag.find((v: Record<string, any>) => v.value === value)?.label,
      }));
    },
  },
  {
    title: MENU_BUTTON_TYPE.page,
    fields: [
      {
        type: 'list',
        name: 'page',
        request: async (query) => {
          const res = await getPageList({
            keyword: query.keyword,
          });
          data.page = res.map((v) => ({
            ...v,
            label: v.title,
            value: v.alias,
          }));
          return data.page;
        },
      },
    ],
    format: (values) => {
      return values.page.map((value: string) => ({
        buttonType: PageMenuButtonType.PAGE,
        value,
        name: data.page.find((v: Record<string, any>) => v.value === value)?.label,
      }));
    },
  },
] as {
  title: string;
  format: (values: any) => PageMenuButton[];
  fields: FormItemProps[];
}[];

function Setting({ onChange }: { onChange: (values: PageMenuButton[]) => void }) {
  return (
    <div>
      <Collapse
        defaultActiveKey={[0]}
        bordered={false}
        className="rounded-none"
        ghost
        items={list.map((item, index) => ({
          key: index.toString(),
          label: <div className="text-gray3">{item.title}</div>,
          className: '![border-bottom:1px_solid_theme(colors.gray7)]',
          children: (
            <ItemWrap
              onFinish={async (values) => {
                onChange(item.format?.(values));
              }}
            >
              <ItemNormal list={item.fields} />
            </ItemWrap>
          ),
          extra: (
            <div className="flex h-[22px] items-center">
              <RightOutlined className="text-[8px] text-gray3" />
            </div>
          ),
          showArrow: false,
        }))}
      />
    </div>
  );
}

function ItemWrap<T>({ onFinish, children }: { onFinish: (values: T) => void; children: React.ReactNode }) {
  const formRef = useRef<ProFormInstance>();
  return (
    <ProForm<T>
      formRef={formRef}
      layout="horizontal"
      submitter={false}
      onFinish={async (values) => {
        await onFinish(values);
        formRef.current?.resetFields();
        return true;
      }}
    >
      {children}
      <div className="mb-2 text-right">
        <Button
          type="link"
          className="px-0"
          onClick={() => {
            formRef.current?.submit();
          }}
        >
          <PlusOutlined />
          添加到菜单
        </Button>
      </div>
    </ProForm>
  );
}
function ItemNormal({ list }: { list: FormItemProps[] }) {
  return (
    <>
      {list.map((item) => {
        return (
          <FormItem
            key={item.name}
            item={
              {
                colon: false,
                required: false,
                ...item,
              } as any
            }
          />
        );
      })}
    </>
  );
}
export default Setting;
