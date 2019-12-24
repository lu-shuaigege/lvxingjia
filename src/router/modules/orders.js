const ordersRouter = {
    path: '/orders',
    redirect: '/orders/index',
    component: () => import('@/views/index.vue'),
    children: [
        {
            path: 'index',
            meta: {title: '订单', index: 0, hasFooter: true, nav_index: 3},
            component: () => import('@/views/orders/index/index.vue'),
        },
        {
            path: 'show',
            meta: {title: '订单详情'},
            component: () => import('@/views/orders/show/index.vue')
        },
    ]
}
export default ordersRouter
