import React from 'react'
import { ReactElement } from 'react'
import { IStoreState } from '@client/store'
import rootConfig from '@root/src/shared/config'
import theme from '@client/theme'

type Props = {
  children: string
  helmetContext: AnyObject
  scripts: ReactElement<any>[]
  styles: ReactElement<any>[]
  inlineStyle?: ReactElement<any>[] // 内联style
  links: ReactElement<any>[] // link
  state: IStoreState
  favicon: string
}

const HTML = ({ children, helmetContext: { helmet }, scripts, styles, inlineStyle, links, state, favicon }: Props) => {
  const metaComponents = helmet.meta.toComponent()
  const titleComponents = helmet.title.toComponent()
  const hasTitle = !!titleComponents[0].props.children
  const isInlineStyle = !!inlineStyle
  const filterLinks = links.filter((link) => {
    if (isInlineStyle && link.props.as === 'style') {
      return false
    }
    return true
  })
  const hasMeta = metaComponents.length > 0
  return (
    <html data-pc={state.system.isPC} data-theme="light">
      <head>
        <meta charSet="utf-8" />
        {hasTitle ? titleComponents : <title>{rootConfig.head.title}</title>}
        <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta name="renderer" content="webkit" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no, viewport-fit=cover" />
        <meta name="author" content="Wintermelon" />
        {helmet.base.toComponent()}
        {hasMeta ? (
          metaComponents
        ) : (
          <>
            <meta name="keywords" content={rootConfig.head.meta.keywords} />
            <meta name="description" content={rootConfig.head.meta.description} />
          </>
        )}
        {helmet.link.toComponent()}
        {helmet.script.toComponent()}
        <link rel="icon" href={favicon} type="image/x-icon" />
        {filterLinks}
        <style id="style-variables">
          {`:root {${Object.keys(theme.light)
            .map((key) => `${key}:${theme.light[key]};`)
            .join('')}}`}
        </style>
        {isInlineStyle ? inlineStyle : styles}
        <script
          dangerouslySetInnerHTML={{
            __html: `window.__PRELOADED_STATE__ = ${JSON.stringify(state).replace(/</g, '\\u003c')}`
          }}
        />
        <script async src="//at.alicdn.com/t/font_2062907_scf16rx8d6.js"></script>
      </head>
      <body>
        <div id="app" className="app" dangerouslySetInnerHTML={{ __html: children }}></div>
        {scripts}
        <script src="https://apis.google.com/js/platform.js" async />
        <script
          dangerouslySetInnerHTML={{
            __html: `var _hmt = _hmt || []
            ;(function () {
              var hm = document.createElement('script')
              hm.src = 'https://hm.baidu.com/hm.js?be64136840b57aa11286796a9e3436f1'
              var s = document.getElementsByTagName('script')[0]
              s.parentNode.insertBefore(hm, s)
            })()`
          }}
        />
      </body>
    </html>
  )
}

export default HTML
