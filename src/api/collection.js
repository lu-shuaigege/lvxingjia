import api from './api';
import {
    http
} from '../utils/http';

const collection = {
    index(type, source_id) {
        return http({
            url: `${api.collection}/${type}`,
            method: 'post',
            data: {
                source_id: source_id
            }
        })
    }
};

export default collection;