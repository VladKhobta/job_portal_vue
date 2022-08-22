<template>
  <div class="row shadow-sm mb-3">
    <div class="col-8">
      <div class="">
        <p class="">Vacancy #{{ id }}</p>
        <h1 class="mb-5">{{ title }}</h1>
        <h4>{{ salary }} RUB</h4>
        <p class="mb-5">Required experience: {{ required_experience }} years</p>
        <div v-if="user_type === 'COMPANY'">
          <button>Edit</button>
        </div>
        <div v-else>
          <button>Respond</button>
        </div>
      </div>
    </div>
    <div class="col-4">
      <img class="w-100 p-4" src="../assets/company_logo.jpg" alt="Company" />
    </div>
  </div>
  <div class="row">
    <div class="col-8 me-3 shadow-sm">
      <p>{{ description }}</p>
    </div>
    <div class="col shadow-sm">
      <h4 class="">{{designation}}</h4>
    </div>
  </div>
</template>

<script>
export default {
  name: "VacancyView",
  props: ["id", "title", "description", "salary", "required_experience"],
  data() {
    return {
      user_type: "",
      designation: "",
    }
  },

  mounted() {
    this.user_type = localStorage.getItem("user_type");
    this.designation = localStorage.getItem("designation");
  },
};
</script>

<style></style>
