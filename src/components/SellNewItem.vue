<template>
  <div style="padding: 20px 300px">
    <h3>Sell New Product</h3><br>
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
      <div class="form-group">
        <label for="image">Product Image</label>
        <input type="file" class="form-control-file" id="image">
      </div>
      <div class="form-group">
        <label>Product Category</label>
        <select class="form-control" v-model="formData.category">
          <option>Food</option>
          <option>Other</option>
        </select>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'register',
    data () {
      return {
        formData: {
          name: '',
          description: '',
          price: 0,
          quantity: 1,
          imageUrl: '',
          category: ''
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>