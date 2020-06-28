import store from "@/store";
import axios from "axios";

store.subscribe((mutation) => {
  switch (mutation.type) {
    case "SET_ACCESS_TOKEN":
      if (mutation.payload) {
        // Set the default Authorization header with the payload token for all future requests
        axios.defaults.headers.common["Authorization"] = `Bearer ${mutation.payload}`;
        // Store the token in the local storage
        localStorage.setItem("token", mutation.payload);
      } else {
        // Reset the default Authorization header with the value of null
        axios.defaults.headers.common["Authorization"] = null;
        // Remove the token entry from the local storage
        localStorage.removeItem("token");
      }
      break;
  }
});