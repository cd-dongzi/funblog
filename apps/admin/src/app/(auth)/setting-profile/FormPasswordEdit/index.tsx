import { ModalForm, ProFormInstance } from '@ant-design/pro-components';
import { Button } from 'antd';
import { useRef } from 'react';
import FormText from '@/components/FormText';
import { formRules } from '@/config/formRules';
import FormItem from '../FormItem';

interface Value {
  oldPassword: string;
  password: string;
}
function FormPasswordEdit({ label, onConfirm }: { label: string; onConfirm?: (values: Value) => Promise<void> }) {
  const formRef = useRef<ProFormInstance>();
  return (
    <>
      <FormItem hideAction canEdit label={label}>
        {() => (
          <ModalForm<Value>
            formRef={formRef}
            width="400px"
            trigger={<Button>更改密码</Button>}
            modalProps={{
              onCancel: () => {
                formRef.current?.resetFields();
              },
            }}
            onFinish={async (value) => {
              await onConfirm?.(value);
              formRef.current?.resetFields();
              return true;
            }}
          >
            <FormText
              fieldProps={{ type: 'password' }}
              rules={[formRules.password]}
              name="oldPassword"
              label="当前密码"
            />
            <FormText fieldProps={{ type: 'password' }} rules={[formRules.password]} name="password" label="新密码" />
            <FormText
              required
              fieldProps={{ type: 'password' }}
              rules={[formRules.password1]}
              name="password1"
              label="确认新密码"
              placeholder="确认新密码"
            />
          </ModalForm>
        )}
      </FormItem>
    </>
  );
}

export default FormPasswordEdit;
