import axios from "axios";

const state = {
  apiUrl: "http://localhost:5000/api/cards/",
  cards: []
};

const mutations = {
  SET_CARDS(state, cards) {
    state.cards = cards;
  }
};

const actions = {
  // Get all the cards from the server
  fetchCards: async (context) => {
    try {
      const response = await axios.get(context.state.apiUrl);
      context.commit("SET_CARDS", response.data);
    } catch(err) {
      console.log(err.message);
    }
  },
  // Get a single card using the card id from the server
  fetchSingleCard: async (context, card_id) => {
    try {
      const response = await axios.get(`${context.state.apiUrl}${card_id}`);
      return response.data;
    } catch(err) {
      console.log(err.message);
      return null;
    }
  },
  // Post new card to the server
  postNewCard: async (context, new_card) => {
    return axios.post(context.state.apiUrl, new_card);
  },
  // Update a card on the server
  updateCard: async (context, updated_card) => {
    return axios.patch(`${context.state.apiUrl}${updated_card._id}`, updated_card);
  },
  // Delete a card from the server
  deleteCard: async (context, card_id) => {
    try {
      await axios.delete(`${context.state.apiUrl}${card_id}`);
      context.dispatch("fetchCards");
    } catch(err) {
      console.log(err.message);
    }
  }
};

const getters = {
  getAllCards: (state) => {
    return state.cards;
  }
};

export default {
  state, 
  mutations, 
  actions, 
  getters
};
