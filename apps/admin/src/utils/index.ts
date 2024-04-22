import { ProFormItemProps } from '@ant-design/pro-components';
import { checkStr } from '@funblog/utils';
import { FormRule } from 'antd';
import { METADATA } from '@/config/metaData';

export function getClientUrl(url?: string) {
  if (!url) return url as string;
  if (checkStr(url, 'URL')) {
    return url;
  }
  return METADATA.siteMeta.url + url;
}

export function getResourceUrl(url?: string) {
  if (!url) return url as string;
  if (checkStr(url, 'URL')) {
    return url;
  }
  return METADATA.siteMeta.resourceUrl + url;
}

export function deleteResourceUrlPrefix(url?: string) {
  if (!url || !METADATA.siteMeta.resourceUrl) return url as string;
  return url.replace(METADATA.siteMeta.resourceUrl, '');
}

export function getFormItemDefaultProps({
  rules,
  required,
  placeholder,
  label,
  extendRules,
}: Partial<
  ProFormItemProps & {
    extendRules: FormRule[];
  }
>) {
  let _rules = rules || (required ? ([{ required: true, message: '这是必填项' }] as FormRule[]) : []);
  _rules = [..._rules, ...(extendRules || [])];
  const _placeholder = placeholder || label ? `请输入${label}` : '请输入';
  return {
    rules: _rules,
    placeholder: _placeholder,
  };
}
