<template>
  <div class="container" id="itemList">
    <div id="myModal" class="modal">
      <!-- Modal content -->
      <div class="modal-content">
        <p>Please wait while the transaction is being processed, Do not refresh or do anything</p>
        <div class="progress active">
                <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style="width: 100%;"></div>
            </div>
      </div>
    </div>
    <div v-if="items != null && items.data.length > 0">
      <template v-for="item in items.data">
        <div class="row item-margin-top-list">
          <div class="col-md-3">  
            <img :src="item.image_url" style="height: 130px"
            alt="image" class="item-in-list">
          </div>
          <div class="col-md-6 text-left">
            <span>Name: {{item.name}} </span><br/>
            <span v-if="$route.path === '/shoppingcart'">Storage: {{item.quantity}}</span>
            <span v-else>Quantity: {{item.quantity}}</span><br/>
            <span v-if="$route.path === '/purchased' || $route.path === '/history'">Total Price: {{item.amount / 1000}} eth</span>
            <span v-else>Price: {{item.price}} eth</span><br/>
            <div v-if="$route.path === '/purchased' || $route.path === '/history'">
              Deal time: {{item.time}}
            </div>
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
            <button class="btn btn-danger btn-block btn-margin-top" @click="deleteMyItem(item)">Delete</button>
          </div>
      
          <!--<div v-else-if="$route.path === '/purchased'" class="col-md-3">-->
            <!--<span> Quantity: {{item.amount}} </span>-->
            <!--&lt!&ndash <button class="btn btn-primary btn-block btn-margin-top" @click="updateItem(item)">Edit</button> &ndash&gt-->
          <!--</div>-->
        </div>
      </template><br>
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
        return this.fetchData(this.$route.path)
      }
    }
  },
  methods: {
    timeConverter (unixTime) {
      var a = new Date(unixTime * 1000)
      var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      var year = a.getFullYear()
      var month = months[a.getMonth()]
      var date = a.getDate()
      var hour = a.getHours()
      var min = a.getMinutes()
      var sec = a.getSeconds()
      var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec
      return time
    },
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
      } catch (e) {
        console.log(e)
        alert('error, try again')
      }
    },
    async deleteMyItem (item) {
      try {
        await this.$http.delete('products/' + item.id + '/' + this.$store.state.userInfo.address)
        alert('Success')
        this.items = await this.fetchData(this.$route.path)
      } catch (error) {
        alert('Error, try again')
      }
    },
    async deleteItemFromShoppingCart (item) {
      try {
        const address = this.$store.state.userInfo.address
        await this.$http.delete('/shoppingCarts/' + item.shopping_carts_id + '/' + address)
        this.items = await this.fetchData(this.$route.path)
      } catch (e) {
        console.log(e)
      }
    },
    async addItemToShoppingCart (item) {
      try {
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
    async buyItem (item) {
      var modal = document.getElementById('myModal')
      if (item.amountToBuy == null) {
        alert('Enter the amount you want to buy')
      }
      if (item.amountToBuy > item.quantity) {
        alert('The number should be smaller than the storage number')
        return
      }
      let price = item.price * item.amountToBuy * 1000
      let amount = parseInt(item.amountToBuy, 10)
      try {
        // send request to the backend to check if quantity is available
        let product = await this.$http.get('/products/product/' + item.id)
        let address = product.data.owner_address
        // address = '0xd7f56927b3d89ac99622ddbfad9372c503d883ef'
        this.$transaction.methods.transfer(address, price, amount, item.id)
        .send({
          from: this.$store.state.userInfo.address,
          gas: 400000,
          value: window.web3.utils.toWei(price.toString(), 'finney')
        })
        .then(function (response) {
          return this.$http.post('/purchaseProducts', {
            shoppingCartId: item.shopping_carts_id,
            quantity: amount
          })
        }.bind(this))
        .then(function (res) {
          // alert('success')
          return this.fetchData(this.$route.path)
        }.bind(this))
        .then(function (res) {
          this.items = res
          modal.style.display = 'none'
        }.bind(this))
        .catch(function (response) {
          modal.style.display = 'none'
          alert('Purchase fail')
        })
        modal.style.display = 'block'
        alert('Your transaction will be in the block chain after you submit')
      } catch (error) {
        alert(error)
        modal.style.display = 'none'
      }
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
        console.log(route)
        var productIds = []
        await this.$transaction.getPastEvents('LogTransfer',
          {
            fromBlock: 0,
            toBlock: 'latest'
          },
          function (error, events) {
            if (error) {
              console.log(error)
            } else {
              // console.log(events)
              for (let e of events) {
                if (route === '/purchased') {
                  if (e.returnValues.sender === this.$store.state.userInfo.address) {
                    productIds.push({
                      amount: e.returnValues.amount,
                      id: e.returnValues.productId,
                      quantity: e.returnValues.quantity,
                      time: this.timeConverter(e.returnValues.time)})
                  }
                } else if (route === '/history') {
                  if (e.returnValues.to === this.$store.state.userInfo.address) {
                    productIds.push({
                      amount: e.returnValues.amount,
                      id: e.returnValues.productId,
                      quantity: e.returnValues.quantity,
                      time: this.timeConverter(e.returnValues.time)})
                  }
                }
              }
              // console.log(events)
            }
          }.bind(this))
        console.log(productIds)
        try {
          response = await this.$http.post('/listproducts', {ids: productIds})
          console.log(JSON.stringify({data: response.data}))
          return {data: response.data}
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
.modal {
    display: none; /* Hidden by default */
    position: fixed; /* Stay in place */
    z-index: 1; /* Sit on top */
    padding-top: 100px; /* Location of the box */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}

/* Modal Content */
.modal-content {
    background-color: #fefefe;
    margin: auto;
    padding: 20px;
    border: 1px solid #888;
    width: 60%;
}

/* The Close Button */
.close {
    color: #aaaaaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
}

.close:hover,
.close:focus {
    color: #000;
    text-decoration: none;
    cursor: pointer;
}
</style>