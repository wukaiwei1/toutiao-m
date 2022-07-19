import Vue from 'vue'
import Vuex from 'vuex'
import { GetToken, SetToken } from '@/utils'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: GetToken() || {}
  },
  // getters: {
  // },
  // 方法
  mutations: {
    setUser(state, payload) {
      // console.log(payload)
      state.user = payload
      SetToken(payload)
    }
  }
  // actions: {
  // },
  // modules: {
  // }
})
