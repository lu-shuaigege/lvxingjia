import api from './api';
import {
    http
} from '../utils/http';

const upload = {
    store(formData) {
        return http({
            url: `${api.upload}`,
            method: 'post',
            data: formData
        })
    }
};

export default upload;