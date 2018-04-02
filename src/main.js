// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Web3 from 'web3'
import router from './router'
import store from './store'
import axios from 'axios'

Vue.config.productionTip = false

window.addEventListener('load', function () {
  if (typeof web3 !== 'undefined') {
    console.log('Web3 injected browser: OK.')
    window.web3 = new Web3(window.web3.currentProvider)
    // window.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
  } else {
    console.log('Web3 injected browser: Fail. You should consider trying MetaMask.')
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
  }
  // set axios
  axios.defaults.timeout = 5000
  axios.defaults.headers.post['Content-Type'] = 'application/json'
  axios.defaults.baseURL = 'http://192.168.99.100/api'
  Vue.prototype.$http = axios
  // get web3 provider
  window.web3.eth.getAccounts().then(function (addr) {
    store.commit('UPDATE_WALLET_ADDR', addr[0])
  })
  // set router
  router.beforeEach((to, from, next) => {
    if (to.path === '/register') {
      next()
    } else {
      axios.get('/user/' + store.state.walletAddr)
        .then((response) => {
          console.log(response)
          next()
        })
        .catch((error) => {
          console.log(error.response.data)
          next('/register')
        })
    }
  })
  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    router,
    store: store,
    template: '<App/>',
    components: { App }
  })
})

