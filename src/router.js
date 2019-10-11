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
]

export default new Router({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes: contentsRouter
})