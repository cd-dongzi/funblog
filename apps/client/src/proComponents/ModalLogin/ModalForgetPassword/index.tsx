import { checkStr } from '@funblog/utils';
import ModalForm from '@/proComponents/ModalForm';

function ModalForgetPassword({
  isOpen,
  onClose,
  onConfirm,
}: {
  isOpen?: boolean;
  onClose?: () => void;
  onConfirm?: (form: Record<string, any>) => Promise<any> | void;
}) {
  return (
    <ModalForm
      title="重置密码"
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      confirmText="下一步"
      fields={[
        {
          type: 'input',
          name: 'email',
          label: '邮箱',
          icon: 'email',
          required: true,
          validator: (val) => {
            if (checkStr(val, 'email')) {
              return Promise.resolve();
            }
            return Promise.reject(new Error('请输入正确的邮箱'));
          },
        },
      ]}
    />
  );
}

export default ModalForgetPassword;
