import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import VueToastify from "vue-toastify";

import "vue-good-table/dist/vue-good-table.css";

Vue.use(VueToastify, {
  position: "top-right",
  theme: "light",
  draggable: true,
});
Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
