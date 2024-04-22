import { ProFormSelect } from '@ant-design/pro-components';
import { SvgBox } from '@funblog/components';
import { ComponentProps } from 'react';

function FormSvg(props: ComponentProps<typeof ProFormSelect>) {
  return (
    <ProFormSelect
      {...props}
      fieldProps={{
        optionFilterProp: 'label',
        showSearch: true,
        filterOption: (input, option: any) => {
          return option.name.includes(input);
        },
        fieldNames: {
          value: 'name',
        },
        optionRender: ({ data }) => {
          return (
            <div className="text-base text-gray3">
              <SvgBox content={data.content} className="mr-3" />
              <span>{data.name}</span>
            </div>
          );
        },
      }}
    />
  );
}

export default FormSvg;
