import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    id:''
  },
  mutations: {
    offId(state){ // 退出登录
      state.id=''
    }
  },
  getters: {
  },
  actions: {
  }
})
