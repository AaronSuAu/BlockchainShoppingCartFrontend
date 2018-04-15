// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import AsyncComputed from 'vue-async-computed'
import App from './App'
import Web3 from 'web3'
import router from './router'
import store from './store'
import axios from 'axios'
import VueClip from 'vue-clip'

Vue.use(VueClip)

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
  // set router
  router.beforeEach((to, from, next) => {
    if (store.state.userInfo || to.path === '/login' || to.path.includes('register/')) {
      next()
    } else {
      next('/login')
    }
  })
  /* eslint-disable no-new */
  Vue.use(AsyncComputed)
  new Vue({
    el: '#app',
    router,
    store: store,
    template: '<App/>',
    render: h => h(App),
    components: { App }
  })
})

