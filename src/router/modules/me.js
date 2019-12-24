const meRouter = {
    path: '/me',
    redirect: '/me/index',
    component: () => import('@/views/index.vue'),
    children: [{
            path: 'index',
            meta: {
                title: '我的',
                index: 0,
                hasFooter: true,
                nav_index: 4
            },
            component: () => import('@/views/me/index/index.vue'),
        },
        {
            path: 'wallet',
            meta: {
                title: '我的钱包'
            },
            component: () => import('@/views/me/wallet/index.vue')
        },
        {
            path: 'integral',
            meta: {
                title: '我的积分'
            },
            component: () => import('@/views/me/integral/index.vue')
        },
        {
            path: 'exchange',
            meta: {
                title: '我的兑换'
            },
            component: () => import('@/views/me/exchange/index.vue')
        },
        {
            path: 'travels',
            meta: {
                title: '我的游记'
            },
            component: () => import('@/views/me/travels/index.vue')
        },
        {
            path: 'address',
            redirect: 'address/index',
            component: () => import('@/views/index.vue'),
            children: [{
                    path: 'index',
                    meta: {
                        title: '收货地址'
                    },
                    component: () => import('@/views/me/address/index/index.vue'),
                },
                {
                    path: 'create',
                    meta: {
                        title: '添加收货地址'
                    },
                    component: () => import('@/views/me/address/create/index.vue')
                },
            ]
        },
        {
            path: 'collection',
            meta: {
                title: '我的收藏'
            },
            component: () => import('@/views/me/collection/index.vue')
        },
        {
            path: 'edit',
            meta: {
                title: '我的信息'
            },
            component: () => import('@/views/me/edit/index.vue')
        },
        {
            path: 'fans',
            meta: {
                title: '我的粉丝'
            },
            component: () => import('@/views/me/fans/index.vue')
        },
        {
            path: 'line',
            meta: {
                title: '我的线路'
            },
            component: () => import('@/views/me/line/index.vue')
        },
        {
            path: 'serveorder',
            meta: {
                title: '我的服务单'
            },
            component: () => import('@/views/me/serveorder/serveorder.vue')
        },
        {
            path: 'serveorder_show',
            meta: {
                title: '我的服务单'
            },
            component: () => import('@/views/me/serveorder_show/serveorder_show.vue')
        },
        {
            path: 'show',
            meta: {
                title: '积分明细'
            },
            component: () => import('@/views/me/integraldetailed/index.vue')
        },
        {
            path: 'applySettledin',
            meta: {
                title: '申请入驻'
            },
            component: () => import('@/views/applySettledin/applySettledin.vue')
        },
        {
            path: 'applypartners',
            meta: {
                title: '合作伙伴申请认证'
            },
            name: 'applypartners',
            component: () => import('@/views/applypartners/applypartners.vue')
        },
        {
            path: 'applybranch',
            meta: {
                title: '分公司申请认证'
            },
            name: 'applybranch',
            component: () => import('@/views/applybranch/applybranch.vue')
        },
        {
            path: 'applyclub',
            meta: {
                title: '申请入驻'
            },
            name: 'applyclub',
            component: () => import('@/views/applyclub/applyclub.vue')
        },
        {
            path: 'oftenpassenger',
            meta: {
                title: '常用旅客'
            },
            redirect: 'oftenpassenger/index',
            component: () => import('@/views/index.vue'),
            children: [{
                    path: 'index',
                    meta: {
                        title: '常用旅客'
                    },
                    component: () => import('@/views/me/oftenpassenger/index/index.vue'),
                },
                {
                    path: 'create',
                    meta: {
                        title: '添加常用旅客'
                    },
                    component: () => import('@/views/me/oftenpassenger/create/index.vue')
                },
            ]
        },
        {
            path: 'budgetdetailed',
            meta: {
                title: '收支明细'
            },
            component: () => import('@/views/budgetdetailed/budgetdetailed.vue')
        },
        {
            path: 'gotakemoney',
            meta: {
                title: '申请提现'
            },
            component: () => import('@/views/gotakemoney/gotakemoney.vue')
        },
        {
            path: 'takemoneyok',
            meta: {
                title: '申请提现成功'
            },
            component: () => import('@/views/takemoneyok/takemoneyok.vue')
        },
        {
            path: 'submitaudit',
            meta: {
                title: '等待审核'
            },
            name: 'submitaudit',
            component: () => import('@/views/submitaudit/submitaudit.vue')
        },
        {
            path: 'submitauditok',
            meta: {
                title: '审核成功'
            },
            component: () => import('@/views/submitauditok/submitauditok.vue')
        },
        {
            path: 'submitauditnook',
            meta: {
                title: '审核失败'
            },
            name: 'submitauditnook',
            component: () => import('@/views/submitauditnook/submitauditnook.vue')
        },
        {
            path: 'agreementword',
            meta: {
                title: '协议内容'
            },
            component: () => import('@/views/agreementword/agreementword.vue')
        },
        {
            path: 'modifynikename',
            meta: {
                title: '修改昵称'
            },
            component: () => import('@/views/me/modifynikename/index.vue')
        },
        {
            path: 'creatstep1',
            meta: {
                title: '维护线路'
            },
            component: () => import('@/views/line/creatstep1/index.vue')
        },
        {
            path: 'creatstep2',

            meta: {
                title: '维护线路下一步'
            },
            component: () => import('@/views/line/creatstep2/index.vue')
        },
        {
            path: 'setmenu',
            meta: {
                title: '套餐设置'
            },
            component: () => import('@/views/line/setmenu/setmenu.vue')
        },
    ]
}
export default meRouter