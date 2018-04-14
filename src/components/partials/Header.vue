<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#">DShopping</a>
      <!--<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"-->
              <!--aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">-->
        <!--<span class="navbar-toggler-icon"></span>-->
      <!--</button>-->

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <router-link to="/search" class="nav-link">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/shoppingcart" class="nav-link">Shopping Cart</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/purchased" class="nav-link">Purchased</router-link>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown"
               aria-haspopup="true" aria-expanded="false">
              Sell
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <router-link to="/sell-new" class="dropdown-item">Post Items</router-link>
              <router-link to="/selling" class="dropdown-item">Selling Items</router-link>
              <router-link to="/history" class="dropdown-item">Sold Items</router-link>
            </div>
          </li>
        </ul>
        <form class="form-inline my-2 my-lg-0">
          <input class="form-control mr-sm-2" type="search" 
            placeholder="Search" aria-label="Search" style="width: 600px" v-model="keyword">
          <button class="btn btn-outline-success my-2 my-sm-0" @click="searchByKeyword(keyword)">Search</button>
          <ul class="navbar-nav mr-auto" style="margin-left:20px">
            <li class="nav-item active">
              <router-link to="/search" class="nav-link">Hello, XXXXXXXX</router-link>
            </li>
        </ul>
        </form>
      </div>
    </nav>
  </div>
</template>

<script>
  export default {
    name: 'header',
    data () {
      return {
        keyword: ''
      }
    },
    methods: {
      searchByKeyword (keyword) {
        this.$router.push('/search?keyword=' + keyword)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
