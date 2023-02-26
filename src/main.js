import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//import '@/mock.js'


Vue.config.productionTip = false

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import axios from './axios'
import VueAxios from 'vue-axios'
Vue.prototype.$axios = axios
Vue.use(VueAxios, axios)

import qs from 'qs'
Vue.prototype.$qs = qs

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
