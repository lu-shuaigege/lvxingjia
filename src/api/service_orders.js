import api from './api';
import {
    http
} from '../utils/http';

const service_orders = {
    index(status, page) {
        return http({
            url: `${api.service_orders}`,
            method: 'get',
            params: {
                status: status,
                page: page
            }

        })
    },
    detail(id) {
        return http({
            url: `${api.service_orders}/${id}`,
            method: 'get',
        })
    },
};

export default service_orders;