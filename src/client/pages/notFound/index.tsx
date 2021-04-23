import React, { useEffect, useRef } from 'react'
import { useHistory } from 'react-router'
import { HelmetBox } from '@/appComponents'
import './style.less'

const NotFound = () => {
  const ref = useRef<HTMLIFrameElement>(null)
  const history = useHistory()
  useEffect(() => {
    const iframe = ref.current
    if (iframe) {
      const body = iframe.contentDocument?.getElementsByTagName('body')[0]
      const script = document.createElement('script')
      script.src = '//qzonestyle.gtimg.cn/qzone/hybrid/app/404/search_children.js'

      const url = 'https://dzblog.cn'
      script.setAttribute('homePageUrl', url)
      script.setAttribute('homePageName', '回到陈冬的主页')
      body?.appendChild(script)

      setTimeout(() => {
        const aList: any[] = Array.from(body?.getElementsByTagName('a') as any)
        const nodes = aList.filter((el) => {
          return el.getAttribute('href') === url
        })
        nodes.forEach((el) => {
          el.setAttribute('href', 'javascript:;')
          el.onclick = () => {
            history.replace('/')
          }
        })
      }, 500)
    }
  }, [history])
  return (
    <div className="not-found">
      <HelmetBox title="NotFound - 404" keywords="NotFount,404" description="页面找不见啦" />
      <iframe className="not-found__iframe" ref={ref}></iframe>
    </div>
  )
}

export default NotFound
