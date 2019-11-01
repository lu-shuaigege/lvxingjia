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
    path: '/search',
    name: 'search',
    meta: {
        title: '搜索',
    },
    component: () =>
        import('./views/search/search.vue')
},
{
    path: '/notice',
    name: 'notice',
    meta: {
        title: '消息',
    },
    component: () =>
        import('./views/notice/notice.vue')
},
{
    path: '/noticedetails',
    name: 'noticedetails',
    meta: {
        title: '消息详情',
    },
    component: () =>
        import('./views/noticedetails/noticedetails.vue')
},
{
    path: '/periphery',
    name: 'periphery',
    meta: {
        title: '周边游',
    },
    component: () =>
        import('./views/periphery/periphery.vue')
},
{
    path: '/searchroute',
    name: 'searchroute',
    meta: {
        title: '搜索路线',
    },
    component: () =>
        import('./views/searchroute/searchroute.vue')
},
{
    path: '/linedetails',
    name: 'linedetails',
    meta: {
        title: '线路详情',
    },
    component: () =>
        import('./views/linedetails/linedetails.vue')
},
{
    path: '/enrolmentstaff',
    name: 'enrolmentstaff',
    meta: {
        title: '报名人员',
    },
    component: () =>
        import('./views/enrolmentstaff/enrolmentstaff.vue')
},
{
    path: '/book',
    name: 'book',
    meta: {
        title: '预订信息',
    },
    component: () =>
        import('./views/book/book.vue')
},
{
    path: '/payok',
    name: 'payok',
    meta: {
        title: '订单支付成功',
    },
    component: () =>
        import('./views/payok/payok.vue')
},
{
    path: '/doorticket',
    name: 'doorticket',
    meta: {
        title: '门票',
    },
    component: () =>
        import('./views/doorticket/doorticket.vue')
},
{
    path: '/doorticketdetails',
    name: 'doorticketdetails',
    meta: {
        title: '门票详情',
    },
    component: () =>
        import('./views/doorticketdetails/doorticketdetails.vue')
},
{
    path: '/ticketbooking',
    name: 'ticketbooking',
    meta: {
        title: '门票预订信息',
    },
    component: () =>
        import('./views/ticketbooking/ticketbooking.vue')
},
{
    path: '/hotel',
    name: 'hotel',
    meta: {
        title: '酒店',
    },
    component: () =>
        import('./views/hotel/hotel.vue')
},
{
    path: '/hoteldetails',
    name: 'hoteldetails',
    meta: {
        title: '酒店详情',
    },
    component: () =>
        import('./views/hoteldetails/hoteldetails.vue')
},
{
    path: '/integralmall',
    name: 'integralmall',
    meta: {
        title: '积分商城',
    },
    component: () =>
        import('./views/integralmall/integralmall.vue')
},
{
    path: '/integralshopdetail',
    name: 'integralshopdetail',
    meta: {
        title: '积分商城商品详情',
    },
    component: () =>
        import('./views/integralshopdetail/integralshopdetail.vue')
},
{
    path: '/integralorder',
    name: 'integralorder',
    meta: {
        title: '积分商城商品订单',
    },
    component: () =>
        import('./views/integralorder/integralorder.vue')
},
{
    path: '/integralcheckin',
    name: 'integralcheckin',
    meta: {
        title: '积分签到',
    },
    component: () =>
        import('./views/integralcheckin/integralcheckin.vue')
},
{
    path: '/checkindetails',
    name: 'checkindetails',
    meta: {
        title: '签到明细',
    },
    component: () =>
        import('./views/checkindetails/checkindetails.vue')
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
    path: '/releasetravels',
    name: 'releasetravels',
    meta: {
        title: '发布游记',
    },
    component: () =>
        import('./views/releasetravels/releasetravels.vue')
},
{
    path: '/travelsdetail',
    name: 'travelsdetail',
    meta: {
        title: '游记详情',
    },
    component: () =>
        import('./views/travelsdetail/travelsdetail.vue')
},
{
    path: '/commentlist',
    name: 'commentlist',
    meta: {
        title: '评论列表',
    },
    component: () =>
        import('./views/commentlist/commentlist.vue')
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