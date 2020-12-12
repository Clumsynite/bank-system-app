<template>
  <div class="transact container">
    <h3 class="text-center mb-3">
      <span v-if="!totalLoading"> Total Balance: {{ total }}</span>
      <Spinner size="28" line-fg-color="#357EDD" line-bg-color="azure" v-else />
    </h3>
    <div class="card shadow-sm 2-75 p-4 mb-4">
      <div class="form-floating mb-3">
        <input
          type="number"
          class="form-control"
          placeholder="Ex. 100"
          id="amount"
          v-model="amount"
        />
        <label for="amount">Enter Amount</label>
      </div>
      <div class="d-flex justify-content-between flex-wrap">
        <button class="btn btn-outline-success" @click="handleDeposit">
          <span v-if="!depositLoading">Deposit</span>
          <Spinner size="24" line-fg-color="#198754" v-else />
        </button>
        <button class="btn btn-outline-danger" @click="handleWithdraw">
          <span v-if="!withdrawLoading">Withdraw</span>
          <Spinner size="24" line-fg-color="#DC3545" v-else />
        </button>
      </div>
    </div>
    <transition
      name="slide-in"
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut"
      id="transaction_table"
    >
      <div class="shadow px-3 pb-0 rounded" v-if="transaction.user_id">
        <h3 class="text-center text-dark border-bottom border-secondary my-3">Last Transaction</h3>
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">User ID</th>
                <th scope="col">Transaction ID</th>
                <th scope="col">Cash Deposited</th>
                <th scope="col">Cash Withdrawn</th>
                <th scope="col">Total</th>
                <th scope="col">Time</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{{ transaction.user_id }}</td>
                <td>{{ transaction.transaction_id }}</td>
                <td>{{ transaction.cash_deposited }}</td>
                <td>{{ transaction.cash_withdrawn }}</td>
                <td>{{ total }}</td>
                <td>{{ transaction_time }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { userBalance, withdraw, deposit } from "../api";
import { fromNow } from "../helper";
import Spinner from "vue-simple-spinner";
export default {
  name: "Transact",
  components: {
    Spinner,
  },
  data() {
    return {
      amount: null,
      total: 0,
      userId: JSON.parse(localStorage.user).user_id,
      transaction_time: null,
      withdrawLoading: false,
      depositLoading: false,
      totalLoading: false,
      transaction: [],
    };
  },
  mounted: function() {
    this.getTotal();
  },
  methods: {
    async getTotal() {
      try {
        this.totalLoading = true;
        this.amount = null;
        const data = await userBalance(this.userId, localStorage.token);
        this.totalLoading = false;
        this.total = data.balance;
        this.transaction = data.latest;
        this.transaction_time = fromNow(data.latest.transaction_time);
      } catch (error) {
        this.totalLoading = false;
        console.error(error);
      }
    },
    async handleWithdraw() {
      try {
        if (this.amount === 0 || this.amount === null) {
          return this.$vToastify.error("Amount can't be empty");
        }
        this.withdrawLoading = true;
        if (this.amount > this.total) {
          this.withdrawLoading = false;
          this.$vToastify.error("No sufficient fund");
        } else {
          const data = await withdraw(
            { amount: this.amount },
            localStorage.token
          );
          this.withdrawLoading = false;
          if (data.msg) {
            this.getTotal();
            this.$vToastify.success(data.msg);
          } else if (data.err) {
            this.$vToastify.error(data.err);
          }
        }
      } catch (error) {
        this.withdrawLoading = false;
        console.error(error);
      }
    },
    async handleDeposit() {
      try {
        if (this.amount === 0 || this.amount === null) {
          return this.$vToastify.error("Amount can't be empty");
        }
        this.depositLoading = true;
        const data = await deposit({ amount: this.amount }, localStorage.token);
        this.depositLoading = false;
        if (data.msg) {
          this.getTotal();
          this.$vToastify.success(data.msg);
        } else if (data.err) {
          this.$vToastify.error(data.err);
        }
      } catch (error) {
        this.depositLoading = false;
        console.error(error);
      }
    },
  },
};
</script>

<style></style>
