import api from './api';
import {
    http
} from '../utils/http';

const user = {
    me() {
        return http({
            url: `${api.user}`,
            method: 'get',
        })
    },
    updateMe(data) {
        return http({
            url: `${api.user}`,
            method: 'put',
            params: data,
        })
    },
    encryption(data) {
        return http({
            baseURL: "http://admin.lvxingj.zhangxinkeji.com/",
            url: `${api.encryption}`,
            method: 'get',
            params: data,
        })
    }
};

export default user;