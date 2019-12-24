import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        user: {},
        token: null,
        title: '',
        orderInfor: {},
        step1: {},
        payok: {},
        settledin: {}
    },
    mutations: {
        //登录成功将, token保存在localStorage中
        login: (state, data) => {
            localStorage.token = data;
            state.token = data;
        },
        //退出登录将, token清空
        logout: (state) => {
            localStorage.removeItem('token');
            state.token = null
            location.reload()
        },
        //订单信息
        orderInfor: (state, data) => {
            state.orderInfor = data
        },
        //step1线路
        step1: (state, data) => {
            state.step1 = data
        },
        // 支付成功数据
        payok: (state, data) => {
            state.payok = data
        },
        settledin: (state, data) => {
            state.settledin = data
        }
    },
    actions: {}
})