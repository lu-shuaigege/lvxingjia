import api from './api';
import {
    http
} from '../utils/http';

const itineraries = {
    index(type, city_id, page, keywords, is_hot, mode, rand) {
        let params = {}
        if (type) {
            params['type'] = type;
        }
        if (city_id) {
            params['city_id'] = city_id;
        }
        if (page) {
            params['page'] = page;
        }
        if (keywords) {
            params['keywords'] = keywords;
        }
        if (is_hot) {
            params['is_hot'] = is_hot;
        }
        if (mode) {
            params['mode'] = mode;
        }
        if (rand) {
            params['rand'] = rand;
        }

        //@todo 临时修改获取全部数据，上线删除
        city_id = ''
        return http({
            url: `${api.itineraries}`,
            method: 'get',
            params: params
        })
    },
    show(id, step, share_code) {
        let params = {}
        if (step) {
            params['step'] = step;
        }
        if (share_code) {
            params['share_code'] = share_code;
        }
        return http({
            url: `${api.itineraries}/${id}`,
            method: 'get',
            params: params
        })
    },
    //线路报名人员列表
    enroll(itineraries_id, page, dates) {
        let params = {}
        if (page) {
            params['page'] = page;
        }
        if (dates) {
            params['dates'] = dates;
        }
        return http({
            url: `${api.itineraries}/enroll/${itineraries_id}`,
            method: 'get',
            params: params
        })
    }
};

export default itineraries;