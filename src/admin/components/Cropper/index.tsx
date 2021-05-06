import React, { useCallback, useRef, useState } from 'react'
import { Modal, Button, Spin, Switch } from 'antd'
import Crop from 'react-cropper'
import GIF from 'gif.js'
import { GifToCanvas } from './gifToCanvas'
import 'cropperjs/dist/cropper.css'

type Props = {
  children: any
  quality?: number
}
interface Cropper {
  (props: Props): JSX.Element | null
}

const Cropper: Cropper = ({ children, quality }) => {
  const [cropGif, setCropGif] = useState(false)
  const [src, setSrc] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const beforeUploadRef = useRef<any>()
  const fileRef = useRef<any>()
  const resolveRef = useRef<(value: unknown) => void>()
  const rejectRef = useRef<(reason?: any) => void>()
  const [cropper, setCropper] = useState<globalThis.Cropper>()

  // upload组件
  const renderUpload = useCallback(() => {
    const upload = Array.isArray(children) ? children[0] : children
    const { beforeUpload, ...restProps } = upload.props
    beforeUploadRef.current = beforeUpload
    return {
      ...upload,
      props: {
        ...restProps,
        beforeUpload: (file: File) => {
          return new Promise((resolve, reject) => {
            fileRef.current = file
            resolveRef.current = resolve
            rejectRef.current = reject
            setSrc(URL.createObjectURL(file))
          })
        }
      }
    }
  }, [children])

  // 取消
  const onCancel = () => {
    setSrc('')
  }

  // 裁剪图片
  const cropImgHandle = () => {
    return new Promise((resolve, reject) => {
      const { type, name, uid } = fileRef.current
      cropper?.getCroppedCanvas().toBlob(
        async (blob) => {
          if (blob) {
            const nArr = name.split('.')
            const suffix = nArr[nArr.length - 1]
            let fileName = name
            if (suffix === 'gif') {
              fileName = [...nArr.slice(0, -1), blob.type.split('/')[1]].join('.')
            }
            let newFile: any = new File([blob], fileName, { type: blob.type })
            newFile.uid = uid
            if (typeof beforeUploadRef.current !== 'function') {
              return resolve(newFile)
              // return resolveRef.current?.(newFile)
            }
            const res = beforeUploadRef.current(newFile, [newFile])
            if (typeof res !== 'boolean' && !res) {
              console.error('beforeUpload must return a boolean or Promise')
              return reject('beforeUpload must return a boolean or Promise')
              // return
            }
            if (res === true) {
              return resolve(newFile)
              // return resolveRef.current?.(newFile)
            }
            if (res === false) {
              return reject('not upload')
              // return rejectRef.current?.('not upload')
            }

            if (res && typeof res.then === 'function') {
              try {
                const passedFile = await res
                const type = Object.prototype.toString.call(passedFile)
                if (type === '[object File]' || type === '[object Blob]') {
                  newFile = passedFile
                }
                // resolveRef.current?.(newFile)
                resolve(newFile)
              } catch (err) {
                // rejectRef.current?.(err)
                reject(err)
              }
            }
          }
        },
        type,
        quality
      )
    })
  }

  // 裁剪GIF
  const cropGifHandle = () => {
    return new Promise<Blob>((resolve, reject) => {
      if (cropper) {
        const url = (cropper as any).url
        const cropBoxData = cropper.getCropBoxData()
        const canvasData = cropper.getCanvasData()
        const gifToCanvas = new GifToCanvas(url, {
          targetOffset: {
            dx: cropBoxData.left - canvasData.left,
            dy: cropBoxData.top - canvasData.top,
            width: canvasData.width,
            height: canvasData.height,
            sWidth: cropBoxData.width,
            sHeight: cropBoxData.height
          }
        })
        const gif = new GIF({
          workers: 2,
          quality: 10,
          workerScript: '/static/js/gif.worker.js'
        })
        const addFrame = (canvas: HTMLCanvasElement, delay: number) => {
          gif.addFrame(canvas, { copy: true, delay })
        }
        gifToCanvas.on('progress', (canvas, delay) => {
          addFrame(canvas, delay)
        })
        gifToCanvas.on('finished', (canvas, delay) => {
          addFrame(canvas, delay)
          gif.render()
        })
        gif.on('finished', (blob) => {
          resolve(blob)
        })
        gifToCanvas.init()
      } else {
        reject()
      }
    })
  }

  const getPreviewSrc = async () => {
    const hasGifFile = fileRef.current.type.includes('gif')
    if (cropGif && hasGifFile) {
      const blob = await cropGifHandle()
      return URL.createObjectURL(blob)
    } else {
      return cropper?.getCroppedCanvas().toDataURL()
    }
  }

  const onPreview = async () => {
    setLoading(true)
    const url = await getPreviewSrc()
    setLoading(false)
    Modal.info({
      title: '图片预览',
      content: <img className="preview-img" src={url} />
    })
  }

  const onOk = async () => {
    setLoading(true)
    try {
      const hasGifFile = fileRef.current.type.includes('gif')
      if (cropGif && hasGifFile) {
        const blob = await cropGifHandle()
        const { name, uid } = fileRef.current
        const newFile: any = new File([blob], name, { type: blob.type })
        newFile.uid = uid
        resolveRef.current?.(newFile)
      } else {
        const newFile = await cropImgHandle()
        resolveRef.current?.(newFile)
      }
    } catch (err) {
      rejectRef.current?.(err)
    }
    setLoading(false)
    onCancel()
  }
  return (
    <>
      {renderUpload()}
      {src && (
        <Modal
          title="裁剪图片"
          visible={true}
          onCancel={onCancel}
          maskClosable={false}
          footer={
            <Spin spinning={loading}>
              <Switch
                checkedChildren="裁剪GIF"
                unCheckedChildren="不裁剪GIF"
                defaultChecked={cropGif}
                onChange={(val) => setCropGif(val)}
                style={{ marginRight: '20px' }}
              />
              <Button key="preview" onClick={onPreview}>
                预览
              </Button>
              <Button key="back" onClick={onCancel}>
                取消
              </Button>
              <Button key="submit" type="primary" onClick={onOk}>
                确认
              </Button>
            </Spin>
          }
        >
          <Crop
            style={{ height: 400, width: '100%' }}
            initialAspectRatio={1}
            src={src}
            viewMode={1}
            guides={true}
            minCropBoxHeight={10}
            minCropBoxWidth={10}
            background={false}
            responsive={true}
            autoCropArea={1}
            checkOrientation={false}
            onInitialized={(instance) => {
              setCropper(instance)
            }}
          />
        </Modal>
      )}
    </>
  )
}

export default Cropper
