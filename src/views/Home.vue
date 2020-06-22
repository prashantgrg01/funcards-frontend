<template>
  <section>
    <div class="actions-area">
      <AddCardForm />
    </div>
    <CardList />
  </section>
</template>

<script>
import AddCardForm from "../components/AddCardForm";
import CardList from "../components/CardList";

export default {
  name: 'Home',
  components: {
    AddCardForm,
    CardList
  }
}
</script>

<style scoped>

</style>
