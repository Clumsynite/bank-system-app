<template>
  <div class="profile container">
    <div class="card text-dark mx-auto bg-light mb-3 w-75 shadow rounded mb-4">
      <div class="card-header text-center">Your Details</div>
      <div class="card-body">
        <div class="row">
          <p class="card-text col">Name: {{ user.name }}</p>
          <p class="card-text col">Joined: {{ date }}</p>
        </div>
        <div class="row">
          <p class="card-text col">username: {{ user.username }}</p>
          <p class="card-text col">UserID: {{ user.user_id }}</p>
        </div>
        <p class="card-text">Account type: {{ user.account }}</p>
      </div>
    </div>
    <transition
      name="slide-in"
      enter-active-class="animate__animated animate__slideInUp"
      leave-active-class="animate__animated animate__slideOutDown"
      id="transaction_table"
    >
      <vue-good-table
        :columns="columns"
        :rows="transactions"
        v-if="transactions.length > 0"
        class="shadow"
        max-height="300px"
        :fixed-header="true"
        :line-numbers="true"
      />
    </transition>
  </div>
</template>

<script>
import { fromNow } from "../helper";
import { userTransactions } from "../api";
import { VueGoodTable } from "vue-good-table";
export default {
  name: "Customer",
  components: {
    VueGoodTable,
  },
  data() {
    return {
      user: JSON.parse(localStorage.user),
      transactions: "",
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
  computed: {
    date: function() {
      return fromNow(this.user.joined);
    },
  },
  mounted: function() {
    this.getTransactions();
  },
  methods: {
    async getTransactions() {
      try {
        const data = await userTransactions(
          this.user.username,
          localStorage.token
        );
        this.transactions = data;
        data.forEach((row) => {
          row.transaction_time = fromNow(row.transaction_time);
        });
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style></style>
