// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import http from "./api/server"
import ApiSetting from "./api/api"

import Vuex from 'vuex';
import store from './store/store.js';

Vue.prototype.$http=http;
Vue.prototype.$ApiSetting=ApiSetting;

Vue.use(ElementUI);
Vue.config.productionTip = false;



// console.log(Vue.$ApiSetting);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  store,
  // render: h => h(App)
})
