import axios from 'axios';
import qs from 'qs';
const host = 'http://travel.api.dev.zhangxinkeji.com'; //域名

// 设置axios的数据请求方式

// axios配置
//axios.defaults.withCredentials = true; // 开启接收header中的cookie
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8'; // 设置标准编码格式
// http请求response操作，在接口响应后统一处理，相当于jQuery.$ajax的complete回调
axios.interceptors.response.use(function (res) {
    // let code = res.data.key;
    // switch (code) {
    //   case 7:
    //     delete window.localStorage.user; // 删除本地登录用户信息
    //     Vue.$toast('用户未登录，请先登录!');
    //     store.dispatch('logout');
    //     vm.$router.push({
    //       path: '/login'
    //     })
    //     break;
    // }
    return res;
}, function (error) {
    alert('网络异常')
    // Vue.$toast('网络异常');
    return Promise.reject(error);
});
export default {
    post: (url, params, callback) => {
        url = host + url;
        params = qs.stringify(params);
        axios.post(url, params).then(res => {
            typeof callback == 'function' && callback(res); //回调函数
        })
    },
    get(url, params, callback) {
        url = host + url;
        params = qs.stringify(params);
        axios.get(url, params).then(res => {
            typeof callback == 'function' && callback(res)
        })
    }
}