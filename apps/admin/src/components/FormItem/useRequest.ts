import { ProFormSelect, RequestOptionsType } from '@ant-design/pro-components';
import { ComponentProps, useRef } from 'react';
import { FormItemProps } from './types';

export default function useRequest(item: FormItemProps): FormItemProps {
  const ref = useRef({
    data: undefined as RequestOptionsType[] | undefined,
    loaded: false,
  });
  const _item = item as ComponentProps<typeof ProFormSelect>;
  if (_item.request && item.loadOnce) {
    return {
      ...item,
      request: async (params, props) => {
        if (ref.current.loaded) {
          return ref.current.data;
        }
        const data = await _item.request?.(params, props);
        ref.current.loaded = true;
        ref.current.data = data;
        return data;
      },
    } as ComponentProps<typeof ProFormSelect> as FormItemProps;
  }
  return {
    ...item,
  } as FormItemProps;
}
