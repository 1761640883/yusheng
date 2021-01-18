const state = {
  nm: localStorage.getItem('cityName') || '北京',
  id: localStorage.getItem('cityId') || '110100'
}

const actions = {

}

const mutations = {
  CITY_INFO (state, data) {
    state.nm = data.nm
    state.id = data.id
  }
}

export default {
  namespaced: true, // 有名字区分出来是哪个状态管理下的数据（命名空间）
  state,
  actions,
  mutations
}
