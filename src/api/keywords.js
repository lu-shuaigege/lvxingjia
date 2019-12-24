import api from './api';
import {http} from '../utils/http';

const keywords = {
    index() {
        return http({
            url: `${api.keywords}`,
            method: 'get',
        })
    }
};

export default keywords;
