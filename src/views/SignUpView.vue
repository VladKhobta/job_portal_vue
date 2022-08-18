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
          />
        </div>
        <div class="mb-3">
          <label class="form-label"
            >Repeat password:</label
          >
          <input
            v-model="password2"
            type="password"
            class="form-control"
            id="exampleInputPassword2"
          />
        </div>
        <div class="notification is-danger" v-if="errors.length">
          <div v-for="error in errors" v-bind:key="error">
            <div class="alert alert-danger" role="alert">
              {{ error }}
            </div>
          </div>
        </div>
        <div class="mb-3"></div>
        <div class="mb-3">
          <div class="row">
            <button
              type="button"
              class="btn btn-sm btn-lg btn-primary col mr-4"
              @click="toggle"
              :disabled="imEmployee"
            >
              I'm employee
            </button>
            <button
              type="button"
              class="btn btn-sm btn-lg btn-primary col"
              @click="toggle"
              :disabled="!imEmployee"
            >
              I'm employer
            </button>
          </div>
        </div>
        <button
          @click.prevent="submitSignupForm"
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
  name: "SignUpView",
  data() {
    return {
      imEmployee: true,
      email: "",
      password: "",
      password2: "",
      errors: [],
    };
  },
  methods: {
    submitSignupForm() {
      this.errors = [];
      if (this.email === "") {
        this.errors.push("The email is missing");
      }
      if (this.password === "") {
        this.errors.push("The password is too short");
      }
      if (this.password !== this.password2) {
        this.errors.push("The passwords doesn't match");
      }
      if (!this.errors.length) {
        const user_type = this.imEmployee ? "APPLICANT" : "COMPANY";

        const formData = {
          user: {
            email: this.email,
            password: this.password,
            user_type: user_type
          },
        };
        axios
          .post("account/", formData)
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

    toggle() {
      this.imEmployee = !this.imEmployee;
    },
  },
};
</script>
