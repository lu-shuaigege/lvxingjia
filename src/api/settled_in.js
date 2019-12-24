import api from './api';
import {
    http
} from '../utils/http';

const settled_in = {
    store(type, name, mobile, id_card, positive, back, business_license, bank, bank_account_name, bank_account, status) {
        return http({
            url: `${api.settled_in}`,
            method: 'post',
            data: {
                type: type,
                name: name,
                mobile: mobile,
                id_card: id_card,
                positive: positive,
                back: back,
                business_license: business_license,
                bank: bank,
                bank_account_name: bank_account_name,
                bank_account: bank_account,
                status: status,
            }

        })
    },
    show(type) {
        return http({
            url: `${api.settled_in}`,
            method: 'get',
            params: {
                type: type
            },
        })
    },
    store1(type, name, mobile, id_card, positive, back, bank, bank_account_name, bank_account, status) {
        return http({
            url: `${api.settled_in}`,
            method: 'post',
            data: {
                type: type,
                name: name,
                mobile: mobile,
                id_card: id_card,
                positive: positive,
                back: back,
                bank: bank,
                bank_account_name: bank_account_name,
                bank_account: bank_account,
                status: status,
            }

        })
    },
};

export default settled_in;