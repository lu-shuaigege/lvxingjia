import api from './api';
import {http} from '../utils/http';

const cities = {
    index(baidu_code, cascade, internationals) {
        let params = {}
        if (baidu_code) {
            params['baidu_code'] = baidu_code;
        }
        if (cascade) {
            params['cascade'] = cascade;
        }
        if (internationals) {
            params['internationals'] = internationals;
        }
        return http({
            url: `${api.cities}`,
            method: 'get',
            params: params
        })
    }
};

export default cities;
