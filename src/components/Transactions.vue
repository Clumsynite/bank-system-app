<template>
  <div class="container">
    <h1 class="text-center">{{ username }}'s Transactions</h1>
    <div>
      <Spinner
        size="200"
        line-fg-color="black"
        line-bg-color="white"
        v-if="loading"
        class="my-3"
      />
      <transition
        name="slide-in"
        enter-active-class="animate__animated animate__fadeIn"
        leave-active-class="animate__animated animate__fadeOut"
        id="transaction_table"
      >
        <vue-good-table
          :columns="columns"
          :rows="transactions"
          class="shadow"
          :fixed-header="true"
          :line-numbers="true"
          max-height="600px"
          v-if="transactions.length > 0 && !loading"
        />
      </transition>
    </div>
    <div class="w-100 text-start">
      <router-link to="/banker" class="text-right my-5 nav-link link-dark">
        <span class="iconify" data-icon="bi:arrow-left"></span>
        Back to Profile
      </router-link>
    </div>
  </div>
</template>

<script>
import Spinner from "vue-simple-spinner";
import { VueGoodTable } from "vue-good-table";
import { userTransactions } from "../api";
import { fromNow } from "../helper";
export default {
  name: "Transactions",
  components: {
    Spinner,
    VueGoodTable,
  },
  data() {
    return {
      username: this.$route.params.username,
      loading: false,
      transactions: [],
      columns: [
        {
          label: "Transaction ID",
          field: "transaction_id",
          type: "number",
        },
        {
          label: "Cash Deposited",
          field: "cash_deposited",
          type: "number",
        },
        {
          label: "Cash Withdrawn",
          field: "cash_withdrawn",
          type: "number",
        },
        {
          label: "Total",
          field: "total",
          type: "number",
        },
        {
          label: "Time",
          field: "transaction_time",
        },
      ],
    };
  },
  mounted: function() {
    this.getUserTransactions();
  },
  methods: {
    async getUserTransactions() {
      try {
        this.loading = true;
        const data = await userTransactions(this.username, localStorage.token);
        data.forEach((row) => {
          row.transaction_time = fromNow(row.transaction_time);
        });
        this.transactions = data;
        this.loading = false;
      } catch (error) {
        this.loading = false;
        console.error(error);
      }
    },
  },
};
</script>

<style></style>
