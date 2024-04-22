import {
  ProFormCheckbox,
  ProFormDatePicker,
  ProFormDateTimePicker,
  ProFormDigit,
  ProFormList,
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
  ProFormTextArea,
  ProFormUploadButton,
} from '@ant-design/pro-components';
import { ComponentProps } from 'react';
import FormImageList from '@/components/FormImageList';
import FormList from '@/components/FormList';
import { UploadProps } from '@/components/Upload';
import FormSvg from '../FormSvg';
// import List from './List';

export type IFormItemProps =
  | ({
      type: 'text';
    } & ComponentProps<typeof ProFormText>)
  | ({
      type: 'select';
    } & ComponentProps<typeof ProFormSelect>)
  | ({
      type: 'upload';
    } & ComponentProps<typeof ProFormUploadButton> & {
        fieldProps?: UploadProps;
      })
  | ({
      type: 'switch';
    } & ComponentProps<typeof ProFormSwitch>)
  | ({
      type: 'digit';
    } & ComponentProps<typeof ProFormDigit>)
  | ({
      type: 'password';
    } & ComponentProps<typeof ProFormText.Password>)
  | ({
      type: 'textarea';
    } & ComponentProps<typeof ProFormTextArea>)
  | ({
      type: 'date';
    } & ComponentProps<typeof ProFormDatePicker>)
  | ({
      type: 'checkbox';
    } & ComponentProps<typeof ProFormCheckbox>)
  | ({
      type: 'checkboxGroup';
    } & ComponentProps<typeof ProFormCheckbox.Group>)
  | ({
      type: 'dateTime';
    } & ComponentProps<typeof ProFormDateTimePicker>)
  | ({
      type: 'imageList';
    } & ComponentProps<typeof FormImageList>)
  | ({
      type: 'formList';
    } & ComponentProps<typeof ProFormList>)
  | ({
      type: 'list';
    } & ComponentProps<typeof FormList>)
  | ({
      type: 'svg';
    } & ComponentProps<typeof FormSvg>);

export type FormItemProps = IFormItemProps & {
  name: string;
  label?: string;
  required?: boolean;
  listItems?: FormItemProps[];
  listMin?: number;
  listMax?: number;
  fields?: (FormItemProps & { parentValue: any })[];
  loadOnce?: boolean;
};
