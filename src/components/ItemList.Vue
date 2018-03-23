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
      items: [
        { image_url: 'http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/cat-icon.png',
          quantity: '12',
          name: 'Foo',
          Description: 'description',
          owner_id: 12,
          category: 3,
          product_id: 1
        },
        { image_url: 'http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/cat-icon.png',
          quantity: '11',
          name: 'Boo',
          Description: 'description2',
          owner_id: 19,
          category: 5,
          product_id: 2
        }
      ]
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>