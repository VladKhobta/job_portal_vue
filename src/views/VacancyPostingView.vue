<template>
  <div class="row">
    <div class="col" />
    <div class="col-3">
      <h4>New vacancy posting</h4>
      <form>
        <input
          v-model="this.description"
          type="email"
          class="form-control mb-2"
        />
      </form>
    </div>
    <div class="col" />
  </div>
</template>

<script>
// import axios from "axios";

export default {
  name: "ProfileView",
  data() {
    return {
      vacancy_data: {
        description: '',
        title: "",
        company: "",
      }
    };
  },
};
</script>
