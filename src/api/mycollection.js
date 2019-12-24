import api from './api';
import {http} from '../utils/http';

const mycollection = {
    index(type,page) {
        return http({
            url: `${api.mycollection}`,
            method: 'get',
            params: {type:type,page:page},
        })
    }
};

export default mycollection;
