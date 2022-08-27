<template>
  <div class="row">
    <div class="col-8">
      <h1>Searching vacancies</h1>
      <form class="d-flex mb-3" role="search">
        <input
          class="form-control me-2"
          type="search"
          placeholder="Search..."
          v-model="searchRequest"
        />
        <button
          class="btn btn-outline-success"
          type="submit"
          @click.prevent="searchUpdate"
        >
          Search
        </button>
      </form>
      <VacancyBox
        v-for="vacancy in vacancies"
        :key="vacancy.id"
        :vacancy="vacancy"
      />
    </div>
  </div>
</template>

<script>
import VacancyBox from "../components/VacancyBox.vue";
import axios from "axios";

export default {
  name: "SearchView",
  components: {
    VacancyBox,
  },
  data() {
    return {
      searchRequest: "",
      vacancies: [],
    };
  },

  beforeCreate() {
    this.searchUpdate;
  },

  methods: {
    async searchUpdate() {
      axios.get(`/vacancies/filter=${this.searchRequest}`).then((response) => {
        this.vacancies = response.data["vacancies"];
      });
    },
  },
};
</script>

<style></style>
