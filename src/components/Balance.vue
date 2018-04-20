<template>
  <div class="container">
    <div class="row">
      <div class="col-md-3">
          <h3>Current Balance</h3>
      </div>
      <div class="col-md-3">
          <h3>{{balance}}</h3>
      </div>
    </div>
    <div class="row">
        <div class="col-md-3">
            <input type="text" name="amount" id="" v-model="amount">
        </div>
        <div class="col-md-3">
            <button class="btn btn-success" @click="deposit(amount)">Deposit</button>
            <button class="btn btn-danger" @click="withdraw(amount)">Withdraw</button>
        </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'balance',
  data () {
    return {
      amount: 0
    }
  },
  asyncComputed: {
    balance: {
      get () {
        return this.$getBalance()
      }
    }
  },
  methods: {
    async deposit (amount) {
      if (amount == null) {
        alert('Enter the amount you want to buy')
      }
      if (amount <= 0) {
        alert('The amount is not correct')
      }
      amount = amount * 1000
      /*
      try {
        await this.$transaction.methods.deposit(amount)
        .send({
          from: this.$store.state.userInfo.address,
          gas: 400000,
          value: window.web3.utils.toWei(amount.toString(), 'finney')
        })
        this.balance = await this.getBalance()
      } catch (error) {
        alert(error)
      }
      */
      this.$transaction.methods.deposit(amount)
      .send({
        from: this.$store.state.userInfo.address,
        gas: 400000,
        value: window.web3.utils.toWei(amount.toString(), 'finney')
      })
      .then(function (response) {
        this.$getBalance()
        .then(function (amount) {
          this.balance = amount
        }.bind(this))
      }.bind(this))
    },
    async withdraw (amount) {
      if (amount == null) {
        alert('Enter the amount you want to buy')
      }
      if (amount <= 0) {
        alert('The amount is not correct')
      }
      amount = amount * 1000
      try {
        await this.$transaction.methods.withdraw(amount)
        .send({
          from: this.$store.state.userInfo.address,
          gas: 400000
        })
        this.balance = await this.getBalance()
      } catch (error) {
        alert(error)
      }
    }
  }
}
</script>

