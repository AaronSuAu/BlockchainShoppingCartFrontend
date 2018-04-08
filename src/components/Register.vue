<template>
  <div style="padding: 20px 300px">
    <h3>Please Register Your Details</h3><br>
    <form>
      <p v-for="error in errors" class="error-msg">
        {{error}}
      </p>
      <div class="form-group">
        <label for="name">User Name</label>
        <input type="text" class="form-control" id="name" placeholder="Enter your user Name" v-model.trim="formData.name">
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="text" class="form-control" id="email" placeholder="Enter Email Address" v-model.trim="formData.email">
      </div>
      <button type="submit" class="btn btn-primary" @click="register">Submit</button>
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
          address: this.$route.params.addr
        },
        errors: []
      }
    },
    methods: {
      async register () {
        try {
          let res = await this.$http.post('/user', this.formData)
          this.$store.commit('UPDATE_USER_INFO', res.data)
          console.log(this.$store.state.userInfo)
          this.$router.push('/')
        } catch (e) {
          this.errors = e.response.data.errors
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>