import api from './api';
import {
    http
} from '../utils/http';

const rewards_point = {
    me(page, type) {
        let params = {}
        if (page) {
            params['page'] = page;
        }
        if (type) {
            params['type'] = type;
        }
        return http({
            url: `${api.myRewards_point}`,
            method: 'get',
            params: params
        })
    },
    statistic() {
        return http({
            url: `${api.pointStatistic}`,
            method: 'get',
        })
    },
    sign_in_sum() {
        return http({
            url: `${api.sign_in_sum}`,
            method: 'get',
        })
    }
};

export default rewards_point;