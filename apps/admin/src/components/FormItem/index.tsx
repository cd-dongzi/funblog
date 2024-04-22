import {
  ProFormCheckbox,
  ProFormDatePicker,
  ProFormDateTimePicker,
  ProFormDigit,
  ProFormGroup,
  ProFormItemProps,
  ProFormList,
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { Form } from 'antd';
import FormImageList from '@/components/FormImageList';
import FormList from '@/components/FormList';
import FormText from '@/components/FormText';
import FormUpload from '@/components/FormUpload';
import { getFormItemDefaultProps } from '@/utils';
// import List from './List';
import { FormItemProps } from './types';
import useRequest from './useRequest';
import FormSvg from '../FormSvg';
import styles from './style.module.css';

export type { FormItemProps };

const getDefaultProps = (_item: FormItemProps) => {
  const required = _item.required === undefined ? true : _item.required;
  const { rules } = getFormItemDefaultProps({ ..._item, required } as ProFormItemProps);
  return {
    required,
    rules,
  };
};
function FormItemInner({ item: _item }: { item: FormItemProps }) {
  const _props = getDefaultProps(_item);
  const item = useRequest(_item);
  if (item.type === 'text') {
    return (
      <FormText
        {...item}
        {..._props}
        fieldProps={{
          className: styles.item,
        }}
      />
    );
  }
  if (item.type === 'upload') {
    return (
      <FormUpload
        {...item}
        {..._props}
        fieldProps={{
          listType: 'picture-card',
          ...item.fieldProps,
        }}
      />
    );
  }
  if (item.type === 'imageList') {
    return <FormImageList {...item} />;
  }
  if (item.type === 'list') {
    return <FormList {...item} />;
  }
  if (item.type === 'svg') {
    return <FormSvg {...item} />;
  }
  if (item.type === 'select') {
    return <ProFormSelect {...item} {..._props} />;
  }
  if (item.type === 'digit') {
    return <ProFormDigit {...item} {..._props} />;
  }
  if (item.type === 'switch') {
    return <ProFormSwitch {...item} {..._props} />;
  }
  if (item.type === 'password') {
    return <ProFormText.Password {...item} {..._props} />;
  }
  if (item.type === 'textarea') {
    return <ProFormTextArea {...item} {..._props} />;
  }
  if (item.type === 'date') {
    return <ProFormDatePicker {...item} {..._props} />;
  }
  if (item.type === 'checkbox') {
    return <ProFormCheckbox {...item} {..._props} />;
  }
  if (item.type === 'checkboxGroup') {
    return <ProFormCheckbox.Group {...item} {..._props} />;
  }
  if (item.type === 'dateTime') {
    return <ProFormDateTimePicker {...item} {..._props} />;
  }
  if (item.type === 'formList') {
    return (
      <ProFormList
        label={item.label}
        name={item.name}
        min={item.listMin || 0}
        max={item.listMax || 4}
        copyIconProps={{
          tooltipText: '复制',
        }}
        deleteIconProps={{
          tooltipText: '删除',
        }}
        rules={
          _props.required
            ? [
                {
                  required: _props.required,
                  validator: async (_, value) => {
                    if (value && value.length > 0) {
                      return;
                    }
                    throw new Error('至少要有一项！');
                  },
                },
              ]
            : []
        }
      >
        {(meta, index) => {
          return (
            <>
              {index === 0 && (
                <div className="mb-4 text-center">
                  <ProFormGroup key="group-title">
                    {item.listItems?.map((v) => (
                      <div key={v.label} className={styles.item}>
                        {v.label}
                      </div>
                    ))}
                  </ProFormGroup>
                </div>
              )}
              <ProFormGroup key="group">
                {item.listItems?.map((v) => {
                  // eslint-disable-next-line @typescript-eslint/no-unused-vars
                  const { label, ..._v } = v;
                  return <FormItem key={v.name} item={_v} />;
                })}
              </ProFormGroup>
            </>
          );
        }}
      </ProFormList>
    );
  }
  return null;
}

function FormItem({ item, boxClassName }: { item: FormItemProps; boxClassName?: string }) {
  return (
    <Form.Item key={item.name} noStyle shouldUpdate>
      {(form) => {
        return (
          <>
            <FormItemInner item={item} />
            {!!item.fields?.length && (
              <div className={boxClassName}>
                {item.fields.map((field) => {
                  return (
                    form.getFieldValue(item.name) === field.parentValue && (
                      <FormItemInner key={field.name} item={field} />
                    )
                  );
                })}
              </div>
            )}
          </>
        );
      }}
    </Form.Item>
  );
}
export default FormItem;
