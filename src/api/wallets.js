import api from './api';
import {
    http
} from '../utils/http';

const wallets = {
    me() {
        return http({
            url: `${api.myWallets}`,
            method: 'get',
        })
    },
    withdraw(amount) {
        return http({
            url: `${api.myWallets}/cash-out`,
            method: 'post',
            data: amount

        })
    },
    detailed(page, type) {
        let params = {}
        if (page) {
            params['page'] = page;
        }
        if (type) {
            params['type'] = type;
        }
        return http({
            url: `${api.walletsDetailed}`,
            method: 'get',
            params: params
        })
    },
    cash_out() {
        return http({
            url: `${api.myWallets}/can-cash-out`,
            method: 'get',
        })
    }

};

export default wallets;