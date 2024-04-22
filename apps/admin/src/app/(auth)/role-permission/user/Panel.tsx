import { ModalForm, ProFormSelect } from '@ant-design/pro-components';
import { User } from '@funblog/types';
import { getRoleList } from '@/api';
import { formRules } from '@/config/formRules';

export type FormItem = Partial<User>;
export type FormValues = Omit<FormItem, 'userRoles'> & {
  userRoles: number[];
};
export default function Panel({
  open,
  initState,
  title,
  onFinish,
  onOpenChange,
  disabled,
}: {
  open: boolean;
  title: string;
  onFinish?: (values: FormValues) => void;
  onOpenChange: (visible: boolean) => void;
  disabled?: boolean;
  initState?: FormItem;
}) {
  const _initState = {
    ...initState,
    userRoles: initState?.userRoles?.map((r) => r.role?.id),
  };
  return (
    <ModalForm<FormValues>
      disabled={disabled}
      title={title}
      initialValues={_initState}
      open={open}
      width={400}
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: true,
      }}
      submitTimeout={2000}
      onFinish={async (values) => {
        onFinish?.(values);
        return true;
      }}
      onOpenChange={onOpenChange}
    >
      <ProFormSelect
        mode="multiple"
        width="md"
        rules={[formRules.required]}
        request={async () => {
          const list = await getRoleList();
          return list.map((item) => ({
            label: item.name,
            value: item.id,
          }));
        }}
        name="userRoles"
        label="角色设置"
      />
    </ModalForm>
  );
}
