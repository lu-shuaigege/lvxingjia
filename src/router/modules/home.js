const homeRouter = {
    path: '/home',
    redirect: '/home/index',
    component: () => import('@/views/index.vue'),
    children: [{
            path: 'index',
            meta: {
                title: '驴行家',
                index: 0,
                hasFooter: true,
                nav_index: 1
            },
            component: () => import('@/views/home/index/index.vue'),
        },
        {
            path: 'notice',
            meta: {
                title: '消息'
            },
            redirect: 'notice/index',
            component: () => import('@/views/index.vue'),
            children: [{
                    path: 'index',
                    meta: {
                        title: '消息'
                    },
                    component: () => import('@/views/home/notice/index/index.vue')
                },
                {
                    path: 'show',
                    meta: {
                        title: '消息详情'
                    },
                    component: () => import('@/views/home/notice/show/index.vue')
                },
            ]
        },
        {
            path: 'integral',
            meta: {
                title: '积分商城'
            },
            redirect: 'integral/index',
            component: () => import('@/views/index.vue'),
            children: [{
                    path: 'index',
                    meta: {
                        title: '积分商城'
                    },
                    component: () => import('@/views/integral/index/index.vue'),
                },
                {
                    path: 'show',
                    meta: {
                        title: '积分商品详情'
                    },
                    component: () => import('@/views/integral/show/index.vue')
                },
                {
                    path: 'integralorder',
                    meta: {
                        title: '积分商城商品订单'
                    },
                    component: () => import('@/views/integral/integralorder/index.vue')
                },
                {
                    path: 'integralcheckin',
                    meta: {
                        title: '积分签到'
                    },
                    component: () => import('@/views/integral/integralcheckin/index.vue')
                },
                {
                    path: 'checkindetails',
                    meta: {
                        title: '签到明细'
                    },
                    component: () => import('@/views/integral/checkindetails/index.vue')
                },
            ]
        },
        {
            path: 'line',
            meta: {
                title: '线路'
            },
            redirect: 'line/index',
            component: () => import('@/views/index.vue'),
            children: [{
                    path: '/lineindex',
                    meta: {
                        title: ['线路列表', ],
                    },
                    component: () => import('@/views/line/index/index.vue'),
                },
                {
                    path: 'show',
                    meta: {
                        title: '线路详情'
                    },
                    component: () => import('@/views/line/show/index.vue')
                },
                {
                    path: '/linecalendar',
                    meta: {
                        title: '线路日历'
                    },
                    component: () => import('@/views/line/linecalendar/linecalendar.vue')
                },
                {
                    path: 'enrolmentstaff',
                    meta: {
                        title: '报名人员'
                    },
                    component: () => import('@/views/line/enrolmentstaff/index.vue')
                },
                {
                    path: '/searchroute',
                    meta: {
                        title: '搜索路线'
                    },
                    component: () => import('@/views/line/searchroute/index.vue')
                },
                {
                    path: 'search',
                    meta: {
                        title: '搜索'
                    },
                    component: () => import('@/views/line/search/index.vue')
                },
                {
                    path: 'contract',
                    meta: {
                        title: '预定须知和合同范本'
                    },
                    component: () => import('@/views/line/contract/contract.vue')
                },
            ]
        },
        {
            path: 'book',
            name: 'book',
            meta: {
                title: '预订信息'
            },
            component: () => import('@/views/book/book.vue')
        },
        {
            path: '/payok',
            name: 'payok',
            meta: {
                title: '订单支付成功'
            },
            component: () => import('@/views/payok/payok.vue')
        },
        {
            path: 'doortickets',
            meta: {
                title: '门票'
            },
            redirect: 'doortickets/index',
            component: () => import('@/views/index.vue'),
            children: [{
                    path: '/doorticketList',
                    meta: {
                        title: '门票'
                    },
                    component: () => import('@/views/doortickets/doorticketList/doorticketList.vue')
                },
                {
                    path: '/doorticketShow',
                    meta: {
                        title: '门票详情'
                    },
                    component: () => import('@/views/doortickets/doorticketShow/doorticketShow.vue')
                },
                {
                    path: '/doorticketSearch',
                    meta: {
                        title: '门票搜索'
                    },
                    component: () => import('@/views/doortickets/doorticketSearch/doorticketSearch.vue')
                },
            ]
        },
        {
            path: 'hotels',
            meta: {
                title: '门票'
            },
            redirect: 'hotels/index',
            component: () => import('@/views/index.vue'),
            children: [{
                    path: '/hotelList',
                    meta: {
                        title: '酒店'
                    },
                    component: () => import('@/views/hotels/hotelList/hotelList.vue')
                },
                {
                    path: '/hotelShow',
                    meta: {
                        title: '酒店详情'
                    },
                    component: () => import('@/views/hotels/hotelShow/hotelShow.vue')
                },
                {
                    path: '/hotelSearch',
                    meta: {
                        title: '酒店搜索'
                    },
                    component: () => import('@/views/hotels/hotelSearch/hotelSearch.vue')
                },
            ]
        },
        {
            path: '/ticketbooking',
            name: 'ticketbooking',
            meta: {
                title: '预订详情'
            },
            component: () => import('@/views/ticketbooking/ticketbooking.vue')
        },
        {
            path: '/city',
            name: 'city',
            meta: {
                title: '城市列表'
            },
            component: () => import('@/views/city/city.vue')
        },
    ]
}
export default homeRouter