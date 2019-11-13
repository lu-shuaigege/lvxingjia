import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from './http.js';
Vue.prototype.$request = axios; //把调接口封装到原型上
import qs from 'qs'
import * as Api from './api/api.js';
Vue.prototype.$api = Api; //把接口名字封装到原型上

import './registerServiceWorker'
// 引入jquery
import $ from 'jquery'

import YDUI from 'vue-ydui'; /* 相当于import YDUI from 'vue-ydui/ydui.rem.js' */
import 'vue-ydui/dist/ydui.rem.css';
/* 使用px：import 'vue-ydui/dist/ydui.px.css'; */

Vue.use(YDUI);

import VueQuillEditor from 'vue-quill-editor'

// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.use(VueQuillEditor, {
  placeholder: '请输入正文...',
});


Vue.config.productionTip = false

import Vant from 'vant';
import 'vant/lib/index.css';

Vue.use(Vant);


import setTitle from './script/settitle.js'; // 公众号设置页面标题
window.setTitle = setTitle //挂在window的上面。全局可直接使用的额

let vm = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')