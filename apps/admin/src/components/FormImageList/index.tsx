import { Form } from 'antd';
import { ComponentProps } from 'react';
import ImageList, { ImageListProps } from '@/components/ImageList';

type FormImageListProps = ComponentProps<typeof Form.Item> & {
  fieldProps?: Partial<ImageListProps>;
};

function FormImageList({ fieldProps, ...props }: FormImageListProps) {
  return (
    <Form.Item {...props}>
      <ImageList {...fieldProps} />
    </Form.Item>
  );
}

export default FormImageList;
