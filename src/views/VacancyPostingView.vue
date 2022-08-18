<template>
  <div class="row">
    <div class="col" />
    <div class="col-3">
      <h4>New vacancy posting</h4>
      <form>
        <label class="form-label">Description:</label>
        <input
          v-model="this.description"
          type="text"
          class="form-control mb-2"
        />
        <label class="form-label">Tittle:</label>
        <input v-model="this.title" type="text" class="form-control mb-2" />
        <label class="form-label">Required experience:</label>
        <input
          v-model="this.required_experience"
          type="number"
          class="form-control mb-2"
        />
        <label class="form-label">Salary:</label>
        <input v-model="this.salary" type="number" class="form-control mb-2" />
        <button @click.prevent="submitPostForm" class="btn btn-primary">
          Post vacancy
        </button>
      </form>
    </div>
    <div class="col" />
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ProfileView",
  data() {
    return {
      description: "",
      title: "",
      company: "",
      errors: [],
    };
  },

  methods: {
    submitPostForm() {
      const formData = {
        description: this.description,
        title: this.title,
        required_experience: this.required_experience,
        salary: this.salary,
        company: localStorage.getItem("user_id"),
      };
      axios
        .post("/vacancies/", formData)
        .then(() => {
          console.log("success");
          console.log(formData);
          this.$router.push("/profile");
        })
        .catch((error) => {
          if (error.response) {
            for (const property in error.response.data) {
              this.errors.push(`${property}: ${error.response.data[property]}`);
            }
          } else if (error.message) {
            this.errors.push("Something went wrong. Please try again");
          }
        });
    },
  },
};
</script>
