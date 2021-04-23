import React, { useEffect, useRef } from 'react'
import { Form, Input, FormInstance, Switch } from 'antd'
import { ModalCard } from '@/appComponents'
import { Github } from '@root/src/models/github'

type Props = {
  title: string
  visible: boolean
  currentItem?: Github
  onCancel: () => void
  onReload: () => void
  onAction: (value: Github, type: string) => Promise<any>
}
interface GithubTpl {
  (props: Props): JSX.Element | null
}

const GithubTpl: GithubTpl = ({ title, visible, currentItem, onCancel, onReload, onAction }) => {
  const ref = useRef<FormInstance>(null)
  const onOk = async () => {
    ref.current?.validateFields().then(async (value) => {
      await onAction(value, currentItem ? 'edit' : 'add')
      onCancel()
      onReload()
    })
  }
  useEffect(() => {
    if (currentItem) {
      ref.current?.setFieldsValue(currentItem)
    }
  }, [currentItem])
  return (
    <ModalCard title={title} visible={visible} onOk={onOk} onCancel={onCancel}>
      <Form
        ref={ref}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 12 }}
        initialValues={{
          isVisible: true
        }}
      >
        <Form.Item name="name" label="项目名称" rules={[{ required: true, message: '请输入项目名称' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="isVisible" label="是否可见" valuePropName="checked">
          <Switch />
        </Form.Item>
      </Form>
    </ModalCard>
  )
}

export default GithubTpl
