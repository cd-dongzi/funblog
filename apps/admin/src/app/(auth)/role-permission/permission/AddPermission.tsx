import { PlusOutlined } from '@ant-design/icons';
import { ModalForm, ProFormText } from '@ant-design/pro-components';
import { Button, Form } from 'antd';
import { createPermission } from '@/api';
import { message } from '@/lib/EscapeAntd';

export default function PermissionAdd({ onFinish }: { onFinish: () => void }) {
  const [form] = Form.useForm<{ name: string; code: string }>();
  return (
    <ModalForm
      title="新增权限"
      trigger={
        <Button type="primary">
          <PlusOutlined />
          新增权限
        </Button>
      }
      form={form}
      width={400}
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: true,
        onCancel: () => console.log('run'),
      }}
      submitTimeout={2000}
      onFinish={async (values) => {
        await createPermission(values);
        message.success('提交成功');
        onFinish();
        return true;
      }}
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
        label="code"
        placeholder="请输入code"
      />
    </ModalForm>
  );
}
