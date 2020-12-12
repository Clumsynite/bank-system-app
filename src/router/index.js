import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
import Login from "@/components/Login.vue";
import Signup from "@/components/Signup.vue";
import Customer from "../components/Customer.vue";
import Banker from "../components/Banker.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/signup",
    name: "signup",
    component: Signup,
    meta: {
      guest: true,
    },
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      guest: true,
    },
  },
  {
    path: "/banker",
    name: "banker",
    component: Banker,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/customer",
    name: "customer",
    component: Customer,
    meta: {
      requiresAuth: true,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (token === null) {
      next({
        path: "/login",
        params: { nextUrl: to.fullPath },
      });
    } else {
      if (to.name !== "banker" && user.account === "banker") {
        next({ name: "banker" });
      } else if (to.name !== "customer" && user.account === "customer") {
        next({ name: "customer" });
      } else {
        next();
      }
    }
  } else if (to.matched.some((record) => record.meta.guest)) {
    if (token === null) {
      next();
    }
  } else {
    next();
  }
});

export default router;
