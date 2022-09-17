<template>
  <div class="card mb-3">
    <h5 class="card-header">#{{response.id}}</h5>
    <div class="card-body">
      <h5 class="card-title">{{response.vacancy_title}}</h5>
      <p class="card-text">
        Cover letter: {{response.cover_letter}}
      </p>
      <a href="#" class="btn btn-primary">Answer</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "ResponseBox",
  props: {
    response: Object,
  },
};
</script>

<style></style>
