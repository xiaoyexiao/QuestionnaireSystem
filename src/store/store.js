import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    id:'',
    name:'',
    questionnaireId: 0
  },
  mutations: {
    offId(state){ // 退出登录
      state.id=''
    },
    setId(state,id){
      state.id=id
    },
    setName(state,name){
      state.name=name
    },
    setQuestionnaireId(state,questionnaireId){
      state.questionnaireId=questionnaireId
    },
  },
  getters: {
  },
  actions: {
  }
})
