<template>
  <section class="edit-card-section">
    <h2 class="mb-3">Edit Card</h2>
    <!-- Process Status Display -->
    <div class="text-center">
      <div class="spinner-border mb-3" role="status" v-if="loading">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
    <div v-if="updateCardStatus" class="alert alert-dismissible fade show" v-bind:class="updateCardStatus == 'success' ? 'alert-success' : 'alert-danger'" role="alert">
      {{ updateCardStatusMessage }}
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <!-- Edit Card Form -->
    <form method="POST" action="#" v-on:submit="onFormSubmit">
      <input class="form-control mb-3" type="text" name="title" v-model="title" placeholder="New Card Title" required />
      <input class="form-control mb-3" type="text" name="function_name" v-model="function_name" placeholder="Function Name" required />
      <textarea class="form-control mb-3" name="description" v-model="description" placeholder="Function Description" required>
      </textarea>
      <input class="form-control mb-3" type="text" name="parameters" v-model="parameters" placeholder="Parameters" required />
      <textarea class="form-control mb-3" name="example_code" v-model="example_code" placeholder="Example Code" required>
      </textarea>
      <div class="text-center">
        <input type="submit" class="btn btn-pink" value="Update Card" />
      </div>
    </form>
  </section>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "EditCardForm",
  props: ["card_id"],
  data: function() {
    return {
      title: "",
      function_name: "",
      description: "",
      parameters: "",
      example_code: "",
      loading: false,
      updateCardStatus: null,
      updateCardStatusMessage: ""
    }
  },
  created: async function() {
    // Display the loading status
    this.loading = true;
    const card = await this.fetchSingleCard(this.$route.params.id);
    if (!card) {
      // Hide the spinner and update the status and status message
      this.loading = false;
      this.updateCardStatus = "fail";
      this.updateCardStatusMessage = "Error loading the data from the server!";
    } else {
      // Hide the spinner and reset the status and status message
      this.loading = false;
      this.updateCardStatus = null;
      this.updateCardStatusMessage = "";
      // Update the form fields with the respective card values
      this.title = card.title;
      this.function_name = card.function_name;
      this.description = card.description;
      this.parameters = card.parameters.join(",");
      this.example_code = card.example_code;
    }
  },
  methods: {
    ...mapActions(["fetchSingleCard", "updateCard"]),
    onFormSubmit: async function(e) {
      e.preventDefault();
      // Show the spinner
      this.loading = true;
      // Create the updated card object
      const updated_card = {
        _id: this.$route.params.id,
        title: this.title, 
        function_name: this.function_name, 
        description: this.description, 
        parameters: this.parameters.includes(",") ? this.parameters.split(",").map(param => param.trim()) : [this.parameters], 
        example_code: this.example_code
      };
      // Post the updated card to the server
      await this.updateCard(updated_card)
      .then(() => {
        // Hide the spinner and update the status and status message for successfully updating the card
        this.loading = false;
        this.updateCardStatusMessage = "Success! Card updated.";
        this.updateCardStatus = 'success';
      })
      .catch(err => {
        // Hide the spinner and update the status and status message for failing to update the card
        this.loading = false;
        this.updateCardStatusMessage = `${err.message}! Please try again.`;
        this.updateCardStatus = 'fail';
      });
    }
  }
}
</script>

<style scoped>
.edit-card-section {
  padding: 1.5rem;
  border: 1px solid #ddd;
  max-width: 600px;
  margin: 2rem auto 0 auto;
  transition: all 0.3s ease-in-out;
}
.edit-card-section textarea.form-control {
  min-height: 80px;
}
.form-control:focus {
  border-color: palevioletred;
  box-shadow: 0 0 0 0.1rem lightpink;
}
</style>