import api from './api';
import {http} from '../utils/http';

const addresses = {
    my(page) {
        return http({
            url: `${api.addresses}`,
            method: 'get',
            params: {page:page},
        })
    },
    //详情
    show(id) {
        return http({
            url: `${api.addresses}/${id}`,
            method: 'get',
        });
    },
    update(id,data) {
        return http({
            url: `${api.addresses}/${id}`,
            method: 'put',
            params: data,
        });
    },
    store(data) {
        return http({
            url: `${api.addresses}`,
            method: 'post',
            params: data,
        });
    },
    delete(id) {
        return http({
            url: `${api.addresses}/${id}`,
            method: 'delete',
        });
    },
};

export default addresses;
