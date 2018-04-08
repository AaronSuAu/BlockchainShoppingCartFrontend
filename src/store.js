/**
 * Created by rexyang on 30/3/18.
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: undefined
  },
  mutations: {
    UPDATE_USER_INFO (state, info) {
      state.userInfo = info
    }
  }
})
