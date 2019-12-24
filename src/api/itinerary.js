import api from './api';
import {
    http
} from '../utils/http';

const itinerary = {
    // 发布线路第一步
    storestep1(data) {
        return http({
            url: `${api.itinerary + '/step1'}`,
            method: 'post',
            data: data,
        })
    },
    // 发布线路第二步
    storestep2(data) {
        return http({
            url: `${api.itinerary + '/step2'}`,
            method: 'post',
            data: data,
        })
    },
    // 修改线路第一步
    updatestep1(id, data) {
        return http({
            url: `${api.itinerary + '/step1'}/${id}`,
            method: 'put',
            data: data,
        })
    },
    // 修改线路第二步
    updatestep2(id, data) {
        return http({
            url: `${api.itinerary + '/step2'}/${id}`,
            method: 'put',
            data: data,
        })
    },
    // 线路下架
    offline(id) {
        return http({
            url: `${api.offline}/${id}`,
            method: 'post',
        })
    },
    // 线路上架
    publish(id) {
        return http({
            url: `${api.publish}/${id}`,
            method: 'get',
        })
    },
    myTineraries(page) {
        let params = {}
        if (page) {
            params['page'] = page;
        }
        return http({
            url: `${api.myTineraries}`,
            method: 'get',
            params: params
        })
    },
    //详情
    show(id) {
        return http({
            url: `${api.itineraries}/${id}`,
            method: 'get',
        });
    },
    delete(id) {
        return http({
            url: `${api.itineraries}/${id}`,
            method: 'delete',
        });
    },
};

export default itinerary;