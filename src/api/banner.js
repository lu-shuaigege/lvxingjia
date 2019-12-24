import api from './api';
import {http} from '../utils/http';

const banner = {
    index() {
        return http({
            url: `${api.banner}`,
            method: 'get',
        })
    }
};

export default banner;
