<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand">Job Portal</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <form class="d-flex ms-auto">
          <input
            class="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button class="btn btn-outline-success" type="submit">Search</button>
        </form>

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

  <router-view class="mt-3"> </router-view>
</template>

<script>
import axios from "axios";

export default {
  name: "App",
  components: {},

  beforeCreate() {
    this.$store.commit("initializeStore");

    const token = this.$store.state.token;
    if (token) {
      axios.defaults.headers.common["Authorization"] = "Token " + token;
    } else {
      axios.defaults.headers.common["Authorization"] = "";
    }
  },
};
</script>

<style></style>
