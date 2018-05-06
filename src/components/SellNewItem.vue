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
        <label>Product Image</label>
        <!--<input type="file" class="form-control-file" id="image">-->
        <p>only one jpg/png image accepted</p>
        <vue-clip :options="options" :on-complete="complete">
          <template slot="clip-uploader-action">
            <div>
              <div class="dz-message"><button> Click to choose image</button></div>
            </div>
          </template>

          <template slot="clip-uploader-body" scope="props">
            <div v-for="(file,index) in props.files">
              <img :src="file.dataUrl" />
              {{ file.name }} {{ file.status }}
            </div>
          </template>

        </vue-clip>

      </div>
      <div class="form-group">
        <label>Product Category</label>
        <select class="form-control" v-model.number="formData.category_id">
          <option>1</option>
        </select>
      </div>
      <p style="color: red">{{errors}}</p>
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
        options: {
          url: 'http://192.168.99.100/api/image',
          maxFilesize: {
            limit: 2,
            message: 'Only image smaller than 2MB accepted'
          },
          maxFiles: {
            limit: 1,
            message: 'You can only upload a max of one image'
          },
          acceptedFiles: {
            extensions: ['image/*'],
            message: 'You are uploading an invalid file'
          },
          paramName: 'images'
        },
        formData: {
          name: '',
          description: '',
          price: 0,
          quantity: 1,
          image_url: '',
          category_id: 1
        }
      }
    },
    methods: {
      complete (file, status, xhr) {
        this.formData.image_url = xhr.response
      },
      submit () {
        console.log(JSON.stringify(this.formData))
        this.$http.post('/products/' + this.$store.state.userInfo.address, this.formData)
          .then(function (res) {
            // console.log(JSON.stringify(res))
            alert('New product uploaded!')
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