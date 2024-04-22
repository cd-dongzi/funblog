import cls from 'classnames';
import { useEffect, useState } from 'react';
import { NormalImage } from '@/components/Image';
import { useStore } from '@/context';
import ModalForm, { ModalFormProps } from '@/proComponents/ModalForm';
import { getResourceUrl } from '@/utils';

function ModalAvatar({
  onSubmit,
  ...props
}: Pick<ModalFormProps, 'isOpen' | 'onClose'> & { onSubmit: (avatar: string) => Promise<void> }) {
  const { siteUser } = useStore();
  const [avatar, setAvatar] = useState('');
  useEffect(() => {
    if (!props.isOpen) {
      setAvatar('');
    }
  }, [props.isOpen]);
  return (
    <ModalForm
      {...props}
      title="更换头像"
      renderContent={({ onClose }) => {
        return (
          <div>
            <p className="mb-4 w-[310px] px-4 text-[12px] leading-5">
              为避免用户上传敏感图片用作头像，仅允许从以下图片中进行选择：
            </p>
            <div className="grid max-h-[300px] grid-cols-4 gap-3 overflow-auto px-4">
              {siteUser?.avatarList.map((_avatar) => {
                return (
                  <NormalImage
                    className={cls(
                      'transition-all-3 h-12 w-12 cursor-pointer rounded-full border-2 border-solid border-white object-cover',
                      {
                        'border-primary': avatar === _avatar,
                      },
                    )}
                    key={_avatar}
                    src={getResourceUrl(_avatar)}
                    onClick={() => setAvatar(_avatar)}
                  />
                );
              })}
            </div>
            <button
              disabled={!avatar}
              className={cls(
                'button-primary-gradient text-md shadow-primary-md transition-all-3 mx-auto mt-4 block w-3/5 rounded-full leading-10',
                {
                  'pointer-events-none ![background:theme(colors.gray/0.1)] ![box-shadow:none]': !avatar,
                },
              )}
              onClick={async () => {
                await onSubmit(avatar);
                onClose();
              }}
            >
              保存
            </button>
          </div>
        );
      }}
    />
  );
}

export default ModalAvatar;
