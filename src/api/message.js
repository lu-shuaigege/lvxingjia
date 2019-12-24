import api from './api';
import {
    http
} from '../utils/http';

const message = {
    index(is_read, page) {
        let params = {}
        if (is_read) {
            params['is_read'] = is_read
        }
        if (page) {
            params['page'] = page
        }
        return http({
            url: `${api.message}`,
            method: 'get',
            params: params
        })
    },
    signMessage(msg_id) {
        return http({
            url: `${api.message}`,
            method: 'post',
            data: {
                msg_id: msg_id
            }
        })
    }
};

export default message;