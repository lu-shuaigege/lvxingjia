import Vue from 'vue'
import "@/assets/js/rem"
import App from '@/App.vue'
import store from '@/store'
import '@/router/permission'
import api from '@/api/index'
import router from '@/router/index'
import global from '@/utils/global.js'
import wechat from '@/utils/wechat.js'
import jsonp from 'vue-jsonp'

// vant样式
// https://youzan.github.io
import 'vant/lib/index.css';
import {
    Area,
    Button,
    List,
    Field,
    Icon,
    Popup,
    Picker,
    Switch,
    Toast,
    Uploader,
    Swipe,
    SwipeItem,
    DatetimePicker
} from 'vant';
Vue.use(Area).use(Button).use(List).use(Field).use(Icon).use(Popup).use(Picker).use(Switch).use(Toast).use(Uploader).use(Swipe).use(SwipeItem).use(DatetimePicker)

// ydui样式
// https://vue.ydui.org
import YDUI from 'vue-ydui';
import 'vue-ydui/dist/ydui.rem.css';
Vue.use(YDUI);

//全局
Vue.use(global)


//过滤
import * as filters from '@/filters/index.js'
Object.keys(filters).forEach(key => Vue.filter(key, filters[key]))


Vue.prototype.$api = api
Vue.prototype.$wechat = new wechat()
Vue.use(jsonp)

String.prototype.isPic = function () {
    // if (this.substr(0, 4) == 'http') {
    let filterArr = ['.jpeg', '.gif', '.jpg', '.png', '.bmp', '.pic']
    for (let i = 0; i < filterArr.length; i++) {
        let suffix = filterArr[i]
        if (this.indexOf(suffix) > -1) {
            return true
        }
    }
    // }
    return false
}


import functions from '@/utils/functions.js'
Vue.prototype.$functions = functions

Vue.config.productionTip = false;
let vm = new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');