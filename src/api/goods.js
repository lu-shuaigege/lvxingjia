import api from './api';
import {
    http
} from '../utils/http';

const goods = {
    index(page) {
        let params = {}
        if (page) {
            params['page'] = page;
        }
        return http({
            url: `${api.goods}`,
            method: 'get',
            params: params
        })
    },
    show(id) {
        return http({
            url: `${api.goods}/${id}`,
            method: 'get',
        })
    },
    buy(address_id, goods_id, expend, notes) {
        let params = {}
        if (address_id) {
            params['address_id'] = address_id;
        }
        if (goods_id) {
            params['goods_id'] = goods_id;
        }
        if (expend||expend==0) {
            params['expend'] = expend;
        }
        if (notes) {
            params['notes'] = notes;
        }
        return http({
            url: `${api.buy}`,
            method: 'post',
            data: params
        })
    }
};

export default goods;