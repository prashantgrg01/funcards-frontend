<template>
  <div id="app">
    <main class="container">
      <Header />
      <router-view></router-view>
      <Footer />
    </main>
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";

export default {
  name: 'App',
  components: {
    Header,
    Footer
  }
}
</script>

<style>
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
:root {
  font-size: 16px;
  color: #333;
}
body {
  font-family: 'Calibri', sans-serif;
  line-height: 1.4;
}
.simplebar-scrollbar::before {
  background-color: pink;
}

/* General Style */
a {
  text-decoration: none;
  color: palevioletred
}
a:hover, a:active {
  text-decoration: none;
  color: #e83e8c;
}
.btn-pink {
  background-color: palevioletred;
  color: #fff;
  transition: all 0.3s ease-in-out;
}
.btn-pink.focus, .btn-pink:focus {
  box-shadow: 0 0 0 0.2rem palevioletred;
}
.btn-pink:hover, .btn-pink:active {
  background-color: #e83e8c;
  color: #fff;
}

/* Application Action Area Style */
.actions-area {
  margin: 2rem 0;
  text-align: center;
}
</style>
