<template>
  <div class="card mb-2">
    <div class="card-header">Vacancy #{{ vacancy.id }}</div>
    <div class="card-body">
      <h5 class="card-title">{{ vacancy.title }}</h5>
      <p class="card-text">{{ vacancy.description }}</p>
      <router-link
        :to="{
          name: 'VacancyView',
          params: {
            id: vacancy.id,
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

  data() {
    return {};
  },

  mounted() {},
};
</script>

<style></style>
