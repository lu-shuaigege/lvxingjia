import api from './api';
import {http} from '../utils/http';

const wechat = {
    config() {
        return http({
            url: `${api.wechatConfig}`,
            method: 'get',
        })
    },
    async auth(code) {
        return await http({
            url: `${api.wechatAuth}`,
            method: 'get',
            params: {code: code}
        })
    }
};

export default wechat;
