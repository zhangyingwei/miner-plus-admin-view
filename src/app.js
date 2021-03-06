import Vue from 'vue';
import App from './components/App.vue';
import VueRouter from 'vue-router';

import heyuiConfig from './js/config/heyui-config';
import routerConfig from './js/config/router-config';

import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

import axios from 'axios';
Vue.prototype.$axios = axios;

require('./css/app.less');

//HeyUI已经设定为全局变量，无需引用
//设定全局变量请参考根目录下的hey.js文件


heyuiConfig();
Vue.use(VueRouter);
Vue.use(HeyUI);
Vue.use(mavonEditor)

const router = routerConfig();

const app = new Vue({
    router,
    el: '#app',
    render: h => h(App)
});

export default app;