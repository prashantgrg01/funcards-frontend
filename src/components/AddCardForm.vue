<template>
  <section class="add-card-section">
    <button class="btn btn-pink" v-on:click="toggleFormState">{{ isFormOpen ? "Close Form" : "Add New Card" }}</button>
    <section class="add-new-card-section" v-bind:class="{open: isFormOpen}">
      <!-- Process Status Display -->
      <div class="spinner-border mb-3" role="status" v-if="loading">
        <span class="sr-only">Loading...</span>
      </div>
      <div v-if="newPostStatus" class="alert alert-dismissible fade show" v-bind:class="newPostStatus == 'success' ? 'alert-success' : 'alert-danger'" role="alert">
        {{ newPostStatusMessage }}
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <!-- New Card Post Form  -->
      <form method="POST" action="#" v-on:submit="onFormSubmit">
        <input class="form-control mb-3" type="text" name="title" v-model="title" placeholder="New Card Title" required />
        <input class="form-control mb-3" type="text" name="function_name" v-model="function_name" placeholder="Function Name" required />
        <textarea class="form-control mb-3" name="description" v-model="description" placeholder="Function Description" required>
        </textarea>
        <input class="form-control mb-3" type="text" name="parameters" v-model="parameters" placeholder="Parameters" required />
        <textarea class="form-control mb-3" name="example_code" v-model="example_code" placeholder="Example Code" required>
        </textarea>
        <div class="add-new-card-btns">
          <input type="submit" class="btn btn-pink" value="Add Card" />
          <input type="reset" class="btn btn-secondary" value="Reset" v-on:click="resetFormFields" />
        </div>
      </form>
    </section>
  </section>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "AddCardForm",
  data: function() {
    return {
      isFormOpen: false,
      title: "",
      function_name: "",
      description: "",
      parameters: "",
      example_code: "",
      loading: false,
      newPostStatus: null,
      newPostStatusMessage: ""
    }
  },
  methods: {
    ...mapActions(["fetchCards", "postNewCard"]),
    // Toggles the form state
    toggleFormState: function() {
      this.isFormOpen = !this.isFormOpen;
    },
    // Resets the form fields
    resetFormFields: function() {
      this.title = "";
      this.function_name = "";
      this.description = "";
      this.parameters = "";
      this.example_code = "";
    },
    // Handles the submission of the new card form
    onFormSubmit: async function(e) {
      e.preventDefault();
      // Show the spinner
      this.loading = true;
      // Create a new card object
      const new_card = {
        title: this.title, 
        function_name: this.function_name, 
        description: this.description, 
        parameters: this.parameters.includes(",") ? this.parameters.split(",").map(param => param.trim()) : [this.parameters], 
        example_code: this.example_code
      };
      // Post the new card to the server
      await this.postNewCard(new_card)
      .then( () => {
        // Hide the spinner, update the success message and new post status then re-fetch all the cards
        this.loading = false;
        this.newPostStatusMessage = "Success! New card posted.";
        this.newPostStatus = 'success';
        this.fetchCards();
        // Reset the form fields
        this.resetFormFields();
      })
      .catch(err => {
        // Hide the spinner, update the success message and new post status
        this.loading = false;
        this.newPostStatusMessage = `${err.message}! Please try again.`;
        this.newPostStatus = 'fail';
      });
    }
  }
}
</script>

<style scoped>
.add-new-card-section {
  padding: 1.5rem;
  border: 1px solid #ddd;
  max-width: 600px;
  margin: 1.5rem auto 0 auto;
  height: 0;
  display: none;
  transition: all 0.3s ease-in-out;
}
.add-new-card-section.open {
  height: auto;
  display: block;
}
.add-new-card-btns .btn:first-child {
  margin-right: 0.5rem;
}
.form-control:focus {
  border-color: palevioletred;
  box-shadow: 0 0 0 0.1rem lightpink;
}
</style>