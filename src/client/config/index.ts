import keys from './keys'
import screen from './screen'
import rootConfig from '@root/src/shared/config'
const isClient = process.env.REACT_ENV === 'client'

export default {
  NODE_ENV: rootConfig.NODE_ENV,
  isDev: rootConfig.isDev,
  isClient,
  keys,
  screen,
  app: {
    widthScale: 375
  },
  navigation: [
    { name: '博客', icon: 'book', url: '/' },
    { name: '归档', icon: 'archive', url: '/archive' },
    { name: '大杂烩', icon: 'play', url: '/play' },
    { name: '关于我', icon: 'user', url: '/me' },
    { name: '留言板', icon: 'message', url: '/messageboard' }
  ],
  thirdPartyList: [
    { name: 'Github', icon: 'github' },
    { name: 'QQ', icon: 'sign_qq' }
  ],
  forumList: [
    {
      name: 'Github',
      link: 'https://github.com/cd-dongzi'
    },
    {
      name: 'SegmentFault',
      link: 'https://segmentfault.com/u/zi_597d64ce14187'
    },
    {
      name: 'Juejin',
      link: 'https://juejin.im/user/5a73e0335188257a7e3ef88f'
    }
  ],
  personalList: [
    { label: '姓名', value: '酱油哥' },
    { label: '民族', value: '汉族' },
    { label: '地区', value: '北京' },
    { label: '籍贯', value: '湖南 娄底' },
    { label: 'QQ', value: '1262498319', copy: true },
    {
      label: 'QQ群',
      value: '810018802',
      copy: true,
      href: 'https://jq.qq.com/?_wv=1027&k=yy8ZWGDQ',
      hrefText: '点击加入'
    },
    { label: 'Email', value: '15273119291@163.com', copy: true },
    { label: '爱好', value: '爱看科幻、武侠及稀奇古怪的书、顺便撸猫' }
  ] as { label: string; value: string; copy?: boolean; href?: string; hrefText?: string }[],
  technologyList: [
    { name: 'koa', rate: 65, url: 'https://www.npmjs.com/package/koa' },
    { name: 'react', rate: 73, url: 'https://www.npmjs.com/package/react' },
    { name: 'webpack', rate: 80, url: 'https://www.npmjs.com/package/webpack' },
    { name: 'eslint', rate: 87, url: 'https://www.npmjs.com/package/eslint' },
    { name: 'babel', rate: 92, url: 'https://www.npmjs.com/package/babel' },
    { name: 'typescript', rate: 96, url: 'https://www.npmjs.com/package/typescript' }
  ],
  contactList: [
    { name: 'QQ', icon: 'sign_qq', value: '1262498319' },
    { name: 'Email', icon: 'email', value: '15273119291@163.com' }
  ],
  blogMenuList: [
    { name: '最新', icon: 'new' },
    { name: '热门', icon: 'hot' }
  ]
}
