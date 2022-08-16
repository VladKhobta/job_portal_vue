import { createStore } from "vuex";

export default createStore({
  state: {
    user: {
      id: "",
      email: "",
    },
    isAuthenticated: false,
    token: "",
  },
  mutations: {
    initializeStore(state) {
      if (localStorage.getItem("token")) {
        state.token = localStorage.getItem("token");
        state.isAuthenticated = true;
      } else {
        state.token = "";
        state.isAuthenticated = false;
      }
    },

    setToken(state, token) {
      state.token = token;
      state.isAuthenticated = true;
    },

    removeToken(state) {
      state.token = "";
      state.isAuthenticated = false;
    },

    setUser(state, user) {
      state.user = user;
    },
  },
  actions: {},
  modules: {},
});
