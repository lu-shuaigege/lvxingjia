import api from './api';
import {
    http
} from '../utils/http';

const hotel = {
    //列表
    index(page = 1, keywords, city_id) {
        let params = {}
        if (page) {
            params['page'] = page;
        }
        if (keywords) {
            params['keywords'] = keywords;
        }
        if (city_id) {
            params['city_id'] = city_id;
        }
        return http({
            url: `${api.hotel}`,
            method: 'get',
            params: params
        });
    },
    //详情
    show(id) {
        return http({
            url: `${api.hotel}/${id}`,
            method: 'get',
        });
    },
};

export default hotel;