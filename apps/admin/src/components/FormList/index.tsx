import { Form } from 'antd';
import { ComponentProps } from 'react';
import List, { ListProps } from './List';

// type FormListCheckboxProps = ComponentProps<typeof Form.Item> & {
//   listProps?: ListProps;
// };
type FormListCheckboxProps = ComponentProps<typeof Form.Item> & Pick<ListProps, 'request'>;

function FormListCheckbox({ request, ...props }: FormListCheckboxProps) {
  return (
    <Form.Item {...props}>
      <List request={request} />
    </Form.Item>
  );
}

export default FormListCheckbox;
