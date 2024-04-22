'use client';
import { PlusOutlined } from '@ant-design/icons';
import { ProTable, ModalForm, ActionType, ProFormInstance } from '@ant-design/pro-components';
import { Button, message, Space } from 'antd';
import { ComponentProps, useEffect, useRef, useState } from 'react';
import ButtonTableConfirm from '@/components/Button/ButtonTableConfirm';
import ButtonTableText from '@/components/Button/ButtonTableText';
import FormItem, { FormItemProps } from '@/components/FormItem';

interface TableFormProps<T extends Record<string, any>> {
  name?: string;
  tableProps: ComponentProps<typeof ProTable<T>> & {
    addButtonName?: string;
    deleteRequest?: (id: number) => Promise<any>;
    deleteMoreRequest?: (ids: number[]) => Promise<any>;
    infoRequest?: (id: number) => Promise<T>;
    hiddenSelection?: boolean;
  };
  formProps: ComponentProps<typeof ModalForm<T>> & {
    renderTail?: () => React.ReactNode;
    list?: FormItemProps[];
    createRequest?: (data: Partial<T>) => Promise<any>;
    updateRequest?: (id: number, data: Partial<T>) => Promise<any>;
  };
  tableActionRef?: React.MutableRefObject<ActionType | undefined | null>;
}

const TableForm = function <T extends Record<string, any>>({
  tableProps: { infoRequest, deleteRequest, deleteMoreRequest, hiddenSelection, ...tableProps },
  formProps: { createRequest, updateRequest, renderTail, ...formProps },
  name,
  tableActionRef: actionRef,
}: TableFormProps<T>) {
  const tableActionRef = useRef<ActionType | null>();
  const formRef = useRef<ProFormInstance<T>>();
  const [modalParams, setModalParams] = useState({
    open: false,
    title: name,
    disabled: false,
    info: undefined as T | undefined,
  });
  const onDetail = async (id: number) => {
    if (infoRequest) {
      const res = await infoRequest(id);
      setModalParams((prev) => ({
        ...prev,
        open: true,
        disabled: true,
        info: res,
      }));
    }
  };
  const onEdit = async (id: number) => {
    if (infoRequest) {
      const res = await infoRequest(id);
      setModalParams((prev) => ({
        ...prev,
        open: true,
        info: res,
      }));
    }
  };
  const addButtonName = tableProps.addButtonName || `新增${name || ''}`;

  useEffect(() => {
    if (modalParams.open) {
      if (!modalParams.info) {
        formRef.current?.resetFields();
      } else {
        formRef.current?.setFieldsValue(modalParams.info);
      }
    }
  }, [modalParams]);

  const actionDomFn = (record: T) => (
    <>
      <ButtonTableText className="mr-3" onClick={() => onDetail(record.id)}>
        查看
      </ButtonTableText>
      <ButtonTableText className="mr-3" onClick={() => onEdit(record.id)}>
        编辑
      </ButtonTableText>
      <ButtonTableConfirm
        title="是否删除？"
        onConfirm={async () => {
          if (deleteRequest) {
            await deleteRequest(record.id);
            message.success('删除成功');
            tableActionRef.current?.reload();
          }
        }}
      >
        删除
      </ButtonTableConfirm>
    </>
  );

  const actionColumn = (tableProps.columns || []).find((v) => v.key === 'action');
  return (
    <>
      <ProTable<T>
        rowKey="id"
        actionRef={(ref) => {
          tableActionRef.current = ref;
          if (actionRef) {
            actionRef.current = ref;
          }
        }}
        pagination={{
          showQuickJumper: true,
        }}
        search={false}
        options={false}
        toolbar={{
          actions: [
            <Button
              type="primary"
              key="primary"
              onClick={() =>
                setModalParams((prev) => ({
                  ...prev,
                  open: true,
                  title: addButtonName,
                }))
              }
            >
              <PlusOutlined />
              {addButtonName}
            </Button>,
          ],
        }}
        {...tableProps}
        rowSelection={tableProps.rowSelection === undefined && !hiddenSelection ? {} : tableProps.rowSelection}
        tableAlertOptionRender={(data) => {
          return (
            <Space size={16}>
              <ButtonTableConfirm
                title="是否删除？"
                onConfirm={async () => {
                  await deleteMoreRequest?.(data.selectedRowKeys as number[]);
                  tableActionRef.current?.reload();
                  tableActionRef.current?.clearSelected?.();
                }}
                type="info"
              >
                批量删除
              </ButtonTableConfirm>
            </Space>
          );
        }}
        columns={[
          ...(tableProps.columns || [])
            .map((v) => ({
              ...v,
              align: v.align ? v.align : 'center',
            }))
            .filter((v) => v.key !== 'action'),
          {
            title: '操作',
            valueType: 'option',
            key: 'action',
            width: 180,
            align: 'center',
            ...actionColumn,
            render: (text, record, index, action, schema) => {
              return (
                <div className="flex items-center justify-center">
                  {actionColumn?.render
                    ? (actionColumn?.render(actionDomFn(record), record, index, action, schema) as any)
                    : actionDomFn(record)}
                </div>
              );
            },
          },
        ]}
      />
      <ModalForm<T>
        formRef={formRef}
        layout="horizontal"
        autoFocusFirstInput
        open={modalParams.open}
        title={modalParams.title}
        initialValues={{}}
        disabled={modalParams.disabled}
        onOpenChange={(visible) => {
          if (!visible) {
            return setModalParams((prev) => ({
              ...prev,
              open: visible,
              info: undefined,
              disabled: false,
            }));
          }
          setModalParams((prev) => ({
            ...prev,
            open: visible,
          }));
        }}
        {...formProps}
        onFinish={async (values) => {
          try {
            if (!modalParams.info) {
              createRequest && (await createRequest(values));
            } else {
              updateRequest && (await updateRequest(modalParams.info.id, values));
            }
            message.info('操作成功');
            tableActionRef.current?.reload();
            return true;
          } catch (error) {
            message.error('操作失败');
          }
        }}
      >
        {formProps.list?.map((item) => <FormItem key={item.name} item={item} />)}
        {renderTail?.()}
      </ModalForm>
    </>
  );
};
export default TableForm;
