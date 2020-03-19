import api from './api';
import {
    http
} from '../utils/http';

const orders = {
    store(obj_id, order_type, type, total, count, name, mobile, idcard, traveller_ids, use_date = '', start_date = '', end_date = '', price_num = 0, price_children_num = 0, rewards_points, share_code, venue_id, venue, remarks) {
        return http({
            url: `${api.orders}`,
            method: 'post',
            data: {
                obj_id: obj_id,
                order_type: order_type,
                type: type,
                total: total,
                count: count,
                name: name,
                mobile: mobile,
                idcard: idcard,
                traveller_ids: traveller_ids,
                use_date: use_date,
                start_date: start_date,
                end_date: end_date,
                price_num: price_num,
                price_children_num: price_children_num,
                rewards_points: rewards_points,
                share_code: share_code,
                venue_id: venue_id,
                venue: venue,
                remarks: remarks
            }
        })
    },
    show(id) {
        return http({
            url: `${api.orders}/${id}`,
            method: 'get',
        });
    },
    my(status, page) {
        return http({
            url: `${api.orders}`,
            method: 'get',
            params: {
                status: status,
                page: page
            },
        })
    },
    order_base() {
        return http({
            url: `${api.order_base}`,
            method: 'get',
        })
    },
    order_pay(order_id) {
        return http({
            url: `${api.order_pay}/${order_id}`,
            method: 'post',
        })
    },
    orderRefunded(order_id) {
        return http({
            url: `${api.orderRefunded}/${order_id}`,
            method: 'post',
        })
    },
    delete(id) {
        return http({
            url: `${api.orders}/${id}`,
            method: 'delete',
        });
    },
};

export default orders;