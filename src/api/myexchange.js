import api from './api';
import {http} from '../utils/http';

const myexchange = {
    index(page) {
        let params = {}
        if (page) {
            params['page'] = page;
        }
        return http({
            url: `${api.myexchange}`,
            method: 'get',
            params: params
        })
    }
};

export default myexchange;
