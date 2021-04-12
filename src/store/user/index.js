const state = {
  name: window.localStorage.getItem('name'),
  isAdmin: window.localStorage.getItem('isAdmin') || false,
  userHead: ''
}

const actions = {

}

const mutations = {
  // 因为在center组件中进入管理员页面时通过a标签新建页面进入的，导致vuex的store存储的数据在新页面不起作用
  USER_NAME (state, data) {
    state.name = data.name
    state.isAdmin = data.isAdmin
    state.userHead = data.userHead
  }
}

export default {
  namespaced: true, // 有名字区分出来是哪个状态管理下的数据（命名空间）调用该模块时需要要带上模块名称
  state,
  actions,
  mutations
}
