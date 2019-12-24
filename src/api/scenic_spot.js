import api from './api'; // 导入接口域名列表
import {
    http
} from '@/utils/http.js';

const scenic_spot = {
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
            url: `${api.scenic_spot}`,
            method: 'get',
            params: params
        });
    },
    //详情
    show(id) {
        (`${api.scenic_spot}/${id}`);
        return http({
            url: `${api.scenic_spot}/${id}`,
            method: 'get',
        });
    }
};

export default scenic_spot;