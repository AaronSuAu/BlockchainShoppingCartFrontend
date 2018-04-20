<template>
  <div class="container" id="itemList">
    <div v-if="items != null && items.data.length > 0">
      <template v-for="item in items.data">
        <div class="row item-margin-top-list">
          <div class="col-md-3">  
            <img :src="item.image_url"
            alt="image" class="item-in-list">
          </div>
          <div class="col-md-6 text-left">
            <span>Name: {{item.name}} </span><br/>
            <span v-if="$route.path === '/shoppingcart'">Storage: {{item.quantity}}</span>
            <span v-else>Quantity: {{item.quantity}}</span><br/>
            <span>Price: {{item.price}}</span><br/>
            <span>Description: {{item.description}}</span>
          </div>
          <div v-if="$route.path === '/search'" class="col-md-3">
            <!-- <input type="number" name="quantity" placeholder="Quantity"> -->
            <button class="btn btn-primary btn-block btn-margin-top" @click="addItemToShoppingCart(item)">Add to Shopping Cart</button>
          </div>
          <div v-else-if="$route.path === '/shoppingcart'" class="col-md-3">
            <input type="number" name="quantity" placeholder="Quantity" v-model="item.amountToBuy">
            <button class="btn btn-primary btn-block btn-margin-top" @click="buyItem(item)">Buy</button>
            <button class="btn btn-danger btn-block btn-margin-top" @click="deleteItemFromShoppingCart(item)">Delete</button>
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
      <div class="row">
        <div v-if="items.next_page_url != null">
          <div class="col-md-2">
            <button class="btn btn-info" @click="paginate(items.next_page_url)">Next</button>
          </div>
        </div>
        <div v-if="items.prev_page_url != null">
          <button class="btn btn-danger" @click="paginate(items.prev_page_url)">Prev</button>
        </div>
      </div>
      
      
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
  asyncComputed: {
    items: {
      get () {
        this.$transaction.methods.balances(this.$store.state.userInfo.address).call()
        .then((response) => console.log(response))
        .catch((error) => console.log(error))
        return this.fetchData(this.$route.path)
      }
    }
  },
  methods: {
    async paginate (url) {
      try {
        // url = url.replace('http://192.168.99.100/api', '')
        // let response = await this.$http.get(url)
        // console.log(response)
        let response = await this.$http({
          method: 'get',
          url: url
        })
        this.items = response.data
        console.log(this.items)
      } catch (e) {
        console.log(e)
        alert('error, try again')
      }
    },
    async deleteItemFromShoppingCart (item) {
      try {
        const address = this.$store.state.userInfo.address
        console.log(item.shopping_carts_id)
        await this.$http.delete('/shoppingCarts/' + item.shopping_carts_id + '/' + address)
        alert('Success')
        this.items = await this.fetchData(this.$route.path)
      } catch (e) {
        console.log(e)
        alert('Error, try again')
      }
    },
    async addItemToShoppingCart (item) {
      try {
        console.log(item.id)
        await this.$http.post('/shoppingCarts/' + this.$store.state.userInfo.address, {
          product_id: item.id,
          quantity: 1
        })
        alert('Success')
      } catch (e) {
        console.log(e)
        alert('Error, try again')
      }
    },
    buyItem (item) {
      console.log(item.amountToBuy)
      if (item.amountToBuy == null) {
        alert('Enter the amount you want to buy')
      }
      if (item.amountToBuy > item.quantity) {
        alert('The number should be smaller than the storage number')
        return
      }
      let price = parseInt(item.price, 10)
      let priceStr = price.toString()
      console.log(priceStr)

      this.$transaction.methods.deposit(price).send({
        from: this.$store.state.userInfo.address,
        gas: 300000,
        value: window.web3.utils.toWei(priceStr, 'ether')})
      .then(function (response) {
        console.log(response)
        // this.$transaction.methods.transfer(item.owner_address, parseInt(item.price, 10), item.id)
      })
      .catch((response) => alert(response))
      console.log(JSON.stringify(item))
      console.log('user address', this.$store.state.userInfo.address)
    },
    updateItem (item) {
      this.$router.push({name: 'update-item', params: {item: item}})
    },
    async fetchData (route) {
      let response
      if (route === '/search') {
        try {
          if (this.$route.query.keyword == null) {
            response = await this.$http.get('/products')
          } else {
            response = await this.$http.get('/searchproducts/' + this.$route.query.keyword)
          }
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
      } else if (route === '/selling') {
        try {
          response = await this.$http.get('/products/' + this.$store.state.userInfo.address)
          // console.log(JSON.stringify(response))
        } catch (e) {
          alert('Error, try again')
        }
      } else {
        this.$transaction.events.LogTransfer({fromBlock: 0, toBlock: 'latest'},
          function (error, event) {
            if (error) {
              console.log(error)
            } else {
              console.log(event)
            }
          })
        /*
        this.$transaction.getPastEvents('LogTransfer', {filter: {amount: [0, 9999999999]}}, function (error, event) {
          if (error) {
            console.log(JSON.stringify(error))
          } else {
            console.log(event)
          }
        })
        */
        return null
      }
      return response.data
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>