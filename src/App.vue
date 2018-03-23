<template>
  <div id="app">
    <!-- <img src="./assets/logo.png" style="text-align: center"> -->
    <site-header></site-header>
    <div class="content-cover">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import Header from './components/partials/Header.vue'
  export default {
    name: 'app',
    components: {
      'site-header': Header
    }
  }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 0px;
}
.btn-margin-top{
  margin-top:10px;
}
.image-in-list{
  height: 100%;
  width: 150px
}
.item-in-list{
  width: 150px;
  height: 100%
}
.item-margin-top-list{
  margin-top: 10px;
}
.content-cover{
  padding: 20px 40px;
}
</style>
