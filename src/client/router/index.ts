import loadable from '@loadable/component'
import delay from 'delay'
import qs from 'qs'
import config from '@/config'

export const _import_ = (file: string, delayTime = 500) => {
  return loadable<any>((props) => {
    const c = import(`@/pages/${file}/index`)
    // 客户端加载数据
    if (config.isClient) {
      return new Promise((resolve, reject) => {
        c.then(async (res) => {
          await delay(delayTime)
          if (res.default._init) {
            try {
              const query = qs.parse(props.location.search, { ignoreQueryPrefix: true }) as any
              const params = props.match.params
              await res.default._init(props.store, { query, params }, {})
              resolve(res.default)
            } catch (e) {
              reject(e)
            }
          } else {
            await delay(delayTime)
            resolve(res.default)
          }
        }).catch(reject)
      })
    } else {
      return c
    }
  })
}

export const staticRoutes = [
  {
    path: '/demo',
    name: 'Demo',
    exact: true,
    noLayout: true,
    component: _import_('demo')
  },
  {
    path: '/404',
    name: '404',
    exact: true,
    noLayout: true,
    component: _import_('notFound')
  },
  {
    path: '/error',
    name: 'error',
    exact: true,
    noLayout: true,
    component: _import_('error')
  }
]

export const layoutRoutes = [
  {
    path: '/',
    name: 'Home',
    exact: true,
    component: _import_('home')
  },
  {
    path: '/archive',
    name: 'Archive',
    exact: true,
    component: _import_('archive')
  },
  {
    path: '/me',
    name: 'Me',
    exact: true,
    component: _import_('me')
  },
  {
    path: '/messageboard',
    name: 'Messageboard',
    exact: true,
    component: _import_('messageboard')
  },
  {
    path: '/play',
    name: 'Play',
    exact: true,
    component: _import_('play')
  },
  {
    path: '/blog/:tag',
    name: 'BlogClassify',
    exact: true,
    component: _import_('blogClassify')
  },
  {
    path: '/search',
    name: 'Search',
    exact: true,
    component: _import_('search')
  },
  {
    path: '/article/:id',
    name: 'Article',
    exact: true,
    component: _import_('article')
  }
]
export const routes: App.Routes = [...layoutRoutes, ...staticRoutes]
