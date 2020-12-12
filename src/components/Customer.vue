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
  </div>
</template>

<script>
import { fromNow } from "../helper";
export default {
  name: "Customer",
  data() {
    return {
      user: JSON.parse(localStorage.user),
    };
  },
  computed: {
    date: function() {
      return fromNow(this.user.joined);
    },
  },
};
</script>

<style></style>
