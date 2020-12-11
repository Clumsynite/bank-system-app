<template>
  <div class="signup container">
    <form class="row g-2 w-75 mx-auto shadow p-3 rounded">
      <h4 class="text-center mb-3 border-bottom border-dark pb-2">
        Create New Account
      </h4>
      <div class="form-floating mb-3">
        <input
          type="text"
          class="form-control ps-3"
          id="fullname"
          placeholder="Ex. Rishabh Pathak"
          name="fullname"
          v-model="fullname"
        />
        <label for="fullname" class="ps-4"> Enter your Fullname</label>
      </div>
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
        Signup
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: "Signup",
  data() {
    return {
      fullname: "",
      username: "",
      password: "",
      account: "",
    };
  },
};
</script>

<style></style>
