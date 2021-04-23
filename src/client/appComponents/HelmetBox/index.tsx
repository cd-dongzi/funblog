import React from 'react'
import { Helmet } from 'react-helmet-async'
import { headCore } from '@/utils/app'
import rootConfig from '@root/src/shared/config'
import config from '@/config'

type Props = {
  title?: string
  keywords?: string
  description?: string
}
interface HelmetBox {
  (props: Props): JSX.Element | null
}

const HelmetBox: HelmetBox = ({ title, keywords, description }) => {
  const oTitle = headCore.setTitle(title)
  const kwords = headCore.setKeywords(keywords)
  const desc = headCore.setDescription(description)
  return (
    <Helmet>
      <title>{oTitle}</title>
      <meta name="keywords" content={kwords} />
      <meta name="description" content={desc} />
      <meta property="og:locale" content="zh_CN" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={oTitle} />
      <meta property="og:url" content={config.isClient ? location.href : process.APP_HREF} />
      <meta property="og:description" content={desc} />
      <meta property="og:site_name" content={rootConfig.head.title} />
    </Helmet>
  )
}

export default HelmetBox
