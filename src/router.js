import Vue from 'vue'
import Router from 'vue-router'

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
        path: '/orderdetails',
        name: 'orderdetails',
        meta: {
            title: '订单详情',
        },
        component: () =>
            import('./views/orderdetails/orderdetails.vue')


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
    {
        path: '/myinformation',
        name: 'myinformation',
        meta: {
            title: '我的信息',
        },
        component: () =>
            import('./views/myinformation/myinformation.vue')
    },
    {
        path: '/modifynikename',
        name: 'modifynikename',
        meta: {
            title: '修改昵称',
        },
        component: () =>
            import('./views/modifynikename/modifynikename.vue')
    },
    {
        path: '/fans',
        name: 'fans',
        meta: {
            title: '我的粉丝',
        },
        component: () =>
            import('./views/fans/fans.vue')
    },
    {
        path: '/line',
        name: 'line',
        meta: {
            title: '我的线路',
        },
        component: () =>
            import('./views/line/line.vue')
    },
    {
        path: '/releaseline',
        name: 'releaseline',
        meta: {
            title: '维护线路',
        },
        component: () =>
            import('./views/releaseline/releaseline.vue')
    },
    {
        path: '/releaselinenext',
        name: 'releaselinenext',
        meta: {
            title: '维护线路下一步',
        },
        component: () =>
            import('./views/releaselinenext/releaselinenext.vue')
    },
    {
        path: '/setmenu',
        name: 'setmenu',
        meta: {
            title: '套餐设置',
        },
        component: () =>
            import('./views/setmenu/setmenu.vue')
    },
    {
        path: '/applySettledin',
        name: 'applySettledin',
        meta: {
            title: '申请入驻',
        },
        component: () =>
            import('./views/applySettledin/applySettledin.vue')
    },
    {
        path: '/applydetails',
        name: 'applydetails',
        meta: {
            title: '申请入驻详细',
        },
        component: () =>
            import('./views/applydetails/applydetails.vue')
    },
    {
        path: '/submitaudit',
        name: 'submitaudit',
        meta: {
            title: '等待审核',
        },
        component: () =>
            import('./views/submitaudit/submitaudit.vue')
    },
    {
        path: '/submitauditok',
        name: 'submitauditok',
        meta: {
            title: '审核成功',
        },
        component: () =>
            import('./views/submitauditok/submitauditok.vue')
    },
    {
        path: '/submitauditnook',
        name: 'submitauditnook',
        meta: {
            title: '审核失败',
        },
        component: () =>
            import('./views/submitauditnook/submitauditnook.vue')
    },
    {
        path: '/agreementword',
        name: 'agreementword',
        meta: {
            title: '协议内容',
        },
        component: () =>
            import('./views/agreementword/agreementword.vue')
    },
    {
        path: '/mywallet',
        name: 'mywallet',
        meta: {
            title: '我的钱包',
        },
        component: () =>
            import('./views/mywallet/mywallet.vue')
    },
    {
        path: '/budgetdetailed',
        name: 'budgetdetailed',
        meta: {
            title: '收支明细',
        },
        component: () =>
            import('./views/budgetdetailed/budgetdetailed.vue')
    },
    {
        path: '/gotakemoney',
        name: 'gotakemoney',
        meta: {
            title: '申请提现',
        },
        component: () =>
            import('./views/gotakemoney/gotakemoney.vue')
    },
    {
        path: '/takemoneyok',
        name: 'takemoneyok',
        meta: {
            title: '申请提现成功',
        },
        component: () =>
            import('./views/takemoneyok/takemoneyok.vue')
    },
    {
        path: '/myintegral',
        name: 'myintegral',
        meta: {
            title: '我的积分',
        },
        component: () =>
            import('./views/myintegral/myintegral.vue')
    },
    {
        path: '/integraldetailed',
        name: 'integraldetailed',
        meta: {
            title: '积分明细',
        },
        component: () =>
            import('./views/integraldetailed/integraldetailed.vue')
    },
    {
        path: '/harvestaddress',
        name: 'harvestaddress',
        meta: {
            title: '收货地址',
        },
        component: () =>
            import('./views/harvestaddress/harvestaddress.vue')
    },
    {
        path: '/addAdministration',
        name: 'addAdministration',
        meta: {
            title: '添加收货地址',
        },
        component: () =>
            import('./views/addAdministration/addAdministration.vue')
    },
    {
        path: '/oftenpassenger',
        name: 'oftenpassenger',
        meta: {
            title: '常用旅客',
        },
        component: () =>
            import('./views/oftenpassenger/oftenpassenger.vue')
    },
    {
        path: '/newaddpassenger',
        name: 'newaddpassenger',
        meta: {
            title: '添加常用旅客',
        },
        component: () =>
            import('./views/newaddpassenger/newaddpassenger.vue')
    },
    {
        path: '/myexchange',
        name: 'myexchange',
        meta: {
            title: '我的兑换',
        },
        component: () =>
            import('./views/myexchange/myexchange.vue')
    },
    {
        path: '/mytravels',
        name: 'mytravels',
        meta: {
            title: '我的兑换',
        },
        component: () =>
            import('./views/mytravels/mytravels.vue')
    },
    {
        path: '/mycollection',
        name: 'mycollection',
        meta: {
            title: '我的兑换',
        },
        component: () =>
            import('./views/mycollection/mycollection.vue')
    },
    {
        path: '/city',
        name: 'city',
        meta: {
            title: '我的兑换',
        },
        component: () =>
            import('./views/city/city.vue')
    },
]

const router = new Router({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes: contentsRouter
})

// 路由变化
router.afterEach(function (to) {
    if (to.meta && to.meta.title) {
        //console.info(to.meta.title)
        // 根据路由变化设置title
        setTitle(to.meta.title);
    }
})


export default router;