<template>
  <nav class="navigation d-flex justify-content-center align-items-center">
    <router-link to="/">Home</router-link>
    <router-link to="/about">About</router-link>
    <template v-if="userAuthenticated">
      <router-link to="/dashboard">Dashboard</router-link>
      <a href="#" v-on:click.prevent="logout">Log Out</a>
    </template>
    <template v-else>
      <router-link to="/login">Login</router-link>
      <router-link to="/signup">Sign Up</router-link>
    </template>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Navigation",
  computed: {
    ...mapGetters(["userAuthenticated"])
  },
  methods: {
    ...mapActions(["logoutUser"]),
    logout() {
      this.logoutUser()
      .then(() => {
        this.$router.push({ name: "login" });
      })
      .catch(err => {
        console.log(err.message);
      });
    }
  }
}
</script>

<style scoped>
.navigation a {
  display: inline-block;
  padding: 0rem 1rem;
  border-right: 1px solid #333;
}
.navigation a:last-child {
  border: none;
}
</style>