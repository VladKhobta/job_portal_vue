<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-xxl">
      <div class="collapse navbar-collapse">
        <router-link to="/" class="navbar-brand me-5">Job Portal</router-link>
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0"> <li class="nav-item"><router-link
          class="nav-item nav-link active"
          to="/search"
        >Search
        </router-link></li></ul>

        <ul
          v-if="$store.state.isAuthenticated"
          class="navbar-nav ms-auto mb-2 mb-lg-0"
        >
          <li class="nav-item">
            <router-link
              to="/logout"
              class="nav-link active"
              aria-current="page"
              >Log Out</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              to="/profile"
              class="nav-link active"
              aria-current="page"
              >My Profile</router-link
            >
          </li>
        </ul>

        <ul v-else class="navbar-nav ms-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link
              to="/login"
              class="nav-link active"
              aria-current="page"
              href="#"
              >Log In</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              to="/signup"
              class="nav-link active"
              aria-current="page"
              href="#"
              >Sign Up</router-link
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <div class="container-xxl mt-5">
    <router-view> </router-view>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "App",
  components: {},

  data() {
    return {
      searchRequest: "",
    };
  },

  beforeCreate() {
    this.$store.commit("initializeStore");

    const token = this.$store.state.token;
    if (token) {
      axios.defaults.headers.common["Authorization"] = "Token " + token;
    } else {
      axios.defaults.headers.common["Authorization"] = "";
    }
  },

  methods: {},
};
</script>

<style></style>
