import { ActionType, ProList } from '@ant-design/pro-components';
import { Image } from '@funblog/types';
import { ComponentProps, useRef, useState } from 'react';
import { getImagePage } from '@/api';
import { MEDIA_PAGE_SIZE } from '@/constants';

type ProListProps = ComponentProps<typeof ProList<Image>>;
export type ImagePageProps = Pick<
  ProListProps,
  'headerTitle' | 'toolBarRender' | 'loading' | 'dataSource' | 'metas' | 'grid' | 'className'
> & {
  renderItem?: (
    item: Image,
    index: number,
    actionRef: React.MutableRefObject<ActionType | undefined>,
  ) => React.ReactNode;
  initData?: (list: Image[], ref: React.MutableRefObject<ActionType | undefined>) => void;
};
const ImagePage = ({ initData, ...props }: ImagePageProps) => {
  const actionRef = useRef<ActionType>();
  const [showPagination, setShowPagination] = useState(false);
  return (
    <ProList<Image>
      actionRef={actionRef}
      request={async (params) => {
        // 表单搜索项会从 params 传入，传递给后端接口。
        const res = await getImagePage({
          page: params.current || 1,
          pageSize: params.pageSize || MEDIA_PAGE_SIZE,
        });
        setShowPagination(res.total > MEDIA_PAGE_SIZE);
        initData?.(res.list, actionRef);
        return Promise.resolve({
          data: res.list,
          total: res.total,
          success: true,
        });
      }}
      pagination={
        showPagination
          ? {
              defaultPageSize: MEDIA_PAGE_SIZE,
              pageSize: MEDIA_PAGE_SIZE,
              showSizeChanger: showPagination,
            }
          : undefined
      }
      grid={{ gutter: 8, column: 6, xs: 2, sm: 3, md: 4, lg: 5, xl: 6 }}
      {...props}
      renderItem={(item, index) => {
        return props.renderItem?.(item, index, actionRef);
      }}
    />
  );
};
export default ImagePage;
