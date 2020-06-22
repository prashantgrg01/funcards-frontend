<template>
  <article class="function-card">
    <div class="function-card-inner">
      <div class="function-card-front">
        <h3 class="card-title">{{ card.title }}</h3>
      </div>
      <div class="function-card-back" data-simplebar>
        <h4 class="card-subtitle">Function:</h4>
        <code class="card-codes">{{ card.function_name }}</code>
        <h4 class="card-subtitle">Description:</h4>
        <p class="card-desc">{{ card.description }}</p>
        <h4 class="card-subtitle">Parameters:</h4>
        <ul class="card-params-list">
          <li v-for="(param, index) in card.parameters" v-bind:key="index">{{ param }}</li>
        </ul>
        <h4 class="card-subtitle">Example Code:</h4>
        <code class="card-codes">{{ card.example_code }}</code>
        <div class="card-actions">
          <a v-bind:href="editLink"><ion-icon name="create"></ion-icon></a> | 
          <a href="#" v-on:click="deleteCard(card._id)"><ion-icon name="trash"></ion-icon></a>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Card",
  components: {
  },
  props: ["card"],
  data: function () {
    return {
      editLink: "/edit-card/"+this.card._id
    }
  },
  methods: {
    ...mapActions(["deleteCard"])
  }
}
</script>

<style scoped>
.function-card {
  width: 350px;
  height: 350px;
  perspective: 1000px;
  margin: 1rem 0;
}
@media screen and (min-width: 768px) {
  .function-card {
    margin: 1rem;
  }
}
.function-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transition: all 0.6s;
  transform-style: preserve-3d;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  border-radius: 5px;
  cursor: pointer;
  -webkit-animation: card-load-anim 0.6s ease-in-out;
  animation: card-load-anim 0.6s ease-in-out;
}
@-webkit-keyframes card-load-anim {
  0% { transform: rotateY(180deg); }
  100% {transform: rotateY(0deg); }
}
@keyframes card-load-anim {
  0% { transform: rotateY(180deg); }
  100% {transform: rotateY(0deg); }
}
.function-card:hover .function-card-inner {
  transform: rotateY(180deg);
}
.function-card:hover .function-card-inner .function-card-front {
  opacity: 0;
}
.function-card:hover .function-card-inner .function-card-back {
  opacity: 1;
}
.function-card-front, .function-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 1.25rem;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  border-radius: 5px;
  transition: all 0.6s ease-in-out;
}
.function-card-front {
  background-color: #f3f3f3;
  border: 1px solid #eee;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 1;
}
.function-card-back {
  background-color: palevioletred;
  color: #fff;
  transform: rotateY(180deg);
  opacity: 0;
}
.function-card-front .card-title {
  color: palevioletred;
  font-size: 2rem;
  font-weight: 600;
  text-transform: capitalize;
  text-align: center;
  padding: 1rem;
}
.function-card-back .card-subtitle {
  font-size: 1.15rem;
  font-weight: 600;
  margin: 1rem 0 0.35rem 0;
  color: papayawhip;
}
.function-card-back .card-subtitle:first-child {
  margin-top: 0.75rem;
}
.function-card-back .card-params-list {
  padding-left: 1.5rem;
}
.function-card-back .card-codes {
  font-size: 0.85rem;
  color: #333;
  background-color: #eee;
}
.function-card-back .card-actions {
  position: absolute;
  top: 15px;
  right: 20px;
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
}
.function-card-back .card-actions a {
  color: #fff;
  font-size: 1.25rem;
  vertical-align: middle;
}
</style>