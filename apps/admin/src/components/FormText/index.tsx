import { ProFormText } from '@ant-design/pro-components';
import { Rule } from 'antd/es/form';
import { ComponentProps } from 'react';
import { getFormItemDefaultProps } from '@/utils';

export type FormTextProps = ComponentProps<typeof ProFormText> & {
  required?: boolean;
  extendRules?: Rule[];
};

function FormText(props: FormTextProps) {
  const { rules, placeholder } = getFormItemDefaultProps(props);
  return <ProFormText width="md" rules={rules} placeholder={placeholder} {...props} />;
}

export default FormText;
