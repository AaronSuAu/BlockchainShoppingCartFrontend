<template>
  <div style="padding: 20px 300px">
    <h3>Please Register Your Details</h3><br>
    <form>
      <div class="form-group">
        <label for="name">Product Name</label>
        <input type="text" class="form-control" id="name" placeholder="Enter Product Name" v-model="formData.name">
      </div>
      <div class="form-group">
        <label for="email">Product Name</label>
        <input type="text" class="form-control" id="email" placeholder="Enter Email Address" v-model="formData.email">
      </div>
      <div class="form-group">
        <label for="address">Product Name</label>
        <input type="text" class="form-control" id="address" placeholder="Enter Your Address" v-model="formData.address">
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
          email: '',
          address: ''
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>