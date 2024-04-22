import { User } from '@funblog/types';
import { checkStr } from '@funblog/utils';
import { useStore } from '@/context';
import ModalForm, { ModalFormProps } from '@/proComponents/ModalForm';

function ModalAccount({
  onSubmit,
  ...props
}: Pick<ModalFormProps, 'isOpen' | 'onClose'> & { onSubmit: (form: Partial<User>) => Promise<any> }) {
  const { userInfo } = useStore();
  if (!props.isOpen) return null;
  return (
    <ModalForm<Partial<User>>
      {...props}
      title="修改信息"
      initState={userInfo}
      onConfirm={(form) => {
        return onSubmit({
          username: form.username,
          email: form.email,
          url: form.url,
        });
      }}
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
        {
          type: 'input',
          name: 'url',
          label: '网址',
          icon: 'link',
          validator: (val) => {
            if (checkStr(val, 'URL')) {
              return Promise.resolve();
            }
            return Promise.reject(new Error('请输入正确的网址'));
          },
        },
      ]}
    />
  );
}

export default ModalAccount;
