import Vue from 'vue'
import Router from 'vue-router'
// import home from './views/home/home.vue'

Vue.use(Router)

export const contentsRouter = [{
    path: '/',
    redirect: 'home',
},
{
    path: '/home',
    name: 'home',
    meta: {
        title: '主页',
        index: 0,
        hasFooter: true,
        nav_index: 1
    },
    component: () =>
        import('./views/home/home.vue')
},
{
    path: '/travels',
    name: 'travels',
    meta: {
        title: '游记',
        index: 0,
        hasFooter: true,
        nav_index: 2
    },
    component: () =>
        import('./views/travels/travels.vue')
},
{
    path: '/order',
    name: 'order',
    meta: {
        title: '订单',
        index: 0,
        hasFooter: true,
        nav_index: 3
    },
    component: () =>
        import('./views/order/order.vue')
},
{
    path: '/my',
    name: 'my',
    meta: {
        title: '我的',
        index: 0,
        hasFooter: true,
        nav_index: 4
    },
    component: () =>
        import('./views/my/my.vue')
},
]

export default new Router({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes: contentsRouter
})