import { LINK_LIST } from '@funblog/constants';
import { LinkType } from '@funblog/types';
import { checkStr } from '@funblog/utils';
import Notification from '@/components/Notification';
import { useStore } from '@/context';
import ModalForm from '@/proComponents/ModalForm';

const defaultForm = {
  title: '',
  url: '',
  desc: '',
  type: LinkType.PERSONAL_BLOG,
  logo: '',
};

export type LinkRegisterData = typeof defaultForm;
function Box({
  show,
  onClose,
  onSuccess,
}: {
  show: boolean;
  onClose: () => void;
  onSuccess: (data: LinkRegisterData) => Promise<void>;
}) {
  const { userInfo, toggleLogin } = useStore();
  // 登录
  const onLogin = () => {
    onClose();
    toggleLogin(true);
  };
  return (
    <ModalForm
      title="申请友链"
      isOpen={show}
      onClose={onClose}
      initState={defaultForm}
      showRequiredLabel
      onConfirm={async (form) => {
        try {
          await onSuccess(form);
          Notification.info('申请成功');
          return true;
        } catch (e: any) {
          Notification.error(e?.message || '注册失败');
        }
      }}
      fields={[
        { type: 'input', name: 'title', label: '网站名称', required: true },
        {
          type: 'input',
          name: 'url',
          label: '网站地址',
          required: true,
          validator: (val) => {
            if (checkStr(val, 'URL')) {
              return Promise.resolve();
            }
            return Promise.reject(new Error('请输入正确的url链接'));
          },
        },
        { type: 'input', name: 'desc', label: '网站描述', required: true },
        {
          type: 'select',
          name: 'type',
          label: '网站分类',
          required: true,
          options: LINK_LIST.filter((item) => item.showClient),
        },
        {
          type: 'input',
          name: 'logo',
          label: '网站LOGO',
          required: true,
          validator: (val) => {
            if (checkStr(val, 'URL')) {
              return Promise.resolve();
            }
            return Promise.reject(new Error('请输入正确的url链接'));
          },
        },
      ]}
      renderFooter={({ dom }) => {
        return (
          <>
            <div className="mb-4 w-[310px] text-xs leading-5">
              您可以登录账号，然后进行友链申请，那样会在审核通过的时候给您发送邮件。
              {userInfo?.id ? (
                <span>（当前已登录{userInfo.email ? '' : '，此账号未绑定邮箱将无法接收审核结果'}）</span>
              ) : (
                <button className="btn-clear ml-1.5 text-primary underline" onClick={onLogin}>
                  去登陆
                </button>
              )}
            </div>
            {dom}
          </>
        );
      }}
    />
  );
}

export default Box;
