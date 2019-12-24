import api from './api';
import {http} from '../utils/http';

const fans = {
    index(page) {
        return http({
            url: `${api.fans}`,
            method: 'get',
            params: {page:page},
        })
    }
};

export default fans;
