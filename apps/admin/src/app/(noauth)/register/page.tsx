'use client';
import { ProForm } from '@ant-design/pro-components';
import { UserRole } from '@funblog/types';
import { checkStr } from '@funblog/utils';
import { Col, Row, Space } from 'antd';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { createUser } from '@/api';
import FormText from '@/components/FormText';
import { formRules } from '@/config/formRules';
import { message } from '@/lib/EscapeAntd';

interface Form {
  username: string;
  email: string;
  avatar: File;
  password: string;
  password1: string;
  invitationCode: string;
  userRoles: UserRole[];
}

export default function Register() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const params = useSearchParams();
  const code = params.get('code') || '';
  const onSubmit = async (values: Form) => {
    if (values.password !== values.password1) {
      return message.error('两次密码不一致');
    }
    if (!checkStr(values.email, 'email')) {
      return message.error('邮箱格式不正确');
    }
    try {
      setLoading(true);
      await createUser({
        username: values.username,
        email: values.email,
        password: values.password,
        userRoles: values.userRoles,
        invitationCode: values.invitationCode,
      });
      message.success('提交成功, 即将跳转登录界面');
      setTimeout(() => {
        router.push('/login');
        setLoading(false);
      }, 500);
    } catch (error) {
      setLoading(false);
    }
  };
  return (
    <ProForm<Form>
      className="!h-screen w-screen bg-white !pt-[50px]"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      layout={'horizontal'}
      loading={loading}
      initialValues={{
        invitationCode: code,
      }}
      submitter={{
        render: (props, doms) => {
          return (
            <Row>
              <Col span={14} offset={4}>
                <Space>{doms}</Space>
              </Col>
            </Row>
          );
        },
      }}
      onFinish={onSubmit}
      params={{}}
    >
      <div className="mx-auto">
        <FormText required name="username" label="用户名" />
        <FormText name="email" label="邮箱" rules={[formRules.email]} />
        <FormText
          fieldProps={{ type: 'password' }}
          rules={[formRules.password]}
          name="password"
          label="密码"
          placeholder="请输入密码"
        />
        <FormText
          required
          fieldProps={{ type: 'password' }}
          extendRules={[formRules.password1]}
          name="password1"
          label="重复密码"
          placeholder="请重复密码"
        />
        <FormText disabled={!!code} required name="invitationCode" label="邀请码" />
      </div>
    </ProForm>
  );
}
