<template>
  <div id="app">
    <img src="./assets/logo.png">
    <site-header></site-header>
    <site-sidebar></site-sidebar>
    <router-view></router-view>
  </div>
</template>

<script>
  import Header from './components/partials/Header.vue'
  import Sidebar from './components/partials/Sidebar.vue'
  export default {
    name: 'app',
    components: {
      'site-sidebar': Sidebar,
      'site-header': Header
    }
  }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
