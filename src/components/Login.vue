<template>
  <div class="login container">
    <form class="row g-2 w-75 mx-auto shadow p-3 rounded">
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
        />
        <label for="password" class="ps-4"> Enter Password</label>
      </div>
      <div class="form-floating mb-3">
        <select class="form-select" id="acccount" v-model="account">
          <option value="banker" selected> Banker</option>
          <option value="customer"> Customer</option>
        </select>
        <label for="account">Select Account Type</label>
      </div>
      <button type="submit" class="btn btn-block btn-outline-dark">
        LOGIN
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      account: "",
    };
  },
  methods: {
    submitForm(value) {
      console.log(value);
    },
  },
};
</script>

<style></style>
