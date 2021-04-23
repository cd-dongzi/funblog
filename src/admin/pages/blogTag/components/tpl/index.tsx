import React, { useEffect, useRef } from 'react'
import { Input, Form, FormInstance, Tag, Switch } from 'antd'
import { BlogTag } from '@root/src/models/blogTag'
import { ModalCard } from '@/appComponents'
import { ColorPicker } from '@/components'

const Color = ({ value, onChange }: { value?: string; onChange?: (value: string) => void }) => {
  return (
    <>
      <Tag className="blog-tags-tpl__tag" color={value}>
        {value}
      </Tag>
      <ColorPicker value={value} onChange={onChange} />
    </>
  )
}

export type TplProps = {
  title: string
  visible: boolean
  loading: boolean
  initState?: Omit<BlogTag, '_id'>
  onCancel: () => void
  onSuccess: () => void
  onAction: (value: any) => Promise<any>
}
interface BlogTagsTpl {
  (props: TplProps): JSX.Element | null
}

const BlogTagsTpl: BlogTagsTpl = ({ visible, loading, initState, title, onCancel, onSuccess, onAction }) => {
  const ref = useRef<FormInstance>(null)
  const onOk = async () => {
    ref.current?.submit()
  }
  const onFinish = async (value: any) => {
    await onAction(value)
    onCancel()
    onSuccess()
  }
  useEffect(() => {
    if (initState) {
      ref.current?.setFieldsValue(initState)
    }
  }, [initState])
  return (
    <ModalCard className="blog-tags-tpl" loading={loading} visible={visible} title={title} onCancel={onCancel} onOk={onOk}>
      <Form ref={ref} onFinish={onFinish} initialValues={{ color: '#f00', isVisible: true }}>
        <Form.Item label="名字" name="name" rules={[{ required: true, message: '请输入名字' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Icon" name="icon" rules={[{ required: true, message: '请输入Icon名' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="是否可见" name="isVisible" valuePropName="checked" rules={[{ required: true }]}>
          <Switch />
        </Form.Item>
        <Form.Item label="颜色" name="color" rules={[{ required: true, message: '请选择颜色' }]}>
          <Color />
        </Form.Item>
      </Form>
    </ModalCard>
  )
}

export default BlogTagsTpl
