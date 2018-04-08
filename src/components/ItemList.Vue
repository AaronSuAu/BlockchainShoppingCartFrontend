<template>
  <div class="container" id="itemList">
    {{$route.path}}
    <template v-for="item in items">
      <div class="row item-margin-top-list">
        <div class="col-md-3">  
          <img :src="item.image_url"
          alt="image" class="item-in-list">
        </div>
        <div class="col-md-6 text-left">
          <span>Name: {{item.name}} </span><br/>
          <span>Quantity: {{item.quantity}}</span><br/>
          <span>Price: {{item.price}}</span><br/>
          <span>Description: {{item.description}}</span>
        </div>
        <div v-if="$route.path === '/search'" class="col-md-3">
          <!-- <input type="number" name="quantity" placeholder="Quantity"> -->
          <button class="btn btn-primary btn-block btn-margin-top" @click="addItemToShoppingCart(item)">Add to Shopping Cart</button>
        </div>
        <div v-else-if="$route.path === '/shoppingcart'" class="col-md-3">
          <input type="number" name="quantity" placeholder="Quantity">
          <button class="btn btn-primary btn-block btn-margin-top" @click="buyItem(item)">Buy</button>
        </div>
        <div v-else-if="$route.path === '/selling'" class="col-md-3">
          <!-- <input type="number" name="quantity" placeholder="Quantity"> -->
          <button class="btn btn-primary btn-block btn-margin-top" @click="updateItem(item)">Edit</button>
        </div>
        <div v-else-if="$route.path === '/sold'" class="col-md-3">
          <span> Quantity: ???? </span>
          <!-- <button class="btn btn-primary btn-block btn-margin-top" @click="updateItem(item)">Edit</button> -->
        </div>
        <div v-else-if="$route.path === '/purchased'" class="col-md-3">
          <span> Quantity: ???? </span>
          <!-- <button class="btn btn-primary btn-block btn-margin-top" @click="updateItem(item)">Edit</button> -->
        </div>
      </div>
    </template>  
  </div>
</template>

<script>
export default {
  name: 'itemList',
  data () {
    return {
      items: []
    }
  },
  mounted () {
    this.fetchData(this.$route)
  },
  methods: {
    addItemToShoppingCart (item) {
      alert('Add Item To Shopping Cart' + item.product_id)
    },
    buyItem (item) {
      alert('Buy ' + item.product_id)
    },
    updateItem (item) {
      alert('Update ' + item.product_id)
    },
    async fetchData (route) {
      if (route === '/search') {
        axios.get(axios.defaults.baseURL + '/products')
        .then(function (response) {
          console.log(response)
        })
        .catch(function (error) {
          console.log(error)
        })
      } else if (route === '/shoppingcart/') {
        try {
          this.items = await axios.get(axios.defaults.baseURL + '/shoppingCarts/fWDECQnZuy')
          console.log(this.items)
        } catch (e) {
          console.log(e)
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>