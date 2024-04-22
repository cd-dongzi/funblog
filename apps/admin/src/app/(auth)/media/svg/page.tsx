'use client';
import { ActionType } from '@ant-design/pro-components';
import { SvgBox } from '@funblog/components';
import { Svg, SvgScope } from '@funblog/types';
import { parseMarkdown } from '@funblog/utils';
import { Collapse, Tag } from 'antd';
import { useRef } from 'react';
import { createSvg, deleteSvg, getSvg, getSvgList, updateSvg } from '@/api';
import TableForm from '@/components/TableForm';
import { tip } from './md';

const scopeOptions = [
  { label: '客户端', value: SvgScope.CLIENT },
  { label: '管理端', value: SvgScope.ADMIN },
];

const SvgPage = () => {
  const tableActionRef = useRef<ActionType>();
  return (
    <TableForm<Svg>
      name="Svg列表"
      tableActionRef={tableActionRef}
      tableProps={{
        headerTitle: 'Svg列表',
        addButtonName: '新增Svg',
        pagination: false,
        hiddenSelection: true,
        columns: [
          {
            title: 'name',
            copyable: true,
            align: 'center',
            dataIndex: 'name',
          },
          {
            title: 'content',
            align: 'center',
            render: (content, record) => {
              return (
                <div className="text-[30px] text-gray3 hover:text-primary">
                  <SvgBox content={record.content} />
                </div>
              );
            },
          },
          {
            title: 'desc',
            align: 'center',
            ellipsis: true,
            dataIndex: 'desc',
          },
          {
            title: '使用范围',
            align: 'center',
            render: (val, record) => {
              return <>{record.scope?.map((v) => <Tag key={v}>{v}</Tag>)}</>;
            },
          },
        ],
        request: async () => {
          const res = await getSvgList();
          return Promise.resolve({
            data: res,
            success: true,
          });
        },
        deleteRequest: deleteSvg,
        infoRequest: getSvg,
      }}
      formProps={{
        updateRequest: updateSvg,
        createRequest: createSvg,
        list: [
          { type: 'text', label: '名称', name: 'name' },
          {
            type: 'textarea',
            label: '内容',
            name: 'content',
          },
          {
            type: 'select',
            label: '范围',
            name: 'scope',
            mode: 'multiple',
            options: scopeOptions,
          },
          { type: 'text', label: '描述', name: 'desc', required: false },
        ],
        renderTail: () => {
          return (
            <Collapse
              items={[
                {
                  label: '使用说明',
                  showArrow: false,
                  children: (
                    <div
                      className="md-container"
                      dangerouslySetInnerHTML={{
                        __html: parseMarkdown(tip),
                      }}
                    ></div>
                  ),
                },
              ]}
            />
          );
        },
      }}
    />
  );
};
export default SvgPage;
