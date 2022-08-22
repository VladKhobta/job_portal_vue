<template>
  <div class="card mb-3">
    <div class="card-header">Vacancy #{{ vacancy.id }}</div>
    <div class="card-body">
      <h5 class="card-title">{{ vacancy.title }}</h5>
      <p class="card-text">{{ vacancy.description }}</p>
      <router-link
        :to="{
          name: 'VacancyView',
          params: {
            id: vacancy.id,
            title: vacancy.title,
            description: vacancy.description,
            salary: vacancy.salary,
            required_experience: vacancy.required_experience,
          },
        }"
        class="btn btn-primary"
        >Check vacancy</router-link
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "VacancyBox",
  props: {
    vacancy: Object,
  },
  mounted() {
    
  },
};
</script>

<style></style>
