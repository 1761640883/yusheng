import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 可以使用下面的方法在入口文件调用，就不用在各个组件引入axios（但是在组件使用中需要在前面加this）
import axios from 'axios'
Vue.prototype.axios = axios

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
