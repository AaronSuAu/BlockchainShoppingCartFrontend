/**
 * Created by rexyang on 30/3/18.
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    walletAddr: ''
  },
  mutations: {
    UPDATE_WALLET_ADDR (state, addr) {
      state.walletAddr = addr
    }
  }
})
