import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

import homeRouter from '@/router/modules/home'
import meRouter from '@/router/modules/me'
import ordersRouter from '@/router/modules/orders'
import travelsRouter from '@/router/modules/travels'

export const contentsRouter = [
    homeRouter, meRouter, ordersRouter, travelsRouter,
    {
        path: '',
        redirect: '/home/index',
        meta: {}
    },
    {
        path: '/',
        redirect: '/home/index',
        meta: {}
    },
    {
        path: '*',
        name: '404',
        redirect: '/home/index',
    },
]

const router = new Router({mode: 'history', base: process.env.BASE_URL, routes: contentsRouter});
export default router
