import React, { useState } from 'react'
import { Upload } from 'antd'
import ImgCrop from 'antd-img-crop'

const Demo = () => {
  const [fileList, setFileList] = useState<any[]>([
    {
      uid: '-1',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    }
  ])

  const onChange = ({ fileList: newFileList }: any) => {
    setFileList(newFileList)
  }

  const onPreview = async (file: any) => {
    let src = file.url
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader()
        reader.readAsDataURL(file.originFileObj)
        reader.onload = () => resolve(reader.result)
      })
    }
    const image = new Image()
    image.src = src
    const imgWindow: any = window.open(src)
    imgWindow.document.write(image.outerHTML)
  }
  const beforeUpload = (file: any, files: any) => {
    return true
    // return new Promise((resolve, reject) => {
    //   reject(file)
    // })
  }
  const customRequest = (opts: any) => {
    opts.onSuccess({}, opts.file)
  }
  return (
    <div className="Demo">
      <ImgCrop rotate>
        <Upload
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          listType="picture-card"
          fileList={fileList}
          onChange={onChange}
          onPreview={onPreview}
          beforeUpload={beforeUpload}
          customRequest={customRequest}
        >
          {fileList.length < 5 && '+ Upload'}
        </Upload>
      </ImgCrop>
    </div>
  )
}

export default Demo
