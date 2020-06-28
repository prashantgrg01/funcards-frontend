<template>
  <section class="dashboard-section">
    <h2 class="text-center my-3">Welcome {{ currentUser ? currentUser.first_name : "" }}!</h2>
  </section>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Dashboard",
  computed: {
    ...mapGetters(["currentUser"])
  }
}
</script>

<style scoped>

</style>