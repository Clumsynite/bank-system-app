import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
import Login from "@/components/Login.vue";
import Signup from "@/components/Signup.vue";
import Customer from "../components/Customer.vue";
import Banker from "../components/Banker.vue";
import Transact from "../components/Transact.vue";
import Transactions from "../components/Transactions.vue";

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
      banker: true,
    },
  },
  {
    path: "/banker/:username/transactions",
    name: "transactions",
    component: Transactions,
    meta: {
      requiresAuth: true,
      banker: true,
    },
  },
  {
    path: "/customer",
    name: "customer",
    component: Customer,
    meta: {
      requiresAuth: true,
      customer: "true",
    },
  },
  {
    path: "/transact",
    name: "transact",
    component: Transact,
    meta: {
      requiresAuth: true,
      customer: true,
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
      if (to.matched.some((record) => record.meta.banker)) {
        if (user.account === "banker") {
          next();
        } else {
          next({ name: "Home" });
        }
      } else if (to.matched.some((record) => record.meta.customer)) {
        if (user.account === "customer") {
          next();
        } else {
          next({ name: "Home" });
        }
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
