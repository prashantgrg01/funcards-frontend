<template>
  <section>
    <div class="actions-area">
      <AddCardForm v-if="userAuthenticated" />
    </div>
    <CardList />
  </section>
</template>

<script>
import AddCardForm from "../components/AddCardForm";
import CardList from "../components/CardList";
import { mapGetters } from "vuex";

export default {
  name: 'Home',
  components: {
    AddCardForm,
    CardList
  },
  computed: {
    ...mapGetters(["userAuthenticated"])
  }
}
</script>

<style scoped>

</style>
