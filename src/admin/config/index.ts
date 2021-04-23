import rootConfig from '@root/src/shared/config'
export default {
  isProd: rootConfig.isProd,
  system: {
    baseURL: `${rootConfig.app.server.protocol}://${rootConfig.app.server.host}:${rootConfig.app.server.port}`
  },
  cacheKeyMap: {
    tabViews: 'tab_views'
  },
  screenSizes: [
    { size: 'xl', width: 1200, layout: 'large' },
    { size: 'lg', width: 992, layout: 'large' },
    { size: 'md', width: 768, layout: 'small' },
    { size: 'sm', width: 576, layout: 'small' },
    { size: 'xs', width: 0, layout: 'small' }
  ],
  fileTypeList: [
    { name: '文件', type: 'file' },
    { name: '文件夹', type: 'folder' }
  ],
  source: [
    { label: '原创', value: '原创' },
    { label: '转载', value: '转载' },
    { label: '翻译', value: '翻译' }
  ]
}
