import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 可以使用下面的方法在入口文件调用，就不用在各个组件引入axios（但是在组件使用中需要在前面加this）
import axios from 'axios'// 还需要在下面写Vue.prototype.axios = axios（因为规范的原因被移下去了）

// 注册全局过滤函数
// Vue.filter('setWH',(url, arg)=>{
//   return url.replace(/w\.h/, arg)
// })

// 注册全局子组件
// import Scroller from '@/components/Scroller'
// Vue.component('Scroller', Scroller)

import loading from '@/components/loading'// 还需要在下面写Vue.component('loading', loading)（因为规范的原因被移下去了）

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

Vue.component('loading', loading)
Vue.prototype.axios = axios

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
