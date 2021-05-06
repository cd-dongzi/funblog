import React, { useState, useEffect, useRef } from 'react'
import { Form, Input, FormInstance, Select, Button, Switch } from 'antd'
import { PageContainer, MdEditor, UploadImg } from '@/components'
import config from '@/config'
import { Blog } from '@root/src/models/blog'
import { BlogTag } from '@root/src/models/blogTag'
import api from '@/api'
import Type from '@root/src/shared/type'
import { useHistory } from 'react-router'

const TagSelect = ({ value, onChange, tags }: { value?: BlogTag[]; onChange?: (val: Partial<BlogTag>[]) => void; tags: BlogTag[] }) => {
  const [defaultValue, setDefaultValue] = useState<string[]>([])
  const handleChange = (val: string[]) => {
    onChange &&
      onChange(
        val.map((v) => {
          const o = tags.find((g) => g.name === v)
          if (!o) return {}
          return {
            icon: o.icon,
            name: o.name,
            color: o.color
          }
        })
      )
  }
  useEffect(() => {
    if (value) {
      setDefaultValue(value.map((v) => v.name))
    }
  }, [value])
  return (
    <Select allowClear value={defaultValue} mode="multiple" onChange={handleChange}>
      {tags.map((tag) => (
        <Select.Option key={tag._id} value={tag.name}>
          {tag.name}
        </Select.Option>
      ))}
    </Select>
  )
}

type Props = {
  title: string
  confirmBtnText: string
  loading: boolean
  initState?: Partial<Blog>
  onAction: (value: FormData) => Promise<any>
}
interface BlogTpl {
  (props: Props): JSX.Element | null
}

const BlogTpl: BlogTpl = ({ title, confirmBtnText, loading, initState, onAction }) => {
  const ref = useRef<FormInstance>(null)
  const history = useHistory()
  const [tags, setTags] = useState<BlogTag[]>([])
  const onFinish = async (value: any) => {
    const formData = new FormData()
    for (const key in value) {
      if (value[key] === undefined) {
        continue
      }
      // 封面
      if (key === 'cover') {
        const val = value[key]
        if (!Type.isString(val)) {
          formData.append(key, value[key].originFileObj)
          continue
        }
      }
      formData.append(key, JSON.stringify(value[key]))
    }
    await onAction(formData)
    history.push('/blog/list')
  }
  useEffect(() => {
    async function load() {
      const { data } = await api.blogTag.getBlogTags()
      setTags(data)
    }
    load()
  }, [])
  useEffect(() => {
    if (initState) {
      ref.current?.setFieldsValue(initState)
    }
  }, [initState])
  return (
    <PageContainer title={title} hasLoading loading={loading}>
      <Form
        ref={ref}
        labelCol={{ span: 3 }}
        wrapperCol={{ span: 12 }}
        onFinish={onFinish}
        initialValues={{
          source: config.source[0].value,
          isVisible: true
        }}
      >
        <Form.Item name="title" label="文章标题" rules={[{ required: true, message: '请输入文章标题' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="desc" label="文章描述" rules={[{ required: true, message: '请输入文章描述' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="tags" label="文章标签" rules={[{ required: true, message: '请选择文章标签' }]}>
          <TagSelect tags={tags} />
        </Form.Item>
        <Form.Item name="cover" label="文章图片" rules={[{ required: true, message: '请选择文章图片' }]}>
          <UploadImg crop />
        </Form.Item>
        <Form.Item wrapperCol={{ span: 21 }} name="md" label="文章内容" rules={[{ required: true, message: '请输入文章内容' }]}>
          <MdEditor />
        </Form.Item>
        <Form.Item name="source" label="文章来源" rules={[{ required: true, message: '请选择文章来源' }]}>
          <Select>
            {config.source.map((v) => (
              <Select.Option key={v.value} value={v.value}>
                {v.label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="github" label="Github">
          <Input />
        </Form.Item>
        <Form.Item name="isVisible" label="是否可见" valuePropName="checked">
          <Switch />
        </Form.Item>
        <Form.Item className="form-btns__center">
          <Button type="primary" htmlType="submit">
            {confirmBtnText}
          </Button>
          <Button type="link" onClick={() => history.goBack()}>
            取消
          </Button>
        </Form.Item>
      </Form>
    </PageContainer>
  )
}

export default BlogTpl
