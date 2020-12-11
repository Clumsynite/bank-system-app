<template>
  <div class="login container">
    <form
      class="row g-2 w-75 mx-auto shadow p-3 rounded"
      v-on:submit="formSubmit"
    >
      <h4 class="text-center mb-3 border-bottom border-dark pb-2">
        Login Page
      </h4>
      <div class="col-md-6 form-floating mb-3">
        <input
          type="text"
          class="form-control ps-3"
          id="username"
          placeholder="Ex. rishabh"
          name="username"
          v-model="username"
          required
          autofocus
        />
        <label for="username" class="ps-4"> Enter username</label>
      </div>
      <div class="col-md-6 form-floating mb-3">
        <input
          type="password"
          class="form-control ps-3"
          id="password"
          placeholder="Ex. password"
          name="password"
          v-model="password"
          required
        />
        <label for="password" class="ps-4"> Enter Password</label>
      </div>
      <div class="form-floating mb-3">
        <select class="form-select" id="acccount" v-model="account" required>
          <option value="banker" selected> Banker</option>
          <option value="customer"> Customer</option>
        </select>
        <label for="account">Select Account Type</label>
      </div>
      <button type="submit" class="btn btn-block btn-outline-dark">
        <span v-if="!loading">LOGIN</span>
        <Spinner size="24" line-fg-color="#212529" v-else />
      </button>
    </form>
  </div>
</template>

<script>
import { login } from "../api";
import Spinner from "vue-simple-spinner";
export default {
  name: "Login",
  components: {
    Spinner,
  },
  data() {
    return {
      username: "",
      password: "",
      account: "",
      loading: false,
    };
  },
  methods: {
    async formSubmit(e) {
      e.preventDefault();
      try {
        this.loading = true;
        const data = await login({
          username: this.username,
          password: this.password,
          account: this.account,
        });
        this.loading = false;
        if (data.msg) {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);
          this.$vToastify.success(data.msg);
        } else if (data.err) {
          this.$vToastify.error(data.err);
        }
      } catch (error) {
        this.loading = false;
        console.error(error);
      }
    },
  },
};
</script>

<style></style>
