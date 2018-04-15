<template>
  <div style="padding: 20px 300px">
    {{$route.params.item}}
    <h3>Update Product</h3><br>
    <form>
      <div class="form-group">
        <label for="name">Product Name</label>
        <input type="text" class="form-control" id="name" placeholder="Enter Product Name" v-model="formData.name">
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <textarea style="height: 100px" class="form-control"
                  id="description"
                  v-model="formData.description"
                  placeholder="Enter Description (maximum 150 words)"></textarea>
      </div>
      <div class="form-group">
        <label for="price">Price</label>
        <input type="number" class="form-control" id="price" v-model="formData.price">
      </div>
      <div class="form-group">
        <label for="quantity">Quantity</label>
        <input type="number" class="form-control" id="quantity" v-model="formData.quantity">
      </div>
      <div>
        <img :src="$route.params.item.image_url" width="200" height="200">
      </div>
      <p v-for="err in errors" style="color: red">{{err}}</p>
      <button type="submit" class="btn btn-primary" @click="submit">Submit</button>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'register',
    data () {
      return {
        errors: {},
        formData: {
          name: this.$route.params.item.name,
          description: this.$route.params.item.description,
          price: this.$route.params.item.price,
          quantity: this.$route.params.item.quantity,
          address: this.$store.state.userInfo.address
        }
      }
    },
    methods: {
      submit () {
        console.log(JSON.stringify(this.formData))
        this.$http.put('/products/' + this.$route.params.item.id, this.formData)
          .then(function (res) {
            alert('Product updated!')
            this.$router.push('/selling')
          }.bind(this))
          .catch(function (err) {
            this.errors = err.response.data.errors
          }.bind(this))
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>