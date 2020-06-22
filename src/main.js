import Vue from 'vue';
import App from './App.vue';
import store from "./store/index";
import router from "./routes";

Vue.config.productionTip = false;
Vue.config.ignoredElements = [/^ion-/];

new Vue({
  store: store,
  router: router,
  render: h => h(App),
}).$mount('#app');
