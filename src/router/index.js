import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import Register from '@/components/Register'
import SellNewItem from '../components/SellNewItem.vue'
import ItemList from '@/components/ItemList'

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/sell-new',
      name: 'sell-new',
      component: SellNewItem
    },
    {
      path: '/search',
      name: 'itemList',
      component: ItemList
    },
    {
      path: '/shoppingcart',
      name: 'itemList',
      component: ItemList
    },
    {
      path: '/selling',
      name: 'itemList',
      component: ItemList
    },
    {
      path: '/history',
      name: 'itemList',
      component: ItemList
    },
    {
      path: '/purchased',
      name: 'itemList',
      component: ItemList
    }
  ]
})
