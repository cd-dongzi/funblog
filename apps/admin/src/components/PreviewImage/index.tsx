import { CloseCircleOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { Image, Popconfirm } from 'antd';
import cls from 'classnames';
import { useState } from 'react';
import { NormalImage } from '@/components/Image';

export interface PreviewImageProps {
  className?: string;
  src: string;
  onRemove?: () => void;
  onDetail?: () => void;
  showDetail?: boolean;
  showClose?: boolean;
  closeConfirm?: boolean;
  showPreview?: boolean;
  renderContent?: () => React.ReactNode;
  onClick?: () => void;
}

function PreviewImage({
  className,
  src,
  onRemove,
  onDetail,
  showPreview = true,
  showDetail,
  showClose,
  renderContent,
  closeConfirm,
  onClick,
}: PreviewImageProps) {
  const [visible, setVisible] = useState(false);
  const show = showPreview || showDetail || showClose;

  return (
    <div className={cls(className)}>
      <Image
        wrapperClassName="hidden"
        preview={{
          visible,
          onVisibleChange: (value) => {
            setVisible(value);
          },
        }}
        src={src}
      />
      <div className="group/preview relative h-full w-full cursor-pointer rounded-xl bg-[#EFF2F7]" onClick={onClick}>
        <NormalImage alt="src" src={src} className="absolute h-full w-full rounded-xl object-contain" />
        {renderContent
          ? renderContent()
          : show && (
              <div className="pointer-events-none absolute flex h-full w-full items-center justify-center rounded-xl bg-black/50 text-white opacity-0 transition-all group-hover/preview:pointer-events-auto group-hover/preview:opacity-100">
                {showPreview && (
                  <div
                    className="flex items-center justify-center text-white/70 hover:text-white"
                    onClick={(e) => {
                      e.stopPropagation();
                      setVisible(true);
                    }}
                  >
                    <EyeOutlined className="mr-1" />
                    <span>预览</span>
                  </div>
                )}
                {showDetail && (
                  <div
                    className="ml-4 flex items-center justify-center text-white/80 hover:text-white"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDetail?.();
                    }}
                  >
                    <EditOutlined className="mr-1" />
                    <span>详情</span>
                  </div>
                )}
                {showClose && (
                  <Popconfirm disabled={closeConfirm} title="确认删除？" onConfirm={onRemove}>
                    <CloseCircleOutlined
                      className="absolute -right-2 -top-2 rounded-[50%] bg-[#A0A3A8] text-xl text-white transition-all hover:scale-110"
                      onClick={() => {
                        if (closeConfirm) {
                          onRemove?.();
                        }
                      }}
                    />
                  </Popconfirm>
                )}
              </div>
            )}
      </div>
    </div>
  );
}

export default PreviewImage;
