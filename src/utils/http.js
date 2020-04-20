import axios from 'axios';
import store from '@/store';
import {
    Toast
} from 'vant';

const instance = axios.create({
    timeout: process.env.VUE_APP_TIMEOUT,
    baseURL: process.env.VUE_APP_BASE_API,
});
// localStorage.setItem("token", "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9hcGkubHZ4aW5nai5jb21cL3dlY2hhdFwvYXV0aCIsImlhdCI6MTU4NTYxODcwNSwiZXhwIjoxNTg4MjEwNzA1LCJuYmYiOjE1ODU2MTg3MDUsImp0aSI6Imc2NUNISkRDVVh6QVp3dWkiLCJzdWIiOnsiaWQiOjJ9fQ.YJ8Wk8yKc5Isjd4HwmRAREHjR6TwFwLVCrewyLf6YNE")
instance.interceptors.request.use(
    config => {
        let token = store.state.token ? store.state.token : localStorage.token;
        config.headers['Authorization'] = 'Bearer ' + token;
        return config
    },
    error => {
        return Promise.reject(error)
    }
);

instance.interceptors.response.use(
    response => {
        //认证处理
        if (Number(response.data.status_code) === 101 || Number(response.data.status_code) === 102 || Number(response.data.status_code) === 103 || Number(response.data.status_code) === 104 || Number(response.data.status_code) === 105) {
            store.commit('logout');
            return
        }

        //申请入驻图片上传异常处理
        if (Number(response.data.status_code) === 0 && response.data.data.data.message) {
            // Toast(response.data.message)
            Toast("上传文件过大请重新上传")
            return
        }
        //异常处理
        if (Number(response.data.status_code) == 1) {
            return response.data.data
        }
        if (Number(response.data.status_code) !== 200) {
            Toast(response.data.message)
            return
        }

        //数据响应
        return response.data.data
    },
    error => {
        Toast('接口异常')
        return
    }
);

export function http(options) {
    return instance(options)
}