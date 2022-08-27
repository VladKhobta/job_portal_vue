<template>
  <div class="row">
    <div class="col-8">
      <h3 class="mb-2">Vacancies</h3>
      <VacancyBox
        v-for="vacancy in companyVacancies.vacancies"
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
  name: "CompanyVacanciesView",
  components: {
    VacancyBox,
  },
  data() {
    return {
      companyVacancies: {
        vacancies: [],
      },
    };
  },
  beforeCreate() {
    const user_id = localStorage.getItem("user_id");

    axios.get(`/vacancies/company=${user_id}`).then((response) => {
      console.log(response.data["vacancies"]);
      this.companyVacancies.vacancies = response.data["vacancies"];
      console.log(response.data["vacancies"]);
      console.log(this.companyVacancies.vacancies);
      console.log(this.companyVacancies.vacancies[0].id);
    });
  },

  methods: {
    
  },
};
</script>

<style></style>
