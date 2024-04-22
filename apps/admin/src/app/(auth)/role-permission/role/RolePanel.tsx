import { ModalForm, ProFormText, ProFormSelect } from '@ant-design/pro-components';
import { Form } from 'antd';
import { getPermissionList } from '@/api';
import { IRole } from './types';

export type FromRole = Pick<IRole, 'name' | 'code' | 'permissions'>;
export default function RoleAdd({
  open,
  initState,
  title,
  onFinish,
  onOpenChange,
  disabled,
}: {
  open: boolean;
  title: string;
  onFinish?: (values: FromRole) => void;
  onOpenChange: (visible: boolean) => void;
  disabled?: boolean;
  initState?: Partial<IRole>;
}) {
  const [form] = Form.useForm<FromRole>();
  return (
    <ModalForm
      disabled={disabled}
      title={title}
      initialValues={initState}
      open={open}
      form={form}
      width={400}
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: true,
        onCancel: () => console.log('run'),
      }}
      submitTimeout={2000}
      onFinish={async (values) => {
        onFinish?.(values);
        return true;
      }}
      onOpenChange={onOpenChange}
    >
      <ProFormText
        rules={[{ required: true, message: '这是必填项' }]}
        fieldProps={{
          maxLength: 20,
        }}
        width="md"
        name="name"
        label="名称"
        tooltip="最长为 20 位"
        placeholder="请输入名称"
      />
      <ProFormText
        rules={[{ required: true, message: '这是必填项' }]}
        fieldProps={{
          maxLength: 20,
        }}
        width="md"
        name="code"
        label="角色code"
        placeholder="请输入角色类型"
      />
      <ProFormSelect
        mode="multiple"
        width="md"
        request={async () => {
          const list = await getPermissionList();
          return list.map((item) => ({
            label: item.name,
            value: item.id,
          }));
        }}
        name="permissions"
        label="权限设置"
      />
    </ModalForm>
  );
}
