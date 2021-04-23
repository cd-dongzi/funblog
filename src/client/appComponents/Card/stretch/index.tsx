import React, { useEffect, useRef, useState } from 'react'
import classnames from 'classnames'
import { Icon, ALink } from '@/components'
import { Play } from '@root/src/models/play'
import { formatDate } from '@/utils/date'
import CardContainer from '../container'
import './style.less'
import { useSelector } from 'react-redux'
import { IStoreState } from '@/store'
type Props = {
  item: Play
  onDownload: (id: string) => void
}
interface CardStretch {
  (props: Props): JSX.Element | null
}

const CardStretch: CardStretch = ({ item, onDownload }) => {
  const [downloadNums, setDownloadNums] = useState(item.download_nums || 0)
  const app = useSelector((state: IStoreState) => state.app)
  const wrapperRef = useRef<any>(null)
  const insideRef = useRef<HTMLDivElement>(null)
  const coverRef = useRef<HTMLImageElement>(null)
  const [showSetting, setShowSetting] = useState(false)

  const onBack = () => {
    setShowSetting(false)
  }
  const handleDownload = (id: string) => {
    onDownload(id)
    onBack()
    setDownloadNums((prev) => ++prev)
  }
  const onMouseEnter = () => {
    if (wrapperRef.current && coverRef.current && insideRef.current) {
      const coverHeight = coverRef.current.getBoundingClientRect().height
      wrapperRef.current.style = `--card_stretch_cover_height: ${coverHeight}px`
      insideRef.current.classList.add('animate')
    }
  }
  const onMouseLeave = () => {
    insideRef.current?.classList.remove('animate')
  }

  const onClick = () => {
    if (!insideRef.current?.classList.contains('animate')) {
      onMouseEnter()
    } else {
      onMouseLeave()
    }
  }

  useEffect(() => {
    setDownloadNums(item.download_nums)
  }, [item.download_nums])

  const isSmall = app.layoutSize === 'small'
  return (
    <CardContainer className="card-stretch">
      <div ref={wrapperRef} className="wrapper">
        <div
          className="inside df-c"
          ref={insideRef}
          onMouseEnter={() => !isSmall && onMouseEnter()}
          onMouseLeave={() => !isSmall && onMouseLeave()}
          onClick={() => isSmall && onClick()}
        >
          <Icon name="info" />
          <p className="desc">{item.desc}</p>
        </div>
        <div className="cover-box">
          <img className="cover" ref={coverRef} src={item.cover} />
          <span className="download-count">下载次数：{downloadNums}</span>
        </div>
        <div
          className={classnames('foot', {
            show: showSetting
          })}
        >
          <div className="meta df-col-c">
            <time>{formatDate(item.createTime)}</time>
            <h2 className="wes-2">{item.title}</h2>
          </div>
          <div className="btn df-c more" onClick={() => setShowSetting(true)}>
            <Icon name="setting" />
          </div>
          <div className="box">
            <div className="btn df-c" onClick={onBack}>
              <Icon name="back" />
            </div>
            <div className="controls df-c">
              <ALink className="handle df-col-c" href={item.url} target="_blank">
                <Icon name="yanshi" />
                <span>效果演示</span>
              </ALink>
              <div className="handle df-col-c" onClick={() => handleDownload(item._id)}>
                <Icon name="download" />
                <span>下载</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CardContainer>
  )
}

export default CardStretch
