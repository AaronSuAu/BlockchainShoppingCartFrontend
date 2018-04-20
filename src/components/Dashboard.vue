<template>
  <div class="dashboard">
    <h1>{{ msg }}</h1>
    <div>
      Welcome {{ pseudo }}. Destroy your account by clicking.
    </div>
    <!--<div v-else>Sign up <router-link to="/signup">here</router-link>.</div>-->
  </div>
</template>

<script>
export default {
  name: 'dashboard',
  data () {
    return {
      msg: 'Welcome to your truffle-vue dApp',
      pseudo: ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
  display: block;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
