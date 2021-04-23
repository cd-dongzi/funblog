import React, { useEffect } from 'react'
import config from '@/config'
import { copyTextByDom } from '@/utils/app'
import { notification, ALink } from '@/components'
import Card from '../card'
import './style.less'

type Props = unknown
interface MePersonal {
  (props: Props): JSX.Element | null
}

const MePersonal: MePersonal = () => {
  useEffect(() => {
    copyTextByDom('me-personal-val', {
      success: (e) => {
        notification.stack.show(`复制成功：${e.text}`)
      }
    })
  }, [])
  return (
    <Card title="关于我" className="me-personal">
      <p className="snippet">读万卷书不如行万里路，行万里路不如阅人无数；阅人无数不如名师指路，名师指路不如自己去悟。</p>
      <ul className="list">
        {config.personalList.map((item) => (
          <li key={item.label}>
            <span>{item.label}</span>：<span className={item.copy ? 'me-personal-val' : ''}>{item.value}</span>
            {item.href && (
              <ALink href={item.href} target="_blank">
                {item.hrefText}
              </ALink>
            )}
          </li>
        ))}
      </ul>
    </Card>
  )
}

export default MePersonal
