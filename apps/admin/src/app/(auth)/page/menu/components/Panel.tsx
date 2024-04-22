import { RightOutlined, DeleteOutlined } from '@ant-design/icons';
import { PageMenuButton, PageMenuButtonType, Svg } from '@funblog/types';
import { Button } from 'antd';
import cls from 'classnames';
import { m } from 'framer-motion';
import React, { useState } from 'react';
import FormItem from '@/components/FormItem';
import { formRules } from '@/config/formRules';
import { MENU_BUTTON_TYPE } from '../../constants';

function MenuPanel({
  data,
  index,
  onRemove,
  svgList,
}: {
  data: PageMenuButton;
  index: number;
  onRemove: (index: number) => void;
  svgList: Svg[];
}) {
  const [show, setShow] = useState(false);
  const inputUrl = [PageMenuButtonType.URL].some((v) => v === data.buttonType);
  return (
    <div className="mb-2 rounded-[4px] bg-white ![border:1px_solid_theme(colors.gray7)]">
      <div
        className="flex cursor-pointer items-center justify-between bg-gray9 px-4 py-3"
        onClick={() => setShow((prev) => !prev)}
      >
        <div className="mr-8 text-sm text-gray2">{data.name}</div>
        <div className="flex items-center">
          <span className="mr-1 text-sm text-gray3">{MENU_BUTTON_TYPE[data.buttonType]}</span>
          <RightOutlined
            className="text-[8px] text-gray3"
            onClick={(event) => {
              event.stopPropagation();
            }}
          />
        </div>
      </div>
      {
        <m.div
          initial={{ height: 0 }}
          animate={show ? { height: 'auto' } : { height: '0' }}
          data-no-dnd="true"
          className={cls('overflow-hidden')}
        >
          <div className="px-4 pt-4 [border-top:1px_solid_theme(colors.gray7)]">
            {inputUrl && (
              <FormItem
                item={{
                  type: 'text',
                  label: 'URL',
                  name: `field_${index}_url`,
                  placeholder: '请输入',
                  colon: false,
                  required: false,
                  rules: [formRules.urlOrPath],
                }}
              />
            )}
            <FormItem
              item={{
                type: 'text',
                label: '名称',
                name: `field_${index}_name`,
                placeholder: '请输入',
                colon: false,
                required: false,
                rules: [{ required: true, message: '请输入名称' }],
              }}
            />
            <FormItem
              item={{
                type: 'svg',
                label: 'icon',
                name: `field_${index}_icon`,
                colon: false,
                required: false,
                options: svgList,
              }}
            />
            <FormItem
              item={{
                type: 'checkbox',
                name: `field_${index}_open`,
                children: '是否在新窗口打开',
                colon: false,
                required: false,
              }}
            />
            <div className="mb-2 flex justify-end">
              <Button
                danger
                type="link"
                icon={<DeleteOutlined />}
                onClick={() => {
                  onRemove(index);
                }}
              >
                删除
              </Button>
            </div>
          </div>
        </m.div>
      }
    </div>
  );
}

export default MenuPanel;
