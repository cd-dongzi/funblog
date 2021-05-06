import React, { useState, useEffect, useRef } from 'react'
import { Form, Input, FormInstance, Button, Switch, Select } from 'antd'
import { PageContainer, UploadFile, UploadImg } from '@/components'
import rootConfig from '@root/src/shared/config'
import { Play } from '@root/src/models/play'
import { BlogTag } from '@root/src/models/blogTag'
import config from '@/config'
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
  initState?: Partial<Play>
  onAction: (value: FormData) => Promise<any>
}
interface BlogTpl {
  (props: Props): JSX.Element | null
}

const BlogTpl: BlogTpl = ({ title, confirmBtnText, loading, initState, onAction }) => {
  const ref = useRef<FormInstance>(null)
  const history = useHistory()
  const [fileType, setFileType] = useState('')
  const [tags, setTags] = useState<BlogTag[]>([])
  // 提交
  const onFinish = async (value: any) => {
    const formData = new FormData()
    for (const key in value) {
      const val = value[key]
      if (val === undefined) {
        continue
      }
      if (Type.isFile(val)) {
        formData.append(key, val)
        continue
      }
      if (key === 'folder' && Type.isArray(val) && Type.isFile(val[0])) {
        val.forEach((v: any) => {
          formData.append(`${key}[]`, new File([v], v.webkitRelativePath.split('/').join(rootConfig.fileSeparation)))
        })
        continue
      }
      // 封面
      if (key === 'cover' && !Type.isString(val)) {
        formData.append(key, value[key].originFileObj)
        continue
      }
      formData.append(key, JSON.stringify(value[key]))
    }
    await onAction(formData)
    history.push('/play/list')
  }
  // 获取标签
  useEffect(() => {
    async function load() {
      const { data } = await api.blogTag.getBlogTags()
      setTags(data)
    }
    load()
  }, [])
  // 字段更改
  const onValuesChange = (changedValues: any) => {
    if (changedValues.fileType) {
      setFileType(changedValues.fileType)
    }
  }
  // 设置默认
  useEffect(() => {
    if (initState) {
      ref.current?.setFieldsValue(initState)
      setFileType(initState.fileType as string)
    } else {
      setFileType('folder')
    }
  }, [initState])
  return (
    <PageContainer title={title} hasLoading loading={loading}>
      <Form
        ref={ref}
        labelCol={{ span: 3 }}
        wrapperCol={{ span: 12 }}
        onFinish={onFinish}
        onValuesChange={onValuesChange}
        initialValues={{
          source: config.source[0].value,
          isVisible: true,
          fileType: 'folder'
        }}
      >
        <Form.Item name="title" label="标题" rules={[{ required: true, message: '请输入标题' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="desc" label="描述" rules={[{ required: true, message: '请输入描述' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="tags" label="标签" rules={[{ required: true, message: '请选择标签' }]}>
          <TagSelect tags={tags} />
        </Form.Item>
        <Form.Item name="cover" label="封面" rules={[{ required: true, message: '请选择封面' }]}>
          <UploadImg crop />
        </Form.Item>
        <Form.Item name="fileType" label="文件类型">
          <Select>
            {config.fileTypeList.map((v) => (
              <Select.Option key={v.name} value={v.type}>
                {v.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        {fileType === 'file' && (
          <Form.Item name="file" label="文件" rules={[{ required: true, type: 'object', message: '请选择文件' }]}>
            <UploadFile fileTypes={['html', 'css', 'javascript', 'pdf']} />
          </Form.Item>
        )}
        {fileType === 'folder' && (
          <Form.Item name="folder" label="文件夹" rules={[{ required: true, type: 'array', message: '请选择文件夹' }]}>
            <UploadFile directory />
          </Form.Item>
        )}
        <Form.Item name="source" label="来源" rules={[{ required: true, message: '请选择来源' }]}>
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
