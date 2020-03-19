import api from './api';
import {
    http
} from '../utils/http';

const upload = {
    store(formData) {
        return http({
            baseURL: process.env.VUE_APP_IMGURL,
            url: `${api.upload}`,
            method: 'post',
            data: formData
        })
    }
};

export default upload;