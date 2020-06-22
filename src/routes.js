import Vue from "vue";
import VueRouter from "vue-router";
import Home from "./views/Home";
import About from "./views/About";
import EditCard from "./views/EditCard";
import Login from "./views/Login";
import SignUp from "./views/SignUp";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes: [
    { path: "/", component: Home },
    { path: "/about", component: About },
    { path: "/login", component: Login },
    { path: "/signup", component: SignUp },
    { path: "/edit-card/:id", component: EditCard }
  ]
});

export default router;