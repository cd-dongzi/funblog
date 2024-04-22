import { ProCoreActionType, ProDescriptions } from '@ant-design/pro-components';
import { Image } from '@funblog/types';
import { formatDate } from '@funblog/utils';
import { Space } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { getImageInfo, updateFilename } from '@/api/image';
import PreviewImage from '@/components/PreviewImage';
import { getResourceUrl } from '@/utils';
import styles from './style.module.css';

function formatFileSize(value: number) {
  if (!value) {
    return '0 B';
  }
  const unitArr = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  let index = 0;
  const _size = value;
  index = Math.floor(Math.log(_size) / Math.log(1024));
  const size = (_size / Math.pow(1024, index)).toFixed(2);
  return size + unitArr[index];
}

function extractPrefix(url: string) {
  const arr = url.split('.');
  return arr.slice(0, arr.length - 1).join('.');
}
function extractSuffix(url: string) {
  const arr = url.split('.');
  return `.${arr[arr.length - 1]}`;
}

function ImageInfo({ id, onReload }: { id: number; onReload?: () => void }) {
  const [info, setInfo] = useState({} as Image);
  const actionRef = useRef<ProCoreActionType>(null);
  const ref = useRef({
    loaded: false,
  });

  // 第一次不加载
  useEffect(() => {
    if (ref.current.loaded) {
      actionRef.current?.reload();
    } else {
      ref.current.loaded = true;
    }
  }, [id]);

  return (
    <ProDescriptions
      column={1}
      actionRef={actionRef}
      className={styles.wrap}
      layout="vertical"
      editable={{
        onSave: async (key, newInfo, oriInfo) => {
          if (key === 'filename') {
            await updateFilename(id, newInfo.filename + extractSuffix(oriInfo.filename || ''));
            actionRef.current?.reload();
            onReload?.();
          }
          return true;
        },
      }}
      request={async () => {
        const data = await getImageInfo(id);
        const arr = ['url', 'thumbnailUrl', 'originalUrl'] as const;
        arr.forEach((key) => {
          data[key] = getResourceUrl(data[key] as string);
        });
        setInfo(data);
        return {
          data,
        };
      }}
    >
      <ProDescriptions.Item
        dataIndex="url"
        valueType="image"
        editable={false}
        labelStyle={{ display: 'none' }}
        render={(value, entity) => {
          return (
            <Space>
              <PreviewImage className="h-[100px] w-[100px]" src={value as string} />
              <div className="flex h-[100px] flex-col justify-between py-1 pl-2 text-xs">
                {[
                  { label: '上传时间', children: formatDate(entity.createdAt, 'YYYY/MM/DD HH:mm') },
                  { label: '文件大小', children: formatFileSize(entity.metadata.size) },
                  { label: '分辨率', children: `${entity.metadata.width} x ${entity.metadata.height}` },
                  { label: '上传者', children: entity.user.username },
                ].map((item) => (
                  <div key={item.label} className="text-gray3">
                    <span className="font-[700]">{item.label}: </span>
                    <span>{item.children}</span>
                  </div>
                ))}
              </div>
            </Space>
          );
        }}
      />
      <ProDescriptions.Item
        fieldProps={{
          suffix: extractSuffix(info.filename || ''),
        }}
        className="mb-10"
        label="文件名"
        dataIndex="filename"
        renderText={(value) => extractPrefix(value)}
        valueType="text"
      />
      <ProDescriptions.Item editable={false} className="mb-10" label="url" dataIndex="url" valueType="text" copyable />
      <ProDescriptions.Item
        editable={false}
        className="mb-10"
        label="原始url"
        dataIndex="originalUrl"
        valueType="text"
        copyable
      />
      <ProDescriptions.Item editable={false} label="缩略图url" dataIndex="thumbnailUrl" valueType="text" copyable />
    </ProDescriptions>
  );
}

export default ImageInfo;
