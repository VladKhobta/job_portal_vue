<template>
  <nav class="navbar">
    <div class="navbar-menu">
      <div class="navbar-start">
        <router-link to="/" class="navbar-item">Home</router-link>
      </div>

      <div class="navbar-end" v-if="$store.state.isAuthenticated">
        <router-link to="/logout" class="navbar-item">Log Out</router-link>
      </div>

      <div class="navbar-end" v-else>
        <router-link to="/login" class="navbar-item">Log In</router-link>
        <router-link to="/signup" class="navbar-item">Sign Up</router-link>
      </div>
    </div>
  </nav>

  <router-view> </router-view>
</template>

<script>
import axios from 'axios';

export default {
  name: "App",
  components: {},

  beforeCreate() {
    this.$store.commit('initializeStore')

    const token = this.$store.state.token
    if (token) {
        axios.defaults.headers.common['Authorization'] = "Token " + token
    } else {
        axios.defaults.headers.common['Authorization'] = ""
    }
  }
};
</script>

<style>
@import "https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css";
</style>
