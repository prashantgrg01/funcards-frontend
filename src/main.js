import Vue from 'vue';
import App from './App.vue';
import store from "./store/index";
import router from "./routes";
import axios from "axios";

Vue.config.productionTip = false;
Vue.config.ignoredElements = [/^ion-/];

axios.defaults.baseURL = "http://localhost:5000/api/";

// Important code for user authentication
require("@/store/subscriber");
store.dispatch("authenticateUser", localStorage.getItem("token")).then(() => {
  new Vue({
    store,
    router,
    render: h => h(App),
  }).$mount('#app');
});
