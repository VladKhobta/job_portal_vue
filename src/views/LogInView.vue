<template>
  <div class="row">
    <div class="col" />
    <div class="col-3">
      <form>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label"
            >Email address:</label
          >
          <input
            v-model="email"
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" class="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label"
            >Password:</label
          >
          <input
            v-model="password"
            type="password"
            class="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <div class="notification is-danger" v-if="errors.length">
          <div v-for="error in errors" v-bind:key="error">
            <div class="alert alert-danger" role="alert">
              {{ error }}
            </div>
          </div>
        </div>
        <button
          @click.prevent="submitForm"
          type="submit"
          class="btn btn-primary"
        >
          Submit
        </button>
      </form>
    </div>
    <div class="col" />
  </div>
</template>


<script>
import axios from "axios";

export default {
  name: "LogInView",
  data() {
    return {
      email: "",
      password: "",
      errors: [],
    };
  },
  methods: {
    submitForm() {
      this.errors = [];
      if (this.email === "") {
        this.errors.push("The email is missing");
      }
      if (this.password === "") {
        this.errors.push("The password is too short");
      }

      if (!this.errors.length) {
        const formData = {
          user: {
            email: this.email,
            password: this.password,
          },
        };
        axios
          .post("account/users/", formData)
          .then(() => {
            console.log("success");
            this.$router.push("/login");
          })
          .catch((error) => {
            if (error.response) {
              for (const property in error.response.data) {
                this.errors.push(
                  `${property}: ${error.response.data[property]}`
                );
              }
            } else if (error.message) {
              this.errors.push("Something went wrong. Please try again");
            }
          });
      }
    },
  },
};
</script>
