<template>
  <div style="padding: 20px 300px">
    <h4>Logging in....</h4>
    <h5>If you are not able to login, please check you metamask and refresh.</h5>
  </div>
</template>

<script>
  export default {
    name: 'register',
    mounted () {
      this.getAddr()
    },
    methods: {
      async getAddr () {
        let addrRes = await window.web3.eth.getAccounts()
        if (addrRes[0]) {
          try {
            var res = await this.$http.get('/user/' + addrRes[0])
            this.$store.commit('UPDATE_USER_INFO', res.data)
            this.$router.push('/')
          } catch (e) {
            if (e.response.data.errors === 'user_not_found') {
              this.$router.push('/register/' + addrRes[0])
            }
          }
        }
      }
    }
  }
</script>

<style scoped>
</style>