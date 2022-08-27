<template>
  <div class="row shadow-sm mb-3">
    <div class="col-8">
      <div class="">
        <p class="">Vacancy #{{ vacancy.id }}</p>
        <h1 class="mb-5">{{ vacancy.title }}</h1>
        <h4>{{ vacancy.salary }} RUB</h4>
        <p class="mb-5">Required experience: {{ vacancy.required_experience }} years</p>
        <div v-if="user_type === 'COMPANY'">
          <button>Edit</button>
        </div>
        <div v-if="user_type === 'APPLICANT'">
          <button class="btn btn-dark">Respond</button>
        </div>
      </div>
    </div>
    <div class="col-4">
      <img class="w-100 p-4" src="../assets/company_logo.jpg" alt="Company" />
    </div>
  </div>
  <div class="row">
    <div class="col-8 me-3 shadow-sm">
      <!-- <p>{{ description }}</p> -->
    </div>
    <div class="col shadow-sm">
      <!-- <h4 class="">{{designation}}</h4> -->
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "VacancyView",
  props: ['id'],
  data() {
    return {
      vacancy: {},
    };
  },

  created() {
    this.user_type = localStorage.getItem("user_type");
    this.getVacancy();
  },

  methods: {
    async getVacancy() {
      const vacancy_id = this.id;

      axios
        .get(`vacancies/${vacancy_id}`)
        .then((response) => {
          this.vacancy = response.data.vacancy;
        })
        .catch((error) => {
          console.log(error)
        });
    },
  },
};
</script>

<style></style>
