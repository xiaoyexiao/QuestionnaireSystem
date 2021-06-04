import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    status: 0
  },
  mutations: {
    setId (state, status) {
      state.status = status
    }
  },
  getters: {
  },
  actions: {
  }
})
