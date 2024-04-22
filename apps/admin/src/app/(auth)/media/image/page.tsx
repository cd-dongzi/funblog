'use client';
import { Image } from '@funblog/types';
import { Drawer } from 'antd';
import { useState } from 'react';
import { deleteImage } from '@/api';
import ImageInfo from '@/components/ImageInfo';
import ImagePage from '@/components/ImagePage';
import Main from '@/components/Main';
import Upload from '@/components/Upload';
import Card from './Card';

const ImageListPage = () => {
  const [drawerParams, setDrawerParams] = useState({
    open: false,
    item: undefined as Image | undefined,
  });
  const [loading, setLoading] = useState(false);
  return (
    <Main className="bg-white">
      <ImagePage
        headerTitle="图片列表"
        loading={loading}
        toolBarRender={(action) => {
          return [
            <Upload
              key="upload"
              multiple
              showUploadList={false}
              triggerText="上传图片"
              onChange={() => action?.reload()}
            />,
          ];
        }}
        renderItem={(item, index, actionRef) => (
          <Card
            item={item}
            onRemove={async () => {
              try {
                setLoading(true);
                await deleteImage(item.id);
              } finally {
                setLoading(false);
                actionRef.current?.reload();
              }
            }}
            onDetail={() => {
              setDrawerParams({
                open: true,
                item,
              });
            }}
          />
        )}
      />
      <Drawer
        title="文件详情"
        width={420}
        open={drawerParams.open}
        onClose={() => setDrawerParams((prev) => ({ ...prev, open: false, item: undefined }))}
      >
        {drawerParams.item && <ImageInfo id={drawerParams.item.id} />}
      </Drawer>
    </Main>
  );
};
export default ImageListPage;
