<template>
  <div class="card mb-3">
    <h5 class="card-header">#{{ response.id }}</h5>
    <div class="card-body">
      <div class="row justify-content-between">
        <div class="col">
          <h5 class="card-title">{{ response.vacancy_title }}</h5>
        </div>
        <div class="col-2">
          <p class="card-text">{{ response.created_at }}</p>
        </div>
      </div>
      <p class="card-text">From: {{ response.candidate_last_name }} {{ response.candidate_first_name }}</p>
      <p class="card-text">
        Cover letter:
        {{ response.cover_letter ? response.cover_letter : "is absent" }}
      </p>
      <a href="#" class="btn btn-dark">Answer</a>
      
    </div>
  </div>
</template>

<script>
export default {
  name: "ResponseBox",
  props: {
    response: Object,
  },

  mounted() {
    // if (this.response.cover_letter === undefined) {
    //   this.response.cover_letter = 'absant';
    // }
  },
};
</script>

<style></style>
