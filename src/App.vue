<template>
  <div id="app">
    <nav
      id="nav"
      class="navbar navbar-expand-lg navbar-light shadow-sm mb-4 container-fluid"
    >
      <a class="navbar-brand" href="/">Bank Services</a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarContent"
        aria-controls="navbarContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link to="/" class="nav-link" active-class="active"
              >Home</router-link
            >
          </li>
          <li class="nav-item" v-if="token === null">
            <router-link to="/login" class="nav-link" active-class="active"
              >Login</router-link
            >
          </li>
          <li class="nav-item" v-if="token === null">
            <router-link to="/signup" class="nav-link" active-class="active"
              >Create New Account</router-link
            >
          </li>
          <li
            class="nav-item"
            v-if="token !== null && user.account === 'banker'"
          >
            <router-link to="/banker" class="nav-link" active-class="active"
              >Banker Profile</router-link
            >
          </li>
          <li
            class="nav-item"
            v-if="token !== null && user.account === 'customer'"
          >
            <router-link to="/customer" class="nav-link" active-class="active"
              >Customer Profile</router-link
            >
          </li>
          <li
            class="nav-item"
            v-if="token !== null && user.account === 'customer'"
          >
            <router-link
              to="/transact"
              class="nav-link"
              active-class="active"
              >Transact</router-link
            >
          </li>
        </ul>
        <ul class="navbar-nav ms-auto">
          <li v-if="token !== null">
            <button class="btn btn-outline-dark" @click="handleLogout">
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script>
import { logout } from "./api";
export default {
  name: "APP",
  data() {
    return {
      token: "",
      user: "",
    };
  },
  mounted() {
    if (localStorage.token) {
      this.token = localStorage.token;
    }
    if (localStorage.user) {
      this.user = JSON.parse(localStorage.user);
    }
  },
  watch: {
    token(newToken) {
      localStorage.token = newToken;
    },
    user(newUser) {
      localStorage.user = JSON.stringify(newUser);
    },
  },
  methods: {
    async handleLogout() {
      try {
        const data = await logout();
        console.log(data);
        localStorage.clear();
        this.$vToastify.success(data);
        this.$router.push("/login");
        this.token = localStorage.getItem("token");
        this.user = JSON.parse(localStorage.getItem("user"));
      } catch (error) {
        this.$vToastify.error("Logout Failed");
        console.error(error);
      }
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
