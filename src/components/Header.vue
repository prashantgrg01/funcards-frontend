<template>
  <header class="app-header">
    <h1 class="app-title">FunCards</h1>
    <p class="app-tagline">a great way of learning WordPress functions using cards</p>
    <Navigation />
  </header>
</template>

<script>
import Navigation from "./Navigation";

export default {
  name: "Header",
  components: {
    Navigation
  }
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
</style>
