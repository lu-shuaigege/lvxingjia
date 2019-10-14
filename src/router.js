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
        title: '主页'
    },
    component: () =>
        import('./views/home/home.vue')
},
{
    path: '/travels',
    name: 'travels',
    meta: {
        title: '游记'
    },
    component: () =>
        import('./views/travels/travels.vue')
},
{
    path: '/order',
    name: 'order',
    meta: {
        title: '订单'
    },
    component: () =>
        import('./views/order/order.vue')
},
{
    path: '/my',
    name: 'my',
    meta: {
        title: '我的'
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