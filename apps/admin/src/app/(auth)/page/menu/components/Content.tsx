import { CheckOutlined, DeleteOutlined } from '@ant-design/icons';
import { ProForm, ProFormInstance } from '@ant-design/pro-components';
import { PageMenuButton, PageMenuType, Svg } from '@funblog/types';
import { Button, Popconfirm } from 'antd';
import cls from 'classnames';
import React, { useEffect, useImperativeHandle, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { getPageMenuList, getSvgClientList, savePageMenu } from '@/api';
import { DndList, TreeItem, unFlattenItems, FlattenedItem } from '@/components/DndList';
import { DndListRef } from '@/components/DndList/DndList';
import { message } from '@/lib/EscapeAntd';
import Panel from './Panel';
import styles from '../style.module.css';

function formatList(data: PageMenuButton[]): TreeItem<PageMenuButton>[] {
  return data.map(({ children, ...item }) => {
    return {
      id: item.id,
      data: item,
      children: formatList(children || []),
    };
  });
}
function deFormatList(data: TreeItem<PageMenuButton>[]): PageMenuButton[] {
  return data.map(({ data, children }) => {
    return {
      ...data,
      children: deFormatList(children),
    } as PageMenuButton;
  });
}
export interface ContentRef {
  onChange: (values: PageMenuButton[]) => void;
}

function getRealList(values: Record<string, any>, list: FlattenedItem<PageMenuButton>[]) {
  const arr = [] as FlattenedItem<PageMenuButton>[];
  Object.keys(values).forEach((key) => {
    const [field, index, name] = key.split('_') as [string, string, keyof PageMenuButton];
    const i = +index;
    if (field === 'field') {
      arr[i] = arr[i] || {};
      const o = {
        ...list[i],
        ...arr[i],
      };
      arr[i] = {
        ...o,
        data: {
          ...(o.data || {}),
          [name]: values[key] as PageMenuButton[keyof PageMenuButton],
        } as PageMenuButton,
      };
    }
  });
  return arr;
}
function formatFormFields(arr: (PageMenuButton | undefined)[]) {
  const obj = {} as Record<string, any>;
  arr.forEach((item, index) => {
    obj[`field_${index}_name`] = item?.name;
    obj[`field_${index}_url`] = item?.url;
    obj[`field_${index}_open`] = item?.open;
    obj[`field_${index}_icon`] = item?.icon;
  });
  return obj;
}

const Content = React.forwardRef<
  ContentRef,
  {
    type: PageMenuType;
  }
>(({ type }, ref) => {
  const formRef = useRef<ProFormInstance>();
  const dndListRef = useRef<DndListRef<PageMenuButton>>();
  const [list, setList] = useState<PageMenuButton[]>([]);
  const [svgList, setSvgList] = useState<Svg[]>([]);

  useEffect(() => {
    getSvgClientList().then(setSvgList);
  }, []);

  useImperativeHandle(ref, () => ({
    onChange: (values) => {
      setList((prev) => {
        const arr = [...prev, ...values.map((item) => ({ ...item, open: false, id: uuidv4() }))];
        return arr as PageMenuButton[];
      });
    },
  }));

  const reload = async () => {
    const res = await getPageMenuList({ type });
    setList(res.data);
    return formatFormFields(res.data);
  };

  const getFlattenedValue = () => {
    const items = dndListRef.current?.getFlattenedItems() || [];
    return getRealList(formRef.current?.getFieldsValue(), items);
  };
  return (
    <ProForm
      className={cls('pr-4', styles.content)}
      formRef={formRef}
      layout="horizontal"
      submitter={false}
      request={async () => {
        return await reload();
      }}
      onFinish={async () => {
        const value = getFlattenedValue();
        await savePageMenu({ type, data: deFormatList(unFlattenItems(value)) });
        message.success('保存成功');
        reload();
        return true;
      }}
      onChange={() => {
        const value = getFlattenedValue();
        setList(deFormatList(unFlattenItems(value)));
      }}
    >
      {list.length > 0 ? (
        <DndList
          dndRef={dndListRef}
          gap={20}
          dragItem
          value={formatList(list)}
          onChange={(arr) => {
            setList(deFormatList(arr));
          }}
          onFlattenedChange={(arr) => {
            formRef.current?.setFieldsValue(formatFormFields(arr.map((item) => item.data)));
          }}
          renderItem={(item, i) => {
            const index = typeof i === 'number' ? i : 0;
            if (!item.data) return <></>;
            return (
              <Panel
                data={item.data}
                index={index}
                svgList={svgList}
                onRemove={() => {
                  dndListRef.current?.onRemove(item.id);
                }}
              />
            );
          }}
        />
      ) : (
        <div className="mb-8 mt-4 text-sm text-subTitle">暂无菜单内容，请添加菜单项 </div>
      )}

      <div className="mb-6 mt-4">
        <Button
          type="primary"
          shape="round"
          icon={<CheckOutlined />}
          onClick={() => {
            formRef.current?.submit();
          }}
        >
          保存配置
        </Button>
        {list.length > 0 && (
          <Popconfirm
            title="清空菜单"
            description="此操作不可恢复，确定删除全部菜单项？"
            onConfirm={() => {
              setList([]);
              formRef.current?.resetFields();
            }}
          >
            <Button danger type="link" icon={<DeleteOutlined />}>
              清空
            </Button>
          </Popconfirm>
        )}
      </div>
    </ProForm>
  );
});
Content.displayName = 'Content';
export default Content;
