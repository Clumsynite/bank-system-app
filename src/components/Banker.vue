<template>
  <div class="profile container">
    <div class="card text-dark mx-auto bg-light mb-3 w-75 shadow rounded">
      <div class="card-header text-center">Your Details</div>
      <div class="card-body">
        <div class="row">
          <p class="card-text col">Name: {{ user.name }}</p>
          <p class="card-text col">Joined: {{ date }}</p>
        </div>
        <p class="card-text">username: {{ user.username }}</p>
        <p class="card-text">Account type: {{ user.account }}</p>
      </div>
    </div>
    <transition
      name="slide-in"
      enter-active-class="animate__animated animate__slideInUp"
      leave-active-class="animate__animated animate__slideOutDown"
      id="transaction_table"
    >
      <div class="shadow rounded" v-if="users.length > 0">
        <h4 class="border-bottom border-dark text-center my-3 p-2">
          All Customers
        </h4>
        <vue-good-table
          :columns="columns"
          :rows="users"
          class="shadow"
          max-height="300px"
          :fixed-header="true"
          :line-numbers="true"
          @on-row-click="onRowClick"
        />
      </div>
    </transition>
  </div>
</template>

<script>
import { allCustomers } from "../api";
import { fromNow } from "../helper";
import { VueGoodTable } from "vue-good-table";
export default {
  name: "Banker",
  components: {
    VueGoodTable,
  },
  data() {
    return {
      user: JSON.parse(localStorage.user),
      users: [],
      columns: [
        {
          label: "User ID",
          field: "user_id",
          type: "number",
        },
        {
          label: "Full Name",
          field: "name",
        },
        {
          label: "Username",
          field: "username",
        },
        {
          label: "Joined",
          field: "joined",
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
    this.getallCustomers();
  },
  methods: {
    async getallCustomers() {
      try {
        const data = await allCustomers(localStorage.token);
        data.forEach((row) => {
          row.joined = fromNow(row.joined);
          row.password = "***";
        });
        this.users = data;
      } catch (error) {
        console.error(error);
      }
    },
    onRowClick(params) {
      console.log(params);
    },
  },
};
</script>

<style></style>
