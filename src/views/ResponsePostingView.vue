<template>
  <h4>Response to vacancy</h4>
  <form class="row g-2">
    <label class="form-label">Cover letter: </label>
    <input v-model="this.cover_letter" type="text" />
    <button class="btn btn-dark" @click.prevent="submitPostForm">
      Respond
    </button>
  </form>
</template>

<script>
import axios from "axios";

export default {
  props: ["vacancy_id", "vacancy_company"],

  mounted() {
    console.log(this.$store.state.isAuthenticated);
    console.log(this.vacancy_id, this.vacancy_company);
  },

  methods: {
    submitPostForm() {
      const formData = {
        vacancy: this.vacancy_id,
        company: this.vacancy_company,
        candidate: localStorage.getItem("user_id"),
        cover_letter: this.cover_letter,
      };

      axios.post("/responses/", formData).then(() => {
        console.log("suck");
      });
    },
  },
};
</script>
