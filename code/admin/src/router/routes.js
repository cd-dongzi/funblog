const _import_ = file => () => import(`views/${file}.vue`)

export const constantRouterMap = [{
    path: '/login',
    name: '登录',
    hidden: true,
    component: _import_('Login/index')
},
{
    path: '/a',
    name: 'a',
    hidden: true,
    component: _import_('demo')
},
{
    path: '/401',
    name: '401',
    hidden: true,
    component: _import_('Error/401-page')
},
{
    path: '/',
    name: 'home',
    component: _import_('Layout/index'),
    redirect: '/home',
    icon: 'homel',
    children: [{
        path: 'home',
        component: _import_('Home/index'),
        name: '首页'
    }]
}
]


export const asyncRouterMap = [{
    path: '/user',
    name: '权限管理',
    meta: {
        role: ['admin']
    },
    component: _import_('Layout/index'),
    redirect: '/user/list',
    requireAuth: true, // 是否需要登录
    dropdown: true,
    icon: 'authority',
    children: [{
            path: 'list',
            component: _import_('User/list/index'),
            name: '管理员列表'
        },
        {
            path: 'add',
            component: _import_('User/add/index'),
            name: '权限设置'
        }
    ]
},
{
    path: '/music',
    name: '音乐',
    component: _import_('Layout/index'),
    redirect: '/music/list',
    dropdown: true,
    icon: 'chunyinle',
    children: [
        // { path: 'index', meta: { role: ['dev'] }, component: _import_('Music/index'), name: '音乐介绍' },
        {
            path: 'list',
            meta: {
                role: ['editor']
            },
            component: _import_('Music/list/index'),
            name: '音乐列表'
        },
        {
            path: 'add',
            meta: {
                role: ['admin']
            },
            component: _import_('Music/add/index'),
            name: '添加音乐'
        }
    ]
},
{
    path: '/music/tabs',
    name: '音乐标签',
    component: _import_('Layout/index'),
    icon: 'musiclist',
    redirect: '/',
    children: [
        {
            path: '',
            component: _import_('MusicTab/index'),
            name: '音乐标签列表'
        }
    ]
},
{
    path: '/blog',
    name: '博客',
    component: _import_('Layout/index'),
    redirect: '/blog/list',
    dropdown: true,
    icon: 'zuowen',
    children: [
        // { path: 'index', component: _import_('Blog/index'), name: '博客介绍' },
        {
            path: 'list',
            component: _import_('Blog/list/index'),
            name: '博客列表'
        },
        {
            path: 'add',
            component: _import_('Blog/add/index'),
            name: '添加博客'
        }
    ]
},
{
    path: '/blog/tabs',
    name: '博客标签',
    component: _import_('Layout/index'),
    icon: 'blog',
    redirect: '/',
    children: [
        {
            path: '',
            component: _import_('BlogTab/index'),
            name: '博客标签列表'
        }
    ]
},
{
    path: '/example',
    name: '示例',
    component: _import_('Layout/index'),
    redirect: '/example/list',
    dropdown: true,
    icon: 'demo',
    children: [
        // { path: 'index', component: _import_(Eexample/index'), name: '示例介绍' },
        {
            path: 'list',
            component: _import_('Example/list/index'),
            name: '示例列表'
        },
        {
            path: 'add',
            component: _import_('Example/add/index'),
            name: '添加示例实例'
        }
    ]
},
// {
//     path: '/friend',
//     name: '友情链接',
//     component: _import_('Layout/index'),
//     redirect: '/friend/list',
//     dropdown: true,
//     icon: 'penyou',
//     children: [
//         // { path: 'index', component: _import_('Links/index'), name: '友链介绍' },
//         { path: 'list', component: _import_('Friend/list/index'), name: '友链列表' },
//         { path: 'add', component: _import_('Friend/add/index'), name: '添加友链' }
//     ]
// }
]
