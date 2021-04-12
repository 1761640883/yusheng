import Vue from 'vue'
import Vuex from 'vuex'
import city from './city'
import user from './user'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {// state：负责定义状态
  },
  mutations: {// mutations：设置mutation后，这是唯一修改状态的位置。（因为mutations要对修改操作进行监听）（查看信息需要用到devtools插件）
  },
  actions: {// 如果需要进行异步操作就启用这个，只进行同步操作就不需要。他会跟后端进行信息传递（actions也可以做同步）
  },
  modules: {
    city, // 子组件查看city文件夹
    user
  }
})
