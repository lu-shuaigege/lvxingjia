import api from './api';
import {http} from '../utils/http';

const travellers = {
    my() {
        return http({
            url: `${api.travellers}`,
            method: 'get',
        })
    },
    //详情
    show(id) {
        return http({
            url: `${api.travellers}/${id}`,
            method: 'get',
        });
    },
    update(id,data) {
        return http({
            url: `${api.travellers}/${id}`,
            method: 'put',
            params: data,
        });
    },
    store(data) {
        return http({
            url: `${api.travellers}`,
            method: 'post',
            params: data,
        });
    },
    delete(id) {
        return http({
            url: `${api.travellers}/${id}`,
            method: 'delete',
        });
    },
};

export default travellers;
