import Vue from "vue";
import VueRouter from "vue-router";
import store from "./store/index";

import Home from "./views/Home";
import About from "./views/About";
import EditCard from "./views/EditCard";
import Login from "./views/Login";
import SignUp from "./views/SignUp";
import Dashboard from "./views/Dashboard";
import Page404 from "./views/Page404";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes: [
    { 
      path: "/", 
      name: "home", 
      component: Home
    },
    { 
      path: "/about", 
      name: "about", 
      component: About
    },
    { 
      path: "/edit-card/:id", 
      name: "editcard", 
      component: EditCard, 
      beforeEnter: checkUserAuthentication
    },
    { 
      path: "/signup", 
      name: "signup", 
      component: SignUp 
    },
    { 
      path: "/login", 
      name: "login", 
      component: Login, 
      beforeEnter: (to, from, next) => {
        // If the current user is authenticated, redirect them to the Dashboard page
        if (store.getters.userAuthenticated) {
          return next({ name: "dashboard" });
        }
        // Else let them go to the Login page
        next();
      }
    },
    { 
      path: "/dashboard", 
      name: "dashboard", 
      component: Dashboard, 
      beforeEnter: checkUserAuthentication
    },
    { 
      path: "*", 
      name: "page404", 
      component: Page404
    }
  ]
});

// Middleware to guard routes that require authentication
function checkUserAuthentication(to, from, next) {
  // If the current user is not authenticated, redirect them to the login route
  if (!store.getters.userAuthenticated) {
    return next({ name: "login" });
  }
  // Else let them go to the next route
  next();
}

export default router;