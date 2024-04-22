import { ProForm, ProFormInstance } from '@ant-design/pro-components';
import { Button } from 'antd';
import cls from 'classnames';
import { isEqual } from 'lodash';
import { useRef, useState } from 'react';
import FormItem, { FormItemProps } from '@/components/FormItem';
import Title from './Title';
import styles from './style.module.css';

function PanelSetting<T extends Record<string, any>>({
  title,
  list,
  request,
  onSubmit,
  initialValues,
  steps,
  className,
}: {
  list?: FormItemProps[];
  request: () => Promise<T>;
  onSubmit: (values: T) => Promise<void>;
  title?: string;
  initialValues?: T;
  steps?: { title: string; list: FormItemProps[] }[];
  className?: string;
}) {
  const formRef = useRef<ProFormInstance>();
  const [state, setState] = useState<T>({} as T);
  const [loading, setLoading] = useState(false);
  const [changed, setChanged] = useState(false);
  const onValuesChange = () => {
    const values = formRef.current?.getFieldsValue();
    for (const key in values) {
      if (!isEqual(values[key], state[key])) {
        setChanged(true);
        return;
      }
    }
  };
  return (
    <div className={cls('[&:not(:last-child)]:mb-[50px]', styles.container, className)}>
      {title && <Title title={title} />}
      <ProForm<T>
        formRef={formRef}
        layout="horizontal"
        labelAlign="left"
        submitter={false}
        loading={loading}
        initialValues={initialValues}
        request={async () => {
          const _state = await request();
          setState(_state);
          return _state;
        }}
        onFinish={async (value) => {
          try {
            setLoading(true);
            await onSubmit(value);
            setState(value);
            setChanged(false);
          } finally {
            setLoading(false);
          }
        }}
        onValuesChange={onValuesChange}
      >
        {list?.map((item) => {
          return <FormItem key={item.name} item={item} boxClassName="pl-4" />;
        })}
        {steps?.map((step) => (
          <div key={step.title}>
            <Title title={step.title} />
            {step.list.map((item) => (
              <FormItem key={item.name} item={item} boxClassName="pl-4" />
            ))}
          </div>
        ))}
      </ProForm>
      {changed && (
        <div className="text-center">
          <Button onClick={() => formRef.current?.resetFields()} className="mr-4">
            重置
          </Button>
          <Button type="primary" onClick={() => formRef.current?.submit()}>
            保存
          </Button>
        </div>
      )}
    </div>
  );
}

export default PanelSetting;
