import { UploadOutlined } from '@ant-design/icons';
import { checkStr } from '@funblog/utils';
import { Button, Upload as AntUpload, UploadProps as AntUploadProps, UploadFile } from 'antd';
import ImgCrop, { ImgCropProps } from 'antd-img-crop';
import cls from 'classnames';
import { uniqueId } from 'lodash';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { uploadImage as uploadImageApi } from '@/api/image';
import { deleteResourceUrlPrefix, getResourceUrl } from '@/utils';

function createAntdFile(url: string | UploadFile) {
  if (typeof url === 'string') {
    return {
      uid: uniqueId(),
      name: url,
      url: checkStr(url, 'URL') ? url || '' : getResourceUrl(url),
    } as UploadFile;
  }
  if (url.type) {
    return {
      uid: url.uid,
      name: url.name,
      originFileObj: url,
    } as UploadFile;
  }
  return url;
}

function createFileList(files?: string | string[]) {
  if (Array.isArray(files)) {
    return files.map(createAntdFile);
  }
  if (!files) return [];
  return [createAntdFile(files)];
}

export function uploadImage(file: File) {
  const formData = new FormData();
  formData.append('file', file);
  return uploadImageApi(formData);
}

export type UploadProps = Partial<Omit<AntUploadProps, 'onChange'>> & {
  value?: string | string[];
  trigger?: ({ disabled }: { disabled: boolean }) => ReactNode;
  triggerText?: ReactNode;
  hasCrop?: boolean;
  onChange?: (value: string | string[]) => void;
  cropProps?: Partial<ImgCropProps>;
};
function Upload({
  trigger,
  hasCrop,
  disabled,
  maxCount = 1,
  value,
  cropProps,
  listType,
  onChange,
  triggerText = '上传',
  ...props
}: UploadProps) {
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const stateRef = useRef({
    value,
  });
  stateRef.current.value = value;
  useEffect(() => {
    setFileList(createFileList(value));
  }, [value]);

  const _disabled = disabled || loading;
  const _triggerNode =
    listType === 'picture-card' ? (
      <button
        className={cls('cursor-pointer', {
          'cursor-not-allowed': _disabled,
        })}
        style={{ border: 0, background: 'none' }}
        type="button"
      >
        <UploadOutlined />
        <div style={{ marginTop: 8 }}>{triggerText}</div>
      </button>
    ) : (
      <Button type="primary" icon={<UploadOutlined />} loading={loading}>
        {triggerText}
      </Button>
    );
  const _trigger = trigger ? trigger({ disabled: _disabled }) : _triggerNode;
  const multiple = maxCount && maxCount > 1;
  const dom = (
    <AntUpload
      name="file"
      {...props}
      listType={listType}
      maxCount={maxCount}
      fileList={fileList}
      onRemove={(file) => {
        const _list = fileList.filter((v) => v.uid !== file.uid);
        setFileList(_list);
        const _value = _list.map((v) => deleteResourceUrlPrefix(v.url));
        if (multiple) {
          stateRef.current.value = _value;
          onChange?.(stateRef.current.value);
        } else {
          onChange?.(_value.join(''));
        }
      }}
      disabled={_disabled}
      beforeUpload={async (file) => {
        setLoading(true);
        try {
          const formData = new FormData();
          formData.append('file', file);
          const url = await uploadImageApi(formData);
          if (multiple) {
            const _value = stateRef.current.value;
            stateRef.current.value = Array.isArray(_value) ? [..._value, url] : [url];
            onChange?.(stateRef.current.value.slice(0, maxCount));
          } else {
            onChange?.(url);
          }
        } finally {
          setLoading(false);
        }
        return false;
      }}
    >
      {maxCount && fileList.length >= maxCount ? null : _trigger}
    </AntUpload>
  );
  if (!hasCrop) return dom;
  return (
    <ImgCrop
      {...cropProps}
      beforeCrop={(file) => {
        if (file.type === 'image/gif') {
          return false;
        }
      }}
    >
      {dom}
    </ImgCrop>
  );
}

export default Upload;
