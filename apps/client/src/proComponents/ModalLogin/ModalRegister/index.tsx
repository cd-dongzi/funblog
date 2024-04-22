import { checkStr, randomInteger } from '@funblog/utils';
import { registerUser } from '@/api';
import Notification from '@/components/Notification';
import { useStore } from '@/context';
import ModalForm from '@/proComponents/ModalForm';

function ModalRegister({
  isOpen,
  onClose,
  onSuccess,
}: {
  isOpen?: boolean;
  onClose?: () => void;
  onSuccess?: () => void;
}) {
  const { siteUser } = useStore();
  return (
    <ModalForm
      title="REGISTER"
      isOpen={isOpen}
      onClose={onClose}
      showRequiredLabel
      onConfirm={async (form) => {
        try {
          await registerUser({
            ...form,
            avatar: siteUser?.avatarList[randomInteger(0, siteUser.avatarList.length - 1)] || '',
          });
          Notification.info('注册成功');
          onSuccess?.();
          return true;
        } catch (e: any) {
          Notification.error(e?.message || '注册失败');
        }
      }}
      confirmText="注册"
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
        { type: 'input', name: 'username', label: '用户名', icon: 'user', required: true },
        { type: 'password', name: 'password', label: '密码', icon: 'password', required: true },
        { type: 'input', name: 'url', label: '网址', icon: 'link' },
      ]}
    />
  );
}

export default ModalRegister;
