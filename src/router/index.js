import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import Register from '@/components/Register'
import SellNewItem from '../components/SellNewItem.vue'
import ItemList from '@/components/ItemList'
import Login from '../../src/components/Login.vue'
import UpdateItem from '../../src/components/UpdateSellingItem.vue'
import Balance from '../../src/components/Balance.vue'

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/register/:addr',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/sell-new',
      name: 'sell-new',
      component: SellNewItem
    },
    {
      path: '/search',
      name: 'search',
      component: ItemList
    },
    {
      path: '/shoppingcart',
      name: 'shoppingcart',
      component: ItemList
    },
    {
      path: '/selling',
      name: 'selling',
      component: ItemList
    },
    {
      path: '/history',
      name: 'history',
      component: ItemList
    },
    {
      path: '/purchased',
      name: 'purchased',
      component: ItemList
    },
    {
      path: '/update-item',
      name: 'update-item',
      component: UpdateItem
    },
    {
      path: '/balance',
      name: 'balance',
      component: Balance
    }
  ]
})
