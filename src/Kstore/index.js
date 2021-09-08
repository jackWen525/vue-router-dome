import Vue from 'vue'
import Vuex from './store'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    num: 1,
  },
  mutations: {
    add(state) {
      state.num++
    }
  },
  actions: {
    increment({ state }) {
      setTimeout(() => {
        state.num++;
      }, 1000)
    }
  },
  getters:{
    comUnm(state){
      return state.num+10
    }
  },
  modules: {
  }
})
