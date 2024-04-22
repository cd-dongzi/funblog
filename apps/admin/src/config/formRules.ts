import { checkStr } from '@funblog/utils';
import { Rule } from 'antd/es/form';

const onlyOne: Rule = () => {
  return {
    validator(_, value) {
      if (value && value.length > 0) {
        return;
      }
      throw new Error('至少要有一项！');
    },
  };
};
const password1Fn = (name: string): Rule => {
  return ({ getFieldValue }) => {
    return {
      validator(_, value) {
        if (!value || getFieldValue(name) === value) {
          return Promise.resolve();
        }
        return Promise.reject(new Error('你输入的新密码不匹配！'));
      },
    };
  };
};

const aliasFn = (name: string): Rule => {
  return ({ getFieldValue }) => {
    return {
      validator(_, value) {
        if (!value || /^[a-z\d-_]+$/.test(getFieldValue(name))) {
          return Promise.resolve();
        }
        return Promise.reject(new Error('别名只能包含小写字母、数字、连字符（-）和下划线（_）'));
      },
    };
  };
};

const urlOrPath = (): Rule => {
  return () => {
    return {
      validator(_, value) {
        if (!value || /^(\/[a-z0-9_-]+(\/[a-z0-9_-]+)?\/?|\/)$/.test(value) || checkStr(value, 'URL')) {
          return Promise.resolve();
        }
        return Promise.reject(new Error('路径不符合规范'));
      },
    };
  };
};
export const formRules = {
  required: { required: true, message: '这是必填项' } as Rule,
  password: { required: true, min: 6, message: '密码最少6位' } as Rule,
  password1: password1Fn('password'),
  email: { required: true, type: 'email', message: '邮箱格式不正确' } as Rule,
  alias: aliasFn('alias'),
  url: { required: true, type: 'url', message: 'URL格式不正确' } as Rule,
  path: {
    required: true,
    pattern: /^(\/[a-z0-9_-]+(\/[a-z0-9_-]+)?\/?|\/)$/,
    message: '路径不符合规范',
  } as Rule,
  urlOrPath: urlOrPath(),
  onlyOne,
} as const;
