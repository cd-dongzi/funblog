const isProd = process.env.NODE_ENV === 'production'
const constantRouterMap = [
    {
        path: '/',
        component: resolve => require(['pages/Layout/index.vue'], resolve),
        children: [
            {
                path: '/',
                component: resolve => require(['pages/Home/index.vue'], resolve),
                name: '首页',
                meta: {
                    keepAlive: true
                }
            },
            {
                path: '/music',
                component: resolve => require(['pages/Music/index.vue'], resolve),
                children: [
                    {
                        path: '/',
                        component: resolve => require(['pages/Music/main.vue'], resolve),
                        meta: {
                            keepAlive: true
                        }
                    },
                    {
                        path: ':classify',
                        component: resolve => require(['pages/Music/main.vue'], resolve),
                    }
                ]
            },
            {
                path: '/blog',
                component: resolve => require(['pages/Blog/index.vue'], resolve),
                children: [
                    {
                        path: '/',
                        component: resolve => require(['pages/Blog/main.vue'], resolve),
                        meta: {
                            keepAlive: true
                        }
                    },
                    {
                        path: ':classify',
                        component: resolve => require(['pages/Blog/main.vue'], resolve),
                    }
                ]
            },
            {
                path: '/archiving',
                component: resolve => require(['pages/Archiving/index.vue'], resolve),
                name: '归档',
                meta: {
                    keepAlive: true
                }
            },
            {
                path: '/me',
                component: resolve => require(['pages/Me/index.vue'], resolve),
                name: '我的',
                meta: {
                    keepAlive: true
                }
            },
            {
                path: '/message',
                component: resolve => require(['pages/Message/index.vue'], resolve),
                name: '留言',
                meta: {
                    keepAlive: true
                }
            },
            {
                path: '/example',
                component: resolve => require(['pages/Example/index.vue'], resolve),
                name: '示例',
                meta: {
                    keepAlive: true
                }
            },
            {
                path: '/tools',
                component: resolve => require(['pages/Tools/index.vue'], resolve)
            },
            {
                path: '/article/:id',
                component: resolve => require(['pages/Article/index.vue'], resolve)
            },
            {
                path: '/song/:id',
                component: resolve => require(['pages/Song/index.vue'], resolve)
            }
        ]
    },
    {
        path: '*',
        component: resolve => require(['pages/Error/NotFound/index.vue'], resolve),
        name: '迷茫中..'
    }
]

const asyncRouterMap = [
    {
        path: '/demo',
        component: resolve => require(['pages/Demo/index.vue'], resolve),
        name: 'Demo'
    }
]
export default isProd ? constantRouterMap : constantRouterMap.concat(asyncRouterMap)
