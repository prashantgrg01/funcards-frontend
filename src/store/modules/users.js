import axios from "axios";

export default {
  state: {
    accessToken: null,
    currentUser: null
  },
  mutations: {
    SET_ACCESS_TOKEN(state, token) {
      state.accessToken = token;
    },
    SET_CURRENT_USER(state, user) {
      state.currentUser = user;
    }
  },
  actions: {
    async signupUser(context, user) {
      const response = await axios.post("users/signup", user);
      return context.dispatch("authenticateUser", response.data.accessToken);
    },
    async loginUser(context, credentials) {
      const response = await axios.post("/users/login", credentials);
      return context.dispatch("authenticateUser", response.data.accessToken);
    },
    async authenticateUser(context, accessToken) {
      // If an accessToken exists, commit the accessToken to our state
      if (accessToken) {
        context.commit("SET_ACCESS_TOKEN", accessToken);
      }

      // If an accessToken doesn't exist in our state, don't run the remaining code
      if (!context.state.accessToken) {
        return;
      }

      try {
        // Validate the accessToken and retrieve the user details from the backend
        const response = await axios.get("/users/me");
        context.commit("SET_CURRENT_USER", response.data);
      } catch(err) {
        // If there are any errors, log the appropriate error message to the console
        if (err.response) {
          console.log(err.response.data)
        } else {
          console.log(err.message);
        }
        // Reset the access token and current user
        context.commit("SET_ACCESS_TOKEN", null);
        context.commit("SET_CURRENT_USER", null);
      }
    },
    async logoutUser(context) {
      return axios.post("/users/logout").then(() => {
        // Reset the access token and current user
        context.commit("SET_ACCESS_TOKEN", null);
        context.commit("SET_CURRENT_USER", null);
      });
    }
  },
  getters: {
    userAuthenticated(state) {
      return state.accessToken && state.currentUser;
    },
    currentUser(state) {
      return state.currentUser;
    }
  }
}