import { PlusOutlined } from '@ant-design/icons';
import { ActionType } from '@ant-design/pro-components';
import { Button, Modal } from 'antd';
import cls from 'classnames';
import { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import ImageInfo from '@/components/ImageInfo';
import ImagePage from '@/components/ImagePage';
import PreviewImage from '@/components/PreviewImage';
import Upload from '@/components/Upload';
import { getResourceUrl } from '@/utils';
import styles from './style.module.css';

export interface ImageListProps {
  value?: string | string[];
  multiple?: boolean;
  onChange?: (value: string | string[]) => void;
  trigger?: (props: { onClick: () => void }) => ReactNode;
  cardContainerClassName?: string;
  cardClassName?: string;
  triggerType?: 'button' | 'card';
  triggerClassName?: string;
  max?: number;
}
function ImageList({
  value,
  multiple,
  onChange,
  trigger,
  max,
  triggerType = 'button',
  triggerClassName,
  cardContainerClassName,
  cardClassName,
}: ImageListProps) {
  const [show, setShow] = useState(false);
  const ref = useRef({
    listActionRef: undefined as undefined | ActionType,
  });
  const [data, setData] = useState({} as Record<string | number, string | number>);
  const [idMap, setIdMap] = useState(new Map<number, boolean>());
  const [id, setId] = useState<number>();

  const reset = useCallback(() => {
    if (!value) return;
    setIdMap(() => new Map());
    if (Array.isArray(value)) {
      setIdMap((prev) => {
        const map = new Map(prev);
        value.forEach((url) => {
          map.set(data[url] as number, true);
        });
        return map;
      });
    } else {
      setIdMap((prev) => {
        const map = new Map(prev);
        map.set(data[value] as number, true);
        return map;
      });
    }
  }, [value, data]);
  useEffect(() => {
    reset();
  }, [reset]);

  const hideModal = () => {
    setShow(false);
  };
  const onOk = () => {
    hideModal();
    const _value = Array.from(idMap.keys()).map((id) => data[id] as string);
    if (multiple) {
      onChange?.(_value);
    } else {
      onChange?.(_value[0] || '');
    }
  };

  const onCancel = () => {
    reset();
    hideModal();
  };
  const onShow = () => {
    setShow(true);
  };
  const list = useMemo(() => (value ? (Array.isArray(value) ? value : [value]) : []), [value]);
  const showTrigger = list.length === 0 || (multiple ? (!max ? true : list.length < max) : false);

  return (
    <>
      <div
        className={cls(
          'grid gap-3 [grid-template-columns:repeat(auto-fill,minmax(100px,1fr))]',
          cardContainerClassName,
        )}
      >
        {list.map((item) => (
          <PreviewImage
            closeConfirm
            className={cls('h-[100px]', cardClassName)}
            key={item}
            src={getResourceUrl(item)}
            showClose
            onRemove={() => {
              const _value = list.filter((v) => v !== item);
              onChange?.(Array.isArray(value) ? _value : _value[0] || '');
            }}
          />
        ))}
        {showTrigger &&
          (trigger ? (
            trigger({ onClick: onShow })
          ) : triggerType === 'card' ? (
            <div
              className={cls(
                'transition-all-3 flex h-[100px] w-[100px] items-center justify-center rounded-full bg-[rgba(0,0,0,0.02)] [border:1px_dashed_#d9d9d9] hover:border-primary',
                triggerClassName,
              )}
              onClick={onShow}
            >
              <button className="cursor-pointer" style={{ border: 0, background: 'none' }} type="button">
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </button>
            </div>
          ) : (
            <Button onClick={onShow}>上传</Button>
          ))}
      </div>

      <Modal
        width="90%"
        title="选择或上传"
        open={show}
        onOk={onOk}
        onCancel={onCancel}
        okButtonProps={{
          disabled: !multiple && !idMap.size,
        }}
        okText="确认"
        cancelText="取消"
        footer={(originNode) => {
          return (
            <>
              <Upload
                key="upload"
                multiple
                showUploadList={false}
                trigger={({ disabled }) => (
                  <Button type="link" disabled={disabled}>
                    上传图片
                  </Button>
                )}
                onChange={() => ref.current.listActionRef?.reload()}
              />
              {originNode}
            </>
          );
        }}
      >
        <div className="flex h-[70vh]">
          <div className="flex-1 overflow-auto">
            <ImagePage
              className={styles.wrap}
              initData={(list, actionRef) => {
                ref.current.listActionRef = actionRef.current;
                setData(list.reduce((prev, cur) => ({ ...prev, [cur.url]: cur.id, [cur.id]: cur.url }), {}));
              }}
              renderItem={(item) => {
                return (
                  <div className="pb-3 pr-3">
                    <div className="relative w-full pt-[100%]">
                      <PreviewImage
                        src={getResourceUrl(item.url)}
                        className="absolute bottom-0 left-0 right-0 top-0"
                        onClick={() => {
                          setId(item.id);
                          setIdMap((prev) => {
                            if (!multiple) {
                              if (prev.get(item.id)) return prev;
                              const map = new Map();
                              map.set(item.id, true);
                              return map;
                            }
                            const map = new Map(prev);
                            if (prev.get(item.id)) {
                              map.delete(item.id);
                            } else {
                              map.set(item.id, true);
                            }
                            return map;
                          });
                        }}
                        renderContent={() => {
                          return (
                            <div
                              className={cls(
                                'transition-all-3 absolute h-full w-full rounded-xl border-2 border-solid opacity-0',
                                {
                                  'border-primary opacity-100': idMap.get(item.id),
                                },
                              )}
                            />
                          );
                        }}
                      />
                    </div>
                  </div>
                );
              }}
            />
          </div>
          <div className="border-1 hidden h-full w-[310px] overflow-auto rounded-xl border-solid border-gray/5 bg-gray9 px-3 py-2 lg:block">
            {id && (
              <ImageInfo
                id={id}
                onReload={() => {
                  ref.current.listActionRef?.reload();
                }}
              />
            )}
          </div>
        </div>
      </Modal>
    </>
  );
}

export default ImageList;
