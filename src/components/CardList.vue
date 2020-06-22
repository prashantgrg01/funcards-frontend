<template>
  <section class="card-list d-flex justify-content-center flex-wrap">
    <h4 v-if="getAllCards.length == 0">No cards to show at the moment!</h4>
    <Card v-for="card in getAllCards" v-bind:card="card" v-bind:key="card._id" />
  </section>
</template>

<script>
import Card from "./Card";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "CardList",
  components: {
    Card
  },
  computed: {
    ...mapGetters(["getAllCards"])
  },
  methods: {
    ...mapActions(["fetchCards"])
  },
  created() {
    this.fetchCards();
  }
}
</script>

<style scoped>

</style>