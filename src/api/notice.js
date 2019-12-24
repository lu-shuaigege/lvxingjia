import api from './api';
import {http} from '../utils/http';

const notice = {
    index() {
        return http({
            url: `${api.notice}`,
            method: 'get',
        })
    }
};

export default notice;
