'use client';
import { ProForm, ProFormInstance } from '@ant-design/pro-components';
import { typeUtil } from '@funblog/utils';
import { Button, Drawer } from 'antd';
import cls from 'classnames';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import Editor from '@/components/Editor';
import FormItem, { FormItemProps } from '@/components/FormItem';
import useScreen from '@/hooks/useScreen';
import { message } from '@/lib/EscapeAntd';
import { changedFields } from './fields';
import styles from './style.module.css';

interface PostEditorBase {
  title: string;
  content: string;
  [k: string]: any;
}
interface PostEditorProps<T> {
  request: () => Promise<T | boolean>;
  fields: FormItemProps[];
  onSubmit: (data: T) => Promise<void>;
}
function PostEditor<T extends PostEditorBase>({ fields, request, onSubmit }: PostEditorProps<T>) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const originRef = useRef({
    data: undefined as T | undefined,
  });
  const [data, setData] = useState<T>();
  const formRef = useRef<ProFormInstance>();
  const { width, screens } = useScreen();
  const [formEx, setFormEx] = useState<PostEditorBase>({
    title: '',
    content: '',
  });
  const router = useRouter();

  const large = width > screens.lg;

  const handleSubmit = async () => {
    if (!formEx.title.trim()) {
      return message.warning('请输入文章标题');
    }
    if (!formEx.content.trim()) {
      return message.warning('请输入文章内容');
    }
    let _data;
    try {
      _data = await formRef.current?.validateFields();
    } catch (err) {
      !large && message.warning('存在未配置的必填项');
    }
    if (!_data) return;
    const params = {
      ..._data,
      ...formEx,
    };
    const modifiedParams = changedFields(params, originRef.current.data) as T;
    setLoading(true);
    try {
      await onSubmit(modifiedParams);
    } finally {
      setLoading(false);
    }
    // try {
    //   if (postId) {
    //     await updatePost(+postId, changedFields(params, originRef.current.info));
    //     message.info('保存成功');
    //   } else {
    //     const { id } = await createPost(params);
    //     message.info('创建成功');
    //     router.replace(`/post/editor?id=${id}`);
    //   }
    // } catch (err) {}
  };

  useEffect(() => {
    if (data) {
      setFormEx((prev) => ({
        ...prev,
        title: data.title,
        content: data.content,
      }));
    }
  }, [data]);

  const form = (
    <ProForm
      formRef={formRef}
      submitter={false}
      loading={loading}
      request={async () => {
        const res = await request();
        if (typeUtil.isObject(res)) {
          setData(res);
          originRef.current.data = res;
          return res;
        }
        return res;
      }}
      initialValues={{
        priority: 1,
      }}
    >
      {fields.map((item) => (
        <FormItem key={item.name} item={item} />
      ))}
    </ProForm>
  );
  return (
    <div className={cls('h-screen bg-white', styles.container)}>
      <div className="flex h-full overflow-auto">
        <div className={cls('flex-1', styles.box)}>
          <div className="flex h-[60px] justify-between bg-white">
            <input
              type="text"
              name="title"
              value={formEx.title}
              onChange={(e) => setFormEx((prev) => ({ ...prev, title: e.target.value }))}
              className="flex-1 bg-[transparent] pl-4 pt-1 text-[24px] font-bold text-gray1 [border:none] [outline:none] lg:pl-8"
              placeholder="添加标题"
            />
            <div className="flex h-full items-center justify-center pr-6">
              <Button type="link" className="mr-2" onClick={router.back}>
                返回
              </Button>
              {!large && (
                <Button type="dashed" className="mr-4" onClick={() => setOpen(true)}>
                  配置
                </Button>
              )}
              <Button type="primary" onClick={handleSubmit} loading={loading}>
                保存
              </Button>
            </div>
          </div>
          <Editor value={formEx.content} onChange={(val) => setFormEx((prev) => ({ ...prev, content: val }))} />
        </div>
        {large && <div className="h-full w-[348px] overflow-auto px-[24px] pt-7">{form}</div>}
      </div>
      {!large && (
        <Drawer autoFocus forceRender open={open} closable={false} width={348} onClose={() => setOpen(false)}>
          {form}
        </Drawer>
      )}
    </div>
  );
}

export default PostEditor;
