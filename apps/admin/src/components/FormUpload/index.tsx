import { Form } from 'antd';
import { FormItemProps } from 'antd/lib';
import Upload, { UploadProps } from '@/components/Upload';

type FieldProps = Partial<UploadProps> & {
  onChange?: (value: string | string[]) => void;
};

function IUpload({ value, onChange, ...props }: FieldProps) {
  return <Upload {...props} value={value} onChange={onChange} />;
}

function FormUpload({
  fieldProps,
  ...props
}: Omit<FormItemProps, 'children'> & {
  fieldProps?: FieldProps;
}) {
  return (
    <Form.Item {...props}>
      <IUpload {...fieldProps} />
    </Form.Item>
  );
}

export default FormUpload;
