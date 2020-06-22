<template>
  <header class="app-header">
    <h1 class="app-title">FunCards</h1>
    <p class="app-tagline">a great way of learning WordPress functions using cards</p>
    <nav class="main-navigation d-flex justify-content-center align-items-center">
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
      <router-link to="/login">Login</router-link>
    </nav>
  </header>
</template>

<script>
export default {
  name: "Header"
}
</script>

<style scoped>
.app-header {
  border-bottom: 10px solid palevioletred;
  padding: 2rem 0 1.75rem 0;
}
.app-title {
  font-size: 64px;
  text-align: center;
  margin-bottom: 0.25rem;
}
.app-tagline {
  font-size: 1.1rem;
  text-align: center;
  font-style: italic;
}
.main-navigation a {
  display: inline-block;
  padding: 0rem 1rem;
  border-right: 1px solid #333;
}
.main-navigation a:last-child {
  border: none;
}
</style>
