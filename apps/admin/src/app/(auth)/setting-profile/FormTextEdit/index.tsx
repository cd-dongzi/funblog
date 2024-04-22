import { Input } from 'antd';
import { useState } from 'react';
import FormItem from '../FormItem';

function FormTextEdit({
  onConfirm,
  value = '',
  label,
}: {
  label: string;
  value?: string;
  onConfirm: (values: string) => Promise<void>;
}) {
  const [val, setVal] = useState(value);
  return (
    <FormItem
      label={label}
      onConfirm={async () => {
        await onConfirm(val);
      }}
      onCancel={() => {
        setVal(value);
      }}
    >
      {({ disabled }) => (
        <Input
          status={!val.trim() ? 'error' : ''}
          disabled={disabled}
          defaultValue={value}
          value={val}
          onChange={(e) => setVal(e.target.value)}
        />
      )}
    </FormItem>
  );
}

export default FormTextEdit;
