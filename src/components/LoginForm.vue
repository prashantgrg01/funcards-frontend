<template>
  <section class="login-form-section" v-bind:class="loginError ? 'error-border' : ''">
    <h2 class="mb-3">Login Form</h2>
    <!-- Process Status Display -->
    <div class="text-center">
      <div class="spinner-border mb-3" role="status" v-if="loading">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
    <div v-if="loginError" class="alert alert-dismissible fade show alert-danger" role="alert">
      {{ loginErrorMessage }}
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <!-- Login Form -->
    <form v-on:submit.prevent="onFormSubmit">
      <input class="form-control mb-3" type="email" name="email" v-model="email" placeholder="Email" required />
      <input class="form-control mb-3" type="password" name="password" v-model="password" placeholder="Password" required />
      <input type="submit" class="btn btn-pink" value="Login" />
    </form>
  </section>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "LoginForm",
  data: function() {
    return {
      email: "",
      password: "",
      loading: false,
      loginError: false,
      loginErrorMessage: null
    }
  },
  methods: {
    ...mapActions(["loginUser"]),
    onFormSubmit() {
      // Show the loading spinner
      this.loading = true;
      // Login the user
      this.loginUser({ email: this.email, password: this.password })
      .then(() => {
        // Hide the loading spinner and reset the login error fields
        this.loading = false;
        this.loadingError = false;
        this.loginErrorMessage = null;
        // If the login is successful, redirect the user to the dashboard
        this.$router.push({ name: "dashboard" });
      })
      .catch((err) => {
        // Hide the loading spinner and set the login error fields appropriately
        this.loading = false;
        this.loginError = true;
        this.loginErrorMessage = err.message;
      });
    }
  }
}
</script>

<style scoped>
.login-form-section {
  padding: 1.5rem;
  border: 1px solid #ddd;
  max-width: 500px;
  margin: 2rem auto 0 auto;
  transition: all 0.3s ease-in-out;
}
.error-border {
  border: 1px solid var(--red);
}
.form-control:focus {
  border-color: palevioletred;
  box-shadow: 0 0 0 0.1rem lightpink;
}
</style>