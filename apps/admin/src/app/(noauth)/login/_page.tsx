'use client';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginForm, ProFormText } from '@ant-design/pro-components';
import { theme } from 'antd';
import cls from 'classnames';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { login } from '@/api';
import styles from './style.module.css';

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const { token } = theme.useToken();
  return (
    <div className={cls('flex h-screen w-screen items-center justify-center', styles.login)}>
      <div>
        <LoginForm
          logo="/favicon.png"
          title="Funblog"
          loading={loading}
          subTitle="FunBlog 博客管理后台"
          onFinish={async (formData) => {
            setLoading(true);
            try {
              await login({
                username: formData.username,
                password: formData.password,
              });
              router.push(searchParams.get('redirectUrl') || '/');
            } finally {
              setLoading(false);
            }
          }}
        >
          <ProFormText
            name="username"
            fieldProps={{
              size: 'large',
              prefix: <UserOutlined className={'prefixIcon'} />,
            }}
            placeholder={'用户名/邮箱'}
            rules={[
              {
                required: true,
                message: '请输入用户名!',
              },
            ]}
          />
          <ProFormText.Password
            name="password"
            fieldProps={{
              size: 'large',
              prefix: <LockOutlined className={'prefixIcon'} />,
              strengthText: '密码应包含数字、字母和特殊字符，长度至少8个字符。',

              statusRender: (value) => {
                const getStatus = () => {
                  if (value && value.length > 12) {
                    return 'ok';
                  }
                  if (value && value.length > 6) {
                    return 'pass';
                  }
                  return 'poor';
                };
                const status = getStatus();
                if (status === 'pass') {
                  return <div style={{ color: token.colorWarning }}>强度：中</div>;
                }
                if (status === 'ok') {
                  return <div style={{ color: token.colorSuccess }}>强度：强</div>;
                }
                return <div style={{ color: token.colorError }}>强度：弱</div>;
              },
            }}
            placeholder={'密码'}
            rules={[
              {
                required: true,
                message: '请输入密码！',
              },
            ]}
          />
          <div className="my-5 flex justify-between">
            <Link href="/register">注册账号</Link>
            <Link href="/restore">忘记密码</Link>
          </div>
        </LoginForm>
      </div>
    </div>
  );
}
