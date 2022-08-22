<template>
  <div class="row">
    <div class="col-4" />
    <div class="col-4 align-self-center">
      <form>
        <div class="mb-3">
          <label class="form-label">Email address:</label>
          <input v-model="email" type="email" class="form-control" />
          <div class="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label"
            >Password:</label
          >
          <input v-model="password" type="password" class="form-control" />
        </div>

        <label class="form-label">Repeat password:</label>
        <input v-model="password2" type="password" class="mb-3 form-control" />

        <label class="form-label">Phone number:</label>
        <input v-model="phone_number" type="tel" class="mb-3 form-control" />

        <div v-if="!imEmployee">
          <div class="mb-3">
            <label class="form-label">Designation of company:</label>
            <input v-model="designation" type="text" class="form-control" />
          </div>
        </div>
        <div class="notification is-danger" v-if="errors.length">
          <div v-for="error in errors" v-bind:key="error">
            <div class="alert alert-danger" role="alert">
              {{ error }}
            </div>
          </div>
        </div>
       
      </form>
       <div class="btn-group mb-3" role="group">
          <button
            type="button"
            class="btn btn-primary"
            @click="toggle"
            :disabled="imEmployee"
          >
            I'm employee
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click="toggle"
            :disabled="!imEmployee"
          >
            I'm employer
          </button>
        </div>
        <button
          @click.prevent="submitSignupForm"
          type="submit"
          class="btn btn-primary"
        >
          Submit
        </button>
    </div>
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
      designation: "",
      phone_number: "",
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
            user_type: user_type,
            designation: this.designation,
            phone_number: this.phone_number,
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
