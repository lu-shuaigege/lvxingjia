import qs from "qs"
import store from '@/store'
import api from '@/api/index'
import router from '@/router/index'
import functions from '@/utils/functions.js'

router.beforeEach(async (to, from, next) => {
    //设置标题
    if (to.meta && to.meta.title) {
        window.setTitle = functions.setTitle
    }

    //游客身份不需要授权
    if (to.matched.some(recode => recode.meta.guest)) {
        return next()
    }

    //已存在token不进行身份认证
    if (localStorage.token) {
        return next()
    }

    let query = qs.parse(window.location.href.split('?')[1])
    if (!query.code) {
        let url = window.location.href
        url = url.replace(`${process.env.VUE_APP_HOST}:${process.env.VUE_APP_PORT}`, process.env.VUE_APP_DOMAIN)
        if(process.env.NODE_ENV !== 'production'){
            url = functions.urlAddParams(url, 'r', window.location.href)
        }
        return window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${process.env.VUE_APP_APPID}&redirect_uri=${encodeURIComponent(url)}&response_type=code&scope=snsapi_userinfo&state=#wechat_redirect`
    }

    //兼容本地开发
    if (query.r) {
        return window.location.href = functions.urlAddParams(query.r, 'code', query.code)
    }

    await api.wechat.auth(query.code).then(res => {
        store.commit('login', res.token)
        let url = window.location.href
        return window.location.href = functions.urlDeleteParam(url, 'code')
    })
})

// 路由变化
router.afterEach(function (to) {
    if (to.meta && to.meta.title) {
        functions.setTitle(to.meta.title)
    }
})
