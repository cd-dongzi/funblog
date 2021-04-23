import { lazy } from 'react'
import { createHashHistory } from 'history'
const history = createHashHistory()
const _import_ = (file: string) => lazy(() => import(`@/pages/${file}/index`))

// import delay from 'delay'
// const _import_ = (file: string, time = 1000) =>
//   lazy(() => {
//     const c = import(`@/pages/${file}/index`)
//     return new Promise((resolve, reject) => {
//       c.then(async (res) => {
//         await delay(time)
//         resolve(res)
//       }).catch(reject)
//     })
//   })

export const staticRoutes: App.Routes = [
  {
    path: '/demo',
    name: 'Demo',
    disabledAuth: true,
    component: _import_('demo')
  },
  {
    path: '/404',
    name: '404',
    disabledAuth: true,
    component: _import_('notFound')
  },
  {
    path: '/error',
    name: 'Error',
    disabledAuth: true,
    component: _import_('error')
  },
  {
    path: '/login',
    name: 'Login',
    component: _import_('login')
  }
]

export const layoutRoutes: App.Routes = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    title: '首页',
    icon: 'a-home',
    component: _import_('dashboard')
  },
  {
    path: '/blog/list',
    name: 'Blog',
    title: '博客',
    icon: 'a-pencil-box',
    children: [
      {
        path: '/blog/list',
        name: 'BlogList',
        title: '博客列表',
        component: _import_('blog/list')
      },
      {
        path: '/blog/add',
        name: 'BlogAdd',
        title: '新增博客',
        hiddenLayout: true,
        component: _import_('blog/add')
      },
      {
        path: '/blog/edit',
        name: 'BlogEdit',
        title: '编辑博客',
        hiddenLayout: true,
        hiddenTabView: true,
        component: _import_('blog/edit')
      },
      {
        path: '/blog/tags',
        name: 'BlogTags',
        title: '标签列表',
        component: _import_('blogTag')
      }
    ]
  },
  {
    path: '/play/list',
    name: 'Play',
    title: '大杂烩',
    icon: 'play',
    children: [
      {
        path: '/play/list',
        name: 'PlayList',
        title: '实例列表',
        component: _import_('play/list')
      },
      {
        path: '/play/add',
        name: 'PlayAdd',
        title: '新增实例',
        hiddenLayout: true,
        component: _import_('play/add')
      },
      {
        path: '/play/edit',
        name: 'PlayEdit',
        title: '编辑实例',
        hiddenLayout: true,
        hiddenTabView: true,
        component: _import_('play/edit')
      }
    ]
  },
  {
    path: '/github/list',
    name: 'Github',
    title: 'Github项目',
    icon: 'github',
    children: [
      {
        path: '/github/list',
        name: 'GithubList',
        title: 'Github项目',
        component: _import_('github/list')
      },
      {
        path: '/github/repo/:id',
        name: 'GithubRepoInfo',
        title: 'Github项目详情',
        hiddenLayout: true,
        component: _import_('github/repo')
      }
    ]
  }
  // {
  //   path: '/auth/list',
  //   name: 'Auth',
  //   title: '权限管理',
  //   icon: 'a-quanxian',
  //   children: [
  //     {
  //       path: '/auth/list',
  //       name: 'AuthList',
  //       title: '人员列表',
  //       component: _import_('auth/list')
  //     },
  //     {
  //       path: '/auth/add',
  //       name: 'AuthAdd',
  //       title: '新增人员',
  //       component: _import_('auth/add')
  //     }
  //   ]
  // }
]
export const routes = [...layoutRoutes, ...staticRoutes]
export { history }
