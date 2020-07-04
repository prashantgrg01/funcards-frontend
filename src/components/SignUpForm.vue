<template>
  <section class="signup-form-section" v-bind:class="signupError ? 'error-border' : ''">
    <h2 class="mb-3">Sign Up Form</h2>
    <!-- Process Status Display -->
    <div class="text-center">
      <div class="spinner-border mb-3" role="status" v-if="loading">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
    <div v-if="signupError" class="alert alert-dismissible fade show alert-danger" role="alert">
      {{ signupErrorMessage }}
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <!-- Sign Up Form -->
    <form v-on:submit.prevent="onFormSubmit">
      <input class="form-control mb-3" type="text" name="first_name" v-model="first_name" placeholder="First Name" required />
      <input class="form-control mb-3" type="text" name="last_name" v-model="last_name" placeholder="Last Name" required />
      <input class="form-control mb-3" type="email" name="email" v-model="email" placeholder="Email" required />
      <input class="form-control mb-3" type="password" name="password" v-model="password" v-on:input="validatePasswords" placeholder="Password" required />
      <input class="form-control mb-3" type="password" name="confirm_password" v-model="confirm_password" v-on:input="validatePasswords" placeholder="Confirm Password" required />
      <input type="submit" class="btn btn-pink" value="Sign Up" />
    </form>
  </section>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: 'SignUpForm',
  data: function() {
    return {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      confirm_password: "",
      loading: false,
      signupError: false,
      signupErrorMessage: null
    }
  },
  methods: {
    ...mapActions(["signupUser"]),
    validatePasswords() {
      // Show the loading spinner
      this.loading = true;
      if (this.password !== this.confirm_password) {
        // Hide the loading spinner and set the signup error fields appropriately
        this.loading = false;
        this.signupError = true;
        this.signupErrorMessage = "Passwords don't match!";
      } else {
        // Hide the loading spinner and reset the signup error fields
        this.loading = false;
        this.signupError = false;
        this.signupErrorMessage = null;
      }
    },
    onFormSubmit() {
      // Show the loading spinner
      this.loading = true;
      // Create a new user
      const newUser = { 
        first_name: this.first_name, 
        last_name: this.last_name, 
        email: this.email, 
        password: this.password 
      };
      // Sign up the new user
      this.signupUser(newUser)
      .then(() => {
        // Hide the loading spinner and reset the signup error fields
        this.loading = false;
        this.signupError = false;
        this.signupErrorMessage = null;
        // If the signup is successful, redirect the user to the dashboard
        this.$router.push({ name: "dashboard" });
      })
      .catch((err) => {
        // Hide the loading spinner and set the signup error fields appropriately
        this.loading = false;
        this.signupError = true;
        if (err.response) {
          this.signupErrorMessage = err.response.data.error;
        } else {
          this.signupErrorMessage = err.message;
        }
      });
    }
  }
}
</script>

<style scoped>
.signup-form-section {
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
