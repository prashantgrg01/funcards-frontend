import Vue from "vue";
import Vuex from "vuex";
import cards from "./modules/cards";
import users from "./modules/users";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    cards,
    users
  }
});

export default store;