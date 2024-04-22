'use client';
import { SiteImage } from '@funblog/types';
import { getSiteImage, updateSiteImage } from '@/api';
import PanelSetting from '@/components/PanelSetting';
import { message } from '@/lib/EscapeAntd';

function SettingImage() {
  return (
    <>
      <PanelSetting<SiteImage>
        title="图床设置"
        request={async () => {
          const data = await getSiteImage();
          return (data || {}) as SiteImage;
        }}
        onSubmit={async (value) => {
          await updateSiteImage(value);
          message.info('更新成功');
        }}
        list={[
          {
            type: 'switch',
            label: 'webp格式转换',
            name: 'enableWebp',
            fields: [
              {
                type: 'digit',
                label: '转换阈值',
                tooltip: '上传的图片大于指定阈值时会转换为webp格式（保留原图）',
                name: 'webpThreshold',
                parentValue: true,
                width: 100,
                fieldProps: {
                  suffix: 'KB',
                },
              },
            ],
          },
          {
            type: 'switch',
            label: '开启缩略图',
            name: 'enableThumbnail',
            fields: [
              {
                type: 'digit',
                label: '宽度阈值',
                tooltip: '上传的图片大于指定宽度时自动创建webp缩略图',
                name: 'thumbnailThreshold',
                parentValue: true,
                width: 100,
                fieldProps: {
                  suffix: 'PX',
                },
              },
              {
                type: 'digit',
                label: '缩略图宽度',
                name: 'thumbnailWidth',
                parentValue: true,
                width: 100,
                fieldProps: {
                  suffix: 'PX',
                },
              },
            ],
          },
          {
            type: 'select',
            label: '存储策略',
            name: 'storageStrategy',
            options: [
              {
                value: 'local',
                label: '本地图床',
              },
              {
                value: 'oss',
                label: 'OSS图床',
              },
            ],
          },
        ]}
      />
    </>
  );
}

export default SettingImage;
