export interface Route {
  path: string;
  name: string;
  icon?: string;
  breadcrumb?: boolean;
  routes?: Route[];
}
export const routes = [
  {
    path: '/setting-profile',
    name: '个人设置',
    hideInMenu: true,
  },
  {
    path: '/dashboard',
    name: '分析概览',
    icon: 'dashboard',
  },
  {
    path: '/post',
    name: '文章管理',
    icon: 'post',
    routes: [
      { path: '/post/list', name: '文章列表' },
      { path: '/post/category', name: '文章分类' },
      { path: '/post/tag', name: '文章标签' },
    ],
  },
  {
    path: '/page',
    name: '页面管理',
    icon: 'page',
    routes: [
      { path: '/page/list', name: '页面列表' },
      { path: '/page/menu', name: '菜单管理' },
    ],
  },
  {
    path: '/media',
    name: '资源管理',
    icon: 'image',
    routes: [
      { path: '/media/image', name: '图片管理' },
      { path: '/media/svg', name: 'svg管理' },
    ],
  },
  {
    path: '/comment',
    name: '评论管理',
    icon: 'message',
  },
  {
    path: '/link',
    name: '友链列表',
    icon: 'friends',
  },
  {
    path: '/role-permission',
    name: '角色权限',
    icon: 'permission',
    routes: [
      { path: '/role-permission/user', name: '用户管理' },
      { path: '/role-permission/role', name: '角色管理' },
      { path: '/role-permission/permission', name: '权限管理' },
      { path: '/role-permission/invitation-code', name: '邀请码管理' },
      { path: '/role-permission/visitor', name: '游客管理' },
    ],
  },
  {
    path: '/setting',
    name: '站点管理',
    icon: 'setting',
    routes: [
      { path: '/setting/base', name: '基本设置' },
      { path: '/setting/blogger', name: '博主设置' },
      { path: '/setting/comment', name: '评论设置' },
      { path: '/setting/media', name: '媒体设置' },
      { path: '/setting/email', name: '邮件设置' },
      { path: '/setting/user', name: '用户设置' },
      { path: '/setting/layout', name: '布局设置' },
      { path: '/setting/advance', name: '高级设置' },
    ],
  },
];
