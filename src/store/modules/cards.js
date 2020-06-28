import axios from "axios";

export default {
  state: {
    cards: []
  },
  mutations: {
    SET_CARDS(state, cards) {
      state.cards = cards;
    }
  },
  actions: {
    // Get all the cards from the server
    fetchCards: async (context) => {
      try {
        const response = await axios.get("/cards");
        context.commit("SET_CARDS", response.data);
      } catch(err) {
        if (err.response) {
          console.log(err.response.data)
        } else {
          console.log(err.message);
        }
      }
    },
    // Get a single card using the card id from the server
    fetchSingleCard: async (context, card_id) => {
      try {
        const response = await axios.get(`/cards/${card_id}`);
        return response.data;
      } catch(err) {
        console.log(err.message);
        return null;
      }
    },
    // Post new card to the server
    postNewCard: async (context, new_card) => {
      return axios.post("/cards", new_card);
    },
    // Update a card on the server
    updateCard: async (context, updated_card) => {
      return axios.patch(`/cards/${updated_card._id}`, updated_card);
    },
    // Delete a card from the server
    deleteCard: async (context, card_id) => {
      try {
        await axios.delete(`/cards/${card_id}`);
        context.dispatch("fetchCards");
      } catch(err) {
        console.log(err.message);
      }
    }
  },
  getters: {
    getAllCards: (state) => {
      return state.cards;
    }
  }
}
