import React, { useRef, useEffect, useState } from 'react'
import { Upload, Button, message } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { UploadFile as UploadF } from 'antd/lib/upload/interface'

type FileItem =
  | {
      uid: string
      name: string
      url: string
      status: string
    }
  | UploadF<any>
  | File
  | Blob
type Value = FileItem | FileItem[] | string | string[]
type Props = {
  value?: Value
  onChange?: (value?: Value) => void
  directory?: boolean
  fileTypes?: string[]
}
interface UploadFile {
  (props: Props): JSX.Element | null
}

const UploadFile: UploadFile = ({ value, fileTypes = [], onChange, directory = false }) => {
  const [fileList, setFileList] = useState<FileItem[]>([])
  const state = useRef({
    count: 0
  })
  const beforeUpload = (file: File, fileList: File[]) => {
    state.current.count++
    if (!directory) {
      if (fileTypes.length === 0) {
        onChange && onChange(file)
        return false
      }
      if (fileTypes.every((fileType) => file.type.indexOf(fileType) < 0)) {
        message.error('请选择正确的类型')
        return Upload.LIST_IGNORE as any
      } else {
        onChange && onChange(file)
        setFileList(fileList)
      }
    } else {
      if (state.current.count === fileList.length) {
        onChange && onChange(fileList)
        setFileList(fileList)
      }
    }
    return false
  }
  useEffect(() => {
    if (!value) return
    let index = 0
    const format = (val: FileItem | string): FileItem => {
      if (typeof val === 'string') {
        const name = val.substring(val.lastIndexOf('/') + 1, val.length)
        return {
          uid: ++index + '',
          url: val,
          name: val,
          status: 'done'
        }
      } else {
        return val
      }
    }
    if (Array.isArray(value)) {
      setFileList(
        value.map((item: FileItem | string) => {
          return format(item)
        })
      )
    } else {
      setFileList([format(value)])
    }
  }, [value])
  return (
    <Upload fileList={fileList as UploadF<any>[]} directory={directory} beforeUpload={beforeUpload}>
      <Button icon={<UploadOutlined />}>Upload</Button>
    </Upload>
  )
}

export default UploadFile
