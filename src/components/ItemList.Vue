<template>
  <div class="container" id="itemList">
    <div v-if="items.length !== 0">
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
    <div v-else>
      Empty
    </div>  
  </div>
</template>

<script>
export default {
  name: 'itemList',
  data () {
    return {
    }
  },
  // mounted () {
  //   console.log('init')
  //   this.fetchData(this.$route.path)
  // },
  asyncComputed: {
    items: async function () {
      return this.fetchData(this.$route.path)
    }
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
      let response
      if (route === '/search') {
        try {
          response = await this.$http.get('/products')
          // console.log(JSON.stringify(response))
        } catch (e) {
          alert('Error, try again')
        }
      } else if (route === '/shoppingcart') {
        console.log('shopping cart')
        try {
          response = await this.$http.get('/shoppingCarts/' + this.$store.state.userInfo.address)
          // console.log(JSON.stringify(response))
        } catch (e) {
          alert('Error, try again')
        }
      }
      return response.data
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>