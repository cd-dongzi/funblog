import { useState } from 'react';
import ImageList from '@/components/ImageList';
import FormItem from '../FormItem';

function FormUploadEdit({
  label,
  value,
  onConfirm,
}: {
  label: string;
  value?: string;
  onConfirm: (url: string) => Promise<void>;
}) {
  const [url, setUrl] = useState(value);
  return (
    <FormItem hideAction canEdit label={label}>
      {() => (
        <ImageList
          triggerType="card"
          value={url}
          cardClassName="!w-[100px] !h-[100px]"
          onChange={(value) => {
            setUrl(value as string);
            if (value) {
              onConfirm(value as string);
            }
          }}
        />
      )}
    </FormItem>
  );
}

export default FormUploadEdit;
