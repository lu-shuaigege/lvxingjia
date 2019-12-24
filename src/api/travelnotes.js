import api from './api';
import {
    http
} from '../utils/http';

const travelnotes = {
    index(page) {
        return http({
            url: `${api.travelnotes}`,
            method: 'get',
            params: {
                page: page
            }
        })
    },
    release(data) {
        return http({
            url: `${api.travelnotes}`,
            method: 'post',
            data: data
        })
    },
    show(id) {
        return http({
            url: `${api.travelnotes}/${id}`,
            method: 'get',
        })
    },
    comment(id) {
        return http({
            url: `${api.comments}/${id}`,
            method: 'get',
        })
    },
    newComment(content, travels_id, comment_id) {
        let params = {}
        if (content) {
            params['content'] = content;
        }
        if (travels_id) {
            params['travels_id'] = travels_id;
        }
        if (comment_id) {
            params['comment_id'] = comment_id;
        }
        return http({
            url: `${api.comments}`,
            method: 'post',
            data: params
        })
    },
    update(id,name,cover_img,content) {
        return http({
            url: `${api.travelnotes}/${id}`,
            method: 'put',
            params: {
                name:name,
                cover_img:cover_img,
                content:content
            },
        });
    },
};

export default travelnotes;