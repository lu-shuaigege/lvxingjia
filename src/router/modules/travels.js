const travelsRouter = {
    path: '/travels',
    name: 'travels',
    redirect: '/travels/index',
    meta: {
        title: '游记',
        index: 0,
        hasFooter: true,
        nav_index: 2
    },
    component: () => import('@/views/index.vue'),
    children: [{
            path: 'index',
            meta: {
                title: '游记',
                index: 0,
                hasFooter: true,
                nav_index: 2
            },
            component: () => import('@/views/travels/index/index.vue'),
        },
        {
            path: 'create',
            meta: {
                title: '发布游记'
            },
            component: () => import('@/views/travels/create/index.vue')
        },
        {
            path: 'show',
            meta: {
                title: '游记详情'
            },
            component: () => import('@/views/travels/show/index.vue')
        },
        {
            path: '/commentlist',
            meta: {
                title: '游记评论'
            },
            component: () => import('@/views/travels/commentlist/commentlist.vue')
        },
    ]
}
export default travelsRouter