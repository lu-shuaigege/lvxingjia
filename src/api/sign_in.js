import api from './api';
import {
    http
} from '../utils/http';

const sign_in = {
    index(page, date) {
        let params = {}
        if (page) {
            params['page'] = page;
        }
        if (date) {
            params['date'] = date;
        }
        return http({
            url: `${api.sign_in}`,
            method: 'post',
            data: params
        })
    },
    index_list(page, date) {
        let params = {}
        if (page) {
            params['page'] = page;
        }
        if (date) {
            params['date'] = date;
        }
        return http({
            url: `${api.sign_in}`,
            method: 'get',
            params: params
        })
    },
    sign_in_sum() {
        return http({
            url: `${api.sign_in_sum}`,
            method: 'get',
        })
    }
};

export default sign_in;