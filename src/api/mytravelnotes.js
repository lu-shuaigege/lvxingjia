import api from './api';
import {
    http
} from '../utils/http';

const travelnotes = {
    index(page) {
        return http({
            url: `${api.mytravelnotes}`,
            method: 'get',
            params: {page:page},
        })
    },
};

export default travelnotes;
